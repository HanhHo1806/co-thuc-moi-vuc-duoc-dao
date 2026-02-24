import { describe, it, expect, beforeEach } from "vitest";
import {
  calculateStreakFromDates,
  isStreakBroken,
  getStreakStatus,
  getStreakEmoji,
} from "../src/lib/gamification/streak-tracker";

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

describe("Streak Tracker", () => {
  describe("calculateStreakFromDates", () => {
    it("should return 0 for empty dates", () => {
      expect(calculateStreakFromDates([])).toBe(0);
    });

    it("should return 1 for only today", () => {
      expect(calculateStreakFromDates([new Date()])).toBe(1);
    });

    it("should return 1 for only yesterday", () => {
      expect(calculateStreakFromDates([daysAgo(1)])).toBe(1);
    });

    it("should return 0 for only 2 days ago", () => {
      expect(calculateStreakFromDates([daysAgo(2)])).toBe(0);
    });

    it("should calculate consecutive day streak", () => {
      const dates = [
        new Date(), // today
        daysAgo(1), // yesterday
        daysAgo(2), // 2 days ago
        daysAgo(3), // 3 days ago
      ];
      expect(calculateStreakFromDates(dates)).toBe(4);
    });

    it("should stop counting at break in streak", () => {
      const dates = [
        new Date(), // today
        daysAgo(1), // yesterday
        // gap: day 2 missing
        daysAgo(3), // 3 days ago
        daysAgo(4), // 4 days ago
      ];
      expect(calculateStreakFromDates(dates)).toBe(2);
    });

    it("should deduplicate same-day entries", () => {
      const today = new Date();
      const dates = [
        today,
        new Date(today), // same day
        daysAgo(1),
        daysAgo(1), // same day
      ];
      expect(calculateStreakFromDates(dates)).toBe(2);
    });

    it("should handle only yesterday with no today entry", () => {
      const dates = [daysAgo(1), daysAgo(2), daysAgo(3)];
      expect(calculateStreakFromDates(dates)).toBe(3);
    });
  });

  describe("isStreakBroken", () => {
    it("should return false for null last activity", () => {
      expect(isStreakBroken(null)).toBe(false);
    });

    it("should return false for today", () => {
      expect(isStreakBroken(new Date())).toBe(false);
    });

    it("should return false for yesterday", () => {
      expect(isStreakBroken(daysAgo(1))).toBe(false);
    });

    it("should return true for 2 days ago", () => {
      expect(isStreakBroken(daysAgo(2))).toBe(true);
    });

    it("should return true for last week", () => {
      expect(isStreakBroken(daysAgo(7))).toBe(true);
    });
  });

  describe("getStreakStatus", () => {
    it("should return zero streak for broken streak", () => {
      const status = getStreakStatus(5, 10, daysAgo(3), false);
      expect(status.currentStreak).toBe(0);
    });

    it("should return current streak for active streak", () => {
      const status = getStreakStatus(5, 10, new Date(), false);
      expect(status.currentStreak).toBe(5);
    });

    it("should preserve longest streak", () => {
      const status = getStreakStatus(5, 10, new Date(), false);
      expect(status.longestStreak).toBe(10);
    });

    it("should apply correct multiplier", () => {
      const status = getStreakStatus(7, 7, new Date(), false);
      expect(status.multiplier).toBe(1.25);
    });

    it("should clear penalty flag when streak is broken", () => {
      const status = getStreakStatus(5, 10, daysAgo(3), true);
      expect(status.isOnPenalty).toBe(false);
    });
  });

  describe("getStreakEmoji", () => {
    it("should return seedling for streak < 3", () => {
      expect(getStreakEmoji(0)).toBe("🌱");
      expect(getStreakEmoji(2)).toBe("🌱");
    });

    it("should return star for streak 3-6", () => {
      expect(getStreakEmoji(3)).toBe("⭐");
      expect(getStreakEmoji(6)).toBe("⭐");
    });

    it("should return sparkles for streak 7-13", () => {
      expect(getStreakEmoji(7)).toBe("✨");
      expect(getStreakEmoji(13)).toBe("✨");
    });

    it("should return lightning for streak 14-29", () => {
      expect(getStreakEmoji(14)).toBe("⚡");
      expect(getStreakEmoji(29)).toBe("⚡");
    });

    it("should return fire for streak 30-59", () => {
      expect(getStreakEmoji(30)).toBe("🔥");
      expect(getStreakEmoji(59)).toBe("🔥");
    });

    it("should return double fire for streak 60-99", () => {
      expect(getStreakEmoji(60)).toBe("🔥🔥");
    });

    it("should return triple fire for streak >= 100", () => {
      expect(getStreakEmoji(100)).toBe("🔥🔥🔥");
      expect(getStreakEmoji(200)).toBe("🔥🔥🔥");
    });
  });
});
