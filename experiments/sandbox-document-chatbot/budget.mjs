import fs from 'node:fs';
export function reserveTurn(file,mode){
 if(!['development','qa'].includes(mode))throw Error('Invalid mode');
 const r=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)):{used:0,development:0,qa:0};
 if(![r.used,r.development,r.qa].every(n=>Number.isInteger(n)&&n>=0)||r.used!==r.development+r.qa||r.used>=16||(mode==='development'&&r.development>=12))throw Error('Trial budget exhausted or invalid');
 r.used++;r[mode]++;r.updatedAt=new Date().toISOString();fs.writeFileSync(file+'.tmp',JSON.stringify(r));fs.renameSync(file+'.tmp',file);return r.used;
}
