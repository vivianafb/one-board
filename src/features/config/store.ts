import { create } from "zustand";

interface ConfigState {
  selectedMonth: string; // Formato "2026-02"
  actions: {
    setMonth: (month: string) => void;
    nextMonth: () => void;
    prevMonth: () => void;
  };
}

export const useConfigStore = create<ConfigState>((set) => ({
  selectedMonth: new Date().toISOString().substring(0, 7), 
  actions: {
    setMonth: (month) => set({ selectedMonth: month }),
    nextMonth: () => set((state) => {
      const [year, month] = state.selectedMonth.split("-").map(Number);
      const date = new Date(year, month, 1); // El constructor de Date maneja el cambio de año solo
      return { selectedMonth: date.toISOString().substring(0, 7) };
    }),
    prevMonth: () => set((state) => {
      const [year, month] = state.selectedMonth.split("-").map(Number);
      const date = new Date(year, month - 2, 1);
      return { selectedMonth: date.toISOString().substring(0, 7) };
    }),
  },
}));