import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {cafes,checked,families,lots,origins,statusText} from './data';
import {filterOrigins,matchingLots,originFromSearch} from './logic';
import {WorldMap} from './WorldMap';
import './style.css';

const cultureLines:Record<string,string>={guatemala:'Four women producers. A shared highland coffee tradition.',colombia:'Small mountain farms, with coffee woven into everyday life.',brazil:'Mogiana: a growing tradition rooted in naturally processed coffee.',ethiopia:'In Guji, coffee growing and forest restoration share a story.',kenya:'From farm tours to the cup: a closer look at Kenyan coffee.',indonesia:'Giling basah: a wet-hulling tradition shaped by the rain.'};
function App(){
 const initial=originFromSearch(location.search,origins.map(o=>o.id));
 const [selected,setSelected]=useState<string|null>(initial.id);
 const [invalid,setInvalid]=useState(initial.invalid);
 const [family,setFamily]=useState('all'),[query,setQuery]=useState('');
 const [showCafes,setShowCafes]=useState(false);
 const details=useRef<HTMLHeadingElement>(null);
 const visible=filterOrigins(origins,family,query),origin=origins.find(o=>o.id===selected);
 const matches=origin?matchingLots(lots,origin.id):[];
 function navigate(id:string|null){setShowCafes(false);const url=new URL(location.href);if(id)url.searchParams.set('origin',id);else url.searchParams.delete('origin');history.pushState(null,'',url);setSelected(id);setInvalid(false);}
 function closeOrigin(){const name=origin?.name;navigate(null);requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>(`button[aria-label="Explore ${name}"]`)?.focus());}
 function select(id:string){navigate(id);if(matchMedia('(max-width: 900px)').matches)requestAnimationFrame(()=>{details.current?.focus({preventScroll:true});details.current?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});}
 function filter(nextFamily:string,nextQuery:string){setFamily(nextFamily);setQuery(nextQuery);if(selected&&!filterOrigins(origins,nextFamily,nextQuery).some(o=>o.id===selected))navigate(null);}
 useEffect(()=>{const onBack=()=>{setShowCafes(false);const state=originFromSearch(location.search,origins.map(o=>o.id));setSelected(state.id);setInvalid(state.invalid);setFamily('all');setQuery('');};addEventListener('popstate',onBack);return()=>removeEventListener('popstate',onBack);},[]);
 return <>
  <a className="skip" href="#explore">Skip to coffee origins</a>
  <header><a className="brand" href="/" aria-label="Coffee Atlas home"><span className="brand-mark" aria-hidden="true">ca</span>Coffee Atlas.</a><span className="header-note">The world, in your cup.</span><a href="#about">About the guide</a></header>
  <main>
   <section className="intro"><p>GROWN AROUND THE WORLD. FOUND IN SINGAPORE.</p><h1>Where shall we brew?</h1></section>
   <section className="atlas" id="explore" aria-label="Explore coffee origins" tabIndex={-1}>
    <div className="filter-row"><fieldset><legend className="sr-only">Find a flavour</legend><div className="flavours">{families.map(([id,name])=><button key={id} aria-pressed={family===id} onClick={()=>filter(id,query)}>{name}</button>)}</div></fieldset><label className="search"><span className="sr-only">Search origins</span><input type="search" placeholder="Find an origin" value={query} onChange={e=>filter(family,e.target.value)}/></label></div>
    <WorldMap items={visible} selected={selected} onSelect={select}/>
    {visible.length===0?<div className="empty" role="status"><h3>No origins match this combination.</h3><button className="text-button" onClick={()=>filter('all','')}>Reset filters</button></div>:<div className="origin-list" aria-label="Choose an origin">{visible.map(o=><button key={o.id} aria-pressed={selected===o.id} onClick={()=>select(o.id)}>{o.name}</button>)}</div>}
    {invalid&&<p role="status" className="notice">That origin is not in this guide yet. Choose one from the map.</p>}
    {origin&&<aside key={origin.id} className="origin-panel" aria-label="Selected origin details"><div className="origin-title"><span className="region">{origin.region}</span><h2 ref={details} tabIndex={-1} className="origin-name">{origin.name}</h2><button className="close" aria-label="Close origin details" onClick={closeOrigin}>&times;</button></div><div className="origin-taste"><div className="notes" aria-label="Tasting notes">{origin.notes.map(n=><span key={n}>{n}</span>)}</div><p className="culture-line">{cultureLines[origin.id]}</p><details className="origin-more" key={origin.id}><summary>Story &amp; sources</summary><p>{origin.place}</p><p>{origin.culture}</p><p>Notes describe {origin.lot}, not every coffee from {origin.name}.</p><a href={origin.flavourSource} target="_blank" rel="noreferrer">Roaster's tasting notes &#8599;</a><a href={origin.cultureSource} target="_blank" rel="noreferrer">{origin.cultureSourceName} &#8599;</a></details></div><button className="find-cafes" aria-expanded={showCafes} aria-controls="cafes" onClick={()=>{setShowCafes(v=>!v);}}>Find it in Singapore <span>{matches.length} listings &rarr;</span></button></aside>}
   </section>
   {origin&&showCafes&&<section id="cafes" className="cafes-section" aria-labelledby="cafes-heading"><div className="cafes-heading"><h2 id="cafes-heading">{origin.name}, in Singapore.</h2><p className="availability">Online listings do not confirm today's café stock.</p></div><div className="cafe-list">{matches.map(lot=>{const cafe=cafes.find(c=>c.id===lot.cafeId)!;return <article className="cafe" key={lot.cafeId+lot.name}><p className="cafe-area">{cafe.area}</p><h3>{cafe.name}</h3><p className="coffee-name">{lot.name}</p><p className={`availability-tag ${lot.status==='sold-out'?'sold-out':''}`}>{statusText[lot.status]}</p><div className="cafe-actions"><a href={lot.url} target="_blank" rel="noreferrer">Check coffee listing &#8599;</a><a href={cafe.locationSource} target="_blank" rel="noreferrer">Café &amp; location &#8599;</a></div><details><summary>Address &amp; source details</summary><p>{cafe.address}</p><p>{lot.notes}</p><p>Source checked {checked}. Ask the café before visiting.</p></details></article>;})}</div>{matches.length===0&&<p role="status">No sourced café matches yet. Try another origin.</p>}</section>}
  </main><footer id="about"><span>Six origins. A little curiosity.</span><details><summary>How we choose and check listings</summary><p>A curated guide to three Singapore coffee businesses. Flavours describe featured lots, not national taste profiles. Coffee varies with processing, roasting and brewing.</p><p>We match a roaster's named product to its published location. Online listings do not confirm branch stock or current serving. Sold-out listings stay labelled. Sources checked {checked}.</p><p>The map is illustrated, not for navigation. We are not affiliated with the cafés.</p></details></footer>
 </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
