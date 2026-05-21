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

export type InstallmentGroup = {
  groupId: string;
  itemName: string;
  amountPerCuota: number;
  total: number;
  paidCount: number;
  pendingCount: number;
  totalOriginal: number;
  remaining: number;
  currentCuota: number | null;
};

export const selectInstallmentGroups = (state: TransactionsStore): InstallmentGroup[] => {
  const todayMonth = new Date().toISOString().slice(0, 7);

  const byGroup = new Map<string, {
    itemName: string;
    amountPerCuota: number;
    total: number;
    entries: { current: number; monthId: string }[];
  }>();

  for (const tx of state.items) {
    if (!tx.installment) continue;
    const { groupId, itemName, current, total } = tx.installment;
    if (!byGroup.has(groupId)) {
      byGroup.set(groupId, { itemName, amountPerCuota: tx.amountCLP, total, entries: [] });
    }
    byGroup.get(groupId)!.entries.push({ current, monthId: tx.createdAt.slice(0, 7) });
  }

  return Array.from(byGroup.entries())
    .map(([groupId, g]) => {
      const paidCount = g.entries.filter((e) => e.monthId <= todayMonth).length;
      const pendingCount = g.total - paidCount;
      const currentEntry = g.entries.find((e) => e.monthId === todayMonth);
      return {
        groupId,
        itemName: g.itemName,
        amountPerCuota: g.amountPerCuota,
        total: g.total,
        paidCount,
        pendingCount,
        totalOriginal: g.amountPerCuota * g.total,
        remaining: g.amountPerCuota * pendingCount,
        currentCuota: currentEntry?.current ?? null,
      };
    })
    .filter((g) => g.pendingCount > 0);
};

export const selectExpenseBreakdown = (state: TransactionsStore, selectedMonth: string) => {
  const expenses = state.items.filter(
    (t) => t.type === "expense" && t.createdAt.startsWith(selectedMonth)
  );

  const fixed = expenses.filter((t) => t.expenseType === "fixed");
  const variable = expenses.filter((t) => t.expenseType === "variable");

  const totalFixed = fixed.reduce((sum, t) => sum + t.amountCLP, 0);
  const totalVariable = variable.reduce((sum, t) => sum + t.amountCLP, 0);

  const groupByCategory = (items: typeof expenses, total: number) => {
    const map: Record<string, number> = {};
    for (const t of items) {
      const cat = t.expenseCategory ?? "OTHERS";
      map[cat] = (map[cat] ?? 0) + t.amountCLP;
    }
    return Object.entries(map)
      .map(([category, amount]) => ({
        category,
        amount,
        percent: total > 0 ? (amount / total) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  return {
    fixed: groupByCategory(fixed, totalFixed),
    totalFixed,
    variable: groupByCategory(variable, totalVariable),
    totalVariable,
  };
};

export const selectCategoryStats = (state: TransactionsStore, selectedMonth: string) => {
    const monthlyExpenses = state.items.filter(t => 
      t.type === "expense" && t.createdAt.startsWith(selectedMonth)
    );
  
    const categories = monthlyExpenses.reduce((acc, t) => {
      const category = t.expenseCategory || "OTHERS";
      acc[category] = (acc[category] || 0) + t.amountCLP;
      return acc;
    }, {} as Record<string, number>);
  
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  };