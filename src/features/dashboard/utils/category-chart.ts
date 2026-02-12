import { formatExpenseCategory } from "@/lib/format";
import { CHART_COLORS } from "@/lib/constants";
import type { ExpenseCategory } from "@/lib/transaction-options";

export type CategoryRawItem = { name: string; value: number };

export type ChartDataItem = CategoryRawItem & {
  fill: string;
  label: string;
  percentage: number;
};

export type ChartStats = {
  totalCurrent: number;
  totalPrev: number;
  changePercent: number;
  data: ChartDataItem[];
};

/**
 * Calcula estadísticas del gráfico: totales, variación y datos enriquecidos para el pie chart.
 * Extraída para facilitar pruebas unitarias y separar lógica de negocio del componente.
 */
export function computeChartStats(
  rawData: CategoryRawItem[],
  prevRawData: CategoryRawItem[]
): ChartStats {
  const totalCurrent = rawData.reduce((s, d) => s + d.value, 0);
  const totalPrev = prevRawData.reduce((s, d) => s + d.value, 0);
  const changePercent =
    totalPrev > 0 ? ((totalCurrent - totalPrev) / totalPrev) * 100 : 0;

  const data = rawData.map((item, i) => {
    const idx = i % CHART_COLORS.length;
    const value = Number(item.value);
    const pct = totalCurrent > 0 ? (value / totalCurrent) * 100 : 0;
    return {
      ...item,
      fill: CHART_COLORS[idx],
      label: formatExpenseCategory(item.name as ExpenseCategory),
      percentage: pct,
    };
  });

  return { totalCurrent, totalPrev, changePercent, data };
}
