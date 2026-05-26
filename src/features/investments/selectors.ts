import type { InvestmentStore } from "./store";

const USD_TO_CLP = 1000;

export const selectItems = (s: InvestmentStore) => s.items;
export const selectActions = (s: InvestmentStore) => s.actions;

export const selectFilteredItems = (selectedMonth: string) => (s: InvestmentStore) => {
  return s.items.filter((i) => {
    const [y, m] = i.createdAt.split("-");
    return `${y}-${m}` === selectedMonth;
  });
};

export const selectPortfolioSummary = (s: InvestmentStore) => {
  const toCLP = (inv: InvestmentStore["items"][number]) =>
    inv.currency === "CLP" ? 1 : USD_TO_CLP;

  const totalValue = s.items.reduce(
    (sum, inv) => sum + inv.currentValue * toCLP(inv),
    0
  );
  const totalInvested = s.items.reduce(
    (sum, inv) => sum + inv.investedAmount * toCLP(inv),
    0
  );

  return { totalValue, totalInvested };
};
