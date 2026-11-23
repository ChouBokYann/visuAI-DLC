# D delivery — phase 2 current verdict

Current requirements: available 10:00–13:00, confirmed step-free access required, no completed prerequisites. The historical 10:00–14:00/no-access-requirement verdict is superseded.

Current verdict: implemented and verified with fresh local Node assessment and minimal DOM simulation. No rule changes were necessary because the view and controls read current source preferences. Converted app.mjs and index.html to UTF-8 after the first phase 2 check exposed a malformed time separator; the rerun passed, including an exact Unicode separator check.

Current decisions:
- Attendable: Intro to woodwork, Weaving sampler (ends exactly at 13:00).
- Confirm first: Simple circuits (seats unknown), Bookbinding (required access unknown).
- Unavailable: Clay forms (ends too late), Metal basics (starts too early), Glass colour (no current seats; waitlist only), Advanced joinery (missing wood-basic), Printmaking (not step-free), Evening sketch (outside availability).

Fresh checks passed: all ten current states; all rendered assessment reasons and source contact destinations; source-derived form values and current summary; attendable ordering; seats/access/waitlist contact labels; and changing to historical preferences then back to current preferences removes the earlier successful assessments.

Prior evidence applicability: phase 1 baseline outcomes below document history only. Generic logic checks for inclusive boundaries, prerequisite IDs, capacity transitions, mixed reasons, and contact preservation remain relevant; current acceptance rests on the fresh phase 2 checks above. The runnable smoke check below now expects phase 2 source data.

## Phase 1 implementation and historical evidence

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
assert.deepEqual(workshops.map(w=>assess(w,preferences).state),['available','unavailable','unavailable','unavailable','needs-confirmation','unavailable','needs-confirmation','unavailable','available','unavailable']);
for(const w of workshops) {
  const r=assess({...w,seats:null,stepFree:null,prerequisites:['uncompleted']},{...preferences,completed:[],stepFreeRequired:true});
  assert.equal(r.state,'unavailable');
  assert.ok(r.reasons.length>=3);
}
console.log('Assessment smoke check passed');
'@ | node --input-type=module
```

Historical verdict: phase 1 implemented and local checks passed for the former preferences; superseded by phase 2 above.

Limitations: no real browser visual/layout test, mail client launch, deployment or external contact performed. The runtime expects the supplied catalogue schema; no general catalogue editor or enrichment was added. Seat counts are supplied snapshots, not live guarantees.
