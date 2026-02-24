import { create } from "zustand";
import type { PomodoroState } from "@/lib/learning/pomodoro-timer";
import { getInitialPomodoroState } from "@/lib/learning/pomodoro-timer";

interface StudyStore {
  // Pomodoro
  pomodoroState: PomodoroState;
  setPomodoroState: (state: PomodoroState) => void;
  resetPomodoro: () => void;

  // Active session
  activeSessionType: string;
  setActiveSessionType: (type: string) => void;
  activeTopicId: string | null;
  setActiveTopicId: (id: string | null) => void;
  sessionNotes: string;
  setSessionNotes: (notes: string) => void;

  // Calories earned this session
  sessionCalories: number;
  setSessionCalories: (cal: number) => void;

  // Animation trigger
  showFoodAnimation: boolean;
  triggerFoodAnimation: () => void;
  clearFoodAnimation: () => void;
  lastEarnedFood: { emoji: string; name: string } | null;
  setLastEarnedFood: (food: { emoji: string; name: string } | null) => void;
}

export const useStudyStore = create<StudyStore>((set) => ({
  pomodoroState: getInitialPomodoroState(),
  setPomodoroState: (state) => set({ pomodoroState: state }),
  resetPomodoro: () => set({ pomodoroState: getInitialPomodoroState() }),

  activeSessionType: "STUDY",
  setActiveSessionType: (type) => set({ activeSessionType: type }),
  activeTopicId: null,
  setActiveTopicId: (id) => set({ activeTopicId: id }),
  sessionNotes: "",
  setSessionNotes: (notes) => set({ sessionNotes: notes }),

  sessionCalories: 0,
  setSessionCalories: (cal) => set({ sessionCalories: cal }),

  showFoodAnimation: false,
  triggerFoodAnimation: () => set({ showFoodAnimation: true }),
  clearFoodAnimation: () => set({ showFoodAnimation: false }),
  lastEarnedFood: null,
  setLastEarnedFood: (food) => set({ lastEarnedFood: food }),
}));
