"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { Investment } from "../types";
import { buildPortfolioTimeline } from "../utils/portfolio";
import { formatAmountCLP } from "@/lib/format";
import { getGainClass } from "../utils/ui";
import { CHART_COLORS } from "@/lib/constants";

const USD_TO_CLP = 1000;

type Props = { investments: Investment[] };

export function PortfolioCard({ investments }: Props) {
  const timeline = useMemo(() => buildPortfolioTimeline(investments), [investments]);

  const totalInvested = useMemo(
    () =>
      investments.reduce(
        (sum, inv) =>
          sum + (inv.currency === "CLP" ? inv.investedAmount : inv.investedAmount * USD_TO_CLP),
        0
      ),
    [investments]
  );

  const currentValue = useMemo(
    () =>
      investments.reduce(
        (sum, inv) =>
          sum + (inv.currency === "CLP" ? inv.currentValue : inv.currentValue * USD_TO_CLP),
        0
      ),
    [investments]
  );

  const gain = currentValue - totalInvested;
  const gainPercent = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;

  const yMin = useMemo(() => {
    if (timeline.length === 0) return 0;
    const min = Math.min(...timeline.map((p) => p.totalValue));
    return Math.floor(min * 0.98);
  }, [timeline]);

  return (
    <div className="ob-card-glass p-5 space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Invertido total" value={formatAmountCLP(totalInvested)} />
        <StatCard label="Valor actual" value={formatAmountCLP(currentValue)} />
        <StatCard
          label="Ganancia $"
          value={`${gain >= 0 ? "+" : ""}${formatAmountCLP(gain)}`}
          valueClass={getGainClass(gain)}
        />
        <StatCard
          label="Ganancia %"
          value={`${gainPercent >= 0 ? "+" : ""}${gainPercent.toFixed(1)}%`}
          valueClass={getGainClass(gainPercent)}
        />
      </div>

      {timeline.length > 1 && (
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeline} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[yMin, "auto"]}
                tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip
                formatter={(value: number | undefined) => [value != null ? formatAmountCLP(value) : "—", "Portfolio"]}
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="totalValue"
                stroke={CHART_COLORS[0]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className={`text-base font-bold tabular-nums ${valueClass ?? ""}`}>{value}</p>
    </div>
  );
}
