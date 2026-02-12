"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTransactionsStore, type TransactionsStore } from "@/features/transactions/store";
import { useConfigStore } from "@/features/config/store";
import { selectCategoryStats } from "@/features/transactions/selectors";
import { formatAmountCLP, formatExpenseCategory } from "@/lib/format";
import type { ExpenseCategory } from "@/lib/transaction-options";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Paleta estilo referencia: verde, morado, rojo/rosa, naranja
const COLORS = [
    "#22c55e", // Verde (Food & Drink)
    "#a855f7", // Morado (Grocery)
    "#ec4899", // Rosa/Rojo (Shopping)
    "#f97316", // Naranja (Transport)
    "#06b6d4", // Cian (extra)
    "#eab308", // Amarillo (extra)
];

function getPrevMonth(ym: string): string {
    const [y, m] = ym.split("-").map(Number);
    if (m === 1) return `${y - 1}-12`;
    return `${y}-${String(m - 1).padStart(2, "0")}`;
}

export function CategoryPieChart() {
    const items = useTransactionsStore((s) => s.items);
    const selectedMonth = useConfigStore((s) => s.selectedMonth);

    const rawData = useMemo(
        () => selectCategoryStats({ items } as TransactionsStore, selectedMonth),
        [items, selectedMonth]
    );

    const totalCurrent = rawData.reduce((s, d) => s + d.value, 0);

    const prevMonth = getPrevMonth(selectedMonth);
    const prevStats = useMemo(
        () => selectCategoryStats({ items } as TransactionsStore, prevMonth),
        [items, prevMonth]
    );
    const totalPrev = prevStats.reduce((s, d) => s + d.value, 0);

    const changePercent = totalPrev > 0
        ? ((totalCurrent - totalPrev) / totalPrev) * 100
        : 0;

    const data = useMemo(
        () => rawData.map((item, i) => {
            const idx = i % COLORS.length;
            const value = Number(item.value);
            const pct = totalCurrent > 0 ? (value / totalCurrent) * 100 : 0;
            return {
                ...item,
                fill: COLORS[idx],
                label: formatExpenseCategory(item.name as ExpenseCategory),
                percentage: pct,
            };
        }),
        [rawData, totalCurrent]
    );

    const displayDate = useMemo(() => {
        const d = new Date(selectedMonth + "-15");
        return d.toLocaleDateString("es-CL", { month: "short", year: "numeric" });
    }, [selectedMonth]);

    const hasData = data.length > 0;

    return (
        <Card className="ob-card-glass min-w-0 w-full col-span-full md:col-span-3">
            <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Resumen</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            Datos de {displayDate}
                        </p>
                    </div>
                    <Button asChild variant="secondary" size="sm" className="rounded-lg bg-white/5 hover:bg-white/10 text-foreground border-0 shrink-0">
                        <Link href="/transactions">Ver informe</Link>
                    </Button>
                </div>

                {hasData ? (
                    <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 md:gap-6 mt-4 md:h-[240px] min-h-0">
                        <div className="w-full max-w-[200px] mx-auto md:mx-0 md:w-[200px] h-[180px] md:h-[200px] shrink-0 relative flex items-center justify-center">
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                                <span className="text-lg font-bold text-foreground tabular-nums">
                                    {formatAmountCLP(totalCurrent)}
                                </span>
                                <span className={changePercent <= 0 ? "text-emerald-400 text-sm" : "text-rose-400 text-sm"}>
                                    {changePercent <= 0 ? "↓" : "↑"} {Math.abs(changePercent).toFixed(1)}%
                                </span>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="82%"
                                        outerRadius="95%"
                                        paddingAngle={0}
                                        strokeWidth={0}
                                        dataKey="value"
                                        nameKey="label"
                                        cornerRadius={0}
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
                                                <div className="rounded-lg border border-border bg-card/95 backdrop-blur-md px-3 py-2 shadow-xl">
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                                                            style={{ backgroundColor: item.fill }}
                                                        />
                                                        <span className="text-sm font-medium text-white">{item.label}</span>
                                                    </div>
                                                    <p className="mt-0.5 text-sm text-slate-300">
                                                        {formatAmountCLP(Number(payload[0].value ?? 0))} ({item.percentage?.toFixed(1)}%)
                                                    </p>
                                                </div>
                                            );
                                        }}
                                        cursor={false}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-2 md:min-w-[140px] md:justify-center md:shrink-0">
                            {data.map((entry) => (
                                <div key={entry.name} className="flex items-center gap-2">
                                    <span
                                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                                        style={{ backgroundColor: entry.fill }}
                                    />
                                    <span className="text-sm text-foreground truncate">{entry.label}</span>
                                    <span className="text-sm text-muted-foreground ml-1 md:ml-auto shrink-0">
                                        {entry.percentage?.toFixed(0)}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm italic">
                        No hay gastos registrados en este mes.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}