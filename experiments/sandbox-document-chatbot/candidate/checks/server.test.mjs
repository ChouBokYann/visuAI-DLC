import test from 'node:test';import assert from 'node:assert/strict';import {createApp} from '../server.mjs';import path from 'node:path';
test('HTTP journey, absent evidence, bad input, origin protection and provider failure',async()=>{
 let calls=0,fail=false;const server=await createApp({root:path.resolve('corpus'),ask:async()=>{calls++;if(fail)throw Error('offline');return {answer:'Mira Chen owns Atlas. [S1]',turn:calls};}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}`;
 const post=(body,headers={})=>fetch(url+'/api/chat',{method:'POST',headers:{'content-type':'application/json',...headers},body:JSON.stringify(body)});
 try{
  let response=await post({question:'Who owns Atlas?'});assert.equal(response.status,200);let data=await response.json();assert(data.sources.length>0);assert.equal((await fetch(url+data.sources[0].url)).status,200);
  response=await post({question:'unicorn weather forecast'});assert.equal((await response.json()).state,'no-evidence');assert.equal(calls,1);
  assert.equal((await post({question:'x'.repeat(2001)})).status,400);assert.equal((await post({question:123})).status,400);
  assert.equal((await post({question:'Atlas'},{origin:'https://evil.example'})).status,403);
  assert.equal((await fetch(url+'/api/source/../../private')).status,404);
  fail=true;response=await post({question:'Atlas budget'});assert.equal(response.status,503);assert.equal((await response.json()).state,'unavailable');
  assert.equal((await fetch(url+'/api/refresh',{method:'POST',headers:{'content-type':'application/json'},body:'{}'})).status,200);
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));}
});
