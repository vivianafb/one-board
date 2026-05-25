"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTransactionsStore } from "@/features/transactions/store";
import { useConfigStore } from "@/features/config/store";
import { formatAmountCLP } from "@/lib/format";
import { getPrevMonth } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const INCOME_COLOR = "#22c55e";
const EXPENSE_COLOR = "#f43f5e";

function getLast6Months(endMonth: string): string[] {
  const months: string[] = [endMonth];
  for (let i = 1; i < 6; i++) months.unshift(getPrevMonth(months[0]));
  return months;
}

function shortLabel(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleDateString("es-CL", { month: "short" }).replace(".", "");
}

function TooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; fill: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card/95 backdrop-blur-md px-3 py-2 shadow-xl text-sm">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: p.fill }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="tabular-nums font-medium" style={{ color: p.fill }}>
            {formatAmountCLP(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function IncomeExpenseBarChart() {
  const items = useTransactionsStore((s) => s.items);
  const selectedMonth = useConfigStore((s) => s.selectedMonth);

  const data = useMemo(() => {
    const months = getLast6Months(selectedMonth);
    return months.map((ym) => {
      const monthItems = items.filter((t) => t.createdAt.startsWith(ym));
      const ingresos = monthItems
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amountCLP, 0);
      const gastos = monthItems
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amountCLP, 0);
      return { label: shortLabel(ym), ingresos, gastos };
    });
  }, [items, selectedMonth]);

  return (
    <Card className="ob-card-glass col-span-full md:col-span-4 min-w-0">
      <CardContent className="p-5">
        <h3 className="text-xl font-semibold text-foreground mb-4">Ingresos vs Gastos</h3>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="30%" barGap={4} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                width={52}
              />
              <Tooltip content={<TooltipContent />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                formatter={(value) => (
                  <span style={{ color: "var(--color-muted-foreground)" }}>{value}</span>
                )}
              />
              <Bar dataKey="ingresos" name="Ingresos" fill={INCOME_COLOR} radius={[3, 3, 0, 0]} />
              <Bar dataKey="gastos" name="Gastos" fill={EXPENSE_COLOR} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
