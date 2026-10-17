from __future__ import annotations


def format_cents(cents: int, symbol: str = "€") -> str:
    """1234 -> '€12.34'. Negative values get a leading minus."""
    sign = "-" if cents < 0 else ""
    whole, frac = divmod(abs(cents), 100)
    return f"{sign}{symbol}{whole:,}.{frac:02d}"
