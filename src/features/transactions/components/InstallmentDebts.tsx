"use client";

import { useMemo } from "react";
import { useTransactionsStore } from "../store";
import { selectInstallmentGroups } from "../selectors";
import type { TransactionsStore } from "../store";
import { formatAmountCLP } from "@/lib/format";
import { Progress } from "@/components/ui/progress";

export function InstallmentDebts() {
  const items = useTransactionsStore((s) => s.items);
  const groups = useMemo(
    () => selectInstallmentGroups({ items } as TransactionsStore),
    [items]
  );

  if (groups.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Deudas activas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {groups.map((g) => {
          const progressPercent = Math.round((g.paidCount / g.total) * 100);
          return (
            <div key={g.groupId} className="ob-card-glass p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-sm text-foreground leading-tight">
                  {g.itemName}
                </p>
                {g.currentCuota !== null && (
                  <span className="shrink-0 rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                    Cuota {g.currentCuota}/{g.total}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>
                  <p className="text-muted-foreground">Total original</p>
                  <p className="tabular-nums font-medium text-foreground">
                    {formatAmountCLP(g.totalOriginal)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Por cuota</p>
                  <p className="tabular-nums font-medium text-foreground">
                    {formatAmountCLP(g.amountPerCuota)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Deuda restante</p>
                  <p className="tabular-nums font-medium text-rose-400">
                    {formatAmountCLP(g.remaining)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cuotas</p>
                  <p className="tabular-nums font-medium text-foreground">
                    {g.paidCount}/{g.total} pagadas
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <Progress value={progressPercent} className="h-1.5" />
                <p className="text-right text-[10px] text-muted-foreground">
                  {progressPercent}% completado
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
