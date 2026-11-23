import fs from 'node:fs';import crypto from 'node:crypto';
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const before=JSON.parse(fs.readFileSync('evidence/replacement-start-manifest.json','utf8'));
const files=Object.keys(before.files).filter(p=>p.startsWith('src/'));
const source=Object.fromEntries(files.map(p=>[p,hash(p)]));
const disposition=files.filter(p=>source[p]!==before.files[p]).map(p=>({path:p,before:before.files[p],after:source[p],reason:p.endsWith('shortlist.test.ts')?'Retain addCafe assertions; replace localStorage-only tests with API validation/session failure retry tests':p.endsWith('shortlist.ts')?'Replace localStorage authority with validated C1 HTTP adapter and serialized acknowledgment session':'Connect existing UI controls/status to API session; preserve discovery/story/comparison'}));
fs.writeFileSync('evidence/ui-replacement-source.json',JSON.stringify({at:new Date().toISOString(),source,disposition,partialTestPreserved:hash('src/shortlist-api.test.ts')===before.files['src/shortlist-api.test.ts'],unchangedProvider:Object.keys(before.files).filter(p=>p.startsWith('server/')).every(p=>hash(p)===before.files[p])},null,2));
