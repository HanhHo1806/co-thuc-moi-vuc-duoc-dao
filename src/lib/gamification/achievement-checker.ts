import type { AchievementUnlockResult } from "@/types";
import { AchievementConditionType } from "@prisma/client";

export interface AchievementCheckContext {
  userId: string;
  currentStreak: number;
  totalCalories: number;
  totalSessions: number;
  certCompletions: number;
  bestQuizScore: number;
  feynmanCount: number;
  unlockedAchievementIds: string[];
}

export interface AchievementDefinition {
  id: string;
  name: string;
  emoji: string;
  conditionType: AchievementConditionType;
  conditionValue: number;
  xpReward: number;
}

export function checkAchievements(
  context: AchievementCheckContext,
  achievements: AchievementDefinition[]
): AchievementUnlockResult[] {
  const newlyUnlocked: AchievementUnlockResult[] = [];

  for (const achievement of achievements) {
    // Skip already unlocked
    if (context.unlockedAchievementIds.includes(achievement.id)) {
      continue;
    }

    let conditionMet = false;

    switch (achievement.conditionType) {
      case "STREAK":
        conditionMet = context.currentStreak >= achievement.conditionValue;
        break;
      case "CALORIES":
        conditionMet = context.totalCalories >= achievement.conditionValue;
        break;
      case "SESSIONS":
        conditionMet = context.totalSessions >= achievement.conditionValue;
        break;
      case "CERT_COMPLETE":
        conditionMet = context.certCompletions >= achievement.conditionValue;
        break;
      case "QUIZ_SCORE":
        conditionMet = context.bestQuizScore >= achievement.conditionValue;
        break;
      case "FEYNMAN_COUNT":
        conditionMet = context.feynmanCount >= achievement.conditionValue;
        break;
    }

    if (conditionMet) {
      newlyUnlocked.push({
        achievementId: achievement.id,
        name: achievement.name,
        emoji: achievement.emoji,
        xpReward: achievement.xpReward,
      });
    }
  }

  return newlyUnlocked;
}
