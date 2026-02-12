/** Clase CSS para ganancia (emerald) o pérdida (rose) según el valor. */
export const getGainClass = (value: number) =>
  value >= 0 ? "ob-amount-income" : "ob-amount-expense";
