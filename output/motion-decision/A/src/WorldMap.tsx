import type {Origin} from './data';
import {useLayoutEffect,useRef,useState} from 'react';

export function WorldMap({items,selected,journeyNumber,onSelect}:{items:Origin[];selected:string|null;journeyNumber:number;onSelect:(id:string)=>void}){
 const [zoom,setZoom]=useState(1);
 const viewport=useRef<HTMLDivElement>(null), canvas=useRef<HTMLDivElement>(null);
 const frame=useRef(0);
 const drag=useRef<{x:number;y:number;left:number;top:number}|null>(null);
 const origin=items.find(item=>item.id===selected);
 const [destX,destY]=[777,284];
 function stop(){cancelAnimationFrame(frame.current);}
 function position(){
  const el=viewport.current!, world=canvas.current!;
  return {z:world.offsetWidth/el.clientWidth,x:(el.scrollLeft+el.clientWidth/2)/world.offsetWidth,y:(el.scrollTop+el.clientHeight/2)/world.offsetHeight};
 }
 type Camera=ReturnType<typeof position>;
 function paint(view:Camera){
  const el=viewport.current!,world=canvas.current!;
  world.style.width=`${view.z*100}%`;
  el.scrollLeft=view.x*world.offsetWidth-el.clientWidth/2;
  el.scrollTop=view.y*world.offsetHeight-el.clientHeight/2;
  setZoom(Math.round(view.z*100)/100);
 }
 function travel(stops:{view:Camera;ms:number}[]){
  stop();
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){paint(stops[stops.length-1].view);return;}
  let from=position(),began=performance.now(),i=0;
  function tick(now:number){
   const {view,ms}=stops[i], t=Math.min(1,(now-began)/ms), eased=t*t*(3-2*t);
   paint({z:from.z+(view.z-from.z)*eased,x:from.x+(view.x-from.x)*eased,y:from.y+(view.y-from.y)*eased});
   if(t===1){if(++i===stops.length)return;from=position();began=now;}
   frame.current=requestAnimationFrame(tick);
  }
  frame.current=requestAnimationFrame(tick);
 }
 function changeZoom(next:number){
  travel([{view:{...position(),z:Math.max(1,Math.min(2.5,next))},ms:350}]);
 }
 useLayoutEffect(()=>{
  function journey(){
   if(!origin){travel([{view:{x:.5,y:.5,z:1},ms:520}]);return;}
   const [x,y]=origin.point;
   const left=Math.min(x,origin.label[0],destX),right=Math.max(x,origin.label[0],destX);
   const routeZoom=Math.min(2.15,760/Math.max(1,right-left));
   travel([{view:{x:x/1000,y:y/520,z:2.5},ms:740},
           {view:{x:(left+right)/2000,y:(Math.min(y,destY)-44+Math.max(y,destY))/1040,z:routeZoom},ms:760}]);
  }
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  journey();preference.addEventListener('change',journey);
  return ()=>{stop();preference.removeEventListener('change',journey);};
 },[origin,journeyNumber]);
 const route=origin?`M${origin.point.join(' ')} Q${(origin.point[0]+destX)/2} ${Math.min(origin.point[1],destY)-Math.min(95,18+Math.abs(origin.point[0]-destX)*.22)} ${destX} ${destY}`:'';
 return <div className="world-map" aria-label="Illustrated coffee origin map">
  <div className={`map-viewport ${zoom>1?'is-zoomed':''}`} ref={viewport} tabIndex={0} role="region" aria-label="Scrollable origin map" aria-describedby="map-help"
   onWheel={stop} onKeyDown={e=>{if(e.key.startsWith('Arrow'))stop();}} onPointerDown={e=>{if((e.target as Element).closest('button'))return;stop();if(zoom===1||e.pointerType!=='mouse'||e.button!==0)return;const el=e.currentTarget;drag.current={x:e.clientX,y:e.clientY,left:el.scrollLeft,top:el.scrollTop};el.setPointerCapture(e.pointerId);e.preventDefault();}}
   onPointerMove={e=>{if(!drag.current)return;e.currentTarget.scrollLeft=drag.current.left+drag.current.x-e.clientX;e.currentTarget.scrollTop=drag.current.top+drag.current.y-e.clientY;}}
   onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}} onLostPointerCapture={()=>{drag.current=null;}}>
  <div className="map-canvas" ref={canvas}>
  <svg viewBox="0 0 1000 520" aria-hidden="true" className="map-art">
   <defs><pattern id="sea" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65" fill="#b3bfb4" opacity=".4"/></pattern><pattern id="land" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M1 11l2-2" stroke="#8b9974" opacity=".2" strokeWidth=".8"/></pattern></defs>
   <rect width="1000" height="520" fill="url(#sea)"/>
   <g className="map-grid" fill="none" stroke="#d8dfcf" strokeWidth="1"><path d="M10 180H990M10 305H990M10 420H990"/><path d="M245 50Q180 260 245 490M500 30V500M755 50Q820 260 755 490"/></g>
   <image href="/world-land.svg" width="1000" height="520"/>
   <g className="terrain" stroke="#87966d" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">
    <g data-terrain="rockies" transform="translate(174 131)">
     <path d="M0 35Q12 28 18 8L24 14 30 0 37 19 43 16Q48 30 61 40Q30 46 0 35Z" fill="#c0cda5"/>
     <path d="m30 0-4 24 8 12 27 4Q48 30 43 16l-6 3Z" fill="#a9bb91" stroke="none"/>
     <path d="m18 8-2 18m14-26-4 24 8 12m3-17 7 13M6 38q22 8 48 6" fill="none"/>
    </g>
    <g data-terrain="andes" transform="translate(298 296)">
     <path d="M3 0 11 9 10 20 18 29 16 39 25 53 22 62 30 77 26 93 32 111 25 122 18 104 17 85 9 72 12 58 5 44 7 32 0 17Z" fill="#b8c89f"/>
     <path d="m3 0 3 18 7 13-2 12 10 16-4 14 7 16-2 17 3 16 7-11-6-18 4-16-8-15 3-9-9-14 2-10-8-9 1-11Z" fill="#a6b98e" stroke="none"/>
     <path d="m3 0 3 18 7 13-2 12 10 16-4 14 7 16-2 17m-9-63-6 6m17 40-7 5m6 10 5 7" fill="none"/>
    </g>
    <g data-terrain="ethiopian-highlands" transform="translate(572 251)">
     <path d="M0 20 6 12 12 12 17 5 27 6 30 12 37 14 34 25 24 31 11 28Z" fill="#bdcca4"/>
     <path d="m0 20 11 2 9-3 14 6-10 6-13-3Z" fill="#a6b98e" stroke="none"/>
     <path d="m6 12 9 3 12-9m-16 16 4-7m5 4 5-3 10 3M5 31q16 8 28 1" fill="none"/>
    </g>
    <g data-terrain="himalayas" transform="translate(679 185)">
     <path d="M0 20 9 13 15 15 24 2 30 10 36 6 44 16 50 1 58 12 63 9 75 22 88 27Q57 36 26 28Z" fill="#c0cda5"/>
     <path d="m24 2 3 17 17 7 6-25 1 19 18 10 19-3-13-5-12-13-5 3-8-11-6 15-8-10-6 4Z" fill="#a9bb91" stroke="none"/>
     <path d="m24 2-6 9 6-2 6 1Zm26-1-5 13 5-3 5 5 3-4Z" fill="#e4e8d3" stroke="none"/>
     <path d="m24 2 3 17 17 7m6-25 1 19 18 10M13 29q30 13 62 5" fill="none"/>
    </g>
    <g data-terrain="sumatra-volcanoes" transform="translate(756 288)">
     <path d="M0 12Q7 10 11 1q4-3 8 0 3 12 14 17Q13 22 0 12Z" fill="#bdcca4"/>
     <path d="m19 1q3 12 14 17l-14-4-3-10Z" fill="#a6b98e" stroke="none"/>
     <path d="M11 1q4 4 8 0M3 17q14 8 28 4" fill="none"/>
    </g>
   </g>
   <path d="M30 217H970M30 359H970" stroke="#bba784" strokeDasharray="5 8" fill="none" opacity=".55"/>
   <g fill="#78877b" fontFamily="Georgia,serif" fontSize="13" fontStyle="italic" letterSpacing="2"><text x="80" y="330">Pacific Ocean</text><text x="390" y="255">Atlantic</text><text x="690" y="416">Indian Ocean</text></g>
   <g stroke="#a48a67" strokeWidth="1.3" fill="none">{items.map(o=><path key={o.id} d={`M${o.point[0]} ${o.point[1]} Q${o.label[0]} ${o.point[1]} ${o.label[0]} ${o.label[1]}`}/>)}</g>
   {items.filter(o=>o.id===selected).map(o=><g key={o.id} className="origin-discovery" fill="none" stroke="#994a31">
    <circle className="origin-ripple" cx={o.point[0]} cy={o.point[1]} r="13" strokeWidth="1.4"/>
    <path className="origin-trace" pathLength="1" strokeWidth="2.2" strokeLinecap="round" d={`M${o.point[0]} ${o.point[1]} Q${o.label[0]} ${o.point[1]} ${o.label[0]} ${o.label[1]}`}/>
   </g>)}
   {origin&&<g key={origin.id+journeyNumber}>
    <defs><mask id="route-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="520"><path className="route-reveal" d={route} pathLength="1" fill="none" stroke="white" strokeWidth="7"/></mask></defs>
    <path d={route} mask="url(#route-reveal)" fill="none" stroke="#994a31" strokeWidth="2.25" strokeDasharray="5 4"/>
   </g>}
   <g transform="translate(777 284)"><circle r="5" fill="#344135" stroke="#fffaf0" strokeWidth="2"/><path d="M0 0 12-22h54" stroke="#344135" fill="none"/><text className="singapore-label" textAnchor="middle" x="30" y="-27" fill="#344135" fontSize="13" fontWeight="600">Singapore</text></g>
   <g>{items.map(o=><circle key={o.id} cx={o.point[0]} cy={o.point[1]} r={selected===o.id?6:4} fill="#994a31" stroke="#fff8e8" strokeWidth="2"/>)}</g>
   <g transform="translate(92 430)" stroke="#7c876c" fill="none"><path d="M0-23V23M-23 0H23M-14-14l28 28M14-14l-28 28"/><path d="M0-25 5 0 0 25-5 0Z" fill="#7c876c"/><text x="-5" y="-33" stroke="none" fill="#6a755b" fontSize="12">N</text></g>
  </svg>
  {items.map(o=><button key={o.id} className={`map-label ${selected===o.id?'selected':''}`} style={{left:`${o.label[0]/10}%`,top:`${o.label[1]/5.2}%`}} aria-label={`Explore ${o.name}`} aria-pressed={selected===o.id} onClick={()=>onSelect(o.id)}><span className="full-label">{o.name}<small>{o.notes.slice(0,2).join(' · ')}</small></span><span className="short-label" aria-hidden="true">{({guatemala:'GT',colombia:'CO',brazil:'BR',ethiopia:'ET',kenya:'KE',indonesia:'ID'} as Record<string,string>)[o.id]}</span></button>)}
  </div></div>
  <div className="map-tools" aria-label="Map controls"><button type="button" aria-label="Zoom out" disabled={zoom===1} onClick={()=>changeZoom(zoom-.5)}>−</button><span role="status" aria-label="Map zoom">{Math.round(zoom*100)}%</span><button type="button" aria-label="Zoom in" disabled={zoom===2.5} onClick={()=>changeZoom(zoom+.5)}>+</button><button type="button" aria-label="Reset map zoom" onClick={()=>changeZoom(1)}>World view</button></div>
  <span id="map-help" className="sr-only">Zoom to explore. Drag with a mouse, swipe on touch, or focus the map and use arrow keys to pan.</span>
  <span className="map-caption">Made with Natural Earth. Origin markers are indicative.</span>
 </div>;
}
