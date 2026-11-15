# Verification

Skills for reviewing and testing changes against correctness, quality, and acceptance criteria.

## Candidate skill

- [Verify change](verify-change/SKILL.md): assess the actual change against requirements and project standards, inspect current evidence, and report precise findings and gaps. Reuse valid checks; rerun missing or invalidated ones. Independent maintainer review and real-project testing remain pending.

Maintain a verification section in the existing delivery record. Technical findings return to the affected Implementation or Planning decision; verification does not itself authorize fixes, merge, or deployment. Local results and target-environment acceptance stay separate.

See the [proposal and source comparison](../../docs/proposals/verification-change.md) and [author walkthrough](../../docs/proposals/verification-change-walkthrough.md).

Add individual skills as `<skill-name>/SKILL.md`.

## Optional supplement

[Compare logic](compare-logic/SKILL.md) compares implementations or checks a rule using explicit criteria, counterexamples, and bounded evidence. It does not infer universal equivalence from passing samples or authorize a rewrite. See the [engineering situation router](../../docs/workflows/engineering.md).

- [Perfect it](perfect-it/SKILL.md): refine authorized work against established expectations, with at most two improvement rounds by default and explicit early-stop rules. Optional branch candidate; independent review and real-project trial pending.
