"use client";

import { TransactionsTable } from '@/features/transactions/components/TransactionsTable';
import { MonthSelector } from '@/features/components/MonthSelector';

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="ob-page-title">Movimientos</h1>
        <MonthSelector />
      </div>
      <TransactionsTable />
    </div>
  );
}
