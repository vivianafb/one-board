"use client";

import { InvestmentsView } from "@/features/investment/components/InvestmentsView";

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="ob-page-title">Inversiones</h1>
      <InvestmentsView />
    </div>
  );
}
