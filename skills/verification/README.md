# Verification

Skills for reviewing and testing changes against correctness, quality, and acceptance criteria.

## Candidate skill

- [Verify change](verify-change/SKILL.md): assess the actual change against requirements and project standards, inspect current evidence, and report precise findings and gaps. Reuse valid checks; rerun missing or invalidated ones. Independent maintainer review and real-project testing remain pending.

Maintain a verification section in the existing delivery record. Technical findings return to the affected Implementation or Planning decision; verification does not itself authorize fixes, merge, or deployment. Local results and target-environment acceptance stay separate.

See the [proposal and source comparison](../../docs/proposals/verification-change.md) and [author walkthrough](../../docs/proposals/verification-change-walkthrough.md).

Add individual skills as `<skill-name>/SKILL.md`.

## Optional supplement

[Compare logic](compare-logic/SKILL.md) compares implementations or checks a rule using explicit criteria, counterexamples, and bounded evidence. It does not infer universal equivalence from passing samples or authorize a rewrite. See the [engineering situation router](../../docs/workflows/engineering.md).

Additional polish is separate from verification. Only when requested, use Implementation's [Perfect it](../implementation/perfect-it/SKILL.md) after baseline acceptance is verified.

[Exercise user journey](exercise-user-journey/SKILL.md) creates or reuses a project recipe, exercises real controls and preserves observable evidence through cleanup. See the [exporter/viewer recipe](../../docs/examples/user-journeys/verify-project-flow/SKILL.md) and [scope and validation record](../../docs/proposals/user-journey-verification.md).
