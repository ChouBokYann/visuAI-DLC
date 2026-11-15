---
type: Delivery Record
title: Synthetic cafe trial
status: draft
workflow_context:
  version: 1
  project: cafe-trial
  records:
  - id: PROBLEM-001
    kind: problem
    status: active
    title: Finding a work-friendly cafe
    summary: Workers cannot easily identify cafes with the amenities they need.
    detail: '#problem-001'
    sources:
    - id: brief
      ref: brief.md#basis
    links: []
  - id: OUTCOME-001
    kind: outcome
    status: undecided
    title: Reduce cafe search effort
    summary: Help workers find a suitable cafe with less search effort.
    detail: '#outcome-001'
    sources:
    - id: brief
      ref: brief.md#basis
    links:
    - relation: addresses
      target: PROBLEM-001
      basis: stated
      source: brief
      reason: Suitability information is intended to reduce repeated searches.
  - id: REQ-001
    kind: requirement
    status: proposed
    title: Filter by amenities
    summary: Filter by reported Wi-Fi and power availability.
    detail: '#req-001'
    sources:
    - id: brief
      ref: brief.md#basis
    links:
    - relation: supports
      target: OUTCOME-001
      basis: stated
      source: brief
      reason: Narrowing unsuitable options may reduce search effort.
    acceptance: Required amenities exclude reported mismatches; missing data stays
      visibly unknown.
  - id: DECISION-001
    kind: decision
    status: accepted
    title: Reuse a places provider
    summary: Integrate an existing provider; check coverage before commitment.
    detail: '#decision-001'
    sources:
    - id: brief
      ref: brief.md#basis
    links:
    - relation: aims_to_achieve
      target: OUTCOME-001
      basis: stated
      source: brief
      reason: Reuse existing location data to support suitability filtering.
    authority: brief
  - id: CHANGE-001
    kind: change
    status: implemented
    title: Cafe filters
    summary: Synthetic implementation of amenity filtering.
    detail: '#change-001'
    sources:
    - id: brief
      ref: brief.md#basis
    links:
    - relation: implements
      target: REQ-001
      basis: stated
      source: brief
      reason: Supplies the requested filtering behaviour.
    - relation: implements
      target: DECISION-001
      basis: stated
      source: brief
      reason: Uses the selected provider approach.
    revision: fixture-v1
  - id: EVIDENCE-001
    kind: evidence
    status: passed
    title: Synthetic filter check
    summary: Simulated functional pass, not an executed test.
    detail: '#evidence-001'
    sources:
    - id: brief
      ref: brief.md#basis
    links:
    - relation: evaluates
      target: CHANGE-001
      basis: stated
      source: brief
      reason: Checks filtering behaviour only.
    scope: technical
    testedRevision: fixture-v1
    method: Synthetic filter input/output example.
    context: Illustrative local fixture; no real cafe application.
    limits: No actual test ran and no business outcome was measured.
---

# Cafe trial

<a id="problem-001"></a>
## Finding a work-friendly cafe

Workers cannot easily identify cafes with the amenities they need.

<a id="outcome-001"></a>
## Reduce cafe search effort

Help workers find a suitable cafe with less search effort.

<a id="req-001"></a>
## Filter by amenities

Filter by reported Wi-Fi and power availability.

<a id="decision-001"></a>
## Reuse a places provider

Integrate an existing provider; check coverage before commitment.

Alternative: build a custom directory. Reuse avoids unnecessary implementation, but source coverage remains a constraint. Revisit when coverage or usage rights prevent the intended experience.

<a id="change-001"></a>
## Cafe filters

Synthetic implementation of amenity filtering.

<a id="evidence-001"></a>
## Synthetic filter check

Simulated functional pass, not an executed test.
