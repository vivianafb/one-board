"use client";

import { InvestmentsView } from "@/features/investment/components/InvestmentsView";
import { MonthSelector } from "@/features/components/MonthSelector";

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="ob-page-title">Inversiones</h1>
        <MonthSelector />
      </div>
      <InvestmentsView />
    </div>
  );
}
