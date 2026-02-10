"use client";

import { formatAmountCLP } from "@/lib/format";
import { useInvestmentSummary } from "../hooks/useInvestmentSummary";
import type { Investment } from "@/types/finance";

type InvestmentSummaryProps = {
  investments: Investment[];
};

export function InvestmentSummary({ investments }: InvestmentSummaryProps) {
  const { total, count } = useInvestmentSummary(investments);

  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground">
      <p className="text-sm text-muted-foreground">
        {count} inversión{count !== 1 ? "es" : ""} · Total
      </p>
      <p className="text-xl font-semibold">{formatAmountCLP(total)}</p>
    </div>
  );
}
