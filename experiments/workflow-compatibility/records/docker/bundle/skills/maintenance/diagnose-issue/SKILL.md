---
name: diagnose-issue
description: Diagnose an observed defect, incident symptom, or performance regression using bounded evidence and focused hypothesis checks, then recommend the smallest justified response. Use when the cause or response is uncertain; already justified fixes can enter Implementation directly. Keep mitigation, diagnosis, and resolution distinct.
---

# Diagnose issue

Turn the reported problem into a supported explanation or an explicit evidence gap and next action. Do not create another implementation or deployment workflow.

## Establish the actual problem

Read the request, existing incident/delivery record, relevant requirements and decisions, and the affected release/environment. State expected versus observed behavior, who/what is affected, and the source of each fact. Preserve reported impact as reported until checked. Use supplied context; ask only for missing information that materially affects investigation or response. Do not invent severity, latency, availability, or reproduction targets.

Inspect relevant errors, code paths/callers, recent changes, configuration, and known working behavior. A recent deployment or restart is a lead, not proof of cause. Compare the actual versions and circumstances instead of assuming the local checkout matches the affected target. If a cause and response are already supported, hand off directly rather than repeating an elaborate diagnosis.

For ongoing harm, follow the project's existing incident responsibilities and applicable authority. Do not delay an already authorized, appropriate containment action merely to complete diagnosis. Reconcile the current state before acting and observe the outcome; mitigation, recovery, and a durable fix are separate claims. Without authority or a safe applicable procedure, state the immediate operator/action needed and continue only permitted investigation. No new incident process or automatic rollback is implied.

## Build a bounded feedback loop

Prefer an existing test, recorded trace, safe local scenario, or targeted observation that exercises the user's actual symptom. Minimize irrelevant inputs while preserving the failure mechanism. A setup error is not reproduction of the reported behavior; absence of a failure in one run is not proof it is resolved.

Respect the effect of reproductions and probes: no uncontrolled stress, production writes, data replay, or extra instrumentation without suitable scope. Use isolated fixtures where appropriate and state their limits. Record version, relevant configuration, input conditions, command/inspection, and actual result; redact secrets and unnecessary personal data before retaining or sharing evidence. Do not dump the environment or log every payload.

For intermittent problems, describe observed frequency and conditions only when measured; use bounded trials and preserve uncertainty. For performance problems, compare meaningful measured baselines under comparable conditions before recommending an optimization. If reproduction is unavailable, record what was attempted and the specific missing evidence/access. Provisional hypotheses may guide the next safe check, but are not confirmed causes.

## Test the explanation

Form only the plausible hypotheses needed to discriminate the cause. For each active hypothesis, state its prediction, supporting/contradicting evidence, and the smallest useful check. Change one relevant variable at a time where practical; explain unavoidable confounders. Prefer existing instrumentation, debugger views, or narrowly scoped logs to a new diagnostic framework.

Trace the unexpected value or transition to where the behavior first diverges from the requirement. Compare a known working path and inspect other relevant instances of the same mechanism. Handling a legitimate edge state may be the correct fix; a guard that hides an invalid upstream state may only mask the fault. Do not infer either merely from coding style.

Use permitted, scoped diagnostic changes only. Identify temporary probes and their cleanup/reversion obligations; preserve unrelated edits and evidence, and never use broad reset/delete operations to clean up. Production code/configuration changes, even for diagnosis, require actual authority. Record temporary changes still present at handoff.

If a check contradicts the hypothesis, update it rather than layering speculative fixes. Continue while a concrete permitted check can materially distinguish causes; stop dependent investigation when the next useful step needs unavailable access or a changed decision. Repeated symptoms or failed attempts can justify revisiting design, but a fixed number of attempts does not prove architecture is wrong.

## Recommend and route the response

State the current cause assessment as **Supported**, **Provisional**, or **Undetermined**, with evidence and remaining alternatives/limits. Supported requires evidence tying the mechanism to the observed behavior, not correlation, an agent assertion, or a successful workaround. Do not claim a permanent fix from diagnosis or containment.

Recommend the smallest justified response, including what observation would show the original problem is addressed. If the evidence is insufficient, recommend the next diagnostic check instead of a confident patch. Preserve the actual acceptance criteria and any repeated-failure evidence.

Code/configuration fixes use the existing Implementation loop and a check against the original scenario. Consequential technical decisions return to Planning; a changed product need returns to Ideation. Release/recovery actions use the applicable Deployment process and authority. These are responsibilities, not mandatory installed-skill dependencies. A diagnosis-only request stops at its handoff; when the user has also authorized a fix, carry the evidence into that work without a redundant permission round.

For a demonstrated recurrence, consider one proportionate preventive improvement, first checking existing tests/alerts/runbooks. Record it as a proposal with its evidence and tradeoff; do not install hooks, expand logging/access, rewrite global instructions, or create a debt programme automatically.

## Maintain the record and finish

Update the existing issue/incident/delivery record. Read the [diagnosis template](references/diagnosis-record-template.md) only for a new record. Preserve stable IDs and explicit relationships among observations, evidence, affected requirements/releases, and decisions, with canonical targets and stated/inferred basis. Hypotheses are hypotheses, not selected decisions. Keep useful rejected hypotheses and past mitigation in labeled history; replace obsolete current actions. Reconcile concurrent edits before writing.

The handoff names current symptom/impact, cause assessment, actual mitigation status, evidence/limits, temporary changes, proposed response, and next owner/action. Do not mark an incident resolved just because the diagnostic task is complete. A shipped fix needs implementation/verification and relevant target evidence; human approval remains distinct.

Give one or two sentences linking to the saved detail: what is known, what remains uncertain, and the next response. Include save status and material limits within that budget. Without a destination or write access, give the short update and the complete unsaved record in one Markdown code block; report failed writes accurately. No mandatory agent fanout, external publication, new service, or automatic lifecycle restart is introduced.

## Business-connected outputs

Attach failure observations and affected-record references; revisit the business or product decision only when findings challenge it. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

See [pinned sources, adaptation choices, and MIT notices](references/upstream-notices.md) when reviewing or redistributing this skill.
