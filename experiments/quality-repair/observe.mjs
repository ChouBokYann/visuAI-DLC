import { chromium } from '../brief-realization/app/node_modules/@playwright/test/index.mjs';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const output = new URL('../../output/quality-repair-review/', import.meta.url);
await fs.mkdir(output, {recursive: true});
const browser = await chromium.launch({executablePath: 'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
const records = [];
try {
  for (const [version, source] of [['before', '../quality-interpretation/A.html'], ['after', '../quality-repair/index.html']]) {
    for (const width of [320, 390, 1280]) {
      const page = await browser.newPage({viewport: {width, height: 844}});
      await page.goto(new URL(source, output).href);
      const state = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        text: document.body.innerText,
        controls: [...document.querySelectorAll('button,a,summary')].map(el => el.innerText)
      }));
      await page.screenshot({path: fileURLToPath(new URL(version + '-' + width + '.png', output)), fullPage: true});
      records.push({version, width, ...state});
      await page.close();
    }
  }
  await fs.writeFile(new URL('observations.json', output), JSON.stringify(records, null, 2));
  console.log(records.map(({version,width,documentWidth,controls})=>({version,width,documentWidth,controls})));
} finally {
  await browser.close();
}
