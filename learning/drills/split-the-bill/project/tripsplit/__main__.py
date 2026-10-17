from __future__ import annotations

import json
import sys

from .ledger import balances
from .models import Trip
from .money import format_cents
from .transfers import settle_up


def main(argv: list[str]) -> int:
    if len(argv) != 1:
        print("usage: python -m tripsplit <trip.json>", file=sys.stderr)
        return 2
    with open(argv[0], encoding="utf-8") as fh:
        trip = Trip.from_dict(json.load(fh))

    nets = balances(trip)
    transfers, unmatched = settle_up(nets)

    print(f"Settle-up for {trip.name}")
    for t in transfers:
        print(f"  {t.sender} pays {t.receiver} {format_cents(t.amount_cents)}")
    if unmatched:
        print(f"  Unsettled remainder: {unmatched} cent(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
