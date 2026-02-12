import { TransactionsStore } from "./store";

export const selectTransactionStats = (state: TransactionsStore, selectedMonth: string) => {
    const monthlyItems = state.items.filter((t) =>
        t.createdAt.startsWith(selectedMonth)
    );
    const incomes = monthlyItems
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amountCLP, 0);

    const expensesList = monthlyItems.filter((t) => t.type === "expense");

    const totalExpenses = expensesList.reduce((sum, t) => sum + t.amountCLP, 0);

    const fixed = expensesList
        .filter((t) => t.expenseType === "fixed")
        .reduce((sum, t) => sum + t.amountCLP, 0);

    const variable = expensesList
        .filter((t) => t.expenseType === "variable")
        .reduce((sum, t) => sum + t.amountCLP, 0);

    // Nuevo: Deuda de tarjeta del mes
    const creditCardDebt = expensesList
        .filter((t) => t.paymentMethod === "credit_card")
        .reduce((sum, t) => sum + t.amountCLP, 0);

    return {
        balance: incomes - totalExpenses,
        totalIncomes: incomes,
        totalExpenses,
        fixedExpenses: fixed,
        variableExpenses: variable,
        creditCardDebt
    };
};