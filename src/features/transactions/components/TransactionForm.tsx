"use client";

import { useState, useMemo } from "react";
import { Plus, X } from "lucide-react";
import type { Transaction, ExpenseType } from "@/types/finance";
import { PAYMENT_METHOD_SELECT_OPTIONS, EXPENSE_TYPE_SELECT_OPTIONS } from "@/lib/transaction-options";
import { useCategoriesStore, type CategoryType } from "@/features/categories/store";
import { formatAmountCLP } from "@/lib/format";
import type { CuotaParams } from "../utils/transactions-table";

const INPUT_CLASS =
  "h-9 rounded-md border border-input bg-background px-3 text-sm";

type TransactionFormProps = {
  values: Partial<Transaction>;
  onChange: (updates: Partial<Transaction>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCuotaSubmit?: (params: CuotaParams) => void;
  submitLabel: string;
  title?: string;
  onCancel?: () => void;
  cancelLabel?: string;
};

export function TransactionForm({
  values,
  onChange,
  onSubmit,
  onCuotaSubmit,
  submitLabel,
  title,
  onCancel,
  cancelLabel = "Cancelar",
}: TransactionFormProps) {
  const isExpense = values.type === "expense";
  const currentExpenseType = values.expenseType ?? "variable";

  const [isCuota, setIsCuota] = useState(false);
  const [cuotaName, setCuotaName] = useState("");
  const [cuotaTotal, setCuotaTotal] = useState<number>(0);
  const [cuotaCount, setCuotaCount] = useState<number>(2);

  const amountPerCuota = cuotaCount > 0 ? Math.round(cuotaTotal / cuotaCount) : 0;

  const handleFormSubmit = (e: React.FormEvent) => {
    if (isCuota && onCuotaSubmit) {
      e.preventDefault();
      if (!cuotaName.trim() || cuotaTotal <= 0 || cuotaCount < 2) return;
      onCuotaSubmit({
        itemName: cuotaName.trim(),
        totalAmount: cuotaTotal,
        cuotaCount,
        baseDate: values.createdAt ?? new Date().toISOString().slice(0, 10),
        expenseType: currentExpenseType,
        expenseCategory: values.expenseCategory ?? "OTHERS",
        paymentMethod: values.paymentMethod ?? "cash",
      });
      setCuotaName("");
      setCuotaTotal(0);
      setCuotaCount(2);
      setIsCuota(false);
    } else {
      onSubmit(e);
    }
  };

  const categories = useCategoriesStore((s) => s.categories);
  const addCategory = useCategoriesStore((s) => s.actions.add);

  const filteredCategories = useMemo(
    () => categories.filter((c) => c.type === currentExpenseType),
    [categories, currentExpenseType]
  );

  const [showAddCat, setShowAddCat] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatType, setNewCatType] = useState<CategoryType>(currentExpenseType);

  const handleExpenseTypeChange = (type: ExpenseType) => {
    const firstOfType = categories.find((c) => c.type === type);
    onChange({
      expenseType: type,
      expenseCategory: firstOfType?.id ?? "OTHERS",
    });
    setNewCatType(type);
    setShowAddCat(false);
  };

  const handleAddCategory = () => {
    const name = newCatName.trim();
    if (!name) return;
    addCategory(name, newCatType);
    onChange({ expenseCategory: name });
    setNewCatName("");
    setShowAddCat(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className="ob-card-glass flex flex-wrap items-end gap-3 p-4">
      {title && <p className="w-full text-sm font-medium text-muted-foreground">{title}</p>}

      {!isCuota && (
        <div>
          <label className="mb-1 block text-sm font-medium">Descripción</label>
          <input
            type="text"
            value={values.description ?? ""}
            onChange={(e) => onChange({ description: e.target.value })}
            className={INPUT_CLASS}
            required
          />
        </div>
      )}

      {!isCuota && (
        <div>
          <label className="mb-1 block text-sm font-medium">Monto (CLP)</label>
          <input
            type="number"
            min={1}
            value={values.amountCLP ?? ""}
            onChange={(e) => onChange({ amountCLP: Number(e.target.value) || 0 })}
            className={INPUT_CLASS}
            required
          />
        </div>
      )}

      {isCuota && (
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="mb-1 block text-sm font-medium">Nombre del item</label>
            <input
              type="text"
              placeholder="ej: Celular Samsung"
              value={cuotaName}
              onChange={(e) => setCuotaName(e.target.value)}
              className={INPUT_CLASS}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Monto total (CLP)</label>
            <input
              type="number"
              min={1}
              value={cuotaTotal || ""}
              onChange={(e) => setCuotaTotal(Number(e.target.value) || 0)}
              className={INPUT_CLASS}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">N° cuotas</label>
            <input
              type="number"
              min={2}
              max={60}
              value={cuotaCount}
              onChange={(e) => setCuotaCount(Math.max(2, Number(e.target.value) || 2))}
              className={`${INPUT_CLASS} w-20`}
            />
          </div>
          {cuotaTotal > 0 && cuotaCount >= 2 && (
            <div className="pb-1 text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{formatAmountCLP(amountPerCuota)}</span>
              {" "}/ mes × {cuotaCount} cuotas
            </div>
          )}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Tipo</label>
        <select
          value={values.type}
          onChange={(e) => onChange({ type: e.target.value as Transaction["type"] })}
          className={INPUT_CLASS}
        >
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
      </div>

      {isExpense && (
        <div className="flex gap-3 items-start">
          <div>
            <label className="mb-1 block text-sm font-medium">Naturaleza</label>
            <select
              value={currentExpenseType}
              onChange={(e) => handleExpenseTypeChange(e.target.value as ExpenseType)}
              className={INPUT_CLASS}
            >
              {EXPENSE_TYPE_SELECT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Categoría</label>
            <select
              value={values.expenseCategory ?? filteredCategories[0]?.id ?? "OTHERS"}
              onChange={(e) => onChange({ expenseCategory: e.target.value })}
              className={INPUT_CLASS}
            >
              {filteredCategories.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>

            {!showAddCat ? (
              <button
                type="button"
                onClick={() => {
                  setNewCatType(currentExpenseType);
                  setShowAddCat(true);
                }}
                className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="h-3 w-3" />
                Nueva categoría
              </button>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCategory())}
                  className={`${INPUT_CLASS} w-28`}
                  autoFocus
                />
                <select
                  value={newCatType}
                  onChange={(e) => setNewCatType(e.target.value as CategoryType)}
                  className={`${INPUT_CLASS} w-24`}
                >
                  <option value="fixed">Fijo</option>
                  <option value="variable">Variable</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="h-9 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddCat(false); setNewCatName(""); }}
                  className="h-9 w-9 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Cancelar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isExpense && onCuotaSubmit && (
        <div className="w-full">
          <label className="flex cursor-pointer items-center gap-2 text-sm select-none">
            <div
              role="checkbox"
              aria-checked={isCuota}
              tabIndex={0}
              onClick={() => setIsCuota((v) => !v)}
              onKeyDown={(e) => e.key === " " && setIsCuota((v) => !v)}
              className={`relative h-5 w-9 rounded-full transition-colors ${
                isCuota ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  isCuota ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </div>
            ¿Es en cuotas?
          </label>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Método</label>
        <select
          value={values.paymentMethod}
          onChange={(e) =>
            onChange({ paymentMethod: e.target.value as Transaction["paymentMethod"] })
          }
          className={INPUT_CLASS}
        >
          {PAYMENT_METHOD_SELECT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Fecha</label>
        <input
          type="date"
          value={values.createdAt ?? ""}
          onChange={(e) => onChange({ createdAt: e.target.value })}
          className={INPUT_CLASS}
        />
      </div>

      <button type="submit" className="ob-btn-primary h-9 px-4">
        {submitLabel}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="h-9 rounded-md border border-input bg-background px-4 text-sm hover:bg-muted"
        >
          {cancelLabel}
        </button>
      )}
    </form>
  );
}
