import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { SavingGoal, MonthlySaving, SavingsState } from "./types";

export type SavingsStatus = "idle" | "loading" | "error";

type SavingsActions = {
  setGoals: (goals: SavingGoal[]) => void;
  setStatus: (status: SavingsStatus) => void;
  setError: (error: string | null) => void;
  addGoal: (goal: SavingGoal) => void;
  updateGoal: (id: string, patch: Partial<SavingGoal>) => void;
  deleteGoal: (id: string) => void;
  addMonthlySaving: (saving: MonthlySaving) => void;
  addDeposit: (goalId: string, amount: number, monthId: string) => void;
};

export type SavingsStore = SavingsState & {
  status: SavingsStatus;
  error: string | null;
  actions: SavingsActions;
};

const savingsStoreCreator: StateCreator<SavingsStore> = (set) => ({
  goals: [],
  monthlyHistory: [],
  status: "idle",
  error: null,
  actions: {
    setGoals: (goals) => set({ goals }),
    setStatus: (status) => set({ status }),
    setError: (error) => set({ error }),
    addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
    updateGoal: (id, patch) =>
      set((state) => ({
        goals: state.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)),
      })),
    deleteGoal: (id) =>
      set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
    addMonthlySaving: (saving) =>
      set((state) => ({ monthlyHistory: [...state.monthlyHistory, saving] })),
    addDeposit: (goalId, amount, monthId) =>
      set((state) => ({
        goals: state.goals.map((g) =>
          g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g
        ),
        monthlyHistory: [
          ...state.monthlyHistory,
          {
            id: crypto.randomUUID(),
            goalId,
            amount,
            monthId,
            currency: state.goals.find((g) => g.id === goalId)?.currency ?? "CLP",
            createdAt: new Date().toISOString(),
          },
        ],
      })),
  },
});

export const useSavingsStore = create<SavingsStore>()(
  persist(savingsStoreCreator, {
    name: "savings-store",
    partialize: (state) => ({
      goals: state.goals,
      monthlyHistory: state.monthlyHistory,
    }),
  })
);
