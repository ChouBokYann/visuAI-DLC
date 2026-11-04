# visuAI-DLC

An AI-assisted development lifecycle focused on helping people visualize their projects, understand their decisions, and track progress when multiple agents work on the same project.

## Why this exists

During development, it is easy to forget why a decision was made. AI can help preserve that history, but remembering the facts is only part of the problem. Reading long Markdown documents to reconstruct the context, tradeoffs, and reasoning can still be difficult.

Much of the community is working on helping agents retrieve code better. visuAI-DLC aims to help people retrieve their understanding better.

The goal is to translate development tendencies, decisions, and choices into a structure that both people and agents can understand. We want to bridge the gap between human understanding and multiagent capability, so that increasing the amount of work agents can do also makes that work easier for people to follow.

## What we are working toward

- **Project visualization:** make the project's structure, direction, and current state easier to understand.
- **Decision context:** preserve what was chosen, why it was chosen, the alternatives considered, and what would justify revisiting it.
- **Multiagent progress:** make ownership, dependencies, completed work, and remaining work visible when several agents contribute to one project.
- **Shared understanding:** organize information so people can recover context and agents can continue work with the same reasoning available to them.

## The development lifecycle

The skill library is organized around six processes:

```text
skills/
├── ideation/
├── planning/
├── implementation/
├── verification/
├── deployment/
└── maintenance/
```

These processes provide a starting sequence, with room to revisit earlier decisions as a project evolves. Individual skills will live at `skills/<process>/<skill-name>/SKILL.md`.

See the [skills index](skills/README.md) for each process's scope.

## Contributing

Start with a GitHub issue using the **Change proposal** template. Explain the need, proposed solution, scope, dependencies, and acceptance criteria before implementation. The same issue and review contract applies to both maintainers, outside contributors, and agents.

Read the [contribution workflow](workflow.md) and [agent instructions](AGENTS.md). Maintainers coordinate accepted work in the private [visuAI-DLC project](https://github.com/users/ChouBokYann/projects/3); contributors do not need access to that board.

## Current status

This repository is at the foundation stage. The lifecycle folders and their scope are in place; executable skills, visualization features, and multiagent progress tracking are still to be developed.

The first [project knowledge contract](docs/contracts/knowledge-v1.md) is available for review with a [worked example](docs/examples/project-thread/README.md), [retrieval walkthrough](docs/examples/project-thread/questions.md), and [reuse assessment](docs/contracts/reuse-assessment.md). It defines how future skills can produce connected Markdown records. It is not yet an adopted standard or a running visualization service.

The methodology will evolve from personal development practices and selected ideas from other skill and workflow projects. Adapted material will be attributed to its original sources. The aim is a coherent approach that can be used personally and shared with others.
