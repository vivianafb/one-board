/** Clase CSS para ganancia (verde) o pérdida (rojo) según el valor. */
export const getGainClass = (value: number) =>
  value >= 0 ? "text-[var(--success)]" : "text-destructive";
