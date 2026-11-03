---
type: Capability
title: Understand blocked work
description: Connect blocked work to the reason it cannot proceed.
status: draft
sources:
  - id: fixture
    resource: https://github.com/ChouBokYann/visuAI-DLC/issues/1
    title: Synthetic scenario specified in issue 1
visu:
  schema_version: 1
  id: capability-blockers
  relations:
    - predicate: contributes_to
      target: goal-returning-maintainer
      basis: declared
      source: fixture
---

# Contribution

Make blockers visible in the context of the project goal. The contribution is an expectation until observed.

Synthetic example only. Source describes the scenario, not evidence that it has been built or approved.
