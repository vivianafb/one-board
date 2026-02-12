"use client";

import { useMemo } from "react";
import { useTransactionsStore } from "@/features/transactions/store";
import { useConfigStore } from "@/features/config/store";
import { selectTransactionStats } from "@/features/transactions/selectors";
import { buildDashboardStats } from "@/features/dashboard/utils/dashboard-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmountCLP } from "@/lib/format";
import { useShallow } from "zustand/react/shallow";

export function DashboardStats() {
  const selectedMonth = useConfigStore((s) => s.selectedMonth);

  const transactionStats = useTransactionsStore(
    useShallow((state) => selectTransactionStats(state, selectedMonth))
  );

  const stats = useMemo(
    () => buildDashboardStats(transactionStats),
    [transactionStats]
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="ob-card-glass relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              {stat.title}
            </CardTitle>
            <div className={`ob-icon-wrap ${stat.iconColor}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className={`text-2xl ${stat.amountClass}`}>
              {formatAmountCLP(stat.value)}
            </div>
            <p className="text-[10px] text-slate-500 mt-1 italic tracking-wide">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}