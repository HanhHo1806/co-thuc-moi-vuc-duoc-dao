"use client";

import { useState, useCallback } from "react";
import { useStudyStore } from "@/stores/study-store";
import { calculateCalories } from "@/lib/gamification/calorie-engine";
import type { SessionType } from "@prisma/client";

export function useStudySession(currentStreak: number) {
  const {
    activeSessionType,
    activeTopicId,
    sessionNotes,
    setSessionCalories,
    triggerFoodAnimation,
  } = useStudyStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculatePreviewCalories = useCallback(
    (durationMinutes: number) => {
      const result = calculateCalories(
        activeSessionType as SessionType,
        durationMinutes,
        currentStreak
      );
      setSessionCalories(result.totalCalories);
      return result;
    },
    [activeSessionType, currentStreak, setSessionCalories]
  );

  const submitSession = useCallback(
    async (durationMinutes: number, pomodorosCompleted: number) => {
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionType: activeSessionType,
            topicId: activeTopicId,
            durationMinutes,
            pomodorosCompleted,
            notes: sessionNotes,
            startedAt: new Date(
              Date.now() - durationMinutes * 60 * 1000
            ).toISOString(),
            endedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save session");
        }

        const data = (await response.json()) as {
          caloriesEarned: number;
          foodReward?: { emoji: string; name: string };
        };

        if (data.caloriesEarned > 0) {
          triggerFoodAnimation();
        }

        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An error occurred";
        setError(message);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [activeSessionType, activeTopicId, sessionNotes, triggerFoodAnimation]
  );

  return {
    isSubmitting,
    error,
    calculatePreviewCalories,
    submitSession,
  };
}
