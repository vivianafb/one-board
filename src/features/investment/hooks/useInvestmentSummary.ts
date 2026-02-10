import { useMemo } from "react";
import type { Investment } from "@/types/finance";

export function useInvestmentSummary(investments: Investment[]) {
  return useMemo(() => {
    const total = investments.reduce((sum, i) => sum + i.amountCLP, 0);
    const count = investments.length;
    return { total, count };
  }, [investments]);
}
