import type { Currency } from "@/lib/types";

export type SavingGoalCategory = "EMERGENCY_FUND" | "TRAVEL" | "HOME" | "RETIREMENT" | "OTHER";

export interface SavingGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  currency: Currency;
  category: SavingGoalCategory;
  deadline?: string;
  createdAt: string;
}

export interface MonthlySaving {
  id: string;
  monthId: string;
  amount: number;
  currency: Currency;
  createdAt: string;
  goalId?: string;
}

export interface SavingsState {
  goals: SavingGoal[];
  monthlyHistory: MonthlySaving[];
}
