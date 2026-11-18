import {useEffect, useRef, useState} from 'react';
import {cafes, mapUrl, type Cafe} from './cafes';
import {addCafe, readShortlist, SHORTLIST_LIMIT, writeShortlist} from './shortlist';

export function useShortlist() {
  const [state, setState] = useState(() => readShortlist());
  useEffect(() => {
    if (state.available && !writeShortlist(state.ids)) {
      setState(current => ({...current, available: false}));
    }
  }, [state.ids, state.available]);
  return {
    ...state,
    save: (id: string) => setState(current => ({...current, ids: addCafe(current.ids, id)})),
    remove: (id: string) => setState(current => ({...current, ids: current.ids.filter(saved => saved !== id)})),
  };
}

export function PersistenceNotice({available}: {available: boolean}) {
  return !available ? <p className="persistence-notice" role="status">Saving on this device is unavailable. Your shortlist still works for this visit, but changes may be lost when you refresh.</p> : null;
}

export function SaveControls({cafe, ids, available, save, compare}: {
  cafe: Cafe; ids: string[]; available: boolean; save: (id: string) => void; compare: () => void;
}) {
  const saved = ids.includes(cafe.id);
  const full = ids.length >= SHORTLIST_LIMIT;
  return <section className="save-controls" aria-label="Save this café">
    <button className="primary" onClick={() => save(cafe.id)} disabled={saved || full}>
      {saved ? 'Saved to shortlist ✓' : full ? 'Shortlist full' : 'Save to shortlist'}
    </button>
    <button className="text-button" onClick={compare}>View shortlist ({ids.length}/{SHORTLIST_LIMIT}) →</button>
    <p role="status">{saved ? `${cafe.name} is on your shortlist.` : full ? 'Your three places are saved. Open the shortlist and remove one to make room.' : 'Keep up to three cafés to compare.'}</p>
    <PersistenceNotice available={available}/>
  </section>;
}

export function Shortlist({ids, available, remove, close, discover}: {
  ids: string[]; available: boolean; remove: (id: string) => void; close: () => void; discover: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const discovery = useRef<HTMLButtonElement>(null);
  const [message, setMessage] = useState('');
  useEffect(() => { dialog.current?.showModal(); }, []);
  const selected = ids.map(id => cafes.find(cafe => cafe.id === id)!);

  function removeSelection(cafe: Cafe, index: number) {
    remove(cafe.id);
    setMessage(`${cafe.name} removed. You can save another café.`);
    requestAnimationFrame(() => {
      const buttons = dialog.current?.querySelectorAll<HTMLButtonElement>('[data-remove]');
      const next = buttons?.[Math.min(index, buttons.length - 1)];
      (next ?? discovery.current)?.focus();
    });
  }

  return <dialog ref={dialog} className="shortlist-dialog" aria-labelledby="shortlist-title" onCancel={close}
    onClick={event => { if (event.target === dialog.current) close(); }}>
    <button className="close" aria-label="Close shortlist" onClick={close}>×</button>
    <p className="eyebrow">YOUR NEXT COFFEE STOP</p>
    <h2 id="shortlist-title">Your shortlist</h2>
    <p>{ids.length} of {SHORTLIST_LIMIT} places saved. A little room to compare.</p>
    <PersistenceNotice available={available}/>
    <p className="shortlist-status" role="status">{message}</p>
    {selected.length ? <div className="shortlist-grid">{selected.map((cafe, index) =>
      <article className="shortlist-card" key={cafe.id} aria-label={cafe.name}>
        <div className="shortlist-card-heading" style={{borderColor: cafe.color}}>
          <p className="eyebrow">{cafe.area}</p><h3>{cafe.name}</h3>
        </div>
        <dl><dt>Coffee</dt><dd>{cafe.coffee}</dd><dt>Brews</dt><dd>{cafe.brews.join(' · ')}</dd><dt>Address</dt><dd>{cafe.address}</dd></dl>
        <a className="primary" href={mapUrl(cafe)} target="_blank" rel="noreferrer" aria-label={`Directions to ${cafe.name}`}>Directions ↗</a>
        <button className="text-button" data-remove onClick={() => removeSelection(cafe, index)} aria-label={`Remove ${cafe.name}`}>Remove from shortlist</button>
      </article>
    )}</div> : <div className="shortlist-empty"><h3>A few places worth keeping.</h3><p>Find a café, open its details, and save it here. Compare up to three before choosing your next cup.</p></div>}
    {ids.length === SHORTLIST_LIMIT && <p className="capacity-note">All three spots are filled. Remove a café above to make room for another.</p>}
    <button ref={discovery} className="primary" onClick={discover}>{selected.length ? 'Find another café' : 'Discover cafés'} →</button>
  </dialog>;
}
