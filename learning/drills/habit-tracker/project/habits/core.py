from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, timedelta

FREQUENCIES = ("daily", "weekly")


@dataclass
class Habit:
    name: str
    frequency: str = "daily"
    created: date = field(default_factory=date.today)
    log: list[date] = field(default_factory=list)  # one entry per check-in

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "frequency": self.frequency,
            "created": self.created.isoformat(),
            "log": [d.isoformat() for d in self.log],
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Habit":
        return cls(
            name=data["name"],
            frequency=data.get("frequency", "daily"),
            created=date.fromisoformat(data["created"]),
            log=[date.fromisoformat(d) for d in data.get("log", [])],
        )


def add_habit(habits: dict[str, Habit], name: str, frequency: str, today: date) -> Habit:
    if name in habits:
        raise ValueError(f"habit {name!r} already exists")
    if frequency not in FREQUENCIES:
        raise ValueError(f"frequency must be one of {', '.join(FREQUENCIES)}")
    habit = Habit(name=name, frequency=frequency, created=today)
    habits[name] = habit
    return habit


def mark_done(habits: dict[str, Habit], name: str, today: date) -> Habit:
    """Record that the habit was done today."""
    habit = _get(habits, name)
    habit.log.append(today)
    return habit


def current_streak(habit: Habit, today: date) -> int:
    """How many periods in a row, ending now, the habit was done."""
    if not habit.log:
        return 0
    if habit.frequency == "weekly":
        return _weekly_streak(habit, today)

    entries = sorted(habit.log, reverse=True)
    # Today not done yet doesn't break the streak; yesterday missing does.
    if (today - entries[0]).days > 1:
        return 0
    streak = 1
    for newer, older in zip(entries, entries[1:]):
        if (newer - older).days == 1:
            streak += 1
        else:
            break
    return streak


def _weekly_streak(habit: Habit, today: date) -> int:
    weeks = sorted({d.isocalendar()[1] for d in habit.log}, reverse=True)
    this_week = today.isocalendar()[1]
    if this_week - weeks[0] > 1:
        return 0
    streak = 1
    for newer, older in zip(weeks, weeks[1:]):
        if newer - older == 1:
            streak += 1
        else:
            break
    return streak


def remove_habit(habits: dict[str, Habit], name: str) -> None:
    _get(habits, name)
    del habits[name]


def _get(habits: dict[str, Habit], name: str) -> Habit:
    try:
        return habits[name]
    except KeyError:
        raise ValueError(f"no habit called {name!r}") from None


def days_ago(today: date, n: int) -> date:
    return today - timedelta(days=n)
