import type { InvestmentStore } from "./store";

export const selectItems = (s: InvestmentStore) => s.items;
export const selectSelectedPeriodId = (s: InvestmentStore) => s.selectedPeriodId;
export const selectActions = (s: InvestmentStore) => s.actions;
export const selectSetSelectedPeriodId = (s: InvestmentStore) => s.actions.setSelectedPeriodId;

/** Items filtrados por periodo seleccionado (por createdAt). null = todos. */
export const selectFilteredItems = (s: InvestmentStore) => {
  if (s.selectedPeriodId == null) return s.items;
  return s.items.filter((i) => {
    const [y, m] = i.createdAt.split("-");
    return `${y}-${m}` === s.selectedPeriodId;
  });
};

export type MonthOption = { value: string; label: string };

/** Utilidad pura: meses desde items (para useMemo, evita getServerSnapshot loop). */
export function getMonthsFromItems(
  items: { createdAt: string }[]
): MonthOption[] {
  const set = new Set<string>();
  items.forEach((i) => {
    const [y, m] = i.createdAt.split("-");
    set.add(`${y}-${m}`);
  });
  const months = Array.from(set).sort().reverse();
  return months.map((value) => {
    const [y, m] = value.split("-");
    const date = new Date(Number(y), Number(m) - 1, 1);
    const label = date.toLocaleDateString("es-CL", {
      month: "long",
      year: "numeric",
    });
    return { value, label };
  });
}
