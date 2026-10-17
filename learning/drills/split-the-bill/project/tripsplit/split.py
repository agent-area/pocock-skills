from __future__ import annotations


def split_amount(total_cents: int, shares: dict[str, int]) -> dict[str, int]:
    """Divide `total_cents` between people according to their share counts."""
    if total_cents < 0:
        raise ValueError("amount must not be negative")
    if not shares:
        raise ValueError("an expense needs at least one person to split it")
    if any(s <= 0 for s in shares.values()):
        raise ValueError("share counts must be positive")

    people = sorted(shares)

    # Fast path: everyone carries the same number of shares, so it's an even
    # split. Hand the leftover cents out one at a time so nothing is lost.
    if len(set(shares.values())) == 1:
        base, remainder = divmod(total_cents, len(people))
        return {p: base + (1 if i < remainder else 0) for i, p in enumerate(people)}

    total_shares = sum(shares.values())
    return {p: round(total_cents * shares[p] / total_shares) for p in people}
