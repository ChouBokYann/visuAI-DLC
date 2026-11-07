# visuAI-DLC north star

Status: current project direction, 2026-11-07, published at the explicit request of ChouBokYann following the reported discussion with Perry. This describes intended work, not capabilities already delivered.

This document defines the project's purpose and success criteria. Contribution, validation, review, and merge requirements belong in the [contribution workflow](workflow.md); proposed automation rules remain separate in the [development rules](docs/contracts/automation.md).

## Purpose

Build a practical engineering framework by selecting, adapting, and evaluating useful skills from pstack, Superpowers, and Matt Pocock's skill repositories. Establish which skills help our development work, when to use them, and how they fit together across the software development lifecycle.

Our primary qualities are **clarity, completeness, and accuracy**. Each skill should address a concrete need and produce useful, verifiable results. The number of collected skills or generated documents is not a measure of success.

## Who this serves

Start with the two maintainers, ChouBokYann and Perryong, using agents to support their engineering work. The framework should also be understandable to a contributor who was not present for the original discussions.

Users should be able to determine:

1. Which skill fits the task and lifecycle phase?
2. What inputs, context, tools, and permissions does it require?
3. What steps and outputs should they expect?
4. How does its output support the next part of the work?
5. How can they check the result and handle missing information or failure?
6. Why was the skill selected or adapted, and what are its limitations?

## Current approach

The maintainers independently explore and prepare candidate selections and adaptations from the upstream repositories. They then compare their approaches and decide which versions belong in the shared framework and on main, following the contribution workflow.

Consider reuse without modification, adaptation, overlap with existing skills, and whether a skill is needed at all. Preserve upstream attribution, versions or commits, and applicable license requirements.

Organize selected skills across the six existing lifecycle processes:

- **Ideation:** clarify needs, problems, and intended outcomes.
- **Planning:** define scope, decisions, tasks, and acceptance criteria.
- **Implementation:** carry out agreed work with sufficient context.
- **Verification:** check behavior and evidence against intended outcomes.
- **Deployment:** prepare and deliver changes appropriately.
- **Maintenance:** investigate issues, improve existing work, and preserve useful context.

The mapping is something to evaluate, not a requirement to copy every upstream skill or fill every phase immediately. Add workflows and specialized agents only where they help the selected skills work together.

## Evaluation and refinement

Compare candidate skills using representative engineering tasks, including incomplete inputs and failure cases. Record usefulness, clarity, correctness, required effort, and compatibility with the rest of the framework.

Review and validate candidates before merge under the contribution workflow. Continue testing the selected versions together on main through practical use, recording shortcomings and proposing improvements. Post-merge evaluation complements the existing pre-merge checks.

## What success looks like

- **Useful:** selected skills solve problems the maintainers actually encounter.
- **Clear:** people and agents understand when to use each skill, its prerequisites, and expected outputs.
- **Coherent:** skills support one another across lifecycle phases without unnecessary duplication or conflicting instructions.
- **Complete within scope:** each skill handles its declared task, missing information, and relevant failure paths.
- **Accurate:** conclusions and completion claims have appropriate supporting evidence.
- **Maintainable:** selection reasons, adaptations, sources, and limitations remain understandable as the framework evolves.
- **Demonstrated:** practical walkthroughs and testing show whether the framework improves our work.

## Boundaries

Visualization is outside the current scope because it does not address a demonstrated need in our present workflow. We are not currently building a visualization layer, interaction platform, codebase mapping engine, or ontology infrastructure. No implementation language or storage technology is selected by this north star.

Existing code understanding and retrieval tools can be used when they help a task. Project records should preserve useful context without requiring a particular platform, graph format, or visualization-oriented output contract.

Earlier visualization and project-model proposals remain historical material for possible future reconsideration, not current product commitments. Revisit them only when a concrete problem and evidence justify the additional work.

## Basis

This revision reflects the maintainer's report of the discussion with Perry and the resulting decision to focus on independently exploring upstream skills, comparing their fit across the SDLC, and evaluating a shared selection. It replaces this document's earlier visualization-led direction. Earlier contracts, examples, proposals, and issue scopes are retained as explicitly historical or deferred references. They do not override this direction or impose requirements on candidate skills.
