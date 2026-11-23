export function assess(place, preferences) {
  const failures = [], unknowns = [];
  if (place.seats == null) unknowns.push('Ask the organiser to confirm capacity for your group.');
  else if (place.seats < preferences.partySize) failures.push(`Only ${place.seats} seats; your group needs ${preferences.partySize}.`);
  if (place.open == null || place.close == null) unknowns.push('Ask the organiser to confirm opening hours for the full visit.');
  if ((place.open != null && place.open > preferences.start) || (place.close != null && place.close < preferences.end)) failures.push(`Opening hours do not cover ${preferences.start}–${preferences.end}.`);
  if (place.noise == null) unknowns.push('Ask the organiser to confirm whether your activity is supported.');
  else if (preferences.activity === 'discussion' && place.noise !== 'conversation') failures.push('Silent space: group discussion is not supported.');
  else if (preferences.activity === 'silent-work' && place.noise !== 'silent') failures.push('Conversation space: a silent working environment is not confirmed.');
  if (preferences.stepFreeRequired) {
    if (place.stepFree == null) unknowns.push('Ask the organiser to confirm step-free access.');
    else if (!place.stepFree) failures.push('Step-free access is not available.');
  }
  return {state: failures.length ? 'unsuitable' : unknowns.length ? 'needs-confirmation' : 'suitable', reasons: [...failures, ...unknowns]};
}

if (typeof document !== 'undefined') {
  const labels = {suitable:'Meets requirements', unsuitable:'Does not meet requirements', 'needs-confirmation':'Needs confirmation'};
  const el = (tag, text) => {const node = document.createElement(tag); if (text != null) node.textContent = text; return node;};
  const facts = p => `${p.open ?? '?'}–${p.close ?? '?'} · ${p.seats == null ? 'Capacity unknown' : `${p.seats} seats`} · ${p.noise === 'conversation' ? 'Conversation' : p.noise === 'silent' ? 'Silent' : 'Noise policy unknown'} · ${p.stepFree == null ? 'Access unknown' : p.stepFree ? 'Step-free' : 'No step-free access'}`;
  try {
    const response = await fetch('./data.json');
    if (!response.ok) throw new Error('Catalogue unavailable');
    const {places, preferences} = await response.json();
    document.querySelector('#preference-summary').textContent = `${preferences.partySize} people · ${preferences.start}–${preferences.end} · ${preferences.activity === 'discussion' ? 'Group discussion' : 'Silent work'} · ${preferences.stepFreeRequired ? 'Step-free access required' : 'Step-free access optional'}`;
    const detail = document.querySelector('#detail');
    for (const p of places) {
      const result = assess(p, preferences);
      const card = el('article'); card.dataset.id = p.id; card.dataset.state = result.state;
      const badge = el('p', labels[result.state]); badge.className = 'status';
      const button = el('button', `View ${p.name}`); button.dataset.select = p.id; button.setAttribute('aria-controls', 'detail'); button.setAttribute('aria-pressed', 'false');
      button.onclick = () => {
        document.querySelectorAll('[data-select]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        detail.dataset.id = p.id; detail.dataset.state = result.state;
        const reasons = el('ul');
        for (const reason of result.reasons) reasons.append(el('li', reason));
        const contact = el('a', 'Email the organiser'); contact.href = p.contact;
        detail.replaceChildren(el('h2', p.name), el('p', labels[result.state]), el('p', p.description), el('p', facts(p)), reasons, contact, el('p', 'Catalogue information only; contact the organiser to confirm before visiting.'));
        detail.focus();
      };
      card.append(el('h2', p.name), badge, el('p', facts(p)), button);
      document.querySelector('main').append(card);
    }
  } catch (error) {
    document.querySelector('#preference-summary').textContent = 'The catalogue could not be loaded. Please try again.';
  }
}

