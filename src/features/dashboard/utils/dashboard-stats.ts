import type { ComponentType } from "react";
import { TrendingUp, TrendingDown, Wallet, BarChart2 } from "lucide-react";

export type StatCardConfig = {
  title: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
  description: string;
  descriptionClass?: string;
  amountClass: string;
  iconColor: string;
};

export type DashboardStatsInput = {
  totalIncomes: number;
  totalExpenses: number;
  balance: number;
  portfolioValue: number;
  portfolioInvested: number;
};

export function buildDashboardStats(input: DashboardStatsInput): StatCardConfig[] {
  const { totalIncomes, totalExpenses, balance, portfolioValue, portfolioInvested } = input;

  const balancePositive = balance >= 0;

  const portfolioGain = portfolioValue - portfolioInvested;
  const portfolioPercent =
    portfolioInvested > 0 ? (portfolioGain / portfolioInvested) * 100 : 0;
  const portfolioPositive = portfolioGain >= 0;

  return [
    {
      title: "Ingresos del mes",
      value: totalIncomes,
      icon: TrendingUp,
      description: "Total ingresos del mes seleccionado",
      amountClass: "ob-amount-income",
      iconColor: "text-[var(--income)]",
    },
    {
      title: "Gastos del mes",
      value: totalExpenses,
      icon: TrendingDown,
      description: "Total gastos del mes seleccionado",
      amountClass: "ob-amount-expense",
      iconColor: "text-[var(--expense)]",
    },
    {
      title: "Balance mensual",
      value: balance,
      icon: Wallet,
      description: "Ingresos − Gastos del mes",
      amountClass: balancePositive ? "ob-amount-income" : "ob-amount-expense",
      iconColor: balancePositive ? "text-[var(--income)]" : "text-[var(--expense)]",
    },
    {
      title: "Portfolio",
      value: portfolioValue,
      icon: BarChart2,
      description: `${portfolioPositive ? "+" : ""}${portfolioPercent.toFixed(1)}% vs invertido`,
      descriptionClass: portfolioPositive ? "text-emerald-400" : "text-rose-400",
      amountClass: "ob-amount-neutral",
      iconColor: portfolioPositive ? "text-[var(--income)]" : "text-[var(--expense)]",
    },
  ];
}
