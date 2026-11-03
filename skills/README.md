# AI-DLC skills

Skills are grouped by their primary lifecycle process:

1. [Ideation](ideation/) — explore problems, opportunities, and intended outcomes.
2. [Planning](planning/) — define requirements, design the solution, and plan delivery.
3. [Implementation](implementation/) — build the planned changes.
4. [Verification](verification/) — check correctness, quality, and acceptance criteria.
5. [Deployment](deployment/) — release changes and verify them in the target environment.
6. [Maintenance](maintenance/) — operate, diagnose, and improve the delivered software.

This is the usual progression, not a mandatory one-way sequence. Work can return to an earlier process as new information emerges.

## Adding a skill

Place each skill in its own folder under its primary process:

```text
skills/<process>/<skill-name>/SKILL.md
```

Use lowercase, hyphen-separated skill names. Add `references/`, `scripts/`, or `assets/` inside a skill only when needed. Reference skills from other processes rather than duplicating them.

Process folders organize the library; individual `SKILL.md` files are the reusable skill entry points. Runtime discovery and installation of this nested layout will be checked when a distribution target is chosen.
