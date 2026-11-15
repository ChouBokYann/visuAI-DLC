# Release record template

Use only for a new record. Prefer updating the release section in the current delivery document. Preparation and execution share this record; neither creates a new report for every action.

```markdown
---
type: Release Record
title: [Release and target]
description: [Current outcome and material condition]
status: draft
---

# [Release and target]

## Identity and scope
[Stable release ID/kind; linked requirements and decisions; exact source revision, artifact/digest or unresolved build identity; target account/project/service/environment; previous/observed version.]

## Evidence and authorization
[Direct verification evidence and tested state; actual release decision source and action/target scope; human review status; unknowns. Approval and technical evidence remain distinct.]

## Procedure and prerequisites
[Existing pipeline/runbook and intended operation; relevant configuration references without values; migration ordering/compatibility; missing prerequisites and their owners.]

## Checks and recovery
[Installed-version evidence; changed-behavior smoke checks and applicable observation window; permitted test data/side effects; recovery trigger, procedure, authority, data/schema limits, and documented/rehearsed/observed basis.]

## Current execution and observations
[Preparation: Prepared / Conditional / Blocked. Execution: Not started / Submitted / In progress / Deployed / Failed / Unknown, with actual operation identity and evidence. Use the platform's more precise states where appropriate.]

[Target acceptance: Verified / Failed / Not performed, with actual observations, environment/version, and limits. Recovery: Not needed / Not attempted / In progress / Verified / Failed / Unknown, as applicable.]

## Next owner/action
[Specific authorized next action or missing decision/access; retain partial state and useful prior attempts as history.]
```

Use actual states rather than guessing missing observations. A submitted pipeline is not an observed deployment; an observed installation is not successful acceptance; an attempted recovery is not verified recovery. Deployment and recovery may have different artifact identities. Document `status` does not encode any of those outcomes or approval. No new ontology schema is implied.
