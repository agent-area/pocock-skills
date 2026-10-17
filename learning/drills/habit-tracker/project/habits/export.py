from __future__ import annotations

import csv
import io

from .core import Habit


def to_csv(habits: dict[str, Habit]) -> str:
    """One row per check-in: habit,frequency,date."""
    out = io.StringIO()
    writer = csv.writer(out)
    writer.writerow(["habit", "frequency", "date"])
    for habit in habits.values():
        for entry in sorted(habit.log):
            writer.writerow([habit.name, habit.frequency, entry.isoformat()])
    return out.getvalue()
