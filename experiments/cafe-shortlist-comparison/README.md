# Café shortlist: two workflow trials

Perry requested the same development task twice: first using **Bok workflow + Perry additions**, then using the **pstack feature and verification workflow**, adapted to the available Codex tools. This is an evaluation of a local feature and its workflow, not a claim that Lauren Tan personally follows every step used here.

Both started from `3ed7fc82373b7eab9f8bb5b3d8c50a0547bea051`, with the same café app, dependencies, approved [brief](brief.md), and [22 frozen acceptance checks](acceptance.md). The shortlist holds three cafés, compares their facts, survives refresh, and handles unavailable or damaged browser storage.

**Result: both variants passed all 22 independent acceptance criteria, with zero established product defects during independent review.** Tests and production builds passed. A required two reviewer-harness corrections; B required none. Author rework is recorded separately below.

[Open the visual comparison](index.html) · [22-case result matrix](acceptance-results.md).

Local previews while their owned servers remain running: [comparison report](http://127.0.0.1:5186/), [Bok + Perry app](http://127.0.0.1:5181/), [pstack app](http://127.0.0.1:5182/).

## How the agents collaborated

1. **Coordinator (root):** fixed scope, prepared clean checkouts, checked both baselines, assigned file ownership, and preserved evidence. Perry is the accountable human owner.
2. **Acceptance reviewer (`shortlist_acceptance`):** froze the shared criteria before inspecting either implementation. It ran independent browser journeys after each author froze their source. It could adapt selectors but could not change expected outcomes or product code.
3. **Author A (`cafe_cedar`):** used the repository's implement-increments, exercise-user-journey, verify-change and maintain-user-journeys skills. Owned only its isolated café app and evidence.
4. **Author B (`cafe_willow`):** used the pstack feature playbook, architecture/domain/verification principles, and generated a project-specific verification skill. The coordinator prepared [architecture direction](pstack-direction.md) before reading A's implementation. B owned a separate checkout and received no A implementation or results.
5. **Coordinator:** compared the verified results, preserved independent reports and reproducible source patches, and presented the tradeoffs for human review.

Implementation A preceded B. A's independent acceptance overlapped B's implementation. One writer per app avoided competing edits to shared React state; independent review supplied a separate check on each author's claims. Neither author spawned nested agents.

## What changed in the apps

| Aspect | Bok workflow + Perry additions | pstack-inspired workflow |
|---|---|---|
| Comparison surface | Full page; three desktop cards, stacked mobile cards | Native modal dialog; three desktop cards, vertically scrollable mobile content |
| Data ownership | Small shortlist module and state in App | Small shortlist module and one `useShortlist` owner |
| Reusable verification | `SHORTLIST-JOURNEY.md`, feature table, executable browser helper | `.cursor/skills/verify-sidequest/SKILL.md`, feature map, executable helper |
| Logic tests | 8 total: original 5 + 3 shortlist cases | 9 total: original 5 + 4 shortlist cases |
| Additional regression | Connected search/story/focus/storage journeys | Connected journeys plus original motion/reduced-motion/no-WebGL browser suite |

Test counts describe different groupings, not a quality ranking. See the independent per-criterion evidence for the common comparison.

## Improvements supported by this trial

- **Add a filename preflight.** Both authors independently created a `Shortlist.tsx`/`shortlist.ts` collision on this case-insensitive filesystem. Naming presentation modules `ShortlistView` or `ShortlistDialog` avoided the build failure.
- **Keep rendered inspection as an explicit gate.** B's functional checks passed before visual self-review found a storage warning that could cover mobile story controls. The author moved it into document flow and added a geometry/control check before independent review.
- **Record behavioral failures during test-first work.** Both initial red runs failed because the new module was absent. That establishes missing implementation, but does not demonstrate that an assertion catches an incorrect storage or capacity rule.
- **Separate harness failures from product defects.** A's author corrected a disabled-control automation attempt. Its independent reviewer corrected an assumed empty-state label and a popup navigation timing race. Preserve those attempts instead of presenting them as product bugs or silently discarding them.
- **Make evidence immutable per run.** Both author helpers default to fixed output directories. Add a run identifier and preserve the first failed attempt before rerunning. B improved the existing regression helper with URL/evidence-directory overrides, which kept baseline evidence intact.
- **Make recipes discoverable.** A's app-local Markdown recipe is readable and linked; B's host-discoverable skill includes launch, doctor, drive, evidence and cleanup. The repository could use one canonical recipe with thin host-specific discovery links.
- **Select regression breadth explicitly.** A tested connected behavior while B also reran the original browser suite. A change-impact checklist would make that choice explicit before implementation.

The practical next workflow to evaluate is the existing six-phase repository structure with one feature owner, a reusable app verification recipe, screenshot inspection, and independent acceptance. Incorporate pstack's launch/doctor/drive/cleanup and verification-maintenance discipline where it improves that recipe. This trial supports those concrete practices; it does not establish a general winner.

## Evidence and reproduction

- [Setup and controls](setup.json), [raw milestones](events.json), [common brief](brief.md), [frozen acceptance](acceptance.md).
- [B independent report](evidence/pstack/report.json), [B readable matrix](evidence/pstack/report.md).
- [A independent report](evidence/bok-perry/report.json), [A readable matrix](evidence/bok-perry/report.md).
- Source variants are patches under `variants/`, each applied independently to the baseline. They exclude generated browser evidence, which can be regenerated using each variant's recipe.
- `reviewer-scripts/` preserves the actual independent harnesses, including original attempts and targeted follow-ups. These are run records with original local paths/ports, not a portable CLI. Before replay, adapt the Playwright import, output paths and owned server URL; keep the frozen outcomes unchanged. Raw reports retain their original `/tmp/cafe-acceptance/` paths; archived files with the same basenames are beside each report.

Example source reconstruction (use a fresh path for each variant):

```sh
git worktree add --detach /tmp/cafe-shortlist-review 3ed7fc82373b7eab9f8bb5b3d8c50a0547bea051
cd /tmp/cafe-shortlist-review
git apply /absolute/path/to/variants/bok-perry.patch
cd experiments/cafe-personality-v2
npm ci
npm test
npm run build
# Follow the variant's browser verification recipe using an owned local server.
```

Local source branches: `experiment/cafe-shortlist-bok-perry` at `ac4e1c7` and `experiment/cafe-shortlist-pstack` at `ebb5068`. The original app on `first-iteration-1.1` remains the common baseline; this directory archives the comparison.

## Limits and delivery status

One feature and one run per approach, same inherited model configuration and host, a coordinator who knows assignments, and sequential implementation do not support statistical speed, cost or defect-rate claims. Clock discontinuities and user pauses make overall elapsed-time comparisons unreliable; token/cost usage was not measured. See raw events rather than a synthetic stopwatch ranking.

Verification uses Chrome with desktop and mobile-sized viewports, not physical devices, Safari or Firefox. Existing café facts are reused without live revalidation. External map URL targets are checked without asserting remote map availability. Existing dependency audit advisories and the large Three.js bundle warning are inherited. Human preference between the two layouts remains open.

These are local experiment branches and an evidence archive. No merge to main, production deployment or human maintainer approval is implied. Earlier author work records remain historical snapshots of their handoff; independent reports supersede their pending-review status.

Source workflow reference: [cursor/plugins pstack](https://github.com/cursor/plugins/tree/93b916d4a1e806507e22f4716b352fa91f2b227e/pstack), version 0.15.43. Commands and delegation roles were adapted to this host; this did not reproduce a separate cloud or multi-model setup.
