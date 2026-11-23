import pathlib,shutil,subprocess,json,hashlib
base=pathlib.Path('/sandbox');original=base/'release-a';candidate=base/'candidate';evidence=base/'validation';evidence.mkdir(exist_ok=True)
def manifest(folder):return {str(p.relative_to(folder)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(folder.rglob('*')) if p.is_file()}
before=manifest(original)
shutil.copytree(original,candidate)
shutil.copyfile(base/'remaining-validation.test.mjs',candidate/'checks/remaining-validation.test.mjs')
def checks(name,files):
 r=subprocess.run(['node','--test',*files],cwd=candidate,capture_output=True,text=True,timeout=40);(evidence/name).write_text(r.stdout+r.stderr);return r.returncode
red=checks('red.txt',['checks/remaining-validation.test.mjs']);assert red!=0,'Expected obsolete counter failure'
server=candidate/'server.mjs';s=server.read_text();s=s.replace('createApp({root,ask,budgetFile}={})','createApp({root,ask}={})');old=",turns:budgetFile&&fs.existsSync(budgetFile)?JSON.parse(fs.readFileSync(budgetFile)).used:0,limit:12";assert old in s;s=s.replace(old,'');old=",budgetFile:path.join(runtimeBase,'records/turns.json')";assert old in s;s=s.replace(old,'');server.write_text(s)
js=candidate/'public/app.js';s=js.read_text();old="$('budget').textContent=`Trial allowance: ${data.turns} of ${data.limit} answer turns used.`;";assert old in s;js.write_text(s.replace(old,''))
html=candidate/'public/index.html';s=html.read_text();old='<p id="budget" class="privacy"></p>';assert old in s;html.write_text(s.replace(old,''))
green=checks('green.txt',['checks/remaining-validation.test.mjs','checks/server.test.mjs','checks/documents.test.mjs','checks/chunks.test.mjs','checks/client.test.mjs']);assert green==0,'Candidate checks failed'
assert manifest(original)==before,'Original release changed'
after=manifest(candidate);(evidence/'candidate-manifest.json').write_text(json.dumps(after,indent=2));(evidence/'result.json').write_text(json.dumps({'uid':__import__('os').getuid(),'originalUnchanged':True,'redExit':red,'greenExit':green,'changedProductFiles':[p for p in before if before[p]!=after[p]],'inference':'mocked; no host bridge or token'},indent=2));print('PASS: red counter reproduced, candidate green, original unchanged')
