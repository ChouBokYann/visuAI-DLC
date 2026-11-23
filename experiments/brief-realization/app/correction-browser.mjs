import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
try {for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
 const p=await browser.newPage({viewport:{width,height}});await p.goto('http://127.0.0.1:17834');
 await p.getByRole('button',{name:'Explore Guatemala',exact:true}).click();
 const samples=[];for(let i=0;i<8;i++){samples.push(await p.locator('.map-canvas').evaluate(e=>parseFloat(e.style.width)));await p.waitForTimeout(60);}
 assert(samples.some(x=>x>100&&x<130),'camera must have intermediate scale states');
 await p.getByRole('button',{name:'Add to compare',exact:true}).click();
 await p.getByRole('button',{name:'Explore Ethiopia',exact:true}).click();await p.waitForTimeout(600);
 await p.getByRole('button',{name:'Add to compare',exact:true}).click();
 await p.locator('.map-viewport').evaluate(e=>{e.scrollLeft=e.scrollWidth;e.scrollTop=40;});
 const camera=await p.locator('.map-viewport').evaluate(e=>[e.scrollLeft,e.scrollTop]);
 await p.getByRole('button',{name:'Compare origins (2/3)',exact:true}).click();
 await p.getByRole('button',{name:'Remove Guatemala from comparison'}).click();
 await p.getByRole('button',{name:'Return to exploration',exact:true}).click();await p.waitForTimeout(80);
 assert.deepEqual(await p.locator('.map-viewport').evaluate(e=>[e.scrollLeft,e.scrollTop]),camera,'comparison return retains actual pan');
 await p.getByRole('button',{name:'View Singapore cafes',exact:true}).click();await p.waitForTimeout(650);
 assert(await p.locator('#cafes-heading').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.top<innerHeight;}),'cafe action brings results into view');
 await p.getByRole('button',{name:'Back to map',exact:true}).click();await p.waitForTimeout(650);
 await p.screenshot({path:`correction-${name}.png`,fullPage:true});
 await p.emulateMedia({reducedMotion:'reduce'});await p.getByRole('button',{name:'Reset map zoom'}).click();await p.getByRole('button',{name:'Explore Guatemala',exact:true}).click();assert.equal(await p.locator('.map-canvas').evaluate(e=>parseFloat(e.style.width)),130,'reduced motion settles immediately');
 await p.emulateMedia({reducedMotion:'no-preference'});await p.getByRole('button',{name:'Reset map zoom'}).click();await p.getByRole('button',{name:'Explore Ethiopia',exact:true}).click();await p.waitForTimeout(70);await p.getByRole('button',{name:'Explore Guatemala',exact:true}).dispatchEvent('click');await p.waitForTimeout(600);assert.equal(await p.getByRole('button',{name:'Explore Guatemala',exact:true}).getAttribute('aria-pressed'),'true');assert.equal(await p.locator('.map-canvas').evaluate(e=>parseFloat(e.style.width)),130);
 console.log(name,JSON.stringify({samples,camera,passed:true}));await p.close();
}}finally{await browser.close();}
