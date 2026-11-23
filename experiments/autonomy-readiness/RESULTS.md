# Meaning, autonomy and feedback reuse: pilot results

2026-11-23. Eight fresh agents: two producers, two handoff readers, two uninterrupted builders and two fresh transfer workers. P used ordinary judgment; W used the current frozen visuAI-DLC snapshot. No parent coaching, evaluator answers or corrective followups were sent. No canonical skills changed or pushed.

## Answer to the user's two questions

Meaning survived the handoffs in this small task. Autonomous agents did inspect and correct their work without repeated user prompting. Saved feedback was retrieved from explicit local files and applied across a fresh session. However, neither fewer correction rounds nor a visuAI advantage was demonstrated, and the workflow did not guarantee a justified whole-request completion verdict.

| Observation | Plain P | visuAI W |
|---|---:|---:|
| Fresh-reader meaning situations, reasons reviewed | 4/4 | 4/4 |
| Broken starter, fixed automated checks | 9/30 | 9/30 |
| Autonomous build, independent checks | 30/30 | 30/30 |
| Fresh transfer, independent checks | 30/30 | 30/30 |
| Initial product correction rounds, agent-recorded | 1 | 1 |
| Transfer product correction rounds, agent-recorded | 1 | 1 |
| Relevant feedback reused; old personal needs superseded | Yes | Yes |
| Encoding defect repeated during transfer | No observed repeat | Yes, then corrected |
| Unsupported factual label left after completion claim | None observed in inspected labels | `Stairs` from stepFree=false |

Counts are different checks, not independent samples. The 30 automated checks are six catalogue outcomes/reasons, eight unseen boundary/uncertainty/preference cases, and eight browser checks at each of two widths. Independent parent inspection covered all eight build/transfer desktop/mobile screenshots. No broad accessibility, design excellence or user-satisfaction certification is implied.

## 1. Understanding passed downstream

Readers had only their producer's handoff and four new situations, not source history or workflow. Both correctly handled unknown seats, changed solo/silent preferences without importing group/access requirements, missing proximity information, and a known time failure combined with unknown capacity. Reasons matched the underlying goal and current facts. W's handoff used dated source links and explicitly separated inferred classification details from user requirements; P also preserved intent successfully. The explicit source field definitions and familiar domain made this an easy test for both.

## 2. Autonomous execution and correction

Each builder had six minutes and at most three correction rounds, with the same tools and defective starter. Both finished in roughly three minutes, with no interruption or clarification request. They found the unconditional suitability result, stale detail selection and missing contact behavior, fixed them, ran Node and actual Chromium checks, and inspected screenshots. Both found broken encoding after otherwise passing behavior checks and corrected it. They stopped after one product correction rather than consuming the entire allowance. W applied deliver-change, implement-increments and verify-change; the meaning producer additionally used understand-expectations and handoff-work.

But W rendered `stepFree=false` as `Stairs`. A lack of step-free access does not establish that specific physical cause. This is a source-grounding failure under the existing no-invented-facts requirement, not a new aesthetic preference. It survived both its own screenshots and its later fresh worker. Parent verdict for that factual criterion is **Not met / Changes required**, despite 30/30 automated results and W's verified-within-scope claim. The trial artifacts remain unchanged to preserve the observation.

## 3. Feedback reuse across fresh sessions

Transfer agents received only their own arm's app and saved MEMORY.md, plus new task/data. Prior raw history, delivery records and tests were not copied. They retained uncertainty explanations, brief cards, linked selection/details/contact and runtime-driven requirements, while dropping the previous group's size/activity/access needs. Both understood that old evidence was not current verification.

Both also noticed an unintended fixture inconsistency: structured noise fields changed while some descriptive prose still described the former use. P retained labelled source descriptions with an explicit assessment-basis caveat; W replaced descriptive detail with structured facts. This was not a preregistered scored challenge and must not be used as causal evidence for either method.

