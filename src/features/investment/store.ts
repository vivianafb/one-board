import { create, type StateCreator } from "zustand";
import { Investment } from "@/types/finance";
import investments from "@/mocks/investments";
import { persist } from "zustand/middleware";


export type InvestmentActions = {
  add: (investment: Investment) => void;
  update: (id: string, patch: Partial<Investment>) => void;
  delete: (id: string) => void;
  setSelectedPeriodId: (periodId: string | null) => void;
};

export type InvestmentStore = {
  items: Investment[];
  selectedPeriodId: string | null;
  actions: InvestmentActions; // Agrupamos las acciones
};

const investmentStoreCreator: StateCreator<InvestmentStore> = (set) => ({
  items: investments,
  selectedPeriodId: null,
  actions: {
    add: (investment) =>
      set((state) => ({ items: [...state.items, investment] })),
    update: (id, patch) =>
      set((state) => ({
        items: state.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
      })),
    delete: (id) =>
      set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    setSelectedPeriodId: (periodId) => set({ selectedPeriodId: periodId }),
  },
});

export const useInvestmentStore = create<InvestmentStore>()(
  persist(investmentStoreCreator, {
    name: "investment-store",
    partialize: (state) => ({ items: state.items, selectedPeriodId: state.selectedPeriodId }),
  })
);
