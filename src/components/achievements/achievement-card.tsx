import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Achievement, UserAchievement } from "@prisma/client";

type AchievementWithUnlock = Achievement & {
  userAchievement?: UserAchievement | null;
};

interface AchievementCardProps {
  achievement: AchievementWithUnlock;
}

const CONDITION_TYPE_LABELS: Record<string, string> = {
  STREAK: "🔥 Streak",
  CALORIES: "🍜 Calories",
  SESSIONS: "📚 Sessions",
  CERT_COMPLETE: "🏆 Certification",
  QUIZ_SCORE: "📝 Quiz Score",
  FEYNMAN_COUNT: "✍️ Feynman",
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  const isUnlocked = !!achievement.userAchievement;

  return (
    <Card
      className={`transition-all ${
        isUnlocked
          ? "border-yellow-700/50 bg-yellow-950/20"
          : "opacity-60 grayscale"
      }`}
      aria-label={`${achievement.name}: ${isUnlocked ? "Unlocked" : "Locked"}`}
    >
      <CardContent className="flex items-start gap-3 p-4">
        <span className="text-3xl shrink-0" aria-hidden="true">
          {achievement.emoji}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-semibold">{achievement.name}</p>
            <Badge variant="secondary" className="text-xs shrink-0">
              +{achievement.xpReward} XP
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {achievement.description}
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {CONDITION_TYPE_LABELS[achievement.conditionType] ?? achievement.conditionType}:{" "}
              {achievement.conditionValue}
            </Badge>
          </div>
          {isUnlocked && achievement.userAchievement && (
            <p className="text-xs text-yellow-400 mt-2">
              ✓ Unlocked {formatDate(achievement.userAchievement.unlockedAt)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
