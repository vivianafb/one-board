import type { Currency } from "@/lib/types";

export type { Currency } from "@/lib/types";

export type InvestmentType = "ETF" | "CASH_INTEREST" | "CRYPTO" | "STOCK";

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
