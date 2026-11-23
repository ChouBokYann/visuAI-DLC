import {spawn,execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import assert from 'node:assert/strict';
const base=path.resolve('.');
const binary=path.join(base,'node_modules/@openai/codex-win32-x64/vendor/x86_64-pc-windows-msvc/bin/codex.exe');
const disabled=['shell_tool','unified_exec','apps','plugins','remote_plugin','hooks','multi_agent','multi_agent_v2','browser_use','browser_use_external','computer_use','image_generation','view_image','code_mode','code_mode_host','skill_search','skill_mcp_dependency_install','shell_snapshot','tool_suggest'];
const config={features:Object.fromEntries(disabled.map(k=>[k,false])),web_search:'disabled',approval_policy:'never',sandbox_mode:'read-only',skills:{include_instructions:false},project_doc_max_bytes:0};
config.features.skip_host_skill_discovery=true;
fs.mkdirSync('.runtime/agent',{recursive:true});
let seq=0;const pending=new Map();
const args=['app-server',...disabled.flatMap(k=>['--disable',k]),'-c','web_search="disabled"','-c','project_doc_max_bytes=0'];
const child=spawn(binary,args,{cwd:path.join(base,'.runtime/agent'),stdio:['pipe','pipe','pipe'],windowsHide:true});
child.stderr.resume();
readline.createInterface({input:child.stdout}).on('line',line=>{try{const x=JSON.parse(line);if(pending.has(x.id)){const p=pending.get(x.id);pending.delete(x.id);x.error?p.reject(Error(JSON.stringify(x.error))):p.resolve(x.result);}}catch{}});
function request(method,params){return new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});}
const timer=setTimeout(()=>{child.kill();throw Error('preflight timed out');},25000);
try{
 await request('initialize',{clientInfo:{name:'e10-preflight',version:'0.1.0'}});
 child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'initialized'})+'\n');
 const result=await request('config/read',{includeLayers:false,cwd:path.join(base,'.runtime/agent')});
 const inherited=result.config;
 config.mcp_servers=Object.fromEntries(Object.keys(inherited.mcp_servers??{}).map(k=>[k,{enabled:false}]));
 // Disable each inherited name explicitly: empty tables can merge with global config.
 for(const k of Object.keys(config.mcp_servers))config[`mcp_servers.${k}.enabled`]=false;
 const auth=await request('account/read',{refreshToken:false});
 assert.equal(auth.account?.type,'chatgpt','subscription authentication required');
 for(const k of disabled)assert.equal(inherited.features?.[k],false,k);
 fs.writeFileSync('records/acp-config.json',JSON.stringify(config,null,2));
 fs.writeFileSync('records/acp-preflight.json',JSON.stringify({at:new Date().toISOString(),authenticatedWith:'chatgpt',disabledFeatures:disabled,disabledMcpNames:Object.keys(config.mcp_servers),model:inherited.model,configVerified:true,scope:'configuration preflight; no prompt or model call'},null,2));
 console.log({passed:true,disabledMcpServers:Object.keys(config.mcp_servers).length});
}finally{clearTimeout(timer);child.stdin.end();await new Promise(resolve=>{child.once('exit',resolve);setTimeout(()=>{if(child.exitCode===null)execFileSync('taskkill',['/PID',String(child.pid),'/T','/F'],{stdio:'ignore'});resolve();},3000).unref();});}
