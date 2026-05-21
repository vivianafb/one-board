/**
 * Fuente única de verdad para opciones de transacciones.
 * Agregar nuevas opciones SOLO aquí; se usan automáticamente en tipos, formatos y selects.
 */

export const EXPENSE_CATEGORY_OPTIONS: Record<string, string> = {
  // Fijos
  RENT: "Alquiler",
  ELECTRICITY: "Luz",
  WATER: "Agua",
  INTERNET: "Internet",
  SUSCRIPTIONS: "Suscripciones",
  INSURANCE: "Seguros",
  SERVICES: "Servicios",
  // Variables
  SUPERMARKET: "Supermercado",
  FOOD: "Comida",
  TRANSPORT: "Transporte",
  HEALTH: "Salud",
  PHARMACY: "Farmacia",
  ENTERTAINMENT: "Entretenimiento",
  OTHERS: "Otros",
  PETS: "Mascotas",
  BEAUTY: "Belleza",
};

export type ExpenseCategory = string;

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
export const EXPENSE_CATEGORY_SELECT_OPTIONS = Object.entries(EXPENSE_CATEGORY_OPTIONS).map(
  ([value, label]) => ({ value, label })
);

export const PAYMENT_METHOD_SELECT_OPTIONS = (
  Object.entries(PAYMENT_METHOD_OPTIONS) as [PaymentMethod, string][]
).map(([value, label]) => ({ value, label }));

export const EXPENSE_TYPE_SELECT_OPTIONS = (
  Object.entries(EXPENSE_TYPE_OPTIONS) as [ExpenseType, string][]
).map(([value, label]) => ({ value, label }));
