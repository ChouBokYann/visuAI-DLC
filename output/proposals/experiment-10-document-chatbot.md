# Experiment 10: document chatbot through the engineering workflow

Status: requirements discovery; provisional proposal, not an executed trial. 2026-11-22.

## Change and lifecycle process

User approved starting the next real-agent workflow trial and supplied the exact test prompt: **"make a chatbot that is connected to my documents folder"**. Evaluate requirements through planning, implementation, verification, local deployment and recovery using the existing skill library pinned at c276159399bcca4bec874b3a521dfa61b5a0200b. Preserve prompt, clarifications and agent assumptions separately.

Proposed implementation location: a new isolated E10 worktree, experiments/document-chatbot. Root owns this proposal, trial orchestration, product and evidence. No canonical skill, old experiment or unrelated checkout changes. No implementation has started.

## Problem and need

E09 demonstrated deterministic Docker isolation and a host-side Headroom evidence pipeline, not an agent building a requested product. This trial tests whether the workflow converts a deliberately short prompt into a working document chatbot without inventing consequential data/provider choices or claiming success from mock inference.

## Proposed solution

Agent proposal: one local browser chat, a read-only selected document root, retrieval of relevant passages, generated answers with source references and explicit insufficient-evidence responses. A refresh action incorporates added/edited/deleted documents. Start with text and Markdown; PDF/DOCX support remains a decision based on the selected corpus, not an implied delivered capability. Do not read or enumerate the user's document content during requirements discovery.

Carry one delivery record linking original prompt and answers to requirements, decisions, source revision, checks, actual model observations, release artifact and recovery evidence. Use existing deliver-change routing; select expectations/requirements, development direction, implementation, verification and release skills as their inputs become ready. Record each actual invocation and output; naming a skill does not count as execution.

## Scope

Included, once design and authority are settled: real agent-authored application; meaningful automated boundary/failure checks; an actual answer from the chosen model against known documents; local release, smoke check, controlled failed release and restoration; final workflow-gap assessment.

Excluded by default: whole-folder scanning before a folder choice, editing source documents, public hosting, GitHub writes, commits/pushes/merges, paid model calls, model downloads, credential copying into Docker, active host wrapping and changes to canonical skills. Scope may be explicitly amended once provider and data choices are known. Headroom remains optional because E09 demonstrated no savings. OpenShell's dedicated download failure remains unresolved; do not depend on it without a new bounded interface check.

## Alternatives and tradeoffs

- Selected folder plus local model: keeps runtime document processing local; needs a working local model and adequate resources. No reachable Ollama service was observed at localhost:11434; other local providers were not ruled out.
- Selected folder plus cloud model: avoids local model setup; requires explicit provider, excerpt-sharing permission and cost bound.
- Retrieval-only interface: useful diagnostic slice but does not satisfy the requested generated-answer chatbot; cannot substitute for final acceptance.

Prefer a dedicated synthetic test corpus for reproducible correctness and failure scenarios, then the user-selected real folder if requested. Synthetic-only execution must not be reported as a connection to the user's actual Documents folder.

## Tools and services

Existing agent session, Git, Node/Python, browser and optional Docker. Codex CLI 0.171.0 is installed; no new CLI inference invocation or credential inspection performed. Separate application inference remains unresolved. Pin dependencies before installation; reuse standard libraries or existing dependencies where sufficient. Record model identity, requests, available token/cost counters and unknowns without inventing them. Provider unavailable means that slice is blocked, not a simulated pass.

## Acceptance criteria and validation

These are agent-proposed, pending the user's data/model choices and design review.

- E10-01: freeze authority, baseline, exact prompt, selected folder/model, data handling and attempt bounds before mutable execution.
- E10-02: preserve a trace from prompt and clarifications through requirements, implementation, verification and local release. Distinguish user-stated requirements from agent elaborations.
- E10-03: ask a known-answer question and receive an actual model-generated, document-supported answer with valid source references. Test an absent answer and a conflicting-source case; preserve actual responses.
- E10-04: prove folder confinement and read-only access, including traversal and symlink/junction escape cases; document text cannot grant tools, expand permissions or become system instructions. Include a hostile-document fixture.
- E10-05: refresh handles added, edited and deleted documents; stale removed content is not returned. Empty/missing root, unreadable/unsupported files, oversized input and model unavailable have observable failure behavior rather than fabricated answers.
- E10-06: exercise the browser journey against the real backend; mocked model tests are separately labelled and cannot satisfy E10-03.
- E10-07: identify and deploy a local artifact, observe it serving, deliberately break a trial-owned release, restore the retained artifact and observe recovery. Source documents and unrelated services remain unchanged.
- E10-08: final evidence separates software conformance, real model answer quality, workflow adherence and user acceptance. Report omissions, failure rounds, cleanup and costs honestly. No general all-scenarios claim from one trial.

