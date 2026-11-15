# Diagnose issue: author walkthrough

Date: 2026-11-15. These are author-produced applications of the candidate instructions to synthetic facts, not an independent agent evaluation, actual incident investigation, or observed runtime test. Real-project testing remains deferred.

## A. A specific mechanism with a bounded reproduction

Fixture request: diagnose why the cafe policy filter sometimes displays the previous neighbourhood's results. REQ-004 requires matching the current neighbourhood and policy. Release REL-042 is identified in the supplied environment record. A supplied local reproduction uses the same policy in two neighbourhoods and shows the second selection returning the first result set. The supplied cache code keys only on policy. No production mutation or durable fix is requested.

Expected application: verify that the reproduction addresses the actual symptom and inspected code matches the affected release before a cause claim. Hypothesis HYP-001 predicts the result is reused across neighbourhoods because the cache key omits that input. A bounded local check compares successive neighbourhood requests at the same policy and inspects key/result selection; changing policy alone would not discriminate this cause adequately. Expected values come from fixture cafe membership, not the cache implementation.

If actual observations establish that key collision and result reuse explain the symptom, record a supported mechanism and its scope. If supplied excerpts are all that is available, record it as a provisional explanation based on supplied evidence rather than an observed runtime cause. Recommend the smallest correction and a regression covering successive selections; do not silently disable all caching or implement the fix during a diagnosis-only request.

Example record fragment before any actual probe:

```markdown
Requirement REQ-004: match the current neighbourhood and policy (product.md).
Hypothesis HYP-001: cache identity omits neighbourhood; prediction is reuse across otherwise equal policy requests.
Evidence EVD-031: supplied reproduction and cache excerpt for reported REL-042; not independently executed or version-matched in this exercise.
HYP-001 is supported by EVD-031 as an inference, not a confirmed observation.
Cause assessment: Provisional. Mitigation: Not performed.
Next owner/action: diagnosis agent checks the actual affected version and bounded reproduction; if confirmed, Implementation corrects cache identity and checks successive selections within granted scope.
```

Illustrative human update:

> Prepared an unsaved diagnosis: the supplied cache key suggests results are reused across neighbourhoods, but the affected version and reproduction still need confirmation. The next step is a focused local check before choosing the smallest fix.

The complete unsaved record would follow; no actual product record save or probe result is claimed here.

## B. Missing reproduction and intermittent behavior

Fixture request: users report slow cafe searches after a release. No comparable latency measurements, traces, environment details, or accepted latency target are supplied. A single local run appears normal. Production logs are inaccessible.

Expected application: keep reported slowness separate from observed local behavior. Do not invent a threshold, blame the latest release, assume a provider problem, or claim the issue resolved after one normal run. Identify a comparable before/after measurement or relevant redacted trace as the next evidence need. A provisional hypothesis can guide that check but cannot become a supported cause. Do not run uncontrolled production stress or install instrumentation without scope.

Handoff: cause Undetermined, impact reported/unconfirmed, reproduction not established, next owner/action the specific permitted measurement or access path. This is a useful partial diagnosis, not a reason for repeated speculative edits.

## C. Mitigation before the cause is known

Fixture: a deployed policy-search feature is harming current users. The existing incident runbook permits the on-call operator to disable a specific feature flag; the user has explicitly authorized that action and target. No destructive migration is involved. A supplied later observation shows the impacted flow recovering after the flag change, but no causal mechanism has been established.

Expected application: reconcile the target and flag state, follow the already authorized applicable containment action without waiting for full diagnosis, and observe the outcome. Record mitigation Observed effective only if the actual target evidence supports it, with the observation's scope/window. Cause remains Provisional or Undetermined; the correlation does not establish why the feature failed. Preserve the release and incident context and route further investigation/fix work without calling the durable issue resolved.

If the flag operation times out, its outcome is Unknown until reconciled; do not blindly repeat it or claim recovery. If the action were outside authority, identify the incident owner and concrete needed action while continuing permitted reads. This walkthrough performs neither operation.

## D. Known fix and recurrence

Fixture: an existing regression already reproduces the reported problem and directly identifies a wrong field mapping; the user authorizes correcting it. Expected application: carry that evidence to the Implementation loop without manufacturing more hypotheses or a new Planning round. Check the original symptom after the fix and preserve the actual evidence; diagnosis alone is not delivery.

If prior incidents show the same mechanism, inspect existing checks before proposing a preventive check. A missing hook alone is not proof a new hook is needed. Propose a scoped improvement only when evidence explains its benefit; do not install it or alter global agent rules by default.

## Validation and limits

- Author inspection covers the actual-symptom requirement, hypothesis prediction, supplied-versus-observed evidence, version uncertainty, intermittent behavior, missing access, authorized containment, uncertain action outcome, and direct routing of a known fix.
- No commands against a product, tests, incident operations, or independent reviewer were run for these cases; observations are explicitly fixtures.
- `python -X utf8 C:/Users/maker/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/maintenance/diagnose-issue` returned `Skill is valid!`. Local links in the Maintenance directory, proposal, and walkthrough resolved; Git whitespace checks passed. No executable helper, incident service, production access, new dependency, or global installation is introduced.
- Remaining: installed-agent behavior, diagnostic quality on a real project, independent maintainer review, and actual end-to-end lifecycle evaluation. No causal certainty or production recovery guarantee is claimed.
