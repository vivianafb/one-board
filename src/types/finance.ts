export type TransactionType = "income" | "expense";

/** Solo para gastos (expenses): fijo o variable */
export type ExpenseCategory = "fixed" | "variable";

export type PaymentMethod =
    | "credit_card"
    | "debit_card"
    | "bank_transfer"
    | "cash";


export interface Transaction {
    id: string;
    amountCLP: number;
    description: string;
    type: TransactionType;
    createdAt: string;
    paymentMethod: PaymentMethod;
    /** Solo para type === "expense" */
    expenseCategory?: ExpenseCategory;
}

export interface Investment {
    id: string;
    name: string;
    amountCLP: number;
    createdAt: string;
}

