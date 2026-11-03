---
type: Feature
title: Dependency-aware progress view
description: Show blockers with the relationships needed to understand them.
status: draft
sources:
  - id: fixture
    resource: https://github.com/ChouBokYann/visuAI-DLC/issues/1
    title: Synthetic scenario specified in issue 1
visu:
  schema_version: 1
  id: feature-progress-view
  delivery_state: proposed
  relations:
    - predicate: realizes
      target: capability-blockers
      basis: declared
      source: fixture
---

# Scope

Show direct blockers first. Transitive impact exploration is deferred.

# Success criteria

A returning maintainer identifies a blocked feature and its blocking dependency without reading every issue.

Synthetic example only. Source describes the scenario, not evidence that it has been built or approved.
