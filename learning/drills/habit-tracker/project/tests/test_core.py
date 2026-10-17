import unittest
from datetime import date

from habits import core

TODAY = date(2026, 3, 18)


def habit_with(*days_ago: int, frequency: str = "daily") -> core.Habit:
    h = core.Habit(name="stretch", frequency=frequency, created=date(2026, 1, 1))
    h.log = [core.days_ago(TODAY, n) for n in days_ago]
    return h


class StreakTest(unittest.TestCase):
    def test_no_check_ins_means_no_streak(self):
        self.assertEqual(core.current_streak(habit_with(), TODAY), 0)

    def test_consecutive_days(self):
        self.assertEqual(core.current_streak(habit_with(0, 1, 2), TODAY), 3)

    def test_not_done_today_yet_keeps_streak(self):
        self.assertEqual(core.current_streak(habit_with(1, 2), TODAY), 2)

    def test_gap_resets(self):
        self.assertEqual(core.current_streak(habit_with(0, 1, 3, 4), TODAY), 2)

    def test_missed_yesterday_is_zero(self):
        self.assertEqual(core.current_streak(habit_with(2, 3), TODAY), 0)

    def test_weekly(self):
        self.assertEqual(core.current_streak(habit_with(0, 7, 14, frequency="weekly"), TODAY), 3)


class AddHabitTest(unittest.TestCase):
    def test_rejects_duplicates(self):
        habits = {}
        core.add_habit(habits, "read", "daily", TODAY)
        with self.assertRaises(ValueError):
            core.add_habit(habits, "read", "daily", TODAY)

    def test_rejects_unknown_frequency(self):
        with self.assertRaises(ValueError):
            core.add_habit({}, "read", "hourly", TODAY)


if __name__ == "__main__":
    unittest.main()