P used the saved UTF-8/file-URL lessons without an observed recurrence; its one correction handled descriptive ambiguity. W read the same class of encoding lesson but still introduced broken separators through a replacement script and needed a correction. Its final memory explains that more specific mechanism. This is an example of **retrieving a lesson without preventing recurrence**. Both transfer runs still used one correction round. Faster or more reliable future work is not established.

## Engineering implication and smallest candidate improvement

The current workflow is usable guidance for a bounded autonomous host, not an enforcing scheduler or memory system. In this trial the harness supplied the workspace, explicit memory location, limits, tools and fresh-agent transitions. It should not receive credit for implementing those capabilities itself.

The next candidate improvement should target application of feedback and completion evidence, not add an ontology engine or RL training:

1. In the existing record, turn a relevant lesson into **source -> applicability -> preventive action/check -> current evidence**, rather than merely copying advice. For example, a prior encoding failure should trigger explicit encoding handling and inspection of changed text before claiming the patch is ready.
2. In verification, sample consequential user-visible factual claims against source data and label interpretations. `Not step-free` is supported; `stairs` is an additional assertion. Existing verification instructions already ask for whole-request inspection, so this is an execution gap to evaluate, not proof that another paragraph alone will fix it.
3. Give the host a defined place to retrieve current feedback and a rule for supersession. This trial demonstrates reading a short known file, not automatic retrieval across a large history. Avoid storing every preference as a permanent global rule.

These are proposed refinements only. A next controlled trial should compare prevention and completion calibration with/without the refinement, include a no-memory transfer control, and measure correction effort only among independently acceptable outcomes. Otherwise inherited working code or easier tasks can look like learning.

## Evidence, controls and limitations

- [Protocol and scope](README.md), [fixture/snapshot builder](prepare.py), [frozen evaluator](evaluate.mjs).
- [Meaning outputs and scoring](../../output/autonomy-readiness/meaning/results.json), [initial results](../../output/autonomy-readiness/build/results.json), [transfer results](../../output/autonomy-readiness/transfer/results.json), [independent factual finding](../../output/autonomy-readiness/build-review.md).
- output/autonomy-readiness/build and transfer contain per-arm source, delivery, memory, tests and screenshots. Original input hashes, frozen evaluator hashes, transfer-copy hashes and final evidence hashes are saved alongside them.
- Snapshot retains current local workflow/skills/notices, including pre-existing uncommitted edits. This is not an evaluation of an independently reviewed main release. Plain agents still share general host instructions and the common trial contract; they are not instruction-free models.
- One task family, one run per condition, unblinded parent review, familiar domain and explicit runtime interface. No statistical or general efficiency claim. Normal inference usage was not separately metered; correction counts are agent-recorded, not exact token/tool-cost telemetry. All runs finished within their wall bounds; no timeout intervention was needed.
- Data/feedback are synthetic. Isolated directories and read restrictions are instructional, not an OS sandbox. No installation, paid API purchase, external contact, publication, deployment or Git mutation occurred. One parent JSON parse retry accepted a UTF-8 BOM without changing reader answers. Agent harness fixes and product corrections remain documented in their records.
- Retrieval from a supplied short file is much easier than finding relevant feedback across repositories or long histories. Both transfer arms inherited working code as well as memory; without a no-memory control, improvement cannot be attributed to memory alone. Contradictory transfer prose limits whole-product-quality comparisons. Open-ended UI craft, delayed feedback over many projects, cross-model/host behavior, screen readers and other browsers remain untested.

To rerun current checks: serve experiments/autonomy-readiness on 127.0.0.1:17831, then from the repository root run `node experiments/autonomy-readiness/evaluate.mjs build` or `... transfer`. These overwrite the corresponding evidence directories; preserve archives first. Runtime paths use the existing local Coffee Atlas Playwright installation and Chromium. prepare.py intentionally refuses to overwrite a trial. The temporary trial server was stopped after evaluation.
