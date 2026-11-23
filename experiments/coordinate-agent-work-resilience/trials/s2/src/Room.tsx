import {useEffect,useRef,useState} from 'react';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
export default function Room({step,answers,paused}:{step:number;answers:number[];paused:boolean}){
 const mount=useRef<HTMLDivElement>(null),state=useRef({step,answers,paused});state.current={step,answers,paused};
 const [status,setStatus]=useState('Opening the café…');
 useEffect(()=>{
  const el=mount.current!;let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({alpha:true,antialias:true});}catch{setStatus('3D unavailable. Your choices still work below.');return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;renderer.outputColorSpace=T.SRGBColorSpace;el.appendChild(renderer.domElement);renderer.domElement.setAttribute('role','img');renderer.domElement.setAttribute('aria-label','A furnished café that changes with your choices.');
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(36,1,.1,90);camera.position.set(10,9,12);const look=new T.Vector3(0,1,0);
  const ambient=new T.HemisphereLight('#fff3d7','#597776',2.4);scene.add(ambient);
  const sun=new T.DirectionalLight('#ffe0b0',3.4);sun.position.set(-3,9,5);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-8;sun.shadow.camera.right=8;sun.shadow.camera.top=8;sun.shadow.camera.bottom=-8;sun.shadow.normalBias=.025;scene.add(sun);
  const world=new T.Group();scene.add(world);const mat=(color:string)=>new T.MeshStandardMaterial({color,roughness:.82});const clay=mat('#bb684b'),cream=mat('#eedfc7'),green=mat('#38685b'),wood=mat('#7c4d37'),yellow=mat('#ddab58');
  function mesh(geo:T.BufferGeometry,material:T.Material,x:number,y:number,z:number,parent:T.Object3D=world){const m=new T.Mesh(geo,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
  const box=(w:number,h:number,d:number,m:T.Material,x:number,y:number,z:number,parent:T.Object3D=world)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z,parent);
  box(8.4,.32,6.6,cream,0,-.25,0);box(8.1,.12,6.3,wood,0,-.05,0);
  for(let x=0;x<12;x++)for(let z=0;z<9;z++)box(.66,.025,.68,(x+z)%2?mat('#dfd5bd'):mat('#c2c5ac'),-3.66+x*.665,.025,-2.72+z*.69);
  box(8,.12,.12,green,0,3.65,-3.02);box(8,3.6,.15,cream,0,1.83,-3.12);box(.16,3.6,6.2,cream,-4.04,1.83,0);
  for(let i=0;i<16;i++)box(.075,1.1,.08,green,-3.8+i*.5,.59,-2.99);box(8,.12,.12,green,0,1.17,-2.98);
  const sky=new T.MeshStandardMaterial({color:'#9bbdb8',roughness:.4,emissive:'#7eaaa4',emissiveIntensity:.25});
  function window(x:number){box(1.6,2,.08,green,x,2.37,-2.98);box(1.42,1.8,.1,sky,x,2.37,-2.91);box(.06,1.8,.13,cream,x,2.37,-2.83);box(1.42,.06,.13,cream,x,2.4,-2.83);box(1.8,.12,.4,wood,x,1.39,-2.8);}
  window(.9);window(2.85);
  // Layered wall art and signage anchor the room as a coffee space.
  const signCanvas=document.createElement('canvas');signCanvas.width=768;signCanvas.height=320;const ctx=signCanvas.getContext('2d')!;ctx.fillStyle='#38685b';ctx.fillRect(0,0,768,320);ctx.fillStyle='#f7e9ce';ctx.textAlign='center';ctx.font='bold 96px Georgia';ctx.fillText('sidequest',384,147);ctx.font='24px sans-serif';ctx.fillText('COFFEE  /  SINGAPORE',384,220);const signTex=new T.CanvasTexture(signCanvas);mesh(new T.BoxGeometry(2.7,1.12,.07),new T.MeshStandardMaterial({map:signTex}),-2.15,2.75,-2.95);
  const solo=new T.Group(),social=new T.Group(),bar=new T.Group();world.add(solo,social,bar);solo.position.set(-2.4,0,1);social.position.set(1.4,0,1.2);bar.position.set(-1.85,0,-1.95);
  const loader=new GLTFLoader();let disposed=false;const assets:T.Object3D[]=[];const promises:Promise<void>[]=[];
  function model(name:string,height:number,x:number,y:number,z:number,rotation=0,parent:T.Object3D=world){const holder=new T.Group();holder.position.set(x,y,z);holder.rotation.y=rotation;parent.add(holder);promises.push(loader.loadAsync('/models/'+name+'.glb').then(g=>{if(disposed){g.scene.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});return;}const bounds=new T.Box3().setFromObject(g.scene),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());g.scene.position.set(-center.x,-bounds.min.y,-center.z);const normalized=new T.Group();normalized.add(g.scene);normalized.scale.setScalar(height/size.y);holder.add(normalized);g.scene.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=true;o.receiveShadow=true;}});assets.push(g.scene);}));return holder;}
  model('loungechair',1.1,0,.04,0,.3,solo);model('tablecoffee',.5,.75,.04,.4,0,solo);model('books',.12,.75,.54,.4,.3,solo);model('lamproundfloor',2,-.6,.04,-.6,0,solo);
  model('tableround',.95,0,.04,0,0,social);const chairA=model('chairrounded',1.05,0,.04,1.05,Math.PI,social);const chairB=model('chaircushion',1.05,1.1,.04,-.2,-Math.PI/2,social);model('chairrounded',1.05,-1.1,.04,-.2,Math.PI/2,social);
  model('kitchenbar',1.15,0,.04,0,0,bar);model('kitchenbar',1.15,.9,.04,0,0,bar);model('kitchencoffeemachine',.6,-.35,1.2,-.12,Math.PI,bar);model('plantsmall2',.45,.9,1.2,0,0,bar);
  model('bookcaseopen',2.5,-3.65,.04,-1.7,Math.PI/2);for(const y of [.48,.99,1.5,2.02])model('books',.25,-3.56,y,-1.7,Math.PI/2);model('plantsmall1',1.3,3.35,.04,-1.9);model('plantsmall2',.8,-3.4,.04,2.5);
  const rug=mesh(new T.CircleGeometry(1.48,64),new T.MeshStandardMaterial({color:'#bd7855',roughness:1}),1.4,.05,1.2);rug.rotation.x=-Math.PI/2;
  const pendant=new T.Group();world.add(pendant);pendant.position.set(1.4,3.25,1.2);mesh(new T.CylinderGeometry(.015,.015,.75,8),wood,0,.45,0,pendant);mesh(new T.ConeGeometry(.45,.3,48,1,true),green,0,0,0,pendant);mesh(new T.SphereGeometry(.12,20,12),new T.MeshStandardMaterial({color:'#fff1b2',emissive:'#ffb44c',emissiveIntensity:2}),0,-.08,0,pendant);const glow=new T.PointLight('#ffbe6a',0,8,2);glow.position.set(1.4,2.7,1.2);scene.add(glow);
  const drink=new T.Group();drink.position.set(1.4,1.01,1.2);world.add(drink);const ceramic=mat('#f7edd9');mesh(new T.CylinderGeometry(.28,.28,.035,48),ceramic,0,0,0,drink);mesh(new T.LatheGeometry([new T.Vector2(.13,.02),new T.Vector2(.16,.04),new T.Vector2(.2,.3),new T.Vector2(.2,.32),new T.Vector2(.175,.32),new T.Vector2(.14,.06)],48),ceramic,0,.025,0,drink);const coffeeMat=mat('#5f3523');mesh(new T.CylinderGeometry(.175,.175,.01,48),coffeeMat,0,.33,0,drink);mesh(new T.TorusGeometry(.10,.024,12,32),ceramic,.22,.2,0,drink);
  const steam:T.Mesh[]=[];for(let i=0;i<3;i++){const curve=new T.CatmullRomCurve3([new T.Vector3(0,0,0),new T.Vector3(.05,.12,0),new T.Vector3(-.04,.3,0),new T.Vector3(.03,.5,0)]);steam.push(mesh(new T.TubeGeometry(curve,16,.009,8,false),new T.MeshBasicMaterial({color:'#fff7e6',transparent:true,opacity:.45}),-.07+i*.07,.4,0,drink));}
  const pour=new T.Group();world.add(pour);const jug=new T.Group();pour.add(jug);mesh(new T.CylinderGeometry(.13,.16,.3,32),cream,0,0,0,jug);const spout=mesh(new T.CylinderGeometry(.035,.055,.22,16),cream,.16,.08,0,jug);spout.rotation.z=-.7;mesh(new T.TorusGeometry(.1,.02,10,24),cream,-.17,0,0,jug);const stream=mesh(new T.CylinderGeometry(.012,.012,.5,12),coffeeMat,0,0,0,pour);
  const ripple=mesh(new T.TorusGeometry(.32,.012,8,64),yellow,1.4,1.02,1.2);ripple.rotation.x=Math.PI/2;
  const pointer={x:0,y:0};const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width-.5;pointer.y=(e.clientY-r.top)/r.height-.5;};el.addEventListener('pointermove',move);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=0,last=0,previousStep=-99,changedAt=0,previousBrew=-1,brewAt=-10000;const camTarget=new T.Vector3(),lookTarget=new T.Vector3();
  Promise.all(promises).then(()=>{if(!disposed){setStatus('');el.dataset.loaded='true';}}).catch(()=>{if(!disposed)setStatus('Some furnishings could not load. Your choices still work.');});
  const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(w&&h){renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}};const ro=new ResizeObserver(resize);ro.observe(el);resize();
  function render(now:number){frame=requestAnimationFrame(render);if(document.hidden)return;const dt=Math.min((now-last)/1000,.05);last=now;const s=state.current,still=reduced.matches||s.paused,alpha=still?1:1-Math.exp(-dt*3.5),a=s.answers;const mobile=el.clientWidth<650;
   if(s.step!==previousStep){previousStep=s.step;changedAt=now;}
   if(a[1]!==undefined&&a[1]!==previousBrew){previousBrew=a[1];brewAt=now;}
   const view=s.step;
   if(view===1){camTarget.set(a[0]===1?7:a[0]===2?4.8:5.2,5.5,8);lookTarget.set(a[0]===1?1.1:a[0]===2?-1.5:-1.3,1,a[0]===2?-1.6:1);}
   else if(view===2){camTarget.set(4.8,4.7,6.5);lookTarget.set(.5,.9,.4);}
   else if(view===3){camTarget.set(7,5.8,8);lookTarget.set(0,1,0);}
   else {camTarget.set(9.5,8.4,11.8);lookTarget.set(0,1,0);}
   if(mobile)camTarget.multiplyScalar(1.23);if(!still){camTarget.x+=pointer.x*.45;camTarget.y-=pointer.y*.25;}
   camera.position.lerp(camTarget,alpha);look.lerp(lookTarget,alpha);camera.lookAt(look);
   const together=a[2]===1;chairA.position.z=T.MathUtils.lerp(chairA.position.z,together?.85:1.45,alpha);chairB.position.x=T.MathUtils.lerp(chairB.position.x,together?.95:1.55,alpha);
   const quiet=a[0]===0;solo.position.y=T.MathUtils.lerp(solo.position.y,quiet?.10:0,alpha);rug.scale.setScalar(T.MathUtils.lerp(rug.scale.x,quiet?.88:1,alpha));
   const evening=a[3]===1;sun.intensity=T.MathUtils.lerp(sun.intensity,evening?1.2:3.4,alpha);ambient.intensity=T.MathUtils.lerp(ambient.intensity,evening?1.3:2.4,alpha);glow.intensity=T.MathUtils.lerp(glow.intensity,evening?14:1,alpha);sky.color.lerp(new T.Color(evening?'#b68d89':'#9bbdb8'),alpha);sky.emissiveIntensity=evening?.12:.25;
   coffeeMat.color.lerp(new T.Color(a[1]===2?'#bf8a56':a[1]===1?'#3e241c':'#70432b'),alpha);const dest=quiet?new T.Vector3(-1.65,.58,1.4):a[0]===2?new T.Vector3(-.95,1.21,-1.75):new T.Vector3(1.4,1.01,1.2);drink.position.lerp(dest,alpha);drink.rotation.y=still?0:Math.sin(now*.0008)*.06;const cupScale=a[1]===1?.8:a[1]===2?1.12:1;drink.scale.lerp(new T.Vector3(cupScale,cupScale,cupScale),alpha);const pouring=(now-brewAt)/1600;pour.visible=!still&&pouring>=0&&pouring<1;pour.position.copy(drink.position);jug.position.set(-.22,.9,0);jug.rotation.z=-Math.sin(pouring*Math.PI)*.9;stream.position.set(0,.58,0);stream.scale.y=Math.sin(pouring*Math.PI);
   steam.forEach((m,i)=>{m.position.y=.4+(still?0:Math.sin(now*.0018+i)*.05);});pendant.rotation.z=still?0:Math.sin(now*.0008)*.012;
   const progress=Math.min((now-changedAt)/1200,1);ripple.visible=!still&&view>0&&progress<1;ripple.position.copy(drink.position);ripple.position.y+=.04;ripple.scale.setScalar(1+progress*1.2);
   el.dataset.stage=String(view);el.dataset.ambience=evening?'evening':'day';el.dataset.seating=together?'together':'solo';el.dataset.coffee=String(a[1]??-1);el.dataset.camera=camera.position.toArray().map(x=>x.toFixed(3)).join(',');renderer.render(scene,camera);
  }frame=requestAnimationFrame(render);
  const loss=(e:Event)=>{e.preventDefault();setStatus('3D paused by your device. Continue with the choices below.');};renderer.domElement.addEventListener('webglcontextlost',loss);
  return()=>{disposed=true;cancelAnimationFrame(frame);ro.disconnect();el.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('webglcontextlost',loss);scene.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{for(const value of Object.values(m))if(value instanceof T.Texture)value.dispose();m.dispose();});}});signTex.dispose();renderer.dispose();renderer.domElement.remove();};
 },[]);
 return <div className="room"><div ref={mount} className="room-canvas"/>{status&&<div className="room-status" role="status">{status}</div>}</div>;
}
