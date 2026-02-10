export type InvestmentType = "ETF" | "CASH_INTEREST";

export interface InvestmentPeriod {
  periodId: string; // "YYYY-MM" 
  label: string; // "Febrero 2025"
  startValue: number;
  endValue: number;
}
export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  provider: string;
  currency: "CLP" | "USD";
  investedAmount: number;
  currentValue: number;
  createdAt: string;

  periods?: InvestmentPeriod[];
}
