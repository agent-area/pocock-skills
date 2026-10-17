from __future__ import annotations

import json
import os
from pathlib import Path

from .core import Habit


def store_path() -> Path:
    return Path(os.environ.get("HABITS_FILE", Path.home() / ".habits.json"))


def load(path: Path | None = None) -> dict[str, Habit]:
    path = path or store_path()
    if not path.exists():
        return {}
    data = json.loads(path.read_text(encoding="utf-8"))
    return {h["name"]: Habit.from_dict(h) for h in data.get("habits", [])}


def save(habits: dict[str, Habit], path: Path | None = None) -> None:
    path = path or store_path()
    payload = {"habits": [h.to_dict() for h in habits.values()]}
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
