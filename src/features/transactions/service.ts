import type { TransactionRepository } from "./repository";
import { useTransactionsStore } from "./store";

export function createTransactionService(repo: TransactionRepository) {
  return {
    async load(): Promise<void> {
      const { items, actions } = useTransactionsStore.getState();
      if (items.length > 0) return;
      actions.setStatus("loading");
      try {
        const data = await repo.getAll();
        actions.setItems(data);
        actions.setStatus("idle");
      } catch (e) {
        actions.setError(e instanceof Error ? e.message : "Failed to load transactions");
        actions.setStatus("error");
      }
    },
  };
}
