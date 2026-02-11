import type { ExpenseType, PaymentMethod, ExpenseCategory } from "@/lib/transaction-options";

// --- Utilidades Globales ---
export type Currency = "CLP" | "USD";
export type YearMonth = `${number}-${number}`; // Tipado fuerte para fechas YYYY-MM

// --- Inversiones ---
export type InvestmentType = "ETF" | "CASH_INTEREST";

export interface InvestmentPeriod {
  periodId: string; 
  label: string; 
  startValue: number;
  endValue: number;
}

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  provider: string;
  currency: Currency;
  investedAmount: number;
  currentValue: number;
  createdAt: string;
  periods?: InvestmentPeriod[];
}

// --- Transacciones ---
export type TransactionType = "income" | "expense";
export type { ExpenseType, PaymentMethod, ExpenseCategory } from "@/lib/transaction-options";
export interface Transaction {
  id: string;
  amountCLP: number;
  description: string;
  type: TransactionType;
  createdAt: string;
  paymentMethod: PaymentMethod;
  expenseType?: ExpenseType; 
  expenseCategory?: ExpenseCategory;
}

export type SavingGoalCategory = 'EMERGENCY_FUND' | 'TRAVEL' | 'HOME' | 'RETIREMENT' | 'OTHER' ;

export interface SavingGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  currency: 'CLP' | 'USD';
  category: SavingGoalCategory;
  deadline?: string; // ISO Date
  createdAt: string;
}

export interface MonthlySaving {
  id: string;
  monthId: string; // Formato "YYYY-MM" para vincular con filtros
  amount: number;
  currency: 'CLP' | 'USD';
  createdAt: string;
  // Opcional: Vincularlo a una meta específica
  goalId?: string; 
}

export interface SavingsState {
  goals: SavingGoal[];
  monthlyHistory: MonthlySaving[];
  // El "Total Ahorrado" suele ser un selector derivado, no un estado
}