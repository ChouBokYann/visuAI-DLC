---
title: Recommend-solution synthetic walkthrough
status: draft
---

# Recommend-solution synthetic walkthrough

Executed five isolated responses using `skills/ideation/recommend-solution/SKILL.md` and its decision-brief template and upstream notices. Each case below contains the exact supplied input, the actual short response, and a complete copyable brief. Source identifiers are local to each case. All sources and decisions are supplied synthetic fixtures, not real provider evidence or real user acceptance. No network, provider testing, purchases, installs, implementation, or separate brief saves occurred. The responses say “unsaved” because their standalone briefs are returned inline; this file is the saved evaluation record.

## Case 1 — Sufficient existing workflow

### Exact input

> Need record laptop policies for 12 cafes; automatic live occupancy is excluded. Mandatory monthly budget <= SGD20. S1 supplied synthetic pilot: our existing spreadsheet with manual contact workflow records all 12 policies and costs SGD0 extra; current staff can maintain it. S2 synthetic quote: custom AI app costs SGD500 monthly, adds recommendations nobody requested. Recommend direction; no implementation.

### Actual short response

Recommend the existing spreadsheet and manual contact workflow: the supplied synthetic pilot covers all 12 cafes with SGD0 extra cost, while the custom app exceeds the budget. The standalone brief is unsaved below; this is a proposed direction awaiting your acceptance.

### Returned brief

```markdown
---
type: Solution Recommendation
title: Record laptop policies for 12 cafes
description: Reuse the existing spreadsheet and manual contact workflow.
status: draft
---

# Record laptop policies for 12 cafes

## Human update
Recommend the existing spreadsheet and manual contact workflow: the supplied synthetic pilot covers all 12 cafes with SGD0 extra cost, while the custom app exceeds the budget. This standalone brief is unsaved; the direction is proposed, with acceptance not recorded.

## Decision context
- Problem and outcome: Record laptop policies for 12 cafes (U1).
- Mandatory conditions: Monthly budget <= SGD20; cover the 12 cafes (U1).
- Preferences: None supplied.
- Existing decision: None supplied.
- Exclusions: Automatic live occupancy and implementation (U1).

## Comparison
| Option | Mandatory-condition fit | Tradeoffs and evidence | Disposition |
|---|---|---|---|
| Existing spreadsheet plus manual contact | Coverage meets; incremental monthly cost meets | S1 synthetic pilot reports all 12 policies, SGD0 extra cost, and maintenance within current staff capability; manual contact remains necessary | Recommend |
| Custom AI app | Monthly budget fails; coverage Unknown | S2 synthetic quote is SGD500/month and includes unrequested recommendations | Reject on mandatory budget |

## Recommendation and rationale
Reuse the spreadsheet and manual contact workflow. It already addresses the bounded need in the supplied pilot; no custom gap is demonstrated. The custom app exceeds the hard budget and its additional recommendations do not remedy that failure.

## Conditions and uncertainty
Cost fit uses incremental expenditure because S1 specifies “SGD0 extra”; total allocated staff cost is Unknown. If the cap includes allocated labor, confirm that accounting interpretation before commitment. The pilot is supplied evidence, not a test performed here. Reconsider if required coverage or maintenance capacity changes, or if confirmed monthly expenditure exceeds SGD20.

## Evidence
- U1 — Supplied synthetic task: 12 cafes, monthly cap SGD20, live occupancy excluded, no implementation.
- S1 — Supplied synthetic pilot: existing spreadsheet/manual contact records all 12 policies; SGD0 extra; current staff can maintain it. Does not quantify allocated labor cost or long-term accuracy.
- S2 — Supplied synthetic quote: custom AI app SGD500 monthly with unrequested recommendations. Does not establish coverage.

## Handoff
- Decision state: recommendation proposed.
- User acceptance: Not recorded.
- Capabilities, constraints and exclusions: Proposed manual policy record for 12 cafes within SGD20/month; no live occupancy or extra recommendation feature.
- Next action: User accepts or revises proposed direction; clarify labor accounting if relevant. Do not implement on this recommendation alone.
```

## Case 2 — Hard data constraint outranks price

### Exact input

> Must keep all customer data on premises. Prefer lowest price. S1 synthetic docs: A costs SGD5/month but requires cloud upload. S2 synthetic docs: B costs SGD15/month and runs locally, meets our required import/export. No other budget limit. Recommend.

