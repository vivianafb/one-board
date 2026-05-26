import type { Transaction, ExpenseType } from "@/types/finance";
import type { PaymentMethod } from "@/lib/transaction-options";

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

export type CuotaParams = {
  itemName: string;
  totalAmount: number;
  cuotaCount: number;
  baseDate: string;
  expenseType: ExpenseType;
  expenseCategory: string;
  paymentMethod: PaymentMethod;
};

function addMonths(dateStr: string, months: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1 + months, d);
  return date.toISOString().slice(0, 10);
}

export function buildCuotaTransactions(params: CuotaParams): Transaction[] {
  const groupId = crypto.randomUUID();
  const amountPerCuota = Math.round(params.totalAmount / params.cuotaCount);
  return Array.from({ length: params.cuotaCount }, (_, i) => ({
    id: crypto.randomUUID(),
    description: `${params.itemName} (cuota ${i + 1}/${params.cuotaCount})`,
    amountCLP: amountPerCuota,
    type: "expense" as const,
    paymentMethod: params.paymentMethod,
    createdAt: addMonths(params.baseDate, i),
    expenseType: params.expenseType,
    expenseCategory: params.expenseCategory,
    installment: { groupId, itemName: params.itemName, current: i + 1, total: params.cuotaCount },
  }));
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
    installment: form.installment,
  };
}
