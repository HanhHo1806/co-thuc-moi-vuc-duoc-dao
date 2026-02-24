import { SessionType } from "@prisma/client";
import type { CalorieCalculationResult } from "@/types";

// Base calorie rates per activity type
export const BASE_RATES: Record<SessionType, number> = {
  STUDY: 150,        // per 30 min
  LAB: 450,          // per complete lab
  QUIZ: 350,         // pass >=80%
  FEYNMAN_WRITE: 200, // per entry
  DEBUG_CHALLENGE: 500, // per complete
  TEACH: 300,        // per session
  REVIEW: 100,       // per 30 min (SRS)
};

export const QUIZ_PERFECT_CALORIES = 500;
export const QUIZ_PASS_THRESHOLD = 80;
export const QUIZ_FAIL_THRESHOLD = 60;

// Streak multipliers
export const STREAK_MULTIPLIERS: Array<{ days: number; multiplier: number }> = [
  { days: 100, multiplier: 3.0 },
  { days: 60, multiplier: 2.5 },
  { days: 30, multiplier: 2.0 },
  { days: 14, multiplier: 1.5 },
  { days: 7, multiplier: 1.25 },
  { days: 3, multiplier: 1.1 },
];

export const MISSED_DAY_PENALTY_MULTIPLIER = 0.75;
export const SRS_SKIP_PENALTY_MULTIPLIER = 0.5;

export function getStreakMultiplier(streakDays: number): number {
  for (const { days, multiplier } of STREAK_MULTIPLIERS) {
    if (streakDays >= days) {
      return multiplier;
    }
  }
  return 1.0;
}

export function calculateCalories(
  sessionType: SessionType,
  durationMinutes: number,
  currentStreak: number,
  options?: {
    quizScore?: number;
    hasMissedDayPenalty?: boolean;
    hasSrsSkipPenalty?: boolean;
  }
): CalorieCalculationResult {
  let baseCalories = 0;
  let penaltyApplied = false;

  switch (sessionType) {
    case "STUDY":
      baseCalories = Math.floor(durationMinutes / 30) * BASE_RATES.STUDY;
      // Partial credit for < 30 min
      if (durationMinutes % 30 > 0) {
        baseCalories += Math.floor((durationMinutes % 30) / 30 * BASE_RATES.STUDY);
      }
      break;
    case "LAB":
      baseCalories = BASE_RATES.LAB;
      break;
    case "QUIZ":
      if (options?.quizScore !== undefined) {
        if (options.quizScore === 100) {
          baseCalories = QUIZ_PERFECT_CALORIES;
        } else if (options.quizScore >= QUIZ_PASS_THRESHOLD) {
          baseCalories = BASE_RATES.QUIZ;
        } else if (options.quizScore < QUIZ_FAIL_THRESHOLD) {
          baseCalories = 0; // Burned meal - must redo
          penaltyApplied = true;
        } else {
          // Between 60 and 80 - partial
          baseCalories = Math.floor(BASE_RATES.QUIZ * (options.quizScore / 100));
        }
      } else {
        baseCalories = BASE_RATES.QUIZ;
      }
      break;
    case "FEYNMAN_WRITE":
      baseCalories = BASE_RATES.FEYNMAN_WRITE;
      break;
    case "DEBUG_CHALLENGE":
      baseCalories = BASE_RATES.DEBUG_CHALLENGE;
      break;
    case "TEACH":
      baseCalories = BASE_RATES.TEACH;
      break;
    case "REVIEW":
      baseCalories = Math.floor(durationMinutes / 30) * BASE_RATES.REVIEW;
      if (durationMinutes % 30 > 0) {
        baseCalories += Math.floor((durationMinutes % 30) / 30 * BASE_RATES.REVIEW);
      }
      break;
  }

  let multiplier = getStreakMultiplier(currentStreak);

  if (options?.hasMissedDayPenalty) {
    multiplier *= MISSED_DAY_PENALTY_MULTIPLIER;
    penaltyApplied = true;
  }

  if (options?.hasSrsSkipPenalty) {
    multiplier *= SRS_SKIP_PENALTY_MULTIPLIER;
    penaltyApplied = true;
  }

  const totalCalories = Math.round(baseCalories * multiplier);

  return {
    baseCalories,
    multiplier,
    totalCalories,
    streakBonus: multiplier > 1.0,
    penaltyApplied,
  };
}

export function getXPFromCalories(calories: number): number {
  return Math.floor(calories / 10);
}
