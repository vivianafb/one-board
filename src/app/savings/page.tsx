"use client";

import { useSavingsStore } from "@/features/savings/store";
import { selectTotalSaved } from "@/features/savings/selectors";
import CardSavings from "@/features/savings/components/cardSavings";

export default function SavingsPage() {
  const totalSaved = useSavingsStore(selectTotalSaved);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Ahorros</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <CardSavings totalSaved={totalSaved} />
      </div>
    </div>
  );
}