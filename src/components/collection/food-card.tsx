import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRarityColor, getRarityBgColor } from "@/lib/utils";
import type { FoodRewardWithEarned } from "@/types";

interface FoodCardProps {
  food: FoodRewardWithEarned;
  onClick: () => void;
}

export function FoodCard({ food, onClick }: FoodCardProps) {
  const isLocked = !food.earned;

  return (
    <Card
      className={`cursor-pointer transition-all hover:scale-105 ${
        isLocked ? "opacity-60 grayscale" : ""
      } ${getRarityBgColor(food.rarity)}/20`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && onClick()
      }
      aria-label={isLocked ? `Locked food item` : `${food.name} (${food.rarity})`}
    >
      <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
        <span className="text-4xl" aria-hidden="true">
          {isLocked ? "❓" : food.emoji}
        </span>
        <div className="space-y-1">
          <p className="text-sm font-medium truncate w-full">
            {isLocked ? "???" : food.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {isLocked ? "Locked" : food.nameVi}
          </p>
        </div>
        <Badge
          variant="outline"
          className={`text-xs ${getRarityColor(food.rarity)}`}
        >
          {food.rarity}
        </Badge>
        {!isLocked && (
          <p className="text-xs text-yellow-400">{food.calories} cal</p>
        )}
        {food.earnedCount > 1 && (
          <span className="text-xs text-muted-foreground">×{food.earnedCount}</span>
        )}
      </CardContent>
    </Card>
  );
}
