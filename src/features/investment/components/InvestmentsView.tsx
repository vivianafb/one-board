"use client";

import { useInvestmentStore } from "../store";
import { useShallow } from "zustand/react/shallow";
import { selectFilteredItems } from "../selectors";
import { useConfigStore } from "@/features/config/store";
import { InvestmentList } from "./InvestmentList";
import { InvestmentSummary } from "./InvestmentSummary";
import { EmptyInvestmentsState } from "./EmptyInvestmentsState";

export function InvestmentsView() {
  const selectedMonth = useConfigStore((s) => s.selectedMonth);
  const filteredItems = useInvestmentStore(useShallow(selectFilteredItems(selectedMonth)));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {filteredItems.length > 0 && (
          <InvestmentSummary investments={filteredItems} />
        )}
      </div>

      {filteredItems.length === 0 ? (
        <EmptyInvestmentsState />
      ) : (
        <InvestmentList investments={filteredItems} />
      )}
    </div>
  );
}
