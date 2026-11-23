from pathlib import Path
import json,time,hashlib
from graphify.build import build_from_json
from graphify.cluster import cluster,score_all
from graphify.export import to_json
from graphify.report import generate
from graphify.analyze import god_nodes,surprising_connections
R=Path(__file__).resolve().parents[2]; B=Path(__file__).parent; O=R/'output/graphify-feedback'; C=B/'corpus'; D=B/'graphify-out'
t=time.perf_counter();x=json.loads((O/'extraction.json').read_text(encoding='utf-8-sig'))
ids=[n['id'] for n in x['nodes']];assert len(ids)==len(set(ids)) and ids
assert all(e['source'] in ids and e['target'] in ids for e in x['edges'])
sources={str(Path(n['source_file']).resolve()) for n in x['nodes']}
assert all(Path(n['source_file']).resolve().is_relative_to(C.resolve()) for n in x['nodes'])
missing=[str(p) for p in C.rglob('*.md') if str(p.resolve()) not in sources]
g=build_from_json(x,root=str(C.resolve()),directed=True);assert g.number_of_nodes()>0
communities=cluster(g);assert to_json(g,communities,str(D/'graph.json'))
labels={k:f'Community {k}' for k in communities}
report=generate(g,communities,score_all(g,communities),labels,god_nodes(g),surprising_connections(g,communities),json.loads((D/'.graphify_detect.json').read_text()),{'input':0,'output':0},str(C))
(D/'GRAPH_REPORT.md').write_text(report,encoding='utf-8')
result={'version':'0.9.37','nodes':g.number_of_nodes(),'edges':g.number_of_edges(),'extracted_edges':len(x['edges']),'missing_source_documents':missing,'build_seconds':time.perf_counter()-t,'semantic_token_counts':'unmetered; zero placeholders in extractor/report do not mean free inference','graph_sha256':hashlib.sha256((D/'graph.json').read_bytes()).hexdigest()}
(O/'index-check.json').write_text(json.dumps(result,indent=2),encoding='utf-8');print(json.dumps(result))
