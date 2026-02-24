import { cn } from "@/lib/utils";

interface LevelBadgeProps {
  level: number;
  className?: string;
}

const levelTitles: Record<number, string> = {
  1: "Novice Cook",
  2: "Apprentice Chef",
  3: "Line Cook",
  4: "Sous Chef",
  5: "Head Chef",
  6: "Pastry Chef",
  7: "Executive Chef",
  8: "Master Chef",
  9: "Culinary Artist",
  10: "Grand Master",
};

const levelColors: Record<number, string> = {
  1: "bg-gray-700 text-gray-200",
  2: "bg-green-900 text-green-200",
  3: "bg-blue-900 text-blue-200",
  4: "bg-purple-900 text-purple-200",
  5: "bg-yellow-900 text-yellow-200",
  6: "bg-orange-900 text-orange-200",
  7: "bg-red-900 text-red-200",
  8: "bg-pink-900 text-pink-200",
  9: "bg-indigo-900 text-indigo-200",
  10: "bg-amber-900 text-amber-200",
};

export function LevelBadge({ level, className }: LevelBadgeProps) {
  const clampedLevel = Math.min(10, Math.max(1, level));
  const title = levelTitles[clampedLevel] ?? "Novice Cook";
  const colorClass = levelColors[clampedLevel] ?? "bg-gray-700 text-gray-200";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        colorClass,
        className
      )}
      aria-label={`Level ${clampedLevel}: ${title}`}
    >
      <span aria-hidden="true">⭐</span>
      <span>Lv.{clampedLevel}</span>
      <span className="opacity-75">{title}</span>
    </div>
  );
}
