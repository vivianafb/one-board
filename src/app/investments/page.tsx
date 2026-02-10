// src/app/investments/page.tsx
import { InvestmentsView } from "@/features/investment/components/InvestmentsView";

export default function InvestmentsPage() {
  return (
    <>
      <h2 className="ob-page-title">Inversiones</h2>
      <InvestmentsView />
    </>
  );
}
