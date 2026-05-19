import { Transaction } from "@/types/finance";

const transactions: Transaction[] = [
  // ── Enero 2026 ────────────────────────────────────────────────────────────
  {
    id: "t-jan-01", amountCLP: 820000, description: "Sueldo enero",
    type: "income", createdAt: "2026-01-01", paymentMethod: "bank_transfer",
  },
  {
    id: "t-jan-02", amountCLP: 350000, description: "Arriendo enero",
    type: "expense", expenseType: "fixed", expenseCategory: "RENT",
    createdAt: "2026-01-02", paymentMethod: "bank_transfer",
  },
  {
    id: "t-jan-03", amountCLP: 32400, description: "Cuenta de luz enero",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-01-05", paymentMethod: "debit_card",
  },
  {
    id: "t-jan-04", amountCLP: 14200, description: "Cuenta de agua enero",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-01-05", paymentMethod: "debit_card",
  },
  {
    id: "t-jan-05", amountCLP: 24990, description: "Internet Movistar enero",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-01-05", paymentMethod: "bank_transfer",
  },
  {
    id: "t-jan-06", amountCLP: 118500, description: "Supermercado Jumbo",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-01-08", paymentMethod: "debit_card",
  },
  {
    id: "t-jan-07", amountCLP: 38900, description: "Bencina Copec",
    type: "expense", expenseType: "variable", expenseCategory: "TRANSPORT",
    createdAt: "2026-01-10", paymentMethod: "debit_card",
  },
  {
    id: "t-jan-08", amountCLP: 22500, description: "Almuerzo La Fuente",
    type: "expense", expenseType: "variable", expenseCategory: "FOOD",
    createdAt: "2026-01-12", paymentMethod: "credit_card",
  },
  {
    id: "t-jan-09", amountCLP: 19990, description: "Netflix + Spotify",
    type: "expense", expenseType: "fixed", expenseCategory: "ENTERTAINMENT",
    createdAt: "2026-01-13", paymentMethod: "credit_card",
  },
  {
    id: "t-jan-10", amountCLP: 42000, description: "Farmacia Salcobrand",
    type: "expense", expenseType: "variable", expenseCategory: "HEALTH",
    createdAt: "2026-01-15", paymentMethod: "debit_card",
  },
  {
    id: "t-jan-11", amountCLP: 150000, description: "Freelance — diseño UX",
    type: "income", createdAt: "2026-01-18", paymentMethod: "bank_transfer",
  },
  {
    id: "t-jan-12", amountCLP: 55000, description: "Cena cumpleaños La Mar",
    type: "expense", expenseType: "variable", expenseCategory: "FOOD",
    createdAt: "2026-01-20", paymentMethod: "credit_card",
  },
  {
    id: "t-jan-13", amountCLP: 28000, description: "Uber",
    type: "expense", expenseType: "variable", expenseCategory: "TRANSPORT",
    createdAt: "2026-01-22", paymentMethod: "credit_card",
  },
  {
    id: "t-jan-14", amountCLP: 67000, description: "Supermercado Líder",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-01-25", paymentMethod: "debit_card",
  },
  {
    id: "t-jan-15", amountCLP: 15000, description: "Estacionamiento mes enero",
    type: "expense", expenseType: "fixed", expenseCategory: "TRANSPORT",
    createdAt: "2026-01-28", paymentMethod: "cash",
  },

  // ── Febrero 2026 ──────────────────────────────────────────────────────────
  {
    id: "t-feb-01", amountCLP: 820000, description: "Sueldo febrero",
    type: "income", createdAt: "2026-02-01", paymentMethod: "bank_transfer",
  },
  {
    id: "t-feb-02", amountCLP: 350000, description: "Arriendo febrero",
    type: "expense", expenseType: "fixed", expenseCategory: "RENT",
    createdAt: "2026-02-02", paymentMethod: "bank_transfer",
  },
  {
    id: "t-feb-03", amountCLP: 31800, description: "Cuenta de luz febrero",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-02-05", paymentMethod: "debit_card",
  },
  {
    id: "t-feb-04", amountCLP: 13900, description: "Cuenta de agua febrero",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-02-05", paymentMethod: "debit_card",
  },
  {
    id: "t-feb-05", amountCLP: 24990, description: "Internet Movistar febrero",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-02-05", paymentMethod: "bank_transfer",
  },
  {
    id: "t-feb-06", amountCLP: 125000, description: "Supermercado Jumbo",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-02-07", paymentMethod: "debit_card",
  },
  {
    id: "t-feb-07", amountCLP: 75000, description: "Bono fiestas patrias",
    type: "income", createdAt: "2026-02-10", paymentMethod: "bank_transfer",
  },
  {
    id: "t-feb-08", amountCLP: 41500, description: "Bencina Shell",
    type: "expense", expenseType: "variable", expenseCategory: "TRANSPORT",
    createdAt: "2026-02-11", paymentMethod: "debit_card",
  },
  {
    id: "t-feb-09", amountCLP: 18500, description: "Uber Eats",
    type: "expense", expenseType: "variable", expenseCategory: "FOOD",
    createdAt: "2026-02-13", paymentMethod: "credit_card",
  },
  {
    id: "t-feb-10", amountCLP: 19990, description: "Netflix + Spotify",
    type: "expense", expenseType: "fixed", expenseCategory: "ENTERTAINMENT",
    createdAt: "2026-02-13", paymentMethod: "credit_card",
  },
  {
    id: "t-feb-11", amountCLP: 63000, description: "Supermercado Lider",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-02-18", paymentMethod: "credit_card",
  },
  {
    id: "t-feb-12", amountCLP: 34000, description: "Cine + entradas",
    type: "expense", expenseType: "variable", expenseCategory: "ENTERTAINMENT",
    createdAt: "2026-02-20", paymentMethod: "cash",
  },
  {
    id: "t-feb-13", amountCLP: 200000, description: "Freelance — desarrollo web",
    type: "income", createdAt: "2026-02-22", paymentMethod: "bank_transfer",
  },
  {
    id: "t-feb-14", amountCLP: 28500, description: "Dentista",
    type: "expense", expenseType: "variable", expenseCategory: "HEALTH",
    createdAt: "2026-02-25", paymentMethod: "debit_card",
  },
  {
    id: "t-feb-15", amountCLP: 15000, description: "Estacionamiento mes febrero",
    type: "expense", expenseType: "fixed", expenseCategory: "TRANSPORT",
    createdAt: "2026-02-28", paymentMethod: "cash",
  },

  // ── Marzo 2026 ────────────────────────────────────────────────────────────
  {
    id: "t-mar-01", amountCLP: 820000, description: "Sueldo marzo",
    type: "income", createdAt: "2026-03-01", paymentMethod: "bank_transfer",
  },
  {
    id: "t-mar-02", amountCLP: 350000, description: "Arriendo marzo",
    type: "expense", expenseType: "fixed", expenseCategory: "RENT",
    createdAt: "2026-03-02", paymentMethod: "bank_transfer",
  },
  {
    id: "t-mar-03", amountCLP: 33500, description: "Cuenta de luz marzo",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-03-05", paymentMethod: "debit_card",
  },
  {
    id: "t-mar-04", amountCLP: 14500, description: "Cuenta de agua marzo",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-03-05", paymentMethod: "debit_card",
  },
  {
    id: "t-mar-05", amountCLP: 24990, description: "Internet Movistar marzo",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-03-05", paymentMethod: "bank_transfer",
  },
  {
    id: "t-mar-06", amountCLP: 112000, description: "Supermercado Jumbo",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-03-08", paymentMethod: "debit_card",
  },
  {
    id: "t-mar-07", amountCLP: 44000, description: "Bencina Copec",
    type: "expense", expenseType: "variable", expenseCategory: "TRANSPORT",
    createdAt: "2026-03-10", paymentMethod: "debit_card",
  },
  {
    id: "t-mar-08", amountCLP: 89000, description: "Ropa Zara",
    type: "expense", expenseType: "variable", expenseCategory: "OTHERS",
    createdAt: "2026-03-12", paymentMethod: "credit_card",
  },
  {
    id: "t-mar-09", amountCLP: 19990, description: "Netflix + Spotify",
    type: "expense", expenseType: "fixed", expenseCategory: "ENTERTAINMENT",
    createdAt: "2026-03-13", paymentMethod: "credit_card",
  },
  {
    id: "t-mar-10", amountCLP: 32000, description: "Farmacia Cruz Verde",
    type: "expense", expenseType: "variable", expenseCategory: "HEALTH",
    createdAt: "2026-03-15", paymentMethod: "debit_card",
  },
  {
    id: "t-mar-11", amountCLP: 180000, description: "Freelance — consultoría",
    type: "income", createdAt: "2026-03-17", paymentMethod: "bank_transfer",
  },
  {
    id: "t-mar-12", amountCLP: 48000, description: "Almuerzo de trabajo",
    type: "expense", expenseType: "variable", expenseCategory: "FOOD",
    createdAt: "2026-03-19", paymentMethod: "credit_card",
  },
  {
    id: "t-mar-13", amountCLP: 58000, description: "Supermercado Líder",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-03-21", paymentMethod: "debit_card",
  },
  {
    id: "t-mar-14", amountCLP: 25000, description: "Uber",
    type: "expense", expenseType: "variable", expenseCategory: "TRANSPORT",
    createdAt: "2026-03-23", paymentMethod: "credit_card",
  },
  {
    id: "t-mar-15", amountCLP: 15000, description: "Estacionamiento mes marzo",
    type: "expense", expenseType: "fixed", expenseCategory: "TRANSPORT",
    createdAt: "2026-03-28", paymentMethod: "cash",
  },

  // ── Abril 2026 ────────────────────────────────────────────────────────────
  {
    id: "t-apr-01", amountCLP: 820000, description: "Sueldo abril",
    type: "income", createdAt: "2026-04-01", paymentMethod: "bank_transfer",
  },
  {
    id: "t-apr-02", amountCLP: 360000, description: "Arriendo abril (ajuste IPC)",
    type: "expense", expenseType: "fixed", expenseCategory: "RENT",
    createdAt: "2026-04-02", paymentMethod: "bank_transfer",
  },
  {
    id: "t-apr-03", amountCLP: 30200, description: "Cuenta de luz abril",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-04-05", paymentMethod: "debit_card",
  },
  {
    id: "t-apr-04", amountCLP: 13500, description: "Cuenta de agua abril",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-04-05", paymentMethod: "debit_card",
  },
  {
    id: "t-apr-05", amountCLP: 24990, description: "Internet Movistar abril",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-04-05", paymentMethod: "bank_transfer",
  },
  {
    id: "t-apr-06", amountCLP: 130000, description: "Supermercado Jumbo",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-04-08", paymentMethod: "debit_card",
  },
  {
    id: "t-apr-07", amountCLP: 39000, description: "Bencina Copec",
    type: "expense", expenseType: "variable", expenseCategory: "TRANSPORT",
    createdAt: "2026-04-10", paymentMethod: "debit_card",
  },
  {
    id: "t-apr-08", amountCLP: 19990, description: "Netflix + Spotify",
    type: "expense", expenseType: "fixed", expenseCategory: "ENTERTAINMENT",
    createdAt: "2026-04-13", paymentMethod: "credit_card",
  },
  {
    id: "t-apr-09", amountCLP: 35000, description: "Cena restaurante",
    type: "expense", expenseType: "variable", expenseCategory: "FOOD",
    createdAt: "2026-04-15", paymentMethod: "credit_card",
  },
  {
    id: "t-apr-10", amountCLP: 120000, description: "Seguro auto semestral",
    type: "expense", expenseType: "fixed", expenseCategory: "OTHERS",
    createdAt: "2026-04-16", paymentMethod: "bank_transfer",
  },
  {
    id: "t-apr-11", amountCLP: 55000, description: "Supermercado Líder",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-04-18", paymentMethod: "debit_card",
  },
  {
    id: "t-apr-12", amountCLP: 250000, description: "Freelance — app móvil",
    type: "income", createdAt: "2026-04-20", paymentMethod: "bank_transfer",
  },
  {
    id: "t-apr-13", amountCLP: 45000, description: "Farmacia Salcobrand",
    type: "expense", expenseType: "variable", expenseCategory: "HEALTH",
    createdAt: "2026-04-22", paymentMethod: "debit_card",
  },
  {
    id: "t-apr-14", amountCLP: 22000, description: "Uber",
    type: "expense", expenseType: "variable", expenseCategory: "TRANSPORT",
    createdAt: "2026-04-24", paymentMethod: "credit_card",
  },
  {
    id: "t-apr-15", amountCLP: 15000, description: "Estacionamiento mes abril",
    type: "expense", expenseType: "fixed", expenseCategory: "TRANSPORT",
    createdAt: "2026-04-28", paymentMethod: "cash",
  },

  // ── Mayo 2026 ─────────────────────────────────────────────────────────────
  {
    id: "t-may-01", amountCLP: 820000, description: "Sueldo mayo",
    type: "income", createdAt: "2026-05-01", paymentMethod: "bank_transfer",
  },
  {
    id: "t-may-02", amountCLP: 360000, description: "Arriendo mayo",
    type: "expense", expenseType: "fixed", expenseCategory: "RENT",
    createdAt: "2026-05-02", paymentMethod: "bank_transfer",
  },
  {
    id: "t-may-03", amountCLP: 29800, description: "Cuenta de luz mayo",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-05-05", paymentMethod: "debit_card",
  },
  {
    id: "t-may-04", amountCLP: 14000, description: "Cuenta de agua mayo",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-05-05", paymentMethod: "debit_card",
  },
  {
    id: "t-may-05", amountCLP: 24990, description: "Internet Movistar mayo",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-05-05", paymentMethod: "bank_transfer",
  },
  {
    id: "t-may-06", amountCLP: 122000, description: "Supermercado Jumbo",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-05-08", paymentMethod: "debit_card",
  },
  {
    id: "t-may-07", amountCLP: 40000, description: "Bencina Petrobras",
    type: "expense", expenseType: "variable", expenseCategory: "TRANSPORT",
    createdAt: "2026-05-10", paymentMethod: "debit_card",
  },
  {
    id: "t-may-08", amountCLP: 19990, description: "Netflix + Spotify",
    type: "expense", expenseType: "fixed", expenseCategory: "ENTERTAINMENT",
    createdAt: "2026-05-13", paymentMethod: "credit_card",
  },
  {
    id: "t-may-09", amountCLP: 68000, description: "Compras Amazon",
    type: "expense", expenseType: "variable", expenseCategory: "OTHERS",
    createdAt: "2026-05-14", paymentMethod: "credit_card",
  },
  {
    id: "t-may-10", amountCLP: 28000, description: "Almuerzo trabajo",
    type: "expense", expenseType: "variable", expenseCategory: "FOOD",
    createdAt: "2026-05-15", paymentMethod: "credit_card",
  },
  {
    id: "t-may-11", amountCLP: 55000, description: "Supermercado Líder",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-05-17", paymentMethod: "debit_card",
  },
  {
    id: "t-may-12", amountCLP: 300000, description: "Bono desempeño",
    type: "income", createdAt: "2026-05-19", paymentMethod: "bank_transfer",
  },
  {
    id: "t-may-13", amountCLP: 52000, description: "Salida con amigos",
    type: "expense", expenseType: "variable", expenseCategory: "ENTERTAINMENT",
    createdAt: "2026-05-20", paymentMethod: "credit_card",
  },
  {
    id: "t-may-14", amountCLP: 31000, description: "Farmacia Cruz Verde",
    type: "expense", expenseType: "variable", expenseCategory: "HEALTH",
    createdAt: "2026-05-22", paymentMethod: "debit_card",
  },
  {
    id: "t-may-15", amountCLP: 15000, description: "Estacionamiento mes mayo",
    type: "expense", expenseType: "fixed", expenseCategory: "TRANSPORT",
    createdAt: "2026-05-28", paymentMethod: "cash",
  },

  // ── Junio 2026 ────────────────────────────────────────────────────────────
  {
    id: "t-jun-01", amountCLP: 820000, description: "Sueldo junio",
    type: "income", createdAt: "2026-06-01", paymentMethod: "bank_transfer",
  },
  {
    id: "t-jun-02", amountCLP: 360000, description: "Arriendo junio",
    type: "expense", expenseType: "fixed", expenseCategory: "RENT",
    createdAt: "2026-06-02", paymentMethod: "bank_transfer",
  },
  {
    id: "t-jun-03", amountCLP: 38500, description: "Cuenta de luz junio (calefacción)",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-06-05", paymentMethod: "debit_card",
  },
  {
    id: "t-jun-04", amountCLP: 14200, description: "Cuenta de agua junio",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-06-05", paymentMethod: "debit_card",
  },
  {
    id: "t-jun-05", amountCLP: 24990, description: "Internet Movistar junio",
    type: "expense", expenseType: "fixed", expenseCategory: "SERVICES",
    createdAt: "2026-06-05", paymentMethod: "bank_transfer",
  },
  {
    id: "t-jun-06", amountCLP: 135000, description: "Supermercado Jumbo",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-06-07", paymentMethod: "debit_card",
  },
  {
    id: "t-jun-07", amountCLP: 43000, description: "Bencina Copec",
    type: "expense", expenseType: "variable", expenseCategory: "TRANSPORT",
    createdAt: "2026-06-09", paymentMethod: "debit_card",
  },
  {
    id: "t-jun-08", amountCLP: 19990, description: "Netflix + Spotify",
    type: "expense", expenseType: "fixed", expenseCategory: "ENTERTAINMENT",
    createdAt: "2026-06-13", paymentMethod: "credit_card",
  },
  {
    id: "t-jun-09", amountCLP: 175000, description: "Freelance — landing page",
    type: "income", createdAt: "2026-06-15", paymentMethod: "bank_transfer",
  },
  {
    id: "t-jun-10", amountCLP: 42000, description: "Cena aniversario",
    type: "expense", expenseType: "variable", expenseCategory: "FOOD",
    createdAt: "2026-06-16", paymentMethod: "credit_card",
  },
  {
    id: "t-jun-11", amountCLP: 60000, description: "Supermercado Líder",
    type: "expense", expenseType: "variable", expenseCategory: "SUPERMARKET",
    createdAt: "2026-06-18", paymentMethod: "debit_card",
  },
  {
    id: "t-jun-12", amountCLP: 95000, description: "Ropa invierno",
    type: "expense", expenseType: "variable", expenseCategory: "OTHERS",
    createdAt: "2026-06-19", paymentMethod: "credit_card",
  },
  {
    id: "t-jun-13", amountCLP: 38000, description: "Farmacia Salcobrand",
    type: "expense", expenseType: "variable", expenseCategory: "HEALTH",
    createdAt: "2026-06-21", paymentMethod: "debit_card",
  },
  {
    id: "t-jun-14", amountCLP: 26000, description: "Uber",
    type: "expense", expenseType: "variable", expenseCategory: "TRANSPORT",
    createdAt: "2026-06-23", paymentMethod: "credit_card",
  },
  {
    id: "t-jun-15", amountCLP: 15000, description: "Estacionamiento mes junio",
    type: "expense", expenseType: "fixed", expenseCategory: "TRANSPORT",
    createdAt: "2026-06-28", paymentMethod: "cash",
  },
];

export default transactions;
