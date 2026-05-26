import type { SavingGoal } from "./types";

export interface SavingsRepository {
  getAll(): Promise<SavingGoal[]>;
}
