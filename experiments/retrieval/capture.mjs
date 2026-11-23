import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {chromium} from '../brief-realization/app/node_modules/@playwright/test/index.mjs';
const input=new URL('../../output/retrieval/',import.meta.url);
const out=new URL('blind/',input);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
try {
  for(const id of (await fs.readdir(input)).filter(n=>/^p\d\d$/.test(n)).sort()){
    const url=new URL(id+'/index.html',input);
    await fs.copyFile(url,new URL(id+'.html',out));
    const row={};
    for(const width of [320,390,1280]){
      const page=await browser.newPage({viewport:{width,height:844}});
      await page.route(/^https?:/,r=>r.abort());
      await page.goto(url.href);
      row[width]=await page.evaluate(()=>({width:document.documentElement.scrollWidth,text:document.body.innerText,controls:[...document.querySelectorAll('button,a[href],summary')].map(el=>[el.innerText,el.getAttribute('href')])}));
      if(width===390) await page.screenshot({path:fileURLToPath(new URL(id+'.png',out)),fullPage:true});
      await page.close();
    }
    await fs.writeFile(new URL(id+'.json',out),JSON.stringify(row,null,2));
  }
} finally {await browser.close();}

