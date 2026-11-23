"""Independent stdlib black-box evaluation; all mutations use new synthetic fixtures."""
import csv
import ctypes
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import traceback

BASE = Path(__file__).resolve().parents[3] / 'output' / 'workflow-transfer'


def reserve(value):
    path = Path(value).resolve()
    if path == BASE.resolve() or BASE.resolve() not in path.parents:
        raise ValueError('OUTPUT_DIR must be strictly beneath ' + str(BASE))
    path.mkdir(parents=True, exist_ok=False)
    return path


def snapshot(root):
    result = {}
    for p in sorted(root.rglob('*')):
        name = p.relative_to(root).as_posix()
        if p.is_symlink():
            result[name] = {'symlink': os.readlink(p)}
        elif p.is_file():
            result[name] = {'sha256': hashlib.sha256(p.read_bytes()).hexdigest(), 'size': p.stat().st_size}
        else:
            result[name] = {'directory': True}
    return result


def require(condition, message):
    if not condition:
        raise AssertionError(message)


class Skip(Exception):
    pass


class Case:
    def __init__(self, directory, implementation):
        self.dir = directory
        directory.mkdir()
        self.root = directory / 'root'
        self.root.mkdir()
        self.impl = implementation
        self.plan = directory / 'plan.json'
        self.journal = directory / 'journal.json'
        self.csv = directory / 'names.csv'
        self.commands = []

    def files(self, names=None):
        for name, data in (names or {'a.txt': b'A\x00\xff', 'b.txt': b'BBB', 'c.txt': b'CCC', 'unrelated.txt': b'UNCHANGED'}).items():
            (self.root / name).write_bytes(data)

    def mapping(self, rows):
        with self.csv.open('w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['from', 'to'])
            writer.writerows(rows)

    def run(self, verb, ok=True, root=None, journal=None):
        args = [sys.executable, str(self.impl), verb, '--root', str(root or self.root)]
        if verb == 'preview':
            args += ['--csv', str(self.csv), '--plan', str(self.plan)]
        elif verb == 'apply':
            args += ['--plan', str(self.plan), '--journal', str(journal or self.journal)]
        else:
            args += ['--journal', str(self.journal)]
        before = snapshot(self.dir)
        p = subprocess.run(args, cwd=self.dir, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=20)
        record = {'args': args, 'exit': p.returncode, 'stdout': p.stdout, 'stderr': p.stderr, 'before': before, 'after': snapshot(self.dir)}
        self.commands.append(record)
        try:
            parsed = json.loads(p.stdout)
        except ValueError as exc:
            raise AssertionError('stdout is not one JSON object') from exc
        record['json'] = parsed
        require(isinstance(parsed, dict), 'stdout must be JSON object')
        require(parsed.get('ok') is ok, 'unexpected JSON ok value')
        require((p.returncode == 0) is ok, 'unexpected exit status')
        if not ok:
            require(any(v for k, v in parsed.items() if k != 'ok'), 'failure lacks diagnostic')
        return parsed

    def preview(self, rows):
        self.mapping(rows)
        before = snapshot(self.root)
        parsed = self.run('preview')
        require(snapshot(self.root) == before, 'preview changed ROOT')
        require(parsed.get('changes') == [{'from': a, 'to': b} for a, b in rows], 'preview change list differs')
        require(self.plan.is_file(), 'preview did not save plan')

    def refuse(self, verb, **kwargs):
        before = snapshot(self.root)
        try:
            self.run(verb, ok=False, **kwargs)
        finally:
            require(snapshot(self.root) == before, 'refused operation changed ROOT')


def roundtrip(c, rows=None, names=None):
    c.files(names)
    rows = rows or [('a.txt', 'renamed.txt'), ('b.txt', 'other.txt')]
    original = snapshot(c.root)
    expected = dict(original)
    for src, _ in rows:
        expected.pop(src)
    for src, dst in rows:
        expected[dst] = original[src]
    c.preview(rows)
    c.run('apply')
    require(snapshot(c.root) == expected, 'apply names or bytes differ')
    require(c.journal.is_file(), 'apply did not save journal')
    c.refuse('apply')
    c.refuse('apply', journal=c.dir / 'fresh-journal.json')
    c.run('undo')
    require(snapshot(c.root) == original, 'undo did not restore names and bytes')
    c.refuse('undo')


def invalid(c, rows):
    c.files()
    c.mapping(rows)
    c.refuse('preview')
    require(not c.plan.exists(), 'invalid preview saved reusable plan')


def stale(c):
    c.files()
    c.preview([('a.txt', 'renamed.txt')])
    (c.root / 'a.txt').write_bytes(b'CHANGED')
    c.refuse('apply')


def missing(c):
    c.files()
    c.preview([('a.txt', 'renamed.txt')])
    (c.root / 'a.txt').unlink()
    c.refuse('apply')


def collision(c):
    c.files()
    c.preview([('a.txt', 'renamed.txt')])
    (c.root / 'renamed.txt').write_bytes(b'NEW OWNER')
    c.refuse('apply')


def wrong_root(c):
    c.files()
    c.preview([('a.txt', 'renamed.txt')])
    other = c.dir / 'other-root'
    other.mkdir()
    for p in c.root.iterdir():
        (other / p.name).write_bytes(p.read_bytes())
    before = snapshot(other)
    try:
        c.refuse('apply', root=other)
    finally:
        require(snapshot(other) == before, 'wrong-root apply changed supplied root')


def unsafe_undo(c, occupied=False):
    c.files()
    c.preview([('a.txt', 'renamed.txt')])
    c.run('apply')
    (c.root / ('a.txt' if occupied else 'renamed.txt')).write_bytes(b'NEW DATA')
    c.refuse('undo')


def existing(c, journal=False):
    c.files()
    rows = [('a.txt', 'renamed.txt')]
    if journal:
        c.preview(rows)
        target = c.journal
    else:
        c.mapping(rows)
        target = c.plan
    target.write_bytes(b'EXISTING SENTINEL\x00')
    try:
        c.refuse('apply' if journal else 'preview')
    finally:
        require(target.read_bytes() == b'EXISTING SENTINEL\x00', 'existing artifact overwritten')


def escape(c, absolute=False, source=False):
    sentinel = c.dir / 'sentinel.txt'
    sentinel.write_bytes(b'SIBLING SENTINEL')
    try:
        name = str(sentinel) if absolute else '../sentinel.txt'
        invalid(c, [(name, 'new.txt') if source else ('a.txt', name)])
    finally:
        require(sentinel.read_bytes() == b'SIBLING SENTINEL', 'outside-root sentinel changed')


def symlink(c, source=True):
    c.files()
    sentinel = c.dir / 'sentinel.txt'
    sentinel.write_bytes(b'LINK SENTINEL')
    try:
        (c.root / 'link.txt').symlink_to(sentinel)
    except OSError as exc:
        raise Skip('symlink creation unavailable: ' + str(exc))
    c.mapping([('link.txt', 'new.txt') if source else ('a.txt', 'link.txt')])
    try:
        c.refuse('preview')
    finally:
        require(sentinel.read_bytes() == b'LINK SENTINEL', 'symlink referent changed')


def acquire_lock(path):
    if os.name != 'nt':
        raise Skip('Windows file-lock test unavailable on this OS')
    from ctypes import wintypes
    kernel = ctypes.WinDLL('kernel32', use_last_error=True)
    kernel.CreateFileW.argtypes = [wintypes.LPCWSTR, wintypes.DWORD, wintypes.DWORD, ctypes.c_void_p, wintypes.DWORD, wintypes.DWORD, wintypes.HANDLE]
    kernel.CreateFileW.restype = wintypes.HANDLE
    kernel.CloseHandle.argtypes = [wintypes.HANDLE]
    kernel.CloseHandle.restype = wintypes.BOOL
    handle = kernel.CreateFileW(str(path), 0x80000000, 1, None, 3, 0x80, None)
    if handle == ctypes.c_void_p(-1).value:
        raise OSError(ctypes.get_last_error(), 'CreateFileW failed')
    return lambda: kernel.CloseHandle(handle)


def locked(c):
    c.files()
    c.preview([('a.txt', 'renamed.txt'), ('b.txt', 'other.txt')])
    close = acquire_lock(c.root / 'b.txt')
    try:
        require((c.root / 'b.txt').read_bytes() == b'BBB', 'lock should allow reads')
        try:
            (c.root / 'b.txt').rename(c.root / 'lock-probe.txt')
        except OSError:
            pass
        else:
            raise AssertionError('lock probe did not prevent rename')
        c.refuse('apply')
    finally:
        close()


def selfcheck(out):
    checks = []
    try:
        require(False, 'intentional assertion')
    except AssertionError:
        checks.append({'name': 'assertion detects defect', 'status': 'pass'})
    probe = out / 'lock.txt'
    probe.write_bytes(b'probe')
    try:
        close = acquire_lock(probe)
        try:
            require(probe.read_bytes() == b'probe', 'read denied')
            try:
                probe.rename(out / 'unexpected.txt')
            except OSError:
                checks.append({'name': 'lock denies rename and allows read', 'status': 'pass'})
            else:
                raise AssertionError('lock ineffective')
        finally:
            close()
    except Skip as exc:
        checks.append({'name': 'lock probe', 'status': 'skip', 'detail': str(exc)})
    return checks


def main():
    if len(sys.argv) != 3:
        raise SystemExit('usage: evaluate.py IMPLEMENTATION_PATH OUTPUT_DIR | --self-check OUTPUT_DIR')
    out = reserve(sys.argv[2])
    if sys.argv[1] == '--self-check':
        results = selfcheck(out)
    else:
        impl = Path(sys.argv[1]).resolve(strict=True)
        cases = [
            ('normal_and_repeated', roundtrip),
            ('quoted_unicode', lambda c: roundtrip(c, [('comma,name.txt', '新,名字.txt')], {'comma,name.txt': b'bytes', 'unrelated.txt': b'keep'})),
            ('swap', lambda c: roundtrip(c, [('a.txt', 'b.txt'), ('b.txt', 'a.txt')])),
            ('cycle', lambda c: roundtrip(c, [('a.txt', 'b.txt'), ('b.txt', 'c.txt'), ('c.txt', 'a.txt')])),
            ('stale_contents', stale), ('missing_after_preview', missing), ('new_collision', collision),
            ('wrong_root', wrong_root), ('changed_target_undo', unsafe_undo),
            ('occupied_original_undo', lambda c: unsafe_undo(c, True)),
            ('existing_plan', existing), ('existing_journal', lambda c: existing(c, True)),
            ('traversal', escape), ('absolute', lambda c: escape(c, True)),
            ('source_traversal', lambda c: escape(c, source=True)),
            ('source_absolute', lambda c: escape(c, absolute=True, source=True)),
            ('duplicate_source', lambda c: invalid(c, [('a.txt', 'x'), ('a.txt', 'y')])),
            ('duplicate_destination', lambda c: invalid(c, [('a.txt', 'x'), ('b.txt', 'x')])),
            ('case_duplicate_destination', lambda c: invalid(c, [('a.txt', 'x'), ('b.txt', 'X')])),
            ('occupied_destination', lambda c: invalid(c, [('a.txt', 'unrelated.txt')])),
            ('missing_source', lambda c: invalid(c, [('missing.txt', 'x')])),
            ('invalid_empty', lambda c: invalid(c, [('a.txt', '')])),
            ('invalid_reserved', lambda c: invalid(c, [('a.txt', 'CON')])),
            ('source_symlink', symlink), ('target_symlink', lambda c: symlink(c, False)),
            ('mid_operation_lock', locked),
        ]
        results = []
        for name, test in cases:
            c = Case(out / name, impl)
            result = {'name': name}
            try:
                test(c)
                result['status'] = 'pass'
            except Skip as exc:
                result.update(status='skip', detail=str(exc))
            except Exception as exc:
                result.update(status='fail', detail=str(exc), traceback=traceback.format_exc())
            result['commands'] = c.commands
            result['final_files'] = snapshot(c.dir)
            results.append(result)
            (out / 'results.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
    (out / 'results.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
    counts = {status: sum(r['status'] == status for r in results) for status in ('pass', 'fail', 'skip')}
    print(json.dumps({'output': str(out), **counts}))
    return 1 if counts['fail'] else 0


if __name__ == '__main__':
    sys.exit(main())
