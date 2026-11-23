import fs from 'node:fs';
import assert from 'node:assert/strict';
const run=JSON.parse(fs.readFileSync('target/state/run.json'));
const base='http://127.0.0.1:';
const before=await fetch(base+run.apiPort+'/api/shortlist');const prior=await before.json();assert.deepEqual(prior.ids,[],'Seed only initial empty state');
const response=await fetch(base+run.apiPort+'/api/shortlist',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({schemaVersion:1,ids:['nylon','mill']})});const seeded=await response.json();assert.equal(response.status,200);assert.deepEqual(seeded.ids,['nylon','mill']);
const observations=[];for(const [port,route] of [[run.targetPort,'/__release'],[run.targetPort,'/health'],[run.targetPort,'/api/shortlist'],[run.apiPort,'/api/shortlist']]){const r=await fetch(base+port+route);observations.push({port,route,status:r.status,body:await r.json()});}
assert.equal(observations[0].body.release,'A');assert.deepEqual(observations[2].body.ids,seeded.ids);
const result={at:new Date().toISOString(),command:'node evidence/executor-seed.mjs',run,prior,seeded,observations};fs.writeFileSync('evidence/executor-a-seed.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
