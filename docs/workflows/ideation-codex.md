# Try Ideation in Codex

These are candidate skills on `first-iteration`. Start with a disposable project, then evaluate them on your own project. No global installation or new runtime is required.

## Project-local setup (PowerShell)

Use a local checkout of this branch. Set both paths below to existing directories; the target is the project where you want briefs saved. Keep the complete skill folders, including templates and license notices.

```powershell
$skillsRepo = (Resolve-Path 'C:/path/to/visuAI-DLC').Path
$targetProject = (Resolve-Path 'C:/path/to/your-project').Path
$names = @('clarify-problem', 'research-solutions', 'recommend-solution', 'define-requirements')
$destination = Join-Path $targetProject '.agents/skills'
foreach ($name in $names) {
    if (!(Test-Path -LiteralPath (Join-Path $skillsRepo "skills/ideation/$name/SKILL.md"))) {
        throw "Missing source skill: $name"
    }
    if (Test-Path -LiteralPath (Join-Path $destination $name)) {
        throw "Already installed: $name. Compare local changes before replacing it."
    }
}
New-Item -ItemType Directory -Path $destination -Force | Out-Null
foreach ($name in $names) {
    Copy-Item -LiteralPath (Join-Path $skillsRepo "skills/ideation/$name") -Destination $destination -Recurse
}
```

Codex [discovers project skills in `.agents/skills`](https://learn.chatgpt.com/docs/build-skills). Start Codex in the target project; restart it if the skills do not appear. The repository's lifecycle directories remain the canonical sources; installed copies do not update automatically. Record the source revision (`git -C $skillsRepo rev-parse HEAD`) when comparing trials.

## Invoke only what you need

For an already selected direction, type this in Codex (the `$` is literal prompt text):

```text
Use $define-requirements. We selected [solution] to solve [problem] for [users].
Constraints: [...]. Exclusions: [...]. Known uncertainties: [...].
Save the detailed brief to docs/requirements.md and give me a one- or two-sentence update.
Include any required limitations within those two sentences.
Stop at the Planning handoff.
```

Use `$clarify-problem`, `$research-solutions`, or `$recommend-solution` for those individual needs. Supplying an existing brief lets the skill update it rather than start a new report.

For routing across stages, provide an absolute path to this checkout's workflow:

```text
Read C:/path/to/visuAI-DLC/docs/workflows/ideation.md and follow the Ideation workflow.
Our problem is [...]. Reuse the context in [...]; save current work in docs/ideation.md.
Load only the next relevant skill. Stop when my choice is needed or the Planning handoff is reached.
Keep the final reply to two sentences, including any required limitations, and link to the saved brief.
```

Keep that checkout available: the workflow links to its canonical skill files. If file access is unavailable, provide the workflow and relevant skill/template contents explicitly. Do not assume that copying the workflow alone preserves its relative links.

## Check your trial

The short reply should link to a saved brief, identify the current outcome and material uncertainty, and avoid claiming that proposed checks have passed. The brief should retain sources, exclusions, decision status, and stable requirement IDs. Change one constraint and ask to update the same file; check that unrelated content and IDs survive.

Actual research needs source access. A failed lookup must remain an evidence gap. A missing destination or failed write should be reported accurately, with the unsaved brief supplied by the skill's fallback. Model usage follows your Codex account; this setup does not create another service.

See the [runtime trial record](../proposals/ideation-runtime-trial.md) for observed results and limits. To uninstall, inspect and remove only these four installed folders after preserving local changes; retain your project briefs.
