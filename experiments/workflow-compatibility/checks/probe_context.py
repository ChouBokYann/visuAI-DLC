import os,json,socket,time,hashlib,dataclasses,pathlib,sys
from datetime import datetime,timezone
base=pathlib.Path(__file__).resolve().parent.parent
assert os.environ['HEADROOM_OFFLINE']=='1'
attempts=[]
def deny(*args,**kwargs):
    attempts.append('blocked Python socket connection')
    raise RuntimeError('E09 offline probe blocks network')
socket.socket.connect=deny
socket.create_connection=deny
report={'at':datetime.now(timezone.utc).isoformat(),'checks':[],'networkAttempts':attempts}
try:
    from headroom import compress,CompressConfig
    from headroom.transforms.compaction_codec import expand_compacted,is_compacted
    import importlib.metadata
    report['version']=importlib.metadata.version('headroom-ai')
    contract='REQ-01: omitted note preserves prior value; null clears. EVIDENCE-FAIL: failed; revision='+('a'*64)+'; owner=root; correction_limit=2; do not deploy.'
    rows=[{'id':i,'status':'passed','note':None,'owner':'root'} for i in range(300)]
    rows[149]={'id':149,'status':'failed','note':contract,'owner':'root','empty':'','bool':True,'integer':1,'float':1.0}
    logs='\n'.join(f'{i}: '+(contract if i==149 else 'INFO check passed') for i in range(300))
    code="function update(old, input) { return Object.hasOwn(input, 'note') ? input.note : old.note; }"
    messages=[{'role':'system','content':contract},{'role':'user','content':'Inspect these checks; preserve failure and authority.'}]
    for i,content in enumerate([json.dumps(rows,ensure_ascii=False),logs,code]):
        messages.extend([{'role':'assistant','content':None,'tool_calls':[{'id':f'call-{i}','type':'function','function':{'name':'read_evidence','arguments':'{}'}}]}, {'role':'tool','tool_call_id':f'call-{i}','content':content}])
    original=json.loads(json.dumps(messages));(base/'records/headroom-input.json').write_text(json.dumps(original,ensure_ascii=False,indent=2),encoding='utf8')
    started=time.monotonic()
    result=compress(messages,model='gpt-4o',config=CompressConfig(mode='agent',kompress_model='disabled',compress_system_messages=False,diagnostics=True))
    report['elapsedSeconds']=time.monotonic()-started
    output=result.messages
    def check(name,condition):
        report['checks'].append({'name':name,'passed':bool(condition)})
        assert condition,name
    check('caller input not mutated',messages==original)
    check('message count and order preserved',len(output)==len(original))
    for i,(before,after) in enumerate(zip(original,output)):
        check(f'message {i} protocol fields exact',{k:v for k,v in before.items() if k!='content'}=={k:v for k,v in after.items() if k!='content'})
        if before['role']!='tool':check(f'message {i} instruction/call content exact',before['content']==after['content'])
        elif i==3:
            decoded=expand_compacted(after['content']) if is_compacted(after['content']) else json.loads(after['content'])
            check('all300 JSON rows round-trip with types and negative evidence',json.dumps(decoded,sort_keys=True,ensure_ascii=False)==json.dumps(rows,sort_keys=True,ensure_ascii=False))
        else:check(f'message {i} log/code exact',before['content']==after['content'])
    check('SDK lossless result',result.lossless is True)
    report['metrics']={k:getattr(result,k) for k in ['tokens_before','tokens_after','tokens_saved','compression_ratio','transforms_applied','reverted_messages']}
    report['inputBytes']=len(json.dumps(original,ensure_ascii=False).encode());report['outputBytes']=len(json.dumps(output,ensure_ascii=False).encode())
    report['passed']=True
    (base/'evidence/headroom-output.json').write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding='utf8')
except Exception as e:
    report['passed']=False;report['error']=type(e).__name__+': '+str(e)
finally:
    report['limits']='Library agent/lossless mode only; no proxy, live model, ML compression or security proof for native network paths. Token counters are SDK-reported, not billing.'
    (base/'evidence/headroom-result.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
    print(json.dumps(report,ensure_ascii=True));sys.exit(0 if report.get('passed') else 1)
