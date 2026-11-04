---
type: Decision
title: Initial blocker scope
description: Explore direct and transitive blocker relationships.
status: draft
sources:
  - id: fixture
    resource: https://github.com/ChouBokYann/visuAI-DLC/issues/1
    title: Synthetic scenario specified in issue 1
visu:
  schema_version: 1
  id: decision-blocker-scope
  relations:
    - predicate: affects
      target: feature-progress-view
      basis: declared
      source: fixture
---

# Rationale

Closed-issue counts conceal why remaining work is blocked. Initially propose both direct and transitive exploration.

# Alternatives

A task list alone is simpler but does not explain dependency chains.

Synthetic example only. Source describes the scenario, not evidence that it has been built or approved.
