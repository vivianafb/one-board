import { httpGet } from "@/lib/http";
import type { Investment } from "./types";
import type { InvestmentRepository } from "./repository";

export class HttpInvestmentRepository implements InvestmentRepository {
  private readonly endpoint: string;

  constructor(endpoint = "/api/investments") {
    this.endpoint = endpoint;
  }

  getAll(): Promise<Investment[]> {
    return httpGet<Investment[]>(this.endpoint);
  }
}
