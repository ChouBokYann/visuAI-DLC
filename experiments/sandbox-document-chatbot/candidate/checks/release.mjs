import fs from 'node:fs';import path from 'node:path';import {fork,execFileSync} from 'node:child_process';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
const base=path.resolve('.'),artifact=path.join(base,'artifacts/release-a'),root=path.join(base,'.runtime/release-corpus');
const files=['server.mjs','documents.mjs','acp.mjs','budget.mjs','safety.mjs','codex-gate.mjs','checks/stop-owned-tree.ps1','public/index.html','public/app.js','public/style.css'];
fs.mkdirSync(artifact,{recursive:true});fs.mkdirSync(root,{recursive:true});
const hashes={};for(const file of files){const data=fs.readFileSync(file);hashes[file]=createHash('sha256').update(data).digest('hex');const dest=path.join(artifact,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,data);}
for(const file of fs.readdirSync('corpus'))fs.copyFileSync(path.join('corpus',file),path.join(root,file));
const digest=()=>createHash('sha256').update(JSON.stringify(files.map(f=>[f,createHash('sha256').update(fs.readFileSync(path.join(artifact,f))).digest('hex')]))).digest('hex');
const identity=digest(),report={at:new Date().toISOString(),artifact:identity,files:hashes,observations:[]};fs.writeFileSync('records/release-manifest.json',JSON.stringify(report,null,2));
const url='http://127.0.0.1:17810';let child,exited,output='';
async function stop(){if(!child)return;child.send('shutdown');await Promise.race([exited,new Promise((_,reject)=>setTimeout(()=>reject(Error('Server cleanup timeout')),15000).unref())]);child=null;assert(!fs.existsSync('.runtime/server.lock'));assert(!fs.existsSync('records/termination-blocked.json'));}
async function start(provider){
 child=fork(path.join(artifact,'server.mjs'),[],{cwd:base,env:{...process.env,E10_STATE_DIR:base,E10_DOCS:root,E10_PROVIDER:provider,PORT:'17810'},silent:true});
 exited=new Promise(resolve=>child.once('exit',resolve));
 child.stderr.on('data',b=>output+=b);await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Server start timeout')),10000);child.once('error',reject);child.once('exit',()=>reject(Error('Server exited before readiness')));child.stdout.on('data',b=>{output+=b;if(b.toString().includes('Document chat:')){clearTimeout(timer);resolve();}});});
}
async function ask(label,question){const response=await fetch(url+'/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question})});const data=await response.json();report.observations.push({label,status:response.status,data});return {response,data};}
try{
 await start('codex-acp');
 let r=await ask('A-known','Who owns Atlas and what is its approved pilot budget?');assert.equal(r.response.status,200);assert(r.data.answer.includes('Mira Chen'));assert(r.data.answer.replaceAll(',','').includes('4200'));
 r=await ask('A-conflict','When is the Atlas launch?');assert.equal(r.response.status,200);assert(r.data.answer.includes('14 March'));assert(r.data.answer.includes('21 March'));
 const before=JSON.parse(fs.readFileSync('records/turns.json')).used;r=await ask('A-no-evidence','unicorn weather forecast');assert.equal(r.data.state,'no-evidence');assert.equal(JSON.parse(fs.readFileSync('records/turns.json')).used,before);
 const status=await (await fetch(url+'/api/status')).json();const old=status.documents.find(d=>d.name==='atlas.md');
 fs.writeFileSync(path.join(root,'atlas.md'),'Atlas owner is a temporary refresh-test value.');
 const refreshed=await (await fetch(url+'/api/refresh',{method:'POST'})).json();assert.notEqual(refreshed.documents.find(d=>d.name==='atlas.md').id,old.id);assert.equal((await fetch(url+'/api/source/'+old.id)).status,404);
 fs.writeFileSync(path.join(root,'added.txt'),'The Violet code is 7318.');assert.equal((await (await fetch(url+'/api/status')).json()).documents.length,status.documents.length+1);fs.unlinkSync(path.join(root,'added.txt'));fs.copyFileSync('corpus/atlas.md',path.join(root,'atlas.md'));
 report.observations.push({label:'runtime-refresh',editedIdChanged:true,oldSource404:true,addedThenDeleted:true});
 await stop();await start('unavailable');r=await ask('B-controlled-fault','Who owns Atlas?');assert.equal(r.response.status,503);assert.equal(r.data.state,'unavailable');await stop();
 assert.equal(digest(),identity);await start('codex-acp');r=await ask('A-restored','Who owns Atlas and what is its approved pilot budget?');assert.equal(r.response.status,200);assert(r.data.answer.includes('Mira Chen'));assert(r.data.answer.replaceAll(',','').includes('4200'));assert.equal(digest(),identity);
 report.passed=true;report.recoveredArtifact=identity;
}catch(error){report.passed=false;report.error=error.message;process.exitCode=1;}
finally{
 try{await stop();report.cleanedUp=true;}catch(error){report.cleanupError=error.message;if(child){try{execFileSync('powershell.exe',['-NoProfile','-File','checks/stop-owned-tree.ps1','-RootPid',String(child.pid)]);}catch{}}process.exitCode=1;}
 report.turnsUsed=JSON.parse(fs.readFileSync('records/turns.json')).used;fs.writeFileSync('evidence/release.json',JSON.stringify(report,null,2));fs.writeFileSync('evidence/release-console.log',output);console.log({passed:report.passed,cleanedUp:report.cleanedUp,turnsUsed:report.turnsUsed,error:report.error,cleanupError:report.cleanupError});
}
