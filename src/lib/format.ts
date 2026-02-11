import type { SavingGoalCategory } from '@/types/finance';
import {
  PAYMENT_METHOD_OPTIONS,
  EXPENSE_CATEGORY_OPTIONS,
  EXPENSE_TYPE_OPTIONS,
} from './transaction-options';

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

/**
 * Formatea el método de pago para mostrarlo al usuario.
 * Ejemplo: "bank_transfer" → "Transferencia bancaria"
 */
export function formatPaymentMethod(method: keyof typeof PAYMENT_METHOD_OPTIONS): string {
  return PAYMENT_METHOD_OPTIONS[method];
}

/**
 * Formatea el tipo de gasto (fijo/variable) para mostrarlo al usuario.
 */
export function formatExpenseType(type?: keyof typeof EXPENSE_TYPE_OPTIONS): string {
  return type ? EXPENSE_TYPE_OPTIONS[type] : '—';
}

/**
 * Formatea la categoría de gasto (rubro) para mostrarla al usuario.
 */
export function formatExpenseCategory(category?: keyof typeof EXPENSE_CATEGORY_OPTIONS): string {
  return category ? EXPENSE_CATEGORY_OPTIONS[category] : '—';
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
