# Synthetic integrated Ideation workflow walkthrough
Date: 2026-11-15. Fresh execution; the earlier interrupted trial supplied no artifact.
This is a scripted offline test, not real user acceptance, maintainer approval or implementation authorization. Cases share one agent context (including skill text already loaded), but facts and source IDs are isolated per case. Only A carries earlier outputs into later turns. No new user turns were invented. Simulated briefs are unsaved; this enclosing test record is saved.
## Execution and files loaded
Workflow read first: `docs/workflows/ideation.md`.
A1 routed to `skills/ideation/clarify-problem/SKILL.md`; its `references/problem-brief-template.md` was read before producing A2's brief.
A2 routed to `skills/ideation/recommend-solution/SKILL.md` and `references/decision-brief-template.md`.
A3 routed to `skills/ideation/define-requirements/SKILL.md` and `references/requirements-brief-template.md`.
B reused recommendation instructions; C/D reused requirements instructions. E then loaded `skills/ideation/research-solutions/SKILL.md` and `references/research-brief-template.md`, followed by the already-loaded recommendation instructions.
No proposal/history files, network, other skills, source repositories or external documents were read. No delegation, probes or other writes performed.
## A — Clarification, recommendation, explicit choice, requirements
A1 input: “Use Ideation: I cannot find suitable cafes in Singapore.”
Actual response: I’ll use the Ideation workflow’s clarify-problem skill to establish what makes a cafe suitable. Can you describe a recent unsuccessful search, including who needed the cafe and what made the available options unsuitable?
No brief was claimed complete at A1; material suitability/users gap awaited the supplied A2.
A2 input: “Our staff lose laptop policies in chat. Need records for 12 cafes of policy, source contact and date checked. No AI/app/live occupancy. Offline evidence S1 synthetic internal pilot: existing spreadsheet holds those fields and staff read/update it with current capacity; S2 synthetic proposal: custom app duplicates those fields with new maintenance and no demonstrated benefit. Help choose.”
Actual update: I recommend the existing spreadsheet/manual workflow because the supplied synthetic pilot reports the required fields and staff capacity; research was skipped because that evidence supports this bounded choice. The combined brief below is unsaved: please select the direction before requirements are defined.
Actual artifact:
```markdown
---
type: Ideation Brief
title: Find staff laptop-policy records
description: Clarified need and proposed reuse of existing records
status: draft
---
# Staff laptop-policy records
## Problem and outcome
Affected users are staff who lose laptop policies in chat (A2 user report); the initial Singapore cafe-search concern (A1) is narrowed to retrievable records for 12 cafes. Current chat information is hard to retrieve (A2); desired fields are policy, source contact and date checked. Observable success proposed: staff can retrieve and update these records. No timing target is established.
## Scope and evidence
A2 excludes AI, an app and live occupancy. A2-S1 is a supplied synthetic internal-pilot report: the existing spreadsheet holds these fields and staff read/update it with current capacity. A2-S2 is a supplied synthetic proposal: a custom app duplicates the fields, adds maintenance and has no demonstrated benefit. Neither source was independently observed or verified.
## Comparison and recommendation
| Option | Fit | Tradeoff and disposition |
|---|---|---|
| Existing spreadsheet/manual workflow | Reported field coverage and capacity (A2-S1); consistent with exclusions | Reuses existing capability; recommend |
| Custom app | Duplicates fields (A2-S2); fails no-app constraint (A2) | Adds maintenance without demonstrated benefit; rule out |
Recommend spreadsheet/manual workflow. Reconsider if reported field coverage or staff capacity fails; current evidence establishes no custom gap. Preferences beyond stated constraints and monetary costs are unknown, with no spending proposed.
## Handoff
Problem is ready for solution consideration (agent assessment); separate research skipped because supplied evidence is adequate for this choice. Decision state: recommendation proposed. User acceptance: not recorded. Required capabilities proposed for requirements are retrievable and editable policy, source contact and date checked for 12 cafes; no AI/app/live occupancy. Requirements have not run. Next owner/action: user selects direction; then define requirements under the workflow request.
```
Execution stopped at selection; no requirements drafted until the next supplied fixture.
A3 input: “Select spreadsheet/manual workflow. Define requirements, no freshness target. Return one combined unsaved artifact.”
Actual update: The combined unsaved brief now records your selection and requirements for manual records across 12 cafes, with no freshness target. It is ready for Planning as an agent completeness assessment; the proposed checks have not been run or separately accepted.
Actual final artifact (the actual A2 text is retained, not replaced by a summary):
```markdown
---
type: Ideation Brief
title: Find staff laptop-policy records
description: Selected manual records and bounded requirements
status: draft
---
# Staff laptop-policy records
## Problem and outcome
Affected users are staff who lose laptop policies in chat (A2 user report); the initial Singapore cafe-search concern (A1) is narrowed to retrievable records for 12 cafes. Current chat information is hard to retrieve (A2); desired fields are policy, source contact and date checked. Observable success proposed: staff can retrieve and update these records. No timing target is established.
## Scope and evidence
A2 excludes AI, an app and live occupancy. A2-S1 is a supplied synthetic internal-pilot report: the existing spreadsheet holds these fields and staff read/update it with current capacity. A2-S2 is a supplied synthetic proposal: a custom app duplicates the fields, adds maintenance and has no demonstrated benefit. Neither source was independently observed or verified.
## Comparison and recommendation
| Option | Fit | Tradeoff and disposition |
|---|---|---|
| Existing spreadsheet/manual workflow | Reported field coverage and capacity (A2-S1); consistent with exclusions | Reuses existing capability; recommend |
| Custom app | Duplicates fields (A2-S2); fails no-app constraint (A2) | Adds maintenance without demonstrated benefit; rule out |
Recommend spreadsheet/manual workflow. Reconsider if reported field coverage or staff capacity fails; current evidence establishes no custom gap. Preferences beyond stated constraints and monetary costs are unknown, with no spending proposed.
## Handoff
Problem is ready for solution consideration (agent assessment); separate research skipped because supplied evidence is adequate for this choice. Decision state: recommendation proposed. User acceptance: not recorded. Required capabilities proposed for requirements are retrievable and editable policy, source contact and date checked for 12 cafes; no AI/app/live occupancy. Requirements have not run. Next owner/action: user selects direction; then define requirements under the workflow request.
## Selection and requirements (A3)
A3 selects spreadsheet/manual workflow and requests requirements with no freshness target. This supersedes the pending choice above, retaining the original rationale; decision state is now existing user decision documented. All acceptance checks below are agent-proposed, not passed tests or separately accepted criteria.
| ID | Behavior | Basis/source | Observable acceptance check | Gap |
|---|---|---|---|---|
| REQ-001 | Keep retrievable policy, source contact and date checked for each of 12 cafes | User-stated A2; direction selected A3 | Given the 12 cafes, staff retrieve each cafe's record and inspect all three fields | None for bounded scope |
| REQ-002 | Staff read and update the records in the existing spreadsheet/manual workflow | Selected A3; reported capability A2-S1 | Staff change a supplied policy/contact/date entry, then retrieve the saved value | Check not run |
| REQ-003 | Exclude AI, an app and live occupancy; impose no freshness target | User-stated A2 and A3 | Inspect agreed scope and walk through manual record use without those features; no age threshold is an acceptance gate | None |
## Final Planning handoff
Ready for Planning (agent assessment): selected direction, bounded scope and observable checks; supplied pilot evidence supports current capacity. User acceptance is limited to A3's synthetic solution choice and stated scope, not the added checks or real human approval. No material feasibility blocker is established by the fixture; monetary costs remain unassessed, with no spending proposed. Next owner/action: human owner takes this brief into Planning if desired. Safe next work is planning the selected record workflow; extra features remain outside scope. No Planning skill or implementation executed. Brief remains unsaved in this simulated conversation.
```
## B — Recommendation only
Input: “Only recommend: supplied synthetic S1 says existing X meets our CSV import/export and current staff maintain it. S2 says Y duplicates it with more setup. Do not run full workflow.”
Actual update: I recommend X because supplied synthetic S1 reports that it meets CSV import/export needs and current staff can maintain it, while S2 reports more setup for duplicate capability in Y. The decision brief below is unsaved; selection remains yours and the requested recommendation-only scope ends here.
Actual artifact:
```markdown
---
type: Solution Recommendation
title: Reuse X for CSV exchange
description: Recommend the existing supported capability
status: draft
---
# CSV exchange decision
## Context and evidence
B requires CSV import/export and asks only for a recommendation. Existing selection: none supplied; preferences beyond the stated need: unknown. B-S1 is a supplied synthetic report that existing X meets CSV import/export and current staff maintain it. B-S2 is a supplied synthetic report that Y duplicates it with more setup. No independent verification, costs or data-handling evidence supplied.
## Comparison
| Option | Mandatory fit | Burden and disposition |
|---|---|---|
| X | CSV import/export reportedly met (B-S1) | Staff maintenance reported; recommend reuse |
| Y | Duplicated capability reported (B-S2) | More setup with no supplied benefit; not recommended |
## Recommendation and handoff
Decision state: recommendation proposed. Recommend X on the supplied evidence; reconsider if reported CSV fit or maintenance capacity proves inadequate, or Y demonstrates a relevant advantage. User acceptance: not recorded. Required capability: CSV import/export with maintainable operation; no custom gap demonstrated. No research or requirements performed. Next owner/action: user may select X; no further workflow is authorized by this request.
```
## C — Provisional requirements with unavailable evidence
Input: “Use Ideation starting with provisional requirements: A only if laptop-policy API access and cost <= SGD20/month confirmed. Both unknown, no research access. Need automated lookup; do not select provider.”
Actual update: These unsaved provisional requirements preserve automated lookup, but A remains conditional on confirmed laptop-policy API access and total cost at or below SGD20/month. Both facts are unknown and research access is unavailable, so provider selection and any committed integration remain blocked.
Actual artifact:
```markdown
---
type: Requirements Brief
title: Conditional automated laptop-policy lookup
description: Provisional requirements with access and cost unresolved
status: draft
---
# Automated lookup
## Basis and scope
C explicitly requests provisional requirements; direction is conditional A, with no provider selection delegated. Need: automated laptop-policy lookup. Excluded: selecting a provider or committing an integration while conditions are unknown. Other users, geography and lookup input format are unspecified; no facts from other trial cases apply.
## Requirements
All checks are agent-proposed, unrun and not separately accepted.
| ID | Behavior or constraint | Basis/source | Observable acceptance check | Gap |
|---|---|---|---|---|
| REQ-001 | Provide automated laptop-policy lookup | User-stated C | Given an agreed lookup input, obtain the corresponding laptop policy automatically and inspect result against an authoritative source | Input contract and failure behavior unknown; proposed check requires refinement |
| REQ-002 | Use A only with confirmed laptop-policy API access and total cost <= SGD20/month | Conditional; C | Before any commitment, inspect access evidence for the required policy data and cost evidence at agreed usage showing total monthly cost <= SGD20 | Access, cost and usage basis unknown |
## Evidence and handoff
Source C is the only supplied evidence: both gating facts are unknown and research access is unavailable. No capability or price is verified. Readiness: provisional handoff; provider-dependent work blocked. User acceptance: provisional drafting requested, no provider selected. Safe next work: clarify provider-independent lookup input/result and proposed failure behavior; remain uncommitted on A, interface, cost and implementation. Next owner/action: human owner restores research access or supplies authoritative API-access and cost evidence; then reassess. No research attempt or Planning execution represented as completed.
```
## D — Direct requirements after selection
Input: “Already selected manual records requiring name, policy and date checked; no AI/app. Use Ideation to produce requirements directly.”
Actual update: The unsaved requirements brief documents your selected manual records with name, policy and date checked, excluding AI and an app. The bounded scope is ready for Planning as an agent assessment, with the proposed acceptance checks still unrun.
Actual artifact:
```markdown
---
type: Requirements Brief
title: Manual policy records
description: Requirements for the selected manual record workflow
status: draft
---
# Manual policy records
## Basis and scope
D supplies the selected manual direction and requires name, policy and date checked; no AI/app. Outcome: maintain those manual records. Scale, geography, source contact and freshness targets are not supplied or added. No spreadsheet selection is inferred from other cases.
## Requirements
| ID | Behavior or constraint | Basis/source | Observable acceptance check | Gap |
|---|---|---|---|---|
| REQ-001 | Maintain manual records containing name, policy and date checked | User-stated and selected D | Given a record entered manually, retrieve it and inspect all three supplied values | None for bounded scope |
| REQ-002 | Exclude AI and an app | User-stated D | Review agreed scope and demonstrate manual record handling without AI or an app | None |
Checks are agent-proposed, not independently accepted or run. No evidence of realized business benefit is claimed.
## Handoff
Ready for Planning (agent assessment): selected direction, bounded fields and observable criteria. User acceptance: D's synthetic selection and stated requirements only, not real human review. Safe next work/next owner: human owner can take the manual-record scope to Planning; no unresolved material feasibility condition is supplied. Uncommitted work: any extra capability or numerical target. Clarification, research and recommendation skipped; no downstream skill executed. Source: D only.
```
## E — Research to recommendation with source uncertainty
Input: “Use Ideation to research and compare supplied synthetic docs then recommend. Need Singapore policy lookup. S1 brochure A global policy discovery; S2 API docs list coordinates/name, policy not documented; S3 B API has policy field but Singapore coverage unknown. No network, no delegated selection.”
Actual research update: The supplied synthetic documents support comparison, but A’s global discovery brochure does not establish a policy API and B’s policy field does not establish Singapore coverage. The research brief below is unsaved; I will carry those gaps into the requested recommendation.
Actual research artifact:
```markdown
---
type: Solution Research
title: Singapore policy lookup evidence
description: Supplied-document comparison with policy and coverage gaps
status: draft
---
# Singapore policy lookup
## Scope
E needs Singapore policy lookup and requests research then recommendation. Research is limited to supplied synthetic excerpts E-S1 through E-S3; network unavailable/prohibited. No full documents, external queries or probes accessed. Affected user details unspecified but not necessary to compare this bounded capability.
## Options and evidence
| Option | Supported fit | Reuse/integration path | Material uncertainty |
|---|---|---|---|
| A | Global policy discovery claimed by brochure E-S1 | API coordinates/name documented in supplied E-S2 | Policy API not documented; Singapore policy coverage unknown |
| B | Policy field documented in supplied E-S3 | Candidate API integration; no integration tested | Singapore coverage unknown |
| Source | Retrieval/date/revision | Claim and limit |
|---|---|---|
| E-S1, supplied synthetic A brochure | Supplied excerpt only; external retrieval and date/revision unknown | Global policy discovery claim; no established API availability or Singapore dataset |
| E-S2, supplied synthetic A API docs | Supplied excerpt only; external retrieval and date/revision unknown | Coordinates/name listed; policy undocumented, not proven absent |
| E-S3, supplied synthetic B API docs | Supplied excerpt only; external retrieval and date/revision unknown | Policy field present in excerpt; Singapore coverage unknown |
## Handoff
Ready for comparison (agent assessment) of evidence and gaps, not confirmed suitability. E-S1's broad product claim and E-S2's narrower interface documentation leave an unresolved scope gap, not a proven contradiction. Access, authentication, terms, cost, usage and freshness are unknown for both; no sources were observed working. Next: recommendation using these exact sources, then obtain authoritative Singapore coverage and A policy-interface evidence when access permits. No final selection.
```
The exact research artifact above was carried into recommendation; no new source or user reply intervened.
Actual recommendation update: Selection is deferred: A has no documented policy API in the supplied excerpt, and neither A nor B has established Singapore policy coverage. The combined unsaved brief below preserves the research evidence and recommends targeted verification before a provider decision; requirements have not run.
Actual final artifact:
```markdown
---
type: Ideation Brief
title: Singapore policy lookup evidence
description: Research and deferred selection for Singapore policy lookup
status: draft
---
# Singapore policy lookup
## Scope
E needs Singapore policy lookup and requests research then recommendation. Research is limited to supplied synthetic excerpts E-S1 through E-S3; network unavailable/prohibited. No full documents, external queries or probes accessed. Affected user details unspecified but not necessary to compare this bounded capability.
## Options and evidence
| Option | Supported fit | Reuse/integration path | Material uncertainty |
|---|---|---|---|
| A | Global policy discovery claimed by brochure E-S1 | API coordinates/name documented in supplied E-S2 | Policy API not documented; Singapore policy coverage unknown |
| B | Policy field documented in supplied E-S3 | Candidate API integration; no integration tested | Singapore coverage unknown |
| Source | Retrieval/date/revision | Claim and limit |
|---|---|---|
| E-S1, supplied synthetic A brochure | Supplied excerpt only; external retrieval and date/revision unknown | Global policy discovery claim; no established API availability or Singapore dataset |
| E-S2, supplied synthetic A API docs | Supplied excerpt only; external retrieval and date/revision unknown | Coordinates/name listed; policy undocumented, not proven absent |
| E-S3, supplied synthetic B API docs | Supplied excerpt only; external retrieval and date/revision unknown | Policy field present in excerpt; Singapore coverage unknown |
## Handoff
Ready for comparison (agent assessment) of evidence and gaps, not confirmed suitability. E-S1's broad product claim and E-S2's narrower interface documentation leave an unresolved scope gap, not a proven contradiction. Access, authentication, terms, cost, usage and freshness are unknown for both; no sources were observed working. Next: recommendation using these exact sources, then obtain authoritative Singapore coverage and A policy-interface evidence when access permits. No final selection.
## Recommendation
Decision state: selection deferred. Mandatory need is Singapore policy lookup (E); no provider selection delegated and no existing choice supplied. Neither option has established mandatory fit: A's brochure is not policy-API evidence (E-S1/E-S2), and B's documented policy field does not resolve geography (E-S3). Do not interpret missing API documentation as proven absence. No winning provider or custom build is recommended.
B is a reasonable first bounded coverage check because its policy field is documented in E-S3; this is an evidence-gathering priority, not selection. For A, seek authoritative policy-interface documentation and Singapore coverage. Reassess once these facts are established; access, cost and terms also require checking before commitment. Practical burdens cannot be compared reliably from these excerpts.
## Final handoff
User acceptance: not recorded; no real approval exists in this synthetic trial. Requirements readiness: not established because no direction is selected or provisional requirements requested. Next owner/action: human owner supplies authoritative coverage/interface evidence or enables research; agent then revisits only affected findings and the decision. No network research, integration probe, requirements or Planning execution performed.
```
## Assessment and limits
Observed: A asks a consequential question, reuses sufficient evidence, waits at choice, and carries actual rationale into one combined requirements artifact. B stops at recommendation; C preserves both exact feasibility gates without selection; D enters requirements directly; E performs supplied-document research then defers selection while preserving documentary uncertainty. No extra stages are claimed.
Initial assessment (superseded by parent review below): no blocking defect was reported, and A3's stale handoff was understated as an output-quality limitation. C cannot provide complete acceptance criteria until input/failure behavior and provider evidence are clarified.
This shared-context trial does not establish cold-start independence, live research quality, artifact race handling, full source attribution/license review, or behavior under changed-source loops. Source facts are synthetic, not externally verified; checks in briefs were proposed, not executed. No implementation or downstream Planning was tested.
## Parent review correction and bounded rerun
Parent review found a real stale-current-state defect that my initial assessment understated: A3 retained an obsolete pending-choice handoff and E retained a next-recommendation action after recommendation had completed. Parent added the workflow's in-place current-status rule; I reread `docs/workflows/ideation.md` and reran only the A3/E artifact updates against the actual retained outputs. No new user reply, source or decision was introduced. Original outputs above remain the test evidence, not the corrected current artifacts.
Actual A3 update: The combined unsaved brief now has one current handoff documenting A3's selected manual spreadsheet direction and Planning readiness. The prior pending choice is retained only as decision history; no extra acceptance or verification is implied.
Actual A3 replacement patch to the earlier final artifact: replace its entire `## Handoff` section with the following history, retain all problem/evidence/comparison and REQ-001–003 text, and replace `## Final Planning handoff` with the current section below.
```markdown
## Decision history (superseded A2 state)
At A2 the recommendation was proposed and acceptance had not been supplied. Research was skipped because A2-S1/S2 were adequate for the bounded comparison; the spreadsheet rationale and app exclusion above remain applicable. A3 subsequently selected spreadsheet/manual workflow.
## Current handoff
Decision state: existing user decision documented (A3). Readiness: ready for Planning (agent assessment), with selected manual spreadsheet direction, bounded scope and proposed observable checks. User acceptance is limited to A3's synthetic solution choice and stated scope, not the added checks or real human approval. Supplied A2-S1 reports current capacity; no material feasibility blocker is established by the fixture. Monetary costs remain unassessed and no spending is proposed. Next owner/action: human owner takes this brief into Planning if desired. Safe next work is planning the selected record workflow; extra features remain outside scope. No Planning skill or implementation executed. Brief remains unsaved in this simulated conversation.
```
Actual E update: The combined unsaved brief now has one current handoff deferring selection on the unresolved policy-interface and Singapore coverage evidence. The completed research-to-comparison transition is history; the next action is obtaining the missing authoritative evidence.
Actual E replacement patch to the earlier final artifact: replace its entire `## Handoff` section with the following completed history, preserve its scope, source table, uncertainties and recommendation, and replace `## Final handoff` with the current section below.
```markdown
## Research handoff history (completed)
The supplied-document review was ready for comparison (agent assessment), not confirmed suitability; that comparison is now recorded below. E-S1's broad product claim and E-S2's narrower interface documentation leave an unresolved scope gap, not a proven contradiction. Access, authentication, terms, cost, usage and freshness remain unknown for both; no sources were observed working.
## Current handoff
Decision state: selection deferred. User acceptance: not recorded; no real approval exists in this synthetic trial. Requirements readiness: not established because no direction is selected or provisional requirements requested. Neither candidate has established Singapore policy coverage; A also lacks documented policy-API support in the supplied excerpt. Next owner/action: human owner supplies authoritative coverage/interface evidence or enables research; agent then revisits only affected findings and the decision. No network research, integration probe, requirements or Planning execution performed.
```
Rerun check: each reconstructed artifact has exactly one `## Current handoff` and no prior current `## Handoff` or `## Final handoff` section. Historical pending states carry no obsolete next action; evidence and acceptance scope are unchanged. This demonstrates the corrected update on the same inputs, not an independent cold-start retest.
