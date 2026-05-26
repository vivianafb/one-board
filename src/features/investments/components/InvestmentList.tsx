"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatAmountCLP, formatAmountUSD } from "@/lib/format";
import type { Investment } from "@/types/finance";

function formatAmount(currency: "CLP" | "USD", value: number) {
  return currency === "CLP" ? formatAmountCLP(value) : formatAmountUSD(value);
}

type InvestmentListProps = {
  investments: Investment[];
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function InvestmentList({ investments }: InvestmentListProps) {
  return (
    <div className="ob-card-glass overflow-hidden p-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right tabular-nums">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investments.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.name}</TableCell>
            <TableCell>{formatDate(inv.createdAt)}</TableCell>
            <TableCell className="text-right tabular-nums">{formatAmount(inv.currency, inv.currentValue)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
