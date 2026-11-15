---
name: test-an-assumption
description: Run a bounded experiment to answer a specific feasibility, behavior, or design question before committing to a direction. Use when existing evidence cannot settle a consequential assumption; a prototype result does not establish production readiness or authorize implementation.
---

# Test an assumption

Choose the smallest experiment that can change a decision. Accept the question and existing requirements/research directly. If adequate current evidence already answers it, reference that evidence instead of building a prototype or repeating a call.

## Define the question before the run

State the assumption, affected decision, and observable outcome that would support, contradict, or leave it unresolved. Distinguish user requirements from a proposed experimental threshold; do not invent a target and treat it as accepted. For a subjective design question, identify whose observation is needed; an agent's opinion is not user validation.

Bound the inputs/sample, environment/version, time or attempt budget, and any cost or side effects that matter. Use supplied limits or a proportionate stated bound; unresolved access or cost approval prevents the dependent action. Stop when the question is answered, the bound is reached, or continuing would exceed authority. Failure to access a service is not evidence that its feature is infeasible.

## Use an appropriate probe

Prefer a focused command, existing test, small API probe, or worked example when sufficient. Build a disposable logic/UI prototype only when interaction or state needs exploration; no mandatory HTML, framework, variant count, or demo route is required. Keep artifacts clearly marked and separate from shipped behavior. Use scratch data or simulated mutations unless real operations are required by the question and authorized.

Preserve error handling and checks needed to trust the experiment and protect data. Confirm that the intended work occurred: an error response, empty sample, stale cache, or skipped code must not masquerade as success. Use an independent expected example or invariant where possible, rather than having the probe merely echo its own implementation. Minimal prototypes still need a valid observation method; do not add production infrastructure to answer a small question.

Record the command/method, relevant input, actual output, revision/environment, and whether each boundary was real or simulated. Redact secrets and sensitive payloads. Repeat or vary inputs only when needed for the decision's scope; a single successful example does not prove all users, regions, scale, or future provider behavior. Label synthetic data explicitly. Do not substitute mocks for missing live feasibility evidence.

## Interpret and hand back the decision evidence

Compare observations against the original decision rule and report **Supported within bounds**, **Contradicted within bounds**, **Inconclusive**, or **Not run**. Preserve failures and limitations. If the question or rule changes, record why and distinguish exploratory observations from a new confirming run; do not move the threshold after seeing a result just to claim success.

Update the existing research/direction/delivery record, using the [experiment template](references/experiment-template.md) only for a new section. Link the affected decision and retained evidence; state the recommended next action and actual approval status. Preserve enough method/input context to repeat the observation, marking local-only artifacts that a recipient cannot access. Do not automatically commit, publish, delete other work, or promote prototype code into production. Any requested implementation follows normal quality and authorization requirements.

Give one or two sentences stating the bounded answer and material limitation, linked to detail. If no destination or saving fails, label the detailed record unsaved and provide it in one Markdown code block after that update. An inconclusive bounded experiment can be complete as an investigation while the product decision remains unresolved.

## Attribution

Adapted from Matt Pocock's prototype skill and references; see [pinned sources, choices, and MIT notice](references/upstream-notices.md).
