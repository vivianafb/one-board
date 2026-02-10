"use client";

import { useState, useMemo } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatAmountCLP, formatPaymentMethod, formatExpenseCategory } from "@/lib/format";
import type { Transaction } from "@/types/finance";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useTransactionsStore } from "../store";
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "../constants";

function AmountCell({ transaction }: { transaction: Transaction }) {
    const isIncome = transaction.type === "income";
    const displayAmount = isIncome
        ? transaction.amountCLP
        : -transaction.amountCLP;
    const colorClass = isIncome ? "text-green-600 font-medium" : "text-red-600 font-medium";
    return (
        <TableCell className={colorClass}>
            {formatAmountCLP(displayAmount)}
        </TableCell>
    );
}

export const TransactionsTable = () => {
    const items = useTransactionsStore((s) => s.items);
    const add = useTransactionsStore((s) => s.add);
    const update = useTransactionsStore((s) => s.update);
    const deleteTransaction = useTransactionsStore((s) => s.delete);
    const { balance, fixedExpenses, variableExpenses } = useMemo(() => {
        const totalIncomes = items
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amountCLP, 0);
        const expenses = items.filter((t) => t.type === "expense");
        const totalExpenses = expenses.reduce((sum, t) => sum + t.amountCLP, 0);
        const fixed = expenses
            .filter((t) => t.expenseCategory === "fixed")
            .reduce((sum, t) => sum + t.amountCLP, 0);
        const variable = expenses
            .filter((t) => t.expenseCategory === "variable")
            .reduce((sum, t) => sum + t.amountCLP, 0);
        return {
            balance: totalIncomes - totalExpenses,
            fixedExpenses: fixed,
            variableExpenses: variable,
        };
    }, [items]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const { paginatedTransactions, totalPages, startIndex, endIndex, total, effectivePage } = useMemo(() => {
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
    }, [items, currentPage, pageSize]);

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = Number(e.target.value) as (typeof PAGE_SIZE_OPTIONS)[number];
        setPageSize(newSize);
        setCurrentPage(1);
    };

    const handleDelete = (id: string) => {
        deleteTransaction(id);
        if (paginatedTransactions.length <= 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const [showAddForm, setShowAddForm] = useState(false);
    const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
        description: "",
        amountCLP: 0,
        type: "expense",
        expenseCategory: "variable",
        paymentMethod: "cash",
        createdAt: new Date().toISOString().slice(0, 10),
    });

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTransaction.description || !newTransaction.amountCLP) return;
        const type = newTransaction.type ?? "expense";
        add({
            id: crypto.randomUUID(),
            description: newTransaction.description,
            amountCLP: newTransaction.amountCLP,
            type,
            paymentMethod: newTransaction.paymentMethod ?? "cash",
            createdAt: newTransaction.createdAt ?? new Date().toISOString().slice(0, 10),
            ...(type === "expense" && { expenseCategory: newTransaction.expenseCategory ?? "variable" }),
        });
        setNewTransaction({
            description: "",
            amountCLP: 0,
            type: "expense",
            expenseCategory: "variable",
            paymentMethod: "cash",
            createdAt: new Date().toISOString().slice(0, 10),
        });
        setShowAddForm(false);
    };

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTransaction, setEditTransaction] = useState<Partial<Transaction>>({});

    const handleEdit = (transaction: Transaction) => {
        setShowAddForm(false);
        setEditingId(transaction.id);
        setEditTransaction({
            description: transaction.description,
            amountCLP: transaction.amountCLP,
            type: transaction.type,
            expenseCategory: transaction.expenseCategory,
            paymentMethod: transaction.paymentMethod,
            createdAt: transaction.createdAt,
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId || !editTransaction.description || !editTransaction.amountCLP) return;
        const type = editTransaction.type ?? "expense";
        update(editingId, {
            description: editTransaction.description,
            amountCLP: editTransaction.amountCLP,
            type,
            paymentMethod: editTransaction.paymentMethod ?? "cash",
            createdAt: editTransaction.createdAt ?? new Date().toISOString().slice(0, 10),
            expenseCategory: type === "expense" ? (editTransaction.expenseCategory ?? "variable") : undefined,
        });
        setEditingId(null);
        setEditTransaction({});
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border bg-muted/40 px-4 py-3">
                    <p className="text-sm font-medium text-muted-foreground">Balance (ingresos − gastos)</p>
                    <p className={`text-xl font-semibold tabular-nums ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {formatAmountCLP(balance)}
                    </p>
                </div>
                <div className="rounded-lg border bg-muted/40 px-4 py-3">
                    <p className="text-sm font-medium text-muted-foreground">Gastos fijos</p>
                    <p className="text-xl font-semibold tabular-nums text-red-600">
                        {formatAmountCLP(fixedExpenses)}
                    </p>
                </div>
                <div className="rounded-lg border bg-muted/40 px-4 py-3">
                    <p className="text-sm font-medium text-muted-foreground">Gastos variables</p>
                    <p className="text-xl font-semibold tabular-nums text-red-600">
                        {formatAmountCLP(variableExpenses)}
                    </p>
                </div>
            </div>
            <div className="space-y-3">
                <button
                    type="button"
                    className="ob-btn-primary"
                    onClick={() => {
                        setEditingId(null);
                        setEditTransaction({});
                        setShowAddForm((v) => !v);
                    }}
                >
                    {showAddForm ? "Cancelar" : "Agregar transacción"}
                </button>
                {editingId && (
                    <form onSubmit={handleEditSubmit} className="flex flex-wrap items-end gap-3 rounded-lg border border-primary/30 bg-muted/20 p-4">
                        <p className="w-full text-sm font-medium text-muted-foreground">Editar transacción</p>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Descripción</label>
                            <input
                                type="text"
                                value={editTransaction.description ?? ""}
                                onChange={(e) => setEditTransaction((t) => ({ ...t, description: e.target.value }))}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Monto (CLP)</label>
                            <input
                                type="number"
                                min={1}
                                value={editTransaction.amountCLP ?? ""}
                                onChange={(e) => setEditTransaction((t) => ({ ...t, amountCLP: Number(e.target.value) || 0 }))}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Tipo</label>
                            <select
                                value={editTransaction.type}
                                onChange={(e) => setEditTransaction((t) => ({ ...t, type: e.target.value as Transaction["type"] }))}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="income">Ingreso</option>
                                <option value="expense">Gasto</option>
                            </select>
                        </div>
                        {editTransaction.type === "expense" && (
                            <div>
                                <label className="mb-1 block text-sm font-medium">Categoría</label>
                                <select
                                    value={editTransaction.expenseCategory ?? "variable"}
                                    onChange={(e) => setEditTransaction((t) => ({ ...t, expenseCategory: e.target.value as Transaction["expenseCategory"] }))}
                                    className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                >
                                    <option value="fixed">Gasto fijo</option>
                                    <option value="variable">Gasto variable</option>
                                </select>
                            </div>
                        )}
                        <div>
                            <label className="mb-1 block text-sm font-medium">Método</label>
                            <select
                                value={editTransaction.paymentMethod}
                                onChange={(e) => setEditTransaction((t) => ({ ...t, paymentMethod: e.target.value as Transaction["paymentMethod"] }))}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="cash">Efectivo</option>
                                <option value="debit_card">Débito</option>
                                <option value="credit_card">Crédito</option>
                                <option value="bank_transfer">Transferencia</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Fecha</label>
                            <input
                                type="date"
                                value={editTransaction.createdAt ?? ""}
                                onChange={(e) => setEditTransaction((t) => ({ ...t, createdAt: e.target.value }))}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                            />
                        </div>
                        <button type="submit" className="ob-btn-primary h-9 px-4">
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={() => { setEditingId(null); setEditTransaction({}); }}
                            className="h-9 rounded-md border border-input bg-background px-4 text-sm hover:bg-muted"
                        >
                            Cancelar
                        </button>
                    </form>
                )}
                {showAddForm && (
                    <form onSubmit={handleAddSubmit} className="flex flex-wrap items-end gap-3 rounded-lg border bg-muted/20 p-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Descripción</label>
                            <input
                                type="text"
                                value={newTransaction.description}
                                onChange={(e) => setNewTransaction((t) => ({ ...t, description: e.target.value }))}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Monto (CLP)</label>
                            <input
                                type="number"
                                min={1}
                                value={newTransaction.amountCLP || ""}
                                onChange={(e) => setNewTransaction((t) => ({ ...t, amountCLP: Number(e.target.value) || 0 }))}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Tipo</label>
                            <select
                                value={newTransaction.type}
                                onChange={(e) => setNewTransaction((t) => ({ ...t, type: e.target.value as Transaction["type"] }))}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="income">Ingreso</option>
                                <option value="expense">Gasto</option>
                            </select>
                        </div>
                        {newTransaction.type === "expense" && (
                            <div>
                                <label className="mb-1 block text-sm font-medium">Categoría</label>
                                <select
                                    value={newTransaction.expenseCategory ?? "variable"}
                                    onChange={(e) => setNewTransaction((t) => ({ ...t, expenseCategory: e.target.value as Transaction["expenseCategory"] }))}
                                    className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                >
                                    <option value="fixed">Gasto fijo</option>
                                    <option value="variable">Gasto variable</option>
                                </select>
                            </div>
                        )}
                        <div>
                            <label className="mb-1 block text-sm font-medium">Método</label>
                            <select
                                value={newTransaction.paymentMethod}
                                onChange={(e) => setNewTransaction((t) => ({ ...t, paymentMethod: e.target.value as Transaction["paymentMethod"] }))}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="cash">Efectivo</option>
                                <option value="debit_card">Débito</option>
                                <option value="credit_card">Crédito</option>
                                <option value="bank_transfer">Transferencia</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Fecha</label>
                            <input
                                type="date"
                                value={newTransaction.createdAt}
                                onChange={(e) => setNewTransaction((t) => ({ ...t, createdAt: e.target.value }))}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                            />
                        </div>
                        <button type="submit" className="ob-btn-primary h-9 px-4">
                            Guardar
                        </button>
                    </form>
                )}
            </div>

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
                    {paginatedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.createdAt}</TableCell>
                            <AmountCell transaction={transaction} />
                            <TableCell className="text-muted-foreground">
                                {transaction.type === "expense"
                                    ? formatExpenseCategory(transaction.expenseCategory)
                                    : "—"}
                            </TableCell>
                            <TableCell>{formatPaymentMethod(transaction.paymentMethod)}</TableCell>
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-sm">
                <p className="text-muted-foreground">
                    Mostrando <span className="font-medium text-foreground">{startIndex}</span>
                    {" – "}
                    <span className="font-medium text-foreground">{endIndex}</span>
                    {" de "}
                    <span className="font-medium text-foreground">{total}</span>
                    {" movimientos"}
                </p>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="page-size" className="text-muted-foreground whitespace-nowrap">
                            Filas por página
                        </label>
                        <select
                            id="page-size"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="h-8 rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                            {PAGE_SIZE_OPTIONS.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => goToPage(effectivePage - 1)}
                            disabled={effectivePage <= 1}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                            aria-label="Página anterior"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="min-w-[6rem] px-2 text-center text-muted-foreground">
                            Página {effectivePage} de {totalPages}
                        </span>
                        <button
                            type="button"
                            onClick={() => goToPage(effectivePage + 1)}
                            disabled={effectivePage >= totalPages}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                            aria-label="Página siguiente"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};