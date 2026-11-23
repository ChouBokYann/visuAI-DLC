# Independent implementation review

Reviewer: e10_review, separate read-only agent. No model calls, edits or maintainer acceptance.

Initial findings: (1) rejected session ID could remain reusable; (2) preflight verified a different process and inherited MCP names were not checked at runtime; (3) cleanup fallback could silently leave descendants running; (4) sources could change during inference and still be returned as current.

Correction round 1: publish session identity only after checking mode; add startup-restricted Codex gate and actual config/thread checks, including inherited config fingerprints; persist a restart block on uncertain termination or timeout and verify local descendants are gone; reject changed source IDs after inference. New negative tests observed failing before implementation and passing after.

Reviewer re-check: "The four earlier findings are addressed for this bounded trial ... No important unresolved issue found within this re-review scope." This was a static re-review plus inspection of recorded runtime evidence, not an independent rerun.

Subsequent correction round 2: the adapter forwarded an internal code-mode warning as answer text. The final change excludes only un-IDed warning chunks from displayed answers while preserving raw events. Message-ID-bearing model text remains intact. A regression check and final actual release/recovery run pass. This small subsequent diff was author-reviewed, not independently re-reviewed.

The first literal oracle rejected the valid formatted value 4,200 and would misclassify discussion rejecting the hostile figure as endorsement. Original oracle and failure retained; later checks normalize numeric separators and human inspection distinguishes quoting/rejection from adopting a false fact. No original failure was overwritten or relabelled as an automatic pass.
