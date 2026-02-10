import type { PaymentMethod } from '@/types/finance';

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
