import { useCallback } from 'react'
import SectionHeader from '../ui/SectionHeader'
import Button from '../ui/Button'
import { useAnalytics } from '../../hooks/useAnalytics'
import { FileDown, SlidersHorizontal } from 'lucide-react'

/**
 * BudgetHeader — hero/header section for the Budgets page.
 *
 * Composes the enhanced SectionHeader with:
 * - "Budget Overview" eyebrow
 * - "Wealth Curator Summary" heading (h1)
 * - Export Report + Adjust Budget action buttons
 *
 * Fully theme-aware, responsive, and analytics-instrumented.
 */

export default function BudgetHeader() {
  const { trackEvent } = useAnalytics()

  const handleExportReport = useCallback(() => {
    trackEvent('budget_export_report_clicked', { page: 'budgets' })
    // Future: trigger report generation/download
  }, [trackEvent])

  const handleAdjustBudget = useCallback(() => {
    trackEvent('budget_adjust_clicked', { page: 'budgets' })
    // Future: open budget adjustment modal/drawer
  }, [trackEvent])

  return (
    <SectionHeader
      eyebrow="Budget Overview"
      title="Wealth Curator Summary"
      as="h1"
      headingClassName="text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-[var(--letter-spacing-tight)] leading-[var(--line-height-headline)]"
      actions={
        <>
          <Button
            variant="secondary"
            size="md"
            icon={<FileDown size={16} strokeWidth={1.8} />}
            onClick={handleExportReport}
            aria-label="Export budget report"
          >
            Export Report
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={<SlidersHorizontal size={16} strokeWidth={1.8} />}
            onClick={handleAdjustBudget}
            aria-label="Adjust budget allocations"
          >
            Adjust Budget
          </Button>
        </>
      }
    />
  )
}
