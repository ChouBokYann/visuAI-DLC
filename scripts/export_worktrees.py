"""Read main and local worktrees into an explicit, bounded comparison bundle."""
import argparse
import io
import hashlib
import json
from pathlib import Path, PurePosixPath
import subprocess
import tarfile
import tempfile
import yaml

try:
    from .export_workflow import export, publish, require
except ImportError:
    from export_workflow import export, publish, require


def git(repo, *args):
    return subprocess.run(['git', '-C', str(repo), *args], check=True, capture_output=True).stdout


def collect(repo, source, project, main_ref='main'):
    repo = Path(repo).resolve()
    relative = PurePosixPath(source.replace('\\', '/'))
    require(not relative.is_absolute() and relative.parts and '..' not in relative.parts and ':' not in source, 'source must be a relative directory inside each worktree')
    main_revision = git(repo, 'rev-parse', '--verify', '--end-of-options', main_ref + '^{commit}').decode().strip()
    # Only extract regular Markdown files; never execute or materialise archived symlinks.
    archive = git(repo, 'archive', main_revision, '--', relative.as_posix())
    require(len(archive) <= 32 * 1024 * 1024, 'main source archive exceeds 32 MiB')
    with tempfile.TemporaryDirectory(prefix='visuai-main-') as temporary:
        root = Path(temporary)
        with tarfile.open(fileobj=io.BytesIO(archive)) as tar:
            for member in tar:
                if not member.name.endswith('.md'):
                    continue
                require(member.isfile(), 'main Markdown source must be a regular file')
                destination = (root / member.name).resolve()
                require(destination.is_relative_to(root), 'archive path escapes baseline directory')
                require(member.size <= 2 * 1024 * 1024, 'main source file exceeds 2 MiB')
                destination.parent.mkdir(parents=True, exist_ok=True)
                destination.write_bytes(tar.extractfile(member).read())
        baseline = export(root / relative.as_posix(), project, main_revision, False)
    main = dict(id='main', branch=main_ref, revision=main_revision, dirty=False, integrated=True, snapshot=baseline)
    entries, current = [], {}
    for field in git(repo, 'worktree', 'list', '--porcelain', '-z').decode('utf-8').split('\0'):
        if not field:
            if current:
                entries.append(current)
                current = {}
        else:
            key, _, value = field.partition(' ')
            current[key] = value
    if current:
        entries.append(current)
    require(len(entries) <= 30, 'at most 30 worktrees')
    trees, omitted = [], []
    for index, entry in enumerate(entries):
        if 'bare' in entry:
            continue
        path = Path(entry['worktree']).resolve()
        branch = entry.get('branch', 'detached').removeprefix('refs/heads/')
        try:
            source_root = (path / relative.as_posix()).resolve()
            require(source_root.is_relative_to(path), 'source escapes worktree')
            revision = git(path, 'rev-parse', 'HEAD').decode().strip()
            before = git(path, 'status', '--porcelain', '--untracked-files=all')
            snapshot = export(source_root, project, revision + ('+working' if before else ''), False)
            current_files = {}
            for p in source_root.rglob('*.md'):
                require(p.resolve().is_relative_to(source_root) and p.stat().st_size <= 2 * 1024 * 1024, 'changed source is outside bounds')
                current_files[p.relative_to(source_root).as_posix()] = hashlib.sha256(p.read_bytes()).hexdigest()
            require(current_files == snapshot['provenance']['files'], 'workflow records changed while reading; retry export')
            require(before == git(path, 'status', '--porcelain', '--untracked-files=all') and revision == git(path, 'rev-parse', 'HEAD').decode().strip(), 'worktree changed while reading; retry export')
            ancestry = subprocess.run(['git', '-C', str(repo), 'merge-base', '--is-ancestor', revision, main_revision], capture_output=True)
            require(ancestry.returncode in (0, 1), 'could not determine integration status')
            trees.append(dict(id=f'worktree-{index}', branch=branch, revision=revision, dirty=bool(before), integrated=ancestry.returncode == 0 and not before, snapshot=snapshot))
        except (ValueError, OSError, subprocess.CalledProcessError, yaml.YAMLError, RecursionError):
            omitted.append(branch + ': unavailable, changing, or invalid workflow records')
    bundle = dict(version=1, kind='worktrees', project=project, main=main, worktrees=trees, omitted=omitted)
    require(len(json.dumps(bundle).encode()) <= 16 * 1024 * 1024, 'bundle exceeds 16 MiB')
    return bundle


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('repo', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('--source', required=True, help='same relative Markdown bundle directory in main and every worktree')
    parser.add_argument('--project', required=True)
    parser.add_argument('--main', default='main')
    args = parser.parse_args()
    try:
        require(args.output.suffix.lower() == '.json', 'output must be a JSON file, not a source document')
        result = collect(args.repo, args.source, args.project, args.main)
        publish(result, args.output)
        print(f"Exported main and {len(result['worktrees'])} worktrees; {len(result['omitted'])} omitted. Business impact is not inferred.")
    except (ValueError, OSError, subprocess.CalledProcessError, yaml.YAMLError, RecursionError) as error:
        parser.exit(1, f'Worktree export failed: {error}\n')
