import {chromium,expect} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const out=new URL('../../output/coffee-atlas/',import.meta.url);await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH});
const base=process.env.ATLAS_BASE_URL??'http://127.0.0.1:17820';
const results=[],errors=[],remote=[];const record=(id,detail)=>results.push({id,detail});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1050}});
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))remote.push(r.url());});
 await page.goto(base+'/');
 const land=await page.request.get(base+'/world-land.svg');
 expect(land.ok(),'Bundled map asset loads').toBe(true);
 expect(land.headers()['content-type']).toContain('image/svg+xml');
 await page.evaluate(async()=>{const image=new Image();image.src='/world-land.svg';await image.decode();if(!image.naturalWidth)throw new Error('Map asset cannot render');});
 record('R3-map-asset','Bundled SVG returns image/svg+xml and decodes in Chromium; geographic and stylistic quality assessed separately from screenshots.');
 await expect(page.getByRole('heading',{name:/Where shall we brew/})).toBeVisible();
 const oracle={Guatemala:['Nylon Coffee'],Colombia:['Tiong Hoe Specialty Coffee'],Brazil:['Tiong Hoe Specialty Coffee'],Ethiopia:['PPP Coffee','Nylon Coffee'],Kenya:['Tiong Hoe Specialty Coffee'],Indonesia:['Tiong Hoe Specialty Coffee','PPP Coffee']};
 for(const [name,matches] of Object.entries(oracle)){
  await page.getByRole('button',{name:`Explore ${name}`,exact:true}).click();
  await expect(page.getByRole('heading',{name,exact:true})).toBeVisible();
  await expect(page.locator('.cafe')).toHaveCount(0);
  await expect(page.locator('.origin-more')).not.toHaveAttribute('open','');
  await page.getByRole('button',{name:/Find it in Singapore/}).click();
  await expect(page.locator('.cafe h3')).toHaveText(matches);
  await expect(page.locator('.notes span')).toHaveCount(3);
  await expect(page.locator('.availability')).toContainText('Online listings do not confirm');
  for(const a of await page.locator('.cafe-actions a').all())expect(await a.getAttribute('href')).toMatch(/^https:\/\/(pppcoffee.com|nylon.coffee|tionghoe.com)\//);
 }
 await expect(page.locator('.sold-out')).toContainText('sold out');record('E12-01/02/03','All six map controls select exact origin, notes and independent cafe mapping; sourced actions and sold-out state present.');
 await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).click();await page.getByRole('button',{name:'Explore Brazil',exact:true}).click();await page.goBack();await expect(page.getByRole('heading',{name:'Ethiopia',exact:true})).toBeVisible();await page.reload();await expect(page.getByRole('heading',{name:'Ethiopia',exact:true})).toBeVisible();record('E12-05','Browser back and reload restore Ethiopia after selecting Brazil.');
 await page.getByRole('button',{name:'Earthy',exact:true}).click();await expect(page.locator('.origin-list button')).toHaveText(['Indonesia']);await expect(page.getByRole('heading',{name:'Ethiopia',exact:true})).toHaveCount(0);await expect(page.locator('.cafe')).toHaveCount(0);
 await page.getByRole('searchbox',{name:'Search origins'}).fill('Brazil');await expect(page.getByRole('heading',{name:'No origins match this combination.'})).toBeVisible();await page.getByRole('button',{name:'Reset filters'}).click();await expect(page.locator('.origin-list button')).toHaveCount(6);
 await page.getByRole('searchbox').fill('  BRAZIL ');await expect(page.locator('.origin-list button')).toHaveText(['Brazil']);await page.getByRole('searchbox').fill('');
 await page.getByRole('button',{name:'Explore Guatemala',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.getByRole('heading',{name:'Guatemala',exact:true})).toBeVisible();record('E12-04/06','Filter exclusion clears stale detail/cafes; conflicting search has reset; trimmed search and keyboard selection work.');
 await page.goto(base+'/?origin=unicorn');await expect(page.locator('.notice[role="status"]')).toContainText('not in this guide');await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).click();await expect(page.locator('.notice[role="status"]')).toHaveCount(0);record('E12-05-invalid','Unknown URL gives recoverable message; valid selection clears it.');
 for(const width of [1440,1024,768,390,320]){
  await page.setViewportSize({width,height:900});await page.goto(base+'/?origin=ethiopia');
  await expect(page.getByRole('heading',{name:'Ethiopia',exact:true})).toBeVisible();
  const geometry=await page.evaluate(()=>{
   const boxes=[...document.querySelectorAll('.map-label')].map(el=>({name:el.getAttribute('aria-label'),r:el.getBoundingClientRect().toJSON()}));
   const overlaps=[];for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i].r,b=boxes[j].r;if(a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top)overlaps.push([boxes[i].name,boxes[j].name]);}
   return {overflow:document.documentElement.scrollWidth>innerWidth,overlaps,targets:boxes.map(b=>[b.name,b.r.width,b.r.height])};
  });
  expect(geometry.overflow,`${width}px horizontal overflow`).toBe(false);expect(geometry.overlaps,`${width}px map target overlap`).toEqual([]);for(const [,w,h] of geometry.targets){expect(w).toBeGreaterThanOrEqual(24);expect(h).toBeGreaterThanOrEqual(24);}
  await page.getByRole('button',{name:'Explore Kenya',exact:true}).click();await expect(page.getByRole('heading',{name:'Kenya',exact:true})).toBeVisible();await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).click();await expect(page.getByRole('heading',{name:'Ethiopia',exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:'Explore Ethiopia',exact:true})).toHaveCSS('background-color','rgb(163, 69, 45)');
  await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));if(width===1440||width===390)await page.screenshot({path:fileURLToPath(new URL(width===1440?'desktop.png':'mobile.png',out)),fullPage:true});
  record('E12-06-'+width,geometry);
 }
 await page.emulateMedia({reducedMotion:'reduce'});expect(await page.locator('html').evaluate(el=>getComputedStyle(el).scrollBehavior)).toBe('auto');await page.getByRole('button',{name:'Explore Brazil',exact:true}).click();await expect(page.getByRole('heading',{name:'Brazil',exact:true})).toBeFocused();record('E12-06-motion','Reduced-motion scroll is instant; mobile selection focuses the details heading.');
 await page.getByRole('button',{name:/Find it in Singapore/}).click();await expect(page.getByRole('heading',{name:'Brazil, in Singapore.'})).toBeVisible();
 await page.getByText('How we choose and check listings',{exact:true}).click();await expect(page.locator('footer details')).toHaveAttribute('open','');record('E12-03-disclosure','Cafe button reveals matches only on demand; methodology disclosure expands.');
 await page.getByRole('button',{name:'Close origin details'}).focus();await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'Explore Brazil',exact:true})).toBeFocused();await expect(page.locator('.cafe')).toHaveCount(0);record('E12-06-close','Closing details restores keyboard focus to the selected map callout and clears cafe results.');
 await page.setViewportSize({width:1280,height:720});await page.goto(base+'/');const homeWords=(await page.locator('body').innerText()).split(/\s+/).length;expect(homeWords).toBeLessThan(140);await page.getByRole('button',{name:'Explore Ethiopia',exact:true}).click();const selectedWords=(await page.locator('body').innerText()).split(/\s+/).length;expect(selectedWords).toBeLessThan(200);await expect(page.locator('.cafe')).toHaveCount(0);await page.locator('.origin-more summary').click();await expect(page.locator('.origin-more')).toHaveAttribute('open','');record('R2-progressive-disclosure',{homeWords,selectedWords,storyAccessible:true});
 expect(errors).toEqual([]);expect(remote).toEqual([]);
 await writeFile(new URL('browser-results.json',out),JSON.stringify({base,browser:browser.version(),results,errors,runtimeExternalRequests:remote,verdict:'pass'},null,2));
 console.log(`BROWSER VERIFIED: ${results.length} groups; six origins; five widths; no external runtime requests`);
}catch(e){await writeFile(new URL('browser-failure.txt',out),String(e.stack??e));throw e;}finally{await browser.close();}
