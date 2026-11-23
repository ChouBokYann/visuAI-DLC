import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {manifest,install,createTarget} from './runtime.mjs';
const scratch=path.resolve(import.meta.dirname,'../evidence/helper-tests');
fs.mkdirSync(scratch,{recursive:true});
function bundle(id){const dir=fs.mkdtempSync(path.join(scratch,id));fs.mkdirSync(path.join(dir,'dist'));fs.writeFileSync(path.join(dir,'dist/index.html'),'<h1>release '+id+'</h1>');fs.writeFileSync(path.join(dir,'release.json'),JSON.stringify({id,upstreamPath:'/api/shortlist'}));const files=manifest(dir);fs.writeFileSync(path.join(dir,'manifest.json'),JSON.stringify(files));return dir;}
test('install copies verified bytes, rejects tamper/reuse and preserves active release on rejection',()=>{
 const target=fs.mkdtempSync(path.join(scratch,'target-')),a=bundle('A');
 const r=install(target,a,'op-a');assert.equal(r.release,'A');assert.equal(fs.readFileSync(path.join(target,'releases/A/dist/index.html'),'utf8'),'<h1>release A</h1>');
 const before=fs.readFileSync(path.join(target,'active.json'),'utf8');
 assert.throws(()=>install(target,a,'op-a'));assert.throws(()=>install(target,a,'op-other'));
 const b=bundle('B');fs.writeFileSync(path.join(b,'dist/index.html'),'tampered');assert.throws(()=>install(target,b,'op-b'));assert.equal(fs.readFileSync(path.join(target,'active.json'),'utf8'),before);
});
test('installed target serves assets, reports identity and proxies to stable API without reading bundle source',async()=>{
 const target=fs.mkdtempSync(path.join(scratch,'target-')),a=bundle('A');install(target,a,'op-a');
 const backend=createServer((req,res)=>{res.writeHead(req.url==='/api/shortlist'?200:404,{'content-type':'application/json'});res.end(JSON.stringify({schemaVersion:1,ids:['nylon']}));});
 await new Promise(r=>backend.listen(0,'127.0.0.1',r));const server=createTarget(target,backend.address().port);await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try {const base='http://127.0.0.1:'+server.address().port;assert.equal((await (await fetch(base+'/__release')).json()).release,'A');assert.equal((await fetch(base+'/health')).status,200);assert.equal(await(await fetch(base+'/')).text(),'<h1>release A</h1>');assert.deepEqual((await(await fetch(base+'/api/shortlist')).json()).ids,['nylon']);assert.equal((await fetch(base+'/%2e%2e%2factive.json')).status,403);assert.equal((await fetch(base+'/release.json')).status,404);fs.writeFileSync(path.join(a,'dist/index.html'),'source changed');assert.equal(await(await fetch(base+'/')).text(),'<h1>release A</h1>');}
 finally{await new Promise(r=>server.close(r));await new Promise(r=>backend.close(r));}
});
test('recovery verifies retained artifact, records a new operation and rejects corrupted recovery',()=>{
 const target=fs.mkdtempSync(path.join(scratch,'target-'));install(target,bundle('A'),'op-a');install(target,bundle('B'),'op-b');
 const r=install(target,path.join(target,'releases/A'),'recover-a',{recover:true});assert.equal(r.release,'A');assert.equal(r.operation,'recover-a');
 assert.equal(fs.readFileSync(path.join(target,'operations.jsonl'),'utf8').trim().split('\n').length,3);
 fs.writeFileSync(path.join(target,'releases/B/dist/index.html'),'corruption');assert.throws(()=>install(target,path.join(target,'releases/B'),'recover-b',{recover:true}));assert.equal(JSON.parse(fs.readFileSync(path.join(target,'active.json'))).release,'A');
});
