import { SavingGoal } from "@/types/finance";

const savings: SavingGoal[] = [
    {
        id: "1",
        name: "Fondo de emergencia",
        targetAmount: 1000000,
        currentAmount: 100000,
        currency: "CLP",
        category: "EMERGENCY_FUND",
        createdAt: "2026-01-01",
    },
    {
        id: "2",
        name: "Fondo de viaje",
        targetAmount: 1000000,
        currentAmount: 100000,
        currency: "CLP",
        category: "TRAVEL",
        createdAt: "2026-01-01",
    },
    {
        id: "3",
        name: "Fondo de hogar",
        targetAmount: 1000000,
        currentAmount: 100000,
        currency: "CLP",
        category: "HOME",
        createdAt: "2026-01-01",
    },
];

export default savings;
