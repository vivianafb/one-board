import type { SavingsState } from "@/types/finance";

// Suma el currentAmount de todas las metas activas
export const selectTotalSaved = (state: SavingsState) => {
  return state.goals.reduce((acc, goal) => acc + goal.currentAmount, 0);
};

// Suma el histórico mensual (si quieres ver cuánto has guardado en total en el tiempo)
export const selectHistoricalSavings = (state: SavingsState) => {
  return state.monthlyHistory.reduce((acc, item) => acc + item.amount, 0);
};