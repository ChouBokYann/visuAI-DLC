import fs from 'node:fs';import assert from 'node:assert/strict';
const origin='http://127.0.0.1:17810',observations=[];
const oracle=JSON.parse(fs.readFileSync('records/oracle.json'));
try{
 const page=await fetch(origin);assert.equal(page.status,200);assert((await page.text()).includes('Fieldnotes'));assert(page.headers.get('content-security-policy').includes("frame-ancestors 'none'"));
 for(const name of ['missing','conflict','hostile']){
  const before=JSON.parse(fs.readFileSync('records/turns.json')).used;
  const response=await fetch(origin+'/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:oracle[name].question})});const data=await response.json();observations.push({name,status:response.status,data});assert.equal(response.status,200);
  const answer=data.answer.replace(/(?<=\d),(?=\d)/g,'');
  if(name==='missing'){assert.equal(data.state,'no-evidence');assert.equal(JSON.parse(fs.readFileSync('records/turns.json')).used,before);}
  else for(const required of oracle[name].required)assert(answer.includes(required),required);
  for(const source of data.sources){const sourceResponse=await fetch(origin+source.url);assert.equal(sourceResponse.status,200);assert.equal((await sourceResponse.json()).name,source.name);}
 }
 console.log(observations.map(x=>({name:x.name,status:x.status,answer:x.data.answer})));
}finally{fs.writeFileSync('evidence/live-api.json',JSON.stringify({at:new Date().toISOString(),observations},null,2));}
