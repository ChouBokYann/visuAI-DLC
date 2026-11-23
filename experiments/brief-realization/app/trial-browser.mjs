import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:17834');
 await page.getByRole('button',{name:'Explore Guatemala',exact:true}).click();
 await page.getByRole('heading',{name:'Guatemala, in Singapore.'}).waitFor();
 assert.equal(await page.locator('.map-canvas').evaluate(el=>el.style.width),'130%');
 await page.getByRole('button',{name:'Add to compare',exact:true}).click();
 await page.screenshot({path:`trial-${name}-selected.png`,fullPage:true});
 await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).click();
 await page.getByRole('button',{name:'Add to compare',exact:true}).click();
 await page.getByRole('button',{name:'Compare origins (2/3)',exact:true}).click();
 await page.getByRole('region',{name:'Origin comparison'}).waitFor();
 await page.screenshot({path:`trial-${name}-compare.png`,fullPage:true});
 await page.getByRole('button',{name:'Return to exploration'}).click();
 assert.equal(await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).getAttribute('aria-pressed'),'true');
 assert.equal(await page.locator('.map-canvas').evaluate(el=>el.style.width),'130%');
 const before=await page.locator('.map-viewport').evaluate(el=>[el.scrollLeft,el.scrollTop]);
 const popup=page.waitForEvent('popup');await page.getByRole('link',{name:'Check coffee listing'}).first().click();const external=await popup;await external.close();
 assert.deepEqual(await page.locator('.map-viewport').evaluate(el=>[el.scrollLeft,el.scrollTop]),before);
 await page.getByRole('button',{name:'Reset map zoom'}).click();assert.equal(await page.locator('.map-canvas').evaluate(el=>el.style.width),'100%');
 assert.equal(await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).getAttribute('aria-pressed'),'true');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(errors,[]);console.log(name+': selection, linked listings, comparison, return, external source return, reset, no overflow or JS errors passed');await page.close();
}
await browser.close();
