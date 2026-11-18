# Reusable user journeys and their maintenance

## Scope and ownership

Perry requested two skills, an exporter/viewer trial and publication on first-iteration-1.1. The agent owns the new Verification and Maintenance skill directories, their lifecycle links, this record and docs/examples/user-journeys/. This implements the exercise-user-journey candidate in the existing supplement proposal under issue #7. Independent maintainer selection remains pending.

## Need and approach

The existing Verify change skill assesses evidence against the request. A reusable project recipe also needs concrete launch, readiness, user actions, observable outcomes, evidence and cleanup. The first skill supplies that recipe and executes it. Maintenance reconciles the recipe with current behavior and exercises every mapped feature.

The exporter/viewer example will cover fresh CLI export, import and record inspection, and invalid-file rejection with previous data retained. A temporary stale map will test maintenance corrections. Product regressions must remain visible.

## Tools and data

Reuse the React app's locked dependencies, local Python with PyYAML, a private local Chrome instance and Playwright for browser actions. Browser tooling is installed outside the project. Use synthetic fixture data and an isolated dynamically assigned localhost port. Evidence survives teardown. No paid service is needed. Existing global browser profiles and unrelated listeners are outside the trial.

## Implementation and validation plan

1. Observe gaps using the existing skills, then add exercise-user-journey and a project recipe.
2. Execute the exporter/viewer through its public interfaces and preserve evidence. Evaluate the new instructions with a fresh agent.
3. Add maintain-user-journeys. Seed a stale instruction in a disposable recipe, reconcile it against source and live behavior, and rerun every mapped feature.
4. Check links, frontmatter, relevant existing tests, cleanup and evidence. Commit and push the requested branch.

## Acceptance criteria

- Both skills use canonical lifecycle directories, frontmatter, scoped steps, observable completion, fallback behavior and pinned attribution.
- A fresh export is imported into the viewer and its summary matches the source record.
- An invalid import shows failure while the previous valid snapshot remains usable.
- Maintenance identifies stale instructions, distinguishes product failures and missing prerequisites, and reports coverage for every mapped feature.
- Runtime resources created by the trial stop while evidence remains available.

## Alternatives and follow-up

The existing verification skill can continue handling one-off checks. The added recipe avoids rediscovering interaction steps on subsequent changes. A generic browser abstraction would add maintenance cost, so the example uses the current app's controls. Broader skill evaluations and automated scheduling can be evaluated after this bounded trial.

## Validation

All three mapped journeys passed in the author run and an independent agent run on the same host. The maintenance trial seeded “Open records” in a copied recipe, confirmed the actual “Import snapshot” control in source and a live browser trace, corrected the copied instructions, and reran every mapped feature.

The final helper gives both the project and inspected summary unique values. This prevents bundled sample content from satisfying the import assertion. It uses the real Vite configuration, an isolated browser and an OS-assigned localhost port. Cleanup checks confirmed the browser disconnected and the owned HTTP port refused connections. Missing browser configuration produced Incomplete with a nonzero exit. A separate temporary checkout deliberately discarded the imported summary marker. The journey failed at the exact summary assertion and closed its resources, showing that the new oracle detects stale content. The temporary checkout was removed after preserving evidence.

The existing exporter suite passed 14 tests, the React suite passed 8 tests, and the React production build passed. Frontmatter, relative links and helper syntax were checked. Review led to the stronger summary oracle and corrected app-startup failure classification.

See the [retained evidence and reproducible recipe](../examples/user-journeys/README.md). Product source remained at a21d337; the evidence records local skill/helper changes and hashes of relevant files. The trial used Python 3.13 with PyYAML 6.0.2, while the general validation requirements pin 6.0.1.

Limits include a single Chromium desktop viewport, synthetic fixture data and shared-host tooling. Five exceptional maintenance scenarios were instruction checks. One generic resource-404 console message is retained in the browser logs, with no JavaScript runtime exceptions; the trace did not identify that resource. The existing dependency installation reported four high-severity audit advisories and the build reported a chunk-size warning. Those are separate from the mapped journey results.
