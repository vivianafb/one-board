# OneBoard – Personal Finance Tracker (MVP Phase 1)

OneBoard is a personal finance dashboard designed to help users track monthly spending, savings, and investments in a simple, visual, and structured way.  
The goal of the project is to evolve from a front-end MVP using local data, into a full-stack application with persistent storage, user authentication, and real financial data integrations.

---

## 🚀 Project Overview

Many finance apps are either too complex or too rigid.  
OneBoard aims to offer:
- A clean monthly overview,
- Flexible tracking of income and expenses,
- Savings visibility over time,
- Manual investment tracking (with future automation),
- And visual insights that support better financial decisions.

This repository currently contains the **Phase 1 MVP**, focused on the front-end implementation.

---

## 🧱 Tech Stack (Phase 1)

- **Framework**: React / Next.js (TypeScript)
- **UI**: Tailwind CSS 
- **State Management**: Local state/Zustand
- **Storage**: Dummy data + localStorage
- **Charts**: Recharts (or equivalent)
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

Backend and database will be introduced in Phase 2.

---

## ✨ MVP Features Included (Phase 1)

### 🏠 Dashboard
- Monthly summary cards:
  - Remaining money available to spend
  - Total savings (historical)
  - Total invested and estimated gains
- Month & year selector
- Visual breakdown chart (expenses vs savings vs investments)
- Daily CLP exchange values (USD / UF) displayed

### 💸 Income & Expenses
- Table of transactions with:
  - Type (income or expense)
  - Category (preset + custom)
  - Payment method (cash, credit card local, international)
  - Amount CLP / optional USD
- Totals computed per month:
  - Total income
  - Total expenses
  - Breakdown by payment method
  - Conversion of USD expenses to CLP
- Ability to add new categories

### 💰 Savings
- Monthly savings table:
  - Money saved per month
  - Money withdrawn (optional)
  - Running cumulative balance
- Shared savings logic reused across pages
- “Total saved” metric appears in dashboard and savings page

### 📈 Investments (Manual Tracking)
- Separate sections for:
  - Racional
  - ETFs
  - Term deposits
  - MACH investments
- Tables include:
  - Invested amount
  - Current value (manual input)
  - Monthly gain/loss calculation

### 📦 Project Quality
- Typed financial models (TS interfaces)
- Shared data helpers
- Base unit tests for calculation logic
- Deployable environment

---

## 🛣 Roadmap

### Phase 1 – MVP (current)
- Front-end only
- LocalStorage + dummy data
- Core pages: Dashboard, Income/Expenses, Savings, Investments
- Charts + summary metrics
- Base testing + deployment
- Clear data models and architecture

### Phase 2 – Backend & Persistence
- Node.js REST API (Express or Nest)
- Persistent storage (PostgreSQL or MongoDB)
- Swagger/OpenAPI API documentation
- User authentication (JWT)
- Move business logic to the serv
