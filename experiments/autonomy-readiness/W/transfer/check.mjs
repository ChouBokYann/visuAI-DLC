import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {assess} from './app.mjs';
import {chromium} from 'file:///C:/Users/maker/Documents/Projects/visuAI-DLC/visuAI-DLC/experiments/coffee-atlas/node_modules/@playwright/test/index.mjs';
const data=JSON.parse(await readFile(new URL('./data.json',import.meta.url),'utf8'));
assert.deepEqual(data.places.map(p=>assess(p,data.preferences).state), ['suitable','needs-confirmation','unsuitable','suitable','suitable','suitable']);
const base={open:'18:00',close:'19:00',seats:1,noise:'silent',stepFree:null};
assert.equal(assess(base,data.preferences).state,'suitable');
for(const change of [{open:'18:01'},{close:'18:59'},{seats:0},{noise:'conversation'}]) assert.equal(assess({...base,...change},data.preferences).state,'unsuitable');
for(const change of [{open:null},{close:null},{seats:null},{noise:null}]) assert.equal(assess({...base,...change},data.preferences).state,'needs-confirmation');
assert.equal(assess({...base,seats:0,noise:null},data.preferences).state,'unsuitable');
assert.equal(assess(base,{...data.preferences,stepFreeRequired:true}).state,'needs-confirmation');
assert.equal(assess({...base,stepFree:false},{...data.preferences,stepFreeRequired:true}).state,'unsuitable');
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
try {
 const page=await browser.newPage({viewport:{width:1280,height:1000}});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:17831/W/transfer/');
 await page.locator('article').last().waitFor();
 assert.equal(await page.locator('article').count(),6);
 assert.match(await page.locator('#preference-summary').innerText(), /1 person.*18:00.*19:00.*Silent work.*not required/);
 for(const p of data.places) {
   assert.equal(await page.locator(`article[data-id="${p.id}"]`).getAttribute('data-state'),assess(p,data.preferences).state);
   await page.locator(`[data-select="${p.id}"]`).click();
   assert.equal(await page.locator('#detail').count(),1);
   assert.equal(await page.locator('#detail').getAttribute('data-id'),p.id);
   assert.equal(await page.locator('#detail a').getAttribute('href'),p.contact);
   assert.equal(await page.locator('[aria-pressed="true"]').count(),1);
 }
 await page.locator('[data-select="t-fern"]').click();
 assert.match(await page.locator('#detail').innerText(),/confirm at least 1 seat\./);
 await page.screenshot({path:new URL('./desktop.png',import.meta.url).pathname.slice(1),fullPage:true});
 await page.setViewportSize({width:390,height:844});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.screenshot({path:new URL('./phone.png',import.meta.url).pathname.slice(1),fullPage:true});
 // Independent runtime fixture: different ID, party size, hours, activity and access.
 await page.route('**/data.json',route=>route.fulfill({json:{preferences:{partySize:3,start:'12:00',end:'13:00',activity:'discussion',stepFreeRequired:true},places:[{id:'fresh-id',name:'Fresh room',open:'12:00',close:'13:00',seats:3,noise:'conversation',stepFree:true,contact:'mailto:fresh@example.invalid'}]}}));
 await page.reload(); await page.locator('article').waitFor();
 assert.equal(await page.locator('article').getAttribute('data-state'),'suitable');
 assert.match(await page.locator('#preference-summary').innerText(),/3 people.*12:00.*13:00.*Discussion.*required/);
 await page.locator('[data-select="fresh-id"]').click();
 assert.equal(await page.locator('#detail a').getAttribute('href'),'mailto:fresh@example.invalid');
 assert.deepEqual(errors,[]);
 console.log('PASS: 17 assessment cases; 6 cards, all selection/contact switches; live preference summary; dynamic fixture; phone overflow; no browser errors.');
} finally {await browser.close();}
