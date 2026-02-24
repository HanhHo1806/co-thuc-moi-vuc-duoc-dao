import { Progress } from "@/components/ui/progress";
import { getXPForNextLevel } from "@/lib/utils";

interface XPBarProps {
  xpPoints: number;
  currentLevel: number;
}

export function XPBar({ xpPoints, currentLevel }: XPBarProps) {
  const xpForNextLevel = getXPForNextLevel(currentLevel);
  const xpForCurrentLevel = getXPForNextLevel(currentLevel - 1);
  const xpInCurrentLevel = xpPoints - xpForCurrentLevel;
  const xpNeededForCurrentLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercent =
    xpNeededForCurrentLevel > 0
      ? Math.min(100, (xpInCurrentLevel / xpNeededForCurrentLevel) * 100)
      : 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{xpPoints.toLocaleString()} XP</span>
        <span>{xpForNextLevel.toLocaleString()} XP</span>
      </div>
      <Progress
        value={progressPercent}
        className="h-2"
        aria-label={`XP progress: ${xpPoints} of ${xpForNextLevel}`}
      />
    </div>
  );
}
