# Proposal to use Archify for requested system diagrams

## Change and lifecycle process

Give [Understand system](../../skills/implementation/understand-system/SKILL.md) in Implementation an optional handoff to the upstream Archify skill. Link to that handoff from [Set development direction](../../skills/planning/set-development-direction/SKILL.md) for diagrams of a proposed design. This is a draft for maintainer review on `first-iteration-1.1`.

## Problem and need

A maintainer asks, “Show me how the workflow exporter turns project records into viewer data.” Understand system already traces entry points, transformations and outputs. It supplies the facts, but gives no handoff for a reader who explicitly wants a shareable diagram. Planning has a different use for the same tool when a maintainer asks how a proposed boundary would change that flow.

## Proposed solution and scope

Follow the existing [specialist handoff](../workflows/deliver-change.md#bring-in-a-specialist-when-the-work-needs-one). Pass the bounded question, inspected revision, source references and unresolved boundaries to the published `archify` skill. For a design, identify proposed relationships explicitly. Return the standalone HTML alongside the underlying explanation.

Keep the integration to these two skill entry points. Upstream maintains its renderer and supporting assets. The four skills under upstream’s `.agents/skills/` support maintenance of Archify itself. Importing them, changing the project viewer and requiring diagrams throughout the lifecycle are outside this proposal.

## Alternatives and tradeoffs

A short source-linked explanation is usually enough. Use Archify when the reader asks for a visual artifact. Copying the upstream package would allow offline distribution but would make this project responsible for renderer updates, assets and license notices. Revisit distribution if repeated trials identify installation as a barrier.

## Tools and services

The proposed route uses an available Archify distribution, Node.js 18 or later, a supported browser for the delivery check, local read access to selected source and write access to an output folder. The upstream finalization command includes an update check. Use a local output path, omit sensitive values, and review the diagram before sharing. The proposed trial requires no paid service. If the renderer or browser is unavailable, deliver the source-linked trace and identify the outstanding artifact or check.

## Acceptance criteria and validation

- [ ] For the exporter question, trace one input through `scripts/export_workflow.py` to its output at a recorded revision. Produce a standalone diagram, open it, and check its materially important arrows against the cited source. Record Archify’s finalization result.
- [ ] For a proposed exporter boundary, label it as proposed and keep the existing flow distinguishable. A reader can tell which part exists today.
- [ ] With a missing source or unavailable renderer, name the gap and return the supported explanation. An ordinary text-only request completes without starting Archify.

Research check at proposal time: the pinned CLI validated its supplied cache-miss sequence example. A trial against the visuAI-DLC exporter and a browser delivery check are pending.

## Ownership and dependencies

Proposed human owner: Perryong. Proposed reviewer: ChouBokYann. After scope acceptance, the agent would edit the two linked skill entry points and record the walkthrough. [Issue #7](https://github.com/ChouBokYann/visuAI-DLC/issues/7) covers the three-source comparison. [Issue #11](https://github.com/ChouBokYann/visuAI-DLC/issues/11) defers broader visualization work. Neither records acceptance for this external specialist.

## Sources, impact and risks

Reviewed [Archify 3.2 at a7ed6fd](https://github.com/tt-a1i/archify/tree/a7ed6fd6657da90414831d1d42cf95987188750c/archify), published under Apache-2.0 with bundled notices. An attractive diagram can imply more certainty than the trace provides. Keep source references and qualify unverified paths. Removing the two proposed handoff references would restore the existing workflow.

## Open question

Does ChouBokYann accept a trial of a requested diagram as an optional external specialist on this branch?
