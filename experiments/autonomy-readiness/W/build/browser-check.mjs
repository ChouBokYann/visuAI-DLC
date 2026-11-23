import {chromium} from 'file:///C:/Users/maker/Documents/Projects/visuAI-DLC/visuAI-DLC/experiments/coffee-atlas/node_modules/@playwright/test/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
try {
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:17831/W/build/');
 await page.locator('article').first().waitFor();
 assert.equal(await page.locator('article').count(),6);
 assert.match(await page.locator('#preference-summary').innerText(),/3 people.*18:00–20:00.*Discussion.*required/);
 for (const id of ['cedar','fern','elm','ash','pine','oak','cedar']) {
  await page.locator(`[data-select="${id}"]`).click();
  assert.equal(await page.locator('#detail').getAttribute('data-id'),id);
  assert.equal(await page.locator('#detail a').getAttribute('href'),`mailto:${id}@example.invalid`);
  assert.equal(await page.locator('[aria-pressed="true"]').count(),1);
 }
 await page.locator('[data-select="fern"]').click();
 assert.match(await page.locator('#detail').innerText(),/Ask.*3 seats/);
 await page.screenshot({path:new URL('./desktop.png',import.meta.url).pathname.slice(1),fullPage:true});
 await page.setViewportSize({width:375,height:812});
 await page.locator('[data-select="pine"]').click();
 assert.match(await page.locator('#detail').innerText(),/confirm step-free access/);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.screenshot({path:new URL('./phone.png',import.meta.url).pathname.slice(1),fullPage:true});
 assert.deepEqual(errors,[]);
 // Simulate a different runtime catalogue without modifying the input file.
 await page.route('**/data.json',route=>route.fulfill({json:{preferences:{partySize:1,start:'09:00',end:'10:00',activity:'silent-work',stepFreeRequired:false},places:[{id:'new-room',name:'New room',open:'08:00',close:'11:00',noise:'silent',seats:1,stepFree:null,contact:'mailto:new@example.invalid',description:'New runtime entry'}]}}));
 await page.reload();await page.locator('article').first().waitFor();
 assert.equal(await page.locator('article').getAttribute('data-state'),'suitable');
 assert.match(await page.locator('#preference-summary').innerText(),/1 people.*09:00–10:00.*Silent work.*optional/);
 await page.locator('[data-select="new-room"]').click();
 assert.equal(await page.locator('#detail a').getAttribute('href'),'mailto:new@example.invalid');
 console.log('PASS: browser selection/contact synchronization, uncertainty explanations, summary, 375px overflow, runtime replacement; no page errors. Screenshots saved.');
} finally {await browser.close();}


