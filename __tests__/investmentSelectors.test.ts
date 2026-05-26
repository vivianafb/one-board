import {
  selectPortfolioValue,
  selectPortfolioInvested,
  selectFilteredItems,
} from "@/features/investments/selectors";
import type { InvestmentStore } from "@/features/investments/store";
import type { Investment } from "@/types/finance";

// USD_TO_CLP is 1000 (private constant in selectors.ts)
const USD_TO_CLP = 1000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildStore(items: Investment[]): InvestmentStore {
  return {
    items,
    status: "idle",
    error: null,
    actions: {} as InvestmentStore["actions"],
  };
}

function makeInvestment(overrides: Partial<Investment> & Pick<Investment, "currency">): Investment {
  return {
    id: crypto.randomUUID(),
    name: "Test Investment",
    type: "ETF",
    provider: "Fintual",
    investedAmount: 100,
    currentValue: 120,
    createdAt: "2025-06-01",
    ...overrides,
  };
}

// ─── selectPortfolioValue ─────────────────────────────────────────────────────

describe("selectPortfolioValue", () => {
  test("debería retornar 0 cuando no hay inversiones", () => {
    expect(selectPortfolioValue(buildStore([]))).toBe(0);
  });

  test("debería retornar currentValue tal cual para inversiones en CLP", () => {
    const inv = makeInvestment({ currency: "CLP", currentValue: 500_000, investedAmount: 400_000 });
    expect(selectPortfolioValue(buildStore([inv]))).toBe(500_000);
  });

  test("debería convertir inversiones USD a CLP correctamente", () => {
    const inv = makeInvestment({ currency: "USD", currentValue: 200, investedAmount: 150 });
    expect(selectPortfolioValue(buildStore([inv]))).toBe(200 * USD_TO_CLP);
  });

  test("debería sumar correctamente inversiones en CLP y USD", () => {
    const clp = makeInvestment({ currency: "CLP", currentValue: 300_000, investedAmount: 250_000 });
    const usd = makeInvestment({ currency: "USD", currentValue: 100, investedAmount: 80 });
    const expected = 300_000 + 100 * USD_TO_CLP;
    expect(selectPortfolioValue(buildStore([clp, usd]))).toBe(expected);
  });

  test("debería retornar el valor correcto con una sola inversión en CLP", () => {
    const inv = makeInvestment({ currency: "CLP", currentValue: 1_000_000, investedAmount: 900_000 });
    expect(selectPortfolioValue(buildStore([inv]))).toBe(1_000_000);
  });

  test("debería retornar el valor correcto con una sola inversión en USD", () => {
    const inv = makeInvestment({ currency: "USD", currentValue: 50, investedAmount: 40 });
    expect(selectPortfolioValue(buildStore([inv]))).toBe(50 * USD_TO_CLP);
  });

  test("debería sumar correctamente cuando todas las inversiones son en USD", () => {
    const a = makeInvestment({ currency: "USD", currentValue: 100, investedAmount: 80 });
    const b = makeInvestment({ currency: "USD", currentValue: 200, investedAmount: 160 });
    expect(selectPortfolioValue(buildStore([a, b]))).toBe((100 + 200) * USD_TO_CLP);
  });

  test("debería sumar correctamente cuando todas las inversiones son en CLP", () => {
    const a = makeInvestment({ currency: "CLP", currentValue: 100_000, investedAmount: 80_000 });
    const b = makeInvestment({ currency: "CLP", currentValue: 250_000, investedAmount: 200_000 });
    expect(selectPortfolioValue(buildStore([a, b]))).toBe(350_000);
  });

  test("debería sumar múltiples inversiones mixtas correctamente", () => {
    const investments = [
      makeInvestment({ currency: "CLP", currentValue: 500_000, investedAmount: 400_000 }),
      makeInvestment({ currency: "USD", currentValue: 300, investedAmount: 250 }),
      makeInvestment({ currency: "CLP", currentValue: 200_000, investedAmount: 180_000 }),
      makeInvestment({ currency: "USD", currentValue: 50, investedAmount: 40 }),
    ];
    const expected = 500_000 + 300 * USD_TO_CLP + 200_000 + 50 * USD_TO_CLP;
    expect(selectPortfolioValue(buildStore(investments))).toBe(expected);
  });
});

