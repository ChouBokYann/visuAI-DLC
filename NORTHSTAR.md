# visuAI-DLC north star

Status: product-direction draft, 2026-11-04. This describes the intended product, not a claim that its capabilities already exist.

This document defines what visuAI-DLC is for and what success means. Repository roles, work permissions, review gates, and merge rules belong in the separate [development rules](docs/contracts/automation.md).

## Purpose

Enable people to understand and steer agent-assisted development by following a reliable digital thread from intended outcomes to decisions, implementation, verification, and delivery. At any checkpoint, users must be able to zoom out to the overall outcome, zoom in to supporting work, and understand what agent activity changed and what that change affects.

Our primary qualities are **clarity, completeness, and accuracy**. Speed and convenience must preserve all three. More agent activity, more documents, and more graph edges are not evidence of progress toward an outcome.

## Who this serves

Start with two collaborating maintainers directing multiple agents, including a maintainer returning after missing the original discussions. The same method should remain usable by a solo developer or a contributor without the private project board or optional platform.

The returning maintainer should be able to answer:

1. What are we trying to achieve, and why does this work belong?
2. What changed since the last checkpoint, who changed it, and why?
3. Which goals, features, architectural areas, dependencies, and releases are affected?
4. Which effects are demonstrated, which are potential, and what is still unknown?
5. What is implemented, verified, reviewed, merged, or released, and what remains blocked?
6. What decision or action is needed next, and who owns it?

## One methodology, optional interaction platform

Skills and workflows across ideation, planning, implementation, verification, deployment, and maintenance follow the same [methodology contract](docs/contracts/methodology.md). They produce readable, versioned project knowledge with traceable sources, explicit uncertainty, checkpoints, and impact records.

A lightweight platform provides an additional interaction layer for exploring that knowledge. Users can navigate from overall outcomes to details and back, compare checkpoints, and inspect impact without reconstructing the entire history themselves. Rust is a preferred candidate, not a mandated implementation language; another fast language is acceptable when evidence supports its fit.

The platform must remain optional. Installing it, running a server, using a particular database, or accessing a proprietary service must not be prerequisites for the core skills, workflow, review, or project records. Derived indexes and views must be rebuildable from canonical records. Disabling or removing the platform must leave those records usable through Markdown, Git, and issue links. Individual optional integrations may have their own declared dependencies.

## How understanding is organized

- **Digital thread:** connect intended outcomes, capabilities, requirements/features, decisions, work, evidence, and delivery across time. Connections require meaning and provenance; a code dependency alone does not establish business impact.
- **C4 architecture views:** use context, containers, components, and code where useful. These are architecture levels, not replacements for goal, delivery, or review states. Link them to the digital thread so either direction of navigation retains meaning.
- **Checkpoints:** preserve a reproducible account of a meaningful project state, its changes, evidence, unknowns, and next actions.
- **Impact mapping:** show direct changes and evidence-backed consequences separately from potential downstream effects. Explain the traversal boundary and omitted context.

Use additional project-understanding frameworks only when they answer a concrete question that these views cannot adequately answer. Record their meaning and mapping; do not create competing sources of truth.

## What success looks like

A person returning to a project can answer the six questions above from its records, recover the reasons behind changes, and identify the next decision without replaying the original conversations.

- **Clarity:** the relationship between detailed agent work and the overall outcome is understandable at each level of zoom.
- **Completeness:** the view covers the declared scope and makes missing context, unresolved dependencies, and unfinished work visible.
- **Accuracy:** statements are supported by evidence; intended, inferred, verified, and unknown effects remain distinguishable.
- **Continuity:** comparing checkpoints explains what changed, why it changed, and what that means for the project.
- **Optionality:** users retain these capabilities through readable project records without installing the platform; the platform makes exploration easier.
- **Lightweight interaction:** the optional platform remains responsive with modest resource requirements, demonstrated through measurements on representative projects.

## Boundaries and tradeoffs

The first priority is a coherent method and useful lifecycle skills with demonstrable checkpoint and impact behavior. The skill library draws on suitable practices from pstack, Superpowers, and Matt Pocock while presenting a coherent methodology to users.

Avoid speculative infrastructure, exhaustive code-symbol documentation, conversation archiving, automatic promotion of inferred links to facts, and dashboards that equate activity with outcomes. Completeness is relative to declared scope, with omissions exposed; it does not require modeling everything.

## Basis

This draft consolidates the maintainers' direction in the coordinator conversation, the [README](README.md), [knowledge proposal #1](https://github.com/ChouBokYann/visuAI-DLC/issues/1), and the existing [knowledge contract](docs/contracts/knowledge-v1.md). Earlier discussions unavailable in those sources are not treated as evidence of additional decisions.

C4 terminology follows Simon Brown's [official abstractions](https://c4model.com/abstractions) and [diagram guidance](https://c4model.com/diagrams). The digital-thread definition above is this project's operational definition. Upstream skill references and adoption conditions are in the methodology contract.
