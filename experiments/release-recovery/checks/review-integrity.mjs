import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8')),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const results={at:new Date().toISOString(),checks:[]};
for(const [file,expected] of Object.entries(read('records/helper-manifest.json'))){const actual=hash(fs.readFileSync(path.join(root,file)));assert.equal(actual,expected,file);results.checks.push({file,actual});}
const source=read('records/source-manifest.json');assert.equal(hash(JSON.stringify(source)),'785f9a182a095ba8a06b4e874b2ed29045d9f0c89873c51dad7908d2d1e030f3');
for(const [file,expected] of Object.entries(source)){const actual=hash(fs.readFileSync(path.join(root,'fixture',file)));assert.equal(actual,expected,file);results.checks.push({file:'fixture/'+file,actual});}
for(const [skill,expected] of Object.entries(read('records/setup.json').skills)){const actual=hash(fs.readFileSync(path.resolve(root,'../../skills',skill,'SKILL.md')));assert.equal(actual,expected,skill);results.checks.push({file:skill,actual});}
const a=read('artifacts/A/manifest.json');for(const id of ['B','C']){const other=read(`artifacts/${id}/manifest.json`);assert.deepEqual(Object.keys(other),Object.keys(a));for(const key of Object.keys(a)){if(key.startsWith('dist/'))assert.equal(other[key],a[key],id+key);}}
results.sameDistABC=true;results.pass=true;fs.writeFileSync(path.join(root,'evidence/review-integrity.json'),JSON.stringify(results,null,2));console.log(JSON.stringify({pass:true,checked:results.checks.length,sameDistABC:true}));
