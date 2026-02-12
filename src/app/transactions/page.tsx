"use client";

import { TransactionsTable } from '@/features/transactions/components/TransactionsTable';
import { MonthSelector } from '@/features/components/MonthSelector';

export default function TransactionsPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="ob-page-title">Movimientos</h2>
        <MonthSelector />
      </div>
      <TransactionsTable />
    </>
  );
}
