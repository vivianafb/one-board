"use client";

import { useState, useMemo, Fragment } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTransactionsStore } from "../store";
import { useConfigStore } from "@/features/config/store";
import { selectExpenseBreakdown } from "../selectors";
import type { TransactionsStore } from "../store";
import type { Transaction } from "@/types/finance";
import { formatAmountCLP, formatExpenseCategory } from "@/lib/format";
import { Tooltip } from "@/components/ui/tooltip";

const VARIABLE_ALERT_THRESHOLD = 20;

// Fixed column widths shared across header, rows, and footer
const COL_AMOUNT = "w-[120px] shrink-0";
const COL_PCT = "w-[52px] shrink-0";

type CategoryRow = { category: string; amount: number; percent: number };

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-CL", { day: "2-digit", month: "short" });
}

function CategoryDetail({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return <p className="py-2 text-xs text-muted-foreground italic">Sin transacciones.</p>;
  }
  return (
    <div className="w-full">
      <div className="flex text-[10px] text-muted-foreground border-b border-border/30 pb-1 mb-1">
        <span className="flex-1">Descripción</span>
        <span className="w-[64px] text-center shrink-0">Fecha</span>
        <span className="w-[96px] text-right shrink-0">Monto</span>
      </div>
      {transactions.map((t) => (
        <div key={t.id} className="flex items-baseline py-1 text-xs border-b border-border/20 last:border-0">
          <span className="flex-1 text-foreground/80 truncate pr-2">{t.description}</span>
          <span className="w-[64px] text-center tabular-nums text-muted-foreground shrink-0">
            {formatDate(t.createdAt)}
          </span>
          <span className="w-[96px] text-right tabular-nums text-muted-foreground shrink-0">
            {formatAmountCLP(t.amountCLP)}
          </span>
        </div>
      ))}
    </div>
  );
}

function BreakdownTable({
  title,
  rows,
  total,
  transactions,
  highlightAbove,
}: {
  title: string;
  rows: CategoryRow[];
  total: number;
  transactions: Transaction[];
  highlightAbove?: number;
}) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggle = (category: string) =>
    setExpandedCategory((prev) => (prev === category ? null : category));

  return (
    <div className="ob-card-glass overflow-hidden flex flex-col">
      {/* Title */}
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>

      {rows.length === 0 ? (
        <p className="px-4 pb-4 text-sm text-muted-foreground italic">Sin gastos este mes.</p>
      ) : (
        <>
          {/* Header — outside scroll, always visible */}
          <div className="flex items-center border-b border-border bg-slate-800 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="flex-1">Categoría</span>
            <span className={`${COL_AMOUNT} text-right`}>Monto</span>
            <span className={`${COL_PCT} text-right`}>%</span>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto max-h-[240px] min-h-0">
            {rows.map(({ category, amount, percent }) => {
              const isAlert = highlightAbove != null && percent > highlightAbove;
              const isExpanded = expandedCategory === category;
              const catTx = transactions.filter(
                (t) => (t.expenseCategory ?? "OTHERS") === category
              );

              return (
                <Fragment key={category}>
                  <div
                    onClick={() => toggle(category)}
                    className={`flex items-center border-b border-border/40 cursor-pointer select-none px-4 py-2.5 text-sm transition-colors ${
                      isAlert ? "bg-rose-500/10 hover:bg-rose-500/20" : "hover:bg-muted/30"
                    }`}
                  >
                    <span
                      className={`flex-1 flex items-center gap-1.5 font-medium min-w-0 ${
                        isAlert ? "text-rose-300" : ""
                      }`}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      )}
                      <span className="truncate">{formatExpenseCategory(category)}</span>
                      {isAlert && (
                        <Tooltip
                          content="Este gasto supera el 20% de tus gastos variables del mes"
                          side="right"
                        >
                          <span className="cursor-default">⚠️</span>
                        </Tooltip>
                      )}
                    </span>
                    <span
                      className={`${COL_AMOUNT} text-right tabular-nums ${
                        isAlert ? "text-rose-300" : "text-muted-foreground"
                      }`}
                    >
                      {formatAmountCLP(amount)}
                    </span>
                    <span
                      className={`${COL_PCT} text-right tabular-nums ${
                        isAlert ? "text-rose-400 font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {percent.toFixed(1)}%
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="border-b border-border/40 bg-slate-900/60 border-l-2 border-l-primary/30 px-6 py-2">
                      <CategoryDetail transactions={catTx} />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>

          {/* Footer — outside scroll, always visible */}
          <div className="flex items-center border-t border-border bg-slate-800 px-4 py-2.5 text-sm">
            <span className="flex-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Total
            </span>
            <span className={`${COL_AMOUNT} text-right tabular-nums font-semibold text-foreground`}>
              {formatAmountCLP(total)}
            </span>
            <span className={`${COL_PCT} text-right text-[10px] text-muted-foreground`}>
              100%
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export function ExpenseBreakdown() {
  const selectedMonth = useConfigStore((s) => s.selectedMonth);
  const items = useTransactionsStore((s) => s.items);

  const breakdown = useMemo(
    () => selectExpenseBreakdown({ items } as TransactionsStore, selectedMonth),
    [items, selectedMonth]
  );

  const monthExpenses = useMemo(
    () =>
      items.filter(
        (t) => t.type === "expense" && t.createdAt.startsWith(selectedMonth)
      ),
    [items, selectedMonth]
  );

  const fixedItems = useMemo(
    () => monthExpenses.filter((t) => t.expenseType === "fixed"),
    [monthExpenses]
  );

  const variableItems = useMemo(
    () => monthExpenses.filter((t) => t.expenseType === "variable"),
    [monthExpenses]
  );

  if (breakdown.fixed.length === 0 && breakdown.variable.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BreakdownTable
        title="Gastos Fijos"
        rows={breakdown.fixed}
        total={breakdown.totalFixed}
        transactions={fixedItems}
      />
      <BreakdownTable
        title="Gastos Variables"
        rows={breakdown.variable}
        total={breakdown.totalVariable}
        transactions={variableItems}
        highlightAbove={VARIABLE_ALERT_THRESHOLD}
      />
    </div>
  );
}
