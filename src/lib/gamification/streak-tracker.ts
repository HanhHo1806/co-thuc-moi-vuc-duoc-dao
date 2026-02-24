import { getStreakMultiplier } from "./calorie-engine";

export interface StreakStatus {
  currentStreak: number;
  longestStreak: number;
  multiplier: number;
  isOnPenalty: boolean;
  lastActivityDate: Date | null;
}

export function calculateStreakFromDates(activityDates: Date[]): number {
  if (activityDates.length === 0) return 0;

  // Sort dates descending
  const sorted = [...activityDates]
    .map((d) => new Date(d.toDateString())) // normalize to day
    .sort((a, b) => b.getTime() - a.getTime());

  // Remove duplicates
  const unique = sorted.filter(
    (d, i, arr) => i === 0 || d.getTime() !== arr[i - 1].getTime()
  );

  const today = new Date(new Date().toDateString());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Streak must include today or yesterday to be active
  if (
    unique[0].getTime() !== today.getTime() &&
    unique[0].getTime() !== yesterday.getTime()
  ) {
    return 0;
  }

  let streak = 1;
  for (let i = 1; i < unique.length; i++) {
    const diff =
      (unique[i - 1].getTime() - unique[i].getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function isStreakBroken(lastActivityDate: Date | null): boolean {
  if (!lastActivityDate) return false;

  const today = new Date(new Date().toDateString());
  const last = new Date(new Date(lastActivityDate).toDateString());
  const diffDays = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

  // Streak broken if no activity yesterday or today
  return diffDays > 1;
}

export function getStreakStatus(
  currentStreak: number,
  longestStreak: number,
  lastActivityDate: Date | null,
  isOnPenalty: boolean
): StreakStatus {
  const broken = isStreakBroken(lastActivityDate);
  const effectiveStreak = broken ? 0 : currentStreak;

  return {
    currentStreak: effectiveStreak,
    longestStreak,
    multiplier: getStreakMultiplier(effectiveStreak),
    isOnPenalty: broken ? false : isOnPenalty,
    lastActivityDate,
  };
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 100) return "🔥🔥🔥";
  if (streak >= 60) return "🔥🔥";
  if (streak >= 30) return "🔥";
  if (streak >= 14) return "⚡";
  if (streak >= 7) return "✨";
  if (streak >= 3) return "⭐";
  return "🌱";
}
