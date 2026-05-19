import { selectTotalSaved, selectHistoricalSavings } from "@/features/savings/selectors";
import type { SavingsState, SavingGoal, MonthlySaving } from "@/types/finance";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const buildState = (
  goals: SavingGoal[] = [],
  monthlyHistory: MonthlySaving[] = []
): SavingsState => ({ goals, monthlyHistory });

const makeGoal = (overrides: Partial<SavingGoal> = {}): SavingGoal => ({
  id: "g1",
  name: "Fondo de emergencia",
  targetAmount: 500_000,
  currentAmount: 100_000,
  currency: "CLP",
  category: "EMERGENCY_FUND",
  createdAt: "2025-01-01",
  ...overrides,
});

const makeMonthlySaving = (overrides: Partial<MonthlySaving> = {}): MonthlySaving => ({
  id: "ms1",
  monthId: "2025-01",
  amount: 50_000,
  currency: "CLP",
  createdAt: "2025-01-31",
  ...overrides,
});

// ─── selectTotalSaved ─────────────────────────────────────────────────────────

describe("selectTotalSaved", () => {
  it("should return 0 when there are no savings goals", () => {
    const state = buildState([]);
    expect(selectTotalSaved(state)).toBe(0);
  });

  it("should return the currentAmount of a single goal", () => {
    const state = buildState([makeGoal({ currentAmount: 200_000 })]);
    expect(selectTotalSaved(state)).toBe(200_000);
  });

  it("should sum the currentAmount across all goals", () => {
    const state = buildState([
      makeGoal({ id: "g1", currentAmount: 100_000 }),
      makeGoal({ id: "g2", currentAmount: 250_000 }),
      makeGoal({ id: "g3", currentAmount: 75_000 }),
    ]);
    expect(selectTotalSaved(state)).toBe(425_000);
  });

  it("should return 0 when all goals have currentAmount of zero", () => {
    const state = buildState([
      makeGoal({ id: "g1", currentAmount: 0 }),
      makeGoal({ id: "g2", currentAmount: 0 }),
    ]);
    expect(selectTotalSaved(state)).toBe(0);
  });

  it("should sum only currentAmount and ignore targetAmount", () => {
    const state = buildState([
      makeGoal({ id: "g1", currentAmount: 30_000, targetAmount: 1_000_000 }),
      makeGoal({ id: "g2", currentAmount: 20_000, targetAmount: 500_000 }),
    ]);
    expect(selectTotalSaved(state)).toBe(50_000);
  });

  it("should not be affected by the monthly history", () => {
    const state = buildState(
      [makeGoal({ currentAmount: 100_000 })],
      [makeMonthlySaving({ amount: 999_999 })]
    );
    expect(selectTotalSaved(state)).toBe(100_000);
  });
});

// ─── selectHistoricalSavings ──────────────────────────────────────────────────

describe("selectHistoricalSavings", () => {
  it("should return 0 when the monthly history is empty", () => {
    const state = buildState([], []);
    expect(selectHistoricalSavings(state)).toBe(0);
  });

  it("should return the amount of a single monthly record", () => {
    const state = buildState([], [makeMonthlySaving({ amount: 80_000 })]);
    expect(selectHistoricalSavings(state)).toBe(80_000);
  });

  it("should sum the amount across all monthly records", () => {
    const state = buildState([], [
      makeMonthlySaving({ id: "ms1", amount: 50_000 }),
      makeMonthlySaving({ id: "ms2", amount: 75_000 }),
      makeMonthlySaving({ id: "ms3", amount: 25_000 }),
    ]);
    expect(selectHistoricalSavings(state)).toBe(150_000);
  });

  it("should return 0 when all monthly records have an amount of zero", () => {
    const state = buildState([], [
      makeMonthlySaving({ id: "ms1", amount: 0 }),
      makeMonthlySaving({ id: "ms2", amount: 0 }),
    ]);
    expect(selectHistoricalSavings(state)).toBe(0);
  });

  it("should sum records from different months without filtering by date", () => {
    const state = buildState([], [
      makeMonthlySaving({ id: "ms1", monthId: "2025-01", amount: 40_000 }),
      makeMonthlySaving({ id: "ms2", monthId: "2025-02", amount: 40_000 }),
      makeMonthlySaving({ id: "ms3", monthId: "2025-03", amount: 40_000 }),
    ]);
    expect(selectHistoricalSavings(state)).toBe(120_000);
  });

  it("should not be affected by savings goals", () => {
    const state = buildState(
      [makeGoal({ currentAmount: 999_999 })],
      [makeMonthlySaving({ amount: 30_000 })]
    );
    expect(selectHistoricalSavings(state)).toBe(30_000);
  });

  it("should sum records linked to different goals by goalId", () => {
    const state = buildState([], [
      makeMonthlySaving({ id: "ms1", goalId: "g1", amount: 60_000 }),
      makeMonthlySaving({ id: "ms2", goalId: "g2", amount: 90_000 }),
      makeMonthlySaving({ id: "ms3", goalId: undefined, amount: 20_000 }),
    ]);
    expect(selectHistoricalSavings(state)).toBe(170_000);
  });
});
