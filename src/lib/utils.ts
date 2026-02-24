import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCalories(cal: number): string {
  return cal.toLocaleString();
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getLevelFromXP(xp: number): number {
  // Level thresholds: 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000
  const thresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000];
  let level = 1;
  for (let i = 1; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) {
      level = i + 1;
    }
  }
  return level;
}

export function getXPForNextLevel(currentLevel: number): number {
  const thresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000];
  if (currentLevel >= thresholds.length) return thresholds[thresholds.length - 1];
  return thresholds[currentLevel] ?? thresholds[thresholds.length - 1];
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case "COMMON":
      return "text-gray-400";
    case "UNCOMMON":
      return "text-green-400";
    case "RARE":
      return "text-blue-400";
    case "EPIC":
      return "text-purple-400";
    case "LEGENDARY":
      return "text-yellow-400";
    default:
      return "text-gray-400";
  }
}

export function getRarityBgColor(rarity: string): string {
  switch (rarity) {
    case "COMMON":
      return "bg-gray-700";
    case "UNCOMMON":
      return "bg-green-900";
    case "RARE":
      return "bg-blue-900";
    case "EPIC":
      return "bg-purple-900";
    case "LEGENDARY":
      return "bg-yellow-900";
    default:
      return "bg-gray-700";
  }
}
