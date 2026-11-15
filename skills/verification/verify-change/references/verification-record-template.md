# Verification record template

Prefer a section in the current delivery record. Use this template only for a new record; preserve existing metadata and IDs. Tables are for concrete criteria and checks, not a mandatory generic checklist.

```markdown
---
type: Verification Record
title: [Bounded change]
description: [Verdict and material limitation]
status: draft
---

# [Bounded change]

## Scope and identity
[Request, requirements and standards sources; exact baseline/comparison semantics, target and relevant dirty state; artifacts/environment inspected; excluded portions and unavailable sources. Author self-review or separate reviewer; human approval status.]

## Criteria and evidence
| Criterion ID / source | Actual behavior or artifact | Evidence ID / source and basis | Tested state / environment | Result and limit |
|---|---|---|---|---|
| [Existing reference] | [What was inspected] | [Actual check/output; reused or new, or unavailable] | [Revision plus relevant working-tree state] | [Met / Not met / Unverified / Not applicable with reason] |

## Findings and next work
[Stable finding IDs, requirement/rule references, precise affected locations, evidence/reproduction or labeled inference, consequences, and next owner/action. Retain material missing evidence and distinguish blockers from suggestions.]

## Current verdict
- Requirements: [Outcome and gaps]
- Project standards: [Outcome and gaps]
- Overall: [Verified within scope / Changes required / Incomplete; reason]
- Target acceptance: [Verified / Failed / Not performed / Not applicable; environment/version, evidence or gap]
- Review/authorization: [Actual reviewer and approval scope; not inferred from technical results]
- Next owner/action: [Fix, missing check, human review, or other authorized next step]
```

Keep actual commands/inspection details and their outputs directly accessible from evidence entries. Do not copy secrets into evidence. Document `status` is independent of technical verification, human approval, and deployment. Keep superseded findings in labeled history only when useful; no ontology schema or automatic truth verification is introduced.
