"use client";

import { useInvestmentStore } from "../store";
import { useConfigStore } from "@/features/config/store";
import { PortfolioCard } from "./PortfolioCard";
import { InvestmentTable } from "./InvestmentTable";
import { MonthlyDetail } from "./MonthlyDetail";
import { EmptyInvestmentsState } from "./EmptyInvestmentsState";

export function InvestmentsView() {
  const selectedMonth = useConfigStore((s) => s.selectedMonth);
  const items = useInvestmentStore((s) => s.items);

  if (items.length === 0) return <EmptyInvestmentsState />;

  return (
    <div className="space-y-6">
      <PortfolioCard investments={items} />
      <InvestmentTable investments={items} />
      {selectedMonth && <MonthlyDetail investments={items} periodId={selectedMonth} />}
    </div>
  );
}
