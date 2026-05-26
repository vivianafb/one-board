"use client";

import { MonthSelector } from "@/components/shared/MonthSelector";
import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { CategoryPieChart } from "@/features/dashboard/components/CategoryPieChart";
import { IncomeExpenseBarChart } from "@/features/dashboard/components/IncomeExpenseBarChart";
import { DemoBanner } from "@/components/shared/DemoBanner";

export default function DashboardPage() {
  return (
    <div className="space-y-8 w-full min-w-0">
      <DemoBanner />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="ob-page-title">Dashboard</h1>
        <MonthSelector />
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-7 w-full min-w-0">
        <CategoryPieChart />
        <IncomeExpenseBarChart />
      </div>
    </div>
  );
}