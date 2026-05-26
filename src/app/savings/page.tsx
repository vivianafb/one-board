"use client";

import { useState } from "react";
import { PiggyBank } from "lucide-react";
import { useSavingsStore } from "@/features/savings/store";
import { selectTotalSaved } from "@/features/savings/selectors";
import SavingsCard from "@/features/savings/components/SavingsCard";
import AddGoalDialog from "@/features/savings/components/AddGoalDialog";
import { GoalCard } from "@/features/savings/components/GoalCard";
import { Button } from "@/components/ui/button";

export default function SavingsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const totalSaved = useSavingsStore(selectTotalSaved);
  const goals = useSavingsStore((state) => state.goals);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="ob-page-title">Ahorros</h1>
        <Button className="ob-btn-primary" onClick={() => setDialogOpen(true)}>
          Nueva Meta
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SavingsCard totalSaved={totalSaved} />
      </div>

      <h2 className="text-lg font-semibold text-foreground">Mis Metas</h2>

      {goals.length === 0 ? (
        <div className="ob-card-glass flex flex-col items-center justify-center gap-4 py-16 text-center">
          <PiggyBank className="h-12 w-12 text-muted-foreground opacity-40" />
          <div className="space-y-1">
            <p className="text-base font-medium text-foreground">
              No tienes metas de ahorro aún
            </p>
            <p className="text-sm text-muted-foreground">
              Crea tu primera meta y empieza a ahorrar
            </p>
          </div>
          <Button className="ob-btn-primary" onClick={() => setDialogOpen(true)}>
            Crear primera meta
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}

      <AddGoalDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
