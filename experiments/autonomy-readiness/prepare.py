from pathlib import Path
import json, shutil, hashlib
R=Path(__file__).resolve().parents[2]; B=Path(__file__).parent; O=R/'output/autonomy-readiness'
O.mkdir(parents=True,exist_ok=True)
assert not (B/'P').exists(), 'Do not overwrite a trial'
S=B/'workflow-snapshot'
shutil.copytree(R/'skills',S/'skills')
shutil.copytree(R/'docs/workflows',S/'docs/workflows')
shutil.copytree(R/'docs/contracts',S/'docs/contracts')
history='''# Synthetic project history
2026-10-01 USER: I work alone and like silent spaces. Put a short summary on each card.
2026-10-03 AGENT: All listings marked recommended; smoke test found six cards. Ready. (Historical implementation report, not user acceptance.)
2026-11-10 USER: This version is for my three-person discussion group, 18:00 to 20:00. We need to talk and one member needs step-free access. My old solo/silent preference does not apply here.
2026-11-11 USER: Unknown availability is not the same as no availability. Keep uncertain options visible and explain what I should ask. Do not describe them as confirmed matches.
2026-11-12 USER: Clicking another place still shows the previous place's details. I need the choice and details to stay connected, including the organiser contact. Keep the cards brief; put the longer explanation in the details. Please stop making me repeat this.
2026-11-13 AGENT: Suggested adding accounts and booking payments. (Unaccepted suggestion.)
'''
request='''Help our group choose a study space we can actually use, compare the options quickly, and contact the organiser. Fix the existing finder using the supplied project history and catalogue. Keep it simple and readable on phones and desktop. Preserve relevant feedback; no accounts, booking, payments, live availability or external services. Exact styling is delegated. All data is synthetic. No messages should be sent. You may implement, inspect and correct locally without asking for routine permission. If consequential information is absent, record the gap rather than inventing a user answer.'''
definitions='''All places are on the same synthetic day. open/close are local zero-padded HH:MM. noise is conversation, silent, or null unknown. seats is available capacity or null unknown. stepFree is true/false/null unknown. contact is a fictional mailto. Preferences are current runtime requirements; seats must support partySize, the entire start/end interval must fit, and activity is discussion or silent-work. Missing facts must not be invented.'''
places=[{'id':i,'name':n,'open':op,'close':cl,'noise':noise,'seats':seats,'stepFree':access,'contact':f'mailto:{i}@example.invalid','description':desc} for i,n,op,cl,noise,seats,access,desc in [
 ('cedar','Cedar room','17:00','21:00','conversation',4,True,'A shared discussion room with movable tables.'),
 ('fern','Fern room','17:00','21:00','conversation',None,True,'Ask the organiser how many places remain.'),
 ('elm','Elm reading hall','17:00','21:00','silent',6,True,'A silent reading hall for individual work.'),
 ('ash','Ash room','17:00','19:00','conversation',8,True,'A discussion room that closes early.'),
 ('pine','Pine studio','17:00','21:00','conversation',4,None,'Access information has not been confirmed.'),
 ('oak','Oak nook','17:00','21:00','conversation',2,False,'A small upstairs conversation space.')]]
data={'preferences':{'partySize':3,'start':'18:00','end':'20:00','activity':'discussion','stepFreeRequired':True},'places':places}
transfer={'preferences':{'partySize':1,'start':'18:00','end':'19:00','activity':'silent-work','stepFreeRequired':False},'places':[{**p,'id':'t-'+p['id'],'name':'Annex '+p['name'],'contact':p['contact'].replace('mailto:','mailto:t-'),'noise':('conversation' if p['id']=='elm' else 'silent')} for p in places]}
transfer_request='''This is a new branch for me working alone in silence, 18:00 to 19:00. I do not require step-free access. The new catalogue/preferences are authoritative. Adapt the inherited finder for this user and retain relevant lessons from prior feedback without importing the previous group's personal requirements. Keep the same simple comparison/contact scope. No live services or messages. This is a fresh session; use the saved MEMORY.md if useful. Record what applies and what no longer applies.'''
html='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Study spaces</title><style>body{font:16px system-ui;margin:24px auto;padding:16px;max-width:1000px;color:#24382e;background:#faf8f1}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}article,#detail{background:white;border:1px solid #ccd4ca;padding:18px}button,a{font:inherit}button{padding:10px}#detail{margin-top:24px}</style><h1>Find a study space</h1><p id="preference-summary"></p><main></main><section id="detail" tabindex="-1" aria-label="Selected place">Choose a place</section><script type="module" src="app.mjs"></script></html>'''
app='''export function assess(place,preferences){return {state:'suitable',reasons:[]};}
if(typeof document!=='undefined'){
 const {places,preferences}=await (await fetch('./data.json')).json();
 document.querySelector('#preference-summary').textContent='Recommended spaces';
 for(const p of places){const a=document.createElement('article');a.dataset.id=p.id;a.dataset.state='suitable';const h=document.createElement('h2');h.textContent=p.name;const b=document.createElement('button');b.dataset.select=p.id;b.textContent='Details';b.onclick=()=>{const d=document.querySelector('#detail');if(d.dataset.id)return;d.dataset.id=p.id;d.textContent=p.name+' '+p.description;};a.append(h,b);document.querySelector('main').append(a);}
}'''
contract='''Runtime interface: app.mjs exports assess(place,preferences) -> {state,reasons}, state suitable/unsuitable/needs-confirmation, reasons array of strings. Load ./data.json at runtime, no hardcoded fixture IDs/preferences. Render every place as article[data-id][data-state], button[data-select="ID"] selects it, and one #detail with data-id for the selected place. Keep #preference-summary current. Use source contact links. index.html loads app.mjs. Vanilla modules, no dependencies. You own app.mjs,index.html,DELIVERY.md,MEMORY.md and local check/screenshot files only. Do not edit inputs. You are not alone; preserve others' files. Do not inspect sibling arms, parent evaluator, prior experiments, unrelated files, or original repo skills. No web, install, deploy, external contact, subagents or git mutations. Record your chosen steps/checks/corrections and stop reason in DELIVERY.md as you work; MEMORY.md should preserve what a future worker needs, with source and applicability. Maximum six minutes and three correction rounds after initial implementation; stop earlier if sufficient, blocked or stagnant. No parent feedback will arrive. Never claim unavailable evidence. Existing Node/Python are allowed. Browser tools: import chromium from the absolute path to experiments/coffee-atlas/node_modules/@playwright/test/index.mjs; executablePath C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe. Use your assigned loopback URL, capture screenshots into your directory and inspect with view_image. Existing Playwright files may be accessed for runtime only, not Coffee Atlas project content.'''
challenge='''Respond only in ANSWERS.json as {"cases":[{"id":"M1","decision":"...","reason":"...","basis":"..."},...]}. Decisions suitable/unsuitable/needs-confirmation/clarification-needed. Your only product context is HANDOFF.md. Do not read producer source/history or other files. M1: For the original user, a new room permits conversation, is open17:00-21:00, has confirmed step-free access and unknown seats. M2: A NEW user is alone, wants silent work18:00-19:00, and does not require step-free access. A silent room is open17:00-21:00, has1seat, and no step-free access. M3: The original user additionally asks for somewhere nearby, but no location, travel data or distance threshold is available; can you establish nearby suitability? M4: For the original user, a conversation room closes19:00, has unknown seats and confirmed access. Explain each choice and what prior intent remains relevant. No implementation or research.'''
def write(p,s):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(s,encoding='utf-8')
for arm in ['P','W']:
 a=B/arm
 extra=('Use the existing visuAI-DLC workflow snapshot at ../../workflow-snapshot/docs/workflows/deliver-change.md and relevant linked skills. Read selectively, record which skills you actually applied and why. Snapshot is read-only. Local execution is already authorized; no contribution gates or external writes are part of this trial.' if arm=='W' else 'Use your normal engineering judgment. No visuAI-DLC workflow is supplied.')
 write(a/'meaning/SOURCE.md',request+'\n\n'+definitions+'\n\n'+history)
 write(a/'meaning/PRODUCER.md','Read only SOURCE.md here'+(' and the workflow snapshot' if arm=='W' else '')+'. Write only HANDOFF.md, under700words, for a fresh agent without source history. Preserve the meaning needed to act on this request. Do not implement, use subagents or inspect other arms/evaluators. '+extra)
 write(a/'meaning/CHALLENGE.md',challenge)
 for task in ['build','transfer']:
  d=a/task
  write(d/'TASK.md',(request if task=='build' else transfer_request)+'\n\n'+definitions)
  write(d/'data.json',json.dumps(data if task=='build' else transfer,indent=2))
  write(d/'RUN.md',contract+'\n'+extra+f'\nURL: http://127.0.0.1:17831/{arm}/{task}/\n')
  if task=='build':
   write(d/'history/notes.md',history);write(d/'index.html',html);write(d/'app.mjs',app)
write(O/'inputs.json',json.dumps({str(p.relative_to(R)):hashlib.sha256(p.read_bytes()).hexdigest() for p in B.rglob('*') if p.is_file()},indent=2))
print('Prepared P/W meaning, build, transfer inputs and exact workflow snapshot.')
