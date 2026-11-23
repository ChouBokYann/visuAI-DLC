import fs from 'node:fs';
export function reserveTurn(file){
 const record=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{used:0};
 if(!Number.isInteger(record.used)||record.used<0||record.used>=12)throw Error('Trial turn budget exhausted or invalid');
 record.used++;record.updatedAt=new Date().toISOString();fs.writeFileSync(file+'.tmp',JSON.stringify(record));fs.renameSync(file+'.tmp',file);return record.used;
}
