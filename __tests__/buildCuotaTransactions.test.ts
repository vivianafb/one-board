import { buildCuotaTransactions, type CuotaParams } from "@/features/transactions/utils/transactions-table";

function baseParams(overrides: Partial<CuotaParams> = {}): CuotaParams {
  return {
    itemName: "Celular Samsung",
    totalAmount: 120_000,
    cuotaCount: 12,
    baseDate: "2025-01-15",
    expenseType: "variable",
    expenseCategory: "OTHERS",
    paymentMethod: "credit",
    ...overrides,
  };
}

// ─── Conteo ───────────────────────────────────────────────────────────────────

describe("buildCuotaTransactions - conteo de transacciones", () => {
  test("debería generar 12 transacciones para 12 cuotas", () => {
    const result = buildCuotaTransactions(baseParams({ cuotaCount: 12 }));
    expect(result).toHaveLength(12);
  });

  test("debería generar 1 transacción para 1 cuota", () => {
    const result = buildCuotaTransactions(baseParams({ cuotaCount: 1 }));
    expect(result).toHaveLength(1);
  });

  test("debería generar 24 transacciones para 24 cuotas", () => {
    const result = buildCuotaTransactions(baseParams({ cuotaCount: 24 }));
    expect(result).toHaveLength(24);
  });
});

// ─── Numeración de cuotas ─────────────────────────────────────────────────────

describe("buildCuotaTransactions - numeración de cuotas", () => {
  test("debería incrementar el número de cuota correctamente", () => {
    const result = buildCuotaTransactions(baseParams({ cuotaCount: 12 }));
    result.forEach((t, i) => {
      expect(t.installment?.current).toBe(i + 1);
    });
  });

  test("debería asignar installment.total igual al número de cuotas solicitado", () => {
    const result = buildCuotaTransactions(baseParams({ cuotaCount: 12 }));
    result.forEach((t) => {
      expect(t.installment?.total).toBe(12);
    });
  });

  test("debería tener installment.current=1 e installment.total=1 para 1 cuota", () => {
    const [single] = buildCuotaTransactions(baseParams({ cuotaCount: 1 }));
    expect(single.installment?.current).toBe(1);
    expect(single.installment?.total).toBe(1);
  });

  test("debería etiquetar la descripción con cuota X/N correctamente", () => {
    const result = buildCuotaTransactions(baseParams({ cuotaCount: 3, itemName: "Notebook" }));
    expect(result[0].description).toBe("Notebook (cuota 1/3)");
    expect(result[1].description).toBe("Notebook (cuota 2/3)");
    expect(result[2].description).toBe("Notebook (cuota 3/3)");
  });
});

// ─── groupId consistente ──────────────────────────────────────────────────────

describe("buildCuotaTransactions - groupId", () => {
  test("debería usar el mismo groupId en todas las cuotas", () => {
    const result = buildCuotaTransactions(baseParams({ cuotaCount: 6 }));
    const groupId = result[0].installment?.groupId;
    expect(groupId).toBeTruthy();
    result.forEach((t) => {
      expect(t.installment?.groupId).toBe(groupId);
    });
  });

  test("debería generar groupIds distintos entre dos lotes de cuotas", () => {
    const a = buildCuotaTransactions(baseParams());
    const b = buildCuotaTransactions(baseParams());
    expect(a[0].installment?.groupId).not.toBe(b[0].installment?.groupId);
  });
});

// ─── Montos ───────────────────────────────────────────────────────────────────

describe("buildCuotaTransactions - cálculo de monto por cuota", () => {
  test("debería dividir el monto exacto en partes iguales", () => {
    const result = buildCuotaTransactions(baseParams({ totalAmount: 120_000, cuotaCount: 12 }));
    result.forEach((t) => {
      expect(t.amountCLP).toBe(10_000);
    });
  });

  test("debería redondear al entero más cercano cuando el monto no divide exactamente", () => {
    // 100 / 3 = 33.333... → Math.round → 33
    const result = buildCuotaTransactions(baseParams({ totalAmount: 100, cuotaCount: 3 }));
    result.forEach((t) => {
      expect(t.amountCLP).toBe(33);
    });
  });

  test("debería asignar monto total completo cuando es 1 cuota", () => {
    const result = buildCuotaTransactions(baseParams({ totalAmount: 99_999, cuotaCount: 1 }));
    expect(result[0].amountCLP).toBe(99_999);
  });

  test("debería asignar monto correcto para 24 cuotas de $240,000", () => {
    const result = buildCuotaTransactions(baseParams({ totalAmount: 240_000, cuotaCount: 24 }));
    result.forEach((t) => {
      expect(t.amountCLP).toBe(10_000);
    });
  });
});

// ─── Offsets de fecha ─────────────────────────────────────────────────────────

describe("buildCuotaTransactions - offsets de mes", () => {
  test("debería asignar el mes base a la primera cuota", () => {
    const result = buildCuotaTransactions(baseParams({ baseDate: "2025-01-15" }));
    expect(result[0].createdAt).toBe("2025-01-15");
  });

  test("debería avanzar un mes por cada cuota consecutiva", () => {
    const result = buildCuotaTransactions(
      baseParams({ baseDate: "2025-01-15", cuotaCount: 4 })
    );
    expect(result[0].createdAt).toBe("2025-01-15");
    expect(result[1].createdAt).toBe("2025-02-15");
    expect(result[2].createdAt).toBe("2025-03-15");
    expect(result[3].createdAt).toBe("2025-04-15");
  });

  test("debería pasar al año siguiente cuando empieza en diciembre", () => {
    const result = buildCuotaTransactions(
      baseParams({ baseDate: "2025-12-01", cuotaCount: 3 })
    );
    expect(result[0].createdAt).toBe("2025-12-01");
    expect(result[1].createdAt).toBe("2026-01-01");
    expect(result[2].createdAt).toBe("2026-02-01");
  });

  test("debería manejar 12 cuotas comenzando en diciembre cubriendo todo el año siguiente", () => {
    const result = buildCuotaTransactions(
      baseParams({ baseDate: "2025-12-15", cuotaCount: 12 })
    );
    expect(result[0].createdAt).toBe("2025-12-15");
    expect(result[11].createdAt).toBe("2026-11-15");
  });
});

// ─── Campos de tipo y pago ────────────────────────────────────────────────────

describe("buildCuotaTransactions - campos heredados", () => {
  test("debería asignar type='expense' a todas las cuotas", () => {
    const result = buildCuotaTransactions(baseParams());
    result.forEach((t) => {
      expect(t.type).toBe("expense");
    });
  });

  test("debería heredar paymentMethod, expenseType y expenseCategory en todas las cuotas", () => {
    const params = baseParams({
      paymentMethod: "debit",
      expenseType: "fixed",
      expenseCategory: "RENT",
    });
    const result = buildCuotaTransactions(params);
    result.forEach((t) => {
      expect(t.paymentMethod).toBe("debit");
      expect(t.expenseType).toBe("fixed");
      expect(t.expenseCategory).toBe("RENT");
    });
  });

  test("debería asignar IDs únicos a cada transacción", () => {
    const result = buildCuotaTransactions(baseParams({ cuotaCount: 6 }));
    const ids = result.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(6);
  });

  test("debería conservar el itemName en installment.itemName de cada cuota", () => {
    const result = buildCuotaTransactions(baseParams({ itemName: "Smart TV" }));
    result.forEach((t) => {
      expect(t.installment?.itemName).toBe("Smart TV");
    });
  });
});
