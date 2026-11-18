---
name: exercise-user-journey
description: Use when a change needs proof through a real user path across a UI, CLI or service, or when another agent needs repeatable project-specific instructions for exercising that path.
---

# Exercise user journey

Prove the requested behavior through its public entry point and leave a recipe another agent can repeat. Reuse the acceptance criteria and existing verification harness. A successful journey supplies evidence to [Verify change](../verify-change/SKILL.md).

## Establish the path

Identify the user goal, relevant feature, starting state, expected result and inspected revision. Find the project's real launch command and interaction surface in its source, README and existing checks. Identify prerequisites such as dependencies, seed data and credentials. Inspect what a command changes before running it.

Prefer the existing project-local verification skill and feature map. If one is missing, create a bounded recipe in the project's established location using the [recipe template](references/journey-template.md). Record actual commands and selectors. Scope the map to the requested surface and list important uncovered paths. Keep one canonical recipe per feature.

## Prepare an owned instance

Choose an isolated data directory, browser profile and available port where applicable. Record the process or instance this run owns. Check readiness by observing the usable feature, expected build and required starting data. An unrelated service on the expected port is a setup conflict.

Reuse installed tooling when sufficient. Record missing access or dependencies precisely and continue only through supported parts of the path. Keep evidence outside disposable runtime state.

## Exercise and observe

1. Enter through the same UI, CLI or API a user uses. Drive actual controls with stable names or commands. For an exporter/viewer, export fresh records, upload that file through the import control and inspect the displayed record.
2. Record the action and resulting state. Read back persistent side effects where they matter. Compare with an independent expected result from the requirement or fixture. Give imported data an identifiable value so bundled demo content cannot satisfy the check.
3. Exercise a relevant failure case when required by the behavior, such as rejecting an invalid import while retaining the loaded snapshot. Keep the expected failure and any unexpected failure visible in the result.
4. After an unexpected response, health-check the owned instance and reset or relaunch as needed. Diagnose whether the recipe, harness or product failed before changing anything. A missing prerequisite remains an evidence gap.
5. Capture commands and exit codes, screenshot or interaction trace, relevant output data and exact tested state. Record the environment and any substitutes for the intended target.

## Preserve and hand off

Clean up only instances and scratch state created by this run, including failed attempts. Confirm evidence still exists and owned servers or browsers have stopped. A recipe is demonstrated only after its launch, drive and cleanup have actually completed.

Report each mapped journey as Passed, Failed or Incomplete with evidence and limitations. An omitted entry point remains uncovered. Give the user a short result and artifact link. Follow the [shared output contract](../../../docs/contracts/workflow-context.md) when updating an existing project record. If it is unavailable, preserve the established record format and explicit source links.

For later drift, use [Maintain user journeys](../../maintenance/maintain-user-journeys/SKILL.md). Review the map after a relevant product change, failed run or explicit maintenance request.

## Attribution

Adapted from pstack's verification generator and direct-observation principle. See [pinned sources and MIT notice](references/upstream-notices.md).
