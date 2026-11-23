import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
import {chromium} from '../coffee-atlas/node_modules/@playwright/test/index.mjs';
const stage=process.argv[2]||'build',task=stage==='baseline'?'build':stage;
const root=path.resolve('experiments/autonomy-readiness'),out=path.resolve('output/autonomy-readiness',stage);fs.mkdirSync(out,{recursive:true});
const expected=task==='transfer'?['suitable','needs-confirmation','unsuitable','suitable','suitable','suitable']:['suitable','needs-confirmation','unsuitable','unsuitable','needs-confirmation','unsuitable'];
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
const report={stage,arms:{}};
for(const arm of ['P','W']){
 const dir=path.join(root,arm,task),data=JSON.parse(fs.readFileSync(path.join(dir,'data.json'),'utf8'));const checks=[];
 const check=(name,pass,detail)=>checks.push({name,pass:!!pass,detail});
 let assess;try{({assess}=await import(pathToFileURL(path.join(dir,'app.mjs'))));}catch(e){check('module',false,String(e));}
 if(assess){
  for(const [i,p] of data.places.entries()){try{const r=assess(p,data.preferences);check(p.id,r.state===expected[i]&&Array.isArray(r.reasons)&&(r.state==='suitable'||r.reasons.some(x=>typeof x==='string'&&x.trim())),r);}catch(e){check(p.id,false,String(e));}}
  const base={id:'unseen',name:'Unseen',open:'18:00',close:'20:00',noise:'conversation',seats:3,stepFree:true};const pref={partySize:3,start:'18:00',end:'20:00',activity:'discussion',stepFreeRequired:true};
  for(const [name,changes,pc,want] of [['exact-boundary',{}, {},'suitable'],['late-opening',{open:'18:01'},{},'unsuitable'],['early-close',{close:'19:59'},{},'unsuitable'],['unknown-seats',{seats:null},{},'needs-confirmation'],['zero-seats',{seats:0},{},'unsuitable'],['failure-dominates',{close:'19:00',seats:null},{},'unsuitable'],['unknown-noise',{noise:null},{},'needs-confirmation'],['solo-overrides',{noise:'silent',seats:1,stepFree:false},{partySize:1,activity:'silent-work',stepFreeRequired:false},'suitable']]){try{const r=assess({...base,...changes},{...pref,...pc});check(name,r.state===want,r);}catch(e){check(name,false,String(e));}}
 }
 for(const width of [390,1280]){
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.goto(`http://127.0.0.1:17831/${arm}/${task}/`);await page.waitForSelector('article[data-id]',{timeout:5000});
   const cards=await page.locator('article[data-id]').evaluateAll(ns=>ns.map(n=>({id:n.dataset.id,state:n.dataset.state,text:n.innerText})));
   check(`cards-${width}`,cards.length===6&&data.places.every((p,i)=>cards.find(c=>c.id===p.id)?.state===expected[i]),cards);
   const summary=await page.locator('#preference-summary').innerText();check(`summary-${width}`,summary.includes(data.preferences.start)&&summary.includes(data.preferences.end),summary);
   const [first,second]=data.places;
   await page.locator(`[data-select="${first.id}"]`).click();
   check(`first-selection-${width}`,await page.locator('#detail').getAttribute('data-id')===first.id,await page.locator('#detail').innerText());
   const next=page.locator(`[data-select="${second.id}"]`);await next.focus();await next.press('Enter');
   const detail=await page.locator('#detail').innerText(),id=await page.locator('#detail').getAttribute('data-id');
   check(`keyboard-second-selection-${width}`,id===second.id&&detail.includes(second.name)&&!detail.includes(first.name),{id,detail});
   const contact=await page.locator('#detail a[href^="mailto:"]').evaluateAll(ns=>ns.map(n=>n.getAttribute('href')));check(`selected-contact-${width}`,contact.includes(second.contact),contact);
   check(`uncertainty-reason-${width}`,/unknown|unconfirmed|confirm|uncertain|ask|check/i.test(detail),detail);
   check(`overflow-${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),null);
   await page.screenshot({path:path.join(out,`${arm}-${width}.png`),fullPage:true});
  }catch(e){check(`browser-${width}`,false,String(e));}
  check(`page-errors-${width}`,errors.length===0,errors);await page.close();
 }
 fs.cpSync(dir,path.join(out,arm),{recursive:true});report.arms[arm]={passed:checks.filter(c=>c.pass).length,total:checks.length,checks};
}
await browser.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(Object.fromEntries(Object.entries(report.arms).map(([a,r])=>[a,{passed:r.passed,total:r.total}]))));
