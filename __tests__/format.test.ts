import {
  formatAmountCLP,
  formatAmountUSD,
  formatExpenseCategory,
  formatPaymentMethod,
  formatExpenseType,
  formatSavingGoalCategory,
} from "@/lib/format";

// ─── formatAmountCLP ──────────────────────────────────────────────────────────

describe("formatAmountCLP", () => {
  test("debería formatear montos CLP con separadores de miles", () => {
    const result = formatAmountCLP(1000);
    // Must contain the digits and the dot separator
    expect(result).toContain("1.000");
    expect(result).toContain("$");
  });

  test("debería formatear cero como $0", () => {
    const result = formatAmountCLP(0);
    expect(result).toContain("0");
    expect(result).toContain("$");
  });

  test("debería formatear montos negativos con signo negativo", () => {
    const result = formatAmountCLP(-500);
    expect(result).toContain("500");
    expect(result).toContain("-");
  });

  test("debería formatear montos grandes con separadores de miles", () => {
    const result = formatAmountCLP(1_000_000);
    expect(result).toContain("1.000.000");
    expect(result).toContain("$");
  });

  test("debería no incluir decimales en montos CLP", () => {
    const result = formatAmountCLP(1500);
    expect(result).not.toMatch(/[,\.]\d{2}$/);
  });

  test("debería formatear $10.000 correctamente", () => {
    const result = formatAmountCLP(10_000);
    expect(result).toContain("10.000");
  });
});

// ─── formatAmountUSD ──────────────────────────────────────────────────────────

describe("formatAmountUSD", () => {
  test("debería formatear montos USD con separadores de miles en coma", () => {
    const result = formatAmountUSD(1500);
    expect(result).toContain("1,500");
    expect(result).toContain("$");
  });

  test("debería formatear cero correctamente", () => {
    const result = formatAmountUSD(0);
    expect(result).toContain("0");
    expect(result).toContain("$");
  });

  test("debería formatear montos decimales con hasta 2 decimales", () => {
    const result = formatAmountUSD(1742.5);
    expect(result).toContain("1,742");
    expect(result).toContain(".5");
  });

  test("debería omitir decimales cuando el monto es entero", () => {
    const result = formatAmountUSD(500);
    expect(result).not.toContain(".");
    expect(result).toContain("500");
  });

  test("debería formatear dos decimales cuando el monto los requiere", () => {
    // minimumFractionDigits:0 means trailing zeros are dropped, so 1742.5 → "$1,742.5"
    // Use a value with two significant decimal places to verify both digits are shown
    const result = formatAmountUSD(1742.55);
    expect(result).toBe("$1,742.55");
  });
});

// ─── formatExpenseCategory ────────────────────────────────────────────────────

describe("formatExpenseCategory", () => {
  test("debería retornar la etiqueta correcta para RENT", () => {
    expect(formatExpenseCategory("RENT")).toBe("Alquiler");
  });

  test("debería retornar la etiqueta correcta para FOOD", () => {
    expect(formatExpenseCategory("FOOD")).toBe("Comida");
  });

  test("debería retornar la etiqueta correcta para TRANSPORT", () => {
    expect(formatExpenseCategory("TRANSPORT")).toBe("Transporte");
  });

  test("debería retornar la etiqueta correcta para OTHERS", () => {
    expect(formatExpenseCategory("OTHERS")).toBe("Otros");
  });

  test("debería retornar la etiqueta correcta para SUPERMARKET", () => {
    expect(formatExpenseCategory("SUPERMARKET")).toBe("Supermercado");
  });

  test("debería retornar la etiqueta correcta para HEALTH", () => {
    expect(formatExpenseCategory("HEALTH")).toBe("Salud");
  });

  test("debería retornar fallback para categorías desconocidas", () => {
    // When category is unknown, formatExpenseCategory returns the raw key as fallback
    expect(formatExpenseCategory("UNKNOWN_CATEGORY")).toBe("UNKNOWN_CATEGORY");
  });

  test("debería retornar '—' cuando category es undefined", () => {
    expect(formatExpenseCategory(undefined)).toBe("—");
  });

  test("debería retornar '—' cuando category es string vacío", () => {
    expect(formatExpenseCategory("")).toBe("—");
  });
});

// ─── formatPaymentMethod ──────────────────────────────────────────────────────

describe("formatPaymentMethod", () => {
  test("debería retornar 'Efectivo' para cash", () => {
    expect(formatPaymentMethod("cash")).toBe("Efectivo");
  });

  test("debería retornar 'Tarjeta de débito' para debit_card", () => {
    expect(formatPaymentMethod("debit_card")).toBe("Tarjeta de débito");
  });

  test("debería retornar 'Tarjeta de crédito' para credit_card", () => {
    expect(formatPaymentMethod("credit_card")).toBe("Tarjeta de crédito");
  });

  test("debería retornar 'Transferencia bancaria' para bank_transfer", () => {
    expect(formatPaymentMethod("bank_transfer")).toBe("Transferencia bancaria");
  });
});

// ─── formatExpenseType ────────────────────────────────────────────────────────

describe("formatExpenseType", () => {
  test("debería retornar 'Fijo' para fixed", () => {
    expect(formatExpenseType("fixed")).toBe("Fijo");
  });

  test("debería retornar 'Variable' para variable", () => {
    expect(formatExpenseType("variable")).toBe("Variable");
  });

  test("debería retornar '—' cuando type es undefined", () => {
    expect(formatExpenseType(undefined)).toBe("—");
  });
});

// ─── formatSavingGoalCategory ─────────────────────────────────────────────────

describe("formatSavingGoalCategory", () => {
  test("debería retornar 'Fondo de emergencia' para EMERGENCY_FUND", () => {
    expect(formatSavingGoalCategory("EMERGENCY_FUND")).toBe("Fondo de emergencia");
  });

  test("debería retornar 'Viajes' para TRAVEL", () => {
    expect(formatSavingGoalCategory("TRAVEL")).toBe("Viajes");
  });

  test("debería retornar 'Hogar' para HOME", () => {
    expect(formatSavingGoalCategory("HOME")).toBe("Hogar");
  });

  test("debería retornar 'Jubilación' para RETIREMENT", () => {
    expect(formatSavingGoalCategory("RETIREMENT")).toBe("Jubilación");
  });

  test("debería retornar 'Otro' para OTHER", () => {
    expect(formatSavingGoalCategory("OTHER")).toBe("Otro");
  });

  test("debería retornar fallback para categorías desconocidas", () => {
    // TypeScript prevents this at compile time, but at runtime an unknown key returns undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(formatSavingGoalCategory("UNKNOWN" as any)).toBeUndefined();
  });
});
