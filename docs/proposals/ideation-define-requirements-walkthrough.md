# Define requirements: isolated synthetic walkthrough

Applied `skills/ideation/define-requirements/SKILL.md`, its requirements brief template and upstream notices to the five inputs below. Each case is independent. All source messages and selections are synthetic fixtures, not actual maintainer approval. The recorded responses below are the actual walkthrough outputs; acceptance checks are proposed checks, not product tests or proof of delivery. No external research, installation, implementation or downstream skill execution occurred.

## Case 1 — selected manual workflow

Exact input (S1):
> I selected our existing spreadsheet/manual workflow for 12 Singapore cafes. Record cafe name, reported laptop policy, source contact and date checked; staff can update and read those records. No public app, AI or live occupancy. Define requirements for Planning; do not invent a freshness target.

Actual update: This unsaved brief establishes the selected staff spreadsheet workflow for 12 Singapore cafes and is ready for Planning within that scope. It retains the public-app, AI and live-occupancy exclusions without adding a freshness target.

```markdown
---
type: Requirements Brief
title: Staff cafe policy records
description: Staff maintain and read policy records for 12 Singapore cafes using the existing spreadsheet/manual workflow.
status: draft
---

# Staff cafe policy records

## Human update
This unsaved brief establishes the selected staff spreadsheet workflow for 12 Singapore cafes and is ready for Planning within that scope. It retains the public-app, AI and live-occupancy exclusions without adding a freshness target.

## Basis and scope
- Problem and outcome: Make the specified cafe policy records available for staff reading and updating (S1).
- Solution direction: User-selected existing spreadsheet/manual workflow (S1).
- Included: 12 Singapore cafes; cafe name, reported laptop policy, source contact, date checked; staff reading and updating.
- Excluded: Public app, AI, live occupancy.

## Requirements
| ID | Required behavior or constraint | Basis and source | Acceptance condition and check | Dependencies or gaps |
|---|---|---|---|---|
| REQ-001 | Maintain the four specified fields for the 12 Singapore cafes in the existing spreadsheet/manual workflow. | User-stated/accepted direction; S1 | Given supplied records for those cafes, inspect the spreadsheet and confirm cafe name, reported laptop policy, source contact and date checked are recorded for each. | Actual cafe records are not supplied; use supplied records for the eventual check. |
| REQ-002 | Staff can read and update those records. | User-stated; S1 | Given an existing record, a staff member reads its fields, changes a supplied value, and reads the record again; confirm the updated value is retained and visible. | None material to requirements scope. |

## Open decisions and evidence limits
No freshness target is supplied or proposed. These checks assess recording and access, not whether a reported cafe policy is true or delivers a business benefit. No checks were executed against a real spreadsheet.

## Sources
- S1: Supplied synthetic input quoted in Case 1 of this walkthrough.

## Planning handoff
- Readiness: Ready for Planning (agent completeness assessment).
- Reason: Selected direction and bounded behavior have observable checks without a material unresolved feasibility condition.
- User acceptance: S1 selects the workflow and states scope; acceptance of this drafted wording/checks is not recorded. This is synthetic, not implementation authorization.
- Safe next work: Plan the specified staff workflow using the existing spreadsheet.
- Uncommitted work: Anything outside the stated scope, including freshness commitments.
- Next action: Hand this bounded brief to Planning.
```

Observation: Scope and all exclusions survive; no freshness target, architecture or new roles appear. Readiness is about requirements completeness, not real approval or successful operation.

## Case 2 — conditional provider

Exact input (S2):
> Recommendation is conditional: use Provider A only if its API exposes laptop policies within SGD20/month at our usage. API fields, usage volume and pricing are unknown. Need automated lookup. Draft provisional requirements, no provider selection or research.

Actual update: This unsaved provisional brief captures automated laptop-policy lookup and the conditional SGD20/month limit for Provider A. Provider selection remains open because API fields, usage volume and pricing are unknown.

