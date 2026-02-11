

// Suma el currentAmount de todas las metas activas
export const selectTotalSaved = (state: any) => {
  return state.goals.reduce((acc: number, goal: any) => acc + goal.currentAmount, 0);
};

// Suma el histórico mensual (si quieres ver cuánto has guardado en total en el tiempo)
export const selectHistoricalSavings = (state: any) => {
  return state.monthlyHistory.reduce((acc: number, item: any) => acc + item.amount, 0);
};