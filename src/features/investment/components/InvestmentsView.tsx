"use client";

import { useInvestmentStore } from "../store";
import { useShallow } from "zustand/react/shallow";
import { selectFilteredItems, selectSelectedPeriodId } from "../selectors";
import PeriodFilter from "./PeriodFilter";
import { InvestmentList } from "./InvestmentList";
import { InvestmentSummary } from "./InvestmentSummary";
import { EmptyInvestmentsState } from "./EmptyInvestmentsState";

export function InvestmentsView() {
  const filteredItems = useInvestmentStore(useShallow(selectFilteredItems));
  const selectedPeriodId = useInvestmentStore(selectSelectedPeriodId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PeriodFilter />
        {filteredItems.length > 0 && (
          <InvestmentSummary investments={filteredItems} />
        )}
      </div>

      {filteredItems.length === 0 ? (
        <EmptyInvestmentsState hasFilter={selectedPeriodId !== null} />
      ) : (
        <InvestmentList investments={filteredItems} />
      )}
    </div>
  );
}
