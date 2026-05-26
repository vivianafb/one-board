import { httpGet } from "@/lib/http";
import type { Transaction } from "./types";
import type { TransactionRepository } from "./repository";

export class HttpTransactionRepository implements TransactionRepository {
  private readonly endpoint: string;

  constructor(endpoint = "/api/transactions") {
    this.endpoint = endpoint;
  }

  getAll(): Promise<Transaction[]> {
    return httpGet<Transaction[]>(this.endpoint);
  }
}
