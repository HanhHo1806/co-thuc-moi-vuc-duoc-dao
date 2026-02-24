import { Flame } from "lucide-react";
import { getStreakEmoji } from "@/lib/gamification/streak-tracker";
import { getStreakMultiplier } from "@/lib/gamification/calorie-engine";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakDisplay({
  currentStreak,
  longestStreak,
}: StreakDisplayProps) {
  const multiplier = getStreakMultiplier(currentStreak);
  const emoji = getStreakEmoji(currentStreak);

  return (
    <div className="flex items-center gap-3 rounded-lg bg-orange-950/50 border border-orange-900/50 p-3">
      <div className="flex items-center gap-1 text-orange-400">
        <Flame className="h-8 w-8" aria-hidden="true" />
        <span className="text-3xl font-bold">{currentStreak}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">
          {emoji} Day Streak
        </p>
        <p className="text-xs text-muted-foreground">
          Best: {longestStreak} days
        </p>
        {multiplier > 1 && (
          <p className="text-xs text-orange-400 font-medium">
            {multiplier}x calorie multiplier active!
          </p>
        )}
      </div>
    </div>
  );
}
