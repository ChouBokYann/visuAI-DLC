# Experiment 12: Coffee Atlas

Status: accepted for local execution, 2026-11-22. User answered the approval/waiver question with go ahead and explicitly selected Taste UI. Owner: ChouBokYann. Baseline: first-iteration at b80ffbd. Implementation and local verification underway.

## Change and need

Exercise requirements, UI direction, implementation and verification on a medium-difficulty product. User wants a cartoonish world map showing coffee origins, flavour notes and coffee culture, with Singapore cafes selling coffee from the selected origin. User chose real sourced listings. Existing coffee experiments are quizzes, not origin discovery.

## Design and scope

Primary journey: illustrated world map -> origin details -> sourced Singapore cafe matches. “Place” means growing origin; Singapore is the destination for cafe discovery. Initial scope: six origins across the Americas, Africa and Asia/Oceania, with at least three independent Singapore cafe/roaster businesses. Exact origins follow verified source coverage. This is a curated starting collection, not an exhaustive worldwide directory.

User direction: clean, cream-esque and cartoonish. Proposed interpretation: spacious warm cream canvas, espresso typography, muted sage/terracotta accents and an original illustrated flat map with recognisable geography. Playful botanical/bean details remain secondary to readable labels. No unnecessary 3D, dense dashboard or generic marketing-card layout.

Desktop: map beside selected origin details and cafe matches. Mobile: compact map and accessible origin selector followed by details in normal document flow. Markers and equivalent list controls work with keyboard and touch. Selected origin is deep-linkable and browser back restores selection. Include flavour-family filtering, reset and a useful empty state. Respect reduced motion.

Origin summaries distinguish typical flavour tendencies from specific lot notes; processing, variety and roasting can change flavour. Brief culture summaries need sources and must avoid stereotypes. Cafe records include product/origin evidence, physical-location evidence, source links, checked date and evidence status. Online bean listings do not prove a particular branch serves that coffee today. Historical, sold-out and confirmed serving evidence must remain distinguishable; missing matches stay honest.

Excluded: accounts, commerce, reviews, bookings, AI recommendations, database, live inventory, scraping service, location tracking and production deployment. No changes to core workflow skills or the workflow visualization layer.

## Alternatives and direction

Recommend an SVG atlas with accessible HTML controls and curated local data. A rotating globe adds accessibility and interaction complexity; commercial map tiles add runtime dependencies without helping the requested illustrative style. Revisit a backend when content maintenance or live stock requires it. Reuse installed React/Vite/TypeScript and browser tooling where suitable; prefer native capabilities over new dependencies.

First useful slice: one source-backed origin -> real Singapore cafe match, rendered and checked at desktop and mobile sizes before expanding all six entries.

## Tools, permissions and data

Public web research, local files, installed build tooling and Playwright in a dedicated test profile; loopback-only preview with an owned process. No unrelated tabs, personal documents, credentials, paid API calls, downloads, global configuration changes or external publication. Original SVG/CSS illustrations; no unlicensed cafe photos/logos. Installed Taste UI (design-taste-frontend) is the user-selected UI specialist, subordinate to the user brief; use documented fallback if its launcher is unavailable, without downloading tools automatically. OpenShell is optional, not implied by local execution: record the actual isolation used.

## Acceptance and checks

- E12-01: Six origins across three world areas have sourced flavour and culture summaries; general patterns and lot-specific claims are distinguished.
- E12-02: Each marker/list selection shows the correct origin and related cafes. Expected relationships come from separately specified examples.
- E12-03: At least three real Singapore businesses have supported location/product records. Every origin-to-cafe match has source evidence and a checked date. No invented stock or branch-level serving claims.
- E12-04: Flavour filtering, clearing and empty-state recovery work; tests cover their interaction with selection.
- E12-05: Direct origin URL, reload and back navigation work; invalid origin falls back safely.
- E12-06: Desktop and narrow mobile have no page overflow, essential clipping or overlapping labels; keyboard/pointer reach equivalent content, focus is visible and reduced motion works.
- E12-07: Inspect actual desktop/mobile map and detail screens against clean, cream and cartoon direction. Save screenshots; functional tests alone do not establish visual quality. User aesthetic acceptance remains pending until actually given.
- E12-08: Relevant logic tests, build and browser journeys pass. One targeted incorrect mapping/filter variant must fail the intended assertion in an isolated control; setup failures do not count.
- E12-09: One delivery record retains requirements, UI decisions, source dates, skills used, tested artifact, workflow gaps and limitations. No core-skill edits or publication without scope.

## Ownership and approval

Human owner: ChouBokYann. Agent responsibilities: research, design brief, implementation, verification and report. Owned paths: experiments/coffee-atlas/**, output/coffee-atlas/** and this proposal. Preserve existing experiments and unrelated work. No parallel writers required.

GitHub coffee issue search returned no matching issue. This completed proposal is the local issue draft. Repository issue-first and other-maintainer acceptance gates require explicit local waiver or normal approval before implementation; prior trial waivers do not cover this new product. Approval does not authorize commits, pushes, deployment or paid services.

## Sources, impact and risks

Research entry points observed 2026-11-22: https://pppcoffee.com/collections/beans ; https://pppcoffee.com/pages/our-stores ; https://nylon.coffee/ ; https://tionghoe.com/ . These establish feasibility, not a completed dataset. Verify specific product/location relationships before displaying them. Use short attributed paraphrases and retain links.

Project skill route: define-requirements -> set-development-direction -> set-ui-direction -> implement-increments -> verify-change. Diagnose only actual defects as needed. Existing skill attribution remains intact. Record specialist version and any reused code/assets and licenses during implementation.

Main risks: seasonal availability, online versus in-cafe ambiguity, oversimplified national flavour descriptions, and map usability on narrow screens. Mitigations are dated evidence/status, clear caveats, lot-aware descriptions and rendered interaction tests. If sourced coverage cannot meet the stated target, disclose the gap rather than invent entries or silently reduce scope. Rollback affects only the isolated trial directories.

## Open decision

Approve this design and scope, and waive issue-first/other-maintainer gates for this local trial. Exact styling and routine implementation choices are delegated within this direction. Necessary deterministic corrections are allowed; optional polishing follows the specialist's bounded review guidance. No live deployment is requested.
