---
name: maintain-user-journeys
description: Use when a project's verification recipe or feature map may have drifted after product changes, a failed run, or a request to audit whether documented user journeys still work.
---

# Maintain user journeys

Keep an existing project verification recipe accurate and runnable. Start with its scope, feature index, source revision and last evidence. If no recipe exists, use [Exercise user journey](../../verification/exercise-user-journey/SKILL.md) to establish one.

## Check the map against the product

Reconcile the feature index with its files. Read the implementation behind each mapped user path and inspect recent relevant changes for missing entry points. Record a concrete source location for suspected drift.

For each feature, preserve the user goal and expected result. Check the launch prerequisites, navigation, stable controls, data setup and observable proof. A renamed button can justify a navigation correction. A missing promised behavior requires investigation.

## Exercise every mapped feature

Use the recipe's owned instance and readiness check. Keep one driver per shared UI instance. Independent source readers may report findings when delegation is available and authorized. They return source references and proposed checks to the driver.

Run every mapped feature, including unchanged entries, because a source-only pass can miss runtime drift. After an unexpected response, health-check the instance and reset or relaunch before continuing. Preserve the evidence from failed attempts.

Classify findings before editing.

| Finding | Response |
|---|---|
| Behavior still works, instructions are stale | Correct the recipe and rerun its affected path |
| Working behavior cannot be reached by the harness | Repair the recipe's harness within scope and prove the repair live |
| An expected product behavior fails | Record the reproduction and route correction to Implementation |
| Access, data or environment is missing | Record the attempted path and unmet prerequisite as incomplete |

Keep edits within the selected recipe, feature map and its own helpers. Preserve acceptance criteria while investigating failures. Changing the product or relaxing an expectation needs its own justified scope.

## Reconcile and hand off

After corrections, exercise all mapped features against the final recipe. Reuse observations from the same run only when the correction could not invalidate them. Capture the tested product revision, recipe changes, per-feature results and evidence paths. Stop the instances created by the run and verify that evidence remains accessible.

Report one outcome.

- **Clean** means all mapped features ran successfully and the recipe needed no correction.
- **Updated** means recipe or harness corrections were made and all mapped features passed with those corrections.
- **Issues found** means product behavior failed a supported expectation. Include the reproduction and affected scope.
- **Incomplete** means required coverage or cleanup could not be completed. Name the missing evidence and next action.

If failures and missing evidence coexist, report both. A repaired selector alone cannot establish Updated. A narrower successful path cannot satisfy an omitted feature.

Use the existing work record and [shared output contract](../../../docs/contracts/workflow-context.md) when available. Otherwise keep explicit source and evidence links in the established format. Give the user the result, consequential gap and location of the maintained recipe.

## Attribution

Adapted from pstack's maintain-verification-skill. See [pinned source, adaptation and MIT notice](references/upstream-notices.md).
