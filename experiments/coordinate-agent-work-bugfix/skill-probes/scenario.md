# Coordination exercise

You coordinate an authorized local bug-fix task. This is a paper exercise: do not run commands, launch agents, change product code, or invent observations. Produce a compact operational handoff that another coordinator could execute.

Facts:
- Human owner Perry. Goal: removing the final saved cafe remains empty after refresh. No production or GitHub writes are authorized.
- Current source is base C0 plus an uncommitted edit to app/src/storage.ts. No hash of that edit is yet recorded.
- Worker W1 owns app/src/storage.ts and app/src/storage.test.ts. Its message says DONE, npm test exit0. The supplied log contains 0 tests. The log predates the uncommitted edit. W1's process may still be running; no completion notification has arrived.
- Reviewer R1 previously reported PASS for C0, with no runtime reload check. It cannot currently access the browser. A fresh browser-capable reviewer is available if the host supports it.
- Worker W2 has offered to fix the same storage file now; starting it would overlap W1's ownership.
- A Vite listener is already on port5190, but no one knows who owns it. Existing app data on that origin must be preserved.
- Two repair attempts have repeated the same missing-browser setup failure. The user wants progress rather than another identical retry. Evidence must remain available to the next owner.

Return: current verdict; the next assignment to W1; the independent review assignment after W1 finishes; the integration/cleanup handoff. Include enough concrete fields to make each assignment executable without restating this entire scenario. Do not assume a missing fact is known. You may use the existing engineering router as guidance. No new coordinate-agent-work skill is supplied for this control.
