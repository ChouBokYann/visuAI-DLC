import csv
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

APP = Path(__file__).with_name('rename.py')

class RenameTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(dir=APP.parent)
        self.base = Path(self.tmp.name)
        self.root = self.base / 'files'
        self.root.mkdir()
        self.plan = self.base / 'plan.json'
        self.journal = self.base / 'journal.json'
        self.csv = self.base / 'input.csv'

    def tearDown(self):
        self.tmp.cleanup()

    def put(self, name, data):
        (self.root / name).write_bytes(data)

    def snapshot(self):
        return {p.name: p.read_bytes() for p in self.root.iterdir()}

    def run_cli(self, action, ok=True, root=None, plan=None, journal=None):
        args = [sys.executable, '-B', str(APP), action, '--root', str(root or self.root)]
        if action == 'preview':
            args += ['--csv', str(self.csv), '--plan', str(plan or self.plan)]
        if action == 'apply':
            args += ['--plan', str(plan or self.plan), '--journal', str(journal or self.journal)]
        if action == 'undo':
            args += ['--journal', str(journal or self.journal)]
        proc = subprocess.run(args, cwd=self.base, capture_output=True, text=True, encoding='utf-8')
        result = json.loads(proc.stdout)
        self.assertEqual(result['ok'], ok, result)
        self.assertEqual(proc.returncode == 0, ok, proc.stderr)
        return result

    def preview(self, pairs, ok=True):
        with self.csv.open('w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['from', 'to'])
            writer.writerows(pairs)
        before = self.snapshot()
        result = self.run_cli('preview', ok)
        self.assertEqual(self.snapshot(), before)
        return result

    def test_cycle_unicode_quoted_and_replay(self):
        self.put('a,é.txt', b'one\x00')
        self.put('b.txt', b'two')
        self.put('keep', b'keep')
        before = self.snapshot()
        pairs = [('a,é.txt', 'b.txt'), ('b.txt', 'a,é.txt')]
        self.assertEqual(self.preview(pairs)['changes'], [{'from': a, 'to': b} for a, b in pairs])
        self.run_cli('apply')
        self.assertEqual(self.snapshot(), {'a,é.txt': b'two', 'b.txt': b'one\x00', 'keep': b'keep'})
        self.run_cli('apply', False, journal=self.base / 'other.json')
        self.run_cli('undo')
        self.assertEqual(self.snapshot(), before)
        self.run_cli('undo', False)
        self.assertEqual(json.loads(self.journal.read_text(encoding='utf-8'))['state'], 'undone')

    def test_invalid_batches(self):
        self.put('a', b'a')
        self.put('b', b'b')
        cases = [[('missing','c')], [('a','c'),('A','d')], [('a','C'),('b','c')], [('a','b')], [('a','../x')], [('a','C:\\x')], [('a','NUL.txt')], [('a','x.')], [('a','')], [('a','a')], []]
        for pairs in cases:
            with self.subTest(pairs=pairs): self.preview(pairs, False)

    def test_stale_content_conflict_and_root(self):
        self.put('a', b'a')
        self.preview([('a','b')])
        self.put('a', b'changed')
        self.run_cli('apply', False)
        self.put('a', b'a')
        self.put('b', b'new')
        self.run_cli('apply', False)
        (self.root / 'b').unlink()
        elsewhere = self.base / 'elsewhere'
        elsewhere.mkdir()
        self.run_cli('apply', False, root=elsewhere)
        (self.root / 'a').unlink()
        self.run_cli('apply', False)

    def test_undo_refuses_modified_and_occupied(self):
        self.put('a', b'a')
        self.preview([('a','b')])
        self.run_cli('apply')
        self.put('b', b'changed')
        before = self.snapshot()
        self.run_cli('undo', False)
        self.assertEqual(before, self.snapshot())
        self.put('b', b'a')
        self.put('a', b'unrelated')
        before = self.snapshot()
        self.run_cli('undo', False)
        self.assertEqual(before, self.snapshot())

    def test_case_only_and_existing_records(self):
        self.put('a', b'a')
        self.preview([('a','A')])
        original = self.plan.read_bytes()
        self.preview([('a','A')], False)
        self.assertEqual(original, self.plan.read_bytes())
        self.journal.write_text('existing', encoding='utf-8')
        self.run_cli('apply', False)
        self.assertEqual(self.journal.read_text(encoding='utf-8'), 'existing')
        self.journal.unlink()
        self.run_cli('apply')
        self.assertEqual(self.snapshot(), {'A': b'a'})
        self.run_cli('undo')
        self.assertEqual(self.snapshot(), {'a': b'a'})

    def test_tampered_plan(self):
        self.put('a', b'a')
        self.preview([('a','b')])
        doc = json.loads(self.plan.read_text(encoding='utf-8'))
        doc['changes'][0]['to'] = '../escaped'
        self.plan.write_text(json.dumps(doc), encoding='utf-8')
        self.run_cli('apply', False)
        self.assertEqual(self.snapshot(), {'a': b'a'})

    def test_injected_mid_batch_failure_rolls_back(self):
        self.put('a', b'a')
        self.put('b', b'b')
        self.preview([('a','b'), ('b','a')])
        spec = importlib.util.spec_from_file_location('rename_app', APP)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        real = mod.os.rename
        calls = []
        def fail_once(src, dst):
            calls.append((src, dst))
            if len(calls) == 3: raise OSError('injected third rename failure')
            return real(src, dst)
        with patch.object(mod.os, 'rename', fail_once):
            with self.assertRaises(Exception): mod.apply(self.root, self.plan, self.journal)
        self.assertEqual(self.snapshot(), {'a': b'a', 'b': b'b'})
        self.assertEqual(json.loads(self.journal.read_text(encoding='utf-8'))['state'], 'failed')

    def test_symlink_sources_and_targets(self):
        self.put('a', b'a')
        link = self.root / 'link'
        try:
            link.symlink_to(self.root / 'a')
        except OSError as error:
            self.skipTest(f'Host cannot create symlinks: {error}')
        self.preview([('link', 'b')], False)
        self.preview([('a', 'link')], False)

    def test_malformed_records_csv_and_inside_outputs(self):
        self.put('a', b'a')
        self.csv.write_text('wrong,header\na,b\n', encoding='utf-8')
        self.run_cli('preview', False)
        self.csv.write_text('from,to\na,b,extra\n', encoding='utf-8')
        self.run_cli('preview', False)
        self.csv.write_text('from,to\na,b\n', encoding='utf-8')
        self.run_cli('preview', False, plan=self.root / 'plan.json')
        self.plan.write_text('[]', encoding='utf-8')
        self.run_cli('apply', False)
        self.plan.write_text('{invalid', encoding='utf-8')
        self.run_cli('apply', False)
        self.assertEqual(self.snapshot(), {'a': b'a'})

    def test_three_cycle_and_directory_destination(self):
        for a in 'abc': self.put(a, a.encode())
        self.preview([('a','b'),('b','c'),('c','a')])
        self.run_cli('apply')
        self.assertEqual(self.snapshot(), {'a': b'c', 'b': b'a', 'c': b'b'})
        self.run_cli('undo')
        self.assertEqual(self.snapshot(), {'a': b'a', 'b': b'b', 'c': b'c'})
        self.plan.unlink()
        (self.root / 'folder').mkdir()
        self.csv.write_text('from,to\na,folder\n', encoding='utf-8')
        self.run_cli('preview', False)

    def test_record_commit_failure_rolls_back(self):
        self.put('a', b'a')
        self.preview([('a','b')])
        spec = importlib.util.spec_from_file_location('rename_commit', APP)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        real = mod.save
        def fail_completed(path, doc):
            if doc.get('state') == 'completed': raise OSError('injected journal commit failure')
            return real(path, doc)
        with patch.object(mod, 'save', fail_completed):
            with self.assertRaisesRegex(Exception, 'Original filenames and contents restored'):
                mod.apply(self.root, self.plan, self.journal)
        self.assertEqual(self.snapshot(), {'a': b'a'})
        self.assertEqual(json.loads(self.journal.read_text(encoding='utf-8'))['state'], 'failed')

if __name__ == '__main__':
    unittest.main(verbosity=2)
