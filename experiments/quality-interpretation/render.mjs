import {chromium} from '../brief-realization/app/node_modules/@playwright/test/index.mjs';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const out = new URL('../../output/quality-interpretation/',import.meta.url);
const browser = await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',headless:true});
const observations=[];
try {
 for (const [id,title,subtitle,names,claims] of [
  ['A','A softer place to work','Find your afternoon rhythm.',['Lantern','Nook','Yard'],['Bright, quiet, always ready.','Quiet focus, all day long.','Everything you need to work.']],
  ['B','A little closer to nature','Find your weekend rhythm.',['Marsh Loop','Ridge Track','Cedar Path'],['Open today. Easy for everyone.','Open today. Safe and effortless.','Open today. Perfect for everyone.']]
 ]) {
  const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>*{box-sizing:border-box}body{margin:0;background:#faf6ed;color:#343e35;font:17px system-ui}header,main{max-width:1120px;margin:auto;padding:32px}nav{display:flex;justify-content:space-between;font-size:14px}h1{font:56px Georgia;margin:64px 0 12px}p{line-height:1.6;color:#647060}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;min-width:850px;margin-top:42px}article{background:#fffdf7;border:1px solid #e4dfd1;border-radius:16px;overflow:hidden}.image{height:170px;background:linear-gradient(140deg,#bac8ac,#e8d9b6)}.body{padding:22px}h2{font:27px Georgia}button{background:#3f5945;color:white;border:0;border-radius:24px;padding:12px 20px;font-size:15px}.tag{font-size:12px;text-transform:uppercase;letter-spacing:2px}.foot{margin:40px 0;font-size:13px}</style><header><nav><b>${id==='A'?'FIELDROOM':'SLOWPATH'}</b><span>Explore &nbsp; About</span></nav><h1>${title}</h1><p>${subtitle}</p></header><main><div class="tag">Our favourites</div><section class="cards">${names.map((n,i)=>`<article><div class="image" role="img" aria-label="Decorative landscape"></div><div class="body"><h2>${n}</h2><p>${claims[i]}</p><button>Explore ${n}</button></div></article>`).join('')}</section><p class="foot">Synthetic prototype. Illustrative listings only.</p></main></html>`;
  const path=new URL(`${id}.html`,out);fs.writeFileSync(path,html,'utf8');
  for(const [device,width,height] of [['desktop',1280,900],['phone',390,844]]) {
   const page=await browser.newPage({viewport:{width,height}});
   await page.goto(path.href);
   await page.screenshot({path:fileURLToPath(new URL(`${id}-${device}.png`,out)),fullPage:true});
   const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,cards:document.querySelectorAll('article').length}));
   assert.equal(state.cards,3);assert.equal(state.scrollWidth>state.width,device==='phone');
   observations.push({id,device,...state});await page.close();
  }
 }
 fs.writeFileSync(new URL('render-observations.json',out),JSON.stringify(observations,null,2));
} finally {await browser.close();}
console.log(JSON.stringify(observations));
