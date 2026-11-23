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
BASE = Path(__file__).parent / 'fixtures'
BASE.mkdir(exist_ok=True)
spec = importlib.util.spec_from_file_location('rename_app', APP)
mod = importlib.util.module_from_spec(spec)
# Loaded in fault-injection tests only, so CLI baseline failures remain observable.

class RenameTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(dir=BASE)
        self.addCleanup(self.temp.cleanup)
        self.home = Path(self.temp.name)
        self.root = self.home / 'files'
        self.root.mkdir()
        self.plan = self.home / 'plan.json'
        self.journal = self.home / 'journal.json'
        self.csv = self.home / 'names.csv'
        (self.root / 'a.txt').write_bytes(b'A\x00\xff')
        (self.root / 'b.txt').write_bytes(b'B')
        (self.root / 'keep').write_bytes(b'unchanged')
    def listing(self):
        return {p.name:p.read_bytes() for p in self.root.iterdir()}
    def run_cli(self, command, success=True):
        args = [sys.executable, '-B', str(APP.resolve()), command, '--root', str(self.root.resolve())]
        args += ['--csv',str(self.csv.resolve()),'--plan',str(self.plan.resolve())] if command == 'preview' else ['--journal',str(self.journal.resolve())]
        if command == 'apply': args += ['--plan',str(self.plan.resolve())]
        result = subprocess.run(args, cwd=self.home, capture_output=True, text=True, encoding='utf-8')
        obj = json.loads(result.stdout)
        self.assertEqual(result.returncode == 0, success, result.stdout + result.stderr)
        self.assertEqual(obj['ok'], success)
        return obj
    def preview(self, rows, success=True):
        with self.csv.open('w',encoding='utf-8',newline='') as f:
            w=csv.writer(f); w.writerow(['from','to']); w.writerows(rows)
        return self.run_cli('preview',success)
    def test_swap_roundtrip(self):
        before=self.listing()
        result=self.preview([('a.txt','b.txt'),('b.txt','a.txt')])
        self.assertEqual(result['changes'],[{'from':'a.txt','to':'b.txt'},{'from':'b.txt','to':'a.txt'}])
        self.assertEqual(before,self.listing())
        self.run_cli('apply')
        self.assertEqual((self.root/'a.txt').read_bytes(),b'B')
        self.run_cli('apply',False)
        self.run_cli('undo')
        self.assertEqual(before,self.listing())
        self.run_cli('undo',False)
        self.assertEqual(json.loads(self.journal.read_text(encoding='utf-8'))['state'],'undone')
    def test_unicode_quoted_and_cycle(self):
        (self.root/'雪, one.txt').write_bytes(b'C')
        before=self.listing()
        self.preview([('a.txt','b.txt'),('b.txt','雪, one.txt'),('雪, one.txt','a.txt')])
        self.run_cli('apply'); self.run_cli('undo')
        self.assertEqual(before,self.listing())
    def test_invalid_batches(self):
        for rows in [[],[('missing','x')],[('a.txt','x'),('a.txt','y')],[('a.txt','X'),('b.txt','x')],[('a.txt','keep')],[('a.txt','../x')],[('a.txt','C:\\x')],[('a.txt','CON.txt')],[('a.txt','x.')],[('a.txt','')],[('a.txt','a.txt')]]:
            with self.subTest(rows=rows):
                before=self.listing(); self.preview(rows,False); self.assertEqual(before,self.listing())
    def test_stale_source(self):
        self.preview([('a.txt','c.txt')]); (self.root/'a.txt').write_bytes(b'changed')
        before=self.listing(); self.run_cli('apply',False); self.assertEqual(before,self.listing())
    def test_new_conflict(self):
        self.preview([('a.txt','c.txt')]); (self.root/'c.txt').write_bytes(b'new')
        before=self.listing(); self.run_cli('apply',False); self.assertEqual(before,self.listing())
    def test_undo_modified(self):
        self.preview([('a.txt','c.txt')]); self.run_cli('apply'); (self.root/'c.txt').write_bytes(b'changed')
        before=self.listing(); self.run_cli('undo',False); self.assertEqual(before,self.listing())
    def test_undo_occupied(self):
        self.preview([('a.txt','c.txt')]); self.run_cli('apply'); (self.root/'a.txt').write_bytes(b'new')
        before=self.listing(); self.run_cli('undo',False); self.assertEqual(before,self.listing())
    def test_artifacts_not_overwritten(self):
        self.preview([('a.txt','c.txt')]); saved=self.plan.read_bytes(); self.run_cli('preview',False); self.assertEqual(saved,self.plan.read_bytes())
        self.journal.write_text('keep',encoding='utf-8'); self.run_cli('apply',False); self.assertEqual(self.journal.read_text(encoding='utf-8'),'keep')
    def test_tampered_plan(self):
        self.preview([('a.txt','c.txt')]); p=json.loads(self.plan.read_text(encoding='utf-8')); p['changes'][0]['to']='../escape'; self.plan.write_text(json.dumps(p),encoding='utf-8')
        before=self.listing(); self.run_cli('apply',False); self.assertEqual(before,self.listing())
    def test_missing_after_preview(self):
        self.preview([('a.txt','c.txt')]); (self.root/'a.txt').unlink()
        before=self.listing(); self.run_cli('apply',False); self.assertEqual(before,self.listing())
    def test_wrong_root(self):
        self.preview([('a.txt','c.txt')]); p=json.loads(self.plan.read_text(encoding='utf-8')); p['root']=str(self.home)
        self.plan.write_text(json.dumps(p),encoding='utf-8'); before=self.listing()
        self.run_cli('apply',False); self.assertEqual(before,self.listing())
    def test_case_only_roundtrip(self):
        before=self.listing(); self.preview([('a.txt','A.TXT')]); self.run_cli('apply'); self.run_cli('undo')
        self.assertEqual(before,self.listing())
    def test_csv_inside_root(self):
        self.csv=self.root/'names.csv'; self.preview([('a.txt','c.txt')]); self.run_cli('apply'); self.run_cli('undo')
        self.assertTrue(self.csv.exists())
    def test_directories(self):
        (self.root/'directory').mkdir()
        self.preview([('directory','new')],False); self.preview([('a.txt','directory')],False)
    def test_symlinks(self):
        link=self.root/'linked'
        try: link.symlink_to(self.root/'a.txt')
        except OSError as error: self.skipTest(f'Symlink privilege unavailable: {error}')
        self.preview([('linked','new')],False); self.preview([('a.txt','linked')],False)
        self.assertTrue(link.is_symlink())
    def test_undo_fault_rolls_back(self):
        spec.loader.exec_module(mod)
        self.preview([('a.txt','b.txt'),('b.txt','a.txt')]); self.run_cli('apply'); before=self.listing()
        real=mod.os.rename; calls=0
        def fail_once(src,dst):
            nonlocal calls
            calls+=1
            if calls==3: raise OSError('synthetic undo failure')
            return real(src,dst)
        with patch.object(mod.os,'rename',fail_once):
            with self.assertRaises(Exception): mod.undo(self.root,self.journal)
        self.assertEqual(before,self.listing())
        self.assertEqual(json.loads(self.journal.read_text(encoding='utf-8'))['state'],'undo_failed')
    def test_metadata_finish_failure_rolls_back(self):
        spec.loader.exec_module(mod)
        self.preview([('a.txt','c.txt')]); before=self.listing(); real=mod.save
        def fail_complete(path,obj,new=False):
            if obj.get('state')=='completed': raise OSError('synthetic journal write failure')
            return real(path,obj,new)
        with patch.object(mod,'save',fail_complete):
            with self.assertRaises(Exception): mod.apply(self.root,self.plan,self.journal)
        self.assertEqual(before,self.listing())
        self.assertEqual(json.loads(self.journal.read_text(encoding='utf-8'))['state'],'failed')
    def test_mid_batch_rollback(self):
        spec.loader.exec_module(mod)
        self.preview([('a.txt','b.txt'),('b.txt','a.txt')]); before=self.listing()
        real=mod.os.rename; calls=0
        def fail_once(src,dst):
            nonlocal calls
            calls+=1
            if calls==4: raise OSError('synthetic rename failure')
            return real(src,dst)
        with patch.object(mod.os,'rename',fail_once):
            with self.assertRaises(Exception): mod.apply(self.root,self.plan,self.journal)
        self.assertEqual(before,self.listing())
        self.assertEqual(json.loads(self.journal.read_text(encoding='utf-8'))['state'],'failed')

if __name__ == '__main__': unittest.main(verbosity=2)
