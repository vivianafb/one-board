"use client";

type MonthSelectorProps = {
  value: string | null;
  onChange: (month: string | null) => void;
  months: { value: string; label: string }[];
};

export function MonthSelector({ value, onChange, months }: MonthSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor="month-filter" className="text-sm font-medium text-muted-foreground">
        Mes:
      </label>
      <select
        id="month-filter"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? e.target.value : null)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">Todos</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}
