import { FoodRarity, CuisineType, SessionType } from "@prisma/client";
import type { FoodReward } from "@prisma/client";

// Map session types to rarity tiers they can unlock
const SESSION_RARITY_MAP: Record<SessionType, FoodRarity[]> = {
  STUDY: ["COMMON", "UNCOMMON"],
  LAB: ["UNCOMMON", "RARE"],
  QUIZ: ["UNCOMMON", "RARE", "EPIC"],
  FEYNMAN_WRITE: ["COMMON", "UNCOMMON"],
  DEBUG_CHALLENGE: ["RARE", "EPIC"],
  TEACH: ["RARE", "EPIC"],
  REVIEW: ["COMMON"],
};

// Calorie thresholds for legendary items
const LEGENDARY_CALORIE_THRESHOLD = 5000;
const EPIC_CALORIE_THRESHOLD = 2000;
const RARE_CALORIE_THRESHOLD = 1000;

export function selectFoodReward(
  sessionType: SessionType,
  caloriesEarned: number,
  cuisineTheme: string,
  availableFoods: FoodReward[],
  earnedFoodIds: string[],
  isPerfectQuiz?: boolean
): FoodReward | null {
  if (availableFoods.length === 0) return null;

  // Determine max rarity based on calories and session type
  let eligibleRarities: FoodRarity[] = SESSION_RARITY_MAP[sessionType];

  if (caloriesEarned >= LEGENDARY_CALORIE_THRESHOLD || isPerfectQuiz) {
    eligibleRarities = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"];
  } else if (caloriesEarned >= EPIC_CALORIE_THRESHOLD) {
    eligibleRarities = eligibleRarities.includes("EPIC")
      ? eligibleRarities
      : [...eligibleRarities, "EPIC"];
  } else if (caloriesEarned >= RARE_CALORIE_THRESHOLD) {
    eligibleRarities = eligibleRarities.includes("RARE")
      ? eligibleRarities
      : [...eligibleRarities, "RARE"];
  }

  // Normalize cuisine theme to CuisineType enum
  const cuisineMap: Record<string, CuisineType> = {
    Vietnamese: "VIETNAMESE",
    Japanese: "JAPANESE",
    Korean: "KOREAN",
    Thai: "THAI",
    Indian: "INDIAN",
    Mexican: "MEXICAN",
  };
  const cuisineType: CuisineType = cuisineMap[cuisineTheme] ?? "GENERAL";

  // Filter: matching cuisine OR general, eligible rarity
  let candidates = availableFoods.filter(
    (food) =>
      (food.cuisineType === cuisineType || food.cuisineType === "GENERAL") &&
      eligibleRarities.includes(food.rarity)
  );

  // Prefer unearned foods
  const unearnedCandidates = candidates.filter(
    (f) => !earnedFoodIds.includes(f.id)
  );
  if (unearnedCandidates.length > 0) {
    candidates = unearnedCandidates;
  }

  if (candidates.length === 0) return null;

  // Weight selection: rarer items less likely
  const rarityWeights: Record<FoodRarity, number> = {
    COMMON: 40,
    UNCOMMON: 30,
    RARE: 20,
    EPIC: 8,
    LEGENDARY: 2,
  };

  const weighted: FoodReward[] = [];
  for (const food of candidates) {
    const weight = rarityWeights[food.rarity];
    for (let i = 0; i < weight; i++) {
      weighted.push(food);
    }
  }

  if (weighted.length === 0) return candidates[0] ?? null;

  const randomIndex = Math.floor(Math.random() * weighted.length);
  return weighted[randomIndex] ?? null;
}