// ─── selectPortfolioInvested ──────────────────────────────────────────────────

describe("selectPortfolioInvested", () => {
  test("debería retornar 0 cuando no hay inversiones", () => {
    expect(selectPortfolioInvested(buildStore([]))).toBe(0);
  });

  test("debería retornar investedAmount tal cual para inversiones en CLP", () => {
    const inv = makeInvestment({ currency: "CLP", investedAmount: 400_000, currentValue: 500_000 });
    expect(selectPortfolioInvested(buildStore([inv]))).toBe(400_000);
  });

  test("debería convertir inversiones USD a CLP correctamente", () => {
    const inv = makeInvestment({ currency: "USD", investedAmount: 150, currentValue: 200 });
    expect(selectPortfolioInvested(buildStore([inv]))).toBe(150 * USD_TO_CLP);
  });

  test("debería sumar correctamente inversiones en CLP y USD", () => {
    const clp = makeInvestment({ currency: "CLP", investedAmount: 250_000, currentValue: 300_000 });
    const usd = makeInvestment({ currency: "USD", investedAmount: 80, currentValue: 100 });
    const expected = 250_000 + 80 * USD_TO_CLP;
    expect(selectPortfolioInvested(buildStore([clp, usd]))).toBe(expected);
  });

  test("debería sumar correctamente cuando todas las inversiones son en USD", () => {
    const a = makeInvestment({ currency: "USD", investedAmount: 100, currentValue: 120 });
    const b = makeInvestment({ currency: "USD", investedAmount: 200, currentValue: 230 });
    expect(selectPortfolioInvested(buildStore([a, b]))).toBe((100 + 200) * USD_TO_CLP);
  });

  test("debería sumar correctamente cuando todas las inversiones son en CLP", () => {
    const a = makeInvestment({ currency: "CLP", investedAmount: 100_000, currentValue: 110_000 });
    const b = makeInvestment({ currency: "CLP", investedAmount: 300_000, currentValue: 320_000 });
    expect(selectPortfolioInvested(buildStore([a, b]))).toBe(400_000);
  });
});

// ─── selectFilteredItems ──────────────────────────────────────────────────────

describe("selectFilteredItems", () => {
  test("debería filtrar inversiones por mes seleccionado correctamente", () => {
    const june = makeInvestment({ currency: "CLP", createdAt: "2025-06-15" });
    const july = makeInvestment({ currency: "CLP", createdAt: "2025-07-01" });
    const selector = selectFilteredItems("2025-06");
    expect(selector(buildStore([june, july]))).toEqual([june]);
  });

  test("debería retornar todas las inversiones que coincidan con el mes", () => {
    const a = makeInvestment({ currency: "CLP", createdAt: "2025-06-01" });
    const b = makeInvestment({ currency: "USD", createdAt: "2025-06-30" });
    const other = makeInvestment({ currency: "CLP", createdAt: "2025-05-15" });
    const selector = selectFilteredItems("2025-06");
    const result = selector(buildStore([a, b, other]));
    expect(result).toHaveLength(2);
    expect(result).toContain(a);
    expect(result).toContain(b);
  });

  test("debería retornar un array vacío cuando no hay inversiones que coincidan con el mes", () => {
    const inv = makeInvestment({ currency: "CLP", createdAt: "2025-04-10" });
    const selector = selectFilteredItems("2025-06");
    expect(selector(buildStore([inv]))).toHaveLength(0);
  });

  test("debería retornar un array vacío cuando no hay inversiones", () => {
    const selector = selectFilteredItems("2025-06");
    expect(selector(buildStore([]))).toHaveLength(0);
  });

  test("debería devolver un selector distinto por cada mes pero con el mismo comportamiento", () => {
    const inv = makeInvestment({ currency: "USD", createdAt: "2025-08-20" });
    expect(selectFilteredItems("2025-08")(buildStore([inv]))).toHaveLength(1);
    expect(selectFilteredItems("2025-07")(buildStore([inv]))).toHaveLength(0);
  });
});
