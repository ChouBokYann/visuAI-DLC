import {chromium,expect} from '../cafe-personality-v2/node_modules/@playwright/test/index.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir=new URL('./screenshots/',import.meta.url);await mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const captures=[];
async function shot(page,name,state){await page.evaluate(()=>document.fonts.ready);const data=await page.screenshot({path:new URL(name+'.png',dir).pathname.replace(/^\/([A-Za-z]:)/,'$1')});captures.push({file:'screenshots/'+name+'.png',state,url:page.url(),sha256:createHash('sha256').update(data).digest('hex')});}
try{
 const a=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await a.goto('http://127.0.0.1:5174');await expect(a.getByRole('heading',{name:/A little detour/})).toBeVisible();await a.waitForTimeout(1000);await shot(a,'v1-home','Initial home');
 await a.getByRole('button',{name:/Find my coffee personality/}).click();await a.getByRole('radio').first().check();await shot(a,'v1-story','First story choice');
 for(let step=0;step<5;step++){await a.getByRole('radio').first().check();await a.getByRole('button',{name:step===4?'Meet my coffee personality':'Turn the page'}).click();}
 await expect(a.locator('.match-section .cafe-card')).toHaveCount(3);await shot(a,'v1-result','All first choices; three matches');
 const b=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await b.goto('http://127.0.0.1:5175');await expect(b.locator('.room-canvas')).toHaveAttribute('data-loaded','true');await shot(b,'v2-home','Initial home');
 await b.getByRole('button',{name:'Step inside'}).click();await b.getByRole('button',{name:/A quiet corner/}).click();await shot(b,'v2-story','Quiet corner selected');await b.getByRole('button',{name:/Continue/}).click();
 await b.getByRole('button',{name:/Espresso/}).click();await b.getByRole('button',{name:/Continue/}).click();await b.getByRole('button',{name:/Save them a seat/}).click();await b.getByRole('button',{name:/Continue/}).click();await b.getByRole('button',{name:/Stay until golden hour/}).click();await shot(b,'v2-golden-hour','Evening and company selected');await b.getByRole('button',{name:/Find my caf/}).click();await expect(b.locator('.picks button')).toHaveCount(3);await shot(b,'v2-result','Quiet corner, espresso, company, evening; three matches');
 await writeFile(new URL('./captures.json',import.meta.url),JSON.stringify({capturedAtUtc:new Date().toISOString(),viewport:{width:1440,height:1000},environment:'Isolated Chromium / SwiftShader; reduced motion enabled for settled comparable stills. These are not motion-quality checks.',captures},null,2));console.log('Captured seven comparison screenshots; both journeys reached three matches.');
}finally{await browser.close();}
