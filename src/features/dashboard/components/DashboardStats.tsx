"use client";

import { useMemo } from "react";
import { useTransactionsStore } from "@/features/transactions/store";
import { useInvestmentStore } from "@/features/investment/store";
import { useConfigStore } from "@/features/config/store";
import { selectTransactionStats } from "@/features/transactions/selectors";
import type { TransactionsStore } from "@/features/transactions/store";
import { buildDashboardStats } from "@/features/dashboard/utils/dashboard-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmountCLP } from "@/lib/format";

const USD_TO_CLP = 1000;

export function DashboardStats() {
  const selectedMonth = useConfigStore((s) => s.selectedMonth);

  const txItems = useTransactionsStore((s) => s.items);
  const txStats = useMemo(
    () => selectTransactionStats({ items: txItems } as TransactionsStore, selectedMonth),
    [txItems, selectedMonth]
  );

  const investments = useInvestmentStore((s) => s.items);

  const portfolioValue = useMemo(
    () =>
      investments.reduce(
        (sum, inv) =>
          sum + (inv.currency === "CLP" ? inv.currentValue : inv.currentValue * USD_TO_CLP),
        0
      ),
    [investments]
  );

  const portfolioInvested = useMemo(
    () =>
      investments.reduce(
        (sum, inv) =>
          sum + (inv.currency === "CLP" ? inv.investedAmount : inv.investedAmount * USD_TO_CLP),
        0
      ),
    [investments]
  );

  const stats = useMemo(
    () =>
      buildDashboardStats({
        totalIncomes: txStats.totalIncomes,
        totalExpenses: txStats.totalExpenses,
        balance: txStats.balance,
        portfolioValue,
        portfolioInvested,
      }),
    [txStats, portfolioValue, portfolioInvested]
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
            <p className={`text-[10px] mt-1 italic tracking-wide ${stat.descriptionClass ?? "text-slate-500"}`}>
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
