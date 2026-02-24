"use client";

import { useStudyStore } from "@/stores/study-store";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalorieCounter } from "@/components/gamification/calorie-counter";
import { calculateCalories } from "@/lib/gamification/calorie-engine";
import type { SessionType } from "@prisma/client";

const SESSION_TYPES = [
  { value: "STUDY", label: "📚 Study" },
  { value: "LAB", label: "🔬 Lab" },
  { value: "QUIZ", label: "📝 Quiz" },
  { value: "FEYNMAN_WRITE", label: "✍️ Feynman Write" },
  { value: "DEBUG_CHALLENGE", label: "🐛 Debug Challenge" },
  { value: "TEACH", label: "🎓 Teach" },
  { value: "REVIEW", label: "🔄 Review (SRS)" },
];

interface SessionFormProps {
  currentStreak: number;
  previewMinutes?: number;
}

export function SessionForm({
  currentStreak,
  previewMinutes = 25,
}: SessionFormProps) {
  const {
    activeSessionType,
    setActiveSessionType,
    sessionNotes,
    setSessionNotes,
  } = useStudyStore();

  const previewCalories = calculateCalories(
    activeSessionType as SessionType,
    previewMinutes,
    currentStreak
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="session-type">Session Type</Label>
        <Select value={activeSessionType} onValueChange={setActiveSessionType}>
          <SelectTrigger id="session-type" aria-label="Select session type">
            <SelectValue placeholder="Select session type" />
          </SelectTrigger>
          <SelectContent>
            {SESSION_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="session-notes">Notes (optional)</Label>
        <Textarea
          id="session-notes"
          placeholder="What are you studying today?"
          value={sessionNotes}
          onChange={(e) => setSessionNotes(e.target.value)}
          rows={3}
          aria-label="Session notes"
        />
      </div>

      <div className="rounded-lg bg-muted/50 p-4 text-center">
        <p className="text-xs text-muted-foreground mb-2">
          You&apos;ll earn approximately:
        </p>
        <CalorieCounter calories={previewCalories.totalCalories} size="lg" />
        {previewCalories.streakBonus && (
          <p className="text-xs text-orange-400 mt-1">
            🔥 {previewCalories.multiplier}x streak bonus applied!
          </p>
        )}
      </div>
    </div>
  );
}
