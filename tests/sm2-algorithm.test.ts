import { describe, it, expect } from "vitest";
import {
  sm2,
  getInitialSM2State,
  isDueForReview,
  SM2_MIN_EASINESS_FACTOR,
  SM2_DEFAULT_EASINESS_FACTOR,
} from "../src/lib/learning/sm2-algorithm";

describe("SM-2 Algorithm", () => {
  describe("Initial state", () => {
    it("should return default values for initial state", () => {
      const state = getInitialSM2State();
      expect(state.repetitionCount).toBe(0);
      expect(state.intervalDays).toBe(0);
      expect(state.difficultyRating).toBe(SM2_DEFAULT_EASINESS_FACTOR);
    });
  });

  describe("Quality validation", () => {
    it("should throw error for quality < 0", () => {
      expect(() => sm2(-1, 0, 0, 2.5)).toThrow(
        "Quality must be between 0 and 5"
      );
    });

    it("should throw error for quality > 5", () => {
      expect(() => sm2(6, 0, 0, 2.5)).toThrow(
        "Quality must be between 0 and 5"
      );
    });

    it("should accept quality = 0", () => {
      expect(() => sm2(0, 0, 0, 2.5)).not.toThrow();
    });

    it("should accept quality = 5", () => {
      expect(() => sm2(5, 0, 0, 2.5)).not.toThrow();
    });
  });

  describe("Failed recall (quality < 3)", () => {
    it("should reset repetitions to 0 on quality 0", () => {
      const result = sm2(0, 3, 10, 2.5);
      expect(result.repetitionCount).toBe(0);
    });

    it("should reset interval to 1 on quality 0", () => {
      const result = sm2(0, 3, 10, 2.5);
      expect(result.intervalDays).toBe(1);
    });

    it("should reset repetitions to 0 on quality 1", () => {
      const result = sm2(1, 5, 30, 2.5);
      expect(result.repetitionCount).toBe(0);
    });

    it("should reset repetitions to 0 on quality 2", () => {
      const result = sm2(2, 2, 6, 2.5);
      expect(result.repetitionCount).toBe(0);
    });

    it("should decrease easiness factor on failure", () => {
      const result = sm2(0, 0, 0, 2.5);
      expect(result.difficultyRating).toBeLessThan(2.5);
    });

    it("should not go below minimum easiness factor", () => {
      const result = sm2(0, 0, 0, SM2_MIN_EASINESS_FACTOR);
      expect(result.difficultyRating).toBeGreaterThanOrEqual(
        SM2_MIN_EASINESS_FACTOR
      );
    });
  });

  describe("Successful recall (quality >= 3)", () => {
    it("should set interval to 1 on first repetition (quality 3)", () => {
      const result = sm2(3, 0, 0, 2.5);
      expect(result.intervalDays).toBe(1);
      expect(result.repetitionCount).toBe(1);
    });

    it("should set interval to 6 on second repetition (quality 4)", () => {
      const result = sm2(4, 1, 1, 2.5);
      expect(result.intervalDays).toBe(6);
      expect(result.repetitionCount).toBe(2);
    });

    it("should multiply interval by EF on subsequent repetitions", () => {
      const ef = 2.5;
      const prevInterval = 6;
      const result = sm2(4, 2, prevInterval, ef);
      expect(result.intervalDays).toBe(Math.round(prevInterval * ef));
      expect(result.repetitionCount).toBe(3);
    });

    it("should increase repetition count on success", () => {
      const result = sm2(5, 3, 15, 2.5);
      expect(result.repetitionCount).toBe(4);
    });
  });

  describe("Easiness factor calculation", () => {
    it("should increase EF for quality 5 (perfect recall)", () => {
      const ef = 2.5;
      const result = sm2(5, 0, 0, ef);
      expect(result.difficultyRating).toBeGreaterThan(ef);
    });

    it("should keep EF approximately same for quality 4", () => {
      const ef = 2.5;
      const result = sm2(4, 0, 0, ef);
      // For q=4: EF + (0.1 - 1 * (0.08 + 1 * 0.02)) = EF + 0
      expect(result.difficultyRating).toBeCloseTo(ef, 5);
    });

    it("should decrease EF for quality 3", () => {
      const ef = 2.5;
      const result = sm2(3, 0, 0, ef);
      expect(result.difficultyRating).toBeLessThan(ef);
    });

    it("should enforce minimum EF of 1.3", () => {
      // Apply quality 0 repeatedly to drive EF to minimum
      let ef = SM2_DEFAULT_EASINESS_FACTOR;
      for (let i = 0; i < 20; i++) {
        const result = sm2(0, 0, 0, ef);
        ef = result.difficultyRating;
      }
      expect(ef).toBe(SM2_MIN_EASINESS_FACTOR);
    });
  });

  describe("Next review date", () => {
    it("should schedule next review intervalDays from today", () => {
      const today = new Date("2024-01-01");
      const result = sm2(5, 0, 0, 2.5, today);
      const expectedDate = new Date("2024-01-02"); // interval = 1
      expect(result.nextReviewDate.toDateString()).toBe(
        expectedDate.toDateString()
      );
    });

    it("should schedule 6 days for second repetition", () => {
      const today = new Date("2024-01-01");
      const result = sm2(4, 1, 1, 2.5, today);
      const expectedDate = new Date("2024-01-07");
      expect(result.nextReviewDate.toDateString()).toBe(
        expectedDate.toDateString()
      );
    });
  });

  describe("isDueForReview", () => {
    it("should return true for past date", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isDueForReview(yesterday)).toBe(true);
    });

    it("should return true for today", () => {
      const today = new Date();
      expect(isDueForReview(today)).toBe(true);
    });

    it("should return false for future date", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isDueForReview(tomorrow)).toBe(false);
    });
  });

  describe("Progressive review simulation", () => {
    it("should correctly simulate a full review sequence", () => {
      // Simulate learning a card with perfect recall
      let state = getInitialSM2State();

      // First review - perfect
      let result = sm2(
        5,
        state.repetitionCount,
        state.intervalDays,
        state.difficultyRating
      );
      expect(result.intervalDays).toBe(1);
      expect(result.repetitionCount).toBe(1);

      // Second review - good
      result = sm2(
        4,
        result.repetitionCount,
        result.intervalDays,
        result.difficultyRating
      );
      expect(result.intervalDays).toBe(6);
      expect(result.repetitionCount).toBe(2);

      // Third review - good
      const prevInterval = result.intervalDays;
      const prevEF = result.difficultyRating;
      result = sm2(
        4,
        result.repetitionCount,
        result.intervalDays,
        result.difficultyRating
      );
      expect(result.intervalDays).toBe(Math.round(prevInterval * prevEF));
      expect(result.repetitionCount).toBe(3);
    });

    it("should reset progress after failed recall mid-sequence", () => {
      // Build up some repetitions
      let result = sm2(5, 0, 0, 2.5);
      result = sm2(5, result.repetitionCount, result.intervalDays, result.difficultyRating);
      result = sm2(5, result.repetitionCount, result.intervalDays, result.difficultyRating);
      
      expect(result.repetitionCount).toBe(3);
      
      // Now fail
      const failResult = sm2(0, result.repetitionCount, result.intervalDays, result.difficultyRating);
      expect(failResult.repetitionCount).toBe(0);
      expect(failResult.intervalDays).toBe(1);
    });
  });
});
