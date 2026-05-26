import type { Transaction } from "./types";

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
}
