import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Clock, CreditCard, Zap } from "lucide-react";
import type { DashboardStats } from "@/types";
import { getStreakEmoji } from "@/lib/gamification/streak-tracker";

interface StatsCardsProps {
  stats: DashboardStats | null;
  isLoading: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Calories Today",
      value: `${stats.caloriesToday.toLocaleString()} cal`,
      icon: Flame,
      iconClass: "text-orange-400",
      subtitle: "Keep eating knowledge!",
    },
    {
      title: "Current Streak",
      value: `${stats.currentStreak} days`,
      icon: Zap,
      iconClass: "text-yellow-400",
      subtitle: `${getStreakEmoji(stats.currentStreak)} ${stats.streakMultiplier}x multiplier`,
    },
    {
      title: "Cards Due",
      value: stats.cardsDueForReview.toString(),
      icon: CreditCard,
      iconClass: "text-blue-400",
      subtitle: "Review cards due today",
    },
    {
      title: "Study Time",
      value: `${stats.studyMinutesToday} min`,
      icon: Clock,
      iconClass: "text-green-400",
      subtitle: "Total today",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon
              className={`h-4 w-4 ${card.iconClass}`}
              aria-hidden="true"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {card.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
