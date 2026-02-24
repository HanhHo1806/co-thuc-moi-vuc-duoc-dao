"use client";

import { useState } from "react";
import { FoodCard } from "./food-card";
import { FoodDetailModal } from "./food-detail-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FoodRewardWithEarned } from "@/types";

interface FoodGridProps {
  foods: FoodRewardWithEarned[];
}

export function FoodGrid({ foods }: FoodGridProps) {
  const [selectedFood, setSelectedFood] = useState<FoodRewardWithEarned | null>(
    null
  );
  const [filterRarity, setFilterRarity] = useState("ALL");
  const [filterEarned, setFilterEarned] = useState("ALL");
  const [filterCuisine, setFilterCuisine] = useState("ALL");

  const filtered = foods.filter((food) => {
    if (filterRarity !== "ALL" && food.rarity !== filterRarity) return false;
    if (filterEarned === "EARNED" && !food.earned) return false;
    if (filterEarned === "LOCKED" && food.earned) return false;
    if (filterCuisine !== "ALL" && food.cuisineType !== filterCuisine)
      return false;
    return true;
  });

  const earnedCount = foods.filter((f) => f.earned).length;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="text-sm text-muted-foreground">
        Collection: {earnedCount}/{foods.length} unlocked
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={filterRarity} onValueChange={setFilterRarity}>
          <SelectTrigger className="w-36" aria-label="Filter by rarity">
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Rarities</SelectItem>
            <SelectItem value="COMMON">Common</SelectItem>
            <SelectItem value="UNCOMMON">Uncommon</SelectItem>
            <SelectItem value="RARE">Rare</SelectItem>
            <SelectItem value="EPIC">Epic</SelectItem>
            <SelectItem value="LEGENDARY">Legendary</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterEarned} onValueChange={setFilterEarned}>
          <SelectTrigger className="w-36" aria-label="Filter by earned status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Items</SelectItem>
            <SelectItem value="EARNED">Earned</SelectItem>
            <SelectItem value="LOCKED">Locked</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterCuisine} onValueChange={setFilterCuisine}>
          <SelectTrigger className="w-40" aria-label="Filter by cuisine">
            <SelectValue placeholder="Cuisine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Cuisines</SelectItem>
            <SelectItem value="VIETNAMESE">Vietnamese 🇻🇳</SelectItem>
            <SelectItem value="JAPANESE">Japanese 🇯🇵</SelectItem>
            <SelectItem value="KOREAN">Korean 🇰🇷</SelectItem>
            <SelectItem value="THAI">Thai 🇹🇭</SelectItem>
            <SelectItem value="INDIAN">Indian 🇮🇳</SelectItem>
            <SelectItem value="MEXICAN">Mexican 🇲🇽</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No items match your filters.
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          role="list"
          aria-label="Food collection"
        >
          {filtered.map((food) => (
            <div key={food.id} role="listitem">
              <FoodCard food={food} onClick={() => setSelectedFood(food)} />
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  );
}
