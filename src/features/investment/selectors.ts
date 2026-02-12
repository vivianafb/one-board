import type { InvestmentStore } from "./store";

export const selectItems = (s: InvestmentStore) => s.items;
export const selectActions = (s: InvestmentStore) => s.actions;

/** Items filtrados por mes (selectedMonth del config store). Recibe el mes en formato "YYYY-MM". */
export const selectFilteredItems = (selectedMonth: string) => (s: InvestmentStore) => {
  return s.items.filter((i) => {
    const [y, m] = i.createdAt.split("-");
    return `${y}-${m}` === selectedMonth;
  });
};
