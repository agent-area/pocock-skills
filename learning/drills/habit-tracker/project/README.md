# habits

A tiny command-line habit tracker. Track daily or weekly habits, log when you do them, and watch your streaks.

```bash
python -m habits add stretch
python -m habits add long-run --weekly
python -m habits done stretch
python -m habits list
python -m habits export > habits.csv
python -m unittest
```

Data lives in `~/.habits.json` (override with `HABITS_FILE`). Set `HABITS_TODAY=2026-03-18` to pretend it's another day.

Python 3.10+, standard library only.

## Non-goals

`habits` is deliberately local, single-user and command-line only. No accounts, no servers, no sync.
