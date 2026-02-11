import { useMemo } from "react";
import type { Investment } from "@/types/finance";

const USD_TO_CLP = 1000; // Tasa aproximada para totalizar (ajustar si se usa API de tasas)

export function useInvestmentSummary(investments: Investment[]) {
  return useMemo(() => {
    const totalCLP = investments.reduce((sum, i) => {
      return sum + (i.currency === "CLP" ? i.currentValue : i.currentValue * USD_TO_CLP);
    }, 0);
    const count = investments.length;
    return { total: totalCLP, count };
  }, [investments]);
}
