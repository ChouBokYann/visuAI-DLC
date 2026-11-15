export type Trait = 'wanderer' | 'ritualist' | 'connector' | 'dreamer';
export type Brew = 'Any coffee' | 'Filter' | 'Espresso' | 'Milk coffee';
export const profiles: Record<Trait, {name:string; line:string; description:string; color:string}> = {
  wanderer: {name:'The Curious Wanderer',line:'A wrong turn. A very right coffee.',description:'You follow the interesting street, ask the extra question, and leave a little room for surprise. Your next cup should have a story of its own.',color:'#bc5937'},
  ritualist: {name:'The Everyday Romantic',line:'Small rituals. Exceptionally good days.',description:'You find something special in the familiar. A carefully made cup, a favourite route, and a moment that belongs entirely to you.',color:'#52684d'},
  connector: {name:'The People Person',line:'Good coffee. Even better company.',description:'For you, a coffee is an invitation. You make time for the long conversation, the shared discovery, and one more cup before goodbye.',color:'#a04952'},
  dreamer: {name:'The Quiet Observer',line:'A little space to let your mind wander.',description:'You notice the light on the table and the details everyone else walks past. Your coffee break is a small escape, not another appointment.',color:'#667386'},
};
export const questions = [
 {chapter:'The invitation', title:'The city has a little time for you.', story:'It’s a slow morning in Singapore. Your plans have fallen through, but the rain has stopped. An unfamiliar lane opens ahead. What do you do?', options:[
  {label:'Follow the unfamiliar lane',detail:'There might be something good around the corner.',trait:'wanderer'},
  {label:'Take my favourite route',detail:'Some things are worth coming back to.',trait:'ritualist'},
  {label:'Text someone: “Coffee?”',detail:'An unplanned morning deserves company.',trait:'connector'},
  {label:'Walk without a destination',detail:'For once, there’s nowhere I have to be.',trait:'dreamer'}]},
 {chapter:'A place to pause', title:'A café door swings open.', story:'The street quietens behind you. Cups clink, the grinder hums, and the scent of coffee fills the room. What draws you in?',options:[
  {label:'The barista at work',detail:'I want to know what’s brewing today.',trait:'wanderer'},
  {label:'A familiar-looking corner',detail:'I can already imagine making this a ritual.',trait:'ritualist'},
  {label:'A table for two',detail:'The best stories need a listener.',trait:'connector'},
  {label:'The light by the window',detail:'A perfect place to watch the world go by.',trait:'dreamer'}]},
 {chapter:'Your first sip', title:'“What can I make for you?”', story:'The barista sets a cup on the counter. Forget the coffee jargon for a moment. Which kind of sip sounds like your morning?',options:[
  {label:'Something bright and unexpected',detail:'A filter coffee to explore, slowly.',trait:'wanderer',brew:'Filter'},
  {label:'A small, bold espresso',detail:'A little intensity, beautifully made.',trait:'ritualist',brew:'Espresso'},
  {label:'Something smooth with milk',detail:'Comfort in a cup. No overthinking.',trait:'connector',brew:'Milk coffee'},
  {label:'A delicate, unhurried filter',detail:'Let the details reveal themselves.',trait:'dreamer',brew:'Filter'}]},
 {chapter:'The unexpected', title:'The rain returns. You have an hour.', story:'A soft downpour folds the city into a blur. Your next appointment can wait. How does this chapter unfold?',options:[
  {label:'Ask about a different bean',detail:'A second cup, a new discovery.',trait:'wanderer'},
  {label:'Enjoy the pause, exactly as it is',detail:'There’s nothing I need to add.',trait:'ritualist'},
  {label:'Let the conversation wander',detail:'The kind where you lose track of time.',trait:'connector'},
  {label:'Open a book or a blank page',detail:'A little room for my own thoughts.',trait:'dreamer'}]},
 {chapter:'The way home', title:'What stays with you?', story:'The clouds part. You step back into the city, a little more awake and a little less hurried. What makes you want to return?',options:[
  {label:'There’s still more to discover',detail:'Next time, I’m trying something different.',trait:'wanderer'},
  {label:'I’ve found my kind of ritual',detail:'Same time next week sounds good.',trait:'ritualist'},
  {label:'Someone made me feel welcome',detail:'I know exactly who I’m bringing here.',trait:'connector'},
  {label:'I felt like myself again',detail:'I’ll remember how this morning felt.',trait:'dreamer'}]},
] as const;
export type Cafe = {id:string; name:string; area:string; address:string; note:string; coffee:string; brews:Exclude<Brew,'Any coffee'>[]; traits:Trait[]; color:string; source:string; why:string};
export const cafes: Cafe[] = [
 {id:'nylon',name:'Nylon Coffee',area:'Everton Park',address:'4 Everton Park #01-40, Singapore 080004',note:'A neighbourhood stop for a coffee-led detour.',coffee:'Seasonal coffees, with espresso and filter roast selections.',brews:['Filter','Espresso','Milk coffee'],traits:['wanderer','ritualist'],color:'#b7c49a',source:'https://nylon.coffee/pages/contact',why:'Our pick for people who enjoy discovering seasonal coffee and building a neighbourhood ritual.'},
 {id:'apartment',name:'Apartment Coffee',area:'Selegie',address:'139 Selegie Road, Singapore 188309',note:'Let the coffee be the whole occasion.',coffee:'A coffee studio with an emphasis on origin stories and pour-over exploration.',brews:['Filter'],traits:['dreamer','wanderer'],color:'#d5c5ad',source:'https://apartmentcoffee.co/',why:'Our pick for an unhurried, curious approach to a cup and its origin.'},
 {id:'tionghoe',name:'Tiong Hoe',area:'Queenstown',address:'170 Stirling Road #01-1133, Singapore 140170',note:'Make room for a new everyday favourite.',coffee:'A Singapore roaster with beans and coffee beverages at its Stirling Road store.',brews:['Espresso','Milk coffee','Filter'],traits:['ritualist','connector'],color:'#d89b7f',source:'https://tionghoe.com/pages/find-us',why:'Our pick for sharing a roaster discovery or finding a coffee ritual to return to.'},
 {id:'mill',name:'Alchemist · The Mill',area:'Alexandra',address:'5 Jalan Kilang #02-02, Singapore 159405',note:'Take a small detour from the everyday.',coffee:'Explore the roaster’s espresso and filter selections.',brews:['Espresso','Filter','Milk coffee'],traits:['dreamer','wanderer'],color:'#969cab',source:'https://alchemist.global/pages/stores',why:'Our editorial detour for a curious or reflective coffee outing.'},
 {id:'khongguan',name:'Alchemist · Khong Guan',area:'MacPherson',address:'2 MacTaggart Road #01-01, Singapore 368078',note:'A different corner of the city, together.',coffee:'An Alchemist stop for exploring espresso, filter and a shared coffee ritual.',brews:['Espresso','Filter','Milk coffee'],traits:['connector','wanderer'],color:'#e0bb78',source:'https://alchemist.global/pages/stores',why:'Our pick for making a coffee trip a shared discovery.'},
 {id:'funan',name:'Alchemist · Funan',area:'City Hall',address:'107 North Bridge Road #01-01, Singapore 179105',note:'A good cup in the middle of your day.',coffee:'A central stop from a roaster offering espresso and filter coffee selections.',brews:['Espresso','Filter','Milk coffee'],traits:['ritualist','connector'],color:'#b5bdad',source:'https://alchemist.global/pages/stores',why:'Our pick for fitting a coffee ritual or catch-up into a city-centre day.'},
];
export function result(answers:number[]) {
 if(answers.length!==questions.length || answers.some((a,i)=>!Number.isInteger(a)||a<0||a>=questions[i].options.length)) throw new Error('Complete all five chapters first.');
 const scores:Record<Trait,number>={wanderer:0,ritualist:0,connector:0,dreamer:0};
 answers.forEach((a,i)=>scores[questions[i].options[a].trait]++);
 // First expressed preference breaks tied portraits; coffee choice independently ranks cafes.
 const first=questions[0].options[answers[0]].trait;
 const trait=(Object.keys(scores) as Trait[]).sort((a,b)=>scores[b]-scores[a] || (a===first?-1:b===first?1:0))[0];
 return {trait, scores, brew:questions[2].options[answers[2]].brew as Exclude<Brew,'Any coffee'>};
}
export function ranked(answers:number[]) {
 const profile=result(answers);
 return cafes.map(c=>({c,score:c.traits.reduce((n,t)=>n+profile.scores[t],0)+(c.brews.includes(profile.brew)?4:0)})).sort((a,b)=>b.score-a.score||a.c.name.localeCompare(b.c.name)).map(x=>x.c);
}
export function searchCafes(query:string,brew:Brew,area:string) {
 const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 return cafes.filter(c=>(brew==='Any coffee'||c.brews.includes(brew))&&(area==='Everywhere'||c.area===area)&&words.every(w=>`${c.name} ${c.area} ${c.coffee} ${c.address}`.toLowerCase().includes(w)));
}
export const mapUrl=(c:Cafe)=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.name+' '+c.address)}`;
