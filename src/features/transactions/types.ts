import type { ExpenseType, PaymentMethod, ExpenseCategory } from "@/lib/transaction-options";

export type { ExpenseType, PaymentMethod, ExpenseCategory } from "@/lib/transaction-options";

export type TransactionType = "income" | "expense";

export interface TransactionInstallment {
  groupId: string;
  itemName: string;
  current: number;
  total: number;
}

export interface Transaction {
  id: string;
  amountCLP: number;
  description: string;
  type: TransactionType;
  createdAt: string;
  paymentMethod: PaymentMethod;
  expenseType?: ExpenseType;
  expenseCategory?: ExpenseCategory;
  installment?: TransactionInstallment;
}
