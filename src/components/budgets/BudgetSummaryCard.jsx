import { useMemo } from 'react'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import { cn } from '../../utils/cn'

/**
 * BudgetSummaryCard — hero metrics section for the Budgets page.
 *
 * Displays:
 * - Spent So Far (display-sized metric)
 * - Total Monthly Budget
 * - Utilization progress bar with labeled markers
 * - Remaining capacity mini-card
 * - Daily Burn mini-card
 *
 * All values are derived from raw budget data via useMemo.
 *
 * @param {object} props
 * @param {object} props.data — budget summary object from budgetData
 * @param {number} props.data.totalBudget
 * @param {number} props.data.spentSoFar
 * @param {string} props.data.periodLabel — e.g. "Oct 1"
 */

/** Format a number as $X,XXX.XX */
function formatCurrency(amount, showCents = true) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(amount)
}

/** Compact mini-metric card used for Remaining & Daily Burn */
function MiniMetric({ label, value, helper, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-start justify-center gap-1',
        'rounded-[var(--radius-element)] border border-border-subtle',
        'bg-surface-low px-5 py-4',
        className
      )}
    >
      <span className="text-[var(--font-size-label)] font-semibold uppercase tracking-[var(--letter-spacing-caps)] text-text-muted">
        {label}
      </span>
      <span className="text-[1.5rem] font-bold tracking-[var(--letter-spacing-tight)] text-primary-blue leading-none">
        {value}
      </span>
      {helper && (
        <span className="text-[var(--font-size-label)] text-text-muted leading-snug">
          {helper}
        </span>
      )}
    </div>
  )
}

export default function BudgetSummaryCard({ data }) {
  const { totalBudget, spentSoFar, periodLabel } = data

  const derived = useMemo(() => {
    const remaining = totalBudget - spentSoFar
    const utilization = Math.round((spentSoFar / totalBudget) * 100)
    const capacityPercent = ((remaining / totalBudget) * 100).toFixed(1)

    // Calculate days elapsed since period start for daily burn
    const now = new Date()
    const start = new Date(data.periodStart)
    const daysElapsed = Math.max(1, Math.ceil((now - start) / (1000 * 60 * 60 * 24)))
    const dailyBurn = Math.round(spentSoFar / daysElapsed)

    return { remaining, utilization, capacityPercent, dailyBurn }
  }, [totalBudget, spentSoFar, data.periodStart])

  // Split the dollars and cents for the hero metric
  const spentWhole = formatCurrency(spentSoFar, false)
  const spentCents = `.${String(spentSoFar % 1 === 0 ? '00' : Math.round((spentSoFar % 1) * 100)).padStart(2, '0')}`

  return (
    <Card variant="elevated" className="p-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* ──── Left: Primary Metrics + Progress ──── */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Metric Row */}
          <div className="flex flex-wrap items-end gap-x-10 gap-y-4 mb-6">
            {/* Spent So Far */}
            <div>
              <span className="text-body text-text-muted">Spent So Far</span>
              <p className="mt-1 leading-none">
                <span className="text-[clamp(2rem,5vw,2.75rem)] font-bold tracking-[var(--letter-spacing-tight)] text-text-primary">
                  {spentWhole}
                </span>
                <span className="text-[clamp(1rem,2.5vw,1.25rem)] font-medium text-text-muted">
                  {spentCents}
                </span>
              </p>
            </div>

            {/* Total Monthly Budget */}
            <div>
              <span className="text-body text-text-muted">Total Monthly Budget</span>
              <p className="mt-1 text-[clamp(1.25rem,3vw,1.5rem)] font-semibold tracking-[var(--letter-spacing-tight)] text-text-primary leading-none">
                {formatCurrency(totalBudget)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            value={derived.utilization}
            size="md"
            label={`Budget utilization: ${derived.utilization}% spent`}
            className="mb-3"
          />

          {/* Progress Labels */}
          <div className="flex items-center justify-between">
            <span className="text-[var(--font-size-label)] font-medium uppercase tracking-[var(--letter-spacing-caps)] text-text-muted">
              0% Utilization
            </span>
            <span className="text-[var(--font-size-label)] font-bold uppercase tracking-[var(--letter-spacing-caps)] text-primary-blue">
              {derived.utilization}% Spent
            </span>
            <span className="text-[var(--font-size-label)] font-medium uppercase tracking-[var(--letter-spacing-caps)] text-text-muted">
              100% Target
            </span>
          </div>
        </div>

        {/* ──── Right: Mini Metric Cards ──── */}
        <div className="flex flex-row lg:flex-col gap-4 p-6 lg:p-8 lg:pl-0 lg:w-[320px]">
          <MiniMetric
            label="Remaining"
            value={formatCurrency(derived.remaining, false)}
            helper={`${derived.capacityPercent}% capacity`}
            className="flex-1"
          />
          <MiniMetric
            label="Daily Burn"
            value={formatCurrency(derived.dailyBurn, false)}
            helper={`Avg. since ${periodLabel}`}
            className="flex-1"
          />
        </div>
      </div>
    </Card>
  )
}
