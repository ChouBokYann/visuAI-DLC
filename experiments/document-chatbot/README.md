# Fieldnotes: document chatbot trial

Local browser app using your subscription-authenticated Codex through ACP. No model weights or separate API key. Only the four synthetic TXT/Markdown documents in `corpus` are connected; your actual Documents folder is not scanned.

From this directory, in a normal PowerShell terminal:

```powershell
npm start
```

Open **http://127.0.0.1:17810**. Ask “Who owns Atlas and what is its approved pilot budget?” or “When is the Atlas launch?” Source excerpts appear below each answer. Questions use fresh context, not conversational memory. Ctrl+Enter submits. Refresh reloads document status; each answer also reads current files. Ctrl+C stops the owned server and ACP process tree.

The bounded experiment has used **10 of 12 ACP prompt turns**, **one setup retry**, and **both correction rounds**. The persisted turn counter is shared across restarts and releases; do not reset it to continue this trial. Two turns remain; the core browser check is now recorded. No-evidence queries do not use a turn. This is an experimental single-user application, not a general hosted service.

Authentication must already exist via `codex login` using ChatGPT. Do not paste tokens into this project. The pinned ACP package is 2.9.0; dependencies are in package-lock.json. Installation was local with install scripts disabled. No global config was edited. The startup gate fingerprints inherited config and stops if it changes; a fresh reviewed preflight is required instead of weakening checks. It disables execution/connectors at actual Codex process startup and verifies returned config/thread permissions. Read-only mode alone is not the entire restriction mechanism.

`npm test` runs the eight deterministic groups without inference. `checks/release.mjs` creates a release artifact and consumes three ACP turns; its earlier run is already recorded, so do not rerun casually. `checks/acp-session.mjs` verifies startup without prompting. Runtime scripts may need normal host permissions because the editor's restricted shell cannot see subscription authentication.

The observed final artifact is in `artifacts/release-a`; its source/config evidence is recorded in [the delivery record](DELIVERY.md) and [release result](evidence/release.json). The app and ACP processes were stopped after verification. No commits, pushes, public deployment or real document access occurred.

The core desktop browser journey was observed with user assistance: a real cited answer, expanded source and correct no-evidence result. See evidence/browser-journey.md. Known limits: complete keyboard-only traversal, exact shortcut/refresh activation and mobile behavior remain unverified. Small lexical retrieval is intentionally limited, only TXT/Markdown is supported, and static link confinement does not constitute adversarial concurrent-filesystem certification. Source citations establish traceability, not a guarantee of model truth. Timeout blocks restart because remote completion cannot be proved from local process termination.
