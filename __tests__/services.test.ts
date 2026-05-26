import { createTransactionService } from "@/features/transactions/service";
import { createInvestmentService } from "@/features/investments/service";
import { createSavingsService } from "@/features/savings/service";

// ─── Mock stores ──────────────────────────────────────────────────────────────
// Each service calls useXxxStore.getState() internally, so we mock at module level.

const mockTransactionActions = {
  setItems: jest.fn(),
  setStatus: jest.fn(),
  setError: jest.fn(),
};

const mockInvestmentActions = {
  setItems: jest.fn(),
  setStatus: jest.fn(),
  setError: jest.fn(),
};

const mockSavingsActions = {
  setGoals: jest.fn(),
  setStatus: jest.fn(),
  setError: jest.fn(),
};

jest.mock("@/features/transactions/store", () => ({
  useTransactionsStore: {
    getState: jest.fn(),
  },
}));

jest.mock("@/features/investments/store", () => ({
  useInvestmentStore: {
    getState: jest.fn(),
  },
}));

jest.mock("@/features/savings/store", () => ({
  useSavingsStore: {
    getState: jest.fn(),
  },
}));

// Import after mock declarations so jest can hoist them
import { useTransactionsStore } from "@/features/transactions/store";
import { useInvestmentStore } from "@/features/investments/store";
import { useSavingsStore } from "@/features/savings/store";

beforeEach(() => {
  jest.clearAllMocks();

  // Default: store is empty (no early return)
  (useTransactionsStore.getState as jest.Mock).mockReturnValue({
    items: [],
    actions: mockTransactionActions,
  });
  (useInvestmentStore.getState as jest.Mock).mockReturnValue({
    items: [],
    actions: mockInvestmentActions,
  });
  (useSavingsStore.getState as jest.Mock).mockReturnValue({
    goals: [],
    actions: mockSavingsActions,
  });
});

// ─── createTransactionService ─────────────────────────────────────────────────

describe("createTransactionService", () => {
  test("debería cargar las transacciones y actualizar el store", async () => {
    const fakeData = [{ id: "t1", description: "Supermercado", amountCLP: 10_000, type: "expense", paymentMethod: "debit", createdAt: "2025-06-01" }];
    const repo = { getAll: jest.fn().mockResolvedValue(fakeData) };

    await createTransactionService(repo).load();

    expect(repo.getAll).toHaveBeenCalledTimes(1);
    expect(mockTransactionActions.setStatus).toHaveBeenCalledWith("loading");
    expect(mockTransactionActions.setItems).toHaveBeenCalledWith(fakeData);
    expect(mockTransactionActions.setStatus).toHaveBeenCalledWith("idle");
    expect(mockTransactionActions.setError).not.toHaveBeenCalled();
  });

  test("debería manejar errores y llamar setError cuando falla el repositorio", async () => {
    const repo = { getAll: jest.fn().mockRejectedValue(new Error("Network error")) };

    await createTransactionService(repo).load();

    expect(mockTransactionActions.setError).toHaveBeenCalledWith("Network error");
    expect(mockTransactionActions.setStatus).toHaveBeenCalledWith("error");
    expect(mockTransactionActions.setItems).not.toHaveBeenCalled();
  });

  test("debería llamar setStatus('loading') antes de llamar al repositorio", async () => {
    const callOrder: string[] = [];
    mockTransactionActions.setStatus.mockImplementation((s: string) => callOrder.push(`setStatus(${s})`));
    const repo = {
      getAll: jest.fn().mockImplementation(async () => { callOrder.push("getAll"); return []; }),
    };

    await createTransactionService(repo).load();

    expect(callOrder[0]).toBe("setStatus(loading)");
    expect(callOrder[1]).toBe("getAll");
  });

  test("debería omitir la carga si el store ya tiene datos", async () => {
    (useTransactionsStore.getState as jest.Mock).mockReturnValue({
      items: [{ id: "existing" }],
      actions: mockTransactionActions,
    });
    const repo = { getAll: jest.fn() };

    await createTransactionService(repo).load();

    expect(repo.getAll).not.toHaveBeenCalled();
    expect(mockTransactionActions.setStatus).not.toHaveBeenCalled();
  });

  test("debería llamar setError con mensaje genérico cuando el error no es instancia de Error", async () => {
    const repo = { getAll: jest.fn().mockRejectedValue("string error") };

    await createTransactionService(repo).load();

    expect(mockTransactionActions.setError).toHaveBeenCalledWith("Failed to load transactions");
  });
});

// ─── createInvestmentService ──────────────────────────────────────────────────

