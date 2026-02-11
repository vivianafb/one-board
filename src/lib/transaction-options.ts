/**
 * Fuente única de verdad para opciones de transacciones.
 * Agregar nuevas opciones SOLO aquí; se usan automáticamente en tipos, formatos y selects.
 */

export const EXPENSE_CATEGORY_OPTIONS = {
  FOOD: "Comida",
  SUPERMARKET: "Supermercado",
  PETS: "Mascotas",
  HEALTH: "Salud",
  BEAUTY: "Belleza",
  RENT: "Alquiler",
  TRANSPORT: "Transporte",
  SERVICES: "Servicios",
  ENTERTAINMENT: "Entretenimiento",
  SUSCRIPTIONS: "Suscripciones",
  OTHERS: "Otros",
} as const;

export type ExpenseCategory = keyof typeof EXPENSE_CATEGORY_OPTIONS;

export const PAYMENT_METHOD_OPTIONS = {
  cash: "Efectivo",
  debit_card: "Tarjeta de débito",
  credit_card: "Tarjeta de crédito",
  bank_transfer: "Transferencia bancaria",
} as const;

export type PaymentMethod = keyof typeof PAYMENT_METHOD_OPTIONS;

export const EXPENSE_TYPE_OPTIONS = {
  fixed: "Fijo",
  variable: "Variable",
} as const;

export type ExpenseType = keyof typeof EXPENSE_TYPE_OPTIONS;

/** Array para usar en selects: [{ value, label }] */
export const EXPENSE_CATEGORY_SELECT_OPTIONS = (
  Object.entries(EXPENSE_CATEGORY_OPTIONS) as [ExpenseCategory, string][]
).map(([value, label]) => ({ value, label }));

export const PAYMENT_METHOD_SELECT_OPTIONS = (
  Object.entries(PAYMENT_METHOD_OPTIONS) as [PaymentMethod, string][]
).map(([value, label]) => ({ value, label }));

export const EXPENSE_TYPE_SELECT_OPTIONS = (
  Object.entries(EXPENSE_TYPE_OPTIONS) as [ExpenseType, string][]
).map(([value, label]) => ({ value, label }));
