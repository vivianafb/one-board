import { create, type StateCreator } from "zustand";
import { Transaction } from "@/types/finance";
import transactions from "@/mocks/transactions";
import { persist } from "zustand/middleware";

type TransactionsStore = {
    items: Transaction[];
    add: (transaction: Transaction) => void;
    update: (id: string, patch: Partial<Transaction>) => void;
    delete: (id: string) => void;
};

type TransactionsStoreCreator = StateCreator<TransactionsStore>;

const transactionsStoreCreator: TransactionsStoreCreator = (set) => ({
    items: transactions,
    add: (transaction: Transaction) => set((state) => ({ items: [...state.items, transaction] })),
    update: (id: string, patch: Partial<Transaction>) => set((state) => ({ items: state.items.map((t) => t.id === id ? { ...t, ...patch } : t) })),
    delete: (id: string) => set((state) => ({ items: state.items.filter((t) => t.id !== id) })),
});

export const useTransactionsStore = create<TransactionsStore>()(
    persist(transactionsStoreCreator, {
        name: "transactions-store",
        partialize: (state) => ({ items: state.items }),
    })
);