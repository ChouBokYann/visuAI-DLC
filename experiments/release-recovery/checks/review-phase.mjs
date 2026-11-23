import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const phase=process.argv[2],expected=process.argv[3];
assert(['A','B','recovered-A','C'].includes(phase));
const root=path.resolve(import.meta.dirname,'..'),out=path.join(root,'evidence','review-'+phase);
fs.mkdirSync(out,{recursive:true});
assert(!fs.existsSync(path.join(out,'result.json')),'Never overwrite a completed attempt');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const run=read(path.join(root,'target/state/run.json')),base=`http://127.0.0.1:${run.targetPort}`,backend=`http://127.0.0.1:${run.apiPort}`;
const report={phase,expected,started:new Date().toISOString(),harnessHash:hash(fs.readFileSync(import.meta.filename)),run,checks:[],observations:[],blockedExternal:[]};
async function check(name,fn){try{await fn();report.checks.push({name,pass:true});}catch(e){report.checks.push({name,pass:false,error:e.stack});}}
async function get(url){const response=await fetch(url);const text=await response.text();return {url,status:response.status,text};}
async function state(label){const value=await get(backend+'/api/shortlist');report.observations.push({label,...value});assert.equal(value.status,200);assert.deepEqual(JSON.parse(value.text),{schemaVersion:1,ids:['nylon','mill']});const now=read(path.join(root,'target/state/run.json'));assert.deepEqual(now,run);assert.equal(run.pid,39932);assert.equal(run.runId,'92e22675-7232-416e-96b2-ebcd705dd563');process.kill(run.pid,0);}
await check('stable backend and exact initial state',()=>state('before'));
await check('installed identity and every served artifact byte',async()=>{
 const active=read(path.join(root,'target/state/active.json'));assert.equal(active.release,expected);
 const dir=path.join(root,'target/state/releases',expected),manifest=read(path.join(dir,'manifest.json')),actual={};
 function walk(d){for(const entry of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,entry.name),rel=path.relative(dir,p).replaceAll('\\','/');assert(!entry.isSymbolicLink());if(entry.isDirectory())walk(p);else if(rel!=='manifest.json')actual[rel]=hash(fs.readFileSync(p));}}walk(dir);
 assert.deepEqual(actual,manifest);assert.equal(hash(JSON.stringify(manifest)),active.digest);
 const identity=await get(base+'/__release');report.identity={active,manifest,actual,response:identity};assert.equal(identity.status,200);assert.deepEqual(JSON.parse(identity.text),active);
 const operations=fs.readFileSync(path.join(root,'target/state/operations.jsonl'),'utf8').trim().split('\n').map(JSON.parse);assert.deepEqual(operations.at(-1),active);
 report.served=[];for(const [file,digest] of Object.entries(manifest)){if(!file.startsWith('dist/'))continue;const response=await fetch(base+'/'+file.slice(5));const observed=hash(Buffer.from(await response.arrayBuffer()));report.served.push({file,status:response.status,expected:digest,actual:observed});assert.equal(response.status,200);assert.equal(observed,digest);}
});
await check('process health',async()=>{const value=await get(base+'/health');report.observations.push(value);assert.equal(value.status,200);});
await check('target API returns correct saved shortlist',async()=>{const value=await get(base+'/api/shortlist');report.observations.push(value);assert.equal(value.status,200);assert.deepEqual(JSON.parse(value.text),{schemaVersion:1,ids:['nylon','mill']});});
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 report.browserVersion=browser.version();
 for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
  const context=await browser.newContext({viewport});await context.route('**/*',route=>{const url=route.request().url();if(url.startsWith(base+'/')||url.startsWith('data:')||url.startsWith('blob:'))return route.continue();report.blockedExternal.push(url);return route.abort();});
  const page=await context.newPage();page.setDefaultTimeout(7000);const label=`${viewport.width}x${viewport.height}`,events=[];page.on('response',r=>{if(r.url().includes('/api/'))events.push({url:r.url(),status:r.status()});});
  await check('browser load add remove refresh '+label,async()=>{
   await page.goto(base,{waitUntil:'networkidle'});await page.getByRole('button',{name:/^Shortlist \(/}).click();
   await page.screenshot({path:path.join(out,label+'-initial.png'),fullPage:true});
   await page.locator('#saved-nylon').waitFor();assert.deepEqual(await page.locator('.shortlist-card h2').allTextContents(),['Nylon Coffee','Alchemist · The Mill']);
   await page.getByRole('button',{name:/Discover more/}).click();await page.getByRole('button',{name:/Apartment Coffee Selegie/}).click();await page.getByRole('button',{name:'Save to shortlist',exact:true}).click();await page.getByRole('button',{name:/Saved to shortlist/}).waitFor();
   const added=await get(base+'/api/shortlist');report.observations.push({label:label+' added',...added});assert.equal(added.status,200);assert.deepEqual(JSON.parse(added.text).ids,['nylon','mill','apartment']);
   await page.getByRole('button',{name:/View shortlist/}).click();await page.locator('#saved-apartment').waitFor();await page.screenshot({path:path.join(out,label+'-added.png'),fullPage:true});
   await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:/^Shortlist \(/}).click();await page.locator('#saved-apartment').waitFor();
   await page.getByRole('button',{name:'Remove Apartment Coffee',exact:true}).click();await page.locator('#saved-apartment').waitFor({state:'detached'});await state(label+' removed');
   await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:/^Shortlist \(/}).click();await page.locator('#saved-nylon').waitFor();assert.deepEqual(await page.locator('.shortlist-card h2').allTextContents(),['Nylon Coffee','Alchemist · The Mill']);
  });
  report.observations.push({label,body:await page.locator('body').innerText(),apiEvents:events});await page.screenshot({path:path.join(out,label+'-final.png'),fullPage:true});await context.close();
 }
}catch(e){report.checks.push({name:'browser setup',pass:false,error:e.stack});}finally{await browser?.close();}
await check('stable backend and exact final state',()=>state('after'));
report.finished=new Date().toISOString();report.pass=report.checks.every(c=>c.pass);fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({phase,pass:report.pass,harnessHash:report.harnessHash,checks:report.checks},null,2));process.exitCode=report.pass?0:1;
