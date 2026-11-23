# Workflow refinement transfer result

2026-11-23. Local synthetic comparison owned by ChouBokYann. No canonical skill adoption, independent maintainer acceptance, deployment, commit or push is claimed.

## Question and setup

Do three small implementation, verification and handoff refinements improve execution on a different task? Two fresh agents independently implemented the same safe batch-renaming CLI, using either the current skill snapshots or three generic paragraph replacements. The task tests trustworthy preview, content preservation, failure recovery and safe undo. It does not test visual judgment or creation of acceptance criteria from a vague design request.

[Protocol](README.md), [common brief](current/BRIEF.md), [frozen independent rubric](review/RUBRIC.md), [candidate diff](../../output/workflow-transfer/candidate.diff), [frozen input hashes](../../output/workflow-transfer/frozen-inputs.json). Skills and briefs were frozen before producer dispatch; the independent evaluator saw only the common brief. Each implementation had ten minutes and at most two local corrections. A six-minute consolidated external correction was available but was not needed. No implementation repair was performed by the parent.

## Observed implementation results

| Measure | Current workflow | Refined workflow |
|---|---|---|
| Independent scenarios passed on first delivery | 24 | 24 |
| Independent scenarios failed | 0 | 0 |
| Independent scenarios skipped | 2 symlink cases | 2 symlink cases |
| External correction requests | 0 | 0 |
| Worker-reported local corrections | 0 | 1 |
| Author suite | 10 passed, 1 skipped | 17 passed, 1 skipped |
| Current claimed verdict | Incomplete | Incomplete |
| Unsupported whole-task completion claim found | None | None |

The independent evaluator exercised successful preview/apply/undo, exact byte preservation, unrelated files, quoted Unicode names, swaps/cycles, repeated operations, stale contents, missing sources, new conflicts, wrong roots, unsafe undo, existing output artifacts, invalid names/paths and a verified Windows file lock. Both restored original files after the locked-file failure. Passing this finite set does not establish every possible failure mode.

Initial evidence is preserved in [current results](../../output/workflow-transfer/current-initial/results.json), [refined results](../../output/workflow-transfer/refined-initial/results.json), and the corresponding `*-initial-source` archives. No external correction occurred, so these are also the final independent product results. Author tests are additional evidence with different coverage, not comparable scores. The refined worker's local correction removed an unnecessary restriction on CSV location; it is not evidence of a general workflow disadvantage.

Both agents explicitly withheld complete acceptance because live symlink fixtures could not be created (Windows error 1314). Neither equated a zero suite exit with full acceptance. Their records distinguish technical observations, human judgment and production authority. Both reference the original brief and named owner.

## Evaluator controls and gaps

The assertion control and real Windows lock probe passed. The probe allows reads while denying rename and releases its handle. Three output containment/overwrite controls passed. The reject-all starter produced 12 passes, 12 failures and 2 skips: refusal-only cases can pass vacuously, while successful-operation cases correctly reject that implementation. Evidence is under [evaluator-selfcheck](../../output/workflow-transfer/evaluator-selfcheck).

Symlink scenarios were skipped, not passed. The lock probe does not prove the exact internal move order; it establishes refusal/recovery with unchanged original files under that OS constraint. No exhaustive serialized-plan attacks, persistent rollback failures, concurrent races, process termination, power loss, performance or cross-platform claims were tested. Some of these are explicitly outside the brief. JSON error presence is automated; semantic clarity was assessed from the saved records rather than scored numerically.

## Fresh-reader handoff result

Both fresh reviewers recovered the original goal/scope, named human owner, documented local authorization, current incomplete verdict, artifact/evidence references and smallest next action. Neither lost the original source or invented acceptance. Both independently matched the recorded application/test hashes and completed a quoted Unicode-filename swap through preview, apply and undo, asserting actual names and bytes and preservation of an unrelated file.

See [current handoff review](current/HANDOFF-REVIEW.md), [refined handoff review](refined/HANDOFF-REVIEW.md), [current receiving evidence](../../output/workflow-transfer/handoff-current/journey-evidence.json), and [refined receiving evidence](../../output/workflow-transfer/handoff-refined/journey-evidence.json). Both reported usable transfer with incomplete product acceptance. Both could recover the declared authority but could not independently authenticate the underlying approval conversation; this is a shared provenance limit, not a condition-specific loss.

Reviewers did not rerun the complete author suites: those write fixtures/evidence under app, outside their output-only review permission. Instead they ran new synthetic journeys in their authorized output directories. They did not elevate privileges or repair the applications. Live symlink verification remains the application's blocked next check. The bounded workflow comparison itself is complete with that environmental gap recorded.

## Preservation

The [input audit](../../output/workflow-transfer/input-audit.json) checks frozen non-product inputs, the separately frozen handoff criteria and original canonical skill hashes, plus strict UTF-8 decoding of condition Markdown/Python files. All checks passed. Canonical skills retain their pre-trial hashes, including pre-existing uncommitted edits; this trial did not overwrite them. No dependencies, external services, Git mutations or real document data were used. Initial source archives remain available; reviewers' reports are additive final evidence.

## Interpretation and decision

The implementation comparison is a tie on the frozen observations. More tests or longer reports do not constitute a win. This trial supplies evidence that both workflows can execute a precise non-visual safety brief under a bounded autonomous attempt. It does not establish that the added wording improves understanding of ambiguous quality, reduces repeated user feedback, or produces learning across tasks.

Keep the candidate paragraphs isolated; no canonical promotion is justified by the implementation comparison alone. The next discriminating evaluation should target the unresolved uncertainty: whether an agent can turn an underspecified experience goal into useful observations, detect an inadequate result, and retain corrective feedback in a fresh task. Repeating an already detailed CLI specification would provide little new evidence. This is a proposed next experiment, not an authorized expansion of this run.

This is one unblinded pair using the same model family. Agent variability, the detailed brief and the existing current guidance may explain the tie; no causal or statistical improvement claim is supported. Source isolation was instructional on a shared filesystem, not an OS security boundary.
