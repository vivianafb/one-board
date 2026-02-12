"use client";

import { MonthSelector } from "@/features/components/MonthSelector";
import { DashboardStats } from "@/features/dashboard/components/DashboardStats";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Resumen financiero del periodo seleccionado.
          </p>
        </div>
        
        {/* Aquí insertamos el control de tiempo */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground hidden md:inline">
            Periodo:
          </span>
          <MonthSelector />
        </div>
      </div>

      {/* Los widgets ahora se actualizarán mágicamente al cambiar el mes arriba */}
      <DashboardStats />

      {/* Espacio para futuros gráficos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card p-6 shadow-sm min-h-[300px] flex items-center justify-center text-muted-foreground italic">
          Gráfico de ingresos vs gastos (Próximamente)
        </div>
        <div className="col-span-3 rounded-xl border bg-card p-6 shadow-sm min-h-[300px] flex items-center justify-center text-muted-foreground italic">
          Gastos por categoría (Próximamente)
        </div>
      </div>
    </div>
  );
}