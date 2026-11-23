export function assess(workshop, preferences){return {state:'available',reasons:[]};}
if(typeof document!=='undefined'){
 const {workshops,preferences}=await (await fetch('./source-data.json')).json();
 document.querySelector('#preference-summary').textContent=`Available ${preferences.start} to ${preferences.end}`;
 for(const w of workshops){const result=assess(w,preferences);const card=document.createElement('article');card.dataset.id=w.id;card.dataset.state=result.state;const title=document.createElement('h2');title.textContent=w.name;const state=document.createElement('p');state.textContent=result.state;const link=document.createElement('a');link.href=w.contact;link.textContent='Contact organiser';card.append(title,state,link);document.querySelector('main').append(card);}
}
