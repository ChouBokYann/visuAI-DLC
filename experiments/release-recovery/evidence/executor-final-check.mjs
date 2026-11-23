import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const files=['records/release.md','records/diagnosis.md'];let checked=0;
for(const file of files){for(const match of fs.readFileSync(file,'utf8').matchAll(/\]\(([^)]+)\)/g)){const target=path.resolve(path.dirname(file),match[1].split('#')[0]);assert(fs.existsSync(target),'Missing link '+target);checked++;}}
const phases=['A','B','recovered-A','C'].map(phase=>{const review=JSON.parse(fs.readFileSync('evidence/review-'+phase+'/result.json'));return {phase,pass:review.pass,passed:review.checks.filter(c=>c.pass).length,total:review.checks.length};});
const red=JSON.parse(fs.readFileSync('evidence/executor-regression-B.json')),green=JSON.parse(fs.readFileSync('evidence/executor-regression-C.json'));assert.equal(red.assertionHash,green.assertionHash);assert.equal(red.passed,0);assert.equal(green.passed,1);assert(red.listenerClosed&&green.listenerClosed);
const result={at:new Date().toISOString(),checkedLocalLinks:checked,phases,regressionHash:red.assertionHash,mainOperations:fs.readFileSync('target/state/operations.jsonl','utf8').trim().split('\n').map(JSON.parse),sourceDigest:JSON.parse(fs.readFileSync('records/setup.json')).sourceDigest,ownership:'Released to root; root cleanup and preservation verified in records'};
fs.writeFileSync('evidence/executor-final-check.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));

