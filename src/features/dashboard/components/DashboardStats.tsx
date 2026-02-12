"use client";

import { useTransactionsStore } from "@/features/transactions/store";
import { useConfigStore } from "@/features/config/store";
import { selectTransactionStats } from "@/features/transactions/selectors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmountCLP } from "@/lib/format";
import { useShallow } from "zustand/react/shallow";
import { 
  Wallet, 
  TrendingDown, 
  ArrowDownCircle, 
  CreditCard 
} from "lucide-react";

export function DashboardStats() {
  // 1. Obtenemos el mes seleccionado del store de configuración
  const selectedMonth = useConfigStore((s) => s.selectedMonth);

  // 2. Obtenemos las estadísticas pasando el mes como argumento
  // useShallow evita renders innecesarios y bucles infinitos
  const { 
    balance, 
    fixedExpenses, 
    variableExpenses, 
    creditCardDebt 
  } = useTransactionsStore(
    useShallow((state) => selectTransactionStats(state, selectedMonth))
  );

  const stats = [
    {
      title: "Balance Mensual",
      value: balance,
      icon: Wallet,
      description: "Ingresos - Gastos del mes",
      amountClass: balance >= 0 ? "ob-amount-income" : "ob-amount-expense",
      iconColor: balance >= 0 ? "text-[var(--income)]" : "text-[var(--expense)]",
    },
    {
      title: "Gastos Fijos",
      value: fixedExpenses,
      icon: TrendingDown,
      description: "Cuentas y servicios básicos",
      amountClass: "ob-amount-expense",
      iconColor: "text-[var(--expense)]",
    },
    {
      title: "Gastos Variables",
      value: variableExpenses,
      icon: ArrowDownCircle,
      description: "Consumo diario y extras",
      amountClass: "ob-amount-expense",
      iconColor: "text-amber-400/90",
    },
    {
      title: "Deuda Tarjeta",
      value: creditCardDebt,
      icon: CreditCard,
      description: "Consumo acumulado en crédito",
      amountClass: "ob-amount-neutral",
      iconColor: "text-slate-400",
    },
  ];

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