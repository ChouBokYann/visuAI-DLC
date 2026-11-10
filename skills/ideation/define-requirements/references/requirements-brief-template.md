# Requirements brief template

Use the smallest complete set of requirements. Replace bracketed instructions with grounded content or explicit unknowns. Preserve existing formats/IDs when updating. Quote YAML values containing significant characters. This template defines no semantic extension.

```markdown
---
type: Requirements Brief
title: [Problem-focused title]
description: [One-sentence scope and any decisive condition]
status: draft
---

# [Requirements title]

## Human update
[One or two sentences: bounded scope, important blocker or next action.]

## Basis and scope
- Problem and outcome: [Direct source or supplied-message reference]
- Solution direction: [Selected / Proposed / Conditional / Undecided, with source]
- Included: [Agreed scope; distinguish proposals]
- Excluded: [Explicit exclusions]

## Requirements
| ID | Required behavior or constraint | Basis and source | Acceptance condition and check | Dependencies or gaps |
|---|---|---|---|---|
| [Stable ID] | [Bounded statement] | [User-stated/accepted, Agent-proposed, or Conditional; source] | [Context/input, expected outcome, observable check; missing criteria explicit] | [Required decision or feasibility condition; None if none] |

## Open decisions and evidence limits
[Unresolved thresholds, conflicts, provider assumptions, proposals needing confirmation, and checks not performed. Preserve changes to earlier decisions where relevant.]

## Sources
[Stable references to actual supplied decisions, messages, or directly relevant evidence. No fabricated approvals, dates or URLs.]

## Planning handoff
- Readiness: [Ready for Planning / Provisional handoff / Blocked; agent assessment]
- Reason: [Why, including material conditions]
- User acceptance: [Actual source and scope, or Not recorded; distinguish solution acceptance from new criteria]
- Safe next work: [Planning questions or scope that may proceed without assuming unresolved facts]
- Uncommitted work: [What depends on missing decisions/evidence]
- Next action: [Specific decision/check or Planning handoff, not task decomposition]
```

Acceptance conditions describe how to judge a result; filling the table never proves they passed. `status: draft` is document lifecycle, independent of readiness or user acceptance. For chat-only delivery, return the entire filled document in one Markdown code block following the short human update.
