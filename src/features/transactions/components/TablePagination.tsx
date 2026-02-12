"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationData } from "../utils/transactions-table";
import { PAGE_SIZE_OPTIONS } from "../constants";

type TablePaginationProps = {
  paginationData: PaginationData;
  pageSize: number;
  onPageSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPageChange: (page: number) => void;
};

export function TablePagination({
  paginationData,
  pageSize,
  onPageSizeChange,
  onPageChange,
}: TablePaginationProps) {
  const { startIndex, endIndex, total, effectivePage, totalPages } = paginationData;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm">
      <p className="text-muted-foreground">
        Mostrando <span className="font-medium text-foreground">{startIndex}</span>
        {" – "}
        <span className="font-medium text-foreground">{endIndex}</span>
        {" de "}
        <span className="font-medium text-foreground">{total}</span>
        {" movimientos"}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="whitespace-nowrap text-muted-foreground">
            Filas por página
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={onPageSizeChange}
            className="h-8 rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(effectivePage - 1)}
            disabled={effectivePage <= 1}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="min-w-[6rem] px-2 text-center text-muted-foreground">
            Página {effectivePage} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(effectivePage + 1)}
            disabled={effectivePage >= totalPages}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            aria-label="Página siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
