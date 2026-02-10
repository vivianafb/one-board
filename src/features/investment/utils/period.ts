import type { Investment } from "@/features/transactions/types";

const TOTAL_LABEL = "Total hasta la fecha";

/**
 * Devuelve startValue, endValue y label.
 * periodId null = Total hasta la fecha (investedAmount → currentValue).
 * periodId "YYYY-MM" = ese mes (desde periods[]).
 */
export function getPeriodValues(
  item: Investment,
  periodId: string | null
): { startValue: number; endValue: number; periodLabel: string } | null {
  if (periodId == null) {
    return {
      startValue: item.investedAmount,
      endValue: item.currentValue,
      periodLabel: TOTAL_LABEL,
    };
  }

  const periods = item.periods ?? [];
  const entry = periods.find((p) => p.periodId === periodId);
  if (!entry) return null;

  return {
    startValue: entry.startValue,
    endValue: entry.endValue,
    periodLabel: entry.label,
  };
}
