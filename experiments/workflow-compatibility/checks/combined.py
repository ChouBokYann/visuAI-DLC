import json, pathlib, socket, os, hashlib
base=pathlib.Path(__file__).resolve().parent.parent
assert os.environ['HEADROOM_OFFLINE']=='1'
attempts=[]
def deny(*args,**kwargs):
    attempts.append('blocked Python socket connection')
    raise RuntimeError('offline trial')
socket.socket.connect=deny
socket.create_connection=deny
from headroom import compress, CompressConfig
from headroom.transforms.compaction_codec import expand_compacted,is_compacted
messages=json.loads((base/'records/headroom-input.json').read_text(encoding='utf-8'))
def read(name):
    raw=(base/'evidence'/name).read_bytes()
    return raw.decode('utf-16' if raw.startswith(b'\xff\xfe') else 'utf-8-sig').strip()
reports=[json.loads(read('openshell-probe-'+phase+'.log')) for phase in ('initial','restarted')]
assert all(all(v is True for v in r['checks'].values()) for r in reports)
assert reports[0]['marker']==reports[1]['marker']
packet={'sandbox_reports':reports,'download_failed':read('openshell-download.log'),'revision':'c276159399bcca4bec874b3a521dfa61b5a0200b','owner':'root','correction_rounds_used':2,'setup_retries_used':1}
assert 'No such file or directory' in packet['download_failed']
messages.extend([{'role':'assistant','content':None,'tool_calls':[{'id':'e09-sandbox','type':'function','function':{'name':'read_evidence','arguments':'{}'}}]},{'role':'tool','tool_call_id':'e09-sandbox','content':json.dumps(packet)}])
original=json.loads(json.dumps(messages))
result=compress(messages,model='gpt-4o',config=CompressConfig(mode='agent',kompress_model='disabled',compress_system_messages=False,diagnostics=True))
assert messages==original and len(result.messages)==len(original) and result.lossless
for before,after in zip(original,result.messages):
    assert {k:v for k,v in before.items() if k!='content'}=={k:v for k,v in after.items() if k!='content'}
    if before['content']!=after['content']:
        assert before['role']=='tool' and is_compacted(after['content'])
        assert json.dumps(json.loads(before['content']),sort_keys=True)==json.dumps(expand_compacted(after['content']),sort_keys=True)
report={'passed':True,'scope':'host Headroom processes actual sandbox stdout evidence; no in-sandbox agent','networkAttempts':attempts,'inputBytes':len(json.dumps(original).encode()),'outputBytes':len(json.dumps(result.messages).encode()),'metrics':{k:getattr(result,k) for k in ['tokens_before','tokens_after','tokens_saved','reverted_messages']},'sandboxPacketSha256':hashlib.sha256(json.dumps(packet,sort_keys=True).encode()).hexdigest()}
(base/'evidence/combined.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report))
