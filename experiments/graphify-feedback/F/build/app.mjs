export function assess(place, preferences) {
  const failures = [], unknowns = [];
  if (place.open == null || place.close == null) unknowns.push('Ask whether opening hours cover the full visit.');
  else if (place.open > preferences.start || place.close < preferences.end) failures.push('Opening hours do not cover the full visit.');
  if (place.seats == null) unknowns.push('Ask whether enough seats are available.');
  else if (place.seats < preferences.partySize) failures.push('Not enough seats for the group.');
  const requiredNoise = {discussion: 'conversation', 'silent-work': 'silent'}[preferences.activity];
  if (requiredNoise) {
    if (place.noise == null) unknowns.push('Ask whether the space supports your activity.');
    else if (place.noise !== requiredNoise) failures.push(requiredNoise === 'conversation' ? 'Silent space does not support discussion.' : 'Conversation space does not support silent work.');
  }
  if (preferences.stepFreeRequired) {
    if (place.stepFree == null) unknowns.push('Ask whether step-free access is available.');
    else if (!place.stepFree) failures.push('Not step-free.');
  }
  return {state: failures.length ? 'unsuitable' : unknowns.length ? 'needs-confirmation' : 'suitable', reasons: [...failures, ...unknowns]};
}
if (typeof document !== 'undefined') {
  const {places, preferences} = await (await fetch('./data.json')).json();
  const labels = {suitable: 'Suitable', unsuitable: 'Unsuitable', 'needs-confirmation': 'Needs confirmation'};
  const access = p => p.stepFree == null ? 'Access unknown' : p.stepFree ? 'Step-free' : 'Not step-free';
  const facts = p => `${p.open ?? '?'} - ${p.close ?? '?'} | ${p.seats == null ? 'Seats unknown' : p.seats + ' seats'} | ${p.noise ?? 'Noise unknown'} | ${access(p)}`;
  function element(tag, text) { const el = document.createElement(tag); el.textContent = text; return el; }
  document.querySelector('#preference-summary').textContent = `${preferences.partySize} people | ${preferences.start} - ${preferences.end} | ${preferences.activity} | ${preferences.stepFreeRequired ? 'Step-free access required' : 'Step-free access not required'}`;
  for (const p of places) {
    const result = assess(p, preferences);
    const article = document.createElement('article');
    article.dataset.id = p.id;
    article.dataset.state = result.state;
    const status = element('p', labels[result.state]); status.className = 'status';
    const button = element('button', 'View details'); button.dataset.select = p.id;
    button.setAttribute('aria-controls', 'detail');
    button.setAttribute('aria-label', `View details for ${p.name}`);
    button.onclick = () => {
      const detail = document.querySelector('#detail');
      detail.dataset.id = p.id;
      detail.replaceChildren(element('h2', p.name), element('p', labels[result.state]), element('p', p.description), element('p', facts(p)));
      const reasons = element('ul', '');
      for (const reason of result.reasons) reasons.append(element('li', reason));
      if (result.reasons.length) detail.append(reasons);
      else detail.append(element('p', 'Matches the listed requirements based on the supplied information.'));
      if (typeof p.contact === 'string' && p.contact.startsWith('mailto:')) {
        const contact = element('a', `Contact ${p.name}`); contact.href = p.contact; detail.append(contact);
      } else detail.append(element('p', 'Contact information unavailable.'));
      detail.focus();
    };
    article.append(element('h2', p.name), status, element('p', facts(p)), button);
    document.querySelector('main').append(article);
  }
}
