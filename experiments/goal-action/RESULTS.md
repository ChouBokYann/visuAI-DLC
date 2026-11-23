# Goal-to-action pilot results

Date: 2026-11-23. Local experiment completed; no canonical skill changes or push.

## Finding

Both a generic-guidance handoff and a domain-guided handoff produced working attendance decisions and handled changed requirements. No functional advantage for domain guidance was observed in this task. This supports feasibility of a concrete producer-to-consumer contract, not a causal claim that either prompting method improves results.

| Evidence | Generic G | Domain D |
|---|---:|---:|
| Producer criteria: concrete needs, sources, unknowns, bounded scope | 4/4 | 4/4 |
| Starter negative control, fixed checks | 14/27 | 14/27 |
| Initial implementation, fixed checks | 27/27 | 27/27 |
| Changed requirements, same fixed checks | 27/27 | 27/27 |
| Fresh completion evidence; old preferences superseded | Yes | Yes |
| Phase 1 screenshot inspection | Readable | Corrupted punctuation |
| Phase 2 screenshot inspection | Readable | Encoding corrected |

The 27 checks comprise ten catalogue classifications with reason-array checks, nine unseen boundary/capacity/prerequisite/access cases, and eight browser assertions across 390px and 1280px viewports. Browser assertions cover displayed states/contact presence, current preference summary, overflow and page errors. They do not establish overall visual quality. Counts combine different checks and are not independent statistical samples.

## What actually happened

Both producers inferred full-session time containment, exact prerequisite matching, capacity uncertainty, and waitlist semantics. D made changing access requirements and recomputation more explicit. G supplied an explicitly labelled earliest-start recommendation, although the user supplied no ranking preference. Both named concrete baseline outcomes rather than delegating missing-needs discovery to the implementer.

Fresh consumers built separate apps. Both initially selected five individually eligible workshops. After the availability window shortened to 13:00 and confirmed step-free access became required, both selected only Woodwork and Weaving. Bookbinding became uncertain; Printmaking and Clay became unavailable. Neither needed eligibility logic changes. Both distinguished historical evidence from new acceptance evidence and disclosed that their own tests used a DOM adapter rather than a real browser.

Parent Playwright checks passed in both phases. Inspection of all eight implementation screenshots verified visible reasons and exposed D's broken punctuation in phase 1, despite passing automated assertions. Without receiving evaluator feedback, D independently found the encoding problem during phase 2, converted its files to UTF-8, and checked the exact separator. Phase 1 evidence remains archived. G also reports correcting an encoding issue during its initial implementation. These are environment-sensitive defects, not evidence that domain guidance causes or prevents defects.

The final pages are usable simple lists, not polished design demonstrations. G has lengthy introductory copy and its current delivery verdict is appended below historical phase 1 text. D puts its current verdict first and uses a shorter introduction, but adds a preference-editing form beyond the minimum runtime-data requirement and exposes prerequisite identifiers. These are scope/presentation observations, not extra retroactive scoring criteria. No booking, accounts, payment or external service was added.

## Implication for visuAI

The useful contract is small: original goal -> concrete decision conditions with their basis -> implemented behavior -> observed evidence tied to current constraints. A consumer must distinguish a source fact, an inferred rule, a discretionary choice, and a verified result. A changed requirement should invalidate only the evidence it affects, with fresh checks before a current completion claim.

This trial does not justify adding ontology infrastructure or another mandatory skill. Both ordinary and enriched prompts already succeeded with the supplied scaffold. A future test should target unresolved meaning: sparse facts, competing interpretations of the user's goal, and whether an agent asks a consequential question or states a justified assumption before creating acceptance criteria. For visual work, separately judge the whole user journey against the original intent; a list of passing component tests cannot establish a coherent map or satisfying exploration experience.

## Evidence and reproducibility

- Protocol: [README.md](README.md); generator: [prepare.py](prepare.py); fixed evaluator: [evaluate.mjs](evaluate.mjs).
- Frozen input hashes: [manifest](../../output/goal-action/manifest.json) and [trial hashes](../../output/goal-action/frozen-trial.json).
- [Producer review](../../output/goal-action/producer-review.md).
- Raw checks: [baseline](../../output/goal-action/baseline/results.json), [phase 1](../../output/goal-action/phase1/results.json), [phase 2](../../output/goal-action/phase2/results.json).
- Each phase output directory contains exact app, HTML, data, handoff, delivery snapshots and desktop/mobile screenshots. Final current source remains in G/ and D/.
- To rerun current-state checks, serve experiments/goal-action on 127.0.0.1:17830 and run `node experiments/goal-action/evaluate.mjs phase2` from repository root. The evaluator uses this machine's existing Coffee Atlas Playwright install and Chromium path. It writes phase2 evidence, so preserve the archive before rerunning. The fixture generator intentionally refuses to overwrite trial files.

No evaluator feedback or parent repairs were supplied to consumers. One initial implementation and one preplanned requirement update per arm; no additional agent attempts. Normal local self-check corrections occurred inside those phases.

Limitations: one task and one pair per condition; unblinded parent evaluation; ordinary domain facts that the model likely already knows; an explicit shared runtime interface and source-field definitions; both producers receive a strong concrete-handoff instruction. Word counts match, tokens and complexity need not. Both consumers can read original source facts, so success cannot be attributed to the handoff alone. The historical memo is explicitly labelled stale, making supersession easier. This adapts contextual rules from the cited papers, not their ontology engines or training methods. Form interaction, keyboard/screen-reader accessibility, mail-client launch, deployment, real users and open-ended visual craft were not independently validated.
