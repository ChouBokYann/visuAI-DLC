# D delivery — phase 1

Implemented the bounded workshop selection view in app.mjs and index.html. Owner: experiment requester; agent responsibility: D consumer implementation only. Source data was not edited.

Goal-linked decisions:
- Entire workshop must fit the inclusive availability window; prerequisite identifiers match exactly.
- Definite failures take precedence over uncertainty while all reasons remain visible.
- Unknown seats require confirmation; waitlists never count as current seats.
- Access affects eligibility only when required. Its known/unknown status remains visible regardless.
- Attendable alternatives appear first without inventing a best subject or a combined itinerary.
- Supplied mailto destinations are retained, with seats/waitlist/access contact labels where relevant.
- A small preference form replaces the current assessment and summary on update; invalid time ranges keep the previous preferences.

Performed checks (local Node, passed):
- All ten baseline states matched the handoff table.
- Ending availability at 12:00 excludes Clay and Bookbinding.
- Required step-free access makes Bookbinding uncertain and Printmaking unavailable.
- Positive/zero circuits seats switch to available/unavailable.
- Completing wood-basic makes Joinery available.
- Combined time failure, missing prerequisite, unknown seats and unknown required access retain all four reasons and yield unavailable.
- Minimal DOM simulation rendered ten cards, checked every contact destination against source, checked seats/waitlist labels, and verified changed preferences replace card states and summary.

Runnable assessment smoke check from repository root (PowerShell):
```powershell
@'
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {assess} from './experiments/goal-action/D/app.mjs';
const {workshops,preferences}=JSON.parse(await readFile('./experiments/goal-action/D/source-data.json','utf8'));
assert.deepEqual(workshops.map(w=>assess(w,preferences).state),['available','available','unavailable','unavailable','needs-confirmation','unavailable','available','available','available','unavailable']);
for(const w of workshops) {
  const r=assess({...w,seats:null,stepFree:null,prerequisites:['uncompleted']},{...preferences,completed:[],stepFreeRequired:true});
  assert.equal(r.state,'unavailable');
  assert.ok(r.reasons.length>=3);
}
console.log('Assessment smoke check passed');
'@ | node --input-type=module
```

Verdict: phase 1 implemented and local checks passed. Awaiting any subsequent requirements update.

Limitations: no real browser visual/layout test, mail client launch, deployment or external contact performed. The runtime expects the supplied catalogue schema; no general catalogue editor or enrichment was added. Seat counts are supplied snapshots, not live guarantees.
