# Research brief template

Replace bracketed instructions with established findings, not guesses. Omit inapplicable details; keep decision-relevant unknowns explicit. Preserve an existing brief's structure where possible. Quote YAML values containing colons or other significant characters. Do not invent an OKF semantic extension.

```markdown
---
type: Solution Research
title: [Problem-focused research title]
description: [One-sentence scope]
status: draft
---

# [Research title]

## Human update
[One or two sentences: material findings, important uncertainty, next action.]

## Scope
- Problem: [Reference to supplied brief or concise sourced need]
- Material questions and constraints: [What this research must establish]
- Search coverage: [Actual channels, queries/scope, dates, supplied evidence, unavailable sources]

## Options and fit
| Option or existing approach | Fit to need and evidence | Reuse/integration path | Constraints and unknowns |
|---|---|---|---|
| [Candidate] | [Requirement-specific claim with source ID and evidence kind] | [Documented interface or workflow; mark inferences] | [Relevant access, coverage, cost assumptions, restrictions, or gaps] |

## Evidence
| ID | Source or supplied artifact | Date/revision and retrieval status | Supported claim and limits |
|---|---|---|---|
| [Stable source ID] | [Direct primary-source URL or accurate supplied-artifact reference] | [Actual access date; publication/revision when known; or supplied/not accessed] | [What it establishes, scope, and whether documented or observed] |

## Uncertainty and changed findings
[Conflicts, stale facts, untested integration assumptions, and material changes to an existing conclusion. Distinguish missing documentation from evidence of absence. Omit change history when there is no previous finding.]

## Handoff
- Readiness: [Ready for comparison / Partial research / Needs clarification; agent assessment]
- Reason: [Evidence sufficiency or specific blocker]
- Next action: [Comparison question or bounded check; identify access needed for an unrun probe]
- Limits: [What was not researched or tested; no final selection implied]
```

Use stable evidence IDs and direct links so claims can be checked without traversing a report chain. Record the source passage or section needed to locate support without copying entire documents. A documented capability and a successful execution are different evidence kinds. `status: draft` is document lifecycle, not research completeness or verification.
