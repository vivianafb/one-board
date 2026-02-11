"use client";

import { formatAmountCLP, formatAmountUSD } from "@/lib/format";
import type { Investment } from "../types";
import { useInvestmentStore } from "../store";
import { selectSelectedPeriodId } from "../selectors";
import { calculateInvestmentPerformance } from "../utils/performance";
import { getGainClass } from "../utils/ui";

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
  const selectedPeriodId = useInvestmentStore(selectSelectedPeriodId);
  const { name, type, provider, currency } = investment;

  const performance = calculateInvestmentPerformance(investment, selectedPeriodId);
  const { gainLoss, returnPercent, period, isGain } = performance;

  

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
        {period != null && (
          <div className="flex justify-between text-sm">
            <dt className="ob-text-muted">{period.label}</dt>
            <dd className={`font-medium ${getGainClass(period.gain)}`}>
              {period.gain >= 0 ? "+" : ""}
              {formatAmount(currency, period.gain)}
              <span className="opacity-90 ml-1">
                ({(period.percent >= 0 ? "+" : "")}
                {period.percent.toFixed(1)}%)
              </span>
            </dd>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <dt className="ob-text-muted">Total</dt>
          <dd className={`font-medium ${getGainClass(gainLoss)}`}>
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
