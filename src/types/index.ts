// Re-export Prisma types
export type {
  User,
  Certification,
  LearningPath,
  Topic,
  StudySession,
  FoodReward,
  EarnedMeal,
  Flashcard,
  FeynmanEntry,
  Quiz,
  Achievement,
  UserAchievement,
  DailyLog,
} from "@prisma/client";

export {
  CertificationCategory,
  LearningPathStatus,
  SessionType,
  CuisineType,
  FoodRarity,
  FoodCategory,
  AchievementConditionType,
} from "@prisma/client";

// Gamification types
export interface CalorieCalculationResult {
  baseCalories: number;
  multiplier: number;
  totalCalories: number;
  streakBonus: boolean;
  penaltyApplied: boolean;
}

export interface SM2Result {
  repetitionCount: number;
  intervalDays: number;
  difficultyRating: number;
  nextReviewDate: Date;
}

export interface PomodoroSession {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  pomodorosUntilLongBreak: number;
  completedPomodoros: number;
  currentPhase: "work" | "shortBreak" | "longBreak";
  isRunning: boolean;
  timeRemainingSeconds: number;
}

export interface AchievementUnlockResult {
  achievementId: string;
  name: string;
  emoji: string;
  xpReward: number;
}

export interface DashboardStats {
  caloriesToday: number;
  currentStreak: number;
  streakMultiplier: number;
  cardsDueForReview: number;
  studyMinutesToday: number;
  currentLevel: number;
  xpPoints: number;
  xpForNextLevel: number;
}

export interface WeeklyCalorieData {
  date: string;
  calories: number;
}

export interface FoodRewardWithEarned {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  cuisineType: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  imageUrl: string | null;
  emoji: string;
  rarity: string;
  unlockCondition: string | null;
  category: string;
  earned: boolean;
  earnedCount: number;
}

export interface SessionFormData {
  sessionType: string;
  topicId?: string;
  notes?: string;
  qualityRating?: number;
}

export interface FlashcardReviewData {
  cardId: string;
  quality: number; // 0-5
}

export interface FeynmanEntryFormData {
  conceptName: string;
  explanation: string;
  simplicityScore?: number;
  gapsIdentified: string[];
  topicId?: string;
}
