import test from 'node:test';import assert from 'node:assert/strict';import path from 'node:path';import fs from 'node:fs/promises';import os from 'node:os';import {pathToFileURL} from 'node:url';
const {createApp}=await import(pathToFileURL(path.resolve(process.env.FIXTURE_ROOT,'server.mjs')));
test('F1-F5 filename filter uses external examples and preserves other API behavior',{timeout:15000},async()=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'workflow-feature-'));let modelCalls=0;
 await fs.writeFile(path.join(dir,'atlas.md'),'Atlas owner is Mira.');await fs.writeFile(path.join(dir,'atlas-update.txt'),'Atlas has a pending update.');await fs.writeFile(path.join(dir,'garden.txt'),'Garden coordinator is Jun.');
 const server=await createApp({root:dir,ask:async()=>{modelCalls++;return{answer:'Synthetic mock [S1]'};}});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
 const listing=async suffix=>{const r=await fetch(base+'/api/status'+suffix);assert.equal(r.status,200);return r.json();};const names=d=>d.documents.map(x=>x.name).sort();
 try{
  const all=await listing('');assert.deepEqual(names(all),['atlas-update.txt','atlas.md','garden.txt']);
  for(const q of ['', '   '])assert.deepEqual(names(await listing('?q='+encodeURIComponent(q))),names(all),'F1: blank query preserves complete listing');
  assert.deepEqual(names(await listing('?q='+encodeURIComponent('  ATLAS '))),['atlas-update.txt','atlas.md'],'F2: trim and case-insensitive filenames');
  assert.deepEqual(names(await listing('?q=Mira')),[],'F2: exclude document contents');assert.deepEqual(names(await listing('?q=garden.txt')),['garden.txt']);assert.deepEqual(names(await listing('?q=absent')),[]);
  const filtered=await listing('?q=atlas');for(const d of filtered.documents)assert.equal(d.id,all.documents.find(x=>x.name===d.name).id);
  const chat=await fetch(base+'/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:'Garden coordinator'})});assert.equal(chat.status,200);assert((await chat.json()).sources.some(s=>s.name==='garden.txt'));assert.equal(modelCalls,1);
  const unrelated=await fetch(base+'/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:'Unicorn weather forecast'})});assert.equal(unrelated.status,200);const noEvidence=await unrelated.json();assert.equal(noEvidence.state,'no-evidence','F4: unrelated question abstains');assert.deepEqual(noEvidence.sources,[]);assert.equal(modelCalls,1,'F4: abstention does not call provider');
  const refreshed=await fetch(base+'/api/refresh?q=atlas',{method:'POST'});assert.deepEqual(names(await refreshed.json()),names(all),'F5 refresh remains complete');
  assert.equal((await fetch(base+'/api/source/'+all.documents.find(x=>x.name==='garden.txt').id)).status,200);
  assert.equal(await fs.readFile(path.join(dir,'garden.txt'),'utf8'),'Garden coordinator is Jun.');
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));await fs.rm(dir,{recursive:true,force:true});}
});
