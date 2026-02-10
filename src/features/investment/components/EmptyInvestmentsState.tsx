"use client";

type EmptyInvestmentsStateProps = {
  hasFilter: boolean;
};

export function EmptyInvestmentsState({ hasFilter }: EmptyInvestmentsStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-muted-foreground">
      {hasFilter
        ? "No hay inversiones en el mes seleccionado."
        : "No hay inversiones registradas."}
    </div>
  );
}
