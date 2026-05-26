import type { Investment } from "../types";

const USD_TO_CLP = 1000;

export type PortfolioPoint = {
  periodId: string;
  label: string;
  totalValue: number;
};

export function buildPortfolioTimeline(investments: Investment[]): PortfolioPoint[] {
  const periodLabels = new Map<string, string>();

  for (const inv of investments) {
    for (const p of inv.periods ?? []) {
      if (!periodLabels.has(p.periodId)) periodLabels.set(p.periodId, p.label);
    }
  }

  return Array.from(periodLabels.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([periodId, label]) => {
      const totalValue = investments.reduce((sum, inv) => {
        const period = inv.periods?.find((p) => p.periodId === periodId);
        if (!period) return sum;
        const value = inv.currency === "CLP" ? period.endValue : period.endValue * USD_TO_CLP;
        return sum + value;
      }, 0);
      return { periodId, label, totalValue };
    });
}