### Actual short response

Recommend B based on the supplied synthetic documentation: it runs locally and supports the required import/export, while A's mandatory cloud upload conflicts with keeping customer data on premises. The standalone brief is unsaved below; B's documented behavior has not been tested here.

### Returned brief

```markdown
---
type: Solution Recommendation
title: Select an on-premises customer-data tool
description: Propose B because A requires prohibited cloud upload.
status: draft
---

# Select an on-premises customer-data tool

## Human update
Recommend B based on the supplied synthetic documentation: it runs locally and supports the required import/export, while A's cloud upload conflicts with the on-premises requirement. This standalone brief is unsaved; documented behavior has not been tested here.

## Decision context
- Problem and outcome: Select a customer-data tool with required import/export (U1, S2).
- Mandatory conditions: All customer data remains on premises; required import/export (U1).
- Preferences: Lowest price; no hard budget supplied (U1).
- Existing decision: None supplied.

## Comparison
| Option | Mandatory-condition fit | Tradeoffs and evidence | Disposition |
|---|---|---|---|
| A | On-premises fails; import/export Unknown | S1 synthetic docs: SGD5/month, cloud upload required | Ineligible despite lower price |
| B | Local operation and import/export documented; end-to-end data retention not tested | S2 synthetic docs: SGD15/month, runs locally, required import/export supported | Propose from documented fit |

## Recommendation and rationale
Propose B. The SGD10/month saving with A cannot compensate for a failed mandatory data constraint. No hard budget excludes B. This is a documentation-based recommendation; local operation is the supplied support for on-premises fit, not proof that every configuration retains all customer data.

## Conditions and uncertainty
No runtime checks were performed. Before handling customer data, confirm the intended B configuration, including any export destination, keeps all customer data on premises. If B requires off-premises transfer, neither supplied option is established as eligible and selection must be reconsidered. Operating labor and additional charges are Unknown; the comparison uses the supplied monthly prices only.

## Evidence
- U1 — Supplied synthetic task: on-premises customer data mandatory, lowest price preferred, required import/export, no other budget limit.
- S1 — Supplied synthetic documentation: A costs SGD5/month and requires cloud upload. Import/export capability not supplied.
- S2 — Supplied synthetic documentation: B costs SGD15/month, runs locally, meets required import/export. No hands-on verification supplied.

## Handoff
- Decision state: recommendation proposed.
- User acceptance: Not recorded.
- Capabilities, constraints and exclusions: Proposed B with required import/export and all customer data on premises; no cloud upload permitted.
- Next action: User considers B; confirm deployment data flows before use. No installation, purchase, or data transfer authorized by this brief.
```

## Case 3 — Unknown API access and price

### Exact input

> Need automated laptop-policy lookup within SGD20/month. A UI displays policies (synthetic S1); API field access and price are unknown. B explicitly has no policy data (synthetic S2). Recommend, no research/network.

### Actual short response

Defer selection: A's UI display does not establish automated field access or budget fit, and B has no policy data. The standalone brief is unsaved below; choosing A requires supplied evidence of automation access and a monthly cost within SGD20, and no research or network check was performed.

### Returned brief

