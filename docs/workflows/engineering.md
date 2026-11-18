# Engineering situation router

Candidate orchestration guidance for single-agent and authorized multi-agent work. Load only the next applicable skill; the lifecycle folders organize the library rather than prescribe a six-stage ceremony. Read the task, project rules, current issue/work record, and actual work state first.

For end-to-end work, use [Deliver a change](deliver-change.md) for skill selection, expectation-to-evidence handoffs and completion rules. This table supplies situation-specific branches; it does not replace that acceptance check.

## Select an entry point

| Situation | Route when information is missing | Skip / stop rule |
|---|---|---|
| Debugging or hotfix | [Diagnose](../../skills/maintenance/diagnose-issue/SKILL.md) -> [Implement](../../skills/implementation/implement-increments/SKILL.md) -> [Verify](../../skills/verification/verify-change/SKILL.md) | Known cause and justified fix enter Implementation. Release only when authorized; urgency does not grant authority or remove required checks. |
| Add a feature | [Requirements](../../skills/ideation/define-requirements/SKILL.md) -> [Direction](../../skills/planning/set-development-direction/SKILL.md) -> Implement -> Verify | Reuse adequate inputs; unclear product solution returns to [Ideation](ideation.md), not a forced interview. |
| Design change | UI/interaction: [Experiment](../../skills/implementation/test-an-assumption/SKILL.md) if observation is needed. Business rules: [Domain clarification](../../skills/ideation/clarify-domain-model/SKILL.md). Architecture: [Impact](../../skills/planning/assess-change-impact/SKILL.md) and Direction. | A design-only request stops at design. A clear authorized change enters Implementation. Select UI expertise appropriate to the project separately. |
| New module | Requirements / Direction as needed -> [Evolve interface](../../skills/implementation/evolve-interface/SKILL.md) for independently evolving consumers -> Implement -> Verify | Start with a usable consumer path. Do not introduce contract machinery when an atomic shared type already suffices. |
| Modularise | [Understand](../../skills/implementation/understand-system/SKILL.md) -> Impact / Direction as needed -> [Refactor safely](../../skills/implementation/refactor-safely/SKILL.md) -> Verify | Reuse sufficient understanding; separate intended behavior changes from refactoring. |
| Logic check or comparison | [Compare logic](../../skills/verification/compare-logic/SKILL.md); clarify missing intended rules if they change the conclusion | Stop at comparison unless correction is authorized. Matching examples are bounded evidence, not a proof. |

Core release route, when requested: [Prepare release](../../skills/deployment/prepare-release/SKILL.md) -> [Deploy and check](../../skills/deployment/deploy-and-check/SKILL.md). Feedback uses [Address review feedback](../../skills/implementation/address-review-feedback/SKILL.md); interruptions use [Handoff work](../../skills/implementation/handoff-work/SKILL.md).

## Continue within scope

For an end-to-end assignment, proceed across relevant handoffs while scope and authority suffice. Standalone skill boundaries prevent accidental scope expansion; they do not require asking to continue after every authorized increment. Keep detailed planning inside Implementation. A local failure returns to its implementation; a failed technical direction returns to Planning; a failed product premise returns to the specific Ideation decision. Update affected records rather than generating a new chain of plans.

When a material decision cannot be inferred, stop dependent work, record the exact question and evidence, and continue independent authorized work where useful. An unattended run must hand off rather than invent a reply or repeatedly retry the same missing decision.

## Multi-agent assignment and integration

Use [Coordinate agent work](../../skills/implementation/coordinate-agent-work/SKILL.md) when the authorized task involves delegation, shared ownership, review handoffs or integration. That skill is the canonical assignment/return contract and owns writer isolation, source-linked evidence, correction/retest and cleanup guidance. Keep one current record; references to existing criteria avoid duplicate specifications. A small single-owner task can stay inline.

## Human handoff

Maintain one current work record with canonical pointers, reasons, tested state, outstanding work, and the next action. Give one or two sentences at a meaningful handoff, linking detail and including material limitations. Consolidate worker results. Technical readiness, independent acceptance, merge, and deployment are separate claims.

See the [Symphony prompt adapter](symphony.md) for portable attachment guidance and the [scenario proposal](../proposals/scenario-agent-workflows.md) for acceptance cases. This router does not install a runtime, grant permissions, or guarantee scheduler behavior.

## Business-connected document handoff

Skills own the [shared output contract](../contracts/workflow-context.md): preserve business intent, explicit links, rationale and scoped evidence in existing Markdown records. Assign one writer per owning document, integrate changes before exporting a complete baseline, and use source references rather than copying records between workers. Include the contract at its repository-relative path when distributing skills; missing contract support must be disclosed. The exporter creates a derived snapshot only; this does not install a watcher or Symphony publishing hook.

## Bounded quality refinement

When quality expectations are unclear, use [Understand expectations](../../skills/ideation/understand-expectations/SKILL.md). Normal development ends when its acceptance and required verification are complete; no polishing step is implied. Only for explicitly requested additional refinement on verified work, use [Perfect it](../../skills/implementation/perfect-it/SKILL.md): one bounded assessment, maximum two improvement rounds by default, and earlier stop at enough, stagnation or a blocker. Existing explicit limits take precedence. This budget applies to the refinement objective, not an arbitrary two-attempt cap on every engineering task.

Carry the canonical expectations and ledger, sole coordinator, total/used/remaining rounds, active reservation and any time/spend limit in every assignment and handoff. Workers share one finite batch and cannot start their own loops. Retries reconcile reservations; they never reset usage. Exhaustion must stop refinement and follow the host's actual review/blocked policy; it is not success or automatic authority to extend. If the host cannot prevent redispatch, the operator must suspend that objective.
