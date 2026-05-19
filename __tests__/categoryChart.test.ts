import { computeChartStats, CategoryRawItem } from "@/features/dashboard/utils/category-chart";
import { CHART_COLORS } from "@/lib/constants";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const item = (name: string, value: number): CategoryRawItem => ({ name, value });

// ─── computeChartStats ────────────────────────────────────────────────────────

describe("computeChartStats", () => {
  describe("when there is no data", () => {
    it("should return all totals as zero when both arrays are empty", () => {
      const result = computeChartStats([], []);

      expect(result.totalCurrent).toBe(0);
      expect(result.totalPrev).toBe(0);
      expect(result.changePercent).toBe(0);
      expect(result.data).toEqual([]);
    });

    it("should return empty data when rawData is empty even if previous data exists", () => {
      const result = computeChartStats([], [item("FOOD", 50_000)]);

      expect(result.data).toEqual([]);
      expect(result.totalCurrent).toBe(0);
      expect(result.totalPrev).toBe(50_000);
    });
  });

  describe("totals calculation", () => {
    it("should correctly sum all values from rawData", () => {
      const result = computeChartStats(
        [item("FOOD", 30_000), item("RENT", 150_000), item("TRANSPORT", 20_000)],
        []
      );

      expect(result.totalCurrent).toBe(200_000);
    });

    it("should correctly sum all values from prevRawData", () => {
      const result = computeChartStats(
        [],
        [item("FOOD", 25_000), item("RENT", 140_000)]
      );

      expect(result.totalPrev).toBe(165_000);
    });
  });

  describe("changePercent calculation", () => {
    it("should return 0 when there is no previous month data", () => {
      const result = computeChartStats([item("FOOD", 100_000)], []);

      expect(result.changePercent).toBe(0);
    });

    it("should calculate a positive increase relative to the previous month", () => {
      const result = computeChartStats(
        [item("FOOD", 150_000)],
        [item("FOOD", 100_000)]
      );

      expect(result.changePercent).toBe(50);
    });

    it("should calculate a negative decrease relative to the previous month", () => {
      const result = computeChartStats(
        [item("FOOD", 80_000)],
        [item("FOOD", 100_000)]
      );

      expect(result.changePercent).toBe(-20);
    });

    it("should return 0 when current spending equals previous month", () => {
      const result = computeChartStats(
        [item("FOOD", 100_000)],
        [item("FOOD", 100_000)]
      );

      expect(result.changePercent).toBe(0);
    });

    it("should return 0 for changePercent when totalPrev is zero even if current data exists", () => {
      const result = computeChartStats([item("FOOD", 50_000)], []);

      expect(result.changePercent).toBe(0);
    });
  });

  describe("item enrichment (fill, label, percentage)", () => {
    it("should assign the first color to the first item", () => {
      const result = computeChartStats([item("FOOD", 100_000)], []);

      expect(result.data[0].fill).toBe(CHART_COLORS[0]);
    });

    it("should assign consecutive colors to consecutive items", () => {
      const raw = [
        item("FOOD", 10_000),
        item("RENT", 10_000),
        item("TRANSPORT", 10_000),
      ];
      const result = computeChartStats(raw, []);

      expect(result.data[0].fill).toBe(CHART_COLORS[0]);
      expect(result.data[1].fill).toBe(CHART_COLORS[1]);
      expect(result.data[2].fill).toBe(CHART_COLORS[2]);
    });

    it("should cycle colors when there are more items than available colors", () => {
      const raw = Array.from({ length: CHART_COLORS.length + 1 }, (_, i) =>
        item("FOOD", 1000 * (i + 1))
      );
      const result = computeChartStats(raw, []);

      expect(result.data[CHART_COLORS.length].fill).toBe(CHART_COLORS[0]);
    });

    it("should translate the FOOD category to its display label", () => {
      const result = computeChartStats([item("FOOD", 10_000)], []);

      expect(result.data[0].label).toBe("Comida");
    });

    it("should translate the RENT category to its display label", () => {
      const result = computeChartStats([item("RENT", 10_000)], []);

      expect(result.data[0].label).toBe("Alquiler");
    });

    it("should return undefined as label for a category key not present in the map", () => {
      // formatExpenseCategory only returns '—' for undefined/null;
      // a key not present in EXPENSE_CATEGORY_OPTIONS produces undefined
      const result = computeChartStats([item("UNKNOWN_CATEGORY", 10_000)], []);

      expect(result.data[0].label).toBeUndefined();
    });

    it("should calculate 100% for a single item", () => {
      const result = computeChartStats([item("FOOD", 50_000)], []);

      expect(result.data[0].percentage).toBe(100);
    });

    it("should calculate correct percentages for multiple items", () => {
      const result = computeChartStats(
        [item("FOOD", 25_000), item("RENT", 75_000)],
        []
      );

      expect(result.data[0].percentage).toBe(25);
      expect(result.data[1].percentage).toBe(75);
    });

    it("should return 0 percentage for all items when the total is zero", () => {
      const result = computeChartStats(
        [item("FOOD", 0), item("RENT", 0)],
        []
      );

      result.data.forEach((d) => expect(d.percentage).toBe(0));
    });

    it("should preserve the original name and value on each enriched item", () => {
      const result = computeChartStats([item("SUPERMARKET", 45_000)], []);

      expect(result.data[0].name).toBe("SUPERMARKET");
      expect(result.data[0].value).toBe(45_000);
    });
  });
});
