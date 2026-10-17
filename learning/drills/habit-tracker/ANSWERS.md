# habit-tracker: answer key

For the teacher. The learner should not read this before attempting the drill.

## Ambiguities a good grilling surfaces

The request hides a design tree. A strong session reaches most of these, and the learner (not the agent) makes each decision:

- **Pause vs skip vs sick day.** One concept or two? A pause is planned and spans a range; a sick day is unplanned and retroactive. Can you pause retroactively? If yes, is "pause" just a backfilled skip?
- **What a paused period does to a streak.** Freeze (streak neither grows nor breaks) or count (paused days count as done)? Freeze is the usual answer; counting invites gaming.
- **Limits.** Max pause length? Max sick days per month? Otherwise "pause forever" makes streaks meaningless. Product judgement, not a fact.
- **Weekly habits.** What does pausing Wednesday to Friday do to a weekly habit? Forces the question "what is a period?", which the code answers badly (see latent bugs).
- **Scope of a pause.** One habit, or every habit at once ("vacation mode")? Sam's wording says vacation mode; the data model says per habit.
- **Reminders.** A CLI with no daemon can't remind anyone. Options: out of scope; print a nudge on the next `habits` invocation; generate a cron or launchd entry. The README's Non-goals (local, single-user, CLI-only) are the evidence. Best outcome: the learner pushes back, splits reminders out, and either records an ADR ("no background process") or sends it to a later request. Credit `/to-questionnaire` if they recognise the question is really Sam's to answer.
- **Export.** Should pauses appear in the CSV export? Easy to forget.

## Glossary the session should converge on

The code mixes **log**, **check-in**, **done**, and **entry** for one concept (`Habit.log`, "one entry per check-in", `mark_done`, `habits done`, `export` docstring). A good `GLOSSARY.md` picks one (likely **Check-in**), lists the others under _Avoid_, and also defines **Habit**, **Frequency**, **Period** (a day or an ISO week), **Streak** (consecutive periods with a check-in, ending at the current or previous period), and **Pause** (or whatever the learner settled on). Credit the learner if later tickets and code use those words.

## Latent bugs the build may trip over

Not part of the request. Spotting them is a bonus; fixing them silently inside the feature is scope creep that `/code-review`'s Spec axis should flag.

- Two check-ins on the same day break a daily streak (duplicates in `log`, diff of 0 days). Any pause logic that walks the log will meet this.
- Weekly streaks use the ISO week number without the year, so they misbehave across New Year.

The right move for both: note them, file them on the local tracker, keep the feature PR clean. They come back as inbox items in the `habit-tracker-triage` drill.

## Spec and tickets

- **Seams:** the highest useful seam is `cli.main(argv)` with `HABITS_FILE` and `HABITS_TODAY` set (the existing `tests/test_cli.py` already does this). A second seam at `core.current_streak(habit, today)` is defensible for the streak rules. Many seams, or tests on private helpers, is the smell.
- **Good first ticket:** a prefactor ("make the change easy"), e.g. dedupe check-ins or introduce the period concept, then a tracer bullet such as "pause a daily habit for a date range and see the streak freeze in `habits list`".
- **Bad slicing to catch:** "add pause field to model", "add CLI flag", "add tests" (horizontal layers).

## Boundary log: expected calls

- After setup, before grilling: **continue** or **/clear** (setup's context is disposable).
- Grill to spec to tickets: **continue** (context hygiene: one unbroken window until `/to-tickets`).
- Between tickets: **/clear**; each ticket is self-contained.
- Review: a **subagent** is how `/code-review` runs anyway; the learner needn't do anything.
- Retro: **continue** in the build session, before clearing.
- `/handoff` should not appear unless the learner moved directories or harnesses. Using it as a generic "save point" is the misconception to correct.

## Common learner mistakes to probe

- Saying "yes" to every recommended answer in the grilling.
- Letting reminders through as a ticket with no pushback.
- Compacting between grilling and `/to-spec`.
- Tickets that aren't demoable on their own.
- Mock-heavy tests on `store.py`.
