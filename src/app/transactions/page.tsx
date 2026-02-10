// src/app/transactions/page.tsx
import { TransactionsTable } from '@/features/transactions/components/TransactionsTable';

export default function TransactionsPage() {
  return <>
    <h2 className="ob-page-title">Movimientos</h2><TransactionsTable />
  </>
}
