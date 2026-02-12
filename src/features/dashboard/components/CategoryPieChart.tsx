"use client";

import { useMemo } from "react";
import { useTransactionsStore, type TransactionsStore } from "@/features/transactions/store";
import { useConfigStore } from "@/features/config/store";
import { selectCategoryStats } from "@/features/transactions/selectors";
import { formatAmountCLP, formatExpenseCategory } from "@/lib/format";
import type { ExpenseCategory } from "@/lib/transaction-options";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Paleta ampliada: un color único por categoría sin repetir (11 categorías actuales + margen)
const COLORS = [
    "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#6366f1",
    "#14b8a6", "#f97316", "#a855f7", "#06b6d4"
];

export function CategoryPieChart() {
    const items = useTransactionsStore((s) => s.items);
    const selectedMonth = useConfigStore((s) => s.selectedMonth);

    // Derivamos con useMemo para evitar que getSnapshot devuelva referencias nuevas en cada render
    const rawData = useMemo(
        () => selectCategoryStats({ items } as TransactionsStore, selectedMonth),
        [items, selectedMonth]
    );

    // Enriquecer con color (para leyenda) y label en español (para tooltip y leyenda)
    const data = useMemo(
        () => rawData.map((item, i) => ({
            ...item,
            fill: COLORS[i % COLORS.length],
            label: formatExpenseCategory(item.name as ExpenseCategory),
        })),
        [rawData]
    );

    const hasData = data.length > 0;

    return (
        <Card className="ob-card col-span-3 min-w-0">
            <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wider">
                    Gastos por Categoría
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] min-h-0">
                {hasData ? (
                    <div className="h-full min-h-[260px] w-full min-w-0">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={260}>
                            <PieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={58}
                                    outerRadius={78}
                                    paddingAngle={0}
                                    strokeWidth={0}
                                    dataKey="value"
                                    nameKey="label"
                                    cornerRadius={4}
                                >
                                    {data.map((entry) => (
                                        <Cell key={entry.name} fill={entry.fill} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (!active || !payload?.[0]) return null;
                                        const item = payload[0].payload;
                                        return (
                                            <div className="rounded-lg border border-border/50 bg-card px-3 py-2 shadow-lg backdrop-blur-sm">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="h-2.5 w-2.5 shrink-0 rounded-sm"
                                                        style={{ backgroundColor: item.fill }}
                                                    />
                                                    <span className="text-sm font-medium">{item.label}</span>
                                                </div>
                                                <p className="mt-0.5 text-sm text-muted-foreground">
                                                    {formatAmountCLP(Number(payload[0].value ?? 0))}
                                                </p>
                                            </div>
                                        );
                                    }}
                                    cursor={false}
                                />
                                <Legend
                                    content={({ payload }) => (
                                        <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
                                            {payload?.map((entry) => (
                                                <li key={entry.value} className="flex items-center gap-2">
                                                    <span
                                                        className="h-2.5 w-2.5 shrink-0 rounded-md"
                                                        style={{ backgroundColor: entry.color ?? (entry.payload as { fill?: string })?.fill }}
                                                    />
                                                    <span className="text-xs text-muted-foreground">{entry.value}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic">
                        No hay gastos registrados en este mes.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}