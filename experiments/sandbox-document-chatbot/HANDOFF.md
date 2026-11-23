# E11 implementation handoff

Original request: document-connected chatbot. User selected synthetic documents and cloud Codex subscription via ACP; no local models. This increment adapts the existing E10 application to the restricted HTTP inference bridge inside OpenShell. No new product features or visual redesign.

UI direction: retain Fieldnotes' existing single-page conversation, document list, question composer and expandable source excerpts. Main journey: ask a question, read a grounded answer and inspect its source. Preserve keyboard submission, loading/error/no-evidence feedback and refresh. Existing typography/layout are the baseline, not newly user-approved style choices. No direction interview is needed for this compatibility change; the new set-ui-direction skill is a reference for future material visual changes.

Technical direction: source edits and checks execute in OpenShell; host bridge only supplies text through separately scoped development/QA sessions. No credential or Docker-socket access in workload. The model may write only the client and ACP-compatible adapter, and invoke the fixed client test. Reject unrelated actions. Existing retrieval/server tests remain verification inputs.

Acceptance: observed missing-client test fails, model writes actual source, tests pass inside sandbox, known answer/conflict are checked through actual provider, no-evidence avoids inference, browser journey and artifact-identical recovery checked. Evidence reports mocks separately and leaves any failed requirement explicit. Cap 16 total ACP turns, development at most12; four turns reserved for application verification/recovery. Preparation by host coordinator is not sandbox-agent implementation evidence.

Skill handoffs: understand-expectations -> define-requirements (synthetic scope, grounded answers); set-development-direction (restricted bridge topology); implement-increments (client/adapter and red-green check); verify-change (behavior and boundaries); prepare-release (artifact hash); deploy-and-check (A, fault B, restore A). This bounded adaptation reuses prior requirements; it does not claim autonomous discovery of all six lifecycle phases.
