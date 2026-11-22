# AI-DLC skills

Follow [NORTHSTAR.md](../NORTHSTAR.md) on main for current direction. Compare independently explored candidates from pstack, Superpowers, and Matt Pocock before selecting shared versions. No fixed number of skills or common visualization record format is required.

Skills are grouped by their primary lifecycle process:

1. [Ideation](ideation/) — explore problems, opportunities, and intended outcomes.
2. [Planning](planning/) — set lean technical direction, constraints, and the next useful increment.
3. [Implementation](implementation/) — plan each increment in detail, build, check, and adjust.
4. [Verification](verification/) — check correctness, quality, and acceptance criteria.
5. [Deployment](deployment/) — release changes and verify them in the target environment.
6. [Maintenance](maintenance/) — operate, diagnose, and improve the delivered software.

This is the usual progression, not a mandatory one-way sequence. Work can return to an earlier process as new information emerges.

## Adding a skill

Follow the [contribution workflow](../workflow.md): propose the need in a GitHub issue and obtain acceptance before implementing a skill.

Place each skill in its own folder under its primary process:

```text
skills/<process>/<skill-name>/SKILL.md
```

Use lowercase, hyphen-separated skill names. Add `references/`, `scripts/`, or `assets/` inside a skill only when needed. Reference skills from other processes rather than duplicating them.

Process folders organize the library; individual `SKILL.md` files are the reusable skill entry points. Runtime discovery and installation of this nested layout will be checked when a distribution target is chosen.

For hotfixes, features, design changes, new modules, modularisation, and logic checks, start with the [engineering situation router](../docs/workflows/engineering.md). It supports single-agent work and authorized multi-agent ownership/handoffs without loading the whole library. The [Symphony prompt adapter](../docs/workflows/symphony.md) describes workspace availability and host integration; it is not an installed runtime.

## Outputs for business-connected understanding

The branch candidates now use the [shared output contract](../docs/contracts/workflow-context.md) to preserve business problems, intended outcomes, decisions, changes and evidence in their Markdown documents. The optional viewer consumes generated data; running it is not required to use the skills. Keep the shared contract in distributed bundles, or disclose the standalone fallback. This branch addition follows explicit session acceptance and does not claim independent review or main adoption.

## Optional quality calibration and refinement

For new or materially changed UI with unresolved direction, use [Set UI direction](planning/set-ui-direction/SKILL.md) before implementation. It produces one visual-and-interaction brief for an implementation specialist; established patterns and backend-only changes skip discovery.

Use [Understand expectations](ideation/understand-expectations/SKILL.md) when good enough is unclear, and [Perfect it](implementation/perfect-it/SKILL.md) for authorized bounded improvement. They are independently callable supplements, not mandatory lifecycle steps. See the [scope and validation record](../docs/proposals/bounded-quality.md).

## Workflow entry point

For an end-to-end request, start with [Deliver a change](../docs/workflows/deliver-change.md). It selects only relevant skills, carries original expectations into requirements, and distinguishes functioning, requested quality and user acceptance at completion. Use the situation router for specialized branches. Workflows coordinate skills; they are not installed host automation.
