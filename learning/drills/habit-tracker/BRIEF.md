# Drill: habit-tracker

**Skills:** the whole main flow. `/ask-matt`, `/setup-matt-pocock-skills`, `/grill-with-docs` (with `/domain-modeling` underneath), `/to-spec`, `/to-tickets`, `/implement` (driving `/tdd` and `/code-review`), `/pr`, `/retro`. `/wait-what` whenever a message doesn't land.
**Curriculum:** Modules 0 to 4, and 7. This is the spine drill; expect several sittings.
**Language:** Python 3.10+, standard library only

## Scenario

`habits` is a small CLI habit tracker. It works, it has tests, and it has users. Product sent this feature request:

> **From Sam (product):** People keep losing their streaks when they go on holiday, and it makes them quit. Can we add a vacation mode so people can pause habits? Being sick shouldn't break a streak either. And while you're in there, reminders would be great, people forget to log.

That is all the spec you get.

## Set up

```bash
learning/bin/start-drill habit-tracker
cd ~/pocock-dojo-drills/habit-tracker
python -m unittest
```

The repo is tagged `drill-start`. Use it as the fixed point for `/code-review`.

## Run it

Keep a **boundary log** at `.scratch/boundary-log.md`: at every phase boundary, one line saying which of the five options you took (continue, `/clear`, `/handoff`, subagent, `/compact`) and why. The teacher grades it.

1. **Route.** Ask `/ask-matt` which flow fits "a vague feature request in a small repo I own". Compare its answer with your own guess.
2. **Setup.** `/setup-matt-pocock-skills`. Pick **local markdown** as the tracker (there's no remote). Accept the default labels.
3. **Grill.** `/grill-with-docs` with Sam's message. Answer as the person who owns this product. Your targets:
   - Don't accept a recommended answer you haven't thought about. Saying "yes" to everything is how the drill fails.
   - Watch the words. The code and README use several names for the same thing. Expect `GLOSSARY.md` to appear and to settle them.
   - At least one part of Sam's request may not belong in this product at all. Decide, and if the reason is load-bearing, let it become an ADR.
4. **Spec.** `/to-spec`. It will propose test seams; push for the highest one that still catches what matters.
5. **Tickets.** `/to-tickets`. Challenge the slicing: is every ticket a vertical slice you could demo? Are the blocking edges real?
6. **Build.** Work the tickets with `/implement`, one per fresh context. Hold `/tdd` to its rules: seams agreed before tests, one red-green slice at a time, no mock-heavy tests.
7. **PR.** There's no remote, so ask the agent to draft the PR body to `.scratch/pr.md`. `/pr` decides its shape. Check it makes the one-way or two-way door call.
8. **Retro.** `/retro` in the session that did the build, before you clear.

## Done when

- `GLOSSARY.md` exists and the code uses its words.
- `.scratch/<feature>/` holds a spec and numbered ticket files with blocking edges.
- The feature works through the CLI, and the new tests would survive a rewrite of `core.py`'s internals.
- `/code-review` against `drill-start` came back with both axes, and you acted on what mattered.
- Your boundary log has an entry at every phase boundary.

## Debrief

Back in the learning workspace: `/teach debrief habit-tracker`. Bring `GLOSSARY.md`, any ADRs, the spec, the tickets, the boundary log, and the retro output. The teacher grades against `ANSWERS.md` in this folder.
