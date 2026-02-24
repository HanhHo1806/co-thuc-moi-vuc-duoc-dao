import { formatCalories } from "@/lib/utils";

interface CalorieCounterProps {
  calories: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function CalorieCounter({
  calories,
  label = "Calories",
  size = "md",
}: CalorieCounterProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className="flex flex-col items-center" aria-live="polite">
      <span
        className={`font-bold text-yellow-400 ${sizeClasses[size]}`}
        aria-label={`${calories} ${label}`}
      >
        🔥 {formatCalories(calories)}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
