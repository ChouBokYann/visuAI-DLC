import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createApp} from './api.mjs';
async function usingApi(run) {
 const server=createApp(); server.listen(0,'127.0.0.1'); await once(server,'listening');
 const url=`http://127.0.0.1:${server.address().port}/api/shortlist`;
 const request=async body=>{const response=await fetch(url,body===undefined?{}:{method:'PUT',headers:{'Content-Type':'application/json'},body});return {status:response.status,body:await response.json()};};
 try {await run(request);} finally {server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
}
const saved=ids=>({schemaVersion:1,ids});
const put=ids=>JSON.stringify(saved(ids));
test('GET starts empty, PUT preserves requested order and replaces the list',()=>usingApi(async request=>{
 assert.deepEqual(await request(),{status:200,body:saved([])});
 assert.deepEqual(await request(put(['mill','nylon','apartment'])),{status:200,body:saved(['mill','nylon','apartment'])});
 assert.deepEqual(await request(),{status:200,body:saved(['mill','nylon','apartment'])});
 assert.deepEqual(await request(put(['funan'])),{status:200,body:saved(['funan'])});
 assert.deepEqual(await request(),{status:200,body:saved(['funan'])});
}));
test('clearing the final item is acknowledged and remains empty on GET',()=>usingApi(async request=>{
 await request(put(['nylon']));
 assert.deepEqual(await request(put([])),{status:200,body:saved([])});
 assert.deepEqual(await request(),{status:200,body:saved([])});
}));
for(const [name,body,status,code] of [
 ['malformed JSON','{',400,'INVALID_JSON'],
 ['missing version',JSON.stringify({ids:['unknown']}),409,'CONTRACT_VERSION_MISMATCH'],
 ['unsupported version precedence',JSON.stringify({schemaVersion:2,ids:'wrong'}),409,'CONTRACT_VERSION_MISMATCH'],
 ['null body','null',409,'CONTRACT_VERSION_MISMATCH'],
 ['array body','[]',409,'CONTRACT_VERSION_MISMATCH'],
 ['missing ids',JSON.stringify({schemaVersion:1}),422,'INVALID_SHORTLIST'],
 ['non-array ids',JSON.stringify({schemaVersion:1,ids:'nylon'}),422,'INVALID_SHORTLIST'],
 ['unknown id',put(['unknown']),422,'INVALID_SHORTLIST'],
 ['duplicate ids',put(['nylon','nylon']),422,'INVALID_SHORTLIST'],
 ['non-string id',put([1]),422,'INVALID_SHORTLIST'],
 ['excess ids',put(['nylon','mill','funan','apartment']),422,'INVALID_SHORTLIST'],
 ['extra key',JSON.stringify({schemaVersion:1,ids:[],extra:true}),422,'INVALID_SHORTLIST']
]) test(`rejects ${name} with prescribed envelope and unchanged saved state`,()=>usingApi(async request=>{
 assert.equal((await request(put(['nylon']))).status,200);
 const response=await request(body);assert.equal(response.status,status);assert.equal(response.body.error.code,code);assert.equal(typeof response.body.error.message,'string');assert.ok(response.body.error.message.length>0);
 assert.deepEqual(await request(),{status:200,body:saved(['nylon'])});
}));
