import fs from 'node:fs';
import path from 'node:path';
import {manifest} from './trials.mjs';
const root=path.resolve(import.meta.dirname,'..');
const dir=path.join(root,'trials','s2');
const archive=path.join(dir,'evidence','interrupted-source');
fs.mkdirSync(archive,{recursive:true});
const files=manifest(dir);
for(const file of Object.keys(files)){const dest=path.join(archive,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(dir,file),dest);}
const baseline=JSON.parse(fs.readFileSync(path.join(dir,'evidence','baseline-manifest.json'),'utf8'));
const changes=Object.keys(files).filter(p=>files[p]!==baseline.files[p]).map(p=>({path:p,before:baseline.files[p]||null,after:files[p]}));
fs.writeFileSync(path.join(dir,'evidence','interrupted-manifest.json'),JSON.stringify({at:new Date().toISOString(),files,changes,archive:'evidence/interrupted-source'},null,2));
