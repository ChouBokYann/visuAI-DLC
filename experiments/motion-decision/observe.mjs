import {chromium} from '../brief-realization/app/node_modules/@playwright/test/index.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const out=fileURLToPath(new URL('../../output/motion-decision/review/',import.meta.url));
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'});
const results=[];
try{
 for(const [id,port] of [['A',17961],['B',17962]]) for(const device of ['desktop','phone','reduced']){
  const viewport=device==='phone'?{width:390,height:844}:{width:1100,height:800};
  const context=await browser.newContext({viewport,reducedMotion:device==='reduced'?'reduce':'no-preference',recordVideo:{dir:out,size:viewport}});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',err=>errors.push(err.message));
  const result={id,device,errors,legs:[]};
  try{
   await page.goto('http://127.0.0.1:'+port);
   await page.locator('.map-viewport').scrollIntoViewIfNeeded();
   await page.waitForTimeout(350);
   for(const [origin,interrupt] of [['Guatemala',false],['Ethiopia',true]]){
    const leg=await page.evaluate(async({origin,interrupt})=>{
     const map=document.querySelector('.map-viewport');
     const art=document.querySelector('.map-art')||map.querySelector('svg');
     const state=()=>{const r=art.getBoundingClientRect(),v=map.getBoundingClientRect();return [r.x-v.x,r.y-v.y,r.width].map(Math.round)};
     const pick=name=>document.querySelector('button[aria-label="Explore '+name+'"]').click();
     const frames=[state()];pick(origin);
     let switched=false;
     const start=performance.now();
     while(performance.now()-start<1700){
      await new Promise(requestAnimationFrame);
      if(interrupt&&!switched&&performance.now()-start>=150){pick('Kenya');switched=true;}
      frames.push(state());
     }
     const name=interrupt?'Kenya':origin;
     const marker=art.querySelector('.origin-discovery circle')||document.querySelector('button[aria-label="Explore '+name+'"]');
     const r=marker.getBoundingClientRect(),v=map.getBoundingClientRect();
     const x=r.left+r.width/2,y=r.top+r.height/2;
     return {name,frames,distinct:new Set(frames.map(f=>f.join(','))).size,inMap:x>=v.left&&x<=v.right&&y>=v.top&&y<=v.bottom,selected:new URL(location.href).searchParams.get('origin'),cafes:document.querySelector('#cafes')?.innerText?.slice(0,240)};
    },{origin,interrupt});
    result.legs.push(leg);
   }
   await page.waitForTimeout(350);
  }catch(e){result.harnessError=String(e)}
  const video=page.video();
  await context.close();await video.saveAs(path.join(out,id+'-'+device+'.webm'));await video.delete();
  results.push(result);
 }
}finally{await browser.close();await fs.writeFile(path.join(out,'observations.json'),JSON.stringify(results,null,2));}
console.log(results.map(r=>[r.id,r.device,r.harnessError,r.errors,r.legs.map(l=>[l.distinct,l.selected,l.inMap,l.cafes?.slice(0,85)])]));
