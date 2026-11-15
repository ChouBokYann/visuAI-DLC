---
name: understand-system
description: Explain how an existing system or subsystem works using actual entry points, data flow, boundaries, and code evidence. Use for codebase orientation or locating where a change belongs; keep the answer bounded to the question rather than auditing or redesigning the whole project.
---

# Understand system

Build a usable mental model of the requested behavior. Accept supplied context directly; no prior Ideation or Planning run is needed. If an existing explanation is sufficient and still matches the relevant code, reuse it and investigate only the missing part.

## Trace the behavior

1. Identify the question, subsystem, available source/configuration, and inspected revision or working-tree state. State a reasonable narrow interpretation when scope is vague; ask only if the missing distinction changes which system to inspect. With no source access, explain from supplied evidence and label the unverified portion.
2. Locate the actual entry point and follow one representative path: inputs, transformations, state changes, dependencies, and observable output. Read callers and relevant failure/alternate paths where they change the explanation. Configuration and dependency declarations are clues; they do not prove which path executes.
3. Distinguish code-supported behavior, observed execution, documented intent, and inference. Consult relevant decisions or history when explaining why a design exists; code shape alone does not establish its author's motivation. Resolve contradictions where possible and retain unresolved ones explicitly.
4. Identify the few files or interfaces a maintainer would need to inspect next. For a placement question, explain how the suggested location follows existing ownership and dependencies; label it a recommendation. A directory name is not proof of a dependency or owner.

Use existing checks or a bounded permitted observation when static inspection cannot establish a consequential claim. State exactly what ran and what it demonstrated; do not execute unknown setup scripts or access a live service merely to make an explanation sound complete. An unavailable external component remains a boundary with unknown internals.

Stop when the requested flow, relevant boundaries, and consequential gaps are understandable. Do not generate a full dependency map, rewrite project instructions, change application code, or require subagents, models, or a diagram. An explanation is not an impact assessment or a verification verdict.

## Record and hand off

Update the relevant existing explanation or current work record when an authorized destination is available. Use the [explanation template](references/explanation-template.md) only for a new record; omit irrelevant sections. Preserve canonical IDs and links rather than copy requirements or decisions. Cite paths/symbols and the inspected state so a later reader can detect staleness; avoid secrets and unrelated private content.

Give one or two sentences explaining the main flow or placement recommendation and the material limitation, with a link to detail. When no destination is available or saving fails, label the detail unsaved and provide it in one Markdown code block after the short update. Never claim that static inspection proves live behavior. Completion means the bounded question is answered with evidence, or the unresolved part and next useful check are explicit.

## Attribution

Adapted from pstack and ECC; see [pinned sources, adaptation choices, and MIT notices](references/upstream-notices.md).
