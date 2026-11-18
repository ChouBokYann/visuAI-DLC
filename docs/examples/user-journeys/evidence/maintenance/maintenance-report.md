# Independent maintenance trial

Outcome: **Updated** within the copied project recipe and its three mapped features. No repository files were edited by this evaluator.

## Scope and preserved inputs

Product HEAD: `a21d3373f1eec991a3269e81caefb3195cc5ae49`; exact dirty paths, tested input hashes and runtime versions are in each run's `summary.json`. Existing author-created tools were reused: Python 3.13.14/PyYAML 6.0.2, Node 26.13.0, Playwright 1.58.2, Chrome 157.0.8103.79. This is an independent new execution on the same host, not an independent machine installation.

`before/` preserves the recipe and feature documents with deliberately seeded drift: two occurrences of Import snapshot became Open records in `features/import-inspect.md`. `maintained/` preserves the corrected copy; `recipe.diff` is the complete correction. Copies reference the canonical repository helper; they are trial evidence, not a relocated standalone package. The repository recipe remains the cold-run entry point.

## Inspection and classification before correction

- Source: `experiments/project-overview/react/src/App.tsx:172-174` exposes the Import snapshot button and file input. Lines 135-147 parse/validate before replacing the loaded snapshot; errors set an alert. Lines 221-223 expose the Record summary region and canonical title/summary.
- Source: `docs/examples/business-context/baseline-b/delivery.md:9-13` supplies PROBLEM-001 and its independent expected summary. The map lists export-records, import-inspect and reject-invalid.
- Live evidence: `observed-behavior/live-control-snapshot.json` preserves an actual browser frame from trace.zip showing a BUTTON with aria-label/title Import snapshot. No Open records text appears in this captured frame. `control-observations.json` records successful readiness and click selectors using the Import snapshot role/name. This is runtime DOM evidence, not only a source substitution.
- `observed-behavior/summary.json` records all three features passing before recipe correction. Thus this seeded finding is stale navigation documentation with working behavior, not a demonstrated product regression.

Only then were the two stale names corrected. The final canonical-helper execution corresponds to those corrected actions, and reran every mapped feature. During review the canonical helper and feature descriptions gained a stronger source-to-browser oracle: an independently established per-run summary marker, plus use and hashing of the real vite.config.ts. The maintained copy was synchronized with those descriptions before the final-strengthened run. Earlier observed-behavior and final-verification runs remain historical evidence; final-strengthened is the current acceptance run.

## Final feature evidence

| Feature | Result | Evidence |
|---|---|---|
| export-records | Passed | final-strengthened/export-command.json, source/, snapshot.json; unique imported project, eight exported records and expected fixture summary including the independently established unique per-run marker |
| import-inspect | Passed | final-strengthened/trace.zip, control-observations.json, import-inspect.png; real file chooser/upload and exact visible summary including the per-run marker, so retained sample content cannot satisfy the assertion |
| reject-invalid | Passed | final-strengthened/malformed.json, trace.zip, reject-invalid-alert.png, reject-invalid-retained.png; visible Unexpected end of JSON input and same project/eight records/summary retained |

The evaluator inspected the rendered initial import screenshot and final invalid-import screenshot. They show the unique imported project identity, eight-record count, readable record summary, and (for invalid input) the visible error banner. The helper verifies the retained summary text again.

All three runs had no pageerror events. browser-log.json retains one generic resource-404 console message; its resource was not identified by the captured network trace, so this report does not claim an entirely error-free console or invent a favicon explanation. The mapped behavior still passed. Babel also printed an informational large-dependency formatting notice.

## Cleanup

All three helper reports record browserClosed/serverClosed true with no cleanup errors. `cleanup-verification.json` independently probes all three owned ports after completion (connection refused) and records nonzero retained artifact sizes. Evidence and source copies remain readable after browser/server/cache cleanup. Shared pre-existing tools were not removed, and pre-existing port 5173 was untouched.

## Bounded instruction checks

These five cases are reasoning checks against skill instructions, not live incidents, measured skill accuracy, or statistical evaluation.

| Input scenario | Required handling from the skill | Instruction assessment |
|---|---|---|
| Missing recipe | Route to Exercise user journey, establish a bounded recipe/map, and exercise it; do not invent a maintenance pass | Explicit first-section route is adequate |
| Missing credentials | Record the attempted path/unmet access prerequisite as Incomplete; continue only supported coverage; do not fabricate success | Explicit classification and incomplete outcome are adequate |
| Real product regression | Preserve reproduction/expectation and route product correction to Implementation; report Issues found and any missing evidence separately | Explicit classification avoids relaxing expectations |
| Broken harness | Confirm working behavior independently, repair the recipe-owned harness within scope, and prove repair live; rerun all mapped features | Explicit scope and live-proof requirements are adequate; no injected broken-harness run performed |
| Unchanged recipe | Run all mapped features, verify cleanup/evidence, report Clean only if no correction needed and all succeeded | Explicit Clean definition is adequate |

## Limits

This successful exercise covers the synthetic desktop export/import/summary/rejection path only. It does not verify lifecycle navigation, story/worktree modes, other browsers/mobile, production deployment, measured business benefit, all exceptional cleanup failures, or installations on other hosts. The initial source-only baseline lacked this operational recipe and remained incomplete; that baseline result is not evidence of a product defect.

## Final strengthened run

Summary: `final-strengthened/summary.json`; helper SHA-256 `4c7598aec2879bf8b99ec81d49a575f2fc0c16acc588730254ddf8eb1200c890`. The actual app Vite config hash is `4a477da7f1d664683839562dcf4b4a7816b6471fe3e136e17de6e94fc21acad4`. The final inspected summary was: Workers cannot easily identify cafes with the amenities they need. Imported record marker journey-abf0c599-891b-4520-9b30-741fb89e198c.
