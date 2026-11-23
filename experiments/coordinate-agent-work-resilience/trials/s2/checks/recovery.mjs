import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const interrupted=read('evidence/interrupted-manifest.json'),start=read('evidence/replacement-start-manifest.json'),final=read('evidence/r1-manifest.json');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const partial='src/shortlist-api.test.ts';const before=interrupted.files;
const result={at:new Date().toISOString(),transferDiff:[...new Set([...Object.keys(before),...Object.keys(start.files)])].filter(k=>before[k]!==start.files[k]),partialHash:hash(partial),archivePartialHash:hash('evidence/interrupted-source/'+partial),archiveMismatches:Object.keys(start.files).filter(k=>hash('evidence/interrupted-source/'+k)!==start.files[k]),changedAfterTransfer:Object.keys(final.files).filter(k=>start.files[k]!==final.files[k]),operator:read('evidence/operator-interruption.json'),grant:read('evidence/replacement-grant.json')};
fs.writeFileSync('evidence/review-r1-recovery.json',JSON.stringify(result,null,2));console.log(result);