Proposed fresh E10 bounds: one initial implementation trial, one setup retry for a selected runtime/provider, at most two correction rounds total, no automatic new worker or mode to reset those bounds. No paid inference or download budget presumed. Exact model-call envelope to be set with the selected provider. E09's exhausted bounds remain exhausted.

## Ownership and dependencies

Human owner: Bok. Root: requirements, proposal, orchestration and evidence; any reviewer must have an explicit bounded assignment before delegation. The current agent can perform the development trial; independent agent review is not maintainer acceptance.

GitHub search found no chatbot issue. Related #13 covers E06 coordination, not this scope; E09 is the prior local compatibility trial. E07/E08/E09 gate waivers were scoped to those experiments. The user's current go-ahead authorizes starting this trial's discovery; it does not supply an explicit new exception to the issue-first/other-maintainer rule. Prepare the complete design before requesting that final execution decision.

## Sources, impact, and risks

Local sources: NORTHSTAR.md, workflow.md, E09 results and the pinned library's docs/workflows/deliver-change.md. No third-party product code copied. Actual dependency licenses and versions belong in the implementation record once selected. Existing outputs and .bench-run remain untouched.

Main risks are accidental broad document access, sending excerpts to an unselected provider, unsupported answers, stale retrieval, and confusing agent implementation with in-sandbox model execution. Mitigate through selected-root access, explicit provider handling, source-based checks and precise reporting. Undo only trial-owned runtime resources; preserve evidence and source documents.

## Design resolved after user clarification

The user selected a dedicated synthetic test folder and a local model, keeping document content on this computer. These choices supersede the earlier alternatives; real Documents access and cloud inference are excluded. The development agent remains the current hosted session; the application's inference is local. Local inference does not mean the development agent itself runs offline.

Proposed design: a Node built-in HTTP backend and plain browser UI, one Dockerfile and Compose configuration for the app plus Ollama. Use existing Node runtime image pinned by digest before building; Ollama release 0.40.17 identified through the official release API, image digest captured before running. Qwen3:1.7b model manifest/digest recorded after download and before testing. CPU execution is acceptable; host has about 31 GiB RAM, Docker memory limits and actual performance remain preflight checks.

Corpus: authored .txt and .md files only, containing invented project facts, conflicting dates, a hostile instruction and an unrelated topic. Expected answers fixed before implementation. Separate mutable fixture copy for refresh tests; original corpus immutable and hashed. Mount only the trial corpus read-only into the app, never the user's Documents folder or Docker socket. Reject symlinks, unsupported files and files outside the canonical root; enforce bounded file sizes and query lengths. Exact bounds are builder decisions recorded before tests.

Retrieval: bounded paragraph chunks with deterministic lexical ranking, no embedding service or vector database. Return limited relevant passages to Ollama with source identifiers; document passages are untrusted quoted evidence. No tools available to the model. Source links resolve only to server-owned indexed identifiers. Render answers and excerpts as text, not executable HTML. If retrieval has no evidence, return a clear no-evidence state without invoking the model. If the model is unavailable, return an explicit unavailable state. Conflicting passages remain visible; do not force a single unqualified answer.

UI: one page showing corpus readiness, message history, question input, refresh button and source excerpts under each answer. Accessible labels, keyboard submit and visible loading/error states. No accounts, uploads, document editing, multi-user support, PDF/DOCX parser or persistent chat history. App binds to host loopback through Docker publication. Browser talks only to the app; Ollama is reachable only on the trial network. Download the runtime/model first; use an internal Docker network and OLLAMA_NO_CLOUD=1 during application tests. Record network configuration as evidence, not a universal no-egress guarantee.

Release: build and hash artifact A, serve and smoke-test it. Deploy controlled configuration B pointing at an unavailable model endpoint; observe failure honestly. Restore A's original image/config and verify the known-answer journey. This is a local deployment/recovery test, not cloud release. Stop owned services after evidence collection; retain model cache and runnable instructions for review, with retained disk usage reported.

