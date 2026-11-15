# Implementation record template

Use an existing delivery record when possible. Add only concrete entries; do not fill every future increment or create a separate report for each cycle. Keep current state distinct from useful history.

```markdown
---
type: Implementation Record
title: [Requested change]
description: [Current outcome and material limitation]
status: draft
---

# [Requested change]

## Scope and baseline
[Requirements/direction references, actual authorization and exclusions, source revision and relevant working-tree changes.]

## Current increment and progress
[Concrete work ID/kind, requirement or decision relationship, affected paths/interfaces, intended observable behavior, and actual state. Keep remaining scope visible; exact detail only for the active increment.]

## Evidence
| Evidence ID | Assesses | Tested state | Actual command or inspection | Result and limits |
|---|---|---|---|---|
| [ID] | [Work/requirement ID and canonical location] | [Commit plus relevant uncommitted state, or artifact reference] | [What actually ran/was inspected, or not run] | [Passed/failed/not run/inconclusive and what this establishes] |

## Decisions and remaining work
[Material local adjustments and reasons; actual choice source; supersession if applicable. Remaining scope, blockers, invalidated evidence, and unverified assumptions.]

## Handoff
- State: [Ready for Verification / Partial / Blocked, with reason]
- Next owner/action: [Review, remaining work, or concrete unblock step]
- Limits: [Required checks or review not performed, evidence boundaries]
```

Preserve existing metadata and stable IDs. Relationships name both ends with their basis; do not duplicate reverse links. Document `status` is distinct from implementation state and approval. Use the shared output contract without introducing a mandatory extra file or claiming automatic verification.

## Structured context when writing this record

Read the [shared output contract](../../../../docs/contracts/workflow-context.md) and add `workflow_context` to the existing frontmatter when this document owns semantic entries. Use its copyable block, replacing examples with grounded IDs, sources and body anchors. Update an existing owner rather than duplicate entries in this document; reference-only handoffs need no empty metadata block. Do not create all record kinds or repeat business analysis to fill the template. If the shared contract is unavailable, preserve the established format and report export compatibility as unavailable.
