# Question walkthrough

> **Historical / deferred as of 2026-11-07.** Historical comprehension exercise for the deferred project-thread fixture; not current product acceptance criteria. Current direction: [NORTHSTAR.md on main](../../../NORTHSTAR.md). Earlier status statements and requirements below describe the original proposal only.

These answers are manual, reproducible traces over the fixture; no retrieval engine is claimed.

## Why does this feature exist?

Scope: baseline B, feature-progress-view.
[Feature](baseline-b/feature-progress-view.md) realizes [capability-blockers](baseline-b/capability-blockers.md), which contributes_to [goal-returning-maintainer](baseline-b/goal-returning-maintainer.md).
The intended contribution is to let a returning maintainer identify blocked work without reading every issue.
Both edges are declared in the synthetic fixture, not observations proving the feature works.
[Evidence](baseline-b/evidence-walkthrough.md) is pending. User benefit remains unverified.
Omitted: implementation details; no code links exist in this fixture.

## What does the new decision affect?

Scope: baseline B, decision-direct-first.
[Decision](baseline-b/decision-direct-first.md) directly affects [feature-progress-view](baseline-b/feature-progress-view.md) and supersedes [decision-blocker-scope](baseline-b/decision-blocker-scope.md).
[Release target](baseline-b/release-v01.md) still targets the feature, now with a narrower proposed scope.
The capability and goal are the rationale context, not proof they are broken.
There are no declared depends_on edges here. This means no additional dependencies are recorded, not that the real system has none.
An inferred edge in an imported graph must remain labeled inferred; it cannot override these explicit records.

## What changed between A and B?

Compare by stable ID, not title or filename.

| Concept | A | B |
|---|---|---|
| feature-progress-view | Direct and transitive blocker exploration | Direct blockers first; transitive exploration deferred |
| decision-blocker-scope | Draft original scope | Deprecated; retained as history |
| decision-direct-first | Absent | New draft decision affecting feature and superseding original |
| release-v01 | Targets feature | Still targets feature; scope is narrower |
| evidence-walkthrough | Pending | Pending; no new test result |

Reason: the new decision isolates the first understanding task before adding broader impact exploration.
Read [A rationale](baseline-a/decision-blocker-scope.md) and [B rationale](baseline-b/decision-direct-first.md).
No claim that either version is implemented, approved, or deployed follows from these documents.

## Procedure versus execution

[Procedure](baseline-b/procedure-walkthrough.md) describes a synthetic method.
[Evidence](baseline-b/evidence-walkthrough.md) uses_procedure that method and assesses the feature.
The existence of the method does not imply it ran. A real run needs a result, tested revision, and source artifact.

## Independent comprehension review

Give a reviewer only baseline B and these questions, without the original conversation:
1. What project goal does the feature support?
2. Why was the proposed scope narrowed?
3. What is actually verified?
4. What additional context would you need before estimating downstream impact?

Expected: easier project re-entry; direct blockers first; nothing verified; dependencies/code and actual evidence are missing.
Record their actual answers in validation.md. Do not substitute these expected answers for a completed human review.
