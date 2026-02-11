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
export type ExpenseCategory = "fixed" | "variable";
export type PaymentMethod = "credit_card" | "debit_card" | "bank_transfer" | "cash";

export interface Transaction {
  id: string;
  amountCLP: number;
  description: string;
  type: TransactionType;
  createdAt: string;
  paymentMethod: PaymentMethod;
  expenseCategory?: ExpenseCategory; // Podríamos usar la Unión Discriminada que vimos antes
}

export interface SavingRecord {
    id: string;
    month: YearMonth;
    targetAmount: number;
    currentAmount: number;
    isCompleted: boolean;
  }