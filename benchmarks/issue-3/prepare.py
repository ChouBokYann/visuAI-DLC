"""Prepare isolated identical native-input corpora; never rewrite an existing run."""
import hashlib
import json
from pathlib import Path
import platform
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[2]
WORK = ROOT / '.bench-run'
OUT = Path(__file__).parent
CODE = {
    'dependencies.py': '''def blocked_dependencies(task, states):
    return [name for name in task["dependencies"] if states.get(name) != "done"]


def can_start(task, states):
    return not blocked_dependencies(task, states)
''',
    'release.py': '''from dependencies import can_start


def can_deploy(task, states, evidence):
    return evidence == "verified" and can_start(task, states)
'''
}


def main():
    source = ROOT / 'docs/examples/project-thread/baseline-b'
    corpus = WORK / 'corpus'
    if corpus.exists():
        raise SystemExit('Existing corpus: preserve it; use a fresh run directory to repeat setup.')
    corpus.mkdir(parents=True)
    for path in source.glob('*.md'):
        if path.name != 'index.md':
            shutil.copyfile(path, corpus / path.name)
    for name, content in CODE.items():
        (corpus / name).write_text(content, encoding='utf-8')
    manifest = {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(corpus.iterdir())}
    for name in ('graphify', 'cbm', 'bm'):
        shutil.copytree(corpus, WORK / ('corpus-' + name))
    key_hash = hashlib.sha256((OUT / 'answer-key.json').read_text(encoding='utf-8').encode('utf-8')).hexdigest()
    manifest_text = json.dumps({
        'source_revision': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(),
        'platform': platform.platform(), 'python': platform.python_version(),
        'answer_key_sha256': key_hash, 'files': manifest,
        'note': 'Eight unchanged concept documents from baseline B plus two synthetic Python files. Procedure reference points outside copied corpus; external link is not silently resolved.'
    }, indent=2) + '\n'
    (WORK / 'preparation-manifest.json').write_text(manifest_text, encoding='utf-8')
    if not (OUT / 'manifest.json').exists():
        (OUT / 'manifest.json').write_text(manifest_text, encoding='utf-8')
    # Small self-check of the exact synthetic behavior used by the answer key.
    namespace = {}
    exec(CODE['dependencies.py'], namespace)
    task = {'dependencies': ['a']}
    assert namespace['blocked_dependencies'](task, {}) == ['a']
    assert namespace['can_start'](task, {'a': 'done'}) is True
    assert namespace['can_start'](task, {'a': 'working'}) is False
    print(f'Prepared {len(manifest)} files per tool; answer key hash {key_hash}')


if __name__ == '__main__':
    main()