```markdown
---
type: Solution Recommendation
title: Automated laptop-policy lookup within budget
description: Defer selection until automation access and cost are established.
status: draft
---

# Automated laptop-policy lookup within budget

## Human update
Defer selection: A's automation access and budget fit are Unknown, while B lacks policy data. This standalone brief is unsaved; supplied access and pricing evidence is needed, and no research or network check was performed.

## Decision context
- Problem and outcome: Automated laptop-policy lookup (U1).
- Mandatory conditions: Automation with policy data; monthly cost <= SGD20 (U1).
- Preferences: None supplied.
- Existing decision: None supplied.

## Comparison
| Option | Mandatory-condition fit | Tradeoffs and evidence | Disposition |
|---|---|---|---|
| A | Automated access Unknown; price Unknown | S1 synthetic evidence establishes UI display only; API field access unknown | Candidate pending decisive evidence |
| B | Policy-data requirement fails; price Unknown | S2 explicitly states no policy data | Reject for this need |

## Recommendation and rationale
Defer selection. No supplied option is established to meet every mandatory condition. A may qualify if usable automated access to the policy field and cost within SGD20/month are established, but a visible UI field does not establish API availability. B cannot supply the requested data. Custom code alone does not establish an accessible policy source.

## Conditions and uncertainty
A's automated field access and price could reverse the outcome. Obtain supplied documentation or other bounded evidence of permitted automation access, policy-field availability, usage limits, and monthly price at the intended lookup volume; volume is also Unknown. No research is performed under this request. Do not infer scraping permission or relax automation or budget requirements.

## Evidence
- U1 — Supplied synthetic task: automated policy lookup within SGD20/month; no research/network.
- S1 — Supplied synthetic UI evidence: A displays policies; API field access and price unknown. UI display does not establish automation access.
- S2 — Supplied synthetic evidence: B explicitly has no policy data; this is affirmative absence, not an inference from missing documentation.

## Handoff
- Decision state: selection deferred.
- User acceptance: Not recorded.
- Capabilities, constraints and exclusions: Automated policy lookup <= SGD20/month; no selection, build plan, network research, or assumed scraping access.
- Next action: User supplies bounded A access/pricing evidence and expected usage, or explicitly revises constraints. Reassess then.
```

## Case 4 — Preserve the user's decision history

### Exact input

> I previously approved A for Singapore scope (supplied decision D1). New synthetic API docs S1 say A removed its policy field. Document implications; do not silently replace my decision. B has a policy field per synthetic S2 but Singapore coverage is unknown.

### Actual short response

Document A as your previously approved Singapore choice, now undermined by the supplied API field-removal evidence; I have not replaced it with B. The standalone brief is unsaved below; reconsideration needs your decision, and B's Singapore coverage remains unknown.

### Returned brief

```markdown
---
type: Solution Recommendation
title: Implications of A's removed policy field
description: Preserve the Singapore approval of A and document the new feasibility conflict.
status: draft
---

# Implications of A's removed policy field

## Human update
A remains the recorded user-approved Singapore choice, but new supplied API evidence undermines policy-field access; no replacement has been approved. This standalone brief is unsaved; reconsideration needs the user's decision, and B's Singapore coverage remains Unknown.

## Decision context
- Problem and outcome: Document implications for the existing Singapore selection (U1, D1).
- Mandatory conditions: Singapore scope is explicit; policy-field access is decision-relevant from U1/S1. Full original acceptance criteria are Unknown.
- Preferences: Unknown.
- Existing decision: D1 records prior approval of A for Singapore; original rationale and date were not supplied.

## Comparison
| Option | Mandatory-condition fit | Tradeoffs and evidence | Disposition |
|---|---|---|---|
| A | Required API policy field unavailable in new docs; other original criteria Unknown | S1 synthetic API docs state field removed; D1 retains historical Singapore approval | Preserve decision and flag conflict |
| B | Policy field documented; Singapore coverage Unknown; other original criteria Unknown | S2 synthetic docs establish field existence only | Possible reconsideration candidate, not selected |

## Recommendation and rationale
Document the existing decision and propose reconsideration, without overwriting it. A's prior approval cannot establish current API feasibility after field removal. A workflow dependent on that field cannot proceed as originally assumed without a supported alternative access path; none was supplied. B is not a confirmed Singapore replacement solely because it has a policy field.

## Conditions and uncertainty
The original rationale, costs, other constraints, and any alternate A access path are Unknown. Field removal does not establish that all policy information disappeared everywhere in A. A replacement decision needs evidence of B's Singapore coverage and the original acceptance criteria. No API tests or external checks were run.

## Evidence
- U1 — Supplied synthetic task: document implications, preserve prior choice, Singapore scope.
- D1 — Supplied synthetic prior decision: user approved A for Singapore. No rationale or date supplied; no approval of B.
- S1 — Supplied synthetic new API docs: A removed its policy field. Supports an API capability conflict, not a claim about every A interface.
- S2 — Supplied synthetic docs: B has a policy field; Singapore coverage unknown.

## Handoff
- Decision state: existing user decision documented.
- User acceptance: D1 supplies historical acceptance of A for Singapore within this synthetic case only; no replacement acceptance and no real-user acceptance inferred.
- Capabilities, constraints and exclusions: Preserve Singapore scope and decision history; no silent substitution, migration, or implementation.
- Next action: User decides whether to reopen selection; supply original criteria and B Singapore coverage evidence for that reconsideration. Carry the feasibility conflict forward explicitly.
```

