import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { Investment } from "./types";

export type InvestmentStatus = "idle" | "loading" | "error";

export type InvestmentActions = {
  setItems: (items: Investment[]) => void;
  setStatus: (status: InvestmentStatus) => void;
  setError: (error: string | null) => void;
  add: (investment: Investment) => void;
  update: (id: string, patch: Partial<Investment>) => void;
  delete: (id: string) => void;
};

export type InvestmentStore = {
  items: Investment[];
  status: InvestmentStatus;
  error: string | null;
  actions: InvestmentActions;
};

export const INVESTMENT_STORE_STORAGE_KEY = "investment-store";

const investmentStoreCreator: StateCreator<InvestmentStore> = (set) => ({
  items: [],
  status: "idle",
  error: null,
  actions: {
    setItems: (items) => set({ items }),
    setStatus: (status) => set({ status }),
    setError: (error) => set({ error }),
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
