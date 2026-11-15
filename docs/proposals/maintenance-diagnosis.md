# Proposal: diagnose an issue and route the response

Status: candidate implementation on `first-iteration`, authorized by the user's “ok go for it” after the Deployment pair and proposed move to Maintenance. Session authorization is not independent maintainer acceptance or merge permission. Actual testing in another project remains deferred.

## Change, need, and ownership

Delivered software produces symptoms, incidents, performance changes, and repeated operational problems. A useful Maintenance entry point must distinguish observations from causes and identify the smallest justified response without creating a second implementation or release workflow.

Add `skills/maintenance/diagnose-issue/SKILL.md`, an optional diagnosis-record template and upstream notices under `references/`, and a Maintenance index entry. Root agent owns these paths, this proposal, and `docs/proposals/maintenance-diagnosis-walkthrough.md`. Human owner: ChouBokYann. Existing skills, `.bench-run/`, and `output/` remain untouched.

Issue search found [exploration #7](https://github.com/ChouBokYann/visuAI-DLC/issues/7) and [deferred release/diagnosis slice #10](https://github.com/ChouBokYann/visuAI-DLC/issues/10). Historical criteria are not revived; no issue publication or independent acceptance is claimed.

## Scope and stage boundary

Included: actual versus expected behavior, affected version/environment, bounded reproduction or characterization, evidence-led hypotheses, targeted permitted probes, cause confidence and limits, containment versus resolution, smallest response, and explicit next owner/action. Reuse the existing incident/delivery record and keep a short human update.

Excluded: a new incident platform, background monitoring, automatic production instrumentation, dependency-upgrade campaign, permission expansion, broad retrospective, mandatory agent fanout, product fixes, merges, and deployments. An explicitly authorized diagnostic probe or mitigation stays within its actual scope; durable fixes use the existing Implementation loop. Already justified small maintenance changes can enter Implementation directly without a ceremonial diagnosis stage.

## Source comparison

Inspected pinned bodies, not a latest-version survey or an audit of linked runtime tools:

| Source | Retain | Adapt or omit |
|---|---|---|
| [Superpowers systematic-debugging](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/systematic-debugging/SKILL.md) | Read errors, reproduce the actual symptom, inspect recent changes, trace across boundaries, and test a specific hypothesis with a small discriminating check. | No universal phase ceremony, fixed attempt count that automatically condemns architecture, broad instrumentation, invented certainty, or prevention of authorized urgent containment. Durable fixes are delegated to the existing Implementation responsibility. |
| [Matt Pocock diagnosing-bugs](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/diagnosing-bugs/SKILL.md) | A symptom-specific feedback signal, small reproduction, falsifiable predictions, redaction, targeted probes, and checking the original scenario after a fix. | No mandatory 3–5 hypotheses, fixed speed/reproduction targets, stress loops, compulsory custom harness, or ban on explicitly provisional hypotheses when reproduction is unavailable. No blanket cleanup of artifacts not owned by this work. |
| [pstack fix-root-causes](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-fix-root-causes/SKILL.md) | Trace to the originating fault, distinguish legitimate edge-state handling from symptom masking, and inspect other relevant occurrences of the same mechanism. | No assumed cause based on restart correlation, broad automatic refactoring, or universal permanent instrumentation. |
| [Matt Pocock retro](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/retro/SKILL.md) | For a demonstrated repeated problem, inspect existing checks before proposing a small preventive improvement. | No mandatory session-log scan, automatic hooks/global instructions/access changes, or treating absence of tooling as sufficient reason to add it. |

ECC is not an additional adaptation for this candidate: the inspected debugging sources already cover the bounded need, and adding another dependency or rule set requires a distinct benefit. No claim of a full ECC maintenance catalogue audit is made. Pinned MIT attribution accompanies the skill.

## Outputs, tools, and alternatives

Maintain a diagnosis section with symptom and scope, direct evidence and hypotheses, test outcomes, current cause assessment, actual mitigation state, proposed response, and next action. Preserve stable requirement/release/decision/evidence IDs and distinguish reported, inferred, documented, and observed facts. Use one or two sentences for the human, linking to detail; do not generate a report per hypothesis.

No new runtime, helper, dependency, service, or automatic upload. Use the project's authorized code/log/test tools. Diagnostic reads can expose sensitive data; collect only relevant redacted evidence. Reproduction may have effects or cost, which must fit actual permission. Missing access is a stated limitation, not grounds for installing agents or expanding privileges. Ruflo tools were not exposed.

Alternatives: full upstream debugging duplicates Implementation and adds hard gates; a separate incident-response skill is unnecessary until real operations demonstrate a need; doing nothing encourages unsupported fixes. One diagnostic entry point reuses the rest of the lifecycle. Revisit an incident-specific skill if actual use demands different ownership, coordination, or timing guarantees.

## Acceptance and validation

- Given an observed symptom, identify expected behavior, actual scope/environment, evidence basis, and a relevant reproduction/check without inventing thresholds or causes.
- Use falsifiable hypotheses and discriminating checks; unreproduced or intermittent behavior remains uncertain. Missing logs/access produce a concrete next action, not a confirmed diagnosis.
- Distinguish urgent authorized mitigation from cause/remediation; do not force continued harm while investigating or claim recovery proves a cause.
- Recommend the smallest evidence-supported response and route code fixes to Implementation, consequential design changes to Planning, changed needs to Ideation, and release actions to the existing Deployment responsibility without automatic expansion.
- Preserve current record, IDs, rejected hypotheses with useful evidence, and concise output; do not turn every hypothesis into a selected decision or publish secret-bearing logs.
- Run format, local link, and whitespace checks plus a bounded author walkthrough covering a known mechanism, missing reproduction, and mitigation without diagnosis. No actual incident/runtime or real-project testing is claimed.

Risks: premature certainty, masking symptoms, destructive reproduction, endless probes, scope creep, and confusing mitigated with fixed. Rollback removes the candidate/index entry; actual probes or mitigation in a future project need their own recovery/cleanup. No unresolved design choice blocks this generic candidate. Target environment, tools, actual incident authority, and independent review remain future inputs.

## Candidate result

Implemented [diagnose-issue](../../skills/maintenance/diagnose-issue/SKILL.md), its optional new-record template, pinned attribution/notices, and Maintenance index entry. Format validation, local links, and whitespace checks passed. The [author walkthrough](maintenance-diagnosis-walkthrough.md) records expected applications and limits, not actual diagnoses or mitigations. Independent review and testing in another project remain pending.
