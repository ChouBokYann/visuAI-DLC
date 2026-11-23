import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
const base=process.cwd(),root=path.resolve(base,'../../..'),old=path.join(root,'e10-worktree/experiments/document-chatbot');
const repo=path.dirname(root);const files=execFileSync('git',['ls-files'],{cwd:repo,encoding:'utf8'}).trim().split(/\r?\n/).map(f=>path.join(repo,f));
for(const dir of ['e09-worktree/experiments/workflow-compatibility','e10-worktree/experiments/document-chatbot'])walk(path.join(root,dir));
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['node_modules','.runtime','.cache','app-schema'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.isFile())files.push(p);}}
const hash=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
fs.writeFileSync('records/baseline.json',JSON.stringify(files.map(file=>({file,hash:hash(file)})),null,2));
for(const name of ['acp.mjs','codex-gate.mjs','safety.mjs'])fs.copyFileSync(path.join(old,name),name);
for(const name of ['acp-config.json','config-files.json'])fs.copyFileSync(path.join(old,'records',name),path.join('records',name));
fs.copyFileSync(path.join(old,'checks/stop-owned-tree.ps1'),'checks/stop-owned-tree.ps1');
fs.writeFileSync('records/dependencies.json',JSON.stringify({directory:path.join(old,'node_modules')}));
for(const name of ['server.mjs','documents.mjs','acp.mjs','budget.mjs','safety.mjs','public','corpus','checks'])fs.cpSync(path.join(old,name),path.join('app',name),{recursive:true});
fs.writeFileSync('records/limits.json',JSON.stringify({turns:16,development:12,setupRetries:1,correctionRounds:2,usedSetupRetries:0,usedCorrectionRounds:0},null,2));
fs.writeFileSync('records/ownership.json',JSON.stringify({owner:'ChouBokYann',containers:['e11-init','e11-packages','e11-cli','e11-gateway'],network:'e11-control',volume:'e11-gateway-state',sandbox:'e11-chatbot',image:'e11-workload:trial',ports:[17689,17820],branch:'experiments/11-sandbox-workflow'},null,2));
console.log({baselineFiles:files.length,copiedFrom:old});
