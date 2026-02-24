import { Sidebar } from "@/components/layout/sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CalorieChart } from "@/components/dashboard/calorie-chart";
import { RecentMeals } from "@/components/dashboard/recent-meals";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { StreakDisplay } from "@/components/dashboard/streak-display";
import { LevelBadge } from "@/components/gamification/level-badge";
import { XPBar } from "@/components/gamification/xp-bar";
import { FoodEarnedAnimation } from "@/components/gamification/food-earned-animation";

// Mock data for static rendering (real app would fetch from API)
const mockStats = {
  caloriesToday: 0,
  currentStreak: 0,
  streakMultiplier: 1.0,
  cardsDueForReview: 0,
  studyMinutesToday: 0,
  currentLevel: 1,
  xpPoints: 0,
  xpForNextLevel: 100,
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Ready to earn some food? 🍜
            </p>
          </div>
          <LevelBadge level={mockStats.currentLevel} />
        </div>

        {/* XP Bar */}
        <div className="max-w-sm">
          <XPBar
            xpPoints={mockStats.xpPoints}
            currentLevel={mockStats.currentLevel}
          />
        </div>

        {/* Stats Cards */}
        <StatsCards stats={mockStats} isLoading={false} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly chart */}
            <CalorieChart data={[]} />

            {/* Streak */}
            <StreakDisplay currentStreak={0} longestStreak={0} />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Quick Actions
              </h2>
              <QuickActions />
            </div>

            {/* Recent meals */}
            <RecentMeals meals={[]} isLoading={false} />
          </div>
        </div>
      </div>
      <FoodEarnedAnimation />
    </div>
  );
}
