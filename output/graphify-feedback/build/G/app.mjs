export function assess(place,preferences){
 const failures=[],questions=[];
 if(place.open==null || place.close==null) questions.push('Confirm opening hours for the full visit.');
 if((place.open!=null && place.open>preferences.start) || (place.close!=null && place.close<preferences.end)) failures.push('Opening hours do not cover the full visit.');
 if(place.seats==null) questions.push('Confirm available capacity for '+preferences.partySize+' people.');
 else if(place.seats<preferences.partySize) failures.push('Not enough available seats for '+preferences.partySize+' people.');
 const requiredNoise={discussion:'conversation','silent-work':'silent'}[preferences.activity];
 if(requiredNoise){
  if(place.noise==null) questions.push('Confirm the noise policy for '+preferences.activity+'.');
  else if(place.noise!==requiredNoise) failures.push('Noise policy does not support '+preferences.activity+'.');
 }
 if(preferences.stepFreeRequired){
  if(place.stepFree==null) questions.push('Confirm step-free access.');
  else if(!place.stepFree) failures.push('Not step-free.');
 }
 return {state:failures.length?'unsuitable':questions.length?'needs-confirmation':'suitable',reasons:[...failures,...questions]};
}
if(typeof document!=='undefined'){
 const element=(tag,text)=>{const node=document.createElement(tag);node.textContent=text;return node;};
 const labels={suitable:'Suitable','unsuitable':'Unsuitable','needs-confirmation':'Needs confirmation'};
 const access=p=>p.stepFree===true?'Step-free':p.stepFree===false?'Not step-free':'Step-free access unknown';
 const facts=p=>`${p.open??'Unknown'} - ${p.close??'Unknown'} | ${p.seats==null?'Capacity unknown':p.seats+' seats'} | ${p.noise??'Noise policy unknown'} | ${access(p)}`;
 try{
  const response=await fetch('./data.json');
  if(!response.ok) throw new Error('Catalogue unavailable');
  const {places,preferences}=await response.json();
  document.querySelector('#preference-summary').textContent=`${preferences.partySize} people | ${preferences.start} - ${preferences.end} | ${preferences.activity} | ${preferences.stepFreeRequired?'Step-free access required':'Step-free access not required'}`;
  for(const p of places){
   const result=assess(p,preferences),card=element('article','');
   card.dataset.id=p.id;card.dataset.state=result.state;
   const status=element('p',labels[result.state]);status.className='status';
   const button=element('button','Details and contact');button.dataset.select=p.id;
   button.setAttribute('aria-label','Details and contact for '+p.name);button.setAttribute('aria-controls','detail');
   button.onclick=()=>{
    const detail=document.querySelector('#detail');
    detail.replaceChildren();detail.dataset.id=p.id;
    detail.append(element('h2',p.name),element('p',labels[result.state]),element('p',p.description),element('p',facts(p)));
    const reasons=element('ul','');
    for(const reason of result.reasons.length?result.reasons:['Matches your group size, full visit, activity and required access.']) reasons.append(element('li',reason));
    detail.append(reasons);
    if(typeof p.contact==='string' && p.contact.startsWith('mailto:')){
     const link=element('a','Contact '+p.name);link.href=p.contact;detail.append(link);
    }else detail.append(element('p','Contact information unavailable.'));
    detail.focus();
   };
   card.append(element('h2',p.name),status,element('p',facts(p)),button);
   document.querySelector('main').append(card);
  }
 }catch(error){document.querySelector('#preference-summary').textContent='Unable to load study spaces. Please reload to try again.';}
}