## Case 5 — Preference determines the winner

### Exact input

> Two tools A and B both meet every mandatory condition (synthetic S1/S2). A is easier to operate but costs more; B is cheaper but needs weekly maintenance. No preference or hard budget supplied. Tell me which to choose without inventing my priorities.

### Actual short response

Selection is deferred because the choice depends on an unsupplied preference: would you prioritize easier operation with A or lower price with B and weekly maintenance? The standalone brief is unsaved below; both meet the supplied mandatory conditions, so neither has an evidence-supported unconditional advantage.

### Returned brief

```markdown
---
type: Solution Recommendation
title: Choose between ease of operation and lower price
description: Defer a single winner until the user supplies the decisive preference.
status: draft
---

# Choose between ease of operation and lower price

## Human update
Selection is deferred: would you prioritize easier operation with A or lower price with B and weekly maintenance? This standalone brief is unsaved; both meet the supplied mandatory conditions, so the preference determines the choice.

## Decision context
- Problem and outcome: Choose between two eligible tools (U1).
- Mandatory conditions: Both meet all conditions according to supplied S1/S2; individual conditions are not enumerated in the fixture.
- Preferences: Unknown; no hard budget supplied (U1).
- Existing decision: None supplied.

## Comparison
| Option | Mandatory-condition fit | Tradeoffs and evidence | Disposition |
|---|---|---|---|
| A | All meet per supplied synthetic S1 | Easier to operate, higher price; exact cost Unknown | Choose if ease is the decisive preference |
| B | All meet per supplied synthetic S2 | Cheaper, requires weekly maintenance; effort duration and total operating cost Unknown | Choose if lower price is decisive and maintenance is acceptable |

## Recommendation and rationale
Defer an unconditional selection and ask for the consequential preference. The supplied evidence supports a conditional mapping, not a universal winner: A for easier operation, B for lower price with acceptable weekly maintenance. No weights or user priorities can be inferred from eligibility alone.

## Conditions and uncertainty
If actual price difference or maintenance effort affects the user's preference, request those bounded details before selection. Do not assume B has the lower total cost after labor, that A needs no maintenance, or that a hard budget exists. No tool testing was performed; mandatory fit is the supplied fixture assertion.

## Evidence
- U1 — Supplied synthetic task: choose without inventing priorities; no preference or hard budget.
- S1 — Supplied synthetic fixture: A meets all mandatory conditions, easier to operate but costs more. Exact prices and operating effort not supplied.
- S2 — Supplied synthetic fixture: B meets all mandatory conditions, cheaper but needs weekly maintenance. Maintenance duration and labor valuation not supplied.

## Handoff
- Decision state: selection deferred.
- User acceptance: Not recorded.
- Capabilities, constraints and exclusions: Both remain eligible on supplied evidence; do not invent preference, scoring weights, or a budget.
- Next action: User states whether easier operation or lower price with weekly maintenance takes priority; obtain quantitative details only if needed to resolve that preference. No implementation handoff yet.
```

## Observed findings and limits

| Case | Observed response | Finding |
|---|---|---|
| 1 | Proposed existing spreadsheet; rejected SGD500 app; kept incremental-cost qualification | Sufficient reuse recognized; hard budget visible; no novelty-driven build |
| 2 | Proposed B from documented local/import-export fit; rejected cloud-upload A | Price preference did not override mandatory data constraint; no runtime verification claimed |
| 3 | Deferred; named A access, usage, and pricing evidence needed; rejected B's explicit data absence | Unknown UI-to-API access was not promoted to a pass; no network used |
| 4 | Preserved D1 and documented API conflict; B unselected | Existing acceptance retained within supplied scope; no invented replacement approval |
| 5 | Deferred and asked the precise preference question; supplied conditional mapping | No fabricated weights or winner |

No behavioral failure was observed in these five generated responses. Case 2 has a meaningful evidence limit: “runs locally” does not independently prove every data flow stays on premises. Its brief exposes that limit and requires deployment confirmation before customer-data use; its proposed recommendation rests on supplied documentation rather than a tested security property. Case 1 similarly distinguishes SGD0 extra from total allocated labor cost.

