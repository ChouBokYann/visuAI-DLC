import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
import {chromium} from '../coffee-atlas/node_modules/@playwright/test/index.mjs';
const [dir,url,out]=process.argv.slice(2);const data=JSON.parse(fs.readFileSync(path.join(dir,'data.json'),'utf8'));
const expected=dir.endsWith('transfer')?['suitable','needs-confirmation','unsuitable','suitable','suitable','suitable']:['suitable','needs-confirmation','unsuitable','unsuitable','needs-confirmation','unsuitable'];
const checks=[];const check=(group,name,pass,detail)=>checks.push({group,name,pass:!!pass,detail});
try{
 const {assess}=await import(pathToFileURL(path.join(dir,'app.mjs')));
 for(const [i,p] of data.places.entries()){const r=assess(p,data.preferences);check('meaning',p.id,r.state===expected[i]&&Array.isArray(r.reasons)&&(r.state==='suitable'||r.reasons.some(x=>typeof x==='string'&&x.trim())),r);}
 const base={id:'unseen',name:'Unseen',open:'18:00',close:'20:00',noise:'conversation',seats:3,stepFree:true};const pref={partySize:3,start:'18:00',end:'20:00',activity:'discussion',stepFreeRequired:true};
 for(const [name,changes,pc,want] of [['exact-boundary',{}, {},'suitable'],['late-opening',{open:'18:01'},{},'unsuitable'],['early-close',{close:'19:59'},{},'unsuitable'],['unknown-seats',{seats:null},{},'needs-confirmation'],['zero-seats',{seats:0},{},'unsuitable'],['failure-dominates',{close:'19:00',seats:null},{},'unsuitable'],['unknown-noise',{noise:null},{},'needs-confirmation'],['solo-overrides',{noise:'silent',seats:1,stepFree:false},{partySize:1,activity:'silent-work',stepFreeRequired:false},'suitable']]){const r=assess({...base,...changes},{...pref,...pc});check('meaning',name,r.state===want,r);}
}catch(e){check('meaning','execution',false,String(e));}
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
const environment={node:process.version,chromium:browser.version()};
for(const width of [390,1280]){
 const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto(url);await page.waitForSelector('article[data-id]',{timeout:5000});
  const cards=await page.locator('article[data-id]').evaluateAll(ns=>ns.map(n=>({id:n.dataset.id,state:n.dataset.state,text:n.innerText})));
  check('interaction',`cards-${width}`,cards.length===6&&data.places.every((p,i)=>cards.find(c=>c.id===p.id)?.state===expected[i]),cards);
  const summary=await page.locator('#preference-summary').innerText();check('interaction',`summary-${width}`,summary.includes(data.preferences.start)&&summary.includes(data.preferences.end),summary);
  const [first,second]=data.places;await page.locator(`[data-select="${first.id}"]`).click();
  check('interaction',`first-selection-${width}`,await page.locator('#detail').getAttribute('data-id')===first.id,null);
  const next=page.locator(`[data-select="${second.id}"]`);await next.focus();await next.press('Enter');
  const detail=await page.locator('#detail').innerText();check('interaction',`second-selection-${width}`,await page.locator('#detail').getAttribute('data-id')===second.id&&detail.includes(second.name)&&!detail.includes(first.name),detail);
  const contacts=await page.locator('#detail a[href^="mailto:"]').evaluateAll(ns=>ns.map(n=>n.getAttribute('href')));check('interaction',`contact-${width}`,contacts.includes(second.contact),contacts);
  check('interaction',`uncertainty-${width}`,/unknown|unconfirmed|confirm|uncertain|ask|check/i.test(detail),detail);
  const text=await page.locator('body').innerText();const oak=cards.at(-1)?.text||'';
  check('grounding',`access-label-${width}`,/not step.free|no step.free|non.step.free|step.free[^\n]*not available/i.test(oak)&&!/^.*\bstairs\b.*$/im.test(oak),oak);
  check('grounding',`text-integrity-${width}`,!text.includes('\uFFFD'),null);
  check('grounding',`overflow-${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),null);
  await page.screenshot({path:path.join(out,`${width}.png`),fullPage:true});
 }catch(e){check('interaction',`browser-${width}`,false,String(e));}
 check('grounding',`page-errors-${width}`,errors.length===0,errors);await page.close();
}
await browser.close();const groups=Object.fromEntries(['meaning','interaction','grounding'].map(group=>{const items=checks.filter(c=>c.group===group);return [group,{passed:items.length>0&&items.every(c=>c.pass),count:items.length}];}));
fs.writeFileSync(path.join(out,'result.json'),JSON.stringify({groups,checks,environment},null,2));console.log(JSON.stringify(groups));
