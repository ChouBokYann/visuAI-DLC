# Brief completeness pilot / proposal draft

Owner: ChouBokYann. User explicitly authorized this local comparison on 2026-11-23. Related issue #7 covers skill exploration; issue search found no specific brief-completeness proposal. This local draft follows the change-proposal fields below. No GitHub publication, independent maintainer approval or main adoption is claimed.

## Change, problem and scope
Planning/verification: compare the existing set-ui-direction skill with a small goal-interpretation refinement if baseline gaps justify one. Prior explicit-task tests reached a ceiling and did not test omissions. Two sparse briefs (coffee atlas and ceramics discovery), independent frozen evaluation criteria, and fresh-agent consumption after fixed feedback. This is a document/handoff test, not rendered UI or implementation. Canonical skills and unrelated edits remain unchanged. No new schema or graph infrastructure.

## Solution and alternatives
Run baseline first. A separate fresh evaluator freezes source-grounded criteria before seeing outputs; optional inferred preferences cannot be scored as mandatory facts. If a gap exists, adapt only the relevant snapshot instruction and run the candidate with identical sources/budgets. If baseline is sufficient, record that rather than inventing a change. Reuse the current skill versus adding an interpretation checkpoint; doing nothing is a valid result. More documents or words do not earn points.

## Acceptance and validation
Preserve original vs inferred requirements and missing facts; measure substantive omissions, unsupported commitments and ability to act without consequential guessing. Evaluate the whole discovery-to-action journey and concrete failure examples. Both initial briefs max 600 words each. One fresh consumer per condition receives only its initial briefs and identical new synthetic user feedback, never original conversation or evaluator rubric. Measure inherited-goal loss, new-feedback coverage and repeated diagnostic requests. At most one corrective feedback turn per consumer if needed. Preserve every pre/post revision. Do not claim learning efficiency without a no-memory control or quality from text alone.

## Ownership, tools and bounds
Parent owns setup, snapshots, archives and results in experiments/brief-completeness and output/brief-completeness. Evaluator owns review rubric and assessment only. Producers/consumers own their assigned two brief files and DELIVERY.md only. Shared filesystem boundaries are instructions, not a security sandbox. Fresh agents have no parent conversation; no other agent spawning. Initial and transfer workers: five minutes, one initial attempt, maximum one later correction turn within a separate two-minute bound. Evaluator: five minutes per assigned phase. Parent may read all results but may not repair arms. Normal host model inference only; stdlib/file tools, no added packages/services/spending/external writes. Ruflo tool discovery found no exposed Ruflo tools.

## Sources, impact, risks and rollback
Copy current local skill with its existing pinned Superpowers/BMAD attribution and notices. Candidate wording, if justified, is original project adaptation. Superpowers writing-skills process supplies baseline-first testing; no upstream runtime copied. Existing workflow-context remains the source contract. Risks: tiny unblinded interpretation study, evaluator judgment, candidate designed after baseline on same tasks, explicit sources and budget effects. This is exploratory, not a causal benchmark. Reversibility: remove only this new experiment/output directory; do not delete prior work. No user-facing compatibility changes.

## Open questions
No task-blocking user decisions: unresolved design choices belong in the briefs. Future promotion needs ordinary maintainer review. Full UI quality, actual browser journeys and feedback-effort reduction remain untested.
