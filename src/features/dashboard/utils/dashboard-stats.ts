import type { ComponentType } from "react";
import { Wallet, TrendingDown, ArrowDownCircle, CreditCard } from "lucide-react";

export type TransactionStats = {
  balance: number;
  fixedExpenses: number;
  variableExpenses: number;
  creditCardDebt: number;
};

export type StatCardConfig = {
  title: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
  description: string;
  amountClass: string;
  iconColor: string;
};

const STAT_DEFINITIONS: Array<{
  key: keyof TransactionStats;
  title: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  amountClass: string;
  iconColor: string;
  /** Si true, amountClass e iconColor se calculan según value (ej: balance +/-) */
  dynamicStyle?: boolean;
}> = [
  {
    key: "balance",
    title: "Balance Mensual",
    icon: Wallet,
    description: "Ingresos - Gastos del mes",
    amountClass: "ob-amount-income",
    iconColor: "text-[var(--income)]",
    dynamicStyle: true,
  },
  {
    key: "fixedExpenses",
    title: "Gastos Fijos",
    icon: TrendingDown,
    description: "Cuentas y servicios básicos",
    amountClass: "ob-amount-expense",
    iconColor: "text-[var(--expense)]",
  },
  {
    key: "variableExpenses",
    title: "Gastos Variables",
    icon: ArrowDownCircle,
    description: "Consumo diario y extras",
    amountClass: "ob-amount-expense",
    iconColor: "text-amber-400/90",
  },
  {
    key: "creditCardDebt",
    title: "Deuda Tarjeta",
    icon: CreditCard,
    description: "Consumo acumulado en crédito",
    amountClass: "ob-amount-neutral",
    iconColor: "text-slate-400",
  },
];

/**
 * Construye el array de stats para las cards del dashboard.
 * Extrae la lógica de mapeo para mantener el componente limpio y facilitar tests.
 */
export function buildDashboardStats(stats: TransactionStats): StatCardConfig[] {
  return STAT_DEFINITIONS.map((def) => {
    const value = stats[def.key];
    let amountClass = def.amountClass;
    let iconColor = def.iconColor;

    if (def.dynamicStyle && def.key === "balance") {
      amountClass = value >= 0 ? "ob-amount-income" : "ob-amount-expense";
      iconColor = value >= 0 ? "text-[var(--income)]" : "text-[var(--expense)]";
    }

    return {
      title: def.title,
      value,
      icon: def.icon,
      description: def.description,
      amountClass,
      iconColor,
    };
  });
}
