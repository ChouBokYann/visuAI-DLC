export function assess(place, preferences) {
  const reasons = [];
  let failed = false;
  let unknown = false;
  const fail = text => { failed = true; reasons.push(text); };
  const ask = text => { unknown = true; reasons.push(text); };
  if (place.open == null || place.close == null) ask('Ask whether opening hours cover your entire visit.');
  if ((place.open != null && place.open > preferences.start) || (place.close != null && place.close < preferences.end)) fail('Opening hours do not cover your entire visit.');
  if (place.seats == null) ask(`Ask whether ${preferences.partySize} seats are available.`);
  else if (place.seats < preferences.partySize) fail(`Only ${place.seats} seats available; your party needs ${preferences.partySize}.`);
  const noise = preferences.activity === 'discussion' ? 'conversation' : 'silent';
  if (place.noise == null) ask(`Ask whether ${noise === 'conversation' ? 'discussion is allowed' : 'silent work is supported'}.`);
  else if (place.noise !== noise) fail(noise === 'conversation' ? 'Discussion is not supported by the stated noise policy.' : 'Silent work is not supported by the stated noise policy.');
  if (preferences.stepFreeRequired) {
    if (place.stepFree == null) ask('Ask whether step-free access is available.');
    else if (!place.stepFree) fail('Not step-free; confirmed step-free access is required.');
  }
  if (!failed && !unknown) reasons.push('Opening hours cover the full visit, seating meets your party size, and the activity matches.' + (preferences.stepFreeRequired ? ' Step-free access is confirmed.' : ' Step-free access is not required.'));
  return {state: failed ? 'unsuitable' : unknown ? 'needs-confirmation' : 'suitable', reasons};
}

if (typeof document !== 'undefined') {
  const {places, preferences} = await (await fetch('./data.json')).json();
  const labels = {suitable:'Suitable', unsuitable:'Unsuitable', 'needs-confirmation':'Needs confirmation'};
  const element = (tag, text) => { const node = document.createElement(tag); if (text != null) node.textContent = text; return node; };
  const facts = p => `${p.open ?? 'Unknown'} to ${p.close ?? 'unknown'} | ${p.seats == null ? 'Seats unknown' : `${p.seats} seats`} | ${p.noise ?? 'Noise policy unknown'} | ${p.stepFree == null ? 'Access unknown' : p.stepFree ? 'Step-free' : 'Not step-free'}`;
  document.querySelector('#preference-summary').textContent = `${preferences.partySize} people | ${preferences.start} to ${preferences.end} | ${preferences.activity === 'discussion' ? 'Discussion' : 'Silent work'} | ${preferences.stepFreeRequired ? 'Step-free access required' : 'Step-free access optional'}`;
  function select(p) {
    const result = assess(p, preferences);
    const detail = document.querySelector('#detail');
    detail.replaceChildren();
    detail.dataset.id = p.id;
    detail.append(element('h2', p.name), element('p', labels[result.state]), element('p', p.description), element('p', facts(p)));
    const list = element('ul');
    for (const reason of result.reasons) list.append(element('li', reason));
    detail.append(list);
    const contact = element('a', `Contact ${p.name}`);
    if (typeof p.contact === 'string' && p.contact.startsWith('mailto:')) contact.href = p.contact;
    detail.append(contact);
    for (const button of document.querySelectorAll('button[data-select]')) button.setAttribute('aria-pressed', String(button.dataset.select === p.id));
  }
  for (const p of places) {
    const result = assess(p, preferences);
    const article = element('article');
    article.dataset.id = p.id;
    article.dataset.state = result.state;
    article.append(element('h2', p.name), element('strong', labels[result.state]), element('p', facts(p)));
    if (result.state === 'needs-confirmation') article.append(element('p', result.reasons.join(' ')));
    const button = element('button', 'View details');
    button.dataset.select = p.id;
    button.setAttribute('aria-pressed','false');
    button.setAttribute('aria-label', `View details for ${p.name}`);
    button.onclick = () => { select(p); document.querySelector('#detail').focus(); };
    article.append(button);
    document.querySelector('main').append(article);
  }
  if (places.length) select(places.find(p => assess(p, preferences).state === 'suitable') ?? places[0]);
}
