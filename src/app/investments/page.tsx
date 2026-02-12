"use client";

import { InvestmentsView } from "@/features/investment/components/InvestmentsView";
import { MonthSelector } from "@/features/components/MonthSelector";

export default function InvestmentsPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="ob-page-title">Inversiones</h2>
        <MonthSelector />
      </div>
      <InvestmentsView />
    </>
  );
}
