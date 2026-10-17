from __future__ import annotations

from .models import Trip
from .split import split_amount


def balances(trip: Trip) -> dict[str, int]:
    """Net position per person, in cents. Positive means the group owes them."""
    result = {p: 0 for p in trip.people}
    for expense in trip.expenses:
        if expense.paid_by not in result:
            raise ValueError(f"unknown payer {expense.paid_by!r} on {expense.description!r}")
        result[expense.paid_by] += expense.amount_cents
        for person, owed in split_amount(expense.amount_cents, expense.shares).items():
            if person not in result:
                raise ValueError(f"unknown person {person!r} on {expense.description!r}")
            result[person] -= owed
    return result
