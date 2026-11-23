from pathlib import Path
import json,shutil,hashlib
R=Path(__file__).resolve().parents[2];B=Path(__file__).parent;O=R/'output/contract-enforcement';O.mkdir(parents=True,exist_ok=True)
assert not (B/'A').exists(),'Do not overwrite trial'
shutil.copytree(R/'experiments/autonomy-readiness/workflow-snapshot',B/'baseline')
shutil.copytree(B/'baseline',B/'candidate')
changes={
'skills/implementation/implement-increments/SKILL.md':'\n## Apply relevant feedback before changing the artifact\nFor a known failure that can recur in this change, identify its source, when it applies, and one preventive action or regression observation. Perform the action before recreating the failure where feasible; recording that the lesson was read is not application. Preserve current preferences separately from reusable rules. Use the existing work record, not a new report per lesson.\n',
'skills/verification/verify-change/SKILL.md':'\n## Check the claim, not just the record\nFor consequential source-derived user-visible facts, compare the actual output with what the source supports; a plausible elaboration is still an inference. Check the original goal and current feedback for omitted criteria. Distinguish an agent-authored success claim from observed execution evidence. A valid record or a screenshot file alone does not establish the claim. After relevant changes, reject old evidence or rerun the affected check.\n',
'skills/implementation/handoff-work/SKILL.md':'\n## Preserve actionable lessons\nFor a recurring failure, retain its source, applicability, concrete preventive action/check and latest evidence. Preserve superseded personal preferences as history, not general rules. Update the affected entry without repeatedly compressing the entire history; a saved lesson is not evidence that the next worker applied it.\n'}
for name,addition in changes.items():
 p=B/'candidate'/name;p.write_text(p.read_text(encoding='utf-8')+addition,encoding='utf-8')
