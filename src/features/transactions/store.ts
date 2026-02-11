import { create, type StateCreator } from "zustand";
import { Transaction } from "@/types/finance";
import transactions from "@/mocks/transactions";
import { persist } from "zustand/middleware";

export type TransactionsActions = {
    add: (transaction: Transaction) => void;
    update: (id: string, patch: Partial<Transaction>) => void;
    delete: (id: string) => void;
};
export type TransactionsStore = {
    items: Transaction[];
    actions: TransactionsActions; // Ahora sí existe 'actions'
};

type TransactionsStoreCreator = StateCreator<TransactionsStore>;

const transactionsStoreCreator: TransactionsStoreCreator = (set) => ({
    items: transactions,
    actions: {
        add: (transaction) => 
            set((state) => ({ items: [...state.items, transaction] })),
        
        update: (id, patch) => 
            set((state) => ({ 
                items: state.items.map((t) => t.id === id ? { ...t, ...patch } : t) 
            })),
            
        delete: (id) => 
            set((state) => ({ 
                items: state.items.filter((t) => t.id !== id) 
            })),
    },
});

export const useTransactionsStore = create<TransactionsStore>()(
    persist(transactionsStoreCreator, {
        name: "transactions-store",
        partialize: (state) => ({ items: state.items }),
    })
);