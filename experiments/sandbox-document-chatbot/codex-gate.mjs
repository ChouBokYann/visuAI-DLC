// The adapter's session config arrives too late to prevent inherited startup services.
// Apply restrictions at process startup, then check this actual process before any turn.
import fs from 'node:fs';import path from 'node:path';import {spawn} from 'node:child_process';import readline from 'node:readline';import {verifyConfig} from './safety.mjs';
import {createHash} from 'node:crypto';
const base=process.env.E10_BASE,config=JSON.parse(process.env.CODEX_CONFIG);const binary=path.join("C:\\Users\\maker\\Documents\\Projects\\visuAI-DLC\\visuAI-DLC\\output\\e10-worktree\\experiments\\document-chatbot\\node_modules",'@openai/codex-win32-x64/vendor/x86_64-pc-windows-msvc/bin/codex.exe');
for(const item of JSON.parse(fs.readFileSync(path.join(base,'records/config-files.json')))){const hash=fs.existsSync(item.file)?createHash('sha256').update(fs.readFileSync(item.file)).digest('hex'):null;if(hash!==item.hash)throw Error('Inherited configuration changed; new preflight required');}
const args=['app-server'];
for(const [k,v] of Object.entries(config.features))args.push('-c',`features.${k}=${v}`);
for(const name of Object.keys(config.mcp_servers??{})){if(!/^[\w-]+$/.test(name))throw Error('Unsupported MCP configuration key');args.push('-c',`mcp_servers.${name}.enabled=false`);}
args.push('-c','web_search="disabled"','-c','project_doc_max_bytes=0','-c','skills.include_instructions=false','-c','approval_policy="never"','-c','sandbox_mode="read-only"');
const child=spawn(binary,args,{stdio:['pipe','pipe','pipe'],windowsHide:true});child.stderr.pipe(process.stderr);
const requests=new Map(),threads=new Set();let verified=false;
const record=value=>fs.appendFileSync(path.join(base,'evidence/runtime-gate.jsonl'),JSON.stringify({at:new Date().toISOString(),pid:child.pid,...value})+'\n');
function fail(error){record({rejected:error.message});process.stderr.write(error.message+'\n');child.kill();process.exitCode=1;process.stdin.destroy();}
readline.createInterface({input:process.stdin}).on('line',line=>{try{
 const msg=JSON.parse(line);
 if(msg.method==='thread/start'){
  if(!verified)throw Error('Actual startup config was not verified');
  msg.params={...msg.params,sandbox:'read-only',approvalPolicy:'never',config};
 }
 if(msg.method==='turn/start'){
  if(!verified||!threads.has(msg.params.threadId))throw Error('Unverified runtime thread');
  msg.params.approvalPolicy='never';msg.params.sandboxPolicy={type:'readOnly'};
 }
 if(msg.method&&msg.id!==undefined)requests.set(msg.id,msg.method);
 child.stdin.write(JSON.stringify(msg)+'\n');
}catch(error){fail(error);}});
readline.createInterface({input:child.stdout}).on('line',line=>{try{
 const msg=JSON.parse(line),method=requests.get(msg.id);
 if(method==='config/read'&&msg.result){verifyConfig(msg.result.config,config);verified=true;record({actualConfigVerified:true,disabledMcpNames:Object.keys(msg.result.config.mcp_servers??{})});}
 if(method==='thread/start'&&msg.result){if(msg.result.sandbox?.type!=='readOnly'||msg.result.approvalPolicy!=='never')throw Error('Unsafe actual thread permissions');threads.add(msg.result.thread.id);record({threadVerified:true,threadId:msg.result.thread.id,model:msg.result.model,sandbox:msg.result.sandbox.type});}
 if(msg.id!==undefined)requests.delete(msg.id);process.stdout.write(line+'\n');
}catch(error){fail(error);}});
process.stdin.on('end',()=>child.stdin.end());child.on('exit',code=>process.exit(code??1));child.on('error',fail);
