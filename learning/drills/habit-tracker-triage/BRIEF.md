# Drill: habit-tracker-triage

**Skills:** `/setup-matt-pocock-skills`, `/triage` (with `/grilling` and `/domain-modeling` underneath)
**Curriculum:** Module 8 (Inbound work)
**Language:** Python 3.10+, standard library only

## Scenario

Same `habits` CLI as the habit-tracker drill, untouched. Six raw reports have landed in the local tracker under `.scratch/inbox/issues/`. None has been triaged. Some are real, some aren't, one is already done, and one doesn't belong in this product.

## Set up

```bash
learning/bin/start-drill habit-tracker-triage
cd ~/pocock-dojo-drills/habit-tracker-triage
```

## Run it

1. `/setup-matt-pocock-skills`: local markdown tracker, default labels.
2. `/triage` and ask "show me anything that needs my attention".
3. Take the issues one at a time. For each, before the agent recommends, write down your own call: category (`bug` / `enhancement`) and state (`needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`).
4. Make the agent **verify** before any grilling. For bug reports, it should reproduce with `HABITS_TODAY` and a scratch `HABITS_FILE` (no real data touched).
5. For anything you reject as out of scope, let it write to `.out-of-scope/`.
6. For anything `ready-for-agent`, read the agent brief it writes and ask: could a fresh agent with no context pick this up and finish it?

## Done when

- Every issue file carries exactly one category and one state.
- Both bug reports you accept are reproduced with a command you can rerun.
- `.out-of-scope/` has an entry only for a rejected enhancement, not for something already built.
- Your written calls from step 3 are next to the final ones, so you can see where you disagreed.

## Debrief

Back in the learning workspace: `/teach debrief habit-tracker-triage`. Bring your step-3 calls and the final issue files. The teacher grades against `ANSWERS.md` in this folder.
