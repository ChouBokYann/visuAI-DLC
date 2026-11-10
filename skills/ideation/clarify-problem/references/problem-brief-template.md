# Problem brief template

Use the following structure for a new brief. Replace bracketed instructions with grounded content. For an existing brief, preserve its layout and metadata where possible rather than forcing a rewrite.

`status: draft` describes the document lifecycle, not work progress, approval, or verification. `sources` is optional: add real accessible source resources when available; otherwise identify supplied messages in the body. Keep any approved semantic extension intact; this template defines none.

```markdown
---
type: Problem Brief
title: [Short problem name]
description: [One sentence describing the unmet need]
status: draft
---

# [Problem name]

## Human update
[One or two sentences: problem, significance, and material uncertainty or next action.]

## Problem and context
- Affected users: [Known audience, with source, or Unknown]
- Situation and unmet need: [Concrete problem and why it matters, with source]
- Current approach and shortcoming: [Reported or observed behavior, with source, or Unknown]

## Intended outcome
- Desired change: [User outcome, not a presumed feature or technology]
- Success indicators: [Observable criteria; label proposed criteria and unknown targets]

## Constraints and scope
[Firm constraints and exclusions with sources; distinguish suggestions from decisions.]

## Evidence and uncertainty
[Source references and what they establish. Separate user reports, observations, assumptions, and conflicts. Record material unknowns without fabricating answers.]

## Handoff
- Readiness: [Ready for solution research / Needs clarification; agent assessment]
- Reason: [Why the known context is sufficient, or the specific blocker]
- Remaining research questions: [Questions research can answer; None if none]
- Next action: [Research direction, blocking question, or discovery action]
- User confirmation: [Only record confirmation actually supplied; otherwise Not recorded]
```

Quote YAML values when they contain colons or other YAML-significant characters. Use normal Markdown source links or footnotes for accessible artifacts; a descriptive reference such as “User's message describing their last cafe search” is preferable to an invented URL. A source does not automatically verify the claim attributed to it.
