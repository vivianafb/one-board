import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { Investment } from "@/types/finance";
import { fetchInvestments } from "@/services/api";

export type InvestmentActions = {
  add: (investment: Investment) => void;
  update: (id: string, patch: Partial<Investment>) => void;
  delete: (id: string) => void;
  initialize: () => Promise<void>;
};

export type InvestmentStore = {
  items: Investment[];
  isLoading: boolean;
  actions: InvestmentActions;
};

export const INVESTMENT_STORE_STORAGE_KEY = "investment-store";

export const createInvestmentInitialData = () => ({ items: [] as Investment[], isLoading: false });

const investmentStoreCreator: StateCreator<InvestmentStore> = (set) => ({
  items: [],
  isLoading: false,
  actions: {
    initialize: async () => {
      set({ isLoading: true });
      try {
        const items = await fetchInvestments();
        set({ items });
      } finally {
        set({ isLoading: false });
      }
    },
    add: (investment) => set((state) => ({ items: [...state.items, investment] })),
    update: (id, patch) =>
      set((state) => ({
        items: state.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
      })),
    delete: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  },
});

export const useInvestmentStore = create<InvestmentStore>()(
  persist(investmentStoreCreator, {
    name: INVESTMENT_STORE_STORAGE_KEY,
    partialize: (state) => ({ items: state.items }),
  })
);
