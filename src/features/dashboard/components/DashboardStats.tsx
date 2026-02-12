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
      color: balance >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      title: "Gastos Fijos",
      value: fixedExpenses,
      icon: TrendingDown,
      description: "Cuentas y servicios básicos",
      color: "text-red-500",
    },
    {
      title: "Gastos Variables",
      value: variableExpenses,
      icon: ArrowDownCircle,
      description: "Consumo diario y extras",
      color: "text-orange-500",
    },
    {
      title: "Deuda Tarjeta",
      value: creditCardDebt,
      icon: CreditCard,
      description: "Consumo acumulado en crédito",
      color: "text-blue-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="ob-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold tabular-nums ${stat.color}`}>
              {formatAmountCLP(stat.value)}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 italic">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}