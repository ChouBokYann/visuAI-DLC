import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const files={};for(const name of fs.readdirSync('src')){const p=path.join('src',name);if(fs.statSync(p).isFile())files[p.replaceAll('\\','/')]=hash(p);}
fs.writeFileSync('evidence/ui-source-hashes.json',JSON.stringify({at:new Date().toISOString(),files},null,2));
