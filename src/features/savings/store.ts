import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { SavingGoal, MonthlySaving, SavingsState } from "@/types/finance";

type SavingsActions = {
  addGoal: (goal: SavingGoal) => void;
  updateGoal: (id: string, patch: Partial<SavingGoal>) => void;
  deleteGoal: (id: string) => void;
  addMonthlySaving: (saving: MonthlySaving) => void;
};

type SavingsStore = SavingsState & {
  actions: SavingsActions;
};

const savingsStoreCreator: StateCreator<SavingsStore> = (set) => ({
  goals: [],
  monthlyHistory: [],
  actions: {
    addGoal: (goal) =>
      set((state) => ({ goals: [...state.goals, goal] })),
    
    updateGoal: (id, patch) =>
      set((state) => ({
        goals: state.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)),
      })),
      
    deleteGoal: (id) =>
      set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
      
    addMonthlySaving: (saving) =>
      set((state) => ({ monthlyHistory: [...state.monthlyHistory, saving] })),
  },
});

export const useSavingsStore = create<SavingsStore>()(
  persist(savingsStoreCreator, {
    name: "savings-store",
    // Persistimos tanto las metas como el historial mensual
    partialize: (state) => ({ 
      goals: state.goals, 
      monthlyHistory: state.monthlyHistory 
    }),
  })
);