# 🛍️ RaihanShop System

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62e)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.0.0-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.9-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4.1-123A50?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployment-222222?style=flat&logo=github&logoColor=white)](https://pages.github.com/)

A modern, full-stack e-commerce application featuring a responsive storefront and an analytical admin dashboard system. The application is split into a static React/Vite frontend and a serverless Next.js API backend.

---

## 📸 Screenshots

### Storefront Home Page
![Storefront Preview](./screenshots/home.png)

---

## 🌐 Live Deployments

*   **Frontend (Storefront & Dashboard)**: [https://raihanuir.github.io/Raihan---Shop/](https://raihanuir.github.io/Raihan---Shop/)
*   **Backend (REST API)**: [https://raihanshop.vercel.app/api](https://raihanshop.vercel.app/api)

---

## ✨ Features

### 🛒 Frontend Storefront
*   **Dynamic Products Catalog**: Filter by category, search by product name/brand, and view details.
*   **Shopping Cart**: Add products, adjust quantities, and calculate totals in real-time.
*   **Checkout & Order Placement**: Fill out shipping details, validate coupon codes, and submit orders.
*   **Theme Toggle**: Easily switch between sleek light and dark mode interfaces.
*   **Static Fallbacks**: Built-in mock product support if the backend server goes offline.

### 🛡️ Admin Dashboard
*   **Sales Reports & Analytics**: Interactive charts (revenue, orders, category sales) powered by Recharts.
*   **Product Management**: Full CRUD interface for creating, editing, and deleting inventory items.
*   **Order Manager**: Review customer orders, track payments, and update fulfillment statuses.
*   **Coupons & Brand Manager**: Create promotional discount codes and update brand listings.

---

## 🛠️ Technology Stack & Dependencies

### Frontend
*   **Framework**: React (v19) + Vite
*   **Routing**: React Router DOM (v7)
*   **HTTP Client**: Axios (with custom interceptors for session cookies)
*   **Charts**: Recharts
*   **Styling**: Custom modern CSS stylesheets

### Backend
*   **Framework**: Next.js (v15) App Router
*   **ORM**: Prisma ORM (v6)
*   **Database**: SQLite (Local development) / Turso LibSQL (Production)
*   **Authentication**: JSON Web Tokens (JWT) & bcryptjs hashing
*   **CORS**: Dynamic config enabling credential sharing with the frontend

---

## ⚙️ Local Development Guide

Follow these steps to run both the frontend and backend servers on your local computer.

### Prerequisites
*   Node.js (v18 or higher)
*   npm

### 1. Backend Setup (`/raihanshop-api`)

1.  Navigate into the API directory:
    ```bash
    cd raihanshop-api
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment variables. Create a `.env` file in `raihanshop-api/`:
    ```env
    DATABASE_URL="file:./database.db"
    JWT_SECRET="raihanshop-secret-key-change-in-production"
    ```
4.  Generate the database client:
    ```bash
    npx prisma generate
    ```
5.  Seed the local SQLite database with default mock data:
    ```bash
    npm run seed
    ```
6.  Start the API server on `http://localhost:3000`:
    ```bash
    npm run dev
    ```

---

### 2. Frontend Setup (Root `/`)

1.  Navigate back to the root directory:
    ```bash
    cd ..
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173/Raihan---Shop/](http://localhost:5173/Raihan---Shop/) in your web browser.

---

## 🚀 Production Deployment Reference

### Backend (Vercel)
This Next.js API is designed to deploy seamlessly to Vercel. 
*   **Root Directory Setting**: Configure the project root folder to `raihanshop-api`.
*   **Environment Variables**: Define `DATABASE_URL` and `JWT_SECRET` in your Vercel project settings.

### Frontend (GitHub Pages)
The compiled static output is deployed from the `gh-pages` branch.
*   To publish updates locally, simply run:
    ```bash
    npm run deploy
    ```
