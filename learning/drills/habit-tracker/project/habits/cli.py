from __future__ import annotations

import argparse
import os
import sys
from datetime import date

from . import core, export, store


def _today() -> date:
    # HABITS_TODAY lets you pretend it's another day (handy for trying things out).
    override = os.environ.get("HABITS_TODAY")
    return date.fromisoformat(override) if override else date.today()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="habits", description="A tiny habit tracker.")
    sub = parser.add_subparsers(dest="command", required=True)

    add = sub.add_parser("add", help="start tracking a habit")
    add.add_argument("name")
    add.add_argument("--weekly", action="store_true", help="once a week instead of daily")

    done = sub.add_parser("done", help="log that you did a habit today")
    done.add_argument("name")

    sub.add_parser("list", help="show habits and streaks")

    rm = sub.add_parser("rm", help="stop tracking a habit")
    rm.add_argument("name")

    sub.add_parser("export", help="print every check-in as CSV")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    habits = store.load()
    today = _today()

    try:
        if args.command == "add":
            habit = core.add_habit(habits, args.name, "weekly" if args.weekly else "daily", today)
            print(f"Tracking {habit.name} ({habit.frequency}).")
        elif args.command == "done":
            habit = core.mark_done(habits, args.name, today)
            print(f"Logged {habit.name}. Streak: {core.current_streak(habit, today)}")
        elif args.command == "list":
            if not habits:
                print("No habits yet. Try: habits add stretch")
            for habit in habits.values():
                unit = "week" if habit.frequency == "weekly" else "day"
                n = core.current_streak(habit, today)
                print(f"{habit.name:<20} {n} {unit}{'s' if n != 1 else ''}")
        elif args.command == "rm":
            core.remove_habit(habits, args.name)
            print(f"Removed {args.name}.")
        elif args.command == "export":
            sys.stdout.write(export.to_csv(habits))
    except ValueError as err:
        print(f"error: {err}", file=sys.stderr)
        return 1

    store.save(habits)
    return 0
