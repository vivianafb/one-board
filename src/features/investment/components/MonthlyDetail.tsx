"use client";

import { useMemo } from "react";
import type { Investment } from "../types";
import { getPeriodValues } from "../utils/period";
import { getGainClass } from "../utils/ui";
import { formatAmountCLP, formatAmountUSD } from "@/lib/format";

function fmt(currency: "CLP" | "USD", value: number) {
  return currency === "CLP" ? formatAmountCLP(value) : formatAmountUSD(value);
}

type Props = {
  investments: Investment[];
  periodId: string;
};

export function MonthlyDetail({ investments, periodId }: Props) {
  const rows = useMemo(
    () =>
      investments.flatMap((inv) => {
        const p = getPeriodValues(inv, periodId);
        if (!p) return [];
        const gain = p.endValue - p.startValue;
        const percent = p.startValue > 0 ? (gain / p.startValue) * 100 : 0;
        return [{ inv, label: p.periodLabel, startValue: p.startValue, endValue: p.endValue, gain, percent }];
      }),
    [investments, periodId]
  );

  if (rows.length === 0) {
    return (
      <div className="ob-card-glass p-5 text-center text-muted-foreground text-sm">
        Sin datos para el mes seleccionado.
      </div>
    );
  }

  const periodLabel = rows[0].label;

  return (
    <div className="ob-card-glass overflow-x-auto">
      <div className="px-4 pt-4 pb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Detalle — {periodLabel}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3 text-right">Inicio mes</th>
            <th className="px-4 py-3 text-right">Fin mes</th>
            <th className="px-4 py-3 text-right">Ganancia $</th>
            <th className="px-4 py-3 text-right">Ganancia %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ inv, startValue, endValue, gain, percent }) => (
            <tr
              key={inv.id}
              className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3 font-medium">{inv.name}</td>
              <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                {fmt(inv.currency, startValue)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                {fmt(inv.currency, endValue)}
              </td>
              <td className={`px-4 py-3 text-right tabular-nums font-medium ${getGainClass(gain)}`}>
                {gain >= 0 ? "+" : ""}
                {fmt(inv.currency, gain)}
              </td>
              <td className={`px-4 py-3 text-right tabular-nums font-medium ${getGainClass(percent)}`}>
                {percent >= 0 ? "+" : ""}
                {percent.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
