# OneBoard – Personal Finance Dashboard

**[Live Demo →](https://one-board.vercel.app/dashboard)**

![Coverage](https://img.shields.io/badge/coverage-79%25-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

OneBoard is a personal finance dashboard built to simulate a real-world application while focusing on **frontend architecture, state management, and TypeScript modeling**.

It demonstrates clean architecture principles: dependency inversion, domain isolation, and feature-based organization. The goal is not to ship a full finance product, but to show how a mid-sized dashboard can be structured for maintainability and testability.

---

## 🧠 What this project demonstrates

- Feature-based (Scream) architecture — folder structure communicates intent  
- Clean Architecture — domain, application, and presentation layers with clear boundaries  
- Dependency Inversion Principle — repository interfaces decouple components from data fetching  
- Domain types co-located per feature with zero framework imports  
- Service layer for data loading orchestration, separate from state management  
- Pure state containers (Zustand) with no I/O side effects  
- Selector pattern for derived state — fully unit-testable without React  
- Mock Service Worker (MSW) for realistic API simulation during development  

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand (feature-level stores, persisted) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| API mocking | Mock Service Worker (MSW) |
| Testing | Jest + Testing Library |

---

## 🏗️ Architecture

The project follows a layered architecture within each feature:

```
Repository Interface  ← contract (domain layer)
       ↓
HTTP Repository       ← implementation (infrastructure)
       ↓
Service               ← orchestration (application layer)
       ↓
Zustand Store         ← pure state container
       ↓
Selectors             ← derived state, zero side effects
       ↓
Components            ← render only, no business logic
```

Swapping MSW for a real API requires changes only to the HTTP repository and mock handlers — nothing in the component or service layer changes.

---

## Project Structure

```
src/
├── app/                → Next.js App Router pages and API routes
├── components/
│   ├── layout/         → Shell components (SideBar, Navbar, Footer, UI store)
│   ├── shared/         → Cross-feature components (MonthSelector, MSWProvider)
│   └── ui/             → shadcn/ui primitives
├── features/
│   ├── investments/    → repository, http-repository, service, store,
│   ├── transactions/     types, selectors, components, hooks, utils
│   ├── savings/
│   ├── dashboard/
│   ├── categories/
│   └── config/
├── lib/
│   ├── types.ts        → Shared primitives (Currency, YearMonth)
│   ├── http.ts         → Generic HTTP utility
│   ├── format.ts       → Currency/number formatting
│   └── utils.ts        → Date helpers
├── types/
│   └── finance.ts      → Backward-compatibility re-export barrel
└── mocks/              → MSW handlers and seed data
```

Each feature folder is self-contained: it owns its types, state, data access contract, and UI. No cross-feature imports except through shared primitives.

---

## ✨ Features

### Dashboard
- Monthly income, expenses, and balance summary
- Portfolio value vs. invested comparison
- Category breakdown pie chart
- Income vs. expenses bar chart

### Transactions
- Add, edit, and delete transactions
- Fixed vs. variable expense classification
- Installment (cuota) tracking across months
- Monthly filtering

### Savings
- Goal-based savings tracking
- Deposit recording with monthly history
- Progress toward each goal

### Investments
- Add, edit, and delete investments (ETF, crypto, stocks, cash)
- CLP / USD multi-currency support with conversion
- Monthly period performance tracking
- Portfolio summary with gain/loss percentage

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

MSW intercepts all `/api/*` requests in development and returns mock data. No backend required.

---

## 📌 Possible extensions

- Add write endpoints to the repository layer (POST/PUT/DELETE) for full API persistence
- Activate React Query (already installed) for cache, background refetch, and deduplication
- Authentication and user accounts
- URL-based month selection for deep-linkable views
