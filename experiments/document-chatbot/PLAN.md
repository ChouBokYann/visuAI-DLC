# Document chatbot implementation plan

> Execute inline with superpowers:executing-plans, implement-increments and TDD. No commits/pushes; retain evidence.

Goal: exercise a real agent-led workflow from the supplied short prompt to a working source-linked chatbot and observed local recovery.

Architecture: Node HTTP application indexes bounded synthetic text documents and sends selected excerpts through a restricted ACP session to subscription-authenticated Codex. Plain browser UI shows answers and their evidence. No local model, real Documents access or API-key fallback.

Spec: ../../../proposals/experiment-10-document-chatbot.md (root output proposal; ACP amendment supersedes local model design).

## Authority and constraints

Bok's latest "go ahead" answers the explicit revised-design/E10 waiver question: accepted scope and issue-first/other-maintainer waiver for this local trial. Human owner Bok; root owns only this experiment and its records. Baseline captured 2070 files before install; public dependencies pinned in package-lock.json. No other maintainer acceptance or main adoption claimed.

12 ACP turns maximum including setup/recovery, one concurrent request, 120-second client timeout, one setup retry, two correction rounds. Cancel/terminate before subsequent request. Record turns persistently; no reset on restart. No hosted inference tokens claimed as exact model calls. No local model download. Subscription usage is authorized, unknown monetary counters remain unknown.

## Review focus

1. A hostile document must not confer tool access or override the question.
2. Deleted or modified source must not be cited from a stale index.
3. A symlink/junction must not escape the selected root.
4. Missing model/authentication must surface as unavailable, never a fake answer.
5. A failed release must not be relabelled successful; recovered artifact must match.

## Tasks

- [ ] 1. ACP preflight: inspect adapter/config, verify no inherited active execution tools, establish authenticated session without inference. checks/acp-preflight.mjs and records/acp-preflight.json. Block dependent inference if confinement cannot be established.
- [ ] 2. Retrieval: checks/documents.test.mjs fails on missing required behavior; implement documents.mjs exposing loadDocuments(root), retrieve(index,query). TXT/MD only, skip symlinks, 128 KiB/file, 100 files maximum, 1 MiB total, bounded paragraphs. Verify known fact, no evidence, conflict, missing root, changed/deleted files and escape handling. Corpus fixtures and answer oracle frozen first.
- [ ] 3. ACP and HTTP: tests first for query limits, unavailable provider, source IDs, concurrent requests and persistent turn-budget exhaustion. Implement acp.mjs, server.mjs. APIs GET /api/status, POST /api/refresh, POST /api/chat, GET /api/source/:id. Same-origin checks, loopback binding, no arbitrary paths. Stream adapter events internally; return completed answer with source excerpts. No tool permissions granted.
- [ ] 4. Thin real slice and UI: index one known fact, run actual ACP prompt, inspect answer and citation before broad runtime scenarios. public/index.html provides accessible chat/status/refresh/source display using textContent. Verify actual browser journey, unknown answer, conflicting facts, malicious document and unavailable provider, within budget.
- [ ] 5. Review/release: fresh read-only reviewer as required by executing-plans; fixes bounded by remaining correction rounds. Build hashed local artifact A, smoke-check, observe deliberately broken provider configuration B, restore A and verify answer. Evidence includes source and config hashes, turn counts and baseline preservation. Stop only trial-owned processes; retain runnable artifacts and clear README/results.

## Skill/output trace

Deliver-change and understand-expectations selected discovery; define-requirements distinguishes user prompt from elaborated criteria. This plan is set-development-direction/implementation handoff; implement-increments owns changes and check evidence. Verify-change will assess original request, prepare-release/deploy-and-check own observed release/recovery. Read each skill before use. No success credited merely for naming it. Optional Headroom and OpenShell omitted from E10 product execution, with reasons in the approved amendment.

## Execution status

Tasks 1–3 complete with runtime guard strengthened in correction round1. Task4 actual provider/API slice complete; browser interaction blocked by unavailable browser host and automatic rejection of the unrelated checkout window. Task5 independent review, final tests, local failure/recovery and cleanup complete; overall acceptance remains Incomplete because E10-06 is unverified. Final evidence: evidence/final-verification.json; delivery: DELIVERY.md. Used9/12 turns, one setup retry, two correction rounds; no budget reset. All2070 baseline hashes match, no owned process/listener remains. No commits or pushes.

Browser continuation: basic desktop answer/source/no-evidence journey observed with user assistance. E10-06 scoped observation supplied; broader keyboard, mobile and exact refresh interactions unverified. Used10/12 turns. Same artifact and2070-file baseline preserved; owned services stopped. See evidence/browser-journey.md.
