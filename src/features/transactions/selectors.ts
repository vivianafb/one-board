import { TransactionsStore } from "./store";

export const selectTransactionStats = (state: TransactionsStore) => {
    const incomes = state.items
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amountCLP, 0);
    const expensesList = state.items.filter((t) => t.type === "expense");
    const totalExpenses = expensesList.reduce((sum, t) => sum + t.amountCLP, 0);
    const fixed = expensesList
        .filter((t) => t.expenseCategory === "fixed")
        .reduce((sum, t) => sum + t.amountCLP, 0);
    const variable = expensesList
        .filter((t) => t.expenseCategory === "variable")
        .reduce((sum, t) => sum + t.amountCLP, 0);
    return {
        balance: incomes - totalExpenses,
        fixedExpenses: fixed,
        variableExpenses: variable,
    };
};