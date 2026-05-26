"use client"

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { formatAmountCLP, formatSavingGoalCategory } from "@/lib/format";
import type { SavingGoal } from "@/types/finance";
import { useSavingsStore } from "../store";
import { DepositDialog } from "./DepositDialog";
import { EditGoalDialog } from "./EditGoalDialog";

export const GoalCard = ({ goal }: { goal: SavingGoal }) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const deleteGoal = useSavingsStore((s) => s.actions.deleteGoal);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    deleteGoal(goal.id);
  };

  return (
    <>
      <Card className="ob-card-glass border-l-4 border-l-primary">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md font-semibold">{goal.name}</CardTitle>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold px-2 py-1 bg-primary/10 rounded text-primary">
                {formatSavingGoalCategory(goal.category)}
              </span>
              <button
                type="button"
                onClick={() => setEditOpen(true)}
                className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Editar meta"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Eliminar meta"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <DepositDialog goalId={goal.id} goalName={goal.name} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold tracking-tighter tabular-nums">{formatAmountCLP(goal.currentAmount)}</p>
              <p className="text-[10px] text-slate-500">Meta: {formatAmountCLP(goal.targetAmount)}</p>
            </div>
            <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
          </div>

          <Progress value={progress} className="h-2" />

          <p className="text-[10px] text-right text-muted-foreground italic">
            Faltan {formatAmountCLP(goal.targetAmount - goal.currentAmount)}
          </p>
        </CardContent>
      </Card>

      <EditGoalDialog goal={goal} open={editOpen} onOpenChange={setEditOpen} />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={`¿Eliminar meta "${goal.name}"?`}
        description="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleDelete}
      />
    </>
  );
};
