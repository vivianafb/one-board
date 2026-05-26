import type { InvestmentRepository } from "./repository";
import { useInvestmentStore } from "./store";

export function createInvestmentService(repo: InvestmentRepository) {
  return {
    async load(): Promise<void> {
      const { items, actions } = useInvestmentStore.getState();
      if (items.length > 0) return;
      actions.setStatus("loading");
      try {
        const data = await repo.getAll();
        actions.setItems(data);
        actions.setStatus("idle");
      } catch (e) {
        actions.setError(e instanceof Error ? e.message : "Failed to load investments");
        actions.setStatus("error");
      }
    },
  };
}
