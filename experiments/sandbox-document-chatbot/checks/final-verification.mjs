import fs from 'node:fs';import {createHash} from 'node:crypto';
const baseline=JSON.parse(fs.readFileSync('records/baseline.json'));const changed=baseline.filter(x=>!fs.existsSync(x.file)||createHash('sha256').update(fs.readFileSync(x.file)).digest('hex')!==x.hash).map(x=>x.file);
const lines=f=>fs.readFileSync(f,'utf8').replace(/^\uFEFF/,'').trim().split(/\r?\n/).filter(Boolean).map(s=>JSON.parse(s));
const before=lines('records/containers-before.jsonl'),after=lines('records/containers-after.jsonl');const preserved=before.every(b=>after.some(a=>a.ID===b.ID&&a.Names===b.Names&&a.State===b.State));
const result={at:new Date().toISOString(),baselineFiles:baseline.length,changed,originalContainerCount:before.length,originalContainersPreserved:preserved,turns:fs.existsSync('records/turns.json')?JSON.parse(fs.readFileSync('records/turns.json')).used:0,scope:'file baseline and original container identities/states; see cleanup evidence for owned resources'};
fs.writeFileSync('evidence/final-verification.json',JSON.stringify(result,null,2));console.log(result);if(changed.length||!preserved)process.exitCode=1;
