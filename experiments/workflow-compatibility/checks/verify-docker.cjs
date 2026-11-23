const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto'),path=require('node:path');
const base=path.resolve(__dirname,'..');process.chdir(base);
const read=p=>{const b=fs.readFileSync(p);return b.toString(b[0]===255&&b[1]===254?'utf16le':'utf8').replace(/^\uFEFF/,'').trim();};
const lines=p=>read(p).split(/\r?\n/).filter(Boolean).map(JSON.parse);
require('../readiness.cjs').run('records/baseline.json','node',()=>{});
const before=lines('records/docker/containers-before.jsonl'),after=lines('records/docker/containers-after.jsonl');
for(const c of before){const found=after.find(x=>x.ID===c.ID);assert(found,'original container removed: '+c.Names);assert.equal(found.State,c.State,'original container state changed: '+c.Names);}
assert(!after.some(c=>c.Names.startsWith('e09-')||c.Labels.includes('openshell.ai/sandbox-name=e09-probe')));
assert.equal(read('records/docker/owned-volumes-after.jsonl'),'');
const initial=JSON.parse(read('evidence/openshell-probe-initial.log')),restarted=JSON.parse(read('evidence/openshell-probe-restarted.log'));
for(const r of [initial,restarted])assert(Object.values(r.checks).every(v=>v===true));
assert.equal(initial.marker,restarted.marker);
const instance=p=>read(p).match(/Main process instance: (.*)/)[1];
assert.notEqual(instance('evidence/openshell-state-initial.log'),instance('evidence/openshell-state-restarted.log'));
assert(read('evidence/openshell-workload.log').includes('Landlock ruleset built'));
assert(read('evidence/openshell-supervisor.log').includes('transparent_tcp_mapping_denied'));
assert.equal(read('evidence/sentinel-after.log'),'synthetic-e09-sentinel');
const mounts=JSON.parse(read('records/docker/workload-mounts.json'));
assert(mounts.every(m=>!m.Destination.includes('docker.sock')));
assert(JSON.parse(read('evidence/combined.json')).passed);
const trialHashes={};
for(const dir of ['checks','evidence','records/docker'])for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const file=dir+'/'+entry.name;
 if(entry.isFile()&&!['final-verification.json','docker-final-verification.json'].includes(entry.name))trialHashes[file]=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}
const report={at:new Date().toISOString(),preservedFiles:Object.keys(JSON.parse(read('records/baseline.json')).files).length,baselineUnchanged:true,originalContainersPreserved:before.length,originalRunningContainersPreserved:before.filter(x=>x.State==='running').length,ownedContainersRemaining:0,ownedVolumesRemaining:0,initialChecks:initial.checks,restartedChecks:restarted.checks,mainProcessIdentityChanged:true,trialHashes,limits:'stdout evidence export passed; dedicated download command failed; no autonomous agent/cloud/inference test; cached images and local artifacts retained'};
fs.writeFileSync('evidence/docker-final-verification.json',JSON.stringify(report,null,2));console.log({passed:true,preservedFiles:report.preservedFiles,originalContainersPreserved:before.length});
