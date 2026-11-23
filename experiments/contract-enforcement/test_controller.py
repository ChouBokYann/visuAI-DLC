import unittest,tempfile,json,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent))
import controller as c

class ControllerTests(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup);self.root=Path(self.tmp.name);self.work=self.root/'work';self.work.mkdir();self.store=self.root/'receipts'
  for name in c.INPUTS:(self.work/name).write_text('baseline',encoding='utf-8')
  (self.work/'FEEDBACK.md').write_text('\n'.join(f'<a id="{a}"></a>' for a in c.REQUIREMENTS.values()),encoding='utf-8')
  self.record={'version':1,'goal':'Help choose a usable space','applications':[{'requirement':k,'source':f'FEEDBACK.md#{v}','applicability':'applies','reason':'Current source requirement','action':'Implement and check the behavior','check_id':v} for k,v in c.REQUIREMENTS.items()],'evidence_ref':None}
  self.save();self.result={'groups':{g:{'passed':True,'count':2} for g in c.REQUIREMENTS.values()},'checks':[{'group':g,'name':str(i),'pass':True} for g in c.REQUIREMENTS.values() for i in range(2)]}
 def save(self): (self.work/'work.json').write_text(json.dumps(self.record),encoding='utf-8')
 def receipt(self,result=None):
  ref=c.record_receipt(self.store,self.work,result or self.result,c.fingerprint(self.work));self.record['evidence_ref']=ref;self.save();return ref
 def test_valid_receipt_and_reference_only_update(self):
  self.receipt();self.assertTrue(c.complete(self.work,self.store)['accepted'])
 def test_structurally_valid_false_claim_is_not_understanding(self):
  self.record['applications'][0]['action']='Invent stairs from false access';self.save();c.validate_record(self.work)
 def test_malformed_missing_coverage_and_reference(self):
  for mutate in [lambda:self.record.update(version=2),lambda:self.record['applications'].pop(),lambda:self.record['applications'][0].update(source='FEEDBACK.md#missing'),lambda:self.record.update(unexpected=True)]:
   original=json.loads(json.dumps(self.record));mutate();self.save()
   with self.assertRaises(ValueError):c.validate_record(self.work)
   self.record=original;self.save()
 def test_missing_and_forged_receipt(self):
  self.assertFalse(c.complete(self.work,self.store)['accepted']);self.record['evidence_ref']='invented';self.save();self.assertFalse(c.complete(self.work,self.store)['accepted'])
 def test_altered_receipt(self):
  ref=self.receipt();p=self.store/(ref+'.json');p.write_text('{}');self.assertFalse(c.complete(self.work,self.store)['accepted'])
 def test_stale_code_data_requirements(self):
  for name in ['app.mjs','data.json','FEEDBACK.md']:
   old=(self.work/name).read_text();self.receipt();(self.work/name).write_text(old+'changed');self.assertFalse(c.complete(self.work,self.store)['accepted']);(self.work/name).write_text(old)
 def test_contract_change_invalidates_evidence(self):
  self.receipt();self.record['applications'][0]['action']='Different action';self.save();self.assertFalse(c.complete(self.work,self.store)['accepted'])
 def test_failed_empty_missing_groups(self):
  for groups in [{},{g:{'passed':True,'count':0} for g in c.REQUIREMENTS.values()},{g:{'passed':False,'count':2} for g in c.REQUIREMENTS.values()}]:
   self.receipt({'groups':groups,'checks':[]});self.assertFalse(c.complete(self.work,self.store)['accepted'])
 def test_unresolved_cannot_complete(self):
  self.record['applications'][0]['applicability']='unresolved';self.save();self.receipt();self.assertFalse(c.complete(self.work,self.store)['accepted'])
 def test_mutation_during_run(self):
  before=c.fingerprint(self.work);(self.work/'app.mjs').write_text('changed')
  with self.assertRaises(ValueError):c.record_receipt(self.store,self.work,self.result,before)
 def test_checker_identity_changes_fingerprint(self):
  self.assertNotEqual(c.fingerprint(self.work,checker_identity='v1'),c.fingerprint(self.work,checker_identity='v2'))

if __name__=='__main__':unittest.main()
