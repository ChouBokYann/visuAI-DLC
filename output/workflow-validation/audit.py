from pathlib import Path
import hashlib,json,re,subprocess
root=Path.cwd(); b=root/'output/workflow-validation'; h=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
orig=json.loads((b/'evidence/fixture-origin.json').read_text()); assert all(h(Path(x['file']))==x['hash'] for x in orig)
baseline=json.loads((b/'evidence/source-baseline.json').read_text()); changed=[x['file'] for x in baseline['files'] if h(root/x['file'])!=x['hash']]
assert set(changed)=={'skills/implementation/implement-increments/SKILL.md','docs/workflows/engineering.md','docs/workflows/deliver-change.md'},changed
links=0
for f in changed:
 for target in re.findall(r'\]\(([^)]+)\)',(root/f).read_text()):
  if '://' in target or target.startswith('#'):continue
  assert ((root/f).parent/target.split('#')[0]).exists(),(f,target)
  links+=1
for name in ['baseline-results.json','candidate-results.json']:
 for x in json.loads((b/'evidence'/name).read_text())['oracles']:assert h(b/x['file'])==x['sha256'],x
prior=subprocess.check_output(['git','-c',f'safe.directory={root}','ls-tree','-r','--name-only','c276159','skills'],text=True).splitlines(); prior={x for x in prior if x.endswith('/SKILL.md')}
current={p.relative_to(root).as_posix() for p in (root/'skills').rglob('SKILL.md')}
e=root/'output/e11-worktree/experiments/sandbox-document-chatbot'; diffs=[]
for p in (e/'artifacts').rglob('*'):
 if p.is_file():
  q=e/'candidate'/p.relative_to(e/'artifacts')
  if not q.exists() or h(p)!=h(q):diffs.append(p.relative_to(e/'artifacts').as_posix())
for name in ['acp.mjs','bridge-client.mjs','documents.mjs']:assert h(e/'artifacts'/name)==h(e/'candidate'/name)
result={'originalFilesUnchanged':len(orig),'changedCanonicalPaths':changed,'localLinksResolved':links,'oracleHashesMatch':True,'currentSkillCount':len(current),'priorPinSkillCount':len(prior),'onlyCurrent':sorted(current-prior),'onlyHistoricalPin':sorted(prior-current),'e11OriginalVsCandidateChanged':diffs,'unchangedProviderAndRetrievalModules':['acp.mjs','bridge-client.mjs','documents.mjs']}
(b/'evidence/integration-audit.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
