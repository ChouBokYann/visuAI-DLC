import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const root=process.cwd(),base=path.join(root,'experiments/release-recovery');
const oldRoot=path.resolve(root,'../e06-worktree'),old=path.join(oldRoot,'experiments/coordinate-agent-work-resilience');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const write=(p,value)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,JSON.stringify(value,null,2)+'\n');};
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
function snapshot(dir){const out={};function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='node_modules'||e.isSymbolicLink())continue;const p=path.join(d,e.name);if(e.isDirectory())walk(p);else out[path.relative(dir,p).replaceAll('\\','/')]=hash(p);}}walk(dir);return out;}
const source=path.join(old,'trials/s3'),pin=JSON.parse(fs.readFileSync(path.join(source,'evidence/r3-manifest.json'),'utf8'));
assert.equal(crypto.createHash('sha256').update(JSON.stringify(pin.files)).digest('hex'),'785f9a182a095ba8a06b4e874b2ed29045d9f0c89873c51dad7908d2d1e030f3');
assert(!fs.existsSync(path.join(base,'fixture')),'Do not overwrite prepared fixture');
for(const [p,h] of Object.entries(pin.files)){assert.equal(hash(path.join(source,p)),h,p);const dest=path.join(base,'fixture',p);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(source,p),dest);}
const historical=git('ls-files','experiments').split('\n').filter(Boolean);
write(path.join(base,'records/protected-before.json'),{refs:{main:git('rev-parse','main'),firstIteration:git('rev-parse','first-iteration')},historical:Object.fromEntries(historical.map(p=>[p,hash(path.join(root,p))])),e06Root:old,e06:snapshot(old)});
const skills=['deployment/prepare-release','deployment/deploy-and-check','maintenance/diagnose-issue'];
write(path.join(base,'records/source-manifest.json'),pin.files);
write(path.join(base,'records/setup.json'),{at:new Date().toISOString(),platform:process.platform,node:process.version,base:git('rev-parse','HEAD'),source:'Local E06 S3 R3, uncommitted; actual source manifest verified',sourceDigest:'785f9a182a095ba8a06b4e874b2ed29045d9f0c89873c51dad7908d2d1e030f3',skills:Object.fromEntries(skills.map(p=>[p,hash(path.join(root,'skills',p,'SKILL.md'))])),model:'Exact runtime identity unavailable',tokenCost:'Unavailable',authorization:'Bok explicitly approved proposal and waived issue-first/other-maintainer gates for this local trial on 2026-11-21',limits:{initialCycles:1,setupRetries:1,correctionRounds:2},network:'Loopback only, no package install planned',browser:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
console.log(JSON.stringify({copiedSourceFiles:Object.keys(pin.files).length,historicalFiles:historical.length,protectedE06Files:Object.keys(snapshot(old)).length}));
