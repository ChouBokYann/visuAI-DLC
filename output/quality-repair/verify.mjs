import {chromium} from '../../experiments/brief-realization/app/node_modules/@playwright/test/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
const observations=[];
try{
 for(const [device,width,height] of [['desktop',1280,900],['phone',390,844],['small-phone',320,740]]){
  const page=await browser.newPage({viewport:{width,height}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(new URL('./index.html',import.meta.url).href);
  const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,cards:document.querySelectorAll('article').length,missingPhotos:document.querySelectorAll('.photo-status').length,images:document.images.length,cardTexts:[...document.querySelectorAll('article')].map(el=>el.innerText),allElementsFit:[...document.querySelectorAll('body *')].every(el=>el.getBoundingClientRect().right<=innerWidth+.5 && el.getBoundingClientRect().left>=-.5)}));
  assert.equal(state.scrollWidth,state.width);assert.equal(state.cards,3);assert.equal(state.missingPhotos,3);assert.equal(state.images,0);assert.equal(state.allElementsFit,true);
  for(const [i,price] of ['$18','$12','$20'].entries()) {assert.ok(state.cardTexts[i].includes(price));for(const label of ['Day price','Hours','Power','Setting & daylight']) assert.ok(state.cardTexts[i].includes(label));}
  assert.ok(state.cardTexts[0].includes('09:00–18:00'));assert.ok(state.cardTexts[0].includes('Outlets at shared tables'));assert.ok(state.cardTexts[1].includes('Unknown'));assert.ok(state.cardTexts[2].includes('No weather shelter'));
  await page.screenshot({path:fileURLToPath(new URL(`./${device}.png`,import.meta.url)),fullPage:true});
  await page.keyboard.press('Tab');assert.equal(await page.locator('a').evaluate(el=>el===document.activeElement),true);
  await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,'#places');assert.equal(await page.locator('#places').evaluate(el=>el===document.activeElement),true);assert.deepEqual(errors,[]);
  observations.push({device,...state,keyboardCompareLink:'passed',pageErrors:errors});await page.close();
 }
 fs.writeFileSync(new URL('./verification.json',import.meta.url),JSON.stringify({runAt:new Date().toISOString(),browser:browser.version(),htmlSha256:createHash('sha256').update(fs.readFileSync(new URL('./index.html',import.meta.url))).digest('hex'),observations},null,2),'utf8');
 console.log(JSON.stringify(observations.map(({device,width,scrollWidth,keyboardCompareLink})=>({device,width,scrollWidth,keyboardCompareLink}))));
}finally{await browser.close();}
