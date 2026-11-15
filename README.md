# visuAI-DLC

A practical engineering framework built by selecting, adapting, and evaluating skills from pstack, Superpowers, and Matt Pocock across the software development lifecycle.

## Current direction and source of truth

The version of [NORTHSTAR.md](NORTHSTAR.md) on main is authoritative for project purpose, scope, and success criteria. This README is an entry point, not a separate specification. [workflow.md](workflow.md) defines contribution, validation, review, and merge procedures; [AGENTS.md](AGENTS.md) guides agents within those rules.

ChouBokYann and Perryong independently explore candidate skills and approaches, compare their fit in the engineering framework, and select what belongs on main. Validate candidates before merge, then continue testing the selected skills together through practical use on main. No particular skill count, lead framework, or shared record schema is predetermined.

Visualization, a custom codebase mapping engine, and ontology infrastructure are outside the current scope. They do not address a demonstrated need in our present workflow.

## Lifecycle skills

The [skills index](skills/README.md) organizes candidates by their primary process:

- Ideation: clarify needs and outcomes.
- Planning: define scope, decisions, and acceptance criteria.
- Implementation: carry out agreed work.
- Verification: check behavior and supporting evidence.
- Deployment: prepare and deliver changes.
- Maintenance: diagnose issues and improve existing work.

Select skills for concrete needs, explain adaptations and tradeoffs, preserve upstream attribution and license notices, and evaluate realistic tasks and failure cases. Add workflows or specialized agents only where they help the chosen skills work together.

## Contributing

Follow the [contribution workflow](workflow.md) and [agent instructions](AGENTS.md). Keep experiments and candidate selections on branches until reviewed for inclusion. The private [GitHub project](https://github.com/users/ChouBokYann/projects/3) tracks work and review needs; issues and board fields link to the main documents rather than establishing competing project direction. Only ChouBokYann grants permission to merge into main.

## Current status and historical material

The repository contains lifecycle scaffolding and earlier knowledge-record experiments. It does not yet contain a validated selection of lifecycle skills.

The earlier [methodology](docs/contracts/methodology.md), [knowledge contract](docs/contracts/knowledge-v1.md), [automation proposal](docs/contracts/automation.md), and [worked project thread](docs/examples/project-thread/README.md) are historical research, not adopted requirements for current skills. Their fixtures and helpers remain available without making them a prerequisite. The [original adoption proposal](docs/proposals/northstar-and-automation.md) is superseded.

Branch experiment: the user's subsequent request reopens a bounded [local project overview prototype](experiments/project-overview/README.md) with explicit sample decisions and evidence. The viewer is optional and does not replace main's direction or constitute a live Symphony integration. The subsequent skill-output extension is described below. See its [scope and validation limits](docs/proposals/project-overview-prototype.md).

If an older document or issue conflicts with current direction, follow NORTHSTAR.md on main and revise the affected proposal before using it to authorize work. Future direction changes update that document and affected references together.

Branch addition: skill-authored Markdown now supports the [business-connected output contract](docs/contracts/workflow-context.md) and a [worked export example](docs/examples/business-context/README.md). The viewer is a derived presentation, not a separate authority. See the [validation record](docs/proposals/business-context-validation.md) for observed checks and remaining limits.

## Using the candidate skills together

Start an end-to-end task with [Deliver a change](docs/workflows/deliver-change.md). It routes to the next relevant skill, preserves user expectations through requirements, and checks both behavior and requested quality before completion. It is branch guidance, not an installed agent runtime; independent review and further practical trials remain pending.
