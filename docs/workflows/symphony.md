# Symphony prompt adapter

Candidate prompt integration, not an installed or live-tested Symphony configuration. Preserve your target project's existing runtime/tracker settings, permissions, and contribution rules. The [Symphony specification](https://github.com/openai/symphony/blob/main/SPEC.md) describes a per-issue prompt in WORKFLOW.md; verify the exact implementation/version before configuring its keys or states. No universal YAML configuration is supplied here.

## Make the library available

Use a pinned copy of this library in the target repository at `vendor/visuai-dlc/` (or substitute your chosen path consistently). Include `skills/` with supporting references/notices and `docs/workflows/` preserving relative layout. Record the source commit in the target project's dependency/vendor record. Existing destination files must be compared, not silently replaced. Each issue workspace must receive that same version; a path to another developer's machine is not sufficient.

Explicit file-path loading is portable even when the host does not discover nested skill directories. Do not additionally install all skills globally. A repo checkout already containing this library can use its own relative paths instead of vendoring itself.

## Prompt block

Insert the following prose into the Markdown prompt body of the target's existing WORKFLOW.md after its issue context. It intentionally uses no new template variables. Replace the library path if different.

```text
Read vendor/visuai-dlc/docs/workflows/engineering.md and follow its situation routing
within this issue's authorized scope. Load only the next relevant SKILL.md and
needed references; use sufficient supplied requirements/direction without restarting.

On every attempt, reconcile current issue context, workspace changes, evidence freshness,
and prior external operations before repeating work. Record the library revision used.
Establish outcome, criteria, baseline, owned write scope, dependencies, authority,
and the canonical handoff destination. Do not infer merge or deployment permission.

If delegation is supported and authorized, assign independent work with explicit write
ownership and shared-contract versions. One integrating agent updates the canonical
work record and verifies the combined result. Worker summaries alone are not evidence.

When a material decision or access requirement blocks progress, record the exact missing
input, current evidence, and next owner. Follow this project's configured blocked/review
handoff and eligibility policy; do not fabricate answers or loop on an unchanged blocker.
If no such policy exists, report that configuration gap rather than invent tracker states.

At a meaningful handoff, provide one or two sentences naming the result and material gap,
linked to the current work record. Preserve detailed evidence there without per-agent
report duplication. Completion is scoped to the issue outcome, not a process exit code.
```

## Host configuration and trial

The prompt cannot enforce scheduler locks or change issue eligibility by itself. Before unattended use, configure and test actual tracker states, blocked/review dispatch eligibility, credentials, workspace population, agent permissions, and retry/reconciliation behavior in the selected host. Ticket writes require authorized tools; local Markdown is not a tracker transition. If a blocker cannot be made non-dispatchable through authorized means, the operator must suspend that work item or dispatch before unattended retries continue.

Start with an isolated issue/workspace and the [scenario acceptance cases](../proposals/scenario-agent-workflows.md). Verify skill paths resolve after workspace creation, retries preserve partial work, a blocked decision stops redispatch, and two workers' incompatible changes fail combined checks. Do not run release actions as an installation smoke test. The user project's live trial remains a separate activity.

Reference inspected: upstream Draft v1 spec at main, 2026-11-15. This adapter is project-authored prose; it copies no Symphony configuration/code. The host version and tracker are not selected by this repository, so live compatibility remains unverified.
