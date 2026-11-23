# Docker continuation authority and bounds

2026-11-22: Bok explicitly accepted the proposed containerized OpenShell CLI/gateway and its Docker-socket access for this local development setup. This extends the already approved local E09 trial; it does not reset any bounds. One total correction round already used, one remains. OpenShell initial setup/execution not yet consumed; at most one setup retry. Headroom existing result retained unchanged. Combined mode depends on actual OpenShell pass.

Root owns only e09-prefixed Docker resources and trial files. Existing containers snapshotted in containers-before.jsonl; no stop, removal, pruning or configuration change to them. Gateway alone may receive Docker socket; workload must not receive it. CLI/gateway use pinned v0.1.9 release, checksummed standalone CLI and digest-recorded images. This stable release is a newly identified execution artifact, distinct from the earlier main source inspection. No new WSL distribution, host service install, real credentials or paid model inference. Telemetry disabled. Named volume and copied synthetic/public files only. Preserve earlier report as initial result and add continuation evidence.

Before runtime startup, preserve initial report/evidence and verify original baseline through readiness.cjs. New runtime outcome must not relabel earlier not-run states. Resource cleanup targets only identifiers recorded as created by this continuation.

Initial OpenShell create was rejected before sandbox creation: TCP endpoint must be DNS hostname, not an IP literal. Correction round 2/2 replaces the controlled endpoint with host.docker.internal and published loopback ports; no assertions are relaxed. The next create consumes the single OpenShell setup retry. No further correction round remains.
