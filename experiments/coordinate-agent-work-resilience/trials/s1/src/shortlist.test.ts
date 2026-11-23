import test from 'node:test';
import assert from 'node:assert/strict';
import {addCafe,readShortlist,writeShortlist} from './shortlist';
const response=(ids:string[])=>new Response(JSON.stringify({schemaVersion:1,ids}));
test('adding is unique, bounded, and permits a replacement after removal',()=>{
 const ids=['nylon','apartment','mill'];
 assert.deepEqual(addCafe(ids,'nylon'),ids);assert.deepEqual(addCafe(ids,'funan'),ids);
 assert.deepEqual(addCafe(ids.filter(id=>id!=='apartment'),'funan'),['nylon','mill','funan']);assert.deepEqual(addCafe([],'unknown'),[]);
});
test('reads acknowledged IDs in order from API',async()=>{
 const fetcher=async(input:unknown,init?:RequestInit)=>{assert.equal(input,'/api/shortlist');assert.equal(init?.method??'GET','GET');return response(['mill','nylon']);};
 assert.deepEqual(await readShortlist(fetcher as any),['mill','nylon']);
});
test('writes C1 and accepts empty clear acknowledgment',async()=>{
 const fetcher=async(input:unknown,init?:RequestInit)=>{assert.equal(input,'/api/shortlist');assert.equal(init?.method,'PUT');assert.deepEqual(JSON.parse(init!.body as string),{schemaVersion:1,ids:[]});return response([]);};
 assert.deepEqual(await writeShortlist([],fetcher as any),[]);
});
test('rejects HTTP, network, malformed, wrong-version and invalid-ID acknowledgments',async()=>{
 const bad=[new Response('{}',{status:500}),new Response('{'),new Response(JSON.stringify({schemaVersion:2,cafeIds:[]})),response(['unknown']),response(['nylon','nylon']),response(['nylon','mill','funan','apartment']),new Response(JSON.stringify({schemaVersion:1,ids:'nylon'}))];
 for(const result of bad)await assert.rejects(async()=>readShortlist((async()=>result) as any));
 await assert.rejects(async()=>writeShortlist(['nylon'],(async()=>{throw Error('offline');}) as any));
});
import * as shortlistModule from './shortlist';
test('session disables loading/pending edits, retains acknowledgment on failure and retries intended write',async()=>{
 const Session=(shortlistModule as any).ShortlistSession;
 assert.equal(typeof Session,'function','API shortlist session is required');
 let release:(r:Response)=>void=()=>{};let calls=0;
 const session=new Session(async()=>{calls++;return new Promise<Response>(resolve=>{release=resolve;});});
 const loading=session.load();assert.equal(session.state.pending,true);await session.save(['mill']);assert.equal(calls,1);
 release(response(['nylon']));await loading;assert.deepEqual(session.state.ids,['nylon']);assert.equal(session.state.loaded,true);
 const writing=session.save(['nylon','mill']);assert.equal(session.state.pending,true);assert.deepEqual(session.state.ids,['nylon']);await session.save([]);assert.equal(calls,2);
 release(new Response('{}',{status:500}));await writing;assert.deepEqual(session.state.ids,['nylon']);assert.match(session.state.error,/failed/i);
 const retry=session.retry();release(response(['nylon','mill']));await retry;assert.deepEqual(session.state.ids,['nylon','mill']);assert.equal(session.state.error,'');
});
test('failed initial load stays unavailable and retries GET; invalid write acknowledgment retains selection',async()=>{
 const Session=(shortlistModule as any).ShortlistSession;assert.equal(typeof Session,'function');
 const queue=[new Response('{}',{status:503}),response(['nylon']),response(['unknown'])];const methods:string[]=[];
 const session=new Session(async(_url:unknown,init?:RequestInit)=>{methods.push(init?.method??'GET');return queue.shift()!;});
 await session.load();assert.equal(session.state.loaded,false);assert.ok(session.state.error);await session.save(['mill']);assert.equal(methods.length,1);
 await session.retry();assert.equal(session.state.loaded,true);await session.save([]);assert.deepEqual(session.state.ids,['nylon']);assert.ok(session.state.error);assert.deepEqual(methods,['GET','GET','PUT']);
});
