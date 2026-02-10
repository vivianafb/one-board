"use client";

import { useMemo, useState } from "react";
import { useInvestmentStore } from "../store";
import { MonthSelector } from "./MonthSelector";
import { InvestmentList } from "./InvestmentList";
import { InvestmentSummary } from "./InvestmentSummary";
import { EmptyInvestmentsState } from "./EmptyInvestmentsState";

function getMonthsFromInvestments(
  items: { createdAt: string }[]
): { value: string; label: string }[] {
  const set = new Set<string>();
  items.forEach((i) => {
    const [y, m] = i.createdAt.split("-");
    set.add(`${y}-${m}`);
  });
  const months = Array.from(set).sort().reverse();
  return months.map((value) => {
    const [y, m] = value.split("-");
    const date = new Date(Number(y), Number(m) - 1, 1);
    const label = date.toLocaleDateString("es-CL", { month: "long", year: "numeric" });
    return { value, label };
  });
}

export function InvestmentsView() {
  const items = useInvestmentStore((s) => s.items);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const months = useMemo(() => getMonthsFromInvestments(items), [items]);

  const filteredItems = useMemo(() => {
    if (!selectedMonth) return items;
    return items.filter((i) => {
      const [y, m] = i.createdAt.split("-");
      return `${y}-${m}` === selectedMonth;
    });
  }, [items, selectedMonth]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <MonthSelector
          value={selectedMonth}
          onChange={setSelectedMonth}
          months={months}
        />
        {filteredItems.length > 0 && (
          <InvestmentSummary investments={filteredItems} />
        )}
      </div>

      {filteredItems.length === 0 ? (
        <EmptyInvestmentsState hasFilter={selectedMonth !== null} />
      ) : (
        <InvestmentList investments={filteredItems} />
      )}
    </div>
  );
}
