# Experiment09 result: partial compatibility, with useful boundaries established

The readiness correction and synthetic no-tool workflow passed. Headroom0.45.0 preserved the tested packet in offline agent/lossless mode but delivered **zero compression savings**. OpenShell could not be exercised within the approved environment scope, so combined mode was not run and overall compatibility remains **Incomplete**. This concludes the bounded trial; no attempt is left running.

## What ran

The [pre-execution manifest](records/baseline.json) captured1634 allowlisted files before readiness implementation, fixture creation, package installation or Docker startup. It includes selected original skills/docs/scripts/tests, the pinned trial library, prior experiment artifacts, and the proposal/criteria. Generated builds, binary PG clusters, node_modules/symlinks and Python bytecode were explicitly excluded. The manifest also records revision, dirty state, ownership, approval and attempt bounds. It is a preservation check for its declared set, not a complete machine snapshot.

The new readiness checker refuses a missing manifest, changed bytes, wrong Git revision or unavailable runtime before calling the dependent action. Its test asserts zero dependent mutations in all four failures and one for a valid baseline. Fixture and package commands ran through the checker. Operator file-writing tools remain outside its enforcement; it is not an installed host-wide policy hook. No canonical skill changed.

The synthetic Node fixture uses only built-in libraries. Actual HTTP assertions cover note omission/null/empty/500 Unicode codepoints,501 rejection, invalid types and no partial mutation. The release check builds a copied source artifact, identifies source+configuration, observes goodA200, bad-routeB404 and exact recoveredA200, retaining a note in memory. It closes its loopback listener. This connects the [delivery record](records/delivery.md) to code, tests, revision identity and release observations without implying cloud deployment or persistent database behavior.

## Tool compatibility results

| Mode | Actual result | Meaning |
|---|---|---|
| No extra tool | Gate test and actual HTTP fixture pass; local release/recovery check passes | Deterministic software/record path works in this Windows/Node environment. Not an autonomous agent trial. |
| Headroom library, agent/lossless, ML disabled | Installed binary package0.45.0;19 assertions pass. Caller input, message/tool protocol, system instructions, typed300-row payload, negative evidence, logs and code retained | Preservation compatible within this narrow packet/mode. Two transformations reverted; input/output both31275 serialized bytes; no compression benefit demonstrated. |
| Headroom token measurement | SDK reports7954→7954, zero saved; tokenizer initialization attempted a blocked network connection and fell back to estimation | These are estimated SDK counters, not exact provider tokens or billing. No model weights downloaded or external LLM called. |
| Headroom retrieval/cache | Default user-profile .headroom initialization denied; package falls back to in-memory CCR | No persistent retrieval/restart claim. Test's Python socket guard observed one blocked connection. This is not an audit of every native networking path. |
| OpenShell | Pinned source/installer inspected; no CLI installed. Docker29.5.2 became available after authorized startup; only docker-desktop WSL distro observed | Runtime NOT TESTED. Inspected installer supports Linux/macOS; adding a distro/OS components or native Windows build is outside scope. Docker alone is not proof OpenShell works. |
| Combined | Not run | Required OpenShell individual check absent. |
| Active host, proxy, MCP, real model | Not run | No Codex wrap, global config, auto-learning or paid inference. No answer-quality/cost-saving claim. |

Headroom source documentation was pinned at `ce0460cfa8598dc939243dbc7aec4b2d35f4e44a`; execution used the released headroom-ai0.45.0 wheel. Package versions are retained in [installed-packages.json](records/installed-packages.json); final file hashes identify installed Headroom bytes. The test does not assert that release bytes equal the pinned source checkout. Dependencies were resolved and installed binary-only in `.venv`, with the uv cache inside this experiment. No `[all]` extra or model download was used. Official sources: [Headroom](https://github.com/headroomlabs-ai/headroom/blob/ce0460cfa8598dc939243dbc7aec4b2d35f4e44a/README.md), [OpenShell](https://github.com/ai-openshell/openshell/blob/38c47412dd7e94b8efc44b128940e097590b7582/README.md), [OpenShell installer](https://github.com/ai-openshell/openshell/blob/38c47412dd7e94b8efc44b128940e097590b7582/install.sh).

## Criteria and limits

| Criterion | Verdict |
|---|---|
| E09-01 authority/identity | Pass within declared source set: explicit local waiver, source/criteria pins and ownership before execution; package identity recorded separately. |
| E09-02 readiness | Pass for exercised negative/positive cases and guarded launchers; no whole-host automatic enforcement. |
| E09-03 requirement→local release | Pass for deterministic synthetic service and in-process artifact/config rollout. |
| E09-04 Headroom | Pass for lossless preservation/fallback checks; useful compression, exact tokenizer counts, proxy streaming and persistent retrieval unverified. |
| E09-05 OpenShell | Incomplete: no supported runnable CLI setup within scope, no policy/restart checks executed. |
| E09-06 combined | Not run; full compatibility incomplete. |
| E09-07 preservation/cleanup | All1634 pretrial hashes match in [final verification](evidence/final-verification.json). No trial container created. Loopback listener closed. Docker remains running to preserve15 unrelated workloads observed after startup; this resource-state difference is explicitly retained. |
| E09-08 truthful evidence | Pass reporting requirement: installation, protocol checks, agent behavior, staging/cloud and efficiency claims separated. |

One of two correction rounds used: local probe filename shadowed the Headroom package; renamed without relaxing assertions. Both initial failed console/result files retained. Zero setup retries used. No unbounded source build or OS installation. Root authored and checked this experiment; no independent review is claimed. Exact host model/token telemetry unavailable.

## Next decision

The evidence supports keeping Headroom optional: lossless fallback preserves our packet, but this run provides no savings reason to adopt it. A useful next Headroom trial should explicitly supply its tokenizer and isolate its cache, then compare declared compression modes and actual task outcomes with a fixed model/cost budget. That is a new trial, not an automatic rerun of these limits.

For OpenShell, select an existing supported Linux/WSL host or approve a concrete environment setup before testing. Do not classify its missing runtime as a repository incompatibility. Then test allowed work, denied boundaries, evidence export and recovery before combining tools. Consolidated workflow coverage is [here](../../../proposals/workflow-coverage-and-compatibility.md). Nothing was committed, pushed, merged or published.
