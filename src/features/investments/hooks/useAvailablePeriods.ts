import { useMemo } from "react";
import { useInvestmentStore } from "../store";

export type PeriodOption = {
  periodId: string;
  periodLabel: string;
  isCurrent: boolean;
};

/**
 * Lista de periodos para el filtro: de todos los items, únicos, ordenados reciente → antiguo.
 * periods[0] de cualquier item = periodo actual (isCurrent).
 */
export function useAvailablePeriods(): PeriodOption[] {
  const items = useInvestmentStore((s) => s.items);

  return useMemo(() => {
    const byId = new Map<string, string>();

    for (const item of items) {
      for (const p of item.periods ?? []) {
        if (!byId.has(p.periodId)) byId.set(p.periodId, p.label);
      }
    }

    const list = Array.from(byId.entries())
      .map(([periodId, periodLabel]) => ({ periodId, periodLabel }))
      .sort((a, b) => b.periodId.localeCompare(a.periodId));

    return list.map((p, i) => ({
      ...p,
      isCurrent: i === 0,
    }));
  }, [items]);
}