These are completed synthetic response walkthroughs, not independent usability trials, provider validation, real-user acceptance, or proof across all possible inputs. The task-specific questions are recorded responses; no actual human answers were received. Only this record was written.

## Review correction and rerun

The original “No behavioral failure” assessment above was incorrect. It is preserved as evaluation history, not the current conclusion. Parent review identified two failures: case 1's human update and decision state treated incremental cost as sufficient despite a potentially different mandatory budget basis; case 2's human update and decision state treated local execution as sufficient despite missing evidence about all customer-data flows. Detailed caveats did not repair the unconditional wrappers. Case 2's missing documentary support was also wrongly framed mainly as an unperformed runtime check. Both original responses failed to propagate a decisive uncertainty into the recommendation state and human update.

After rereading the amended skill, cases 1 and 2 were executed again below with identical inputs. These are new actual responses, not expected-output descriptions. All evidence remains supplied and synthetic. No additional evidence, network access, provider tests, or user acceptance was obtained.

### Case 1 rerun — exact input

> Need record laptop policies for 12 cafes; automatic live occupancy is excluded. Mandatory monthly budget <= SGD20. S1 supplied synthetic pilot: our existing spreadsheet with manual contact workflow records all 12 policies and costs SGD0 extra; current staff can maintain it. S2 synthetic quote: custom AI app costs SGD500 monthly, adds recommendations nobody requested. Recommend direction; no implementation.

### Actual short response

Conditionally recommend the existing spreadsheet and manual contact workflow: it covers all 12 cafes, provided the SGD20 monthly cap applies to incremental spending or its total counted monthly cost is confirmed within that cap; SGD0 extra does not establish total cost. The standalone brief is unsaved below; the SGD500 custom app fails the budget, and the budget basis needs clarification before accepting this direction.

### Returned brief

```markdown
---
type: Solution Recommendation
title: Record policies for 12 cafes within the monthly cap
description: Conditionally reuse the existing workflow pending confirmation of budget fit.
status: draft
---

# Record policies for 12 cafes within the monthly cap

## Human update
Conditionally recommend the spreadsheet and manual contact workflow if the SGD20 monthly cap applies to incremental spending or the total counted monthly cost is confirmed within that cap; SGD0 extra alone does not establish total cost. This standalone brief is unsaved; clarify the budget basis before accepting the direction, and reject the SGD500 custom app on budget.

## Decision context
- Problem and outcome: Record laptop policies for 12 cafes (U1).
- Mandatory conditions: Cover all 12 cafes and monthly budget <= SGD20 (U1); incremental versus total-cost accounting is Unknown.
- Preferences: None supplied.
- Existing decision: None supplied.
- Exclusions: Automatic live occupancy and implementation (U1).

## Comparison
| Option | Mandatory-condition fit | Tradeoffs and evidence | Disposition |
|---|---|---|---|
| Existing spreadsheet/manual contact | Coverage meets in supplied pilot; incremental cost meets; total counted cost Unknown | S1 synthetic pilot reports all 12 policies, SGD0 extra, current staff able to maintain it; staff capacity does not quantify staff cost | Conditional recommendation |
| Custom AI app | Budget fails; coverage Unknown | S2 synthetic quote: SGD500 monthly; unrequested recommendations | Reject |

## Recommendation and rationale
Conditionally reuse the existing spreadsheet and manual contact workflow. The supplied pilot supports coverage and staff capability without a new build, but the recommendation depends on budget fit under the user's intended accounting basis. The custom app already fails the mandatory cap; additional features cannot offset that failure.

## Conditions and uncertainty
Confirm whether the cap measures incremental spending. If it does, the supplied SGD0 extra supports cost fit. If it measures total counted costs, establish those costs, including any counted staff time, at <= SGD20/month before accepting this recommendation. This is missing evidence or clarification, not merely a test that this agent did not run. If the workflow exceeds the applicable cap, neither supplied option is established as eligible. No live pilot was run here; S1 is a supplied synthetic pilot report.

## Evidence
- U1 — Supplied synthetic task: policies for 12 cafes, monthly cap SGD20, occupancy excluded, no implementation. Budget accounting basis not specified.
- S1 — Supplied synthetic pilot: spreadsheet/manual contact covers all 12 cafes, costs SGD0 extra, maintainable by current staff. Total cost and counted staff cost not supplied.
- S2 — Supplied synthetic quote: custom AI app SGD500 monthly with unrequested recommendations. Coverage not established.

## Handoff
- Decision state: conditional recommendation.
- User acceptance: Not recorded.
- Capabilities, constraints and exclusions: Proposed manual record for 12 cafes within SGD20/month under the confirmed accounting basis; no live occupancy or extra recommendations.
- Next action: Clarify budget basis and, if total costs count, supply the cost evidence; then accept or revisit the proposed workflow. No implementation.
```

