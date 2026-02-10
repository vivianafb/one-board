"use client";

import { formatAmountCLP, formatAmountUSD } from "@/lib/format";
import type { Investment } from "@/features/transactions/types";
import { useInvestmentsStore } from "../store";
import { getPeriodValues } from "../utils/period";

const TYPE_LABELS: Record<Investment["type"], string> = {
  ETF: "ETF",
  CASH_INTEREST: "Interés en efectivo",
};

type InvestmentCardProps = {
  investment: Investment;
};

function formatAmount(currency: "CLP" | "USD", value: number) {
  return currency === "CLP" ? formatAmountCLP(value) : formatAmountUSD(value);
}

/**
 * Card por inversión: ganancia del periodo (según filtro por mes) y total.
 */
export default function InvestmentCard({ investment }: InvestmentCardProps) {
  const selectedPeriodId = useInvestmentsStore((s) => s.selectedPeriodId);
  const {
    name,
    type,
    provider,
    currency,
    investedAmount,
    currentValue,
  } = investment;

  const gainLoss = currentValue - investedAmount;
  const returnPercent =
    investedAmount > 0 ? (gainLoss / investedAmount) * 100 : 0;
  const periodData = getPeriodValues(investment, selectedPeriodId);
  const periodGain = periodData
    ? periodData.endValue - periodData.startValue
    : null;
  const periodPercent =
    periodData && periodData.startValue > 0
      ? (periodGain! / periodData.startValue) * 100
      : null;
  const isGain = gainLoss >= 0;
  const gainClass = isGain ? "text-[var(--success)]" : "text-destructive";

  return (
    <article className="ob-card h-full flex flex-col" aria-label={name}>
      <div className="flex justify-between items-start gap-2 mb-1">
        <h3 className="ob-text font-medium truncate">{name}</h3>
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0"
          title={currency === "CLP" ? "Pesos chilenos" : "Dólares"}
        >
          {currency}
        </span>
      </div>
      <p className="ob-text-muted text-xs mb-4">
        {TYPE_LABELS[type]} · {provider}
      </p>
      <div className="mt-auto space-y-2 pt-3 border-t border-border">
        {periodGain != null && (
          <div className="flex justify-between text-sm">
            <dt className="ob-text-muted">{periodData!.periodLabel}</dt>
            <dd
              className={
                periodGain >= 0
                  ? "text-[var(--success)] font-medium"
                  : "text-destructive font-medium"
              }
            >
              {periodGain >= 0 ? "+" : ""}
              {formatAmount(currency, periodGain)}
              {periodPercent != null && (
                <span className="opacity-90 ml-1">
                  ({(periodPercent >= 0 ? "+" : "")}
                  {periodPercent.toFixed(1)}%)
                </span>
              )}
            </dd>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <dt className="ob-text-muted">Total</dt>
          <dd className={`font-medium ${gainClass}`}>
            {isGain ? "+" : ""}
            {formatAmount(currency, gainLoss)}
            <span className="opacity-90 ml-1">
              ({(returnPercent >= 0 ? "+" : "")}
              {returnPercent.toFixed(1)}%)
            </span>
          </dd>
        </div>
      </div>
    </article>
  );
}
