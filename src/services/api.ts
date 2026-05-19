import { Investment, Transaction, SavingGoal } from "@/types/finance";

async function get<T>(endpoint: string): Promise<T> {
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`GET ${endpoint} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const fetchInvestments = () => get<Investment[]>("/api/investments");
export const fetchTransactions = () => get<Transaction[]>("/api/transactions");
export const fetchSavings = () => get<SavingGoal[]>("/api/savings");
