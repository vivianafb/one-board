import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { Transaction } from "./types";

export type TransactionStatus = "idle" | "loading" | "error";

export type TransactionsActions = {
  setItems: (items: Transaction[]) => void;
  setStatus: (status: TransactionStatus) => void;
  setError: (error: string | null) => void;
  add: (transaction: Transaction) => void;
  addMany: (transactions: Transaction[]) => void;
  update: (id: string, patch: Partial<Transaction>) => void;
  delete: (id: string) => void;
};

export type TransactionsStore = {
  items: Transaction[];
  status: TransactionStatus;
  error: string | null;
  actions: TransactionsActions;
};

type TransactionsStoreCreator = StateCreator<TransactionsStore>;

const transactionsStoreCreator: TransactionsStoreCreator = (set) => ({
  items: [],
  status: "idle",
  error: null,
  actions: {
    setItems: (items) => set({ items }),
    setStatus: (status) => set({ status }),
    setError: (error) => set({ error }),
    add: (transaction) => set((state) => ({ items: [...state.items, transaction] })),
    addMany: (transactions) =>
      set((state) => ({ items: [...state.items, ...transactions] })),
    update: (id, patch) =>
      set((state) => ({
        items: state.items.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      })),
    delete: (id) =>
      set((state) => ({ items: state.items.filter((t) => t.id !== id) })),
  },
});

export const useTransactionsStore = create<TransactionsStore>()(
  persist(transactionsStoreCreator, {
    name: "transactions-store",
    partialize: (state) => ({ items: state.items }),
  })
);
