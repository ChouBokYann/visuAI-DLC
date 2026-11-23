import {chromium,expect} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const out=new URL('../../output/coffee-atlas/motion/',import.meta.url);
await mkdir(out,{recursive:true});
const base=process.env.ATLAS_BASE_URL??'http://127.0.0.1:17821';
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH});
const context=await browser.newContext({viewport:{width:1440,height:1050},recordVideo:{dir:fileURLToPath(out),size:{width:1440,height:1050}}});
const page=await context.newPage();
const results=[];
try{
 await page.goto(base);
 await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).click();
 const samples=[];
 for(const time of [0,150,520]){
  const state=await page.evaluate(time=>{
   const elements=[...document.querySelectorAll('.origin-discovery,.origin-panel')];
   for(const el of elements)for(const animation of el.getAnimations({subtree:true})){animation.pause();animation.currentTime=time;}
   return {dash:parseFloat(getComputedStyle(document.querySelector('.origin-trace')).strokeDashoffset),panel:getComputedStyle(document.querySelector('.origin-panel')).transform};
  },time);
  samples.push({time,...state});
  await page.screenshot({path:fileURLToPath(new URL(`selection-${time}ms.png`,out))});
 }
 expect(samples[0].dash).toBeCloseTo(1);
 expect(samples[1].dash).toBeGreaterThan(0);
 expect(samples[1].dash).toBeLessThan(samples[0].dash);
 expect(samples[2].dash).toBeCloseTo(0);
 expect(samples[0].panel).not.toEqual(samples[2].panel);
 results.push({check:'Representative animation timeline progresses to its final state',samples});

 // Dispatch consecutive user activations without Playwright waiting for visual stability.
 await page.evaluate(()=>{
  for(const name of ['Brazil','Kenya','Colombia'])document.querySelector(`button[aria-label="Explore ${name}"]`).click();
 });
 await expect(page.getByRole('heading',{name:'Colombia',exact:true})).toBeVisible();
 await expect(page.locator('.origin-discovery')).toHaveCount(1);
 await expect(page.locator('.origin-panel')).toHaveCount(1);
 await expect(page.getByRole('button',{name:'Explore Colombia',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));
 expect(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
 results.push({check:'Rapid reselection retains only latest origin and animations settle'});

 await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).focus();
 await page.keyboard.press('Enter');
 await expect(page.getByRole('heading',{name:'Ethiopia',exact:true})).toBeVisible();
 await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));
 results.push({check:'Keyboard activation starts the same sequence and settles'});

 await page.setViewportSize({width:390,height:900});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.getByRole('button',{name:'Explore Brazil',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Brazil',exact:true})).toBeFocused();
 expect(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
 expect(await page.locator('.origin-trace').evaluate(el=>parseFloat(getComputedStyle(el).strokeDashoffset))).toBe(0);
 await expect(page.getByRole('button',{name:'Explore Brazil',exact:true})).toHaveAttribute('aria-pressed','true');
 results.push({check:'Mobile reduced motion preserves final connector, selection and focused details without animation'});
 await writeFile(new URL('results.json',out),JSON.stringify({verdict:'pass',results},null,2));
 console.log(`MOTION VERIFIED: ${results.length} groups; timeline screenshots and session video recorded`);
}finally{await context.close();await browser.close();}
