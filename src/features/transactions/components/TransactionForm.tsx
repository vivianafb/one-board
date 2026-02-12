"use client";

import type { Transaction, ExpenseCategory, ExpenseType } from "@/types/finance";
import {
  EXPENSE_CATEGORY_SELECT_OPTIONS,
  EXPENSE_TYPE_SELECT_OPTIONS,
  PAYMENT_METHOD_SELECT_OPTIONS,
} from "@/lib/transaction-options";

const INPUT_CLASS =
  "h-9 rounded-md border border-input bg-background px-3 text-sm";

type TransactionFormProps = {
  values: Partial<Transaction>;
  onChange: (updates: Partial<Transaction>) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  title?: string;
  onCancel?: () => void;
  cancelLabel?: string;
};

export function TransactionForm({
  values,
  onChange,
  onSubmit,
  submitLabel,
  title,
  onCancel,
  cancelLabel = "Cancelar",
}: TransactionFormProps) {
  const isExpense = values.type === "expense";

  return (
    <form onSubmit={onSubmit} className="ob-card-glass flex flex-wrap items-end gap-3 p-4">
      {title && <p className="w-full text-sm font-medium text-muted-foreground">{title}</p>}
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
        <div className="flex gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Naturaleza</label>
            <select
              value={values.expenseType ?? "variable"}
              onChange={(e) => onChange({ expenseType: e.target.value as ExpenseType })}
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
              value={values.expenseCategory ?? "OTHERS"}
              onChange={(e) =>
                onChange({ expenseCategory: e.target.value as ExpenseCategory })
              }
              className={INPUT_CLASS}
            >
              {EXPENSE_CATEGORY_SELECT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
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
