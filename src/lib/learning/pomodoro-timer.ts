export const POMODORO_CONFIG = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  pomodorosUntilLongBreak: 4,
};

export type PomodoroPhase = "work" | "shortBreak" | "longBreak";

export interface PomodoroState {
  phase: PomodoroPhase;
  timeRemainingSeconds: number;
  completedPomodoros: number;
  isRunning: boolean;
  sessionStartedAt: Date | null;
  totalWorkSeconds: number;
}

export function getInitialPomodoroState(): PomodoroState {
  return {
    phase: "work",
    timeRemainingSeconds: POMODORO_CONFIG.workMinutes * 60,
    completedPomodoros: 0,
    isRunning: false,
    sessionStartedAt: null,
    totalWorkSeconds: 0,
  };
}

export function getPhaseDuration(phase: PomodoroPhase): number {
  switch (phase) {
    case "work":
      return POMODORO_CONFIG.workMinutes * 60;
    case "shortBreak":
      return POMODORO_CONFIG.shortBreakMinutes * 60;
    case "longBreak":
      return POMODORO_CONFIG.longBreakMinutes * 60;
  }
}

export function getNextPhase(
  currentPhase: PomodoroPhase,
  completedPomodoros: number
): PomodoroPhase {
  if (currentPhase === "work") {
    const nextCount = completedPomodoros + 1;
    if (nextCount % POMODORO_CONFIG.pomodorosUntilLongBreak === 0) {
      return "longBreak";
    }
    return "shortBreak";
  }
  return "work";
}

export function tickPomodoro(state: PomodoroState): {
  newState: PomodoroState;
  phaseCompleted: boolean;
  pomodoroCompleted: boolean;
} {
  if (!state.isRunning) {
    return { newState: state, phaseCompleted: false, pomodoroCompleted: false };
  }

  const newTimeRemaining = state.timeRemainingSeconds - 1;

  if (newTimeRemaining > 0) {
    const addWorkSecond = state.phase === "work" ? 1 : 0;
    return {
      newState: {
        ...state,
        timeRemainingSeconds: newTimeRemaining,
        totalWorkSeconds: state.totalWorkSeconds + addWorkSecond,
      },
      phaseCompleted: false,
      pomodoroCompleted: false,
    };
  }

  // Phase completed
  const pomodoroCompleted = state.phase === "work";
  const newCompletedPomodoros = pomodoroCompleted
    ? state.completedPomodoros + 1
    : state.completedPomodoros;

  const nextPhase = getNextPhase(state.phase, state.completedPomodoros);
  const addWorkSecond = state.phase === "work" ? 1 : 0;

  return {
    newState: {
      ...state,
      phase: nextPhase,
      timeRemainingSeconds: getPhaseDuration(nextPhase),
      completedPomodoros: newCompletedPomodoros,
      isRunning: false, // Auto-pause between phases
      totalWorkSeconds: state.totalWorkSeconds + addWorkSecond,
    },
    phaseCompleted: true,
    pomodoroCompleted,
  };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
