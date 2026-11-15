import {useEffect,useRef,useState} from 'react';
import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export default function CoffeeScene({chapter=0,compact=false}:{chapter?:number;compact?:boolean}) {
 const host=useRef<HTMLDivElement>(null), stage=useRef(chapter), [failed,setFailed]=useState(false), [paused,setPaused]=useState(false);
 const stop=useRef(paused); stage.current=chapter; stop.current=paused;
 useEffect(()=>{
  const el=host.current!; let renderer:T.WebGLRenderer;
  try {renderer=new T.WebGLRenderer({antialias:true,alpha:true});} catch {setFailed(true);return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7)); renderer.shadowMap.enabled=true; renderer.shadowMap.type=T.PCFSoftShadowMap;
  renderer.outputColorSpace=T.SRGBColorSpace; renderer.toneMapping=T.ACESFilmicToneMapping; renderer.toneMappingExposure=1.45;
  renderer.domElement.setAttribute('aria-label','Interactive miniature cafe. Drag to look around; all discovery features are available outside this illustration.');
  renderer.domElement.setAttribute('role','img'); el.appendChild(renderer.domElement);
  const scene=new T.Scene(), camera=new T.PerspectiveCamera(34,1,.1,100); camera.position.set(9,7.3,11);
  const controls=new OrbitControls(camera,renderer.domElement); controls.target.set(0,1,0); controls.enablePan=false;controls.enableZoom=false;controls.enableDamping=true; controls.minPolarAngle=.65;controls.maxPolarAngle=1.35; controls.minAzimuthAngle=-.65;controls.maxAzimuthAngle=1.25;
  const light=new T.DirectionalLight('#fff0d5',4);light.position.set(-4,9,6);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-8;light.shadow.camera.right=8;light.shadow.camera.top=8;light.shadow.camera.bottom=-8;light.shadow.normalBias=.04; scene.add(light,new T.AmbientLight('#e8e1d2',2.5));
  const world=new T.Group();scene.add(world);
  const mat=(color:string)=>new T.MeshStandardMaterial({color,roughness:.7});
  const cream=mat('#f1e4c7'), green=mat('#7d977c'), dark=mat('#35473d'), terra=mat('#c86b43'), wood=mat('#88523b'), white=mat('#fff8eb'), gold=mat('#c49c56');
  function mesh(g:T.BufferGeometry,m:T.Material,x=0,y=0,z=0,parent:T.Object3D=world){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
  const box=(w:number,h:number,d:number,m:T.Material,x:number,y:number,z:number)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z);
  const cyl=(rt:number,rb:number,h:number,m:T.Material,x:number,y:number,z:number)=>mesh(new T.CylinderGeometry(rt,rb,h,48),m,x,y,z);
  cyl(4,4,.3,cream,0,-.25,0);cyl(3.93,3.93,.08,mat('#ddc8a7'),0,-.07,0);
  // A miniature shophouse and foreground coffee table share the same physical scene.
  box(3.35,2.9,1.6,green,-.5,1.4,-1.5);box(3.55,.16,1.8,cream,-.5,2.91,-1.5);
  box(3.45,.13,1.7,cream,-.5,1.85,-1.5);
  for(const x of [-1.45,.42]){box(.75,.85,.08,dark,x,2.3,-.66);box(.04,.85,.1,cream,x,2.3,-.6);box(.75,.04,.1,cream,x,2.3,-.6);}
  box(.9,1.65,.1,dark,-1.3,.8,-.64);box(.06,1.65,.13,cream,-1.3,.8,-.55);
  box(1.65,1.15,.1,dark,.25,.99,-.64);box(1.8,.12,.4,wood,.25,.4,-.4);
  for(let i=0;i<8;i++){const awning=box(.42,.12,1.2,i%2?cream:terra,-1.98+i*.42,1.7,-.2);awning.rotation.x=.16;box(.42,.22,.08,i%2?cream:terra,-1.98+i*.42,1.5,.38);}
  const label=document.createElement('canvas');label.width=512;label.height=160;const ctx=label.getContext('2d')!;ctx.fillStyle='#f1e4c7';ctx.fillRect(0,0,512,160);ctx.fillStyle='#35473d';ctx.font='bold 58px Georgia';ctx.textAlign='center';ctx.fillText('SIDEQUEST',256,101);const texture=new T.CanvasTexture(label);
  mesh(new T.BoxGeometry(2.2,.6,.08),new T.MeshStandardMaterial({map:texture}),-.5,3.35,-.65);
  box(.1,.48,.1,gold,-1.3,3.1,-.8);box(.1,.48,.1,gold,.3,3.1,-.8);
  cyl(1.2,1.2,.14,wood,.3,.8,1.7);cyl(.12,.16,.85,dark,.3,.33,1.7);cyl(.55,.55,.08,dark,.3,-.03,1.7);
  const cup=new T.Group();cup.position.set(.3,.9,1.7);world.add(cup);
  mesh(new T.CylinderGeometry(.68,.68,.07,64),white,0,0,0,cup);
  const points=[new T.Vector2(.28,.04),new T.Vector2(.36,.08),new T.Vector2(.48,.6),new T.Vector2(.49,.65),new T.Vector2(.43,.65),new T.Vector2(.42,.59),new T.Vector2(.32,.14)];
  mesh(new T.LatheGeometry(points,64),white,0,.03,0,cup);
  mesh(new T.CylinderGeometry(.428,.428,.015,64),mat('#63402a'),0,.63,0,cup);
  const handle=mesh(new T.TorusGeometry(.24,.065,16,40),white,.51,.4,0,cup);handle.rotation.y=.15;
  const foam=mesh(new T.TorusGeometry(.20,.025,12,50),mat('#d4ae7b'),0,.645,0,cup);foam.rotation.x=Math.PI/2;
  const steam:T.Mesh[]=[];for(let i=0;i<3;i++){const curve=new T.CatmullRomCurve3([new T.Vector3(0,0,0),new T.Vector3(.08,.25,0),new T.Vector3(-.05,.5,0),new T.Vector3(.04,.8,0)]);const s=mesh(new T.TubeGeometry(curve,20,.018,8,false),new T.MeshBasicMaterial({color:'#fff9eb',transparent:true,opacity:.55}),-.2+i*.2,.8,0,cup);steam.push(s);}
  function chair(x:number,z:number,r:number){const group=new T.Group();world.add(group);group.position.set(x,0,z);group.rotation.y=r;mesh(new T.CylinderGeometry(.37,.37,.12,32),terra,0,.5,0,group);for(const x of [-.23,.23])for(const z of [-.23,.23])mesh(new T.CylinderGeometry(.035,.035,.5,8),dark,x,.22,z,group);mesh(new T.BoxGeometry(.68,.46,.08),terra,0,.87,-.28,group);}
  chair(-1.2,1.8,-1.2);chair(1.7,1.4,1.3);
  function tree(x:number,z:number,scale:number){cyl(.32,.25,.42,terra,x,.16,z);cyl(.05,.08,1.5,wood,x,.9,z);for(const [dx,dy,dz,r] of [[0,1.9,0,.65],[-.3,1.7,.1,.45],[.3,1.8,.1,.4]]){mesh(new T.IcosahedronGeometry(r*scale,2),green,x+dx,dy*scale,z+dz);}}
  tree(2.2,-1.1,1.15);tree(-2.6,-.6,.85);
  cyl(.05,.07,2.4,dark,2.75,1.1,.5);mesh(new T.SphereGeometry(.24,24,16),mat('#f5d69a'),2.75,2.4,.5);cyl(.35,.35,.07,dark,2.75,2.65,.5);
  const sign=box(.65,.8,.08,dark,-2.4,.42,1.4);sign.rotation.x=-.15;
  box(.5,.04,.1,cream,-2.4,.53,1.47);box(.35,.04,.1,cream,-2.4,.39,1.49);
  const rainGeo=new T.BufferGeometry();const rainPos=new Float32Array(70*3);for(let i=0;i<70;i++){rainPos[i*3]=(Math.sin(i*32.13)*.5+.5)*8-4;rainPos[i*3+1]=(i/70)*6;rainPos[i*3+2]=(Math.cos(i*19.3)*.5+.5)*6-3;}rainGeo.setAttribute('position',new T.BufferAttribute(rainPos,3));const rain=new T.Points(rainGeo,new T.PointsMaterial({color:'#8c9fa9',size:.035,transparent:true,opacity:.7}));scene.add(rain);
  let frame=0, visible=true;const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};const ro=new ResizeObserver(resize);ro.observe(el);resize();
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});io.observe(el);
  function render(t:number){frame=requestAnimationFrame(render);if(!visible||document.hidden)return;const animate=!motion.matches&&!stop.current;controls.enableDamping=animate;controls.update();world.rotation.y=animate?Math.sin(t*.00016)*.045:0;steam.forEach((s,i)=>{s.position.y=.8+(animate?Math.sin(t*.0015+i)*.07:0);});rain.visible=stage.current===4; if(rain.visible&&animate){const a=rainGeo.attributes.position.array as Float32Array;for(let i=1;i<a.length;i+=3){a[i]-=.025;if(a[i]<0)a[i]=6;}rainGeo.attributes.position.needsUpdate=true;}renderer.render(scene,camera);}
  frame=requestAnimationFrame(render);
  const loss=(event:Event)=>{event.preventDefault();setFailed(true);};renderer.domElement.addEventListener('webglcontextlost',loss);
  return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();controls.dispose();scene.traverse(o=>{if(o instanceof T.Mesh||o instanceof T.Points){o.geometry.dispose();const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>m.dispose());}});texture.dispose();renderer.dispose();renderer.domElement.removeEventListener('webglcontextlost',loss);renderer.domElement.remove();};
 },[]);
 return <div className={`scene-shell ${compact?'compact':''}`} data-chapter={chapter}>
  <div className="scene-orbit" aria-hidden="true"/><div ref={host} className="scene-canvas" style={failed?{visibility:'hidden'}:undefined}/>
  {failed&&<div className="scene-fallback"><span aria-hidden="true">☕</span><strong>A small escape, in every cup.</strong><p>The 3D scene is unavailable. Your story and café search still work.</p></div>}
  <div className="scene-caption"><span>{chapter===4?'A passing Singapore shower':'Your next chapter, somewhere in Singapore'}</span>{!failed&&<button className="text-button" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?'Resume motion':'Pause motion'}</button>}</div>
  {!failed&&<span className="drag-note">Drag to explore the little café</span>}
 </div>;
}
