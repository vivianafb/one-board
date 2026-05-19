import { selectTransactionStats, selectCategoryStats } from "@/features/transactions/selectors";
import { TransactionsStore } from "@/features/transactions/store";
import { Transaction } from "@/types/finance";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const buildState = (items: Transaction[]): TransactionsStore => ({
  items,
  actions: {
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

const makeTransaction = (overrides: Partial<Transaction>): Transaction => ({
  id: "t1",
  amountCLP: 1000,
  description: "Test",
  type: "income",
  createdAt: "2025-01",
  paymentMethod: "cash",
  ...overrides,
});

const MONTH = "2025-01";
const OTHER_MONTH = "2025-02";

// ─── selectTransactionStats ───────────────────────────────────────────────────

describe("selectTransactionStats", () => {
  describe("when there is no data", () => {
    it("should return all zeros when the transactions array is empty", () => {
      const state = buildState([]);
      const result = selectTransactionStats(state, MONTH);

      expect(result).toEqual({
        balance: 0,
        totalIncomes: 0,
        totalExpenses: 0,
        fixedExpenses: 0,
        variableExpenses: 0,
        creditCardDebt: 0,
      });
    });

    it("should return all zeros when there are no transactions for the selected month", () => {
      const state = buildState([
        makeTransaction({ id: "t1", createdAt: OTHER_MONTH }),
      ]);
      const result = selectTransactionStats(state, MONTH);

      expect(result).toEqual({
        balance: 0,
        totalIncomes: 0,
        totalExpenses: 0,
        fixedExpenses: 0,
        variableExpenses: 0,
        creditCardDebt: 0,
      });
    });
  });

  describe("balance calculation", () => {
    it("should correctly calculate balance with incomes and expenses", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "income", amountCLP: 500_000, createdAt: MONTH }),
        makeTransaction({ id: "t2", type: "expense", amountCLP: 200_000, createdAt: MONTH, expenseType: "fixed", paymentMethod: "cash" }),
      ]);
      const result = selectTransactionStats(state, MONTH);

      expect(result.balance).toBe(300_000);
      expect(result.totalIncomes).toBe(500_000);
      expect(result.totalExpenses).toBe(200_000);
    });

    it("should return a negative balance when expenses exceed incomes", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "income", amountCLP: 100_000, createdAt: MONTH }),
        makeTransaction({ id: "t2", type: "expense", amountCLP: 300_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "debit_card" }),
      ]);
      const result = selectTransactionStats(state, MONTH);

      expect(result.balance).toBe(-200_000);
    });

    it("should handle income-only transactions with no expenses", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "income", amountCLP: 800_000, createdAt: MONTH }),
      ]);
      const result = selectTransactionStats(state, MONTH);

      expect(result.balance).toBe(800_000);
      expect(result.totalExpenses).toBe(0);
    });

    it("should handle expense-only transactions with no incomes", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "expense", amountCLP: 50_000, createdAt: MONTH, expenseType: "fixed", paymentMethod: "cash" }),
      ]);
      const result = selectTransactionStats(state, MONTH);

      expect(result.balance).toBe(-50_000);
      expect(result.totalIncomes).toBe(0);
    });
  });

  describe("expense breakdown", () => {
    it("should correctly calculate fixed expenses", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "expense", amountCLP: 300_000, createdAt: MONTH, expenseType: "fixed", paymentMethod: "cash" }),
        makeTransaction({ id: "t2", type: "expense", amountCLP: 50_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "cash" }),
      ]);
      const result = selectTransactionStats(state, MONTH);

      expect(result.fixedExpenses).toBe(300_000);
    });

    it("should correctly calculate variable expenses", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "expense", amountCLP: 300_000, createdAt: MONTH, expenseType: "fixed", paymentMethod: "cash" }),
        makeTransaction({ id: "t2", type: "expense", amountCLP: 50_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "cash" }),
        makeTransaction({ id: "t3", type: "expense", amountCLP: 20_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "debit_card" }),
      ]);
      const result = selectTransactionStats(state, MONTH);

      expect(result.variableExpenses).toBe(70_000);
    });

    it("should correctly calculate credit card debt", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "expense", amountCLP: 100_000, createdAt: MONTH, expenseType: "fixed", paymentMethod: "credit_card" }),
        makeTransaction({ id: "t2", type: "expense", amountCLP: 40_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "credit_card" }),
        makeTransaction({ id: "t3", type: "expense", amountCLP: 20_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "cash" }),
      ]);
      const result = selectTransactionStats(state, MONTH);

      expect(result.creditCardDebt).toBe(140_000);
    });

    it("should return 0 for creditCardDebt when no payments were made by credit card", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "expense", amountCLP: 50_000, createdAt: MONTH, expenseType: "fixed", paymentMethod: "cash" }),
      ]);
      const result = selectTransactionStats(state, MONTH);

      expect(result.creditCardDebt).toBe(0);
    });
  });

  describe("month filtering", () => {
    it("should ignore transactions from other months in all calculations", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "income", amountCLP: 999_999, createdAt: OTHER_MONTH }),
        makeTransaction({ id: "t2", type: "expense", amountCLP: 999_999, createdAt: OTHER_MONTH, expenseType: "fixed", paymentMethod: "credit_card" }),
        makeTransaction({ id: "t3", type: "income", amountCLP: 100_000, createdAt: MONTH }),
      ]);
      const result = selectTransactionStats(state, MONTH);

      expect(result.totalIncomes).toBe(100_000);
      expect(result.totalExpenses).toBe(0);
      expect(result.creditCardDebt).toBe(0);
    });
  });
});

