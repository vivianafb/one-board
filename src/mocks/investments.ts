import { Investment } from "@/types/finance";

const investments: Investment[] = [
  {
    id: "inv-1",
    name: "Fintual Risky Norris",
    type: "ETF",
    provider: "Fintual",
    currency: "CLP",
    investedAmount: 1200000,
    currentValue: 1458000,
    createdAt: "2025-08-15",
    periods: [
      { periodId: "2025-08", label: "Ago 2025", startValue: 1200000, endValue: 1218000 },
      { periodId: "2025-09", label: "Sep 2025", startValue: 1218000, endValue: 1255000 },
      { periodId: "2025-10", label: "Oct 2025", startValue: 1255000, endValue: 1290000 },
      { periodId: "2025-11", label: "Nov 2025", startValue: 1290000, endValue: 1340000 },
      { periodId: "2025-12", label: "Dic 2025", startValue: 1340000, endValue: 1361000 },
      { periodId: "2026-01", label: "Ene 2026", startValue: 1361000, endValue: 1385000 },
      { periodId: "2026-02", label: "Feb 2026", startValue: 1385000, endValue: 1408000 },
      { periodId: "2026-03", label: "Mar 2026", startValue: 1408000, endValue: 1375000 }, // caída
      { periodId: "2026-04", label: "Abr 2026", startValue: 1375000, endValue: 1403000 },
      { periodId: "2026-05", label: "May 2026", startValue: 1403000, endValue: 1431000 },
      { periodId: "2026-06", label: "Jun 2026", startValue: 1431000, endValue: 1458000 },
    ],
  },
  {
    id: "inv-2",
    name: "ETF S&P 500 (IVV)",
    type: "ETF",
    provider: "Interactive Brokers",
    currency: "USD",
    investedAmount: 1500,
    currentValue: 1868,
    createdAt: "2025-03-10",
    periods: [
      { periodId: "2025-03", label: "Mar 2025", startValue: 1500, endValue: 1520 },
      { periodId: "2025-06", label: "Jun 2025", startValue: 1520, endValue: 1580 },
      { periodId: "2025-09", label: "Sep 2025", startValue: 1580, endValue: 1650 },
      { periodId: "2025-12", label: "Dic 2025", startValue: 1650, endValue: 1700 },
      { periodId: "2026-01", label: "Ene 2026", startValue: 1700, endValue: 1742 },
      { periodId: "2026-02", label: "Feb 2026", startValue: 1742, endValue: 1778 },
      { periodId: "2026-03", label: "Mar 2026", startValue: 1778, endValue: 1748 }, // corrección
      { periodId: "2026-04", label: "Abr 2026", startValue: 1748, endValue: 1795 },
      { periodId: "2026-05", label: "May 2026", startValue: 1795, endValue: 1832 },
      { periodId: "2026-06", label: "Jun 2026", startValue: 1832, endValue: 1868 },
    ],
  },
  {
    id: "inv-3",
    name: "Bitcoin",
    type: "ETF",
    provider: "Buda.com",
    currency: "USD",
    investedAmount: 800,
    currentValue: 1250,
    createdAt: "2025-11-01",
    periods: [
      { periodId: "2025-11", label: "Nov 2025", startValue: 800,  endValue: 920  },
      { periodId: "2025-12", label: "Dic 2025", startValue: 920,  endValue: 980  },
      { periodId: "2026-01", label: "Ene 2026", startValue: 980,  endValue: 1150 },
      { periodId: "2026-02", label: "Feb 2026", startValue: 1150, endValue: 1320 }, // rally fuerte
      { periodId: "2026-03", label: "Mar 2026", startValue: 1320, endValue: 1105 }, // caída brusca
      { periodId: "2026-04", label: "Abr 2026", startValue: 1105, endValue: 1280 }, // recuperación
      { periodId: "2026-05", label: "May 2026", startValue: 1280, endValue: 1390 },
      { periodId: "2026-06", label: "Jun 2026", startValue: 1390, endValue: 1250 }, // nueva corrección
    ],
  },
  {
    id: "inv-4",
    name: "Depósito a plazo 180 días",
    type: "CASH_INTEREST",
    provider: "Banco BCI",
    currency: "CLP",
    investedAmount: 2000000,
    currentValue: 2139000,
    createdAt: "2025-12-01",
    periods: [
      { periodId: "2025-12", label: "Dic 2025", startValue: 2000000, endValue: 2019000 },
      { periodId: "2026-01", label: "Ene 2026", startValue: 2019000, endValue: 2039000 },
      { periodId: "2026-02", label: "Feb 2026", startValue: 2039000, endValue: 2058000 },
      { periodId: "2026-03", label: "Mar 2026", startValue: 2058000, endValue: 2078000 },
      { periodId: "2026-04", label: "Abr 2026", startValue: 2078000, endValue: 2098000 },
      { periodId: "2026-05", label: "May 2026", startValue: 2098000, endValue: 2119000 },
      { periodId: "2026-06", label: "Jun 2026", startValue: 2119000, endValue: 2139000 },
    ],
  },
  {
    id: "inv-5",
    name: "Fondo Mutuo Conservador",
    type: "CASH_INTEREST",
    provider: "Banco Estado",
    currency: "CLP",
    investedAmount: 800000,
    currentValue: 845000,
    createdAt: "2025-09-01",
    periods: [
      { periodId: "2025-09", label: "Sep 2025", startValue: 800000, endValue: 805000 },
      { periodId: "2025-10", label: "Oct 2025", startValue: 805000, endValue: 810000 },
      { periodId: "2025-11", label: "Nov 2025", startValue: 810000, endValue: 815000 },
      { periodId: "2025-12", label: "Dic 2025", startValue: 815000, endValue: 819000 },
      { periodId: "2026-01", label: "Ene 2026", startValue: 819000, endValue: 823000 },
      { periodId: "2026-02", label: "Feb 2026", startValue: 823000, endValue: 827000 },
      { periodId: "2026-03", label: "Mar 2026", startValue: 827000, endValue: 831000 },
      { periodId: "2026-04", label: "Abr 2026", startValue: 831000, endValue: 836000 },
      { periodId: "2026-05", label: "May 2026", startValue: 836000, endValue: 840000 },
      { periodId: "2026-06", label: "Jun 2026", startValue: 840000, endValue: 845000 },
    ],
  },
  {
    id: "inv-6",
    name: "Acciones FALABELLA",
    type: "ETF",
    provider: "Renta4",
    currency: "CLP",
    investedAmount: 450000,
    currentValue: 388000,
    createdAt: "2025-06-20",
    periods: [
      { periodId: "2025-06", label: "Jun 2025", startValue: 450000, endValue: 440000 },
      { periodId: "2025-09", label: "Sep 2025", startValue: 440000, endValue: 415000 },
      { periodId: "2025-12", label: "Dic 2025", startValue: 415000, endValue: 402000 },
      { periodId: "2026-01", label: "Ene 2026", startValue: 402000, endValue: 389000 },
      { periodId: "2026-02", label: "Feb 2026", startValue: 389000, endValue: 378000 }, // sigue bajando
      { periodId: "2026-03", label: "Mar 2026", startValue: 378000, endValue: 371000 }, // mínimo
      { periodId: "2026-04", label: "Abr 2026", startValue: 371000, endValue: 385000 }, // recuperación
      { periodId: "2026-05", label: "May 2026", startValue: 385000, endValue: 392000 },
      { periodId: "2026-06", label: "Jun 2026", startValue: 392000, endValue: 388000 }, // leve retroceso
    ],
  },
  {
    id: "inv-7",
    name: "AFP Modelo Fondo C",
    type: "CASH_INTEREST",
    provider: "AFP Modelo",
    currency: "CLP",
    investedAmount: 3500000,
    currentValue: 4073000,
    createdAt: "2022-01-01",
    periods: [
      { periodId: "2025-09", label: "Sep 2025", startValue: 3650000, endValue: 3700000 },
      { periodId: "2025-12", label: "Dic 2025", startValue: 3700000, endValue: 3760000 },
      { periodId: "2026-01", label: "Ene 2026", startValue: 3760000, endValue: 3812000 },
      { periodId: "2026-02", label: "Feb 2026", startValue: 3812000, endValue: 3862000 },
      { periodId: "2026-03", label: "Mar 2026", startValue: 3862000, endValue: 3914000 },
      { periodId: "2026-04", label: "Abr 2026", startValue: 3914000, endValue: 3966000 },
      { periodId: "2026-05", label: "May 2026", startValue: 3966000, endValue: 4019000 },
      { periodId: "2026-06", label: "Jun 2026", startValue: 4019000, endValue: 4073000 },
    ],
  },
  {
    id: "inv-8",
    name: "ETF Nasdaq-100 (QQQ)",
    type: "ETF",
    provider: "Interactive Brokers",
    currency: "USD",
    investedAmount: 600,
    currentValue: 758,
    createdAt: "2025-10-05",
    periods: [
      { periodId: "2025-10", label: "Oct 2025", startValue: 600, endValue: 625 },
      { periodId: "2025-11", label: "Nov 2025", startValue: 625, endValue: 660 },
      { periodId: "2025-12", label: "Dic 2025", startValue: 660, endValue: 690 },
      { periodId: "2026-01", label: "Ene 2026", startValue: 690, endValue: 715 },
      { periodId: "2026-02", label: "Feb 2026", startValue: 715, endValue: 748 }, // tech rally
      { periodId: "2026-03", label: "Mar 2026", startValue: 748, endValue: 712 }, // corrección tech
      { periodId: "2026-04", label: "Abr 2026", startValue: 712, endValue: 745 },
      { periodId: "2026-05", label: "May 2026", startValue: 745, endValue: 772 },
      { periodId: "2026-06", label: "Jun 2026", startValue: 772, endValue: 758 }, // leve retroceso
    ],
  },
];

export default investments;
