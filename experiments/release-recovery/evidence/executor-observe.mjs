import fs from 'node:fs';
import assert from 'node:assert/strict';
const [phase,expected]=process.argv.slice(2);assert(/^[a-z-]+$/.test(phase));
const run=JSON.parse(fs.readFileSync('target/state/run.json'));const initial=JSON.parse(fs.readFileSync('evidence/executor-a-seed.json')).run;assert.deepEqual(run,initial,'Stable target/backend identity');
const observations=[];for(const [port,route] of [[run.targetPort,'/__release'],[run.targetPort,'/health'],[run.targetPort,'/api/shortlist'],[run.apiPort,'/api/shortlist'],[run.apiPort,'/api/shortlists']]){const response=await fetch('http://127.0.0.1:'+port+route);observations.push({port,route,status:response.status,body:await response.json()});}
const active=JSON.parse(fs.readFileSync('target/state/active.json'));const config=JSON.parse(fs.readFileSync('target/state/releases/'+active.release+'/release.json'));
const result={at:new Date().toISOString(),command:'node evidence/executor-observe.mjs '+phase+' '+expected,run,active,config,observations};fs.writeFileSync('evidence/executor-'+phase+'.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
assert.equal(active.release,expected);assert.equal(observations[0].body.release,expected);assert.equal(observations[1].status,200);assert.equal(observations[3].status,200);assert.deepEqual(observations[3].body.ids,['nylon','mill']);
