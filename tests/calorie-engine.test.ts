import { describe, it, expect } from "vitest";
import {
  calculateCalories,
  getStreakMultiplier,
  BASE_RATES,
  STREAK_MULTIPLIERS,
} from "../src/lib/gamification/calorie-engine";

describe("Calorie Engine", () => {
  describe("getStreakMultiplier", () => {
    it("should return 1.0 for no streak", () => {
      expect(getStreakMultiplier(0)).toBe(1.0);
    });

    it("should return 1.1 for 3-day streak", () => {
      expect(getStreakMultiplier(3)).toBe(1.1);
    });

    it("should return 1.25 for 7-day streak", () => {
      expect(getStreakMultiplier(7)).toBe(1.25);
    });

    it("should return 1.5 for 14-day streak", () => {
      expect(getStreakMultiplier(14)).toBe(1.5);
    });

    it("should return 2.0 for 30-day streak", () => {
      expect(getStreakMultiplier(30)).toBe(2.0);
    });

    it("should return 2.5 for 60-day streak", () => {
      expect(getStreakMultiplier(60)).toBe(2.5);
    });

    it("should return 3.0 for 100-day streak", () => {
      expect(getStreakMultiplier(100)).toBe(3.0);
    });

    it("should use highest applicable tier", () => {
      expect(getStreakMultiplier(45)).toBe(2.0); // 30-day tier
      expect(getStreakMultiplier(150)).toBe(3.0); // 100-day tier
    });
  });

  describe("calculateCalories - STUDY", () => {
    it("should calculate 150 cal for 30 min study", () => {
      const result = calculateCalories("STUDY", 30, 0);
      expect(result.baseCalories).toBe(150);
      expect(result.totalCalories).toBe(150);
    });

    it("should calculate 300 cal for 60 min study", () => {
      const result = calculateCalories("STUDY", 60, 0);
      expect(result.baseCalories).toBe(300);
    });

    it("should apply streak multiplier to study", () => {
      const result = calculateCalories("STUDY", 30, 7);
      expect(result.multiplier).toBe(1.25);
      expect(result.totalCalories).toBe(Math.round(150 * 1.25));
    });
  });

  describe("calculateCalories - LAB", () => {
    it("should return 450 cal for a lab", () => {
      const result = calculateCalories("LAB", 60, 0);
      expect(result.baseCalories).toBe(450);
    });
  });

  describe("calculateCalories - QUIZ", () => {
    it("should return 350 cal for passing quiz (>=80%)", () => {
      const result = calculateCalories("QUIZ", 0, 0, { quizScore: 85 });
      expect(result.baseCalories).toBe(350);
    });

    it("should return 500 cal for perfect quiz (100%)", () => {
      const result = calculateCalories("QUIZ", 0, 0, { quizScore: 100 });
      expect(result.baseCalories).toBe(500);
    });

    it("should return 0 cal for failing quiz (<60%)", () => {
      const result = calculateCalories("QUIZ", 0, 0, { quizScore: 50 });
      expect(result.baseCalories).toBe(0);
      expect(result.penaltyApplied).toBe(true);
    });

    it("should return partial cal for borderline quiz (60-79%)", () => {
      const result = calculateCalories("QUIZ", 0, 0, { quizScore: 70 });
      expect(result.baseCalories).toBeGreaterThan(0);
      expect(result.baseCalories).toBeLessThan(350);
    });
  });

  describe("calculateCalories - Other types", () => {
    it("should return 200 cal for FEYNMAN_WRITE", () => {
      const result = calculateCalories("FEYNMAN_WRITE", 0, 0);
      expect(result.baseCalories).toBe(200);
    });

    it("should return 500 cal for DEBUG_CHALLENGE", () => {
      const result = calculateCalories("DEBUG_CHALLENGE", 0, 0);
      expect(result.baseCalories).toBe(500);
    });

    it("should return 300 cal for TEACH", () => {
      const result = calculateCalories("TEACH", 0, 0);
      expect(result.baseCalories).toBe(300);
    });

    it("should return 100 cal per 30 min for REVIEW", () => {
      const result = calculateCalories("REVIEW", 30, 0);
      expect(result.baseCalories).toBe(100);
    });
  });

  describe("Penalties", () => {
    it("should apply missed day penalty (0.75x)", () => {
      const result = calculateCalories("STUDY", 30, 0, {
        hasMissedDayPenalty: true,
      });
      expect(result.multiplier).toBe(0.75);
      expect(result.penaltyApplied).toBe(true);
      expect(result.totalCalories).toBe(Math.round(150 * 0.75));
    });

    it("should apply SRS skip penalty (0.5x)", () => {
      const result = calculateCalories("STUDY", 30, 0, {
        hasSrsSkipPenalty: true,
      });
      expect(result.multiplier).toBe(0.5);
      expect(result.penaltyApplied).toBe(true);
    });

    it("should stack streak bonus and penalty", () => {
      // 7-day streak (1.25x) + missed day (0.75x) = 0.9375x
      const result = calculateCalories("STUDY", 30, 7, {
        hasMissedDayPenalty: true,
      });
      expect(result.multiplier).toBeCloseTo(1.25 * 0.75, 5);
    });
  });

  describe("Streak bonus indicator", () => {
    it("should indicate streak bonus for multiplier > 1", () => {
      const result = calculateCalories("STUDY", 30, 7);
      expect(result.streakBonus).toBe(true);
    });

    it("should not indicate streak bonus for no streak", () => {
      const result = calculateCalories("STUDY", 30, 0);
      expect(result.streakBonus).toBe(false);
    });
  });

  describe("Base rates consistency", () => {
    it("should match documented base rates", () => {
      expect(BASE_RATES.STUDY).toBe(150);
      expect(BASE_RATES.LAB).toBe(450);
      expect(BASE_RATES.QUIZ).toBe(350);
      expect(BASE_RATES.FEYNMAN_WRITE).toBe(200);
      expect(BASE_RATES.DEBUG_CHALLENGE).toBe(500);
      expect(BASE_RATES.TEACH).toBe(300);
      expect(BASE_RATES.REVIEW).toBe(100);
    });

    it("should have streak multipliers in descending order", () => {
      for (let i = 1; i < STREAK_MULTIPLIERS.length; i++) {
        expect(STREAK_MULTIPLIERS[i - 1]!.multiplier).toBeGreaterThan(
          STREAK_MULTIPLIERS[i]!.multiplier
        );
      }
    });
  });
});
