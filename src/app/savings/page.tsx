"use client";

import { useSavingsStore } from "@/features/savings/store";
import { selectTotalSaved } from "@/features/savings/selectors";
import CardSavings from "@/features/savings/components/CardSavings";
import AddGoalDialog from "@/features/savings/components/AddGoalDialog";
import { GoalCard } from "@/features/savings/components/GoalCard"; // El nuevo

export default function SavingsPage() {
  const totalSaved = useSavingsStore(selectTotalSaved);
  const goals = useSavingsStore((state) => state.goals); // Traemos la lista de metas

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Ahorros</h1>
        <AddGoalDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Card de Resumen Total */}
        <CardSavings totalSaved={totalSaved} />
      </div>

      <h2 className="text-xl font-semibold mt-8">Mis Metas</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Desglose: Mapeamos cada meta a su propia Card */}
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}