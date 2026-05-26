import { selectInstallmentGroups } from "@/features/transactions/selectors";
import type { TransactionsStore } from "@/features/transactions/store";
import type { Transaction } from "@/types/finance";

// "Hoy" fijo para todos los tests: 2025-06-15 → todayMonth = "2025-06"
const TODAY = "2025-06-15T12:00:00.000Z";

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(TODAY));
});

afterEach(() => {
  jest.useRealTimers();
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildStore(items: Transaction[]): TransactionsStore {
  return {
    items,
    status: "idle",
    error: null,
    actions: {} as TransactionsStore["actions"],
  };
}

function makeCuota(
  overrides: Partial<Transaction> & {
    groupId: string;
    current: number;
    total: number;
    itemName?: string;
    createdAt: string;
    amountCLP?: number;
  }
): Transaction {
  const { groupId, current, total, itemName = "Item", createdAt, amountCLP = 10_000, ...rest } = overrides;
  return {
    id: crypto.randomUUID(),
    description: `${itemName} (cuota ${current}/${total})`,
    amountCLP,
    type: "expense",
    paymentMethod: "credit",
    expenseType: "variable",
    expenseCategory: "OTHERS",
    createdAt,
    installment: { groupId, itemName, current, total },
    ...rest,
  };
}

function buildGroup(
  groupId: string,
  itemName: string,
  months: string[],
  amountPerCuota = 10_000
): Transaction[] {
  const total = months.length;
  return months.map((createdAt, i) =>
    makeCuota({ groupId, current: i + 1, total, itemName, createdAt, amountCLP: amountPerCuota })
  );
}

// ─── Agrupación ───────────────────────────────────────────────────────────────

describe("selectInstallmentGroups - agrupación", () => {
  test("debería agrupar transacciones por groupId correctamente", () => {
    const gid = "group-a";
    const txs = buildGroup(gid, "Notebook", ["2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01"]);
    const result = selectInstallmentGroups(buildStore(txs));
    expect(result).toHaveLength(1);
    expect(result[0].groupId).toBe(gid);
    expect(result[0].itemName).toBe("Notebook");
  });

  test("debería retornar un grupo por cada groupId distinto", () => {
    const txsA = buildGroup("gid-a", "Celular", ["2025-05-01", "2025-07-01"]);
    const txsB = buildGroup("gid-b", "Notebook", ["2025-04-01", "2025-08-01"]);
    const result = selectInstallmentGroups(buildStore([...txsA, ...txsB]));
    expect(result).toHaveLength(2);
    const ids = result.map((g) => g.groupId);
    expect(ids).toContain("gid-a");
    expect(ids).toContain("gid-b");
  });
});

// ─── Cuotas pagadas ───────────────────────────────────────────────────────────

describe("selectInstallmentGroups - conteo de cuotas pagadas", () => {
  test("debería contar como pagadas las cuotas cuyo mes es anterior o igual al mes actual", () => {
    // todayMonth = "2025-06"
    // cuota 1 → 2025-04 (pagada), cuota 2 → 2025-05 (pagada), cuota 3 → 2025-06 (pagada), cuota 4 → 2025-07 (pendiente)
    const txs = buildGroup("g1", "TV", ["2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01"]);
    const [group] = selectInstallmentGroups(buildStore(txs));
    expect(group.paidCount).toBe(3);
  });

  test("debería contar el mes actual como pagado (monthId <= todayMonth)", () => {
    // cuota única en el mes actual
    const txs = buildGroup("g1", "Suscripción", ["2025-06-01"], 5_000);
    // no aparecería (pendingCount=0), así que usamos 2 cuotas: jun (paid) + jul (pending)
    const txs2 = buildGroup("g2", "Ítem", ["2025-06-01", "2025-07-01"]);
    const [group] = selectInstallmentGroups(buildStore(txs2));
    expect(group.paidCount).toBe(1);
  });
});

// ─── Cuotas pendientes ────────────────────────────────────────────────────────

describe("selectInstallmentGroups - conteo de cuotas pendientes", () => {
  test("debería contar correctamente las cuotas pendientes", () => {
    // 4 cuotas: 3 pagadas (≤ 2025-06), 1 pendiente (2025-07)
    const txs = buildGroup("g1", "Laptop", ["2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01"]);
    const [group] = selectInstallmentGroups(buildStore(txs));
    expect(group.pendingCount).toBe(1);
  });

  test("debería retornar pendingCount igual al total cuando todas las cuotas son futuras", () => {
    const txs = buildGroup("g1", "Refrigerador", ["2025-07-01", "2025-08-01", "2025-09-01"]);
    const [group] = selectInstallmentGroups(buildStore(txs));
    expect(group.pendingCount).toBe(3);
  });
});

// ─── Deuda restante ───────────────────────────────────────────────────────────

describe("selectInstallmentGroups - deuda restante", () => {
  test("debería calcular correctamente la deuda restante", () => {
    // 3 cuotas de $10.000, 2 pagadas → remaining = 1 × 10.000 = 10.000
    const txs = buildGroup("g1", "Tablet", ["2025-05-01", "2025-06-01", "2025-07-01"], 10_000);
    const [group] = selectInstallmentGroups(buildStore(txs));
    expect(group.remaining).toBe(10_000);
  });

  test("debería calcular correctamente la deuda restante con todas las cuotas pendientes", () => {
    // 4 cuotas de $25.000, todas futuras → remaining = 4 × 25.000
    const txs = buildGroup("g1", "Smart TV", ["2025-07-01", "2025-08-01", "2025-09-01", "2025-10-01"], 25_000);
    const [group] = selectInstallmentGroups(buildStore(txs));
    expect(group.remaining).toBe(100_000);
  });

  test("debería calcular totalOriginal como amountPerCuota × total", () => {
    const txs = buildGroup("g1", "Cámara", ["2025-05-01", "2025-06-01", "2025-07-01"], 15_000);
    const [group] = selectInstallmentGroups(buildStore(txs));
    expect(group.totalOriginal).toBe(45_000);
  });
});

// ─── Filtrado por pendingCount ────────────────────────────────────────────────

describe("selectInstallmentGroups - filtrado", () => {
  test("debería retornar solo grupos con cuotas pendientes", () => {
    // grupo A: totalmente pagado (todas ≤ 2025-06)
    const txsA = buildGroup("gid-paid", "Auriculares", ["2025-04-01", "2025-05-01", "2025-06-01"]);
    // grupo B: 1 cuota pendiente
    const txsB = buildGroup("gid-pending", "Mouse", ["2025-05-01", "2025-07-01"]);
    const result = selectInstallmentGroups(buildStore([...txsA, ...txsB]));
    expect(result).toHaveLength(1);
    expect(result[0].groupId).toBe("gid-pending");
  });

  test("debería excluir un grupo totalmente pagado", () => {
    // 2 cuotas, ambas en meses anteriores o iguales al mes actual
    const txs = buildGroup("g-done", "Teclado", ["2025-04-01", "2025-05-01"]);
    const result = selectInstallmentGroups(buildStore(txs));
    expect(result).toHaveLength(0);
  });

  test("debería retornar lista vacía cuando no hay transacciones", () => {
    const result = selectInstallmentGroups(buildStore([]));
    expect(result).toHaveLength(0);
  });
});

// ─── Ignorar transacciones sin metadata ──────────────────────────────────────

describe("selectInstallmentGroups - transacciones sin metadata de cuotas", () => {
  test("debería ignorar transacciones sin metadata de cuotas", () => {
    const plain: Transaction = {
      id: "t1",
      description: "Supermercado",
      amountCLP: 50_000,
      type: "expense",
      paymentMethod: "debit",
      expenseType: "variable",
      expenseCategory: "FOOD",
      createdAt: "2025-07-01",
    };
    const result = selectInstallmentGroups(buildStore([plain]));
    expect(result).toHaveLength(0);
  });

  test("debería procesar solo las cuotas e ignorar el resto cuando se mezclan", () => {
    const plain: Transaction = {
      id: "t-plain",
      description: "Arriendo",
      amountCLP: 300_000,
      type: "expense",
      paymentMethod: "transfer",
      expenseType: "fixed",
      expenseCategory: "RENT",
      createdAt: "2025-07-01",
    };
    const cuotas = buildGroup("g1", "Sofá", ["2025-07-01", "2025-08-01"]);
    const result = selectInstallmentGroups(buildStore([plain, ...cuotas]));
    expect(result).toHaveLength(1);
    expect(result[0].itemName).toBe("Sofá");
  });
});

// ─── Casos borde ──────────────────────────────────────────────────────────────

describe("selectInstallmentGroups - casos borde", () => {
  test("debería excluir un grupo de 1 cuota que ya fue pagada", () => {
    const txs = buildGroup("g1", "Libro", ["2025-05-01"], 8_000);
    const result = selectInstallmentGroups(buildStore(txs));
    expect(result).toHaveLength(0);
  });

  test("debería incluir un grupo de 1 cuota aún no vencida", () => {
    const txs = buildGroup("g1", "Película", ["2025-08-01"], 5_000);
    const result = selectInstallmentGroups(buildStore(txs));
    expect(result).toHaveLength(1);
    expect(result[0].pendingCount).toBe(1);
  });

  test("debería manejar múltiples grupos mixtos correctamente", () => {
    const fullyPaid = buildGroup("g-paid", "Funda", ["2025-03-01", "2025-04-01"]);
    const allPending = buildGroup("g-future", "Monitor", ["2025-07-01", "2025-08-01", "2025-09-01"]);
    const partial = buildGroup("g-partial", "Silla", ["2025-05-01", "2025-06-01", "2025-07-01"]);

    const result = selectInstallmentGroups(buildStore([...fullyPaid, ...allPending, ...partial]));
    expect(result).toHaveLength(2);

    const future = result.find((g) => g.groupId === "g-future")!;
    expect(future.paidCount).toBe(0);
    expect(future.pendingCount).toBe(3);

    const partial_ = result.find((g) => g.groupId === "g-partial")!;
    expect(partial_.paidCount).toBe(2);
    expect(partial_.pendingCount).toBe(1);
  });

  test("debería asignar currentCuota correctamente para el mes actual", () => {
    // cuota 2 cae en 2025-06 (mes actual)
    const txs = buildGroup("g1", "Bicicleta", ["2025-05-01", "2025-06-01", "2025-07-01"]);
    const [group] = selectInstallmentGroups(buildStore(txs));
    expect(group.currentCuota).toBe(2);
  });

  test("debería asignar currentCuota=null cuando ninguna cuota cae en el mes actual", () => {
    // todas futuras, ninguna en 2025-06
    const txs = buildGroup("g1", "Drone", ["2025-07-01", "2025-08-01"]);
    const [group] = selectInstallmentGroups(buildStore(txs));
    expect(group.currentCuota).toBeNull();
  });
});
