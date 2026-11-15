import {chromium,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const output=new URL('../../output/cafe-trial/',import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1');
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const failures=[];let checks=0;
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.on('pageerror',e=>failures.push(e.message));
 await page.addInitScript(()=>{window.__draws=0;const proto=WebGL2RenderingContext.prototype;const draw=proto.drawElements;proto.drawElements=function(...args){window.__draws++;return draw.apply(this,args);};});
 await page.goto('http://127.0.0.1:5174');
 await expect(page.getByRole('heading',{name:/A little detour/})).toBeVisible();
 await expect.poll(()=>page.evaluate(()=>window.__draws)).toBeGreaterThan(20);
 await page.getByRole('button',{name:'Pause motion'}).click();
 await expect(page.getByRole('button',{name:'Resume motion'})).toHaveAttribute('aria-pressed','true');
 await page.screenshot({path:output+'/home-desktop.png',fullPage:true});checks++;
 await page.getByRole('button',{name:/Find my coffee personality/}).click();
 await expect(page.getByRole('button',{name:'Turn the page'})).toBeDisabled();
 await page.getByRole('link',{name:'Skip to content'}).focus();await page.keyboard.press('Enter');
 await expect(page.locator('main')).toBeFocused();expect(new URL(page.url()).hash).toBe('#story');
 // Keyboard selection must reach the same accessible radio controls as pointer use.
 await page.getByRole('radio').first().focus();await page.keyboard.press('Space');
 await page.getByRole('button',{name:'Turn the page'}).click();
 await page.getByRole('button',{name:'Previous chapter'}).click();
 await expect(page.getByRole('radio').first()).toBeChecked();
 await page.getByRole('button',{name:'Turn the page'}).click();
 for(let step=1;step<5;step++){
  await page.getByRole('radio').first().check();
  if(step===3)await page.screenshot({path:output+'/story-desktop.png',fullPage:true});
  await page.getByRole('button',{name:step===4?'Meet my coffee personality':'Turn the page'}).click();
 }
 await expect(page.getByRole('heading',{name:'The Curious Wanderer'})).toBeVisible();
 await expect(page.locator('.match-section .cafe-card')).toHaveCount(3);checks++;
 await page.reload();await expect(page.getByRole('heading',{name:'The Curious Wanderer'})).toBeVisible();
 await page.getByRole('button',{name:'Revisit my choices'}).click();
 for(let step=0;step<5;step++){
  await page.getByRole('radio').nth(2).check();
  await page.getByRole('button',{name:step===4?'Meet my coffee personality':'Turn the page'}).click();
 }
 await expect(page.getByRole('heading',{name:'The People Person'})).toBeVisible();
 await page.screenshot({path:output+'/result-desktop.png',fullPage:true});checks++;
 await page.getByRole('link',{name:/Find a café/}).click();
 await expect(page.locator('.cafe-card')).toHaveCount(6);
 await page.getByRole('searchbox',{name:'Search cafes'}).fill('APARTMENT');
 await page.getByRole('combobox',{name:'Neighbourhood'}).selectOption('Selegie');
 await expect(page.locator('.cafe-card')).toHaveCount(1);
 await page.getByRole('button',{name:'Espresso',exact:true}).click();
 await expect(page.getByRole('heading',{name:'No cups on this corner.'})).toBeVisible();
 await page.getByRole('button',{name:'Reset all filters'}).click();
 await expect(page.locator('.cafe-card')).toHaveCount(6);checks++;
 await page.getByRole('button',{name:'Explore Nylon Coffee',exact:true}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await expect(page.getByRole('link',{name:'Open in Maps'})).toHaveAttribute('href',/api=1&query=/);
 await expect(page.getByRole('link',{name:'Official source'})).toHaveAttribute('href','https://nylon.coffee/pages/contact');
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Explore Nylon Coffee',exact:true})).toBeFocused();checks++;
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 mobile.on('pageerror',e=>failures.push(e.message));
 await mobile.goto('http://127.0.0.1:5174');await expect(mobile.locator('canvas')).toBeVisible();
 await mobile.screenshot({path:output+'/home-mobile.png',fullPage:true});
 for(const hash of ['story','explore']){
  await mobile.goto('http://127.0.0.1:5174/#'+hash);await expect(mobile.locator('h1')).toBeVisible();
  expect(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await mobile.screenshot({path:output+'/'+hash+'-mobile.png',fullPage:true});
 }
 await mobile.goto('http://127.0.0.1:5174/#story');
 for(let step=0;step<5;step++){await mobile.getByRole('radio').nth(3).check();await mobile.getByRole('button',{name:step===4?'Meet my coffee personality':'Turn the page'}).click();}
 await expect(mobile.getByRole('heading',{name:'The Quiet Observer'})).toBeVisible();
 await mobile.getByRole('button',{name:'Start a different story'}).click();
 await expect(mobile.getByRole('button',{name:'Turn the page'})).toBeDisabled();checks++;
 const fallback=await browser.newPage();
 await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return String(type).includes('webgl')?null:original.call(this,type,...args);};});
 await fallback.goto('http://127.0.0.1:5174');await expect(fallback.getByText('The 3D scene is unavailable.',{exact:false})).toBeVisible();
 await fallback.getByRole('link',{name:/Find a café/}).click();await expect(fallback.locator('.cafe-card')).toHaveCount(6);checks++;
 expect(failures).toEqual([]);
 console.log(`PASS: ${checks} browser scenario groups; real WebGL draw calls, complete journeys, edits, persistence, filters, dialogs, mobile, reduced-motion preference and no-WebGL fallback. Screenshots: ${output}`);
}finally{await browser.close();}