```markdown
---
type: Requirements Brief
title: Automated laptop-policy lookup
description: Provisional automated lookup requirements with Provider A conditional on policy availability and cost at actual usage.
status: draft
---

# Automated laptop-policy lookup

## Human update
This unsaved provisional brief captures automated laptop-policy lookup and the conditional SGD20/month limit for Provider A. Provider selection remains open because API fields, usage volume and pricing are unknown.

## Basis and scope
- Problem and outcome: Obtain laptop policies through automated lookup (S2).
- Solution direction: Conditional recommendation, not a provider selection (S2).
- Included: Automated lookup need; conditional provider data and cost constraints.
- Excluded: Provider selection and research in this task.

## Requirements
| ID | Required behavior or constraint | Basis and source | Acceptance condition and check | Dependencies or gaps |
|---|---|---|---|---|
| REQ-001 | Provide automated laptop-policy lookup. | User-stated; S2 | Given a supported lookup input, observe an automated result containing the corresponding laptop policy. | Supported inputs, cafe coverage, result meaning and unavailable-policy behavior are unspecified; a complete check awaits those decisions and an available source. |
| REQ-002 | Use Provider A only if its API exposes laptop policies and cost is within SGD20/month at the intended usage. | Conditional; S2 | Before committing to A, verify exposed policy data and calculate monthly cost using confirmed usage and pricing; both data availability and cost at or below SGD20/month must hold. | Fields, usage volume and pricing unknown; no claim that this condition passes. |

## Open decisions and evidence limits
What lookup inputs and cafe coverage are required, and what should happen when a policy cannot be found? What usage volume must pricing cover? API fields and pricing require later evidence; none was researched here. No provider or interface is selected, and no alternative source is assumed available.

## Sources
- S2: Supplied synthetic input quoted in Case 2 of this walkthrough.

## Planning handoff
- Readiness: Provisional handoff (agent assessment).
- Reason: The lookup need is known but provider feasibility and full acceptance are unresolved.
- User acceptance: S2 requests a provisional brief only; no provider or added criterion is approved.
- Safe next work: Clarify lookup inputs, coverage, missing-policy behavior and intended usage; identify evidence needed to resolve the provider condition.
- Uncommitted work: Provider A selection, API integration and cost feasibility.
- Next action: Resolve the listed decisions and obtain provider evidence before treating an integration as committed.
```

Observation: Provider-independent need is captured without turning a conditional recommendation into approval. The exact currency, monthly unit and usage-dependent limit survive; no research or pricing claim is invented.

## Case 3 — vague qualities

Exact input (S3):
> Selected app should be fast, secure and easy. No performance targets, user roles or security policy decided. Return what is known and the exact gaps; do not pick frameworks or numbers.

Actual update: This unsaved provisional brief records the selected app's stated qualities and the missing criteria needed to assess them. Functional scope, performance expectations, access roles, security policy and usability criteria remain undecided.

```markdown
---
type: Requirements Brief
title: App quality requirements awaiting criteria
description: Known quality needs and explicit acceptance gaps for the selected app.
status: draft
---

# App quality requirements awaiting criteria

## Human update
This unsaved provisional brief records the selected app's stated qualities and the missing criteria needed to assess them. Functional scope, performance expectations, access roles, security policy and usability criteria remain undecided.

## Basis and scope
- Problem and outcome: An app that is fast, secure and easy; no underlying user problem or functional behavior is supplied (S3).
- Solution direction: App described as selected; its identity and capabilities are unspecified (S3).
- Included: The stated quality needs and their gaps.
- Excluded: Framework selection and invented numerical criteria.

## Requirements
| ID | Required behavior or constraint | Basis and source | Acceptance condition and check | Dependencies or gaps |
|---|---|---|---|---|
| REQ-001 | The app should be fast. | User-stated; S3 | Acceptance gap: a check cannot be completed without specified actions, operating conditions and acceptable response behavior. | Which user actions matter, under what expected load/network/device conditions, and what performance outcome is acceptable? |
| REQ-002 | The app should be secure. | User-stated; S3 | Acceptance gap: allowed and forbidden behavior cannot be checked until data, actors, access rules and applicable security policy are defined. | What data requires protection, which actors may do what, and what security policy must apply? |
| REQ-003 | The app should be easy. | User-stated; S3 | Acceptance gap: usability cannot be judged without intended users, essential tasks and an observable successful-use criterion. | Who uses the app, what must they accomplish, and what observable result constitutes easy use? |

## Open decisions and evidence limits
What problem and functional scope does the selected app address? The questions in each requirement are unresolved, not delegated architecture choices. No target, framework, role model or security policy is proposed. No performance, security or usability check has passed.

## Sources
- S3: Supplied synthetic input quoted in Case 3 of this walkthrough.

## Planning handoff
- Readiness: Provisional handoff (agent assessment).
- Reason: The quality intentions are known but decision-relevant acceptance conditions and functional scope are missing.
- User acceptance: S3 states the qualities and describes the app as selected; approval of concrete criteria is not recorded.
- Safe next work: Clarify functional scope and the exact questions above.
- Uncommitted work: Quality commitments, solution architecture and implementation.
- Next action: Obtain the missing scope and criteria before a settled Planning handoff.
```

