import json
import pathlib
import unittest

from tripsplit.ledger import balances
from tripsplit.models import Trip
from tripsplit.transfers import settle_up

EXAMPLES = pathlib.Path(__file__).resolve().parent.parent / "examples"


class SettleTest(unittest.TestCase):
    def test_lisbon_trip_settles_cleanly(self):
        trip = Trip.from_dict(json.loads((EXAMPLES / "lisbon.json").read_text()))
        nets = balances(trip)
        self.assertEqual(sum(nets.values()), 0)
        transfers, unmatched = settle_up(nets)
        self.assertEqual(unmatched, 0)
        self.assertTrue(transfers)


if __name__ == "__main__":
    unittest.main()
