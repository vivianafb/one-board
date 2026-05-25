import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction } from "@/types/finance";
import { fetchTransactions } from "@/services/api";

export type TransactionsActions = {
  add: (transaction: Transaction) => void;
  addMany: (transactions: Transaction[]) => void;
  update: (id: string, patch: Partial<Transaction>) => void;
  delete: (id: string) => void;
  initialize: () => Promise<void>;
};

export type TransactionsStore = {
  items: Transaction[];
  isLoading: boolean;
  actions: TransactionsActions;
};

type TransactionsStoreCreator = StateCreator<TransactionsStore>;

const transactionsStoreCreator: TransactionsStoreCreator = (set) => ({
  items: [],
  isLoading: false,
  actions: {
    initialize: async () => {
      set({ isLoading: true });
      try {
        const items = await fetchTransactions();
        set((state) => ({ items: state.items.length === 0 ? items : state.items }));
      } finally {
        set({ isLoading: false });
      }
    },
    add: (transaction) =>
      set((state) => ({ items: [...state.items, transaction] })),
    addMany: (transactions) =>
      set((state) => ({ items: [...state.items, ...transactions] })),
    update: (id, patch) =>
      set((state) => ({
        items: state.items.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      })),
    delete: (id) =>
      set((state) => ({
        items: state.items.filter((t) => t.id !== id),
      })),
  },
});

export const useTransactionsStore = create<TransactionsStore>()(
  persist(transactionsStoreCreator, {
    name: "transactions-store",
    partialize: (state) => ({ items: state.items }),
  })
);
