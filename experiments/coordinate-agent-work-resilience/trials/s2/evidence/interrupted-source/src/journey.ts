import {cafes,type Trait,type Brew} from './cafes';
export const chapters=[
 {name:'Arrive',question:'Where do you settle?',options:['A quiet corner','Around the table','At the coffee bar'],response:['A corner of your own.','Room for a good conversation.','A front-row seat to the craft.']},
 {name:'Order',question:'What’s in your cup?',options:['Filter','Espresso','Milk coffee'],response:['Slow sips. New discoveries.','Small cup. Bold ritual.','A little everyday comfort.']},
 {name:'Stay',question:'A chair for someone?',options:['Just for me','Save them a seat'],response:['Nothing to do. Nowhere to rush.','Some stories are better shared.']},
 {name:'Linger',question:'Let the afternoon unfold.',options:['Keep the sunlight','Stay until golden hour'],response:['A bright little pause.','One more cup before the city glows.']},
];
export const portraits:Record<Trait,{name:string;line:string}>={dreamer:{name:'The quiet observer',line:'A little space. A slower sip.'},wanderer:{name:'The curious wanderer',line:'Follow the coffee. Find something new.'},ritualist:{name:'The everyday romantic',line:'Your own small, beautiful ritual.'},connector:{name:'The people person',line:'Coffee is better with a plus-one.'}};
export function complete(a:number[]){return a.length===4&&a.every((v,i)=>Number.isInteger(v)&&v>=0&&v<chapters[i].options.length);}
export function match(a:number[]){
 if(!complete(a))throw new Error('Finish your café story first.');
 const score:Record<Trait,number>={dreamer:0,wanderer:0,ritualist:0,connector:0};
 const seat=(['dreamer','connector','wanderer'] as Trait[])[a[0]];score[seat]+=2;
 score[(['wanderer','ritualist','connector'] as Trait[])[a[1]]]+=2;score[a[2]===0?'dreamer':'connector']++;score[a[3]===0?'ritualist':'dreamer']++;
 const trait=(Object.keys(score) as Trait[]).sort((x,y)=>score[y]-score[x]||(x===seat?-1:y===seat?1:0))[0];
 const brew=(['Filter','Espresso','Milk coffee'] as Brew[])[a[1]];
 const points=(c:typeof cafes[number])=>c.traits.reduce((n,t)=>n+score[t],0)+(c.brews.includes(brew as Exclude<Brew,'Any coffee'>)?4:0);
 return {trait,brew,picks:[...cafes].sort((x,y)=>points(y)-points(x)||x.name.localeCompare(y.name))};
}
