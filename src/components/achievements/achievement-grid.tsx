import { AchievementCard } from "./achievement-card";
import type { Achievement, UserAchievement } from "@prisma/client";

type AchievementWithUnlock = Achievement & {
  userAchievement?: UserAchievement | null;
};

interface AchievementGridProps {
  achievements: AchievementWithUnlock[];
}

export function AchievementGrid({ achievements }: AchievementGridProps) {
  const unlockedCount = achievements.filter((a) => a.userAchievement).length;

  if (achievements.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No achievements found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {unlockedCount}/{achievements.length} achievements unlocked
      </p>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
        aria-label="Achievements"
      >
        {achievements.map((achievement) => (
          <div key={achievement.id} role="listitem">
            <AchievementCard achievement={achievement} />
          </div>
        ))}
      </div>
    </div>
  );
}
