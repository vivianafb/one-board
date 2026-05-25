"use client";

import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Investment } from "../types";
import { calculateInvestmentPerformance } from "../utils/performance";
import { getGainClass } from "../utils/ui";
import { formatAmountCLP, formatAmountUSD } from "@/lib/format";

const TYPE_LABELS: Record<Investment["type"], string> = {
  ETF: "ETF",
  CASH_INTEREST: "Interés",
  CRYPTO: "Crypto",
  STOCK: "Acción",
};

function fmt(currency: "CLP" | "USD", value: number) {
  return currency === "CLP" ? formatAmountCLP(value) : formatAmountUSD(value);
}

type Props = {
  investments: Investment[];
  onEdit: (investment: Investment) => void;
  onDelete: (investment: Investment) => void;
};

export function InvestmentTable({ investments, onEdit, onDelete }: Props) {
  const rows = useMemo(
    () =>
      investments
        .map((inv) => ({ inv, perf: calculateInvestmentPerformance(inv, null) }))
        .sort((a, b) => b.perf.returnPercent - a.perf.returnPercent),
    [investments]
  );

  if (rows.length === 0) return null;

  return (
    <div className="ob-card-glass overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3 text-left hidden sm:table-cell">Tipo</th>
            <th className="px-4 py-3 text-left hidden md:table-cell">Proveedor</th>
            <th className="px-4 py-3 text-right hidden sm:table-cell">Moneda</th>
            <th className="px-4 py-3 text-right">Invertido</th>
            <th className="px-4 py-3 text-right">Valor actual</th>
            <th className="px-4 py-3 text-right">Ganancia $</th>
            <th className="px-4 py-3 text-right">Ganancia %</th>
            <th className="px-4 py-3 text-right w-20"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ inv, perf }) => (
            <tr
              key={inv.id}
              className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3 font-medium">{inv.name}</td>
              <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                {TYPE_LABELS[inv.type]}
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                {inv.provider}
              </td>
              <td className="px-4 py-3 text-right hidden sm:table-cell">
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                  {inv.currency}
                </span>
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                {fmt(inv.currency, inv.investedAmount)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                {fmt(inv.currency, inv.currentValue)}
              </td>
              <td className={`px-4 py-3 text-right tabular-nums font-medium ${getGainClass(perf.gainLoss)}`}>
                {perf.gainLoss >= 0 ? "+" : ""}
                {fmt(inv.currency, perf.gainLoss)}
              </td>
              <td className={`px-4 py-3 text-right tabular-nums font-medium ${getGainClass(perf.returnPercent)}`}>
                {perf.returnPercent >= 0 ? "+" : ""}
                {perf.returnPercent.toFixed(1)}%
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(inv)}
                    className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Editar"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(inv)}
                    className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-rose-400"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
