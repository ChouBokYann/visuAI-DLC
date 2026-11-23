import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {assess} from './app.mjs';
import {chromium} from 'file:///C:/Users/maker/Documents/Projects/visuAI-DLC/visuAI-DLC/experiments/coffee-atlas/node_modules/@playwright/test/index.mjs';
const data = JSON.parse(await readFile(new URL('./data.json', import.meta.url), 'utf8'));
const expected = ['suitable','needs-confirmation','unsuitable','suitable','suitable','suitable'];
assert.deepEqual(data.places.map(p=>assess(p,data.preferences).state),expected);
const base = {seats:1,open:'18:00',close:'19:00',noise:'silent',stepFree:null};
const prefs=data.preferences;
assert.equal(assess(base,prefs).state,'suitable');
assert.equal(assess({...base,seats:0},prefs).state,'unsuitable');
assert.equal(assess({...base,open:'18:01'},prefs).state,'unsuitable');
assert.equal(assess({...base,close:'18:59'},prefs).state,'unsuitable');
assert.equal(assess({...base,seats:null},prefs).state,'needs-confirmation');
assert.equal(assess({...base,noise:null},prefs).state,'needs-confirmation');
assert.equal(assess({...base,seats:null,close:'18:59'},prefs).state,'unsuitable');
assert.equal(assess(base,{...prefs,stepFreeRequired:true}).state,'needs-confirmation');
assert.equal(assess({...base,stepFree:false},{...prefs,stepFreeRequired:true}).state,'unsuitable');
assert.equal(assess({...base,noise:'conversation'},{...prefs,activity:'discussion'}).state,'suitable');
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
try {
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:17831/P/transfer/');
 await page.locator('article').first().waitFor();
 assert.equal(await page.locator('article').count(),data.places.length);
 assert.match(await page.locator('#preference-summary').innerText(),/1 person.*18:00.*19:00.*Silent work.*optional/);
 for(const [i,p] of data.places.entries()) {
  assert.equal(await page.locator(`article[data-id="${p.id}"]`).getAttribute('data-state'),expected[i]);
  await page.locator(`[data-select="${p.id}"]`).click();
  assert.equal(await page.locator('#detail').count(),1);
  assert.equal(await page.locator('#detail').getAttribute('data-id'),p.id);
  assert.equal(await page.locator('#detail h2').innerText(),p.name);
  assert.equal(await page.locator('#detail a').getAttribute('href'),p.contact);
  assert.equal(await page.locator('[aria-pressed="true"]').count(),1);
 }
 await page.screenshot({path:new URL('./desktop.png',import.meta.url).pathname.replace(/^\/(\w:)/,'$1'),fullPage:true});
 await page.setViewportSize({width:375,height:812});
 await page.locator('[data-select="t-fern"]').click();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= window.innerWidth),true);
 await page.screenshot({path:new URL('./phone.png',import.meta.url).pathname.replace(/^\/(\w:)/,'$1'),fullPage:true});
 assert.deepEqual(errors,[]);
 console.log('PASS: runtime assessments, boundary and unknown cases, all selections/contact links, current summary, mobile overflow, no browser errors.');
} finally {await browser.close();}
