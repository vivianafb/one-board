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
  const selectedPeriodId = useInvestmentStore(selectSelectedPeriodId);
  const { name, type, provider, currency } = investment;

  const { gainLoss, returnPercent, period, isGain } =
    calculateInvestmentPerformance(investment, selectedPeriodId);

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
          {period != null && (
            <div className={`font-medium ${getGainClass(period.gain)}`}>
              <span className="ob-text-muted text-xs block">
                {period.label}
              </span>
              <span>
                {period.gain >= 0 ? "+" : ""}
                {formatAmount(currency, period.gain)}
                <span className="opacity-90 ml-1">
                  ({(period.percent >= 0 ? "+" : "")}
                  {period.percent.toFixed(1)}%)
                </span>
              </span>
            </div>
          )}
          <div className={`font-medium ${getGainClass(gainLoss)}`}>
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
