export function assess(place, preferences) {
 const failures=[], unknowns=[], confirmed=[];
 if(place.open==null || place.close==null) unknowns.push('Ask the organiser to confirm opening hours for the entire visit.');
 else if(place.open>preferences.start || place.close<preferences.end) failures.push(`Opening hours ${place.open}-${place.close} do not cover the entire visit.`);
 else confirmed.push('Opening hours cover the entire visit.');
 if(place.seats==null) unknowns.push(`Ask the organiser to confirm at least ${preferences.partySize} available seats.`);
 else if(place.seats<preferences.partySize) failures.push(`Only ${place.seats} seats are available for ${preferences.partySize} people.`);
 else confirmed.push(`${place.seats} available seats support your party of ${preferences.partySize}.`);
 const requiredNoise=preferences.activity==='discussion'?'conversation':'silent';
 if(place.noise==null) unknowns.push(`Ask the organiser whether ${requiredNoise==='conversation'?'discussion':'silent work'} is supported.`);
 else if(place.noise!==requiredNoise) failures.push(`${place.noise==='silent'?'Silent space':'Conversation space'} does not support your ${preferences.activity==='discussion'?'discussion':'silent work'} activity.`);
 else confirmed.push(`${preferences.activity==='discussion'?'Discussion':'Silent work'} is supported.`);
 if(preferences.stepFreeRequired){
  if(place.stepFree==null) unknowns.push('Ask the organiser to confirm step-free access.');
  else if(!place.stepFree) failures.push('Not step-free; required access is unavailable.');
  else confirmed.push('Step-free access is confirmed.');
 }
 return {state:failures.length?'unsuitable':unknowns.length?'needs-confirmation':'suitable',reasons:[...failures,...unknowns,...confirmed]};
}
if(typeof document!=='undefined'){
 const {places,preferences}=await (await fetch('./data.json')).json();
 const labels={'suitable':'Suitable','unsuitable':'Unsuitable','needs-confirmation':'Needs confirmation'};
 const el=(tag,text)=>{const node=document.createElement(tag);node.textContent=text;return node;};
 document.querySelector('#preference-summary').textContent=`${preferences.partySize} people | ${preferences.start}-${preferences.end} | ${preferences.activity==='discussion'?'Discussion':'Silent work'} | ${preferences.stepFreeRequired?'Step-free access required':'Step-free access not required'}`;
 const access=p=>p.stepFree==null?'Step-free access unknown':p.stepFree?'Step-free access confirmed':'Not step-free';
 const select=p=>{
  const result=assess(p,preferences), d=document.querySelector('#detail');
  d.replaceChildren();d.dataset.id=p.id;
  d.append(el('p',labels[result.state]),el('h2',p.name),el('p',p.description));
  const reasons=el('ul','');
  for(const reason of result.reasons)reasons.append(el('li',reason));
  d.append(reasons,el('p',access(p)));
  const contact=el('a','Contact the organiser');contact.href=p.contact;d.append(contact);
  for(const b of document.querySelectorAll('[data-select]')) b.setAttribute('aria-pressed',String(b.dataset.select===p.id));
 };
 for(const p of places){
  const result=assess(p,preferences),a=el('article','');a.dataset.id=p.id;a.dataset.state=result.state;
  a.append(el('p',labels[result.state]),el('h2',p.name),el('p',`${p.open??'Unknown'}-${p.close??'Unknown'} | ${p.seats==null?'Seats unknown':`${p.seats} seats`} | ${p.noise??'Activity unknown'}`),el('p',access(p)));
  const b=el('button','View details');b.dataset.select=p.id;b.setAttribute('aria-pressed','false');b.onclick=()=>select(p);a.append(b);document.querySelector('main').append(a);
 }
 if(places.length)select(places.find(p=>assess(p,preferences).state==='suitable')??places[0]);
}
