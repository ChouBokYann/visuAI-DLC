import type {RefObject,ReactNode} from 'react';
import {cafes,mapUrl} from './cafes';
import {SHORTLIST_LIMIT} from './shortlist';

export function StorageNotice({loaded,pending,error,retry}:{loaded:boolean;pending:boolean;error:string;retry:()=>void}) {
  if(pending)return <p className="storage-notice" role="status">{loaded?'Saving shortlist...':'Loading saved shortlist...'}</p>;
  if(error)return <div className="storage-notice" role="alert"><p>{loaded?'Your last saved selection is unchanged.':'Saved shortlist unavailable.'} {error}</p><button onClick={retry}>Retry shortlist</button></div>;
  return null;
}

export function Shortlist({ids,loaded,blocked,notice,heading,remove,discover}:{
  ids:string[];
  loaded:boolean;
  blocked:boolean;
  notice:ReactNode;
  heading:RefObject<HTMLHeadingElement|null>;
  remove:(id:string)=>void;
  discover:()=>void;
}) {
  function removeAndFocus(id:string) {
    const index=ids.indexOf(id);
    const nextId=ids[index+1] ?? ids[index-1];
    remove(id);
    requestAnimationFrame(()=>{
      if(nextId) document.getElementById(`remove-${nextId}`)?.focus();
      else heading.current?.focus();
    });
  }
  return <section className="search-content shortlist-content">
    <div className="search-heading"><p className="eyebrow">A FEW GOOD POSSIBILITIES</p><h1 ref={heading} tabIndex={-1}>Your <em>shortlist.</em></h1></div>
    {loaded&&<p className="shortlist-intro" role="status">{ids.length} of {SHORTLIST_LIMIT} saved. {ids.length===SHORTLIST_LIMIT?'Remove a café to make room for another.':'Keep up to three cafés to compare before you go.'}</p>}
    {notice}
    {loaded&&(ids.length ? <>
      <div className="shortlist-grid">{ids.map(id=>{
        const cafe=cafes.find(c=>c.id===id)!;
        return <article className="shortlist-card" key={id} aria-labelledby={`saved-${id}`}>
          <div className="shortlist-card-title" style={{borderTopColor:cafe.color}}><p className="eyebrow">{cafe.area}</p><h2 id={`saved-${id}`}>{cafe.name}</h2></div>
          <dl><div><dt>Coffee</dt><dd>{cafe.coffee}</dd></div><div><dt>Brews</dt><dd>{cafe.brews.join(' / ')}</dd></div><div><dt>Address</dt><dd>{cafe.address}</dd></div></dl>
          <div className="shortlist-card-actions"><a className="primary" href={mapUrl(cafe)} target="_blank" rel="noreferrer" aria-label={`Directions to ${cafe.name}`}>Directions ↗</a><button id={`remove-${id}`} className="text-action" aria-label={`Remove ${cafe.name}`} disabled={blocked} onClick={()=>removeAndFocus(id)}>Remove</button></div>
        </article>;
      })}</div>
      <button className="nav-link discover-link" onClick={discover}>Discover more cafés ↗</button>
    </> : <div className="empty"><h2>Your next cup is out there.</h2><p>Open a café from search or your story picks, then save it here.</p><button className="primary" onClick={discover}>Discover cafés ↗</button></div>)}
  </section>;
}
