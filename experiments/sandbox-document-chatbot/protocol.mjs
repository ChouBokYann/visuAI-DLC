import fs from 'node:fs';import path from 'node:path';
function keys(value,names){if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).sort().join()!==names.sort().join())throw Error('Invalid fields');}
function str(v,max){if(typeof v!=='string'||!v.trim()||v.length>max)throw Error('Invalid text');}
export function validatePacket(p){
 if(p?.mode==='development'){keys(p,['mode','context']);str(p.context,65536);}
 else if(p?.mode==='qa'){keys(p,['mode','question','sources']);str(p.question,2000);if(!Array.isArray(p.sources)||p.sources.length<1||p.sources.length>6)throw Error('Invalid sources');for(const s of p.sources){keys(s,['name','text']);str(s.name,256);str(s.text,2000);}}
 else throw Error('Invalid mode');return p;
}
export function validateActions(root,p){
 keys(p,['done','actions']);if(typeof p.done!=='boolean'||!Array.isArray(p.actions)||p.actions.length>8)throw Error('Invalid action envelope');
 for(const a of p.actions){
  if(a?.op==='write'){keys(a,['op','path','content']);if(!['bridge-client.mjs','acp.mjs'].includes(a.path))throw Error('Path not writable');str(a.content,65536);const dest=path.join(root,a.path);if(fs.existsSync(dest)&&fs.lstatSync(dest).isSymbolicLink())throw Error('Symlink rejected');if(fs.realpathSync(root)!==path.dirname(path.resolve(dest)))throw Error('Path escape');}
  else if(a?.op==='check'){keys(a,['op','name']);if(a.name!=='client-tests')throw Error('Unknown check');}
  else throw Error('Unknown action');
 }return p;
}
