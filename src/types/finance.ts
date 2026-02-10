export type TransactionType = "income" | "expense";

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
}

export interface Investment {
    id: string;
    name: string;
    amountCLP: number;
    createdAt: string;
}

