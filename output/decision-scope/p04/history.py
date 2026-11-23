import sys,json
from pathlib import Path
d=Path(__file__).resolve().parent
records=json.loads((d/'archive.json').read_text(encoding='utf8'))
key=sys.argv[1]
if key=='list':
 result={k:v['title'] for k,v in records.items()}
else:
 result=records[key]
with (d/'reads.log').open('a',encoding='utf8') as f: print(key,file=f)
print(json.dumps(result))
