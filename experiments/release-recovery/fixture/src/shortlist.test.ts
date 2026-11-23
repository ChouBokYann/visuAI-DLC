import test from 'node:test';
import assert from 'node:assert/strict';
import * as shortlist from './shortlist';
const {addCafe,readShortlist,writeShortlist}=shortlist;
const response=(ids:string[])=>new Response(JSON.stringify({schemaVersion:1,ids}));

test('adding is unique, bounded, and permits a replacement after removal',()=>{
 const ids=['nylon','apartment','mill'];
 assert.deepEqual(addCafe(ids,'nylon'),ids);assert.deepEqual(addCafe(ids,'funan'),ids);
 assert.deepEqual(addCafe(ids.filter(id=>id!=='apartment'),'funan'),['nylon','mill','funan']);assert.deepEqual(addCafe([],'unknown'),[]);
});
test('GET returns acknowledged order and PUT sends empty C1 replacement',async()=>{
 const calls:any[]=[];const fetcher:typeof fetch=async(url,init)=>{calls.push([url,init?.method||'GET',init?.body]);return response(init?[]:['mill','nylon']);};
 assert.deepEqual(await readShortlist(fetcher),['mill','nylon']);assert.deepEqual(await writeShortlist([],fetcher),[]);
 assert.deepEqual(calls,[['/api/shortlist','GET',undefined],['/api/shortlist','PUT',JSON.stringify({schemaVersion:1,ids:[]})]]);
});
test('invalid, server and network acknowledgments reject without normalization',async()=>{
 for(const body of [null,{},[],{schemaVersion:2,ids:[]},{schemaVersion:1,ids:'nylon'},{schemaVersion:1,ids:['nylon','nylon']},{schemaVersion:1,ids:['unknown']},{schemaVersion:1,ids:['nylon','mill','funan','apartment']},{schemaVersion:1,ids:[],extra:true}]){
  await assert.rejects(()=>readShortlist(async()=>new Response(JSON.stringify(body))));
 }
 await assert.rejects(()=>readShortlist(async()=>new Response('{')));
 await assert.rejects(()=>writeShortlist([],async()=>new Response('{}',{status:503})));
 await assert.rejects(()=>writeShortlist([],async()=>{throw Error('offline');}));
});
test('session disables edits while loading/pending, retains acknowledgment on failure and retries intent',async()=>{
 assert.equal(typeof shortlist.ShortlistSession,'function');
 let release!:(r:Response)=>void;let calls=0;const replies=[()=>new Promise<Response>(r=>release=r),()=>new Promise<Response>(r=>release=r),()=>Promise.resolve(response([]))];
 const session=new shortlist.ShortlistSession(()=>{},async()=>{calls++;return replies.shift()!();});
 const loading=session.load();await session.replace(['mill']);assert.equal(calls,1);assert.equal(session.state.pending,true);
 release(response(['nylon']));await loading;assert.deepEqual(session.state.ids,['nylon']);
 const writing=session.replace([]);await session.replace(['mill']);assert.equal(calls,2);assert.deepEqual(session.state.ids,['nylon']);
 release(new Response('{}',{status:500}));await writing;assert.deepEqual(session.state.ids,['nylon']);assert.match(session.state.error,/unchanged/);
 await session.retry();assert.deepEqual(session.state.ids,[]);assert.equal(session.state.error,'');assert.equal(calls,3);
});
test('failed initial load is unavailable; retry loads; invalid write retains saved IDs',async()=>{
 assert.equal(typeof shortlist.ShortlistSession,'function');let n=0;
 const session=new shortlist.ShortlistSession(()=>{},async()=>{n++;return n===1?new Response('{}',{status:500}):n===2?response(['nylon']):new Response(JSON.stringify({schemaVersion:2,cafeIds:[]}));});
 await session.load();assert.equal(session.state.available,false);assert.match(session.state.error,/unavailable/);
 await session.retry();assert.equal(session.state.available,true);assert.deepEqual(session.state.ids,['nylon']);
 await session.replace([]);assert.deepEqual(session.state.ids,['nylon']);assert.match(session.state.error,/invalid/);
});
