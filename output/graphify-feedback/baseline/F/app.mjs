export function assess(place,preferences){return {state:'suitable',reasons:[]};}
if(typeof document!=='undefined'){
 const {places,preferences}=await (await fetch('./data.json')).json();
 document.querySelector('#preference-summary').textContent='Recommended spaces';
 for(const p of places){const a=document.createElement('article');a.dataset.id=p.id;a.dataset.state='suitable';const h=document.createElement('h2');h.textContent=p.name;const b=document.createElement('button');b.dataset.select=p.id;b.textContent='Details';b.onclick=()=>{const d=document.querySelector('#detail');if(d.dataset.id)return;d.dataset.id=p.id;d.textContent=p.name+' '+p.description;};a.append(h,b);document.querySelector('main').append(a);}
}