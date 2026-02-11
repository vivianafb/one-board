import { Investment } from "@/types/finance";

const investments: Investment[] = [
  { id: "inv-1", name: "Fondo A", type: "ETF", provider: "Banco Estado", currency: "CLP", investedAmount: 480000, currentValue: 500000, createdAt: "2026-01-05" },
  { id: "inv-2", name: "Acciones XYZ", type: "ETF", provider: "Fintual", currency: "CLP", investedAmount: 280000, currentValue: 300000, createdAt: "2026-01-15" },
  { id: "inv-3", name: "AFP", type: "CASH_INTEREST", provider: "Habitat", currency: "CLP", investedAmount: 195000, currentValue: 200000, createdAt: "2026-02-01" },
  { id: "inv-4", name: "Depósito a plazo", type: "CASH_INTEREST", provider: "BCI", currency: "CLP", investedAmount: 1000000, currentValue: 1005000, createdAt: "2026-02-03" },
  { id: "inv-5", name: "Fondo B", type: "ETF", provider: "Capitalizarme", currency: "CLP", investedAmount: 240000, currentValue: 250000, createdAt: "2026-02-10" },
  { id: "inv-6", name: "Cripto", type: "ETF", provider: "Buda", currency: "CLP", investedAmount: 140000, currentValue: 150000, createdAt: "2026-02-08" },
  { id: "inv-7", name: "ETF S&P", type: "ETF", provider: "Interactive Brokers", currency: "USD", investedAmount: 350, currentValue: 400, createdAt: "2026-01-20" },
  { id: "inv-8", name: "Bono 2026", type: "CASH_INTEREST", provider: "Banco Chile", currency: "CLP", investedAmount: 590000, currentValue: 600000, createdAt: "2026-02-05" },
];

export default investments;