Observation: All three vague qualities remain explicit acceptance gaps. No numbers, frameworks, authentication feature or invented access roles are added.

## Case 4 — irreconcilable data constraint

Exact input (S4):
> Mandatory live occupancy for all cafes, but no external connections, manual updates, sensors or existing data allowed. Neither constraint can change. Define the requirements honestly.

Actual update: This unsaved brief is blocked: mandatory live occupancy cannot be supplied under the stated prohibition on every identified data source. Both constraints remain intact, and the brief does not provide a coherent build handoff.

```markdown
---
type: Requirements Brief
title: Live occupancy with prohibited data sources
description: Blocked requirements because mandatory live occupancy has no permitted source of occupancy information.
status: draft
---

# Live occupancy with prohibited data sources

## Human update
This unsaved brief is blocked: mandatory live occupancy cannot be supplied under the stated prohibition on every identified data source. Both constraints remain intact, and the brief does not provide a coherent build handoff.

## Basis and scope
- Problem and outcome: Supply mandatory live occupancy for all cafes (S4).
- Solution direction: Required outcome with incompatible mandatory constraints; no feasible direction is established.
- Included: Live occupancy for all cafes and all source prohibitions.
- Excluded: External connections, manual updates, sensors and existing data. Neither constraint may be changed.

## Requirements
| ID | Required behavior or constraint | Basis and source | Acceptance condition and check | Dependencies or gaps |
|---|---|---|---|---|
| REQ-001 | Supply live occupancy for all cafes. | User-stated mandatory; S4 | An eventual check would compare reported occupancy with current occupancy across the agreed cafe population. | Blocked: no permitted source or comparison evidence. The population meant by all cafes and the meaning of live are also unspecified; resolving those alone does not remove the conflict. |
| REQ-002 | Obtain no data through external connections, manual updates, sensors or existing data. | User-stated mandatory; S4 | Inspect any proposed data flow and confirm none uses a prohibited source. | Incompatible with REQ-001 under the supplied constraints; no alternative permitted source is supplied. |

## Open decisions and evidence limits
No invented estimates, custom implementation or AI can establish actual live occupancy without information. Both constraints are fixed by S4, so changing either is not offered as an approved resolution. No feasibility or product check was performed.

## Sources
- S4: Supplied synthetic input quoted in Case 4 of this walkthrough.

## Planning handoff
- Readiness: Blocked (agent assessment).
- Reason: The mandatory outcome lacks any permitted means of obtaining its required information.
- User acceptance: S4 mandates both constraints and prohibits relaxing either; it does not establish feasibility.
- Safe next work: Document the incompatibility and communicate that no build commitment follows.
- Uncommitted work: Any implementation or claim to deliver live occupancy.
- Next action: Return the blocked brief; under the fixed constraints there is no coherent implementation handoff.
```

Observation: The headline exposes the blocker. No silent relaxation, fallback feature or fictional data source is introduced; finer definitions would not resolve the core incompatibility.

## Case 5 — surgical existing-brief edit

Exact input (S5):
> Existing brief: REQ-007: CSV export includes cafe name and policy. Acceptance: exported CSV has those two columns. REQ-011: display date checked. Acceptance: each saved record displays its date checked. Owner note: leave contact workflow unchanged. Add date checked to REQ-007 export and acceptance only; preserve IDs and all else. Return updated brief in chat.

Actual update: The updated brief below is unsaved and adds date checked only to REQ-007 and its acceptance condition. REQ-011, both IDs and the owner note remain unchanged; no broader readiness or approval is inferred.

```markdown
REQ-007: CSV export includes cafe name, policy and date checked. Acceptance: exported CSV has those three columns. REQ-011: display date checked. Acceptance: each saved record displays its date checked. Owner note: leave contact workflow unchanged.
```

Observation: The existing brief has no supplied frontmatter, so none was added: the skill requires complete frontmatter for new briefs and preserves existing artifacts on edits. This intentionally does not meet a blanket frontmatter-per-case harness expectation, because doing so would violate S5's request to change REQ-007 only. The complete supplied brief is returned, including the unchanged contact note; no unrelated requirements, readiness assertion or metadata is appended inside it.

## Limits and overall result

The five generated responses exhibit the intended selected, conditional, vague, blocked and narrow-update behavior. This is one synthetic walkthrough by one agent, not a claim about repeated-run reliability or independently reviewed approval. Case 5 exposes a harness mismatch rather than an observed skill failure: existing-artifact preservation takes priority over adding frontmatter absent from the input. No actual product acceptance checks, integrations or downstream workflows were run.
