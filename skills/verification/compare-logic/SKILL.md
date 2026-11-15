---
name: compare-logic
description: Compare implementations or proposed rules against explicit correctness, equivalence, maintainability, or performance criteria. Use for logic checks and alternative comparisons; report counterexamples and bounded agreement without claiming universal equivalence from samples.
---

# Compare logic

Establish the actual comparison question and identify both alternatives by revision or supplied definition. One implementation can instead be checked against an explicit rule. Read existing requirements and context; ask only when an unresolved rule changes the verdict. Missing source or executable access bounds what can be concluded.

## Choose the evidence

- **Correctness:** derive expected outputs and invariants from requirements or worked examples independent of either implementation. Current behavior is evidence, not automatically the oracle.
- **Equivalence:** define the observable boundary: returned values, errors, persistent state, ordering, side effects, and relevant timing semantics. Align inputs, dependency behavior, and initial state. Reset state between alternatives so one run cannot contaminate the other.
- **Maintainability:** compare concrete change friction, dependencies, interface obligations, and testability. Label judgment and tradeoffs separately from correctness evidence; smaller code is not automatically better.
- **Performance:** compare equivalent completed work under comparable environments and workloads. Check output correctness and errors first. Record repetitions, variation, and instrumentation limits; do not claim a speedup from skipped work or one noisy sample.

Select cases that distinguish plausible behaviors: normal, boundary, empty/invalid, error, and state-transition cases as relevant. Do not invent a fixed test quota. Prefer existing runners and bounded checks; label simulated dependencies. If operations have side effects, isolate them or obtain the relevant authority before running. A comparison request alone does not authorize production mutation or rewriting either alternative.

## Interpret precisely

Record inputs, independent expected behavior where known, each actual observation, method, environment, and tested state. Minimize a counterexample when useful without changing the failure's meaning. Verify that the difference is not a setup error or mismatched environment.

One valid counterexample disproves equivalence within the defined semantics. Matching samples establish **agreement over tested cases**, not universal equivalence. Reserve a proof claim for an actual proof and its assumptions. If both alternatives violate the requirement, report both failures rather than selecting the less wrong one. If the intended rule is unresolved, describe the difference and the decision needed without manufacturing a winner.

## Result

Update the current review/decision record with: comparison question, criteria and sources, alternatives, evidence table, verdict and bounds, tradeoffs, and next action. Keep IDs and canonical links; do not duplicate specifications or convert subjective preference into acceptance criteria. Findings may inform Implementation or an earlier decision, but do not automatically trigger fixes.

Give one or two sentences stating the result and material uncertainty, linked to detail. If saving is unavailable, label the detailed record unsaved and supply it in one Markdown code block. Completion means the bounded question is answered or the evidence gap and next check are explicit.

## Origin

Project-authored method based on the requested logic-check/comparison scenarios. No upstream implementation or required tool is bundled.
