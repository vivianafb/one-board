"use client";

import { MonthSelector } from "@/features/components/MonthSelector";
import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { CategoryPieChart } from "@/features/dashboard/components/CategoryPieChart";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Cabecera con Time Travel */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <MonthSelector />
      </div>
      
      {/* Widgets de Resumen (Balance, Gastos, etc) */}
      <DashboardStats />
      
      {/* Sección de Análisis Visual */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* El gráfico ocupa 3 de las 7 columnas */}
        <CategoryPieChart />

        {/* Las otras 4 columnas pueden ser para una lista de movimientos o metas */}
        <div className="col-span-4 rounded-xl border bg-card p-6 shadow-sm flex items-center justify-center text-muted-foreground italic">
          Comming Soon...
        </div>
      </div>
    </div>
  );
}