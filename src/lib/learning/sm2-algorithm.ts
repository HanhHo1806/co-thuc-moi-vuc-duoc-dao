import type { SM2Result } from "@/types";

/**
 * SM-2 Spaced Repetition Algorithm
 *
 * Quality ratings (0-5):
 * 0: Complete blackout
 * 1: Wrong, but recognized answer
 * 2: Wrong, but answer felt familiar
 * 3: Correct with serious difficulty
 * 4: Correct with some hesitation
 * 5: Perfect instant recall
 */

export const SM2_MIN_EASINESS_FACTOR = 1.3;
export const SM2_DEFAULT_EASINESS_FACTOR = 2.5;

export function sm2(
  quality: number,
  repetitionCount: number,
  intervalDays: number,
  easinessFactor: number,
  today: Date = new Date()
): SM2Result {
  if (quality < 0 || quality > 5) {
    throw new Error("Quality must be between 0 and 5");
  }

  let newRepetitionCount = repetitionCount;
  let newIntervalDays = intervalDays;

  if (quality >= 3) {
    // Successful recall
    if (newRepetitionCount === 0) {
      newIntervalDays = 1;
    } else if (newRepetitionCount === 1) {
      newIntervalDays = 6;
    } else {
      newIntervalDays = Math.round(newIntervalDays * easinessFactor);
    }
    newRepetitionCount += 1;
  } else {
    // Failed recall
    newRepetitionCount = 0;
    newIntervalDays = 1;
  }

  // Update easiness factor
  const newEasinessFactor = Math.max(
    SM2_MIN_EASINESS_FACTOR,
    easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Calculate next review date
  const nextReviewDate = new Date(today);
  nextReviewDate.setDate(nextReviewDate.getDate() + newIntervalDays);

  return {
    repetitionCount: newRepetitionCount,
    intervalDays: newIntervalDays,
    difficultyRating: newEasinessFactor,
    nextReviewDate,
  };
}

export function getInitialSM2State() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    repetitionCount: 0,
    intervalDays: 0,
    difficultyRating: SM2_DEFAULT_EASINESS_FACTOR,
    nextReviewDate: tomorrow,
  };
}

export function isDueForReview(nextReviewDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reviewDate = new Date(nextReviewDate);
  reviewDate.setHours(0, 0, 0, 0);
  return reviewDate <= today;
}
