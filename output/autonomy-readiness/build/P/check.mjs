import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {assess} from './app.mjs';
import {chromium} from 'file:///C:/Users/maker/Documents/Projects/visuAI-DLC/visuAI-DLC/experiments/coffee-atlas/node_modules/@playwright/test/index.mjs';
const {places,preferences:p}=JSON.parse(await fs.readFile(new URL('./data.json',import.meta.url),'utf8'));
assert.deepEqual(places.map(x=>assess(x,p).state),['suitable','needs-confirmation','unsuitable','unsuitable','needs-confirmation','unsuitable']);
const base={...places[0],id:'new-id',open:p.start,close:p.end,seats:p.partySize};
assert.equal(assess(base,p).state,'suitable');
assert.equal(assess({...base,seats:null},p).state,'needs-confirmation');
assert.equal(assess({...base,seats:null,stepFree:false},p).state,'unsuitable');
assert.equal(assess({...base,stepFree:null},{...p,stepFreeRequired:false}).state,'suitable');
assert.equal(assess({...base,noise:'silent'},{...p,activity:'silent-work'}).state,'suitable');
assert.equal(assess(base,{...p,partySize:5}).state,'unsuitable');
assert.equal(assess({...base,noise:null},p).state,'needs-confirmation');
assert.equal(assess({...base,open:'18:01'},p).state,'unsuitable');
assert.equal(assess({...base,close:'19:59'},p).state,'unsuitable');
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
const page=await browser.newPage({viewport:{width:1280,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:17831/P/build/');
await page.locator('article').last().waitFor();
assert.equal(await page.locator('article').count(),places.length);
for(const place of places){
 assert.equal(await page.locator(`article[data-id="${place.id}"]`).getAttribute('data-state'),assess(place,p).state);
 await page.locator(`[data-select="${place.id}"]`).click();
 assert.equal(await page.locator('#detail').getAttribute('data-id'),place.id);
 assert.equal(await page.locator('#detail a').getAttribute('href'),place.contact);
 assert.equal(await page.locator('[aria-pressed="true"]').count(),1);
}
assert.match(await page.locator('#preference-summary').innerText(),/3 people.*18:00.*20:00.*Group discussion.*Step-free access required/);
await page.screenshot({path:new URL('./desktop.png',import.meta.url).pathname.replace(/^\/(\w:)/,'$1'),fullPage:true});
await page.setViewportSize({width:375,height:812});
await page.locator('[data-select="pine"]').click();
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true);
await page.screenshot({path:new URL('./phone.png',import.meta.url).pathname.replace(/^\/(\w:)/,'$1'),fullPage:true});
assert.deepEqual(errors,[]);
await browser.close();
console.log('PASS: assessment boundaries, unknown/failure precedence, changed preferences, six card states, six selections and contacts, summary, phone overflow, no browser errors.');

