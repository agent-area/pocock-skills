import unittest

from tripsplit.split import split_amount


class SplitAmountTest(unittest.TestCase):
    def test_even_split(self):
        self.assertEqual(split_amount(900, {"ana": 1, "ben": 1, "cy": 1}), {"ana": 300, "ben": 300, "cy": 300})

    def test_even_split_hands_out_leftover_cents(self):
        result = split_amount(1000, {"ana": 1, "ben": 1, "cy": 1})
        self.assertEqual(sum(result.values()), 1000)
        self.assertEqual(sorted(result.values()), [333, 333, 334])

    def test_weighted_split(self):
        self.assertEqual(split_amount(900, {"ana": 2, "ben": 1}), {"ana": 600, "ben": 300})

    def test_rejects_empty_shares(self):
        with self.assertRaises(ValueError):
            split_amount(100, {})

    def test_rejects_zero_share(self):
        with self.assertRaises(ValueError):
            split_amount(100, {"ana": 0})


if __name__ == "__main__":
    unittest.main()
