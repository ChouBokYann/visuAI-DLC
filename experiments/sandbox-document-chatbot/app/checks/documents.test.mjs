import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {loadDocuments,retrieve} from '../documents.mjs';
test('selected-root retrieval, refresh, unsupported files and junction confinement',async()=>{
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'e10-docs-'));const root=path.join(temp,'docs');await fs.mkdir(root);
 try{
  await fs.writeFile(path.join(root,'atlas.md'),'Atlas launch is 14 March 2027. Owner is Mira.');
  await fs.writeFile(path.join(root,'binary.pdf'),'Atlas hidden PDF');
  await fs.mkdir(path.join(temp,'private'));await fs.writeFile(path.join(temp,'private','secret.txt'),'Atlas outside-secret');
  await fs.symlink(path.join(temp,'private'),path.join(root,'escape'),'junction');
  let index=await loadDocuments(root);assert.equal(index.documents.length,1);assert.equal(retrieve(index,'When is Atlas launch?')[0].name,'atlas.md');assert.equal(retrieve(index,'unicorn weather forecast').length,0);assert(!JSON.stringify(index).includes('outside-secret'));
  await fs.writeFile(path.join(root,'atlas.md'),'Atlas launch is 20 March 2027.');index=await loadDocuments(root);assert.match(retrieve(index,'Atlas launch')[0].text,/20 March/);assert(!JSON.stringify(index).includes('14 March'));
  await fs.unlink(path.join(root,'atlas.md'));assert.equal((await loadDocuments(root)).documents.length,0);
  await fs.writeFile(path.join(root,'large.txt'),'x'.repeat(131073));assert((await loadDocuments(root)).skipped.some(x=>x.reason==='oversized'));
  await assert.rejects(loadDocuments(path.join(temp,'missing')));
 }finally{await fs.rm(temp,{recursive:true,force:true});}
});
