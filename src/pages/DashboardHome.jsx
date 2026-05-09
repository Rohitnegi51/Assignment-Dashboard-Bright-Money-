import { useEffect } from 'react'
import MetricCard from '../components/ui/MetricCard'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import { useInsights } from '../hooks/useInsights'
import { useAnalytics } from '../hooks/useAnalytics'
import AIInsightPanel from '../components/dashboard/AIInsightPanel'
import AlertsPanel from '../components/dashboard/AlertsPanel'
import SpendingComposition from '../components/dashboard/SpendingComposition'
import RecentActivityTable from '../components/dashboard/RecentActivityTable'

/**
 * DashboardHome — main dashboard page.
 *
 * Uses reusable UI primitives (MetricCard, Card, SectionHeader, Badge)
 * instead of inline markup. Demonstrates the Bento grid and surface hierarchy.
 */

const METRICS = [
  { label: 'Total Net Worth', value: '$1,248,390', change: '+12.4%', context: 'vs last month', trend: 'positive' },
  { label: 'Monthly Spending', value: '$4,250', change: '+2.1%', context: 'higher than avg', trend: 'negative' },
  { label: 'Total Savings', value: '$84,120', context: 'On track for Q4 goal', trend: 'status' },
]

export default function DashboardHome() {
  const { insight, alerts, isLoading } = useInsights()
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    trackEvent('dashboard_loaded')
  }, [trackEvent])

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-headline text-text-primary">Dashboard</h1>
        <p className="mt-1 text-body text-text-muted">
          Overview of your portfolio and market activity
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {METRICS.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* AI Insights & Alerts Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AIInsightPanel />
        </div>
        <div className="lg:col-span-1">
          <AlertsPanel alerts={alerts} isLoading={isLoading} />
        </div>
      </div>

      {/* Spending & Activity Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <SpendingComposition />
        </div>
        <div className="lg:col-span-2">
          <RecentActivityTable />
        </div>
      </div>
    </div>
  )
}
