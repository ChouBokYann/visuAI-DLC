import {chromium} from '../../../experiments/brief-realization/app/node_modules/@playwright/test/index.mjs';
import fs from 'node:fs';
const out=new URL('./',import.meta.url).pathname.replace(/^\/(\w:)/,'$1');
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
const results=[];
for(const [name,width,height] of [['desktop',1440,1000],['phone',390,844]]){
 const page=await browser.newPage({viewport:{width,height}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:17834');
 await page.getByRole('button',{name:'Explore Guatemala',exact:true}).click();
 const scales=[];for(let i=0;i<10;i++){scales.push(await page.locator('.map-canvas').evaluate(e=>e.style.width));await page.waitForTimeout(65);}
 const guatemala=await page.locator('.cafes-section').innerText();
 await page.getByRole('button',{name:'Add to compare',exact:true}).click();
 await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).click();await page.waitForTimeout(650);
 const ethiopia=await page.locator('.cafes-section').innerText();
 await page.getByRole('button',{name:'Add to compare',exact:true}).click();
 await page.locator('.map-viewport').evaluate(e=>{e.scrollLeft=80;e.scrollTop=35});
 const panBefore=await page.locator('.map-viewport').evaluate(e=>[e.scrollLeft,e.scrollTop]);
 await page.getByRole('button',{name:'Compare origins (2/3)',exact:true}).click();
 await page.screenshot({path:out+name+'-compare.png',fullPage:true});
 const compare=await page.getByRole('region',{name:'Origin comparison'}).innerText();
 await page.getByRole('button',{name:'Return to exploration',exact:true}).click();await page.waitForTimeout(100);
 const panAfter=await page.locator('.map-viewport').evaluate(e=>[e.scrollLeft,e.scrollTop]);
 const focus=await page.evaluate(()=>document.activeElement?.textContent);
 await page.getByRole('button',{name:'View Singapore cafes',exact:true}).click();await page.waitForTimeout(700);
 const cafeTop=await page.locator('#cafes-heading').evaluate(e=>e.getBoundingClientRect().top);
 await page.screenshot({path:out+name+'-cafes.png'});
 await page.getByRole('button',{name:'Back to map',exact:true}).click();await page.waitForTimeout(150);
 await page.screenshot({path:out+name+'-return.png'});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 const selected=await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).getAttribute('aria-pressed');
 await page.getByRole('button',{name:'Reset map zoom'}).click();await page.waitForTimeout(650);
 const reset={scale:await page.locator('.map-canvas').evaluate(e=>e.style.width),selection:await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).getAttribute('aria-pressed')};
 results.push({name,scales,panBefore,panAfter,focus,cafeTop,overflow,selected,reset,errors,guatemala,ethiopia,compare});await page.close();
}
await browser.close();fs.writeFileSync(out+'observations.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
