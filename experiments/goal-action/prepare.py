"""Create isolated same-facts producer/consumer trials. No network."""
from pathlib import Path
import json,hashlib

ROOT=Path(__file__).resolve().parents[2]
BASE=ROOT/'experiments/goal-action'
OUT=ROOT/'output/goal-action'
OUT.mkdir(parents=True,exist_ok=True)

request='''Synthetic resident request: I am new to community workshops. Help me find classes I can actually attend this Saturday and decide which organiser to contact. I am available from 10:00 until 14:00 and have not completed any workshop prerequisites. Keep it clear and practical. Exact presentation is delegated. No booking, accounts, payments or external services. Use only the supplied synthetic catalogue; do not invent facts.\n'''
preferences={'start':'10:00','end':'14:00','completed':[],'stepFreeRequired':False}
classes=[
 {'id':'wood','name':'Intro to woodwork','start':'10:00','end':'12:00','seats':3,'prerequisites':[],'stepFree':True},
 {'id':'clay','name':'Clay forms','start':'12:00','end':'14:00','seats':4,'prerequisites':[],'stepFree':True},
 {'id':'metal','name':'Metal basics','start':'09:00','end':'10:30','seats':2,'prerequisites':[],'stepFree':True},
 {'id':'glass','name':'Glass colour','start':'11:00','end':'12:00','seats':0,'prerequisites':[],'stepFree':True,'waitlist':True},
 {'id':'circuits','name':'Simple circuits','start':'10:30','end':'11:30','seats':None,'prerequisites':[],'stepFree':True},
 {'id':'joinery','name':'Advanced joinery','start':'10:00','end':'12:00','seats':3,'prerequisites':['wood-basic'],'stepFree':True},
 {'id':'books','name':'Bookbinding','start':'11:00','end':'12:30','seats':2,'prerequisites':[],'stepFree':None},
 {'id':'print','name':'Printmaking','start':'11:00','end':'12:00','seats':2,'prerequisites':[],'stepFree':False},
 {'id':'weave','name':'Weaving sampler','start':'12:30','end':'13:00','seats':1,'prerequisites':[],'stepFree':True},
 {'id':'sketch','name':'Evening sketch','start':'18:00','end':'19:00','seats':8,'prerequisites':[],'stepFree':True},
]
for item in classes:item['contact']=f'mailto:{item["id"]}@example.invalid'
definitions='''Field definitions: all workshops occur on the same synthetic day. start/end are local HH:MM times. seats is the count of currently bookable places; null means unknown. prerequisites lists required completed workshops. stepFree is confirmed true/false or unknown null. waitlist indicates an option to request a future vacancy, not a current seat. contact is a synthetic organiser email, not a real service. Preferences.completed lists workshops the resident has completed. No other household, health or personal characteristics may be inferred.\n'''
domain='''Interpret attendance as satisfying the resident's constraints for the entire workshop, not merely overlapping its start. A class that finishes after their availability ends cannot be recommended as attendable. Capacity, prerequisites and access are different facts; a positive seat count does not establish eligibility. Zero seats means no current booking even if a waitlist exists. Unknown capacity means confirmation is needed, not that a seat exists. Apply access constraints only when the resident requires them. An unknown access value cannot establish confirmed access. Distinguish a definite mismatch from uncertainty and explain both without hiding useful options. Preserve the reason behind each decision so later availability or access changes update the classification. Show the relevant times and constraints beside the contact action so residents know why contacting is worthwhile. Do not let a historical successful assessment override newer resident preferences.'''
generic='''Interpret the request in its full context and keep the user's intended outcome visible throughout the work. A solution should remain clear, practical and proportionate rather than accumulating unrelated functionality. Separate source facts, assumptions, implementation decisions and evidence so another agent can understand their different meanings. Use a consistent presentation and explain relevant outcomes in familiar language. Missing information should stay visible rather than being silently invented or hidden. Preserve existing constraints and do not introduce spending, services or new product capabilities without authority. Check the actual result rather than relying only on code inspection or a narrative of intended changes. Record the tested state and relevant limitations for the next reader. When requirements change, reconcile old and new instructions explicitly and update the work accordingly. Keep the handoff concise, concrete and useful for a fresh implementer who lacks conversation history.'''
# Match context length without changing task facts or hiding extra domain hints.
target=max(len(domain.split()),len(generic.split()))
def match_words(text):
 words=text.split();padding=['Keep','scope','and','evidence','explicit']
 return ' '.join(words+[padding[i%len(padding)] for i in range(target-len(words))])
