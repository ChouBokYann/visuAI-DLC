# Project verification recipe

Use the project's existing format where available. Replace these prompts with checked facts before calling the recipe usable.

- Scope and source revision, including relevant local changes.
- Prerequisites and exact setup commands, environment variables and required data.
- Launch and readiness check, with owned instance identity and isolation method.
- Feature-map index linking each user path and naming uncovered surfaces.
- Evidence directory, commands for each check, and expected outputs.
- Cleanup for success and failure, preserving evidence.

Each feature entry describes the user goal, starting state, how to reach it, actions with stable controls or exact commands, observable success and failure, evidence to capture, and known prerequisites or gotchas.

For example, an exporter/viewer journey creates a uniquely named snapshot through the exporter CLI, uploads that exact file through Import snapshot, and compares a displayed summary with the exported record. Reject an invalid file and check that the same imported project and records remain available.

A first run proves at least one complete requested journey. Record other mapped paths as pending until exercised.
