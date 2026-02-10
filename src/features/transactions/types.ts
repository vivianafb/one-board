export type InvestmentType = "ETF" | "CASH_INTEREST";

/**
 * Un periodo (mes): valor al inicio y al cierre.
 * Orden: el más reciente primero (periods[0] = periodo actual).
 */
export interface InvestmentPeriod {
  periodId: string; // "YYYY-MM" para ordenar
  label: string; // "Febrero 2025"
  startValue: number;
  endValue: number;
}

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  provider: string;
  currency: "CLP" | "USD";
  investedAmount: number;
  currentValue: number;
  createdAt: string;
  /**
   * Historial de periodos. periods[0] = periodo actual (más reciente).
   * Fuente única de verdad para datos por mes; el valor actual es periods[0].endValue.
   */
  periods?: InvestmentPeriod[];
}