guidance={'G':match_words(generic),'D':match_words(domain)}
assert len(guidance['G'].split())==len(guidance['D'].split())

common='''You are a producer for an isolated workflow trial. Read only this packet and your assigned source-data.json. Write HANDOFF.md in your arm directory. Produce a concrete brief for a fresh implementer: goal and sources, necessary inferred decision behavior with reasons, bounded implementation scope, treatment of unknowns, and observable evidence of enough. Do not merely tell the implementer to identify missing needs. Do not implement, browse, install, or inspect other arms/oracles. Use existing facts; label interpretations. Aim under 650 words. Your only write ownership is HANDOFF.md; other agents own other files.\n'''
consumer='''Consumer execution constraints: read REQUEST.md, source-data.json, HANDOFF.md and the starter app.mjs/index.html in this directory only, plus supplied phase updates. You own app.mjs, index.html and DELIVERY.md here; other agents own other directories and source data. Preserve their work. Implement one bounded slice and record goal-linked decisions, performed checks, limitations and current verdict in DELIVERY.md. Do not inspect evaluator files, producer packet or other arms; do not browse, install, deploy, use subagents or edit source-data.json. Existing local Node may be used for checks. No extra approval is needed for this isolated implementation.\n\nRuntime contract: app.mjs exports assess(workshop, preferences), returning {state, reasons}; state is available, unavailable, or needs-confirmation, reasons is an array of plain strings. index.html loads app.mjs. At runtime load ./source-data.json; do not hardcode fixture IDs or initial preferences. Render all workshops as article[data-id] with a data-state attribute, a visible reason for unavailable/uncertain states, and a contact action. Keep #preference-summary current and nonempty. This stable interface allows independent testing; the evaluator's expected outcomes are not supplied. Source-data.json is the sole runtime input. Vanilla browser modules only; no dependency required.\n'''
html='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Saturday workshops</title><style>body{font:16px system-ui;margin:32px auto;padding:0 20px;max-width:960px;background:#f7f6f0;color:#243b32}h1{font-size:36px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px}article{padding:20px;border:1px solid #cbd5c9;border-radius:8px;background:#fff}a{color:#295741}button,a{padding:6px}h2{font-size:20px}</style><h1>Find your Saturday workshop</h1><p id="preference-summary"></p><main></main><script type="module" src="app.mjs"></script></html>'''
app='''export function assess(workshop, preferences){return {state:'available',reasons:[]};}
if(typeof document!=='undefined'){
 const {workshops,preferences}=await (await fetch('./source-data.json')).json();
 document.querySelector('#preference-summary').textContent=`Available ${preferences.start} to ${preferences.end}`;
 for(const w of workshops){const result=assess(w,preferences);const card=document.createElement('article');card.dataset.id=w.id;card.dataset.state=result.state;const title=document.createElement('h2');title.textContent=w.name;const state=document.createElement('p');state.textContent=result.state;const link=document.createElement('a');link.href=w.contact;link.textContent='Contact organiser';card.append(title,state,link);document.querySelector('main').append(card);}
}
'''
manifest={'guidance_words':target,'files':{}}
for arm in ['G','D']:
 folder=BASE/arm;folder.mkdir(exist_ok=True)
 payloads={'REQUEST.md':request+definitions,'source-data.json':json.dumps({'preferences':preferences,'workshops':classes},indent=2),'PRODUCER.md':common+'\n'+request+definitions+'\nAdditional guidance:\n'+guidance[arm]+'\n','CONSUMER.md':consumer,'index.html':html,'app.mjs':app}
 for name,content in payloads.items():
  path=folder/name
  if path.exists():raise RuntimeError(f'Refusing to overwrite existing trial file: {path}')
  path.write_text(content,encoding='utf-8')
  manifest['files'][str(path.relative_to(ROOT))]=hashlib.sha256(path.read_bytes()).hexdigest()
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
assert (BASE/'G/source-data.json').read_bytes()==(BASE/'D/source-data.json').read_bytes()
assert (BASE/'G/CONSUMER.md').read_bytes()==(BASE/'D/CONSUMER.md').read_bytes()
print(f'Prepared two arms; guidance exactly {target} whitespace words each. Sources and consumer instructions identical.')
