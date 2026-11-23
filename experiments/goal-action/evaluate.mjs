import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {chromium} from '../coffee-atlas/node_modules/@playwright/test/index.mjs';
const phase=process.argv[2]||'baseline';
const root=path.resolve('experiments/goal-action');
const out=path.resolve('output/goal-action',phase);fs.mkdirSync(out,{recursive:true});
const expected=phase==='phase2'?['available','unavailable','unavailable','unavailable','needs-confirmation','unavailable','needs-confirmation','unavailable','available','unavailable']:['available','available','unavailable','unavailable','needs-confirmation','unavailable','available','available','available','unavailable'];
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
const report={phase,arms:{}};
for(const arm of ['G','D']){
 const dir=path.join(root,arm),data=JSON.parse(fs.readFileSync(path.join(dir,'source-data.json'),'utf8'));
 const {assess}=await import(pathToFileURL(path.join(dir,'app.mjs')));
 const checks=[];const check=(name,pass,detail)=>checks.push({name,pass,detail});
 for(const [i,w] of data.workshops.entries()){const result=assess(w,data.preferences);check(w.id,result.state===expected[i]&&Array.isArray(result.reasons)&&(result.state==='available'||result.reasons.some(r=>typeof r==='string'&&r.trim())),result);}
 const base={...data.workshops[0],id:'unseen',start:'10:00',end:'13:00'};
 const prefs={start:'10:00',end:'13:00',completed:[],stepFreeRequired:true};
 for(const [name,changes,pchanges,want] of [['boundary',{}, {},'available'],['ends-late',{end:'13:01'},{},'unavailable'],['starts-early',{start:'09:59'},{},'unavailable'],['zero',{seats:0,waitlist:true},{},'unavailable'],['unknown',{seats:null},{},'needs-confirmation'],['prerequisite',{prerequisites:['intro']},{},'unavailable'],['completed',{prerequisites:['intro']},{completed:['intro']},'available'],['access-unknown',{stepFree:null},{},'needs-confirmation'],['access-not-required',{stepFree:false},{stepFreeRequired:false},'available']]){const result=assess({...base,...changes},{...prefs,...pchanges});check(name,result.state===want,result);}
 for(const width of [390,1280]){
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:17830/${arm}/`);await page.waitForSelector('article[data-id]');
  const dom=await page.locator('article[data-id]').evaluateAll(nodes=>nodes.map(n=>({id:n.dataset.id,state:n.dataset.state,text:n.innerText,contact:!!n.querySelector('a[href^="mailto:"]')})));
  check(`DOM-${width}`,dom.length===10&&data.workshops.every((w,i)=>dom.find(n=>n.id===w.id)?.state===expected[i])&&dom.every(n=>n.contact),dom);
  const summary=await page.locator('#preference-summary').innerText();check(`preferences-${width}`,summary.includes(data.preferences.start)&&summary.includes(data.preferences.end)&&(phase!=='phase2'||/step.free/i.test(summary)),summary);
  check(`overflow-${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),null);check(`errors-${width}`,errors.length===0,errors);
  await page.screenshot({path:path.join(out,`${arm}-${width}.png`),fullPage:true});await page.close();
 }
 for(const file of ['app.mjs','index.html','source-data.json','HANDOFF.md','DELIVERY.md'])if(fs.existsSync(path.join(dir,file)))fs.copyFileSync(path.join(dir,file),path.join(out,`${arm}-${file}`));
 report.arms[arm]={passed:checks.filter(c=>c.pass).length,total:checks.length,checks};
}
await browser.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(Object.fromEntries(Object.entries(report.arms).map(([a,r])=>[a,{passed:r.passed,total:r.total}]))));
