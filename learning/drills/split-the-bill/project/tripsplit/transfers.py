from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Transfer:
    sender: str
    receiver: str
    amount_cents: int


def settle_up(balances: dict[str, int]) -> tuple[list[Transfer], int]:
    """Greedy settle-up: biggest debtor pays biggest creditor until done.

    Returns the transfers plus whatever could not be matched (should be 0).
    """
    debtors = sorted(((-b, p) for p, b in balances.items() if b < 0), reverse=True)
    creditors = sorted(((b, p) for p, b in balances.items() if b > 0), reverse=True)
    debtors = [list(d) for d in debtors]
    creditors = [list(c) for c in creditors]

    transfers: list[Transfer] = []
    i = j = 0
    while i < len(debtors) and j < len(creditors):
        amount = min(debtors[i][0], creditors[j][0])
        if amount > 0:
            transfers.append(Transfer(debtors[i][1], creditors[j][1], amount))
        debtors[i][0] -= amount
        creditors[j][0] -= amount
        if debtors[i][0] == 0:
            i += 1
        if creditors[j][0] == 0:
            j += 1

    unmatched = sum(d[0] for d in debtors[i:]) - sum(c[0] for c in creditors[j:])
    return transfers, unmatched
