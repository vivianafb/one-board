"use client";

import { useEffect } from "react";
import { HttpInvestmentRepository } from "@/features/investments/http-repository";
import { createInvestmentService } from "@/features/investments/service";
import { HttpTransactionRepository } from "@/features/transactions/http-repository";
import { createTransactionService } from "@/features/transactions/service";
import { HttpSavingsRepository } from "@/features/savings/http-repository";
import { createSavingsService } from "@/features/savings/service";

async function startMSW() {
  if (process.env.NODE_ENV !== "development") return;
  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

export default function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startMSW().then(() => {
      Promise.all([
        createInvestmentService(new HttpInvestmentRepository()).load(),
        createTransactionService(new HttpTransactionRepository()).load(),
        createSavingsService(new HttpSavingsRepository()).load(),
      ]);
    });
  }, []);

  return <>{children}</>;
}
