// Backward-compatibility barrel — feature code should import from feature types directly.
// Cross-cutting primitives live in @/lib/types.
export type { Currency, YearMonth } from "@/lib/types";
export type { Investment, InvestmentType, InvestmentPeriod } from "@/features/investments/types";
export type {
  Transaction,
  TransactionType,
  TransactionInstallment,
  ExpenseType,
  PaymentMethod,
  ExpenseCategory,
} from "@/features/transactions/types";
export type {
  SavingGoal,
  MonthlySaving,
  SavingsState,
  SavingGoalCategory,
} from "@/features/savings/types";
