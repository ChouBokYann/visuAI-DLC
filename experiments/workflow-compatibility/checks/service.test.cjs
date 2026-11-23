const {test}=require('node:test'),assert=require('node:assert/strict'),http=require('node:http');
const {handler}=require('../fixture/service.cjs');
test('REQ-01 note contract over actual HTTP',async()=>{
 const rows=new Map(),server=http.createServer(handler(rows));await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base=`http://127.0.0.1:${server.address().port}/api/items`;
 const send=async(method,suffix,body)=>{const r=await fetch(base+suffix,{method,headers:{'content-type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});return {status:r.status,body:await r.json()};};
 try{
  let r=await send('POST','',{name:'old client'});assert.equal(r.status,201);assert.equal(r.body.note,null);const id=r.body.id;
  for(const note of ['','  exact  ','😀'.repeat(500),null]){r=await send('PATCH','/'+id,{note});assert.equal(r.status,200);assert.equal(r.body.note,note);}
  r=await send('PATCH','/'+id,{note:'keep'});r=await send('PATCH','/'+id,{name:'renamed'});assert.equal(r.body.note,'keep');
  const before=JSON.stringify([...rows]);
  for(const note of [12,true,{},[], '😀'.repeat(501)]){r=await send('PATCH','/'+id,{name:'must not save',note});assert.equal(r.status,400);assert.equal(JSON.stringify([...rows]),before);r=await send('POST','',{name:'bad',note});assert.equal(r.status,400);assert.equal(JSON.stringify([...rows]),before);}
  assert.equal((await send('GET','/'+id)).body.note,'keep');assert.equal((await send('PATCH','/missing',{note:'x'})).status,404);
 }finally{await new Promise(r=>server.close(r));}
});
