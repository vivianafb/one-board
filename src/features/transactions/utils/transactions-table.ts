import type { Transaction } from "@/types/finance";

export type PaginationData<T = Transaction> = {
  paginatedTransactions: T[];
  totalPages: number;
  startIndex: number;
  endIndex: number;
  total: number;
  effectivePage: number;
};

/**
 * Calcula los datos de paginación a partir de una lista filtrada.
 */
export function computePagination<T>(
  items: T[],
  currentPage: number,
  pageSize: number
): PaginationData<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const effectivePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (effectivePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const paginatedTransactions = items.slice(startIndex, endIndex);

  return {
    paginatedTransactions,
    totalPages,
    startIndex: total === 0 ? 0 : startIndex + 1,
    endIndex,
    total,
    effectivePage,
  };
}

const DEFAULT_FORM_VALUES: Partial<Transaction> = {
  description: "",
  amountCLP: 0,
  type: "expense",
  expenseType: "variable",
  expenseCategory: "OTHERS",
  paymentMethod: "cash",
  createdAt: new Date().toISOString().slice(0, 10),
};

export function getInitialTransactionForm(): Partial<Transaction> {
  return { ...DEFAULT_FORM_VALUES };
}

export function buildTransactionForAdd(form: Partial<Transaction>): Omit<Transaction, "id"> & { id: string } {
  const type = form.type ?? "expense";
  return {
    id: crypto.randomUUID(),
    description: form.description ?? "",
    amountCLP: form.amountCLP ?? 0,
    type,
    paymentMethod: form.paymentMethod ?? "cash",
    createdAt: form.createdAt ?? new Date().toISOString().slice(0, 10),
    ...(type === "expense" && {
      expenseType: form.expenseType ?? "variable",
      expenseCategory: form.expenseCategory ?? "OTHERS",
    }),
  };
}

export function buildTransactionPatch(form: Partial<Transaction>): Partial<Transaction> {
  const type = form.type ?? "expense";
  return {
    description: form.description,
    amountCLP: form.amountCLP,
    type,
    paymentMethod: form.paymentMethod ?? "cash",
    createdAt: form.createdAt ?? new Date().toISOString().slice(0, 10),
    expenseType: type === "expense" ? (form.expenseType ?? "variable") : undefined,
    expenseCategory: type === "expense" ? (form.expenseCategory ?? "OTHERS") : undefined,
  };
}
