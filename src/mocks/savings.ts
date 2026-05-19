import { SavingGoal } from "@/types/finance";

const savings: SavingGoal[] = [
  {
    id: "sav-1",
    name: "Fondo de emergencia",
    targetAmount: 2500000,
    currentAmount: 2200000,
    currency: "CLP",
    category: "EMERGENCY_FUND",
    createdAt: "2025-01-01",
  },
  {
    id: "sav-2",
    name: "Viaje a Europa",
    targetAmount: 3000000,
    currentAmount: 1850000,
    currency: "CLP",
    category: "TRAVEL",
    deadline: "2026-12-01",
    createdAt: "2025-06-01",
  },
  {
    id: "sav-3",
    name: "MacBook Pro",
    targetAmount: 1200000,
    currentAmount: 320000,
    currency: "CLP",
    category: "OTHER",
    deadline: "2026-09-01",
    createdAt: "2026-01-15",
  },
  {
    id: "sav-4",
    name: "Pie del auto",
    targetAmount: 5000000,
    currentAmount: 750000,
    currency: "CLP",
    category: "OTHER",
    deadline: "2027-06-01",
    createdAt: "2026-02-01",
  },
  {
    id: "sav-5",
    name: "Fondo de hogar",
    targetAmount: 8000000,
    currentAmount: 7600000,
    currency: "CLP",
    category: "HOME",
    deadline: "2026-07-01",
    createdAt: "2023-03-01",
  },
];

export default savings;
