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
    <div className="ob-card-glass p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
        {count} inversión{count !== 1 ? "es" : ""} · Total
      </p>
      <p className="text-xl font-bold tracking-tighter tabular-nums">{formatAmountCLP(total)}</p>
    </div>
  );
}
