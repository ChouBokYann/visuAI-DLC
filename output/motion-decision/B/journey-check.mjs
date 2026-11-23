import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true});
try{
for(const width of [1280,390]){
 const page=await browser.newPage({viewport:{width,height:850},isMobile:width===390,hasTouch:width===390});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.ATLAS_URL||'http://localhost:17962');
 const choose=name=>page.locator('.origin-list').getByRole('button',{name,exact:true}).click();
 const camera=()=>page.locator('.map-viewport').evaluate(el=>({s:el.scrollWidth/el.clientWidth,x:(el.scrollLeft+el.clientWidth/2)/el.scrollWidth,y:(el.scrollTop+el.clientHeight/2)/el.scrollHeight}));
 const wait=ms=>page.waitForTimeout(ms);
 await page.getByRole('button',{name:'Explore Guatemala',exact:true}).click();
 await wait(240);
 let c=await camera();assert.ok(c.s>1.01&&c.s<2.47,JSON.stringify(c));assert.ok(c.x<.5);
 // Retarget while both translation and zoom are active.
 const before=await camera();await choose('Ethiopia');const after=await camera();
 assert.ok(Math.abs(after.x-before.x)<.06,JSON.stringify({before,after}));
 await wait(1150);c=await camera();assert.ok(Math.abs(c.x-.604)<.01&&Math.abs(c.y-266.8/520)<.01&&Math.abs(c.s-2.5)<.01,JSON.stringify(c));
 assert.deepEqual(await page.locator('.cafe h3').allTextContents(),['PPP Coffee','Nylon Coffee']);
 assert.match(await page.locator('.route-ticket').innerText(),/PPP Coffee · Nylon Coffee/);
 assert.ok(await page.locator('.origin-photo img').evaluate(el=>el.naturalWidth>0));
 await page.getByRole('link',{name:'View listings'}).click();
 await wait(500);assert.ok(await page.locator('#cafes').evaluate(el=>el.getBoundingClientRect().top<innerHeight));
 await page.getByRole('button',{name:'Add to compare'}).click();
 await page.getByRole('button',{name:/Compare origins/}).click();assert.equal(await page.locator('.comparison h3').innerText(),'Ethiopia');
 await page.getByRole('button',{name:'Return to exploration'}).click();await choose('Guatemala');await wait(1150);
 c=await camera();assert.ok(Math.abs(c.x-.2595)<.01);assert.ok(await page.locator('.origin-photo img').evaluate(el=>el.naturalWidth>0));
 await page.getByRole('button',{name:'Reset map zoom'}).click();await wait(1150);assert.ok(Math.abs((await camera()).s-1)<.01);
 await choose('Guatemala');await wait(1150);assert.ok(Math.abs((await camera()).x-.2595)<.01);
 await page.getByRole('button',{name:'Close origin details'}).click();assert.equal(await page.locator('.route-ticket').count(),0);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const name of ['Guatemala','Colombia','Brazil','Ethiopia','Kenya','Indonesia']){
  await choose(name);c=await camera();assert.ok(Math.abs(c.s-2.5)<.01,JSON.stringify(c));
  assert.equal(await page.locator('.origin-name').innerText(),name);
  assert.ok((await page.locator('.route-ticket strong').innerText()).includes(await page.locator('.cafe h3').first().innerText()));
  assert.equal(await page.locator('.ticket-trace').evaluate(el=>getComputedStyle(el).animationName),'none');
 }
 assert.deepEqual(errors,[]);
 console.log(width+'px passed motion, interruption, camera framing, linked listings, photos, compare, reset, reduced motion and overflow');
 await page.close();
}
}finally{await browser.close();}
