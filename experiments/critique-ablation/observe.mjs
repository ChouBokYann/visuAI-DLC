import { chromium } from '../brief-realization/app/node_modules/@playwright/test/index.mjs';
import fs from 'node:fs/promises';
const root = new URL('../../output/critique-ablation/', import.meta.url);
const browser = await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
const rows = [];
try {
  for (const id of ['baseline',1,2,3,4]) {
    for (const width of [320,390,1280]) {
      const page = await browser.newPage({viewport:{width,height:844}});
      await page.goto(new URL(id === 'baseline' ? '../quality-interpretation/A.html' : id + '/index.html', root).href);
      const result = await page.evaluate(() => ({
        text: document.body.innerText,
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        controls:[...document.querySelectorAll('button,a,summary')].map(e=>[e.textContent.trim(), e.getAttribute('href')])
      }));
      rows.push({id, viewport:width, ...result, words:result.text.trim().split(/\s+/).length});
      await page.close();
    }
  }
  await fs.writeFile(new URL('observations.json',root),JSON.stringify(rows,null,2));
  for (const row of rows.filter(r=>r.viewport===390)) console.log(row.id,row.width,row.height,row.words,row.text,JSON.stringify(row.controls));
} finally {await browser.close();}
