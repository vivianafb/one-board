"use client";

import { formatAmountCLP, formatAmountUSD } from "@/lib/format";
import type { Investment } from "@/features/transactions/types";
import { useInvestmentsStore } from "../store";
import { getPeriodValues } from "../utils/period";

const TYPE_LABELS: Record<Investment["type"], string> = {
  ETF: "ETF",
  CASH_INTEREST: "Interés en efectivo",
};

type InvestmentRowProps = {
  investment: Investment;
};

function formatAmount(currency: "CLP" | "USD", value: number) {
  return currency === "CLP" ? formatAmountCLP(value) : formatAmountUSD(value);
}

/**
 * Una inversión: nombre, tipo, plataforma. Ganancia del periodo (según filtro por mes) y total.
 */
export default function InvestmentRow({ investment }: InvestmentRowProps) {
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
    <li className="ob-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="ob-text font-medium truncate">{name}</p>
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0"
              title={currency === "CLP" ? "Pesos chilenos" : "Dólares"}
            >
              {currency}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="ob-text-muted">{TYPE_LABELS[type]}</span>
            <span className="text-muted-foreground/70">·</span>
            <span className="ob-text-muted">{provider}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
          {periodGain != null && (
            <div
              className={`font-medium ${periodGain >= 0 ? "text-[var(--success)]" : "text-destructive"}`}
            >
              <span className="ob-text-muted text-xs block">
                {periodData!.periodLabel}
              </span>
              <span>
                {periodGain >= 0 ? "+" : ""}
                {formatAmount(currency, periodGain)}
                {periodPercent != null && (
                  <span className="opacity-90 ml-1">
                    ({(periodPercent >= 0 ? "+" : "")}
                    {periodPercent.toFixed(1)}%)
                  </span>
                )}
              </span>
            </div>
          )}
          <div className={`font-medium ${gainClass}`}>
            <span className="ob-text-muted text-xs block">Total</span>
            <span>
              {isGain ? "+" : ""}
              {formatAmount(currency, gainLoss)}
              <span className="opacity-90 ml-1">
                ({(returnPercent >= 0 ? "+" : "")}
                {returnPercent.toFixed(1)}%)
              </span>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
