# Diagnosis record template

Use for a new record only; prefer a section in an existing incident or delivery document. Keep the current explanation and next action clear, with useful superseded material in history.

```markdown
---
type: Diagnosis Record
title: [Observed problem]
description: [Current cause assessment and next response]
status: draft
---

# [Observed problem]

## Symptom and scope
[Expected/actual behavior; requirement/release references; affected version/environment; reported versus observed impact; current authority and boundaries.]

## Evidence and hypotheses
| ID / kind | Observation or prediction | Source / tested state / actual check | Result and limits |
|---|---|---|---|
| [Concrete ID] | [Evidence fact or falsifiable hypothesis] | [Canonical reference, conditions, version, executed command/inspection or not performed] | [Actual result; supporting/contradicting connection with stated/inferred basis] |

## Current assessment and response
- Cause: [Supported / Provisional / Undetermined; explanation and evidence]
- Mitigation: [Not performed / Attempted / Observed effective / Failed / Unknown; actual scope and limits]
- Response: [Smallest justified change or next evidence-gathering step; not assumed accepted]
- Success signal: [Check against the original symptom/criterion; proposed, not already passed]
- Temporary changes: [Probes/test data still present, ownership and cleanup needs, or none]
- Next owner/action: [Concrete diagnostic step, implementation, decision, or authorized operational action]
```

Preserve existing IDs/metadata; do not create a record per hypothesis. Cite only relevant redacted evidence. Cause confidence, incident resolution, document lifecycle, and approval are separate facts; typed links follow the shared output contract and do not automatically verify causation.

## Structured context when writing this record

Read the [shared output contract](../../../../docs/contracts/workflow-context.md) and add `workflow_context` to the existing frontmatter when this document owns semantic entries. Use its copyable block, replacing examples with grounded IDs, sources and body anchors. Update an existing owner rather than duplicate entries in this document; reference-only handoffs need no empty metadata block. Do not create all record kinds or repeat business analysis to fill the template. If the shared contract is unavailable, preserve the established format and report export compatibility as unavailable.
