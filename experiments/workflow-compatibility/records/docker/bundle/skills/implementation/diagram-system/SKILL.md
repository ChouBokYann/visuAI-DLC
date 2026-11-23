---
name: diagram-system
description: Use when someone asks for a shareable diagram of a system, workflow, or proposed design, especially when the reader needs to trace a specific behavior across components or see how a proposed boundary changes it.
---

# Diagram system

Answer one engineering question with a standalone HTML diagram. For example, “Show how the workflow exporter turns a Markdown record into viewer JSON, and where a proposed second output would attach.” A request for a text explanation stays with [Understand system](../understand-system/SKILL.md).

## Ground the diagram

1. Identify the question, the audience and the behavior to show. Reuse the existing trace or planning brief. Choose a workflow for ordered steps, a sequence for calls and returns, or an architecture diagram for component responsibilities.
2. For current behavior, follow one path from entry point to observable output. Record the inspected revision and the file, symbol and line range that supports each consequential arrow. If a cited file has uncommitted changes, identify which version the diagram describes. Archify checks repository citations against committed bytes.
3. For a design, label proposed elements and relationships directly in the diagram. A proposed second output belongs beside the confirmed writer, with its status visible in text. If the source for a relationship is missing, mark the boundary unknown or omit the arrow and explain the gap.

## Render and check

Use an available upstream **archify** package. Read its own SKILL.md, choose its matching schema and example, then follow its repository-authoring instructions for a code-backed diagram. Supply the repository root for source checks, and use the installed version’s documented finalization command. The [upstream reference](references/upstream-notices.md) identifies the version used for this branch. The renderer requires Node.js and its browser check requires a supported local browser.

Check the delivery receipt, then open the resulting HTML. Follow the path as a reader would. Check the direction and wording of each important arrow against the source, the legibility of its label, and whether a reader can distinguish current and proposed behavior. Successful rendering alone cannot establish any of those facts.

## Hand off the result

Return a link to the HTML, the answer to the original question, and any material gap. When the diagram supports an existing project record, link it there with the inspected revision and check results, following the [shared output contract](../../../docs/contracts/workflow-context.md). When used standalone, keep that information in the handoff.

If Archify is unavailable, return the source-linked trace and identify the missing renderer. If finalization or the browser check fails, report the failed check and whether a draft HTML exists. When source is missing, explain which claims remain unverified. A reader should be able to use the supported portion even when the requested artifact is incomplete.

## Attribution

This lifecycle skill uses the published Archify renderer as an optional specialist. See [upstream sources and notices](references/upstream-notices.md).
