export function assess(place, preferences) {
 const reasons = [];
 let failed = false, unknown = false;
 const failure = text => { failed = true; reasons.push(text); };
 const ask = text => { unknown = true; reasons.push(text); };
 if (place.open == null || place.close == null) ask('Ask the organiser to confirm opening hours for your entire visit.');
 if ((place.open != null && place.open > preferences.start) || (place.close != null && place.close < preferences.end)) failure(`Opening hours do not cover your entire visit (${preferences.start} to ${preferences.end}).`);
 if (place.seats == null) ask(`Ask the organiser to confirm at least ${preferences.partySize} available seats.`);
 else if (place.seats < preferences.partySize) failure(`Only ${place.seats} seats available; your party needs ${preferences.partySize}.`);
 const requiredNoise = preferences.activity === 'discussion' ? 'conversation' : preferences.activity === 'silent-work' ? 'silent' : null;
 if (requiredNoise && place.noise == null) ask(`Ask whether ${requiredNoise === 'silent' ? 'silent work' : 'conversation'} is supported.`);
 else if (requiredNoise && place.noise !== requiredNoise) failure(`This space supports ${place.noise}, which does not match ${preferences.activity}.`);
 if (preferences.stepFreeRequired) {
  if (place.stepFree == null) ask('Ask the organiser to confirm step-free access.');
  else if (!place.stepFree) failure('Not step-free; your visit requires step-free access.');
 }
 if (!failed && !unknown) reasons.push('The full visit fits the opening hours, seats support your party, and the activity and required access match.');
 return {state: failed ? 'unsuitable' : unknown ? 'needs-confirmation' : 'suitable', reasons};
}
if (typeof document !== 'undefined') {
 const {places, preferences} = await (await fetch('./data.json')).json();
 const labels = {'suitable':'Suitable', 'unsuitable':'Unsuitable', 'needs-confirmation':'Needs confirmation'};
 const el = (tag, text) => { const node = document.createElement(tag); if(text != null) node.textContent = text; return node; };
 const access = p => p.stepFree == null ? 'Step-free access unknown' : p.stepFree ? 'Step-free access' : 'Not step-free';
 const hours = p => `${p.open ?? 'Unknown'} to ${p.close ?? 'unknown'}`;
 document.querySelector('#preference-summary').textContent = `${preferences.partySize} people / ${preferences.start} to ${preferences.end} / ${preferences.activity === 'silent-work' ? 'Silent work' : preferences.activity === 'discussion' ? 'Discussion' : preferences.activity} / ${preferences.stepFreeRequired ? 'Step-free access required' : 'Step-free access not required'}`;
 const detail = document.querySelector('#detail');
 function select(p, result) {
  detail.dataset.id = p.id;
  detail.replaceChildren(el('p', 'SELECTED SPACE'), el('h2',p.name),el('strong',labels[result.state]),el('p',p.description));
  const facts = el('p',`${hours(p)} / ${p.seats == null ? 'Available seats unknown' : `${p.seats} available seats`} / ${p.noise ?? 'Activity unknown'} / ${access(p)}`);
  const reasons = el('ul');
  result.reasons.forEach(reason => reasons.append(el('li',reason)));
  const contact = el('a','Contact organiser');
  if (typeof p.contact === 'string' && p.contact.startsWith('mailto:')) contact.href = p.contact;
  detail.append(facts,el('h3','Why this result'),reasons,contact);
  document.querySelectorAll('[data-select]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.select === p.id)));
  detail.focus({preventScroll:true});
 }
 for(const p of places) {
  const result = assess(p, preferences);
  const card = el('article'); card.dataset.id=p.id; card.dataset.state=result.state;
  const status = el('p', labels[result.state]); status.className='status';
  const button=el('button','View details'); button.dataset.select=p.id; button.setAttribute('aria-pressed','false'); button.setAttribute('aria-label',`View details for ${p.name}`); button.onclick=()=>select(p,result);
  card.append(status,el('h2',p.name),el('p',hours(p)),el('p',`${p.seats == null ? 'Seats unknown' : `${p.seats} seats`} / ${p.noise ?? 'Activity unknown'}`),el('p',access(p)),button);
  document.querySelector('main').append(card);
 }
}
