import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {AcpBridge} from '../acp.mjs';
test('each question after the first gets a fresh session and tool attempts fail closed',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'e10-acp-'));fs.mkdirSync(path.join(dir,'records'));fs.mkdirSync(path.join(dir,'evidence'));
 const bridge=new AcpBridge(dir);bridge.sessionId='first';let fresh=0,unsafe=false;
 bridge.request=async(method)=>{if(method==='session/new'){fresh++;return {sessionId:'fresh',modes:{currentModeId:'read-only'}};}bridge.text='Mira [S1]';bridge.unsafe=unsafe;return {stopReason:'end_turn'};};
 try{await bridge.ask('first',[{name:'a',text:'Mira'}]);await bridge.ask('second',[{name:'a',text:'Mira'}]);assert.equal(fresh,1);unsafe=true;await assert.rejects(bridge.ask('third',[{name:'a',text:'Mira'}]),/tool/);assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'records/turns.json'))).used,3);}finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('failed termination blocks replacement across bridge instances',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'e10-close-'));fs.mkdirSync(path.join(dir,'records'));
 try{const b=new AcpBridge(dir);b.child={pid:123,exitCode:null};b.terminateTree=()=>{throw Error('denied');};b.close();assert.equal(b.blocked,true);await assert.rejects(new AcpBridge(dir).start(),/blocked/);}finally{fs.rmSync(dir,{recursive:true,force:true});}
});
