import { create } from "zustand";

interface UserStats {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  githubUsername: string | null;
  currentStreak: number;
  longestStreak: number;
  totalCaloriesEarned: number;
  currentLevel: number;
  xpPoints: number;
}

interface UserStore {
  user: UserStats | null;
  isLoading: boolean;
  setUser: (user: UserStats | null) => void;
  setLoading: (loading: boolean) => void;
  updateCalories: (additionalCalories: number) => void;
  updateStreak: (streak: number) => void;
  updateXP: (additionalXP: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  updateCalories: (additionalCalories) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            totalCaloriesEarned:
              state.user.totalCaloriesEarned + additionalCalories,
          }
        : null,
    })),
  updateStreak: (streak) =>
    set((state) => ({
      user: state.user ? { ...state.user, currentStreak: streak } : null,
    })),
  updateXP: (additionalXP) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, xpPoints: state.user.xpPoints + additionalXP }
        : null,
    })),
}));
