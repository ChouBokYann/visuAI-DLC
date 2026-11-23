import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {install,createTarget} from '../target/runtime.mjs';
const [candidate]=process.argv.slice(2);assert(['B','C'].includes(candidate));
const run=JSON.parse(fs.readFileSync('target/state/run.json'));
const initial=JSON.parse(fs.readFileSync('evidence/executor-a-seed.json')).run;
assert.deepEqual(run,initial,'Never replace the live backend');
const state=path.resolve('evidence/executor-regression-'+candidate+'-target');
assert(!fs.existsSync(state),'Retain first attempt evidence');
const installed=install(state,path.resolve('artifacts',candidate),'regression-'+candidate);
const config=JSON.parse(fs.readFileSync(path.join(state,'releases',candidate,'release.json')));
const evidence={started:new Date().toISOString(),command:'node records/routing-regression.mjs '+candidate,candidate,installed,config,run,owner:'/root/e07_executor',pid:process.pid,state,assertionHash:crypto.createHash('sha256').update(fs.readFileSync(import.meta.filename)).digest('hex'),passed:0,total:1};
const server=createTarget(state,run.apiPort);
try{
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
 evidence.port=server.address().port;
 const response=await fetch('http://127.0.0.1:'+evidence.port+'/api/shortlist');
 evidence.actual={status:response.status,body:await response.json()};
 assert.equal(response.status,200,'Target-facing shortlist must reach the real backend');
 assert.deepEqual(evidence.actual.body,{schemaVersion:1,ids:['nylon','mill']},'Saved state remains readable');
 evidence.passed=1;
}catch(error){evidence.error={name:error.name,message:error.message};process.exitCode=1;}
finally{
 if(server.listening)await new Promise(resolve=>server.close(resolve));
 evidence.listenerClosed=!server.listening;
 evidence.finished=new Date().toISOString();
 assert.deepEqual(JSON.parse(fs.readFileSync('target/state/run.json')),initial);
 fs.writeFileSync('evidence/executor-regression-'+candidate+'.json',JSON.stringify(evidence,null,2));
 console.log(JSON.stringify(evidence));
}
