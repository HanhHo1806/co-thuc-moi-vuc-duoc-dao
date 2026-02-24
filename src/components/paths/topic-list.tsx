import { Badge } from "@/components/ui/badge";
import type { Topic } from "@prisma/client";

interface TopicListProps {
  topics: Topic[];
  completedTopicIds?: string[];
}

const DIFFICULTY_LABELS = ["", "Beginner", "Easy", "Medium", "Hard", "Expert"];

export function TopicList({
  topics,
  completedTopicIds = [],
}: TopicListProps) {
  // Group by week
  const byWeek = topics.reduce(
    (acc, topic) => {
      const week = topic.weekNumber;
      acc[week] = acc[week] ?? [];
      acc[week].push(topic);
      return acc;
    },
    {} as Record<number, Topic[]>
  );

  const weeks = Object.keys(byWeek)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-6" role="list" aria-label="Topic list">
      {weeks.map((week) => (
        <div key={week} role="listitem">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Week {week}
          </h4>
          <div className="space-y-2">
            {(byWeek[week] ?? [])
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map((topic) => {
                const isCompleted = completedTopicIds.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    className={`flex items-center gap-3 rounded-lg p-3 border ${
                      isCompleted
                        ? "bg-green-950/30 border-green-900/50"
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    <span
                      className="text-lg"
                      aria-hidden="true"
                    >
                      {isCompleted ? "✅" : "📚"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {topic.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {topic.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {DIFFICULTY_LABELS[topic.difficulty] ?? "Unknown"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {topic.estimatedHours}h
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
