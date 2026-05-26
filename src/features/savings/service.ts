import type { SavingsRepository } from "./repository";
import { useSavingsStore } from "./store";

export function createSavingsService(repo: SavingsRepository) {
  return {
    async load(): Promise<void> {
      const { goals, actions } = useSavingsStore.getState();
      if (goals.length > 0) return;
      actions.setStatus("loading");
      try {
        const data = await repo.getAll();
        actions.setGoals(data);
        actions.setStatus("idle");
      } catch (e) {
        actions.setError(e instanceof Error ? e.message : "Failed to load savings");
        actions.setStatus("error");
      }
    },
  };
}