describe("createInvestmentService", () => {
  test("debería cargar las inversiones y actualizar el store", async () => {
    const fakeData = [{ id: "i1", name: "ETF Global", type: "ETF", currency: "USD", investedAmount: 1000, currentValue: 1200, provider: "Fintual", createdAt: "2025-01-01" }];
    const repo = { getAll: jest.fn().mockResolvedValue(fakeData) };

    await createInvestmentService(repo).load();

    expect(repo.getAll).toHaveBeenCalledTimes(1);
    expect(mockInvestmentActions.setStatus).toHaveBeenCalledWith("loading");
    expect(mockInvestmentActions.setItems).toHaveBeenCalledWith(fakeData);
    expect(mockInvestmentActions.setStatus).toHaveBeenCalledWith("idle");
    expect(mockInvestmentActions.setError).not.toHaveBeenCalled();
  });

  test("debería manejar errores y llamar setError cuando falla el repositorio", async () => {
    const repo = { getAll: jest.fn().mockRejectedValue(new Error("Timeout")) };

    await createInvestmentService(repo).load();

    expect(mockInvestmentActions.setError).toHaveBeenCalledWith("Timeout");
    expect(mockInvestmentActions.setStatus).toHaveBeenCalledWith("error");
    expect(mockInvestmentActions.setItems).not.toHaveBeenCalled();
  });

  test("debería omitir la carga si el store ya tiene datos", async () => {
    (useInvestmentStore.getState as jest.Mock).mockReturnValue({
      items: [{ id: "existing" }],
      actions: mockInvestmentActions,
    });
    const repo = { getAll: jest.fn() };

    await createInvestmentService(repo).load();

    expect(repo.getAll).not.toHaveBeenCalled();
    expect(mockInvestmentActions.setStatus).not.toHaveBeenCalled();
  });

  test("debería llamar setError con mensaje genérico cuando el error no es instancia de Error", async () => {
    const repo = { getAll: jest.fn().mockRejectedValue(null) };

    await createInvestmentService(repo).load();

    expect(mockInvestmentActions.setError).toHaveBeenCalledWith("Failed to load investments");
  });
});

// ─── createSavingsService ─────────────────────────────────────────────────────

describe("createSavingsService", () => {
  test("debería cargar los ahorros y actualizar el store", async () => {
    const fakeData = [{ id: "g1", name: "Viaje", targetAmount: 500_000, currentAmount: 0, currency: "CLP", category: "TRAVEL", createdAt: "2025-01-01" }];
    const repo = { getAll: jest.fn().mockResolvedValue(fakeData) };

    await createSavingsService(repo).load();

    expect(repo.getAll).toHaveBeenCalledTimes(1);
    expect(mockSavingsActions.setStatus).toHaveBeenCalledWith("loading");
    expect(mockSavingsActions.setGoals).toHaveBeenCalledWith(fakeData);
    expect(mockSavingsActions.setStatus).toHaveBeenCalledWith("idle");
    expect(mockSavingsActions.setError).not.toHaveBeenCalled();
  });

  test("debería manejar errores y llamar setError cuando falla el repositorio", async () => {
    const repo = { getAll: jest.fn().mockRejectedValue(new Error("Server down")) };

    await createSavingsService(repo).load();

    expect(mockSavingsActions.setError).toHaveBeenCalledWith("Server down");
    expect(mockSavingsActions.setStatus).toHaveBeenCalledWith("error");
    expect(mockSavingsActions.setGoals).not.toHaveBeenCalled();
  });

  test("debería omitir la carga si el store ya tiene datos", async () => {
    (useSavingsStore.getState as jest.Mock).mockReturnValue({
      goals: [{ id: "existing" }],
      actions: mockSavingsActions,
    });
    const repo = { getAll: jest.fn() };

    await createSavingsService(repo).load();

    expect(repo.getAll).not.toHaveBeenCalled();
    expect(mockSavingsActions.setStatus).not.toHaveBeenCalled();
  });

  test("debería llamar setError con mensaje genérico cuando el error no es instancia de Error", async () => {
    const repo = { getAll: jest.fn().mockRejectedValue(undefined) };

    await createSavingsService(repo).load();

    expect(mockSavingsActions.setError).toHaveBeenCalledWith("Failed to load savings");
  });

  test("debería usar setGoals (no setItems) para actualizar las metas de ahorro", async () => {
    const repo = { getAll: jest.fn().mockResolvedValue([]) };

    await createSavingsService(repo).load();

    expect(mockSavingsActions.setGoals).toHaveBeenCalled();
    expect((mockSavingsActions as Record<string, jest.Mock>).setItems).toBeUndefined();
  });
});
