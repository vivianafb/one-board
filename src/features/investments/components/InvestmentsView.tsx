"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useInvestmentStore } from "../store";
import { useConfigStore } from "@/features/config/store";
import type { Investment } from "../types";
import { PortfolioCard } from "./PortfolioCard";
import { InvestmentTable } from "./InvestmentTable";
import { MonthlyDetail } from "./MonthlyDetail";
import { EmptyInvestmentsState } from "./EmptyInvestmentsState";
import { InvestmentFormDialog } from "./InvestmentFormDialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { MonthSelector } from "@/components/shared/MonthSelector";

export function InvestmentsView() {
  const selectedMonth = useConfigStore((s) => s.selectedMonth);
  const items = useInvestmentStore((s) => s.items);
  const deleteInvestment = useInvestmentStore((s) => s.actions.delete);

  const [formOpen, setFormOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  const [deletingInvestment, setDeletingInvestment] = useState<Investment | null>(null);

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment);
    setFormOpen(true);
  };

  const handleDelete = (investment: Investment) => {
    setDeletingInvestment(investment);
  };

  const handleConfirmDelete = () => {
    if (deletingInvestment) deleteInvestment(deletingInvestment.id);
    setDeletingInvestment(null);
  };

  const handleFormOpenChange = (open: boolean) => {
    setFormOpen(open);
    if (!open) setEditingInvestment(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <MonthSelector />
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="ob-btn-primary flex items-center gap-2 h-9 px-4 text-sm"
        >
          <Plus className="h-4 w-4" />
          Agregar inversión
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyInvestmentsState />
      ) : (
        <>
          <PortfolioCard investments={items} />
          <InvestmentTable
            investments={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {selectedMonth && (
            <MonthlyDetail investments={items} periodId={selectedMonth} />
          )}
        </>
      )}

      <InvestmentFormDialog
        open={formOpen}
        onOpenChange={handleFormOpenChange}
        investment={editingInvestment ?? undefined}
      />

      <ConfirmDialog
        open={!!deletingInvestment}
        onOpenChange={(open) => { if (!open) setDeletingInvestment(null); }}
        title="¿Eliminar inversión?"
        description={
          deletingInvestment
            ? `Se eliminará "${deletingInvestment.name}" de forma permanente.`
            : ""
        }
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
