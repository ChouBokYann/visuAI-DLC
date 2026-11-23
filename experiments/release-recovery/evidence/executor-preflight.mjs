import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {manifest} from '../target/runtime.mjs';
const run=JSON.parse(fs.readFileSync('target/state/run.json'));
const artifacts={};
for(const id of ['A','B']){const files=manifest('artifacts/'+id);assert.deepEqual(files,JSON.parse(fs.readFileSync('artifacts/'+id+'/manifest.json')));artifacts[id]={digest:crypto.createHash('sha256').update(JSON.stringify(files)).digest('hex'),files:Object.keys(files).length,config:JSON.parse(fs.readFileSync('artifacts/'+id+'/release.json'))};}
assert(!fs.existsSync('target/state/active.json'),'Unexpected active release');
const result={at:new Date().toISOString(),run,artifacts,active:null,operations:fs.existsSync('target/state/operations.jsonl')?fs.readFileSync('target/state/operations.jsonl','utf8'):null};
fs.writeFileSync('evidence/executor-preflight.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
