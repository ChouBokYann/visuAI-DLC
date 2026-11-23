import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {chromium,expect} from '@playwright/test';
import {createServer as viteServer} from 'vite';
const root=path.resolve(process.argv[2]||process.cwd()), label=process.argv[3]||'r1';
const evidence=path.join(root,'evidence'); fs.mkdirSync(evidence,{recursive:true});
const file=(suffix)=>path.join(evidence,`review-${label}-${suffix}`);
const observations=[];let browser,vite,api;let checks=0,failed=0;
function manifest(){const out={};function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['dist','node_modules','checks','evidence'].includes(e.name))continue;let p=path.join(dir,e.name);if(e.isDirectory())walk(p);else out[path.relative(root,p).replaceAll('\\','/')]=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');}}walk(root);return out;}
const source=manifest();fs.writeFileSync(file('browser-source.json'),JSON.stringify(source,null,2));
const log=(message)=>{observations.push({at:new Date().toISOString(),message});console.log(message);};
try{
 api=(await import(pathToFileURL(path.join(root,'server/api.mjs')))).createApp(); await new Promise(r=>api.listen(0,'127.0.0.1',r));
 process.env.API_PORT=String(api.address().port);vite=await viteServer({root,server:{port:0,host:'127.0.0.1',strictPort:true}});await vite.listen();
 const base=`http://127.0.0.1:${vite.httpServer.address().port}`;
 const apiUrl=`http://127.0.0.1:${api.address().port}/api/shortlist`;
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox']});
 fs.writeFileSync(file('resources.json'),JSON.stringify({owner:'/root/e06_coordinator/reviewer',pid:process.pid,apiPort:api.address().port,vitePort:vite.httpServer.address().port,browser:'owned Playwright instance; close in finally',at:new Date().toISOString()},null,2));
 const seed=async ids=>{const r=await fetch(apiUrl,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({schemaVersion:1,ids})});assert.equal(r.status,200);};
 const saved=async()=> (await (await fetch(apiUrl)).json()).ids;
 for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
  const context=await browser.newContext({viewport});
  await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
  const page=await context.newPage();page.setDefaultTimeout(10000);
  const short=()=>page.locator('nav button').filter({hasText:/^Shortlist/}).click();
  const cards=()=>page.locator('.shortlist-card h2');
  const count=async n=>expect(page.locator('nav button').filter({hasText:/^Shortlist/})).toHaveText(`Shortlist (${n}/3)`);
  const search=async()=>{const b=page.locator('nav button').first();if((await b.textContent()).startsWith('Find'))await b.click();};
  const open=async name=>{await search();await page.locator('.cafe-row').filter({hasText:name}).click();};
  const add=async(name,n)=>{await open(name);await page.getByRole('button',{name:'Save to shortlist',exact:true}).click();await count(n);await page.locator('dialog .close').click();};
  const check=async(name,fn)=>{checks++;try{await fn();log(`PASS ${viewport.width} ${name}`);}catch(e){failed++;log(`FAIL ${viewport.width} ${name}: ${e.stack}`);await page.screenshot({path:file(`${viewport.width}-${checks}-failure.png`),fullPage:true}).catch(()=>{});}};
  await check('real provider add compare capacity order replacement empty refresh',async()=>{
   await seed([]);await page.goto(base);await search();await expect(page.locator('.cafe-row')).toHaveCount(6);
   await page.locator('input[type=search]').fill('Nylon');await expect(page.locator('.cafe-row')).toHaveCount(1);await page.locator('input[type=search]').fill('');
   await add('Nylon Coffee',1);await add('Apartment Coffee',2);await add('Tiong Hoe',3);

  });
  // Continue the integrated case independently of selector setup above only when it reached capacity.
  await check('capacity comparison and surviving order',async()=>{
   if(await page.locator('dialog').count())await page.locator('dialog .close').click();
   await search();await page.locator('.cafe-row').filter({hasText:'The Mill'}).click();await expect(page.getByRole('button',{name:'Save to shortlist',exact:true})).toBeDisabled();await page.locator('dialog .close').click();await short();
   await expect(cards()).toHaveText(['Nylon Coffee','Apartment Coffee','Tiong Hoe']);await expect(page.locator('.shortlist-card dl')).toHaveCount(3);
   await page.getByRole('button',{name:'Remove Apartment Coffee',exact:true}).click();await count(2);await add('The Mill',3);await short();await expect(cards()).toHaveText(['Nylon Coffee','Tiong Hoe',/The Mill/]);
   assert.deepEqual(await saved(),['nylon','tionghoe','mill']);await page.reload();await short();await expect(cards()).toHaveText(['Nylon Coffee','Tiong Hoe',/The Mill/]);
   for(const id of ['nylon','tionghoe','mill']){await page.locator(`#remove-${id}`).click();await expect(page.locator(`#remove-${id}`)).toHaveCount(0);}
   await expect(cards()).toHaveCount(0);await page.reload();await short();await expect(page.locator('.shortlist-intro')).toContainText('0 of 3 saved');await expect(cards()).toHaveCount(0);assert.deepEqual(await saved(),[]);
  });
  await check('initial failure unavailable and retry; loading edits disabled',async()=>{
   await seed(['nylon']);let release;const gate=new Promise(r=>release=r);let first=true;
   await page.route('**/api/shortlist',async r=>{if(r.request().method()==='GET'&&first){first=false;await gate;await r.fulfill({status:503,contentType:'application/json',body:'{}'});}else await r.continue();});
   await page.goto(base);await open('Apartment Coffee');await expect(page.getByRole('button',{name:'Save to shortlist',exact:true})).toBeDisabled();release();await expect(page.getByRole('alert')).toContainText('unavailable');await page.locator('dialog .close').click();await short();await expect(page.locator('.empty')).toHaveCount(0);await page.getByRole('button',{name:'Retry shortlist'}).click();await count(1);await expect(cards()).toHaveText(['Nylon Coffee']);await page.unroute('**/api/shortlist');
  });
  await check('pending disabled no duplicates failed write retains selection retry',async()=>{
   await seed(['nylon']);await page.goto(base);await short();await expect(cards()).toHaveText(['Nylon Coffee']);let release;const gate=new Promise(r=>release=r);let puts=0;
   await page.route('**/api/shortlist',async r=>{if(r.request().method()==='PUT'&&++puts===1){await gate;await r.fulfill({status:500,contentType:'application/json',body:'{}'});}else await r.continue();});
   await page.locator('#remove-nylon').click();await expect(page.locator('#remove-nylon')).toBeDisabled();await expect(cards()).toHaveText(['Nylon Coffee']);await page.locator('#remove-nylon').evaluate(b=>{b.click();b.click();});assert.equal(puts,1);release();await expect(page.getByRole('alert')).toContainText('unchanged');await expect(cards()).toHaveText(['Nylon Coffee']);assert.deepEqual(await saved(),['nylon']);await page.getByRole('button',{name:'Retry shortlist'}).click();await expect(cards()).toHaveCount(0);assert.equal(puts,2);await page.unroute('**/api/shortlist');
  });
  await check('invalid acknowledgment retains selection then retry',async()=>{
   await seed(['nylon']);await page.goto(base);await short();await expect(cards()).toHaveText(['Nylon Coffee']);let first=true;
   await page.route('**/api/shortlist',async r=>{if(r.request().method()==='PUT'&&first){first=false;await r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({schemaVersion:2,cafeIds:[]})});}else await r.continue();});
   await page.locator('#remove-nylon').click();await expect(page.getByRole('alert')).toContainText('invalid');await expect(cards()).toHaveText(['Nylon Coffee']);await page.getByRole('button',{name:'Retry shortlist'}).click();await expect(cards()).toHaveCount(0);await page.unroute('**/api/shortlist');
  });
  await check('story completion retained',async()=>{
   await page.goto(base);await page.getByRole('button',{name:/Step inside/}).click();for(let i=0;i<4;i++){await page.locator('.options button').first().click();await page.locator('.choice-footer button').click();}await expect(page.locator('.result-panel .picks button')).toHaveCount(3);await page.screenshot({path:file(`${viewport.width}-final.png`),fullPage:true});
  });
  await context.close();
 }
}catch(e){failed++;log(`SETUP OR HARNESS FAILURE: ${e.stack}`);}finally{await browser?.close();await vite?.close();if(api)await new Promise(r=>api.close(r));fs.writeFileSync(file('browser-result.json'),JSON.stringify({at:new Date().toISOString(),command:`node checks/browser.mjs ${root} ${label}`,checks,passed:checks-failed,failed,exit:failed?1:0,observations,sourceUnchanged:JSON.stringify(source)===JSON.stringify(manifest()),resourcesReleased:true},null,2));}
process.exitCode=failed?1:0;

