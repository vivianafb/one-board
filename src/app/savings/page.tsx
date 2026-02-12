"use client";

import { useSavingsStore } from "@/features/savings/store";
import { selectTotalSaved } from "@/features/savings/selectors";
import SavingsCard from "@/features/savings/components/SavingsCard";
import AddGoalDialog from "@/features/savings/components/AddGoalDialog";
import { GoalCard } from "@/features/savings/components/GoalCard";

export default function SavingsPage() {
  const totalSaved = useSavingsStore(selectTotalSaved);
  const goals = useSavingsStore((state) => state.goals); 

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="ob-page-title">Ahorros</h1>
        <AddGoalDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SavingsCard totalSaved={totalSaved} />
      </div>

      <h2 className="text-lg font-semibold text-foreground">Mis Metas</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}