import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { StudySession } from "@prisma/client";

const SESSION_TYPE_LABELS: Record<string, string> = {
  STUDY: "📚 Study",
  LAB: "🔬 Lab",
  QUIZ: "📝 Quiz",
  FEYNMAN_WRITE: "✍️ Feynman Write",
  DEBUG_CHALLENGE: "🐛 Debug Challenge",
  TEACH: "🎓 Teach",
  REVIEW: "🔄 Review",
};

interface SessionHistoryProps {
  sessions: StudySession[];
}

export function SessionHistory({ sessions }: SessionHistoryProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No sessions yet. Start your first session above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3" role="list" aria-label="Session history">
      {sessions.map((session) => (
        <Card key={session.id} role="listitem">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="text-xl" aria-hidden="true">
                {SESSION_TYPE_LABELS[session.sessionType]?.split(" ")[0]}
              </span>
              <div>
                <p className="text-sm font-medium">
                  {SESSION_TYPE_LABELS[session.sessionType] ?? session.sessionType}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(session.startedAt)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary">
                {session.durationMinutes} min
              </Badge>
              {session.pomodorosCompleted > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  🍅 ×{session.pomodorosCompleted}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
