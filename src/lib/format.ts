import type { PaymentMethod, ExpenseCategory, SavingGoalCategory } from '@/types/finance';

/**
 * Formatea un número como monto en pesos chilenos (CLP).
 * Ejemplo: 1000000 → "$1.000.000"
 */
export function formatAmountCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatea un número como monto en dólares (USD).
 * Ejemplo: 1200.5 → "$1,200.50"
 */
export function formatAmountUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  bank_transfer: 'Transferencia bancaria',
  debit_card: 'Tarjeta de débito',
  credit_card: 'Tarjeta de crédito',
  cash: 'Efectivo',
};

/**
 * Formatea el método de pago para mostrarlo al usuario.
 * Ejemplo: "bank_transfer" → "Transferencia bancaria"
 */
export function formatPaymentMethod(method: PaymentMethod): string {
  return PAYMENT_METHOD_LABELS[method];
}

const EXPENSE_CATEGORY_LABELS: Record<Exclude<ExpenseCategory, undefined>, string> = {
  fixed: 'Gasto fijo',
  variable: 'Gasto variable',
};

/**
 * Formatea la categoría de gasto para mostrarla al usuario.
 */
export function formatExpenseCategory(category?: ExpenseCategory): string {
  return category ? EXPENSE_CATEGORY_LABELS[category] : '—';
}

const SAVING_GOAL_CATEGORY_LABELS: Record<SavingGoalCategory, string> = {
  EMERGENCY_FUND: 'Fondo de emergencia',
  TRAVEL: 'Viajes',
  HOME: 'Hogar',
  RETIREMENT: 'Jubilación',
  OTHER: 'Otro',
};

/**
 * Formatea la categoría de meta de ahorro para mostrarla al usuario.
 * Ejemplo: "EMERGENCY_FUND" → "Fondo de emergencia"
 */
export function formatSavingGoalCategory(category: SavingGoalCategory): string {
  return SAVING_GOAL_CATEGORY_LABELS[category];
}
