import test from 'node:test';
import assert from 'node:assert/strict';
import * as shortlist from './shortlist';

test('adding is unique, bounded, and permits a replacement after removal', () => {
  const ids = ['nylon','apartment','mill'];
  assert.deepEqual(shortlist.addCafe(ids,'nylon'), ids);
  assert.deepEqual(shortlist.addCafe(ids,'funan'), ids);
  assert.deepEqual(shortlist.addCafe(ids.filter(id => id !== 'apartment'),'funan'), ['nylon','mill','funan']);
  assert.deepEqual(shortlist.addCafe([], 'unknown'), []);
});
test('API rejects invalid acknowledgments, HTTP failures and network errors', async () => {
  for(const body of [null,{}, {schemaVersion:2,ids:[]}, {schemaVersion:1,ids:['unknown']}, {schemaVersion:1,ids:['nylon','nylon']}, {schemaVersion:1,ids:'nylon'}, {schemaVersion:1,ids:['nylon','apartment','mill','funan']}, {schemaVersion:1,ids:[],extra:true}]) {
    await assert.rejects(()=>shortlist.readShortlist(async()=>new Response(JSON.stringify(body))));
  }
  await assert.rejects(()=>shortlist.readShortlist(async()=>new Response('{')));
  await assert.rejects(()=>shortlist.readShortlist(async()=>new Response('{}',{status:500})));
  await assert.rejects(()=>shortlist.readShortlist(async()=>{throw new Error('offline');}));
});
test('session keeps acknowledged selection while pending, blocks duplicate writes and retries failed intent', async () => {
  let resolve!: (r:Response)=>void;
  let calls=0;
  const replies=[()=>Promise.resolve(new Response(JSON.stringify({schemaVersion:1,ids:['nylon']}))),()=>new Promise<Response>(r=>{resolve=r;}),()=>Promise.resolve(new Response(JSON.stringify({schemaVersion:1,ids:[]})))];
  const session=new shortlist.ShortlistSession(()=>{},async()=>{calls++;return replies.shift()!();});
  await session.replace(['mill']); assert.equal(calls,0);
  await session.load(); assert.deepEqual(session.state.ids,['nylon']);
  const pending=session.replace([]); assert.equal(session.state.pending,true);
  await session.replace(['mill']); assert.equal(calls,2); assert.deepEqual(session.state.ids,['nylon']);
  resolve(new Response('{}',{status:500})); await pending;
  assert.deepEqual(session.state.ids,['nylon']); assert.ok(session.state.error); assert.equal(session.state.pending,false);
  await session.retry(); assert.equal(calls,3); assert.deepEqual(session.state.ids,[]); assert.equal(session.state.error,null);
});
test('failed initial load remains unavailable; retry loads; invalid write preserves acknowledgment',async()=>{
  const replies=[new Response('{}',{status:500}),new Response(JSON.stringify({schemaVersion:1,ids:['mill']})),new Response(JSON.stringify({schemaVersion:2,ids:[]})),new Response(JSON.stringify({schemaVersion:1,ids:[]}))];
  const session=new shortlist.ShortlistSession(()=>{},async()=>replies.shift()!);
  await session.load(); assert.equal(session.state.ready,false); assert.ok(session.state.error);
  await session.retry(); assert.equal(session.state.ready,true); assert.deepEqual(session.state.ids,['mill']);
  await session.replace([]); assert.deepEqual(session.state.ids,['mill']); assert.ok(session.state.error);
  await session.retry(); assert.deepEqual(session.state.ids,[]);
});
