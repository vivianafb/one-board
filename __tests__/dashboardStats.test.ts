import { buildDashboardStats, DashboardStatsInput } from "@/features/dashboard/utils/dashboard-stats";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const buildInput = (overrides: Partial<DashboardStatsInput> = {}): DashboardStatsInput => ({
  totalIncomes: 0,
  totalExpenses: 0,
  balance: 0,
  portfolioValue: 0,
  portfolioInvested: 0,
  ...overrides,
});

// ─── buildDashboardStats ──────────────────────────────────────────────────────

describe("buildDashboardStats", () => {
  describe("result structure", () => {
    it("should return exactly 4 stat cards", () => {
      const result = buildDashboardStats(buildInput());
      expect(result).toHaveLength(4);
    });

    it("should return cards in order: ingresos, gastos, balance, portfolio", () => {
      const result = buildDashboardStats(buildInput());
      const titles = result.map((card) => card.title);

      expect(titles).toEqual([
        "Ingresos del mes",
        "Gastos del mes",
        "Balance mensual",
        "Portfolio",
      ]);
    });

    it("should include icon, description and amountClass on every card", () => {
      const result = buildDashboardStats(buildInput());

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
      const result = buildDashboardStats(
        buildInput({
          totalIncomes: 1_000_000,
          totalExpenses: 700_000,
          balance: 300_000,
          portfolioValue: 5_000_000,
          portfolioInvested: 4_500_000,
        })
      );

      expect(result[0].value).toBe(1_000_000); // ingresos
      expect(result[1].value).toBe(700_000);   // gastos
      expect(result[2].value).toBe(300_000);   // balance
      expect(result[3].value).toBe(5_000_000); // portfolio
    });

    it("should handle all values being zero", () => {
      const result = buildDashboardStats(buildInput());

      result.forEach((card) => {
        expect(card.value).toBe(0);
      });
    });
  });

  describe("ingresos card - fixed style", () => {
    it("should always have income style", () => {
      const result = buildDashboardStats(buildInput({ totalIncomes: 500_000 }));
      expect(result[0].amountClass).toBe("ob-amount-income");
      expect(result[0].iconColor).toBe("text-[var(--income)]");
    });
  });

  describe("gastos card - fixed style", () => {
    it("should always have expense style", () => {
      const result = buildDashboardStats(buildInput({ totalExpenses: 300_000 }));
      expect(result[1].amountClass).toBe("ob-amount-expense");
      expect(result[1].iconColor).toBe("text-[var(--expense)]");
    });
  });

  describe("balance card - dynamic styling", () => {
    it("should apply income style when balance is positive", () => {
      const result = buildDashboardStats(buildInput({ balance: 100_000 }));
      expect(result[2].amountClass).toBe("ob-amount-income");
      expect(result[2].iconColor).toBe("text-[var(--income)]");
    });

    it("should apply expense style when balance is negative", () => {
      const result = buildDashboardStats(buildInput({ balance: -50_000 }));
      expect(result[2].amountClass).toBe("ob-amount-expense");
      expect(result[2].iconColor).toBe("text-[var(--expense)]");
    });

    it("should apply income style when balance is exactly zero", () => {
      const result = buildDashboardStats(buildInput({ balance: 0 }));
      expect(result[2].amountClass).toBe("ob-amount-income");
      expect(result[2].iconColor).toBe("text-[var(--income)]");
    });
  });

  describe("portfolio card - dynamic styling", () => {
    it("should apply income style and positive description when gain > 0", () => {
      const result = buildDashboardStats(
        buildInput({ portfolioValue: 1_100_000, portfolioInvested: 1_000_000 })
      );
      const card = result[3];
      expect(card.amountClass).toBe("ob-amount-neutral");
      expect(card.iconColor).toBe("text-[var(--income)]");
      expect(card.description).toBe("+10.0% vs invertido");
      expect(card.descriptionClass).toBe("text-emerald-400");
    });

    it("should apply expense style and negative description when gain < 0", () => {
      const result = buildDashboardStats(
        buildInput({ portfolioValue: 900_000, portfolioInvested: 1_000_000 })
      );
      const card = result[3];
      expect(card.iconColor).toBe("text-[var(--expense)]");
      expect(card.description).toBe("-10.0% vs invertido");
      expect(card.descriptionClass).toBe("text-rose-400");
    });

    it("should show 0.0% when portfolioInvested is zero", () => {
      const result = buildDashboardStats(buildInput({ portfolioValue: 0, portfolioInvested: 0 }));
      expect(result[3].description).toBe("+0.0% vs invertido");
    });
  });
});
