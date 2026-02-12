"use client";

import { useState, useMemo, useCallback } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatAmountCLP, formatPaymentMethod, formatExpenseCategory } from "@/lib/format";
import type { Transaction } from "@/types/finance";
import { Pencil, Trash2 } from "lucide-react";
import { useTransactionsStore } from "../store";
import { useShallow } from "zustand/react/shallow";
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "../constants";
import { selectTransactionStats } from "../selectors";
import { useConfigStore } from "@/features/config/store";
import {
  computePagination,
  getInitialTransactionForm,
  buildTransactionForAdd,
  buildTransactionPatch,
} from "../utils/transactions-table";
import { TransactionForm } from "./TransactionForm";
import { TablePagination } from "./TablePagination";

function AmountCell({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === "income";
  const displayAmount = isIncome ? transaction.amountCLP : -transaction.amountCLP;
  const colorClass = isIncome
    ? "ob-amount-income font-medium"
    : "ob-amount-expense font-medium";
  return (
    <TableCell className={colorClass}>{formatAmountCLP(displayAmount)}</TableCell>
  );
}

function StatsCards({
  balance,
  fixedExpenses,
  variableExpenses,
}: {
  balance: number;
  fixedExpenses: number;
  variableExpenses: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="ob-card-glass px-4 py-3">
        <p className="text-sm font-medium text-muted-foreground">
          Balance (ingresos − gastos)
        </p>
        <p
          className={`text-xl ${balance >= 0 ? "ob-amount-income" : "ob-amount-expense"}`}
        >
          {formatAmountCLP(balance)}
        </p>
      </div>
      <div className="ob-card-glass px-4 py-3">
        <p className="text-sm font-medium text-muted-foreground">Gastos fijos</p>
        <p className="text-xl font-semibold tabular-nums">
          {formatAmountCLP(fixedExpenses)}
        </p>
      </div>
      <div className="ob-card-glass px-4 py-3">
        <p className="text-sm font-medium text-muted-foreground">
          Gastos variables
        </p>
        <p className="text-xl font-semibold tabular-nums">
          {formatAmountCLP(variableExpenses)}
        </p>
      </div>
    </div>
  );
}

export function TransactionsTable() {
  const items = useTransactionsStore((s) => s.items);
  const selectedMonth = useConfigStore((s) => s.selectedMonth);
  const { add, update, delete: deleteTransaction } = useTransactionsStore(
    (s) => s.actions
  );
  const { balance, fixedExpenses, variableExpenses } = useTransactionsStore(
    useShallow((state) => selectTransactionStats(state, selectedMonth))
  );

  const filteredItems = useMemo(
    () => items.filter((t) => t.createdAt.startsWith(selectedMonth)),
    [items, selectedMonth]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const paginationData = useMemo(
    () => computePagination(filteredItems, currentPage, pageSize),
    [filteredItems, currentPage, pageSize]
  );

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, paginationData.totalPages)));
    },
    [paginationData.totalPages]
  );

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSize = Number(e.target.value) as (typeof PAGE_SIZE_OPTIONS)[number];
      setPageSize(newSize);
      setCurrentPage(1);
    },
    []
  );

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState(getInitialTransactionForm);

  const handleAddSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTransaction.description || !newTransaction.amountCLP) return;
      add(buildTransactionForAdd(newTransaction));
      setNewTransaction(getInitialTransactionForm());
      setShowAddForm(false);
    },
    [newTransaction, add]
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTransaction, setEditTransaction] = useState<Partial<Transaction>>({});

  const handleEdit = useCallback((transaction: Transaction) => {
    setShowAddForm(false);
    setEditingId(transaction.id);
    setEditTransaction({
      description: transaction.description,
      amountCLP: transaction.amountCLP,
      type: transaction.type,
      expenseType: transaction.expenseType ?? "variable",
      expenseCategory: transaction.expenseCategory ?? "OTHERS",
      paymentMethod: transaction.paymentMethod,
      createdAt: transaction.createdAt,
    });
  }, []);

  const handleEditSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingId || !editTransaction.description || !editTransaction.amountCLP)
        return;
      update(editingId, buildTransactionPatch(editTransaction));
      setEditingId(null);
      setEditTransaction({});
    },
    [editingId, editTransaction, update]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteTransaction(id);
      if (
        paginationData.paginatedTransactions.length <= 1 &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
    },
    [deleteTransaction, paginationData.paginatedTransactions.length, currentPage]
  );

  const toggleAddForm = useCallback(() => {
    setEditingId(null);
    setEditTransaction({});
    setShowAddForm((v) => !v);
  }, []);

  return (
    <div className="space-y-4">
      <StatsCards
        balance={balance}
        fixedExpenses={fixedExpenses}
        variableExpenses={variableExpenses}
      />

      <div className="space-y-3">
        <button type="button" className="ob-btn-primary" onClick={toggleAddForm}>
          {showAddForm ? "Cancelar" : "Agregar transacción"}
        </button>

        {editingId && (
          <TransactionForm
            values={editTransaction}
            onChange={setEditTransaction}
            onSubmit={handleEditSubmit}
            submitLabel="Guardar"
            title="Editar transacción"
            onCancel={() => {
              setEditingId(null);
              setEditTransaction({});
            }}
          />
        )}

        {showAddForm && (
          <TransactionForm
            values={newTransaction}
            onChange={setNewTransaction}
            onSubmit={handleAddSubmit}
            submitLabel="Guardar"
          />
        )}
      </div>

      <div className="ob-card-glass space-y-4 overflow-hidden p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Método de pago</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginationData.paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.createdAt}</TableCell>
                <AmountCell transaction={transaction} />
                <TableCell className="text-muted-foreground">
                  {transaction.type === "expense" ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground">
                        {formatExpenseCategory(transaction.expenseCategory)}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider opacity-80">
                        {transaction.expenseType === "fixed"
                          ? "Fijo"
                          : "Variable"}
                      </span>
                    </div>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>
                  {formatPaymentMethod(transaction.paymentMethod)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(transaction)}
                      className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(transaction.id)}
                      className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          paginationData={paginationData}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
}