// ─── selectCategoryStats ──────────────────────────────────────────────────────

describe("selectCategoryStats", () => {
  describe("when there is no data", () => {
    it("should return an empty array when there are no transactions", () => {
      const state = buildState([]);
      const result = selectCategoryStats(state, MONTH);

      expect(result).toEqual([]);
    });

    it("should return an empty array when there are no expenses in the selected month", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "income", amountCLP: 500_000, createdAt: MONTH }),
      ]);
      const result = selectCategoryStats(state, MONTH);

      expect(result).toEqual([]);
    });

    it("should return an empty array when expenses belong to a different month", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "expense", amountCLP: 50_000, createdAt: OTHER_MONTH, expenseType: "fixed", paymentMethod: "cash", expenseCategory: "FOOD" }),
      ]);
      const result = selectCategoryStats(state, MONTH);

      expect(result).toEqual([]);
    });
  });

  describe("grouping by category", () => {
    it("should group and sum expenses from the same category", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "expense", amountCLP: 30_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "cash", expenseCategory: "FOOD" }),
        makeTransaction({ id: "t2", type: "expense", amountCLP: 20_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "cash", expenseCategory: "FOOD" }),
      ]);
      const result = selectCategoryStats(state, MONTH);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ name: "FOOD", value: 50_000 });
    });

    it("should return one entry per distinct category", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "expense", amountCLP: 30_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "cash", expenseCategory: "FOOD" }),
        makeTransaction({ id: "t2", type: "expense", amountCLP: 50_000, createdAt: MONTH, expenseType: "fixed", paymentMethod: "cash", expenseCategory: "RENT" }),
        makeTransaction({ id: "t3", type: "expense", amountCLP: 15_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "cash", expenseCategory: "TRANSPORT" }),
      ]);
      const result = selectCategoryStats(state, MONTH);

      expect(result).toHaveLength(3);
      const names = result.map((r) => r.name);
      expect(names).toContain("FOOD");
      expect(names).toContain("RENT");
      expect(names).toContain("TRANSPORT");
    });

    it("should fall back to 'OTHERS' when an expense has no category", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "expense", amountCLP: 10_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "cash" }),
      ]);
      const result = selectCategoryStats(state, MONTH);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("OTHERS");
      expect(result[0].value).toBe(10_000);
    });

    it("should ignore income transactions even when they have a category", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "income", amountCLP: 500_000, createdAt: MONTH, expenseCategory: "FOOD" }),
        makeTransaction({ id: "t2", type: "expense", amountCLP: 20_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "cash", expenseCategory: "FOOD" }),
      ]);
      const result = selectCategoryStats(state, MONTH);

      expect(result).toHaveLength(1);
      expect(result[0].value).toBe(20_000);
    });

    it("should ignore expenses from other months when grouping categories", () => {
      const state = buildState([
        makeTransaction({ id: "t1", type: "expense", amountCLP: 999_000, createdAt: OTHER_MONTH, expenseType: "fixed", paymentMethod: "cash", expenseCategory: "RENT" }),
        makeTransaction({ id: "t2", type: "expense", amountCLP: 15_000, createdAt: MONTH, expenseType: "variable", paymentMethod: "cash", expenseCategory: "TRANSPORT" }),
      ]);
      const result = selectCategoryStats(state, MONTH);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ name: "TRANSPORT", value: 15_000 });
    });
  });
});
