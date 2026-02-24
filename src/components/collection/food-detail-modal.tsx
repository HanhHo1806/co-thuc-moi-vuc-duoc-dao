"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRarityColor } from "@/lib/utils";
import type { FoodRewardWithEarned } from "@/types";
import { X } from "lucide-react";

interface FoodDetailModalProps {
  food: FoodRewardWithEarned;
  onClose: () => void;
}

export function FoodDetailModal({ food, onClose }: FoodDetailModalProps) {
  const isLocked = !food.earned;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isLocked ? "Locked food item details" : `${food.name} details`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-5xl" aria-hidden="true">
              {isLocked ? "❓" : food.emoji}
            </span>
            <div>
              <h2 className="text-lg font-bold">
                {isLocked ? "???" : food.name}
              </h2>
              {!isLocked && (
                <p className="text-sm text-muted-foreground">{food.nameVi}</p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex gap-2 mb-4">
          <Badge
            variant="outline"
            className={getRarityColor(food.rarity)}
          >
            {food.rarity}
          </Badge>
          <Badge variant="secondary">{food.cuisineType}</Badge>
          <Badge variant="secondary">{food.category}</Badge>
        </div>

        {isLocked ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              This item is locked. Complete the unlock condition to reveal it.
            </p>
            {food.unlockCondition && (
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  How to unlock:
                </p>
                <p className="text-sm">{food.unlockCondition}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{food.description}</p>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-xs text-muted-foreground">Calories</p>
                <p className="text-sm font-bold text-yellow-400">
                  {food.calories}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-xs text-muted-foreground">Protein</p>
                <p className="text-sm font-bold">{food.proteinG}g</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-xs text-muted-foreground">Carbs</p>
                <p className="text-sm font-bold">{food.carbsG}g</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-xs text-muted-foreground">Fat</p>
                <p className="text-sm font-bold">{food.fatG}g</p>
              </div>
            </div>

            {food.unlockCondition && (
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Unlock condition:
                </p>
                <p className="text-sm">{food.unlockCondition}</p>
              </div>
            )}

            {food.earnedCount > 0 && (
              <p className="text-xs text-green-400 text-center">
                ✓ Earned {food.earnedCount} time{food.earnedCount > 1 ? "s" : ""}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
