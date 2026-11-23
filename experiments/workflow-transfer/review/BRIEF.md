# Safe batch rename CLI ? original task

Owner: ChouBokYann. This synthetic local task is authorized by the user-approved workflow comparison, not approved for production/main/deployment. All application actions and tests must use synthetic files inside this trial. No real Documents folders, external services, installs or Git mutations.

Build a small Python-standard-library CLI for a person tidying a folder from a CSV rename list. They need to understand exactly what will change before applying, trust that no content disappears or is overwritten, and undo an applied batch safely. The quality target is trustworthy preview and recoverable operation, not a rich UI.

## Interface (fixed so both implementations can be evaluated)
Run from any cwd with Python:
- rename.py preview --root ROOT --csv CSV --plan PLAN
- rename.py apply --root ROOT --plan PLAN --journal JOURNAL
- rename.py undo --root ROOT --journal JOURNAL

CSV is UTF-8, standard quoted CSV with header from,to. ROOT is an existing directory containing ordinary files only for this use case; names are single filenames, not paths. PLAN and JOURNAL are explicit paths outside ROOT in the surrounding synthetic fixture directory. Stdout is one valid JSON object, including ok: true/false; failed commands exit nonzero and report actionable errors. Successful preview also exposes changes as a list of {from,to} objects in request order and saves a reusable plan. The plan/journal's internal format is yours. Existing PLAN/JOURNAL files must never be overwritten implicitly; decline with an actionable error instead.

## Intended behavior
Preview must not modify any ROOT file. Validate the entire batch first: missing or duplicate sources, duplicate destinations under Windows case-insensitive naming, empty/invalid names, absolute or traversal paths, source/target symlinks and destinations occupied by unrelated files must be rejected. Clearly explain conflicts. Empty batches and unchanged source/destination entries may be rejected with explanation. Quoted commas and non-ASCII filenames are valid. Restrict operations to files directly in the supplied root; no recursive directories or link-following. Treat this as Windows behavior; no cross-platform guarantee required.

Allow legitimate swaps/cycles where every occupied destination is another source in the same valid batch. A preview records enough state to detect changed source contents, missing sources or new conflicting destinations before apply. Apply must revalidate current state and plan inputs; merely loading previously valid JSON is insufficient. A plan for a different root is invalid.

Apply executes the approved rename, preserving exact bytes and all unrelated files. On a filesystem error mid-batch, do not report success or silently leave a partial rename: restore original filenames/content where possible and explain any recovery limit. A successful application writes an undo journal. Reapplying the same plan must not repeat work or overwrite a journal.

Undo uses that journal and actual current state to restore original names/content, including swaps. If a destination's contents changed after apply or an original name is now occupied by an unrelated file, refuse before changing any files. Journal state must distinguish completed/undone/failed attempts; repeated undo must not destructively repeat work. No claim of protection against process termination, power loss or another process racing during an operation is required; document these limits rather than implementing a daemon/database.

## Work boundaries and evidence
Only own app/rename.py, app-local tests and fixtures, DELIVERY.md and HANDOFF.md within your assigned condition. You are not alone; do not modify brief, copied skills, evaluator, other condition or shared repo. Use the supplied implementation, verification and handoff skills and their bundled references; relative shared-contract references resolve to ../workflow-context.md. No other skill/repository/history reads or new agents. This is backend/CLI work, so no UI specialist or browser is needed. Write UTF-8 explicitly.

One autonomous initial attempt, ten-minute wall budget, at most two local correction rounds. Follow meaningful tests for behavior, report actual evidence and limits, and stop within the bound. The parent may later return one consolidated correction with a separate six-minute bound. No routine approval questions; missing choices have bounded defaults above. The next fresh reviewer will start with HANDOFF.md and follow its references, not inherit this conversation. Record one current verdict and the next action without inventing human acceptance.
