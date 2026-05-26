import { calculateInvestmentPerformance } from "@/features/investments/utils/performance";
import type { Investment, InvestmentPeriod } from "@/types/finance";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makePeriod = (overrides: Partial<InvestmentPeriod> = {}): InvestmentPeriod => ({
  periodId: "2025-01",
  label: "Enero 2025",
  startValue: 100_000,
  endValue: 110_000,
  ...overrides,
});

const makeInvestment = (overrides: Partial<Investment> = {}): Investment => ({
  id: "inv-1",
  name: "Test ETF",
  type: "ETF",
  provider: "Fintual",
  currency: "CLP",
  investedAmount: 100_000,
  currentValue: 120_000,
  createdAt: "2025-01",
  ...overrides,
});

// ─── calculateInvestmentPerformance ──────────────────────────────────────────

describe("calculateInvestmentPerformance", () => {
  describe("gainLoss and returnPercent (overall)", () => {
    it("should calculate a positive gain when currentValue exceeds investedAmount", () => {
      const inv = makeInvestment({ investedAmount: 100_000, currentValue: 120_000 });
      const result = calculateInvestmentPerformance(inv, null);

      expect(result.gainLoss).toBe(20_000);
      expect(result.returnPercent).toBe(20);
      expect(result.isGain).toBe(true);
    });

    it("should calculate a negative loss when currentValue is less than investedAmount", () => {
      const inv = makeInvestment({ investedAmount: 100_000, currentValue: 80_000 });
      const result = calculateInvestmentPerformance(inv, null);

      expect(result.gainLoss).toBe(-20_000);
      expect(result.returnPercent).toBe(-20);
      expect(result.isGain).toBe(false);
    });

    it("should return gainLoss 0 and isGain true when the investment breaks even", () => {
      const inv = makeInvestment({ investedAmount: 100_000, currentValue: 100_000 });
      const result = calculateInvestmentPerformance(inv, null);

      expect(result.gainLoss).toBe(0);
      expect(result.returnPercent).toBe(0);
      expect(result.isGain).toBe(true);
    });

    it("should return returnPercent 0 when investedAmount is zero", () => {
      const inv = makeInvestment({ investedAmount: 0, currentValue: 50_000 });
      const result = calculateInvestmentPerformance(inv, null);

      expect(result.returnPercent).toBe(0);
      expect(result.gainLoss).toBe(50_000);
    });
  });

  describe("period when periodId is null (overall view)", () => {
    it("should return a period with label 'Total hasta la fecha'", () => {
      const inv = makeInvestment({ investedAmount: 100_000, currentValue: 130_000 });
      const result = calculateInvestmentPerformance(inv, null);

      expect(result.period).not.toBeNull();
      expect(result.period?.label).toBe("Total hasta la fecha");
    });

    it("should correctly calculate gain and percent for the overall period", () => {
      const inv = makeInvestment({ investedAmount: 100_000, currentValue: 130_000 });
      const result = calculateInvestmentPerformance(inv, null);

      expect(result.period?.gain).toBe(30_000);
      expect(result.period?.percent).toBe(30);
    });

    it("should return period.percent 0 when investedAmount is zero to avoid division by zero", () => {
      const inv = makeInvestment({ investedAmount: 0, currentValue: 0 });
      const result = calculateInvestmentPerformance(inv, null);

      expect(result.period?.percent).toBe(0);
    });
  });

  describe("period when periodId points to a specific period", () => {
    it("should return the correct period data when the periodId exists", () => {
      const inv = makeInvestment({
        periods: [makePeriod({ periodId: "2025-01", label: "Enero 2025", startValue: 100_000, endValue: 115_000 })],
      });
      const result = calculateInvestmentPerformance(inv, "2025-01");

      expect(result.period).not.toBeNull();
      expect(result.period?.label).toBe("Enero 2025");
      expect(result.period?.gain).toBe(15_000);
      expect(result.period?.percent).toBe(15);
    });

    it("should calculate a negative gain for a period where the value dropped", () => {
      const inv = makeInvestment({
        periods: [makePeriod({ periodId: "2025-02", startValue: 120_000, endValue: 100_000 })],
      });
      const result = calculateInvestmentPerformance(inv, "2025-02");

      expect(result.period?.gain).toBe(-20_000);
      expect(result.period?.percent).toBeCloseTo(-16.67, 1);
    });

    it("should return null period when the periodId does not exist in the investment", () => {
      const inv = makeInvestment({
        periods: [makePeriod({ periodId: "2025-01" })],
      });
      const result = calculateInvestmentPerformance(inv, "2025-99");

      expect(result.period).toBeNull();
    });

    it("should return null period when the investment has no periods and a periodId is provided", () => {
      const inv = makeInvestment({ periods: undefined });
      const result = calculateInvestmentPerformance(inv, "2025-01");

      expect(result.period).toBeNull();
    });

    it("should return null period when the periods array is empty", () => {
      const inv = makeInvestment({ periods: [] });
      const result = calculateInvestmentPerformance(inv, "2025-01");

      expect(result.period).toBeNull();
    });

    it("should return period.percent 0 when the period startValue is zero", () => {
      const inv = makeInvestment({
        periods: [makePeriod({ periodId: "2025-01", startValue: 0, endValue: 50_000 })],
      });
      const result = calculateInvestmentPerformance(inv, "2025-01");

      expect(result.period?.percent).toBe(0);
    });

    it("should find the correct period when multiple periods exist", () => {
      const inv = makeInvestment({
        periods: [
          makePeriod({ periodId: "2025-01", label: "Enero", startValue: 100_000, endValue: 105_000 }),
          makePeriod({ periodId: "2025-02", label: "Febrero", startValue: 105_000, endValue: 112_000 }),
          makePeriod({ periodId: "2025-03", label: "Marzo", startValue: 112_000, endValue: 108_000 }),
        ],
      });
      const result = calculateInvestmentPerformance(inv, "2025-02");

      expect(result.period?.label).toBe("Febrero");
      expect(result.period?.gain).toBe(7_000);
    });
  });

  describe("isGain reflects overall performance, not the selected period", () => {
    it("should mark isGain true even when the selected period has a negative gain", () => {
      const inv = makeInvestment({
        investedAmount: 100_000,
        currentValue: 130_000,
        periods: [makePeriod({ periodId: "2025-01", startValue: 130_000, endValue: 120_000 })],
      });
      const result = calculateInvestmentPerformance(inv, "2025-01");

      expect(result.isGain).toBe(true);
      expect(result.period?.gain).toBe(-10_000);
    });
  });
});
