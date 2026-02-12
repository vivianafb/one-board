"use client";

import { MonthSelector } from "@/features/components/MonthSelector";
import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { CategoryPieChart } from "@/features/dashboard/components/CategoryPieChart";

export default function DashboardPage() {
  return (
    <div className="space-y-8 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="ob-page-title">Dashboard</h1>
        <MonthSelector />
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-7 w-full min-w-0">
        <CategoryPieChart />
        <div className="ob-card-glass col-span-full md:col-span-4 flex items-center justify-center text-muted-foreground italic min-h-[140px] md:min-h-[200px] py-8 px-4">
          Comming Soon...
        </div>
      </div>
    </div>
  );
}