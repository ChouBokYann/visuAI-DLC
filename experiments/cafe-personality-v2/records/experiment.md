---
title: Cafe experiment 02
description: Visual storytelling retry with explicit quality evidence
workflow_context:
  version: 1
  project: coffee-personality-v2
  records:
  - id: R2-PROBLEM
    kind: problem
    status: active
    title: The first experience missed the expectation
    summary: The first caf? demo worked, but the user rejected wordiness, 3D artifacts
      and animation. Retry the same brief with explicit experience criteria.
    detail: '#r2-problem'
    sources:
    - id: brief
      ref: '#brief'
    links: []
    workflow:
      phase: ideation
      step: orient
      iteration: retry-2
  - id: R2-OUTCOME
    kind: outcome
    status: planned
    title: A caf? shaped by your choices
    summary: Discover a Singapore caf? through a concise visual story or coffee search;
      user completeness and quality judgments remain pending.
    detail: '#r2-outcome'
    sources:
    - id: brief
      ref: '#brief'
    links:
    - relation: addresses
      target: R2-PROBLEM
      basis: stated
      source: brief
      reason: Preserve the original goal while addressing the failed presentation.
    workflow:
      phase: ideation
      step: orient
      iteration: retry-2
    measurement: User compares both runs and supplies their own completeness and quality
      judgments; no controlled efficacy claim.
  - id: R2-STORY
    kind: requirement
    status: proposed
    title: Let choices carry the story
    summary: The user chose stylized caf? exploration. The agent operationalized this
      as arrival, coffee, company and daylight choices, with short copy and visible
      room changes.
    detail: '#r2-story'
    sources:
    - id: brief
      ref: '#brief'
    links:
    - relation: supports
      target: R2-OUTCOME
      basis: stated
      source: brief
      reason: Make narrative actions visible rather than explaining them in paragraphs.
    workflow:
      phase: ideation
      step: orient
      iteration: retry-2
    acceptance: Complete and revise the four-step story; choices change the room and
      explainable cafe ranking; copy stays concise.
    revision: working-tree-sha256:4d9b9da13e88ddcdc4b5a1916deaecad61279e79392bbdfdfee077720bb835bf
  - id: R2-SEARCH
    kind: requirement
    status: proposed
    title: Keep coffee search independent
    summary: Reuse the sourced six-location shortlist, combining text, neighbourhood
      and coffee preferences; put details behind an explicit action.
    detail: '#r2-search'
    sources:
    - id: brief
      ref: '#brief'
    links:
    - relation: supports
      target: R2-OUTCOME
      basis: stated
      source: brief
      reason: Support users who already know their coffee preference without forcing
        the questionnaire.
    workflow:
      phase: ideation
      step: orient
      iteration: retry-2
    acceptance: Search/filter/reset/details/map paths work independently of the story;
      source limits remain available.
    revision: working-tree-sha256:4d9b9da13e88ddcdc4b5a1916deaecad61279e79392bbdfdfee077720bb835bf
  - id: R2-QUALITY
    kind: requirement
    status: proposed
    title: Inspect models and actual motion
    summary: Original quality expectations remain baseline. Use consistent furniture,
      meaningful seat/cup/light changes and deliberate camera transitions; inspect
      motion sequences and mobile composition.
    detail: '#r2-quality'
    sources:
    - id: brief
      ref: '#brief'
    links:
    - relation: supports
      target: R2-OUTCOME
      basis: stated
      source: brief
      reason: The previous renderer-only check did not establish artifact or animation
        quality.
    workflow:
      phase: ideation
      step: orient
      iteration: retry-2
    acceptance: Inspect representative furnishings and transitions before expanding;
      check mobile/reduced-motion alternatives; final user judgment stays pending.
    revision: working-tree-sha256:4d9b9da13e88ddcdc4b5a1916deaecad61279e79392bbdfdfee077720bb835bf
  - id: R2-ASSETS
    kind: decision
    status: proposed
    title: Reuse consistent CC0 furnishings
    summary: Use selected Kenney Furniture Kit GLBs from a pinned CC0 mirror after
      the official download was unavailable. Keep React and Three.js; reuse sourced
      caf? facts.
    detail: '#r2-assets'
    sources:
    - id: brief
      ref: '#brief'
    links:
    - relation: aims_to_achieve
      target: R2-OUTCOME
      basis: stated
      source: brief
      reason: Spend custom implementation effort on the responsive journey instead
        of remaking every furniture asset.
    workflow:
      phase: planning
      step: decide
      iteration: retry-2
  - id: R2-BUILD
    kind: change
    status: implemented
    title: Build the responsive caf? journey
    summary: A full-stage room reacts to seat, coffee, company and daylight choices.
      Search is separate; result explanations are disclosed on demand.
    detail: '#r2-build'
    sources:
    - id: brief
      ref: '#brief'
    links:
    - relation: implements
      target: R2-STORY
      basis: stated
      source: brief
      reason: Deliver the visual questionnaire.
    - relation: implements
      target: R2-SEARCH
      basis: stated
      source: brief
      reason: Deliver independent search.
    - relation: implements
      target: R2-QUALITY
      basis: stated
      source: brief
      reason: Implement and inspect the requested experience.
    workflow:
      phase: implementation
      step: act
      iteration: retry-2
    revision: working-tree-sha256:4d9b9da13e88ddcdc4b5a1916deaecad61279e79392bbdfdfee077720bb835bf
  - id: R2-CHECK
    kind: evidence
    status: passed
    title: Author checks and motion captured
    summary: Five logic cases cover 36 answer combinations. Browser checks exercise
      journeys, edits, search, keyboard focus, storage, reduced motion and fallback.
      Motion frames and a video are saved.
    detail: '#r2-check'
    sources:
    - id: brief
      ref: '#brief'
    links:
    - relation: evaluates
      target: R2-BUILD
      basis: stated
      source: brief
      reason: Observed checks and visual review cover the recorded app state.
    workflow:
      phase: verification
      step: observe
      iteration: retry-2
    scope: technical
    method: npm test; npm run build; browser-test.mjs; inspection of representative,
      mobile, pour, daylight and camera-transition screenshots.
    context: Windows, Chromium 1234 with SwiftShader; 1440x1000 desktop and 390x844
      mobile emulation. Exact source digest in verification-state.json.
    limits: Camera-state samples and screenshots establish visible transitions, not
      user approval or physical-device smoothness. Video is retained for review; no
      population efficacy claim.
    testedRevision: working-tree-sha256:4d9b9da13e88ddcdc4b5a1916deaecad61279e79392bbdfdfee077720bb835bf
  - id: R2-USER
    kind: evidence
    status: pending
    title: Your quality judgment
    summary: The second attempt is ready for user evaluation; technical passes and
      author inspection are not user acceptance.
    detail: '#r2-user'
    sources:
    - id: brief
      ref: '#brief'
    links:
    - relation: evaluates
      target: R2-OUTCOME
      basis: stated
      source: brief
      reason: The user owns quality and completeness ratings.
    workflow:
      phase: verification
      step: observe
      iteration: retry-2
    scope: business
---

<a id="brief"></a>
# Experiment 02 ? a caf? that responds

Accounting start checkpoint: 2026-11-15 08:49:08 UTC. This wall-clock interval overlaps final first-run archive work and retry preparation; it is not pure coding time. Precise implementation checkpoint: 08:51:35 UTC. Workflow revision: e677e0c. Original comparison: ../cafe-personality/EXPERIMENT.md. Human owner: ChouBokYann; agent owns experiments/cafe-personality-v2 only. User authorized retry of the same cafe brief and selected "Stylized caf? exploration: a characterful space that changes with your choices."

## Original expectation -> requirements -> done evidence

| Expectation and source | Operational interpretation (agent-proposed) | Evidence needed |
|---|---|---|
| Personality-based Singapore cafe discovery; original goal | Choices visibly configure a cafe corner and produce explainable real cafe picks | Different choices change room and matching; user can revise them |
| Questionnaire that tells a story; original goal | Explore arrival, seat, coffee and atmosphere through concise choices inside the room | Observe the complete journey with one short question per chapter; no prose paragraphs required to proceed |
| Coffee-focused search; original goal | Independent searchable sourced shortlist with coffee filters and details | Search works without completing the journey; empty/reset/detail states work |
| Three.js is the main design principle; original goal | Full-stage interactive cafe with cohesive modeled furniture, lighting, and deliberate camera movement | Inspect actual assets at intended size; record the changing room and camera transitions, not only screenshots |
| Polished portfolio demo; user selection | Coherent asset scale/materials, stable mobile composition, visible cause and effect without jarring cuts | Early representative-slice author review and final desktop/mobile motion review; user judges final quality |
| Too many words; first-run feedback | One question and short choices at each step; explanations tucked into result/details | Count visible narrative words and inspect hierarchy; the agent proposes restraint, not an arbitrary user-approved word limit |
| Better artifacts and animation; first-run feedback plus selected stylized direction | Reuse licensed furniture models; animate camera, lighting and choice-dependent room objects | Observe at least a seat-selection transition and verify reduced-motion equivalent; a renderer call is not enough |

Choices: Keep React/Three.js. Reuse first-run sourced cafe data (not a fresh cafe survey) and build a different scene/UI. Research Kenney Furniture Kit, official CC0 asset pack, as a reusable consistent furnishing set. No paid API, analytics, user account or production deployment. Exact chapter count, furnishing style and motion timing are agent proposals under implementation authority, not user-approved requirements.

## Route and stop rules

Deliver a change -> understand-expectations -> define-requirements -> lean direction -> implement a representative room/choice transition -> inspect artifacts and motion -> expand the two paths -> verify original expectations. Reuse adequate cafe research. Do not preload all skills or call perfect-it; repairing the failed original quality target is baseline work. User acceptance stays pending even when author checks pass.

## Accounting and comparison limits

Elapsed time will be measured from a precise runtime checkpoint below. No new active host goal counter has been supplied; second-run token usage is unavailable, not inferred from the completed first goal. First-run code and facts are reusable and disclosed, so this is not a controlled or blinded benchmark. Preserve separate evidence, source versions and feedback.

## Current state

Ready for user evaluation. Author functional checks passed; assets and motion sequence inspected. User quality and completeness judgments are pending. No perfect-it pass was invoked.

## Observed checks and corrections

Five logic cases passed, including all 36 paths reaching valid picks and all four portraits being reachable. Browser checks passed: complete desktop/mobile journeys, changed choices, search/filter/reset, details/directions, dialog focus restoration, refresh persistence, restart, reduced-motion static camera and no-WebGL search. A timed camera sequence changed through multiple intermediate states. Representative-home, choice, motion start/end, pour midpoint, golden-hour and mobile-result images were inspected. The CC0 assets loaded successfully; an initially overhanging plant was corrected with a complete counter. The camera movement and cup transfer are visible in captured frames; the user still owns animation-quality judgment.

Setup failures included an obsolete official asset URL, an inaccessible download endpoint, a patch-application conflict, missing video encoder and an initially over-exact accessible-name selector. These are disclosed setup/correction costs, not hidden successful checks. Playwright's isolated FFmpeg encoder was installed for recording. No personal browser was controlled.

Evidence: ../evidence/browser-observations.json, ../evidence/journey.webm and screenshots. No physical mobile performance, Safari/Firefox or real caf? visits were tested. The Three.js/GLTF chunk is approximately 613 kB minified; runtime Google Fonts requests disclose normal connection metadata, while answers remain in tab-scoped sessionStorage.

## Reuse and comparison limits

Reused the first trial's dependency lock, sourced caf? data, map-link and filter functions. Matching/story/scene/UI were rewritten. Models are by Kenney, CC0, with pinned mirror and license in public/models. Source code and captures of experiment 01 remain unchanged. User-selected stylized direction, code/data reuse and lessons from run 01 confound a direct cost/efficacy comparison. This is an informed retry, not a controlled benchmark.

<a id="r2-problem"></a>
## The first experience missed the expectation

The first caf? demo worked, but the user rejected wordiness, 3D artifacts and animation. Retry the same brief with explicit experience criteria.

<a id="r2-outcome"></a>
## A caf? shaped by your choices

Discover a Singapore caf? through a concise visual story or coffee search; user completeness and quality judgments remain pending.

<a id="r2-story"></a>
## Let choices carry the story

The user chose stylized caf? exploration. The agent operationalized this as arrival, coffee, company and daylight choices, with short copy and visible room changes.

<a id="r2-search"></a>
## Keep coffee search independent

Reuse the sourced six-location shortlist, combining text, neighbourhood and coffee preferences; put details behind an explicit action.

<a id="r2-quality"></a>
## Inspect models and actual motion

Original quality expectations remain baseline. Use consistent furniture, meaningful seat/cup/light changes and deliberate camera transitions; inspect motion sequences and mobile composition.

<a id="r2-assets"></a>
## Reuse consistent CC0 furnishings

Use selected Kenney Furniture Kit GLBs from a pinned CC0 mirror after the official download was unavailable. Keep React and Three.js; reuse sourced caf? facts.

<a id="r2-build"></a>
## Build the responsive caf? journey

A full-stage room reacts to seat, coffee, company and daylight choices. Search is separate; result explanations are disclosed on demand.

<a id="r2-check"></a>
## Author checks and motion captured

Five logic cases cover 36 answer combinations. Browser checks exercise journeys, edits, search, keyboard focus, storage, reduced motion and fallback. Motion frames and a video are saved.

<a id="r2-user"></a>
## Your quality judgment

The second attempt is ready for user evaluation; technical passes and author inspection are not user acceptance.
