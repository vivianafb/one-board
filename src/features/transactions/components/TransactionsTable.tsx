"use client";

import { useState, useMemo } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatAmountCLP, formatPaymentMethod } from '@/lib/format';
import transactions from '@/mocks/transactions';
import type { Transaction } from '@/types/finance';
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE_OPTIONS = [10, 15, 20, 50, 100] as const;

const totalIncomes = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amountCLP, 0);
const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amountCLP, 0);
const balance = totalIncomes - totalExpenses;

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
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { paginatedTransactions, totalPages, startIndex, endIndex, total, effectivePage } = useMemo(() => {
        const total = transactions.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const effectivePage = Math.min(Math.max(1, currentPage), totalPages);
        const startIndex = (effectivePage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, total);
        const paginatedTransactions = transactions.slice(startIndex, endIndex);
        return {
            paginatedTransactions,
            totalPages,
            startIndex: total === 0 ? 0 : startIndex + 1,
            endIndex,
            total,
            effectivePage,
        };
    }, [currentPage, pageSize]);

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = Number(e.target.value) as (typeof PAGE_SIZE_OPTIONS)[number];
        setPageSize(newSize);
        setCurrentPage(1);
    };

    return (
        <div className="space-y-4">
            <div className="rounded-lg border bg-muted/40 px-4 py-3">
                <p className="text-sm font-medium text-muted-foreground">Balance (ingresos − gastos)</p>
                <p className={`text-xl font-semibold tabular-nums ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {formatAmountCLP(balance)}
                </p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead>Método de pago</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.createdAt}</TableCell>
                            <AmountCell transaction={transaction} />
                            <TableCell>{formatPaymentMethod(transaction.paymentMethod)}</TableCell>
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