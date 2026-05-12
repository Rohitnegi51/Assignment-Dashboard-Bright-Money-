import { useEffect } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'
import BudgetHeader from '../components/budgets/BudgetHeader'
import BudgetSummaryCard from '../components/budgets/BudgetSummaryCard'
import SpendingCategories from '../components/budgets/SpendingCategories'
import { budgetData } from '../data/budgetData'

/**
 * Budgets — Budget management page for Wealth Curator.
 *
 * Architecture:
 * - BudgetHeader: eyebrow + heading + action buttons (implemented)
 * - BudgetSummaryCard: total/spent/remaining/daily burn (implemented)
 * - SpendingCategories: category progress cards (implemented)
 * - Budget History: chart + curator's note (placeholder)
 */

export default function Budgets() {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    trackEvent('page_viewed', { page: 'Budgets' })
  }, [trackEvent])

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Budget Header — Hero Section */}
      <BudgetHeader />

      {/* 2. Budget Summary — Metrics + Progress */}
      <BudgetSummaryCard data={budgetData.summary} />

      {/* 3. Spending Categories — Category Cards Grid */}
      <SpendingCategories categories={budgetData.categories} />

      {/* 4. Bottom Section — History Chart & Curator Note — Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-[var(--radius-card)] border border-border-subtle bg-surface-mid p-6 min-h-[300px] flex items-center justify-center text-text-muted text-body">
          [ Budget History Chart Component ]
        </div>
        <div className="rounded-[var(--radius-card)] bg-primary-blue p-6 min-h-[300px] flex items-center justify-center text-white/80 text-body">
          [ Curator's Note Component ]
        </div>
      </div>
    </div>
  )
}
