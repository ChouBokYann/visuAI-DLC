import {chromium} from 'file:///C:/Users/maker/Documents/Projects/visuAI-DLC/visuAI-DLC/experiments/coffee-atlas/node_modules/@playwright/test/index.mjs';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const {places}=JSON.parse(await readFile(new URL('./data.json',import.meta.url),'utf8'));
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:17832/G/build/');
await page.waitForSelector('article');
assert.equal(await page.locator('article[data-id][data-state]').count(),places.length);
assert.deepEqual(await page.locator('article').evaluateAll(nodes=>nodes.map(n=>n.dataset.state)),['suitable','needs-confirmation','unsuitable','unsuitable','needs-confirmation','unsuitable']);
for(const place of places){
 await page.locator(`button[data-select="${place.id}"]`).click();
 assert.equal(await page.locator('#detail').getAttribute('data-id'),place.id);
 assert.equal(await page.locator('#detail h2').textContent(),place.name);
 assert.equal(await page.locator('#detail a').getAttribute('href'),place.contact);
 assert.ok((await page.locator('#detail').textContent()).includes(place.description));
}
assert.ok(!(await page.locator('body').textContent()).includes('Stairs'));
await page.screenshot({path:new URL('./desktop.png',import.meta.url).pathname.replace(/^\/([A-Z]:)/,'$1'),fullPage:true});
await page.setViewportSize({width:390,height:844});
await page.locator('button').first().click();
await page.screenshot({path:new URL('./phone.png',import.meta.url).pathname.replace(/^\/([A-Z]:)/,'$1'),fullPage:true});
assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
assert.deepEqual(errors,[]);
console.log('Browser: all six states, every selection/contact, phone width and console checks passed');
await browser.close();
