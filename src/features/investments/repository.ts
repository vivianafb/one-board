import type { Investment } from "./types";

export interface InvestmentRepository {
  getAll(): Promise<Investment[]>;
}
