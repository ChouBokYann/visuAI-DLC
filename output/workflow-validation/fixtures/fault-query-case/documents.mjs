import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
export async function loadDocuments(root){
 if((await fs.lstat(root)).isSymbolicLink())throw Error('Document root must not be a link');
 root=await fs.realpath(root);const documents=[],skipped=[];let bytes=0,entries=0;
 async function walk(dir,depth=0){
  if(depth>8)throw Error('Document tree is too deep');
  for(const entry of await fs.readdir(dir,{withFileTypes:true})){
   if(++entries>500)throw Error('Too many directory entries');
   const file=path.join(dir,entry.name),name=path.relative(root,file);
   if(entry.isSymbolicLink()){skipped.push({name,reason:'link'});continue;}
   if(entry.isDirectory()){await walk(file,depth+1);continue;}
   if(!entry.isFile()||!['.txt','.md'].includes(path.extname(name).toLowerCase())){skipped.push({name,reason:'unsupported'});continue;}
   try{
    const real=await fs.realpath(file),relative=path.relative(root,real);
    if(relative.startsWith('..')||path.isAbsolute(relative))throw Error('outside selected root');
    const stat=await fs.lstat(file);if(stat.isSymbolicLink())throw Error('link');
    if(stat.size>131072){skipped.push({name,reason:'oversized'});continue;}
    if(documents.length>=100||bytes+stat.size>1048576)throw Error('Corpus limit exceeded');
    const data=await fs.readFile(real);if(data.length>131072)throw Error('File changed beyond limit');
    bytes+=data.length;const text=new TextDecoder('utf-8',{fatal:true}).decode(data);
    const id=createHash('sha256').update(name+'\0'+text).digest('hex').slice(0,24);
    documents.push({id,name,text});
   }catch(error){if(error.message==='Corpus limit exceeded')throw error;skipped.push({name,reason:'unreadable',detail:error.code??error.message});}
  }
 }
 await walk(root);return {documents,skipped,bytes};
}
const stop=new Set('a an the is are was were of for to in on at it its what who when where why how and or please tell me about does do according approved'.split(' '));
export function retrieve(index,query){
 const words=[...new Set((query.toLowerCase().match(/[\p{L}\p{N}]+/gu)??[]).filter(w=>!stop.has(w)&&w.length>1))];
 if(!words.length)return [];
 return index.documents.flatMap(doc=>doc.text.split(/\n\s*\n/).flatMap(text=>{
  // shortcut: bounded lexical retrieval suits this tiny corpus; evaluate embeddings before large or multilingual use.
  text=text.slice(0,2000);const lower=text.toLowerCase();const score=words.reduce((n,w)=>n+(lower.includes(w)?1:0),0);
  return score?[{id:doc.id,name:doc.name,text,score}]:[];
 })).sort((a,b)=>b.score-a.score).slice(0,6);
}
