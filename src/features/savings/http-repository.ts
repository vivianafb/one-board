import { httpGet } from "@/lib/http";
import type { SavingGoal } from "./types";
import type { SavingsRepository } from "./repository";

export class HttpSavingsRepository implements SavingsRepository {
  private readonly endpoint: string;

  constructor(endpoint = "/api/savings") {
    this.endpoint = endpoint;
  }

  getAll(): Promise<SavingGoal[]> {
    return httpGet<SavingGoal[]>(this.endpoint);
  }
}
