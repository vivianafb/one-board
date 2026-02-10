"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatAmountCLP } from "@/lib/format";
import type { Investment } from "@/types/finance";

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investments.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.name}</TableCell>
            <TableCell>{formatDate(inv.createdAt)}</TableCell>
            <TableCell className="text-right">{formatAmountCLP(inv.amountCLP)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
