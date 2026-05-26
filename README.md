# OneBoard – Personal Finance Dashboard

**[Live Demo →](https://one-board.vercel.app/dashboard)**

![Coverage](https://img.shields.io/badge/coverage-79%25-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

OneBoard is a personal finance dashboard built to simulate a real-world application while focusing on **frontend architecture, state management, and TypeScript modeling**.

It emphasizes predictable state, explicit domain modeling, and clear separation of concerns.

The goal of this project is not to create a full finance product, but to demonstrate how a medium-sized dashboard app can be structured in a scalable and maintainable way.


---

## 🧠 What this project demonstrates

This repository showcases:

- Structuring a Next.js application for scalability  
- Modeling domain data using TypeScript  
- Managing complex UI state with a centralized store  
- Separating business logic from UI components  
- Building dashboard-style interfaces with derived metrics  

---

## 🧱 Tech Stack

- Next.js (App Router) + TypeScript  
- Tailwind CSS  
- Zustand for global state  
- React Hook Form  
- Recharts  
- Local mock data (simulating API responses)

This project follows a feature-based architecture with centralized domain typing to ensure scalability and maintainability.

---

## Project Structure

src/
├─ app/              → Next.js App Router pages
├─ components/       → Shared, layout and reusable UI components
│  └─ ui/            → Generic UI components
├─ features/         → Feature-based modules (dashboard, transactions, etc.)
├─ stores/           → Global state management (Zustand)
├─ types/            → Domain models and TypeScript types
├─ lib/              → Helpers, utilities and business logic
├─ mocks/            → Local mock data (simulating API responses)


---

## ✨ MVP Features

### Dashboard
- Monthly financial summary  
- Income vs expenses overview  
- Savings and balance metrics  
- Chart visualization  

### Transactions
- Typed transaction table  
- Add/edit transaction form  
- Monthly filtering  

### Savings
- Monthly savings tracking  
- Cumulative balance calculation  

### Investments
- Basic manual investment tracking  

---

## 🚀 Purpose of the project

This project focuses on **code organization and architecture**, not feature quantity.  
It is designed to reflect how frontend code is structured in real production applications.

---

## 📌 Future improvements (optional)

- Backend integration  
- Authentication and user accounts
- Persistent storage and caching
