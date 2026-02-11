import type { Investment } from "../types";
import { getPeriodValues } from "./period";

export type InvestmentPerformance = {
  gainLoss: number;
  returnPercent: number;
  period: {
    label: string;
    gain: number;
    percent: number;
  } | null;
  isGain: boolean;
};

/**
 * Calcula las métricas de desempeño de una inversión: ganancia total,
 * porcentaje de retorno, y opcionalmente ganancia/porcentaje del periodo seleccionado.
 */
export function calculateInvestmentPerformance(
  investment: Investment,
  periodId: string | null
): InvestmentPerformance {
  const { investedAmount, currentValue } = investment;

  const gainLoss = currentValue - investedAmount;
  const returnPercent =
    investedAmount > 0 ? (gainLoss / investedAmount) * 100 : 0;

  const periodData = getPeriodValues(investment, periodId);
  const period =
    periodData != null
      ? {
          label: periodData.periodLabel,
          gain: periodData.endValue - periodData.startValue,
          percent:
            periodData.startValue > 0
              ? ((periodData.endValue - periodData.startValue) /
                  periodData.startValue) *
                100
              : 0,
        }
      : null;

  return {
    gainLoss,
    returnPercent,
    period,
    isGain: gainLoss >= 0,
  };
}
