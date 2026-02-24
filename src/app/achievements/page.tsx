import { Sidebar } from "@/components/layout/sidebar";
import { AchievementGrid } from "@/components/achievements/achievement-grid";

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Achievements</h1>
          <p className="text-sm text-muted-foreground">
            Unlock achievements by reaching milestones 🏆
          </p>
        </div>

        <AchievementGrid achievements={[]} />
      </div>
    </div>
  );
}
