"use client";

import { useEffect, useRef, useCallback } from "react";
import { useStudyStore } from "@/stores/study-store";
import {
  tickPomodoro,
  getInitialPomodoroState,
} from "@/lib/learning/pomodoro-timer";

export function usePomodoro() {
  const {
    pomodoroState,
    setPomodoroState,
    resetPomodoro,
    triggerFoodAnimation,
  } = useStudyStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setPomodoroState({
      ...pomodoroState,
      isRunning: true,
      sessionStartedAt: pomodoroState.sessionStartedAt ?? new Date(),
    });
  }, [pomodoroState, setPomodoroState]);

  const pause = useCallback(() => {
    setPomodoroState({ ...pomodoroState, isRunning: false });
  }, [pomodoroState, setPomodoroState]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    resetPomodoro();
  }, [resetPomodoro]);

  useEffect(() => {
    if (pomodoroState.isRunning) {
      intervalRef.current = setInterval(() => {
        const { newState, pomodoroCompleted } = tickPomodoro(
          useStudyStore.getState().pomodoroState
        );
        setPomodoroState(newState);

        if (pomodoroCompleted) {
          triggerFoodAnimation();
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pomodoroState.isRunning, setPomodoroState, triggerFoodAnimation]);

  const progress =
    1 -
    pomodoroState.timeRemainingSeconds /
      (pomodoroState.phase === "work"
        ? 25 * 60
        : pomodoroState.phase === "shortBreak"
          ? 5 * 60
          : 15 * 60);

  return {
    state: pomodoroState,
    start,
    pause,
    reset,
    progress,
    getInitialState: getInitialPomodoroState,
  };
}
