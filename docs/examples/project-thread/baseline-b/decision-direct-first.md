---
type: Decision
title: Direct dependencies first
description: Defer transitive exploration while checking the first understanding task.
status: draft
sources:
  - id: fixture
    resource: https://github.com/ChouBokYann/visuAI-DLC/issues/1
    title: Synthetic scenario specified in issue 1
visu:
  schema_version: 1
  id: decision-direct-first
  relations:
    - predicate: affects
      target: feature-progress-view
      basis: declared
      source: fixture
    - predicate: supersedes
      target: decision-blocker-scope
      basis: declared
      source: fixture
---

# Rationale

Start with direct blockers to isolate the first understanding task. Defer transitive impact exploration until the direct view is assessed.

# Tradeoff

The initial view will not explain the full indirect dependency chain. Revisit when walkthrough evidence shows users need it.

Synthetic example only. Source describes the scenario, not evidence that it has been built or approved.
