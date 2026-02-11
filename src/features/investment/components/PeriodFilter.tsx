"use client";

import { useMemo } from "react";
import { useInvestmentStore } from "../store";
import {
  selectItems,
  selectSelectedPeriodId,
  selectSetSelectedPeriodId,
  getMonthsFromItems,
} from "../selectors";

/**
 * Filtro unificado: Total hasta la fecha o un mes concreto.
 * Controla tanto la lista filtrada como el cálculo de ganancias (selectedPeriodId en store).
 */
export default function PeriodFilter() {
  const items = useInvestmentStore(selectItems);
  const selectedPeriodId = useInvestmentStore(selectSelectedPeriodId);
  const setSelectedPeriodId = useInvestmentStore(selectSetSelectedPeriodId);
  const months = useMemo(() => getMonthsFromItems(items), [items]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor="period-filter" className="ob-text-muted text-sm">
        Ver:
      </label>
      <select
        id="period-filter"
        value={selectedPeriodId ?? ""}
        onChange={(e) =>
          setSelectedPeriodId(e.target.value ? e.target.value : null)
        }
        className="ob-input w-auto min-w-[180px] py-1.5 text-sm"
        aria-label="Ver total o por mes"
      >
        <option value="">Total hasta la fecha</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}
