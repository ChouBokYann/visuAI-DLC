export function assess(place, preferences) {
  const failures = [], unknown = [];
  if (place.seats == null) unknown.push(`Ask the organiser to confirm at least ${preferences.partySize} ${preferences.partySize === 1 ? 'seat' : 'seats'}.`);
  else if (place.seats < preferences.partySize) failures.push(`Only ${place.seats} seats; you need ${preferences.partySize}.`);
  if (place.open == null || place.close == null) unknown.push(`Ask the organiser to confirm opening for ${preferences.start}–${preferences.end}.`);
  if (place.open != null && place.open > preferences.start) failures.push(`Opens at ${place.open}, after your ${preferences.start} start.`);
  if (place.close != null && place.close < preferences.end) failures.push(`Closes at ${place.close}, before your ${preferences.end} finish.`);
  const neededNoise = preferences.activity === 'discussion' ? 'conversation' : 'silent';
  if (place.noise == null) unknown.push(`Ask the organiser whether ${preferences.activity === 'discussion' ? 'discussion is allowed' : 'silent working is supported'}.`);
  else if (place.noise !== neededNoise) failures.push(preferences.activity === 'discussion' ? 'Silent space: group discussion is not supported.' : 'Conversation space: does not meet your silent-work requirement.');
  if (preferences.stepFreeRequired) {
    if (place.stepFree == null) unknown.push('Ask the organiser to confirm step-free access.');
    else if (!place.stepFree) failures.push('No step-free access; your preferences require it.');
  }
  return {state: failures.length ? 'unsuitable' : unknown.length ? 'needs-confirmation' : 'suitable', reasons: [...failures, ...unknown]};
}

if (typeof document !== 'undefined') {
  const labels = {'suitable':'Suitable', 'unsuitable':'Unsuitable', 'needs-confirmation':'Needs confirmation'};
  const el = (tag, text) => { const node = document.createElement(tag); if (text != null) node.textContent = text; return node; };
  try {
    const response = await fetch('./data.json');
    if (!response.ok) throw new Error('Catalogue unavailable');
    const {places,preferences} = await response.json();
    document.querySelector('#preference-summary').textContent = `${preferences.partySize} ${preferences.partySize === 1 ? 'person' : 'people'} · ${preferences.start}–${preferences.end} · ${preferences.activity === 'discussion' ? 'Discussion' : 'Silent work'} · ${preferences.stepFreeRequired ? 'Step-free access required' : 'Step-free access not required'}`;
    const detail = document.querySelector('#detail');
    function select(place, assessment) {
      detail.dataset.id = place.id;
      detail.replaceChildren(el('h2',place.name),el('p',labels[assessment.state]),el('p',`${place.open ?? '?'}\u2013${place.close ?? '?'}\u00b7 ${place.seats == null ? 'Seats unknown' : `${place.seats} seats`}\u00b7 ${place.noise == null ? 'Noise unknown' : place.noise === 'silent' ? 'Silent' : 'Discussion'}`));
      const list = el('ul');
      for (const reason of assessment.reasons.length ? assessment.reasons : ['Meets your time, capacity and activity requirements based on this catalogue.']) list.append(el('li',reason));
      detail.append(list);
      if (typeof place.contact === 'string' && place.contact.startsWith('mailto:')) {
        const contact = el('a',`Contact ${place.name} organiser`);
        contact.href = place.contact;
        detail.append(contact);
      } else detail.append(el('p','Organiser contact unavailable.'));
      for (const button of document.querySelectorAll('[data-select]')) button.setAttribute('aria-pressed',String(button.dataset.select === place.id));
      detail.focus({preventScroll:true});
      detail.scrollIntoView({block:'nearest',behavior:'auto'});
    }
    for (const place of places) {
      const assessment = assess(place,preferences);
      const article = el('article');
      article.dataset.id = place.id;
      article.dataset.state = assessment.state;
      const status = el('p',labels[assessment.state]); status.className = 'status';
      const summary = el('p',`${place.open ?? '?'}–${place.close ?? '?'} · ${place.seats == null ? 'Seats unknown' : `${place.seats} seats`} · ${place.noise == null ? 'Noise unknown' : place.noise === 'silent' ? 'Silent' : 'Discussion'} · ${place.stepFree == null ? 'Access unknown' : place.stepFree ? 'Step-free' : 'Stairs'}`);
      const button = el('button',`View ${place.name}`);
      button.dataset.select = place.id;
      button.setAttribute('aria-pressed','false');
      button.setAttribute('aria-controls','detail');
      button.onclick = () => select(place,assessment);
      article.append(el('h2',place.name),status,summary,button);
      document.querySelector('main').append(article);
    }
    if (!places.length) document.querySelector('main').append(el('p','No spaces are listed.'));
  } catch (error) {
    document.querySelector('#preference-summary').textContent = 'Unable to load the catalogue. Please try again.';
  }
}

