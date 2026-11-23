import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
export function manifest(dir){const out={};function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(['node_modules','dist','evidence','checks'].includes(e.name))continue;const p=path.join(d,e.name);if(e.isDirectory())walk(p);else out[path.relative(dir,p).replaceAll('\\','/')]=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');}}walk(dir);return out;}
const [action,id,label='source']=process.argv.slice(2);const trial=path.join(root,'trials',id||'');
if(action==='prepare'){fs.mkdirSync(trial,{recursive:true});fs.cpSync(path.join(root,'fixture'),trial,{recursive:true,filter:p=>!['dist','node_modules'].includes(path.basename(p))});fs.mkdirSync(path.join(trial,'evidence'),{recursive:true});}
if(action==='prepare'||action==='freeze')fs.writeFileSync(path.join(trial,'evidence',`${label}-manifest.json`),JSON.stringify({at:new Date().toISOString(),files:manifest(trial)},null,2));
