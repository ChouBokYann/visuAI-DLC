# Decision brief template

Fill from actual context. Preserve an existing record's layout where possible. Quote YAML values containing significant characters. Use `Unknown` for material missing information; omit inapplicable sections rather than inventing content. No semantic extension is defined here.

```markdown
---
type: Solution Recommendation
title: [Problem-focused title]
description: [One-sentence recommendation or unresolved choice]
status: draft
---

# [Decision title]

## Human update
[One or two sentences: direction, reason, decisive condition or next action.]

## Decision context
- Problem and outcome: [Source-linked need]
- Mandatory conditions: [Conditions and sources; unknown classifications explicit]
- Preferences: [User priorities and sources, or Unknown]
- Existing decision: [Decision, source and scope, or None supplied]

## Comparison
| Option | Mandatory-condition fit | Tradeoffs and evidence | Disposition |
|---|---|---|---|
| [Option] | [Meets / Fails / Unknown for each relevant condition] | [Supported facts, source IDs, evidence kind, assumptions] | [Reason retained, ruled out, or unresolved] |

## Recommendation and rationale
[Direction, why it fits, alternatives not selected and why, custom gap if any. No unsupported scores.]

## Conditions and uncertainty
[Decisive unknowns, conflicts, costs/usage assumptions, unrun checks, and what would change the recommendation.]

## Evidence
[Stable source IDs, direct links or supplied-artifact references, supported claims and their limits. No invented access dates or verification.]

## Handoff
- Decision state: [Recommendation proposed / Conditional recommendation / Selection deferred / Existing user decision documented]
- User acceptance: [Only actual acceptance, with source and scope; otherwise Not recorded]
- Capabilities, constraints and exclusions: [Bounded input to requirements; distinguish proposed from agreed]
- Next action: [User decision, targeted check, or requirements handoff]
```

`status: draft` concerns the document, not whether the user has selected a solution. Existing acceptance applies only to its actual scope; a new recommendation cannot inherit it automatically. For unsaved output, place the complete filled document in one Markdown code block after the short human update.
