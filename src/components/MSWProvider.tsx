"use client";

import { useEffect } from "react";
import { useInvestmentStore } from "@/features/investment/store";
import { useTransactionsStore } from "@/features/transactions/store";
import { useSavingsStore } from "@/features/savings/store";

async function startMSW() {
  if (process.env.NODE_ENV !== "development") return;
  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

export default function MSWProvider({ children }: { children: React.ReactNode }) {
  const initInvestments = useInvestmentStore((s) => s.actions.initialize);
  const initTransactions = useTransactionsStore((s) => s.actions.initialize);
  const initSavings = useSavingsStore((s) => s.actions.initialize);

  useEffect(() => {
    startMSW().then(() =>
      Promise.all([initInvestments(), initTransactions(), initSavings()])
    );
  }, []);

  return <>{children}</>;
}
