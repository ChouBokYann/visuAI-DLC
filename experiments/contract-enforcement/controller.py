"""Local experiment controller. Receipt integrity is not an OS security boundary."""
from pathlib import Path
import json,hashlib,uuid,re,subprocess,sys
from jsonschema import Draft202012Validator
BASE=Path(__file__).resolve().parent
ROOT=BASE.parents[1]
STORE=ROOT/'output/contract-enforcement/receipts'
INPUTS=['app.mjs','index.html','data.json','TASK.md','FEEDBACK.md']
REQUIREMENTS={'REQ-MATCH':'meaning','REQ-SELECT':'interaction','REQ-FACTS':'grounding'}
def read(p):return json.loads(Path(p).read_text(encoding='utf-8-sig'))
def digest(b):return hashlib.sha256(b).hexdigest()
def validate_record(work):
 r=read(work/'work.json');schema=read(BASE/'work.schema.json')
 errors=list(Draft202012Validator(schema).iter_errors(r))
 if errors:raise ValueError('; '.join(e.message for e in errors))
 seen=set();source=(work/'FEEDBACK.md').read_text(encoding='utf-8-sig')
 for a in r['applications']:
  k=a['requirement'];anchor=REQUIREMENTS[k]
  if k in seen or a['check_id']!=anchor or a['source']!=f'FEEDBACK.md#{anchor}' or f'<a id="{anchor}"></a>' not in source:raise ValueError('duplicate requirement or unresolved/mismatched source/check')
  seen.add(k)
 if seen!=set(REQUIREMENTS):raise ValueError('required coverage missing')
 return r
def fingerprint(work,checker_identity=None):
 files={n:digest((work/n).read_bytes()) for n in INPUTS}
 if (work/'work.json').exists():
  contract=read(work/'work.json');contract.pop('evidence_ref',None);files['contract']=digest(json.dumps(contract,sort_keys=True).encode())
 files['checker']=checker_identity or digest(b''.join((BASE/n).read_bytes() if (BASE/n).exists() else b'' for n in ['controller.py','oracle.mjs','work.schema.json']))
 return digest(json.dumps(files,sort_keys=True).encode())
def record_receipt(store,work,result,before):
 after=fingerprint(work)
 if before!=after:raise ValueError('inputs changed during run; no current receipt')
 store.mkdir(parents=True,exist_ok=True);ref=uuid.uuid4().hex
 receipt={'id':ref,'workspace':str(work.resolve()),'fingerprint':after,'result':result}
 raw=json.dumps(receipt,sort_keys=True,indent=2).encode()
 with (store/(ref+'.json')).open('xb') as f:f.write(raw)
 with (store/(ref+'.sha256')).open('x') as f:f.write(digest(raw))
 return ref
def complete(work,store=STORE):
 try:
  r=validate_record(work)
  if any(a['applicability']!='applies' for a in r['applications']):raise ValueError('required applicability unresolved or excluded')
  ref=r['evidence_ref']
  if not isinstance(ref,str) or not re.fullmatch('[0-9a-f]{32}',ref):raise ValueError('missing or unknown runner receipt')
  raw=(store/(ref+'.json')).read_bytes()
  if digest(raw)!=(store/(ref+'.sha256')).read_text():raise ValueError('receipt integrity mismatch')
  receipt=json.loads(raw)
  if receipt['workspace']!=str(work.resolve()) or receipt['fingerprint']!=fingerprint(work):raise ValueError('receipt belongs to another or stale state')
  result=receipt['result'];groups=result.get('groups',{});checks=result.get('checks',[])
  for group in REQUIREMENTS.values():
   items=[x for x in checks if x.get('group')==group];g=groups.get(group,{})
   if not items or g.get('count')!=len(items) or g.get('passed') is not True or any(x.get('pass') is not True for x in items):raise ValueError(f'failed/missing/empty evidence group: {group}')
  return {'accepted':True,'verdict':'Verified against registered local checks; human acceptance unverified','receipt':ref}
 except (ValueError,OSError,KeyError,TypeError) as e:return {'accepted':False,'verdict':'Incomplete or changes required','reason':str(e)}
def run(work,arm,phase):
 before=fingerprint(work);artifacts=STORE/('artifacts-'+uuid.uuid4().hex);artifacts.mkdir(parents=True)
 process=subprocess.run(['node',str(BASE/'oracle.mjs'),str(work),f'http://127.0.0.1:17833/{arm}/{phase}/',str(artifacts)],capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=90)
 (artifacts/'stdout.txt').write_text(process.stdout,encoding='utf-8');(artifacts/'stderr.txt').write_text(process.stderr,encoding='utf-8')
 if process.returncode or not (artifacts/'result.json').exists():raise ValueError('runner failed: '+process.stderr[-1000:])
 result=read(artifacts/'result.json');result['artifact_dir']=str(artifacts.relative_to(ROOT))
 ref=record_receipt(STORE,work,result,before)
 return {'evidence_ref':ref,'groups':result['groups'],'artifact_dir':result['artifact_dir']}
if __name__=='__main__':
 try:
  command,arm,phase=sys.argv[1:]
  if arm not in 'ABCD' or len(arm)!=1 or phase not in ['build','transfer']:raise ValueError('invalid target')
  work=BASE/arm/phase
  if command=='validate':validate_record(work);answer={'valid':True}
  elif command=='complete':answer=complete(work)
  elif command=='run':answer=run(work,arm,phase)
  else:raise ValueError('unknown command')
  print(json.dumps(answer));sys.exit(0 if answer.get('accepted',answer.get('valid',all(g['passed'] for g in answer.get('groups',{}).values()))) else 1)
 except (ValueError,OSError,subprocess.TimeoutExpired) as e:print(json.dumps({'error':str(e)}));sys.exit(1)