Model budget proposal: at most 12 application generation requests total across setup, verification, correction and recovery; at most 512 output tokens, 4096 context tokens and 120 seconds per request; one concurrent request. Reserve requests for recovery. No paid inference. Public runtime/model downloads capped at 5 GB transferred total, with a 15 GB local disk envelope; stop and report if insufficient. Do not implicitly switch model when quality fails. One initial trial, one runtime setup retry and two product correction rounds. Agent authoring effort is not represented as local inference; hosted-session cost counters unavailable are recorded unknown.

Smallest representative slice: one known-answer document through the actual model and source-linked UI before broad failure-case work. Test unsupported answers, conflict handling and injection with actual response observations within the request budget; tests of transport/failure logic may use explicitly labelled mock inference. Report any unrun actual-model scenario as unverified.

No OpenShell rerun required for this first E10 product trial. Its E09 evidence does not prove this agent runs inside OpenShell. Docker hosts the application and local model; Headroom is omitted to avoid adding an unproven benefit to the trial.

Design review: read-only e10_builder_check reviewed this proposal and reported "Nothing important left before planning." Runtime/version availability remains for preflight. This review is not implementation approval or maintainer acceptance; the reviewer modified no files.

## Current design amendment: Codex subscription through ACP

This section supersedes all Ollama/Qwen/local-model installation and inference choices above. User changed to cloud inference to avoid local model files, then authorized using their Codex subscription through ACP (interpreted from "corex scription ACP protocol"). Synthetic corpus choice is unchanged.

Readiness research: installed Codex CLI 0.171.0; normal host `codex login status` reports Logged in using ChatGPT. The sandboxed check reported Not logged in, so that restricted observation is not used as the host authentication verdict. No tokens read/copied or inference invoked. npm metadata identifies @agentclientprotocol/codex-acp 2.9.0, depending on @openai/codex ^0.171.0 and ACP SDK ~2.9.1. Pin the adapter and resolved lockfile for the trial; do not use the archived @zed-industries adapter. Source: https://github.com/agentclientprotocol/codex-acp/blob/main/README.md (Apache-2.0).

Current runtime architecture: localhost browser -> Node application/retrieval -> stdio ACP adapter -> Codex App Server -> authenticated Codex cloud inference. Keep the adapter on the Windows host to use the existing login without moving credentials into Docker. Product deployment/recovery may run as isolated host processes with loopback binding; Docker is optional and no longer a prerequisite for E10. Do not claim this trial tests OpenShell agent execution.

Use the same synthetic .txt/.md corpus, citations, refresh and boundary checks. Retrieved excerpts and questions are sent to Codex; no real Documents-folder access. Application sessions must use a trial-only working directory and restrictive permissions. Disable inherited MCP servers, hooks and agent tools where the supported runtime configuration permits; deny client filesystem/terminal/permission requests. Verify actual server-side tool controls: client permission rejection or a prompt alone is not proof of confinement. If adequate isolation cannot be established, record a blocked integration rather than silently grant host-wide access. Never edit global Codex configuration or copy auth material into trial artifacts. Normal authentication may refresh its own managed session.

The developer agent remains this session. The application ACP calls are separate runtime observations, not spawned development workers. Preserve ACP initialization/session/prompt/completion/error evidence with secrets redacted. Avoid carrying source text into diagnostic logs unnecessarily. No API-key fallback, credit purchase, local model download or alternate provider. Existing subscription limits apply; usage totals captured if exposed, monetary cost otherwise unknown.

Replace the local-model budget with at most 12 ACP prompt turns total, one concurrent request, a 120-second client deadline per turn, one setup retry and two correction rounds. Cancel timed-out turns and confirm completion/termination before replacement; do not treat a client timeout as proof remote work stopped. Output-token caps are only claimed if the actual runtime supports enforcement; a prompt turn may contain multiple underlying model calls. Record available usage instead of claiming 12 turns equals 12 inference calls. Public package downloads only, maximum 1 GB; no model weights. Source/image artifact identity, failure observation, recovery and cleanup criteria remain required.

Current approval state: user has selected and authorized the provider/authentication approach. Final E10 implementation scope and issue-first/other-maintainer exception remain pending; no prior experiment's waiver is reused. The earlier builder check covered the local-model design, not this ACP amendment. Implementation planning must resolve ACP permission/config behavior before product generation requests.

## Open questions

1. Final approval of this concrete design, download/model-call limits and normal issue/other-maintainer acceptance, or an explicit E10 local-trial waiver. No remaining product question requires a separate interview.

Current outcome: provisional requirements discovery. No chatbot, model call, document scan, deployment or passing result is claimed.
