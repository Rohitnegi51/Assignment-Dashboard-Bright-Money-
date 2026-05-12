# Wealth Curator — Premium AI-Powered Finance Dashboard

![Wealth Curator Dashboard](./public/wealth-dashboard-hero.png)

Wealth Curator is a production-grade, responsive React frontend demonstrating a premium, editorial-style fintech dashboard. It focuses on pixel-perfect layouts, robust state management, and an architecture that bridges the gap between high-end UI/UX and scalable engineering.

## 🚀 Live Demo
[Live Link](https://assignment-dashboard-bright-money.vercel.app/)

## ✨ Features
- **Responsive Bento-Style UI**: A fluid layout that gracefully scales from ultra-wide desktops to mobile devices, preserving the dashboard's proportions and spacing.
- **Native Theme Architecture**: Flawless Dark/Light mode switching powered by semantic CSS custom properties. No hardcoded colors; entirely token-driven.
- **Simulated AI Insights**: Dynamic insight cards ("Surplus Opportunity", "Tax-Loss Harvesting") based on realistic portfolio mock data.
- **Interactive Portfolio Analytics**: Recharts-powered area charts with custom gradients, tooltips, and timeframe selection.
- **Transaction Ledger**: A premium table implementation for recent activity, complete with custom SVG badging and simulated async loading states.
- **Behavioral Analytics Tracking**: A lightweight `useAnalytics` hook tracking critical UI interactions (search debounce, CTA clicks, theme toggles).

## 🛠 Tech Stack
- **Framework**: React 19 + TypeScript (Conceptual)
- **Routing**: `react-router-dom`
- **Styling**: Tailwind CSS v4 + native CSS variables
- **State Management**: Zustand
- **Visualization**: Recharts
- **Icons**: `lucide-react`
- **Build Tool**: Vite

## 📐 Architecture Decisions

### Component-Driven & Reusable Primitives
The application is built around isolated, highly reusable UI primitives (e.g., `<Card>`, `<Button>`, `<Badge>`). These primitives handle their own variants (ghost, premium, elevated) using `tailwind-merge` and `clsx` (via the `cn()` utility).

### Design System & Theme Tokens
Instead of relying on absolute Tailwind colors (like `bg-gray-800`), the project uses semantic tokens defined in `globals.css` (e.g., `bg-surface-low`, `text-primary-blue`). This ensures instant, flash-free theme switching and enforces strict design compliance.

### State & Persistence Separation
Global UI state (like sidebar expansion) is managed by **Zustand**. However, to strictly adhere to the Rules of Hooks, persistence is handled by a custom `useLocalStorage` hook injected at the `App.jsx` level, orchestrating the hydration of the Zustand store.

### Asynchronous Data Handling
A `mockApi` service was created to wrap static JSON data in `Promises` with simulated latency (600ms). This allows the frontend to realistically consume data via a custom `useFetch` hook, rendering premium skeleton loaders (`animate-pulse`) and elegant error/empty fallback states.

## 📁 Folder Structure

```text
src/
├── components/          # Reusable React components
│   ├── charts/          # Visualization primitives
│   ├── dashboard/       # Main dashboard layout components
│   ├── insights/        # Specialized bento-grid insight cards
│   ├── layout/          # Sidebar, TopHeader, App Wrappers
│   └── ui/              # Base primitives (Card, Button, Badge)
├── constants/           # Navigation routes, static configs
├── data/                # Static mock data payloads
├── hooks/               # Custom React hooks
├── layouts/             # Page scaffolding
├── pages/               # Route endpoints (DashboardHome, Insights)
├── services/            # Mock API wrappers and AI insight engines
├── store/               # Zustand global state (useUIStore)
├── styles/              # Global CSS, theme token definitions
└── utils/               # Helpers (cn.js)
```

## 🪝 Custom Hooks Implementation

1. **`useFetch`**
   - **Responsibility**: Manages async data retrieval, loading, and error states.
   - **Usage**: Used by `AIInsightPanel`, `RecentActivityTable`, and `SpendingComposition` to trigger the mock API and render skeleton states dynamically.
2. **`useAnalytics`**
   - **Responsibility**: A lightweight abstraction for event tracking.
   - **Usage**: Tracks `dashboard_loaded`, `theme_toggled`, `sidebar_navigation_clicked`, `execute_strategy_clicked`, and `export_csv_clicked`.
3. **`useDebounce`**
   - **Responsibility**: Delays value updates to prevent excessive API calls or rerenders.
   - **Usage**: Applied to the `TopHeader` search input, triggering the analytics event only after the user stops typing (400ms delay).
4. **`useLocalStorage`**
   - **Responsibility**: Safely handles SSR-friendly, JSON-parsed browser storage.
   - **Usage**: Implemented in `App.jsx` to persist the user's theme preference and sidebar collapsed state without polluting the Vanilla JS Zustand store.

## ⚡ Performance Optimizations
- **Data Memoization**: Used `useMemo` in `PortfolioPerformanceChart` to instantly slice historical data without recalculating the entire set when users switch timeframes.
- **Reference Stability**: Used `useCallback` for global event listeners (like the ESC key to close the mobile sidebar).
- **Debouncing**: `useDebounce` ensures the search string doesn't flood the analytics pipeline or trigger expensive filter re-renders on every keystroke.

## ♿ SEO & Accessibility
- **Semantic HTML**: Utilization of proper `<header>`, `<nav>`, `<aside>`, `<main>`, and `<section>` tags.
- **Aria Labels**: Screen-reader-friendly labels on icon-only buttons (theme toggles, notification bells, mobile menu triggers).
- **Keyboard Navigation**: Buttons and links utilize `focus-visible:outline-primary-blue` to ensure keyboard users have clear focus indicators without degrading mouse UX.

## ⚖️ Trade-offs & Constraints
- **Mock Backend**: Due to assignment constraints, data is provided via a simulated async `mockApi` rather than a live Node.js/PostgreSQL backend.
- **Authentication**: Bypassed for the scope of this frontend-focused dashboard build.
- **Static Charts**: Recharts animations are limited to mount; real-time WebSocket data streaming was excluded in favor of structural stability.

## 💻 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔮 Future Scope
- **Real-time WebSocket Integration**: Connect the portfolio charts to a live ticking financial API.
- **Authentication & Roles**: Implement JWT-based auth via NextAuth/Clerk for multi-user support.
- **Virtualization**: Implement `@tanstack/react-virtual` for the `RecentActivityTable` to support rendering thousands of transactions smoothly.
- **Advanced Filtering**: Expand the debounced search to cross-reference transactions and insights globally.
