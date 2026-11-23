export function assess(place, preferences) {
  const reasons = [];
  let failed = false, unknown = false;
  const check = (missing, valid, failure, question) => {
    if (missing) { unknown = true; reasons.push(question); }
    else if (!valid) { failed = true; reasons.push(failure); }
  };
  check(place.open == null, place.open <= preferences.start, 'Opens after your requested start.', 'Ask when the space opens.');
  check(place.close == null, place.close >= preferences.end, 'Closes before your requested end.', 'Ask when the space closes.');
  check(place.seats == null, place.seats >= preferences.partySize, 'Too few available seats for your party.', 'Ask whether enough seats are available for your party.');
  const noise = preferences.activity === 'discussion' ? 'conversation' : 'silent';
  check(place.noise == null, place.noise === noise, `This space does not support ${preferences.activity}.`, `Ask whether ${preferences.activity} is permitted.`);
  if (preferences.stepFreeRequired) check(place.stepFree == null, place.stepFree === true, 'Not step-free; step-free access is required.', 'Ask whether step-free access is available.');
  if (!failed && !unknown) reasons.push('The full time interval, party size, activity and requested access requirements fit.');
  return { state: failed ? 'unsuitable' : unknown ? 'needs-confirmation' : 'suitable', reasons };
}
if (typeof document !== 'undefined') {
  const { places, preferences } = await (await fetch('./data.json')).json();
  document.querySelector('#preference-summary').textContent = `${preferences.partySize} people | ${preferences.start} - ${preferences.end} | ${preferences.activity} | ${preferences.stepFreeRequired ? 'Step-free access required' : 'Step-free access not required'}`;
  const labels = { suitable: 'Suitable', unsuitable: 'Unsuitable', 'needs-confirmation': 'Needs confirmation' };
  const el = (tag, text) => { const n = document.createElement(tag); n.textContent = text; return n; };
  const facts = p => `${p.open ?? 'Unknown opening'} - ${p.close ?? 'Unknown closing'} | ${p.seats == null ? 'Seats unknown' : `${p.seats} seats`} | ${p.noise ?? 'Activity unknown'} | ${p.stepFree == null ? 'Step-free access unknown' : p.stepFree ? 'Step-free' : 'Not step-free'}`;
  for (const p of places) {
    const result = assess(p, preferences);
    const card = el('article', '');
    card.dataset.id = p.id; card.dataset.state = result.state;
    const status = el('p', labels[result.state]); status.className = 'status';
    const button = el('button', 'View details'); button.dataset.select = p.id;
    button.setAttribute('aria-label', `View details for ${p.name}`);
    button.onclick = () => {
      const detail = document.querySelector('#detail');
      detail.dataset.id = p.id;
      const list = el('ul', '');
      for (const reason of result.reasons) list.append(el('li', reason));
      const contact = el('a', `Contact ${p.name} organiser`);
      if (typeof p.contact === 'string' && p.contact.startsWith('mailto:')) contact.href = p.contact;
      detail.replaceChildren(el('h2', p.name), el('p', labels[result.state]), el('p', p.description), el('p', facts(p)), list, contact);
      detail.focus({ preventScroll: true });
    };
    card.append(el('h2', p.name), status, el('p', facts(p)), button);
    document.querySelector('main').append(card);
  }
}
