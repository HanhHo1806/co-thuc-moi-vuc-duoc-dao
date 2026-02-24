import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getRarityColor } from "@/lib/utils";
import type { EarnedMeal, FoodReward } from "@prisma/client";

type EarnedMealWithFood = EarnedMeal & { foodReward: FoodReward };

interface RecentMealsProps {
  meals: EarnedMealWithFood[];
  isLoading: boolean;
}

export function RecentMeals({ meals, isLoading }: RecentMealsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Meals Earned</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Meals Earned</CardTitle>
      </CardHeader>
      <CardContent>
        {meals.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No meals earned yet. Complete a study session to earn your first
            meal!
          </p>
        ) : (
          <ul className="space-y-3" aria-label="Recent earned meals">
            {meals.map((meal) => (
              <li
                key={meal.id}
                className="flex items-center gap-3 rounded-lg bg-muted/50 p-2"
              >
                <span
                  className="text-3xl w-10 text-center"
                  aria-hidden="true"
                >
                  {meal.foodReward.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {meal.foodReward.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {meal.foodReward.nameVi}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getRarityColor(meal.foodReward.rarity)}`}
                  >
                    {meal.foodReward.rarity}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {meal.effectiveCalories} cal
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