### Case 2 rerun — exact input

> Must keep all customer data on premises. Prefer lowest price. S1 synthetic docs: A costs SGD5/month but requires cloud upload. S2 synthetic docs: B costs SGD15/month and runs locally, meets our required import/export. No other budget limit. Recommend.

### Actual short response

Conditionally recommend B only if all customer-data flows are confirmed to stay on premises: its local execution and import/export support do not establish that mandatory condition, while A's required cloud upload fails it. The standalone brief is unsaved below; evidence covering B's data flows is needed before selection, not just a check that it runs locally.

### Returned brief

```markdown
---
type: Solution Recommendation
title: Select a tool that keeps all customer data on premises
description: Conditionally recommend B pending evidence of all customer-data flows.
status: draft
---

# Select a tool that keeps all customer data on premises

## Human update
Conditionally recommend B only if all customer-data flows stay on premises; local execution and import/export support alone do not establish that mandatory condition, while A's cloud upload fails it. This standalone brief is unsaved; obtain evidence of B's data flows before selection.

## Decision context
- Problem and outcome: Select a customer-data tool with required import/export (U1, S2).
- Mandatory conditions: All customer data on premises; required import/export (U1).
- Preferences: Lowest price; no hard budget supplied (U1).
- Existing decision: None supplied.

## Comparison
| Option | Mandatory-condition fit | Tradeoffs and evidence | Disposition |
|---|---|---|---|
| A | All-data-on-premises fails; import/export Unknown | S1 synthetic docs: SGD5/month with required cloud upload | Reject despite lower price |
| B | All-data-on-premises Unknown; import/export documented as meeting requirements | S2 synthetic docs: SGD15/month and local execution; no complete data-flow evidence supplied | Conditional recommendation |

## Recommendation and rationale
Conditionally recommend B if evidence establishes that all customer data stays on premises in the intended configuration. It has the required import/export and is the only supplied option not already ruled out, but it is not yet established as eligible. A's lower price cannot offset its mandatory cloud upload. No unconditional choice is justified by the present evidence.

## Conditions and uncertainty
Obtain bounded documentation or configuration evidence covering B's customer-data destinations, including any import/export, telemetry, backup, or synchronization paths that exist. These are paths to account for, not claims that B has such features. Confirm that none transfers customer data off premises. “Runs locally” establishes execution location, not all data destinations: the supplied documentation is incomplete on the decisive requirement, rather than adequate documentation merely awaiting this agent's runtime test. If off-premises customer-data transfer is required, reject B too; otherwise its documented import/export and SGD15/month price support this conditional direction. No provider checks or customer-data transfers were performed.

## Evidence
- U1 — Supplied synthetic task: all customer data on premises mandatory; lowest price preferred; required import/export; no other budget limit.
- S1 — Supplied synthetic docs: A SGD5/month and required cloud upload. Import/export Unknown.
- S2 — Supplied synthetic docs: B SGD15/month, local execution, required import/export supported. Whether every customer-data flow stays on premises is Unknown.

## Handoff
- Decision state: conditional recommendation.
- User acceptance: Not recorded.
- Capabilities, constraints and exclusions: Proposed B only if all customer data stays on premises; required import/export; no cloud customer-data transfer.
- Next action: Supply bounded B data-flow evidence and confirm the intended configuration, then accept or revisit selection. No purchase, installation, or data transfer.
```

### Rerun assessment

Both reruns now use `conditional recommendation`, name the precise mandatory unknown in both short response and brief, and identify the evidence or clarification needed without inventing it. This addresses the two observed failures in the original run; it does not erase them. Cases 3–5 were not rerun because this review requested only cases 1–2. No independent user trial or general reliability claim follows from these synthetic reruns.
