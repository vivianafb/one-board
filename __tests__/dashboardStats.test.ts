import { buildDashboardStats, TransactionStats } from "@/features/dashboard/utils/dashboard-stats";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const buildStats = (overrides: Partial<TransactionStats> = {}): TransactionStats => ({
  balance: 0,
  fixedExpenses: 0,
  variableExpenses: 0,
  creditCardDebt: 0,
  ...overrides,
});

// ─── buildDashboardStats ──────────────────────────────────────────────────────

describe("buildDashboardStats", () => {
  describe("result structure", () => {
    it("should return exactly 4 stat cards", () => {
      const result = buildDashboardStats(buildStats());
      expect(result).toHaveLength(4);
    });

    it("should return cards in order: balance, fixed expenses, variable expenses, credit card debt", () => {
      const result = buildDashboardStats(buildStats());
      const titles = result.map((card) => card.title);

      expect(titles).toEqual([
        "Balance Mensual",
        "Gastos Fijos",
        "Gastos Variables",
        "Deuda Tarjeta",
      ]);
    });

    it("should include icon, description and amountClass on every card", () => {
      const result = buildDashboardStats(buildStats());

      result.forEach((card) => {
        expect(card.icon).toBeDefined();
        expect(typeof card.description).toBe("string");
        expect(card.description.length).toBeGreaterThan(0);
        expect(typeof card.amountClass).toBe("string");
        expect(card.amountClass.length).toBeGreaterThan(0);
      });
    });
  });

  describe("value mapping", () => {
    it("should assign the correct value to each card", () => {
      const stats = buildStats({
        balance: 300_000,
        fixedExpenses: 150_000,
        variableExpenses: 80_000,
        creditCardDebt: 40_000,
      });
      const result = buildDashboardStats(stats);

      expect(result[0].value).toBe(300_000);
      expect(result[1].value).toBe(150_000);
      expect(result[2].value).toBe(80_000);
      expect(result[3].value).toBe(40_000);
    });

    it("should handle all values being zero", () => {
      const result = buildDashboardStats(buildStats());

      result.forEach((card) => {
        expect(card.value).toBe(0);
      });
    });
  });

  describe("dynamic balance styling", () => {
    it("should apply income style when balance is positive", () => {
      const result = buildDashboardStats(buildStats({ balance: 100_000 }));
      const balanceCard = result[0];

      expect(balanceCard.amountClass).toBe("ob-amount-income");
      expect(balanceCard.iconColor).toBe("text-[var(--income)]");
    });

    it("should apply expense style when balance is negative", () => {
      const result = buildDashboardStats(buildStats({ balance: -50_000 }));
      const balanceCard = result[0];

      expect(balanceCard.amountClass).toBe("ob-amount-expense");
      expect(balanceCard.iconColor).toBe("text-[var(--expense)]");
    });

    it("should apply income style when balance is exactly zero", () => {
      const result = buildDashboardStats(buildStats({ balance: 0 }));
      const balanceCard = result[0];

      expect(balanceCard.amountClass).toBe("ob-amount-income");
      expect(balanceCard.iconColor).toBe("text-[var(--income)]");
    });
  });

  describe("fixed styles on other cards", () => {
    it("should keep expense style on fixed expenses regardless of value", () => {
      const resultHigh = buildDashboardStats(buildStats({ fixedExpenses: 999_999 }));
      const resultZero = buildDashboardStats(buildStats({ fixedExpenses: 0 }));

      expect(resultHigh[1].amountClass).toBe("ob-amount-expense");
      expect(resultZero[1].amountClass).toBe("ob-amount-expense");
    });

    it("should keep expense style on variable expenses regardless of value", () => {
      const resultHigh = buildDashboardStats(buildStats({ variableExpenses: 999_999 }));
      const resultZero = buildDashboardStats(buildStats({ variableExpenses: 0 }));

      expect(resultHigh[2].amountClass).toBe("ob-amount-expense");
      expect(resultZero[2].amountClass).toBe("ob-amount-expense");
    });

    it("should keep neutral style on credit card debt regardless of value", () => {
      const resultHigh = buildDashboardStats(buildStats({ creditCardDebt: 999_999 }));
      const resultZero = buildDashboardStats(buildStats({ creditCardDebt: 0 }));

      expect(resultHigh[3].amountClass).toBe("ob-amount-neutral");
      expect(resultZero[3].amountClass).toBe("ob-amount-neutral");
    });
  });
});