feedback='''<a id="meaning"></a>
REQ-MATCH: Help the current user select a place they can actually use. Use current runtime preferences: entire interval must fit, available seats support partySize, discussion needs conversation, silent-work needs silent, and confirmed step-free access matters only when requested. Null means unknown. Known failure dominates uncertainty. The prior solo/group personal preference never overrides the current task.
<a id="interaction"></a>
REQ-SELECT: Keep unknown choices visible with what to ask. Clicking a different place must replace the whole detail, explanation and source contact. Short facts on cards, fuller explanation in details; readable phone/desktop layout. No accounts, booking, live services or messages.
<a id="grounding"></a>
REQ-FACTS: Do not invent physical features: stepFree=false supports Not step-free, not Stairs. A previous PowerShell/Python text replacement corrupted punctuation despite passing logic tests. Handle encoding explicitly and inspect changed rendered text, not just test exit codes. These are continuing user feedback/observed lessons; an earlier all-cards-rendered ready report is not acceptance.
'''
common='''Work autonomously within six minutes and at most three correction rounds; no routine permission questions, no other agents. Read own TASK.md,FEEDBACK.md,data.json, app/index and inherited MEMORY if present; select relevant permitted snapshot skills. You are not alone: own only app.mjs,index.html,DELIVERY.md,MEMORY.md and local tests/screenshots in your assigned directory, plus work.json if instructed. Inputs/snapshots/controller/oracle/receipts/other arms and prior experiments may not be read or edited except through authorized commands below. No web/install/external contact/deploy/git mutation. Record feedback applicability, actions, checks, remaining uncertainty and stop reason. Runtime interface assess(place,preferences)->{state,reasons}, states suitable/unsuitable/needs-confirmation; data.json sole input; all places article[data-id][data-state], button[data-select=ID], one #detail[data-id], current #preference-summary; source mailto. No fixture IDs/preferences hardcoded. Optional identical black-box runner for ALL arms: from repo root python experiments/contract-enforcement/controller.py run ARM PHASE. It returns diagnostic groups, evidence_ref and screenshot directory; you may read only your generated receipt/artifacts. Do not read controller/oracle source. Existing Node/Python allowed. Browser runtime import file:///C:/Users/maker/Documents/Projects/visuAI-DLC/visuAI-DLC/experiments/coffee-atlas/node_modules/@playwright/test/index.mjs; executable C:/Users/maker/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe. Inspect actual screenshots with view_image. Same-day HH:MM, capacity/null and access bool/null are supplied valid field types. No new dependencies.'''
contract={'version':1,'goal':'Choose usable study spaces and the correct organiser','applications':[{'requirement':k,'source':f'FEEDBACK.md#{v}','applicability':'unresolved','reason':'Replace with source-grounded applicability','action':'Replace with concrete action/check','check_id':v} for k,v in {'REQ-MATCH':'meaning','REQ-SELECT':'interaction','REQ-FACTS':'grounding'}.items()],'evidence_ref':None}
for arm in 'ABCD':
 for phase in ['build','transfer']:
  d=B/arm/phase;d.mkdir(parents=True)
  source=R/'output/autonomy-readiness/baseline/W'
  data=json.loads((source/'data.json').read_text())
  if phase=='transfer':
   data['preferences']={'partySize':1,'start':'18:00','end':'19:00','activity':'silent-work','stepFreeRequired':False}
   for p in data['places']:
    p['noise']='conversation' if p['id']=='elm' else 'silent';p['id']='new-'+p['id'];p['name']='Annex '+p['name'];p['description']='Catalogue noise policy: '+p['noise']+'.';p['contact']=p['contact'].replace('mailto:','mailto:new-')
  (d/'data.json').write_text(json.dumps(data,indent=2),encoding='utf-8');(d/'FEEDBACK.md').write_text(feedback,encoding='utf-8')
  task=('Repair this finder for three people discussing18:00-20:00 with required step-free access.' if phase=='build' else 'Adapt the inherited finder for a NEW solo user working silently18:00-19:00. Step-free access is not required. Current source preferences supersede earlier personal needs; retain applicable feedback.')+' Use the supplied synthetic catalogue and feedback, a simple readable cream UI and comparison/contact scope. Exact styling delegated. Preserve unknown facts and do not invent facts. No live services or messages.\n'
  (d/'TASK.md').write_text(task,encoding='utf-8')
  if phase=='build':
   for name in ['app.mjs','index.html']:shutil.copyfile(source/name,d/name)
  extra='\nSnapshot: ../../'+('baseline' if arm=='A' else 'candidate')+'/docs/workflows/deliver-change.md\n'
  if arm in 'CD':
   (d/'work.template.json').write_text(json.dumps(contract,indent=2),encoding='utf-8')
   extra+='Read work.template.json; create work.json using that exact shape and requirement/source/check IDs. Fill applicability/reason/action before implementation and keep current. evidence_ref is null until a real run; no agent-authored passed field. Validate with python experiments/contract-enforcement/controller.py validate ARM PHASE. Work schema is readable at ../../work.schema.json. This is a prototype execution view, not a new source of user requirements.\n'
  if arm=='D':extra+='Completion is host-gated. Before requesting completion, obtain a real runner receipt for current state, copy evidence_ref into work.json (this reference-only change does not invalidate it), and invoke controller.py complete ARM PHASE. Structural validity alone is insufficient. Host may return a rejection within remaining budget; a rejected gate means incomplete, not accepted.\n'
  (d/'RUN.md').write_text((common+extra+f'\nURL http://127.0.0.1:17833/{arm}/{phase}/\n').replace('ARM',arm).replace('PHASE',phase),encoding='utf-8')
(O/'input-hashes.json').write_text(json.dumps({str(p.relative_to(R)):hashlib.sha256(p.read_bytes()).hexdigest() for p in B.rglob('*') if p.is_file() and '__pycache__' not in str(p)},indent=2),encoding='utf-8')
print('Prepared four conditions and two tasks; only candidate snapshots changed.')
