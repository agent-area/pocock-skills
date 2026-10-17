from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Expense:
    """One purchase on the trip.

    `amount_cents` is what `paid_by` handed over. `shares` says how the cost
    is divided: {"ana": 2, "ben": 1} means Ana carries two parts, Ben one.
    """

    description: str
    amount_cents: int
    paid_by: str
    shares: dict[str, int]


@dataclass
class Trip:
    name: str
    people: list[str]
    expenses: list[Expense] = field(default_factory=list)

    @classmethod
    def from_dict(cls, data: dict) -> "Trip":
        expenses = [
            Expense(
                description=e["description"],
                amount_cents=int(e["amount_cents"]),
                paid_by=e["paid_by"],
                shares={k: int(v) for k, v in e["shares"].items()},
            )
            for e in data.get("expenses", [])
        ]
        return cls(name=data["name"], people=list(data["people"]), expenses=expenses)
