import {spawnSync} from 'node:child_process';
import {mkdir,writeFile,readFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('.',import.meta.url)),out=new URL('../../output/coffee-atlas/',import.meta.url);await mkdir(out,{recursive:true});
const commands=[['logic',['node_modules/tsx/dist/cli.mjs','--test','src/logic.test.ts']],['fault',['fault-control.mjs']],['types',['node_modules/typescript/bin/tsc','--noEmit']],['build',['node_modules/vite/bin/vite.js','build']]];
const results=[];for(const [name,args] of commands){const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout:30000});await writeFile(new URL(name+'-final.txt',out),(r.stdout??'')+(r.stderr??''));results.push({name,status:r.status});if(r.status!==0){console.error(r.stdout,r.stderr);process.exit(1);}}
const files=['package.json','index.html','tsconfig.json','browser-test.mjs','fault-control.mjs',...(await readdir(new URL('src/',import.meta.url))).map(n=>'src/'+n)];
const hashes=[];for(const file of files)hashes.push({file,sha256:createHash('sha256').update(await readFile(new URL(file,import.meta.url))).digest('hex')});
await writeFile(new URL('checks-final.json',out),JSON.stringify({node:process.version,results,files:hashes},null,2));console.log('CHECKS VERIFIED: logic, fault detection, types and production build');
