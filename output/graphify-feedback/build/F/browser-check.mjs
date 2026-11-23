import {chromium} from 'file:///C:/Users/maker/Documents/Projects/visuAI-DLC/visuAI-DLC/experiments/coffee-atlas/node_modules/@playwright/test/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1200,height:900}});
const errors=[]; page.on('pageerror', e=>errors.push(e.message));
await page.goto('http://127.0.0.1:17832/F/build/');
await page.locator('article').last().waitFor();
assert.equal(await page.locator('article').count(),6);
for(const id of ['cedar','fern','elm','ash','pine','oak']){
 await page.locator(`[data-select="${id}"]`).click();
 assert.equal(await page.locator('#detail').getAttribute('data-id'),id);
 assert.equal(await page.locator('#detail a').getAttribute('href'),`mailto:${id}@example.invalid`);
}
assert.ok((await page.locator('#detail').innerText()).includes('Not step-free'));
assert.ok(!(await page.locator('body').innerText()).includes('Stairs'));
assert.ok(!(await page.locator('body').innerText()).includes('\ufffd'));
await page.screenshot({path:new URL('./desktop.png',import.meta.url).pathname.slice(1),fullPage:true});
await page.setViewportSize({width:390,height:844});
await page.locator('[data-select="fern"]').click();
assert.ok((await page.locator('#detail').innerText()).includes('Ask whether enough seats'));
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
await page.screenshot({path:new URL('./phone.png',import.meta.url).pathname.slice(1),fullPage:true});
assert.deepEqual(errors,[]);
await browser.close();
console.log('Browser checks passed: all selections/contact replacement, unknown guidance, labels, encoding, mobile overflow, no runtime errors.');
