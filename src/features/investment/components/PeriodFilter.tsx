"use client";

import { useInvestmentsStore } from "../store";
import { useAvailablePeriods } from "../hooks/useAvailablePeriods";

/**
 * Filtro: Total hasta la fecha o un mes concreto (ganancia de ese periodo).
 */
export default function PeriodFilter() {
  const periods = useAvailablePeriods();
  const selectedPeriodId = useInvestmentsStore((s) => s.selectedPeriodId);
  const setSelectedPeriodId = useInvestmentsStore((s) => s.setSelectedPeriodId);

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
        {periods.map((p) => (
          <option key={p.periodId} value={p.periodId}>
            {p.periodLabel}
            {p.isCurrent ? " (mes actual)" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
