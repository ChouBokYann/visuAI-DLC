# Experiment 09: Docker runtime and evidence-pipeline compatibility

The Docker continuation passed the scoped OpenShell filesystem, network and restart checks. All 25 pinned skills were readable. Host-side Headroom preserved the actual sandbox evidence together with the earlier synthetic packet, with **zero compression savings**. This establishes local runtime and evidence-pipeline compatibility; it does not establish autonomous agent integration or full engineering-workflow coverage.

The [initial result](records/docker/results-before.md) and [initial verification](records/docker/verification-before.json) are retained. Their OpenShell not-run conclusion was superseded by the user's explicit approval of the Docker gateway/socket approach. [Continuation authority](records/docker/continuation.md) records the unchanged attempt bounds. The original proposal and baseline were not edited.

## Observed results

| Mode or boundary | Evidence and verdict |
|---|---|
| No extra tool | Earlier readiness negative/positive checks, HTTP fixture and local artifact release/recovery passed. No rerun or new claim in this continuation. |
| Headroom alone | Earlier 19 preservation assertions passed; 31,275 bytes remained 31,275. Token counts are estimates. |
| OpenShell Docker | Official v0.1.9 checksummed Linux CLI and digest-recorded images; gateway and CLI ran in containers. No additional WSL distribution required. |
| Allowed work | UID 1000 read all 25 skills and wrote/read a synthetic workspace marker. [Initial assertions](evidence/openshell-probe-initial.log). |
| Filesystem isolation | Synthetic sentinel readable outside OpenShell by UID 1000, but reads and writes denied inside the sandbox. Sentinel unchanged afterward. Logs confirm Landlock hard_requirement, ABI v3, 15 applied paths and zero skipped. Workload mounts contain no Docker socket. |
| Network isolation | Both controlled ports returned HTTP 200 from the operator control. Inside OpenShell port 18080 succeeded, port 18081 was denied; supervisor logged transparent_tcp_mapping_denied. No policy widening to make the denied request pass. |
| Restart | Stop/start changed the main-process identity and runtime generation. Marker retained and all eight checks passed again. [Restart assertions](evidence/openshell-probe-restarted.log). This tests stop/start retention, not recreation from a deleted container. |
| Evidence export | Actual JSON evidence returned through sandbox exec stdout and was saved locally. Dedicated sandbox download failed with source-path-not-found although exec could still read the file. That transfer interface remains unresolved; its failure is retained in the combined packet. |
| Combined | Actual OpenShell stdout records plus original Headroom semantic/tool packet passed through host-side Headroom 0.45.0 in offline agent/lossless mode. Protocol fields and content were exact or asserted round-trip equivalent; input was not mutated. 33,079 bytes remained 33,079; estimated 8,441 tokens remained 8,441. [Result](evidence/combined.json). Headroom did not run inside the sandbox; no agent/model loop was tested. |
| Preservation/cleanup | All 1,634 baseline hashes match. All 15 pre-existing containers retain IDs and states. Owned sandbox, supervisor, CLI, gateway, endpoint, network and state/control volumes removed. Docker remains running. Downloaded images, workload build cache, local venv and evidence remain. [Verification](evidence/docker-final-verification.json). |

## Acceptance criteria

| Criterion | Verdict |
|---|---|
| E09-01 authority/identity | Pass for declared local scope: prior gate waiver plus explicit Docker continuation approval. Public library c276159399bcca4bec874b3a521dfa61b5a0200b. OpenShell v0.1.9 runtime identity is distinct from earlier main-source inspection. |
| E09-02 readiness | Pass for tested launcher cases and all baseline hashes; operator tools remain outside automatic enforcement. |
| E09-03 requirement to local release | Earlier synthetic fixture pass retained. Not cloud or persistent-database deployment. |
| E09-04 Headroom | Pass for preservation and lossless fallback; no measured savings, exact provider-token count or model-quality evidence. |
| E09-05 OpenShell | Pass for specified allowed/denied actions, unchanged sentinel and records accessible after restart. Dedicated file download additionally tested and failed; stdout export succeeded. |
| E09-06 combined | Pass for explicit host-side evidence pipeline after individual mandatory checks; active host integration, in-sandbox Headroom and real agent behavior remain untested. |
| E09-07 preservation/cleanup | Pass for captured file set and owned runtime resources. Docker/image/cache state differences are retained as disclosed above. |
| E09-08 truthful reporting | Source inspection, install, executable checks, agent behavior and deployment scope separated. No full compatibility or production readiness claim. |

## Attempts, limitations and next work

Two correction rounds used: (1) original Headroom filename shadowing; (2) OpenShell rejected a raw-IP TCP endpoint, so the controlled endpoint was changed to a DNS hostname. The single OpenShell setup retry succeeded. No retry of the failed file-download interface; no more correction rounds remain. Read-only CLI-help lookup and cleanup-format/filter errors did not rerun a workload; their relevant evidence is retained. Cleanup's initial broad text filter matched an unrelated label hash, so final verification used exact owned volume names; no unrelated volume was removed.

No canonical skill changed, no global host configuration changed, and no commits, pushes, merges or GitHub publication occurred. Root authored and checked the trial; no independent review is claimed. No real credentials, paid inference, cloud deployment, active Codex wrapping, proxy/MCP mode, or autonomous agent run was involved. The gateway used root and the Docker socket with a plaintext local control plane, expressly accepted for this local trial; it has now been removed.

Next priority: a separately bounded real-agent trial that takes a requirement through the skills, implementation, review, deployment and recovery, retaining negative evidence at every handoff. Investigate the file-transfer failure before relying on that interface. Keep Headroom optional until a trial demonstrates useful savings without losing task quality.

Official pinned setup references: [Docker deployment](https://github.com/ai-openshell/openshell/blob/v0.1.9/deploy/docker/docker-compose.yml), [gateway configuration](https://github.com/ai-openshell/openshell/blob/v0.1.9/deploy/docker/gateway.toml). Runtime configuration, policies, image IDs and raw logs are in records/docker and evidence. The runnable final checker is checks/verify-docker.cjs; it checks recorded cleanup state and hashes, not a new runtime trial.
