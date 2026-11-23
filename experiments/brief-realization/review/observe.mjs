import {chromium} from '../app/node_modules/@playwright/test/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const phase=process.argv[2];
if(!['initial','corrected'].includes(phase))throw Error('Specify initial or corrected');
const out=path.resolve('output/brief-realization',phase);
if(fs.existsSync(out))throw Error('Refuse to overwrite evidence');
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
const results=[];
const observe=(device,name,pass,detail)=>results.push({device,name,pass:!!pass,detail});
const camera=page=>page.evaluate(()=>{
 const v=document.querySelector('.map-viewport'),c=document.querySelector('.map-canvas'),p=document.querySelector('.origin-discovery circle');
 const rect=n=>n?Object.fromEntries(['x','y','width','height'].map(k=>[k,n.getBoundingClientRect()[k]])):null;
 return {viewport:rect(v),canvas:rect(c),point:rect(p),left:v?.scrollLeft,top:v?.scrollTop,scrollY,selected:new URL(location.href).searchParams.get('origin'),heading:document.querySelector('.origin-name')?.textContent};
});
const inMap=s=>s.point&&s.viewport&&s.point.x>=s.viewport.x-1&&s.point.y>=s.viewport.y-1&&s.point.x+s.point.width<=s.viewport.x+s.viewport.width+1&&s.point.y+s.point.height<=s.viewport.y+s.viewport.height+1;
for(const device of ['desktop','phone','reduced']){
 const context=await browser.newContext({viewport:device==='phone'?{width:390,height:844}:{width:1440,height:1000},isMobile:device==='phone',hasTouch:device==='phone',reducedMotion:device==='reduced'?'reduce':'no-preference',recordVideo:{dir:path.join(out,device),size:device==='phone'?{width:390,height:844}:{width:1440,height:1000}}});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://127.0.0.1:17834');await page.screenshot({path:path.join(out,`${device}-overview.png`)});
  const overview=await camera(page);
  await page.evaluate(()=>{window.__cameraFrames=[];const start=performance.now();function frame(t){const c=document.querySelector('.map-canvas'),v=document.querySelector('.map-viewport');window.__cameraFrames.push({t:t-start,width:c?.getBoundingClientRect().width,left:v?.scrollLeft,top:v?.scrollTop});if(t-start<1100)requestAnimationFrame(frame);}requestAnimationFrame(frame);});
  const originButton=page.getByRole('button',{name:'Explore Guatemala',exact:true});
  if(device==='phone')await originButton.tap();else {await originButton.focus();await originButton.press('Enter');}
  const samples=[];for(const ms of [0,140,260,700]){if(ms)await page.waitForTimeout(ms);samples.push(await camera(page));await page.screenshot({path:path.join(out,`${device}-focus-${ms}.png`)});}
  const first=await camera(page);const frames=await page.evaluate(()=>window.__cameraFrames);
  fs.writeFileSync(path.join(out,`${device}-camera.json`),JSON.stringify({overview,samples,frames},null,2));
  observe(device,'selected origin visible inside focused map',inMap(first)&&first.heading==='Guatemala',first);
  observe(device,'selection changes camera scale or position',Math.abs(first.canvas.width-overview.canvas.width)>5||Math.abs(first.left-overview.left)>5,first);
  const intermediate=frames.filter(f=>f.width>overview.canvas.width+2&&f.width<first.canvas.width-2);
  observe(device,device==='reduced'?'reduced camera has no animated intermediate scale':'camera has multiple intermediate focus states',device==='reduced'?intermediate.length===0:intermediate.length>1,{intermediate:intermediate.length,total:frames.length});
  observe(device,'correct cafe connection is rendered',await page.locator('#cafes').isVisible()&&(await page.locator('#cafes').innerText()).includes('Nylon'),await page.locator('#cafes').innerText());
  const phoneState=await page.evaluate(()=>({scrollY,viewport:innerHeight,cafeTop:document.querySelector('#cafes')?.getBoundingClientRect().top,originTop:document.querySelector('.origin-panel')?.getBoundingClientRect().top}));
  observe(device,'connection has a reachable labelled action',await page.getByRole('button',{name:/Find it in Singapore/}).count()>0,phoneState);
  await page.getByRole('button',{name:'Add to compare',exact:true}).click();
  // The equivalent origin list remains available even when a map target is outside the focused view.
  const alternate=page.locator('.origin-list').getByRole('button',{name:'Ethiopia',exact:true});
  if(await alternate.isVisible())await alternate.click();else await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).click();
  await page.waitForTimeout(900);
  const second=await camera(page);observe(device,'different origin receives different camera focus',inMap(second)&&second.heading==='Ethiopia'&&Math.abs(second.left-first.left)>5,{first,second});
  await page.getByRole('button',{name:'Add to compare',exact:true}).click();
  const open=page.getByRole('button',{name:/^Compare origins/});await open.scrollIntoViewIfNeeded();const before=await camera(page);await open.click();
  const comparison=page.getByRole('region',{name:'Origin comparison'});const text=await comparison.innerText();
  observe(device,'comparison contains both origins and cafe context',text.includes('Guatemala')&&text.includes('Ethiopia')&&text.includes('Nylon')&&text.includes('PPP'),text);
  await page.screenshot({path:path.join(out,`${device}-comparison.png`),fullPage:true});
  await page.getByRole('button',{name:'Return to exploration',exact:true}).click();await page.waitForTimeout(150);const after=await camera(page);
  observe(device,'comparison return preserves selection camera and page position',after.selected===before.selected&&Math.abs(after.left-before.left)<2&&Math.abs(after.top-before.top)<2&&Math.abs(after.scrollY-before.scrollY)<4,{before,after});
  const imgs=await page.locator('.origin-photo img').evaluateAll(ns=>ns.map(n=>({src:n.getAttribute('src'),loaded:n.complete&&n.naturalWidth>0,alt:n.alt})));
  observe(device,'meaningful local photo loaded',imgs.length>0&&imgs.every(i=>i.loaded),imgs);
  await page.locator('.origin-photo summary').click();observe(device,'photo attribution and license reachable',(await page.locator('.origin-photo').innerText()).includes('CC BY'),await page.locator('.origin-photo').innerText());
  const source=page.locator('#cafes a').filter({hasText:'Check coffee listing'}).first();
  await context.route('https://pppcoffee.com/**',route=>route.fulfill({contentType:'text/html',body:'<title>Source navigation probe</title><p>External content omitted for local state check.</p>'}));
  const sourceBefore=await camera(page);const popupPromise=context.waitForEvent('page');await source.click();const popup=await popupPromise;await popup.close();const sourceAfter=await camera(page);
  observe(device,'source opens separately without losing origin or camera',sourceAfter.selected===sourceBefore.selected&&Math.abs(sourceAfter.left-sourceBefore.left)<2,{before:sourceBefore,after:sourceAfter});
  await page.getByRole('button',{name:'Reset map zoom',exact:true}).click();await page.waitForTimeout(900);const reset=await camera(page);
  observe(device,'world view restores overview scale',Math.abs(reset.canvas.width-overview.canvas.width)<2,reset);
  const body=await page.locator('body').innerText();observe(device,'rendered text has no obvious encoding substitutions',!body.includes('\uFFFD')&&!/caf\?|venue\?s| \? /i.test(body),body.match(/.{0,35}(?:caf\?|venue\?s| \? ).{0,35}/gi));
  observe(device,'no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),null);
  await page.screenshot({path:path.join(out,`${device}-final.png`),fullPage:true});
  await page.getByRole('searchbox').fill('unicorn');observe(device,'empty search has honest recovery',await page.getByRole('button',{name:'Reset filters',exact:true}).isVisible(),null);
  await page.getByRole('button',{name:'Reset filters',exact:true}).click();
  await page.evaluate(()=>{for(const name of ['Guatemala','Ethiopia','Guatemala'])document.querySelector(`button[aria-label="Explore ${name}"]`).click();});await page.waitForTimeout(1100);
  const rapid=await camera(page);observe(device,'rapid selection settles on latest origin',rapid.heading==='Guatemala'&&inMap(rapid),rapid);
 }catch(e){observe(device,'observation execution',false,String(e));}
 observe(device,'no browser errors',errors.length===0,errors);
 await context.close();
}
const failure=await browser.newPage({viewport:{width:390,height:844}});
await failure.route('**/photos/**',route=>route.abort());await failure.goto('http://127.0.0.1:17834');await failure.getByRole('button',{name:'Explore Guatemala',exact:true}).click();await failure.waitForTimeout(500);
observe('failure','photo failure keeps truthful useful content',(await failure.locator('.origin-photo').innerText()).includes('could not load')&&(await failure.locator('#cafes').innerText()).includes('Nylon'),await failure.locator('.origin-photo').innerText());
await failure.screenshot({path:path.join(out,'phone-photo-failure.png'),fullPage:true});await failure.close();
await browser.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results.map(({device,name,pass})=>({device,name,pass})),null,2));
