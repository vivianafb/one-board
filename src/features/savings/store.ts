import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { SavingGoal, MonthlySaving, SavingsState } from "@/types/finance";
import savings from "@/mocks/savings";

type SavingsActions = {
  addGoal: (goal: SavingGoal) => void;
  updateGoal: (id: string, patch: Partial<SavingGoal>) => void;
  deleteGoal: (id: string) => void;
  addMonthlySaving: (saving: MonthlySaving) => void;
  addDeposit: (goalId: string, amount: number, monthId: string) => void;
};

export type SavingsStore = SavingsState & {
  actions: SavingsActions;
};

const savingsStoreCreator: StateCreator<SavingsStore> = (set) => ({
  goals: savings,
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
    addDeposit: (goalId: string, amount: number, monthId: string) =>
    set((state) => ({
      // 1. Actualizamos el monto actual de la meta
      goals: state.goals.map((g) =>
        g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g
      ),
      // 2. Registramos el movimiento en el historial
      monthlyHistory: [
        ...state.monthlyHistory,
        {
          id: crypto.randomUUID(),
          goalId,
          amount,
          monthId, // Ej: "2026-01"
          currency: state.goals.find(g => g.id === goalId)?.currency || "CLP",
          createdAt: new Date().toISOString(),
        },
      ],
    })),
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