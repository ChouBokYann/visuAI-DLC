# Business-connected outputs: validation record

Date: 2026-11-15. Human owner: ChouBokYann. The user explicitly accepted implementation in this session. This is author validation of branch work, not independent maintainer acceptance, production readiness, or permission to merge main.

## Delivered boundary

All 19 candidate skills now identify their contribution to the shared contract and how to preserve existing business context. Fifteen existing templates point to its authoring shape; skills without their own template use the same shared reference. Markdown owns the records. The exporter reuses the existing duplicate-key-safe PyYAML loader, creates a bounded derived JSON snapshot, and preserves previous output if validation or atomic replacement fails. No new package, server or database was introduced.

The viewer accepts both its original version 1 sample and document-derived version 2 snapshots. Version 2 begins at an outcome and exposes explanations, relationship reasons, sources, evidence scope and incomplete context. Technical revision mismatch remains stale; business measurement is never implied by a functional pass. No arbitrary Markdown HTML is rendered.

## Observed checks

- All 19 skill folders passed the installed skill-creator `quick_validate.py` under Python UTF-8 mode. An initial invocation without UTF-8 mode failed to decode two existing Unicode skill files under Windows cp1252; rerunning with `-X utf8` passed. No skill text was changed merely to mask that environment issue.
- `python -B -X utf8 -m unittest discover -s tests -v`: 19 tests passed (7 existing, 12 new). Checks cover source trace, supersession, unchanged historical evidence, technical/business separation, explicit gaps, partial coverage, source hashes, duplicate keys/owners, schema/type/reference errors, size limits, unsafe paths/URLs, cycles and last-valid-output preservation, including injected replacement failure.
- `node --test experiments/project-overview/model.test.cjs experiments/project-overview/app.test.cjs`: 17 tests passed. This includes Python-generated fixture input imported into the DOM double, navigation to stale evidence, partial coverage warnings, inert explanation text, and preservation of the old sample behaviour. An initial regression in the change evidence-link predicate was caught by the old import test and fixed before the passing run.
- Executed the updated Ideation setup block in an empty temporary project: 12 skill files copied and the shared contract matched its source hash. A second run stopped before overwriting with `Already installed: clarify-problem`. The installer was not run against the user's real project. This checks layout/copy behaviour, not fresh-agent adherence.
- Browser automation inventory reported `The browser access host is unavailable`. Chrome was listed as a native app, but no browser automation surface was exposed. No real-browser layout, keyboard, file-picker, accessibility or mobile claim is made; DOM-double tests are narrower.

## Six scenario walkthroughs

These are author-applied routing checks against the updated instructions, not observed independent model trials. Each scenario uses an existing work record and retains a short human handoff.

| Scenario | Applicable output | Business context and failure behaviour |
|---|---|---|
| Hotfix | Diagnosis evidence -> change implementing an existing requirement -> technical evidence | Reuse the requirement's outcome link. If absent, one explicit gap and next action suffice; do not invent a new business case. A passing regression check does not measure business benefit. |
| Feature | Requirement supports outcome; decision aims at outcome; change implements them | Existing Ideation inputs skip repeated discovery. Conditional provider capability remains conditional until checked. |
| Design change | Product/technical decision and implementing change, or scoped experiment evidence | Preserve the alternative and intended benefit. A visual preference or simulated prototype response is not measured business success. A design-only request stops before implementation. |
| New module | Interface decision, requirements, consumer change and evidence | Refer to the existing outcome; module boundaries do not create independent business goals. Missing consumer compatibility remains a gap. |
| Modularisation | Refactor change and scoped behaviour-preservation evidence | Link to an existing maintenance/operational requirement where one exists. If rationale is unrecorded, expose it rather than asserting cost savings. |
| Logic comparison | Technical evidence assessing the requirement and identified revision/context | The comparison can stop without changes or new product decisions. Equivalent examples do not prove all behaviours equivalent or the business outcome achieved. |

Multi-agent handoff walkthrough: worker A owns the implementation document; worker B owns verification evidence and references A's change ID. The integrator exports their combined baseline. Duplicate ownership fails instead of selecting the last writer. If B references a missing change, complete export fails; a deliberately partial preview names the unresolved ID and cannot claim full coverage. Concurrent editing of one document still requires host/worktree coordination; the exporter is not a distributed lock manager.

## Remaining limits

Real-project comprehension and full-workflow agent trials remain deferred at the user's request. No live Symphony session, remote evidence availability check, server deployment, or production capacity benchmark ran. Skill validation and synthetic examples do not establish reliable agent adherence or token savings.

The exporter reads bounded local files and hashes the bytes read; it does not create a transactional filesystem snapshot or authenticate the caller's baseline label. Use a pinned integrated checkout for publishing. The viewer does not independently verify claims or author authority. Business evidence preserves observation context, with no automatic freshness/cause inference. Explanatory Markdown is shown as plain text; formatting polish is a later usability concern.

Independent maintainer review and main merge are still outstanding. The server proposal remains superseded in its canonical-database design and must be revised around document ingestion before implementation.
