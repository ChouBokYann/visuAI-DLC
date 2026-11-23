import fs from 'node:fs/promises';
import {chromium} from '../brief-realization/app/node_modules/@playwright/test/index.mjs';
const root=new URL('../../output/authority-scope/',import.meta.url);
const out=new URL('blind/',root);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
try {
  for(const id of (await fs.readdir(root)).filter(n=>/^p\d\d$/.test(n))){
    const url=new URL(id+'/index.html',root);
    await fs.copyFile(url,new URL(id+'.html',out));
    await fs.copyFile(new URL(id+'/DELIVERY.md',root),new URL(id+'.md',out));
    const rows=[];
    for(const [width,media] of [[390,'screen'],[600,'screen'],[601,'screen'],[1280,'screen'],[794,'print']]){
      const page=await browser.newPage({viewport:{width,height:1000}});
      await page.route(/^https?:/,r=>r.abort());
      await page.emulateMedia({media});
      await page.goto(url.href);
      const state=await page.evaluate(()=>{
        const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
        const fragments=[];
        while(walker.nextNode()){
          const node=walker.currentNode;
          if(!node.textContent.trim() || !node.parentElement.checkVisibility()) continue;
          const range=document.createRange();range.selectNodeContents(node);
          const rect=range.getBoundingClientRect();
          if(rect.width && rect.height) fragments.push([Math.round(rect.top),Math.round(rect.left),node.textContent.trim()]);
        }
        return {text:document.body.innerText,fragments,width:document.documentElement.scrollWidth};
      });
      rows.push({width,media,...{state}});
      await page.close();
    }
    await fs.writeFile(new URL(id+'.json',out),JSON.stringify(rows,null,2));
  }
} finally {await browser.close();}

