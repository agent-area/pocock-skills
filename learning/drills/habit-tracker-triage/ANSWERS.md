# habit-tracker-triage: answer key

For the teacher. The learner should not read this before attempting the drill.

| Issue | Category | State | Why |
| --- | --- | --- | --- |
| 01 streak resets when done twice | bug | ready-for-agent | Reproduces: `done` twice on one day appends a duplicate date; `current_streak` sees a 0-day gap and stops. Brief: dedupe check-ins per day (store or streak), regression test through `cli.main`. |
| 02 export to spreadsheet | enhancement | wontfix (already implemented) | `habits export` prints CSV (`habits/export.py`). Close with a pointer to the command. **No** `.out-of-scope/` entry: that KB is for rejected requests, not built ones. |
| 03 broken | bug | needs-info | Nothing to verify. Questions must be specific: which command, the exact output, Python version, contents of the data file (redacted), what "updated" means. |
| 04 phone app with sync | enhancement | wontfix (rejected) | Conflicts with README Non-goals (local, single-user, CLI-only). Write `.out-of-scope/` entry so future requests resembling it get matched. |
| 05 log a past day | enhancement | ready-for-agent after a short grill | Decisions: flag name (`--date`), reject future dates, reject dates before the habit was created, duplicates on that day (ties to 01). Learners who notice 05 depends on 01's dedupe and say so earn credit. |
| 06 weekly streak stuck after New Year | bug | ready-for-agent | Reproduces with `HABITS_TODAY` across 2026-12-28 (ISO week 53) and 2027-01-04 (week 1): `_weekly_streak` compares bare week numbers, ignoring the ISO year. Fix: compare `(iso_year, iso_week)` tuples or week-start dates. |

## Repro commands worth seeing

```bash
export HABITS_FILE=$(mktemp -d)/h.json
HABITS_TODAY=2026-03-16 python -m habits add stretch
for d in 2026-03-16 2026-03-17 2026-03-17; do HABITS_TODAY=$d python -m habits done stretch; done
# last line prints "Streak: 1", expected 2
```

```bash
export HABITS_FILE=$(mktemp -d)/w.json
HABITS_TODAY=2026-12-07 python -m habits add long-run --weekly
for d in 2026-12-07 2026-12-14 2026-12-21 2026-12-28 2027-01-04 2027-01-11; do HABITS_TODAY=$d python -m habits done long-run; done
# streak stays at 4 from 2027-01-04 onward
```

## Common learner mistakes to probe

- Grilling before verifying.
- Writing `.out-of-scope/` for 02.
- Vague needs-info questions on 03 ("please provide more details").
- Agent briefs that reference line numbers or "the bug we discussed" instead of standing on their own.
