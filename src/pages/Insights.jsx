import { useEffect } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'

import ActiveSignalCard from '../components/insights/ActiveSignalCard'
import MarketSentimentCard from '../components/insights/MarketSentimentCard'
import PortfolioPerformanceChart from '../components/insights/PortfolioPerformanceChart'
import SectorAllocationCard from '../components/insights/SectorAllocationCard'
import TopPerformerCard from '../components/insights/TopPerformerCard'
import RiskLevelCard from '../components/insights/RiskLevelCard'
import AllocationMetricCard from '../components/insights/AllocationMetricCard'
import CashFlowIntelligenceCard from '../components/insights/CashFlowIntelligenceCard'
import { insightsData } from '../data/insightsData'
import { useInsights } from '../hooks/useInsights'

/**
 * Insights — Secondary dashboard page for market and portfolio intelligence.
 * 
 * Demonstrates integration of the `useAnalytics` custom hook for tracking page views.
 * Built using existing layout and typography primitives.
 */

export default function Insights() {
  const { trackEvent } = useAnalytics()
  const { insight, isLoading } = useInsights()

  // Track page load analytics
  useEffect(() => {
    trackEvent('page_viewed', { page: 'Insights' })
  }, [trackEvent])

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <section className="flex flex-col items-start max-w-3xl">
        
        {/* Eyebrow Label */}
        <div className="mb-2 text-primary-blue text-[var(--font-size-label)] font-semibold uppercase tracking-[var(--letter-spacing-caps)]">
          Wealth Intelligence
        </div>

        {/* Main Heading */}
        <h1 className="text-[3rem] font-medium text-text-primary tracking-tight leading-none mb-3">
          Portfolio Insights
        </h1>

        {/* Supporting Description */}
        <p className="text-body text-text-muted leading-relaxed">
          Your curated financial perspective, balancing algorithmic precision with long-term wealth preservation goals.
        </p>
        
      </section>

      {/* Insights Bento Grid Scaffolding */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* ROW 1 */}
        {/* Active Signal (Primary Hero Card) */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex h-[320px] items-center justify-center rounded-[var(--radius-card)] border border-border-subtle bg-surface-low animate-pulse">
              <span className="text-body text-text-muted">Analyzing portfolio data...</span>
            </div>
          ) : (
            <ActiveSignalCard data={insight} />
          )}
        </div>

        {/* Market Sentiment Gauge */}
        <div className="lg:col-span-1">
          <MarketSentimentCard data={insightsData.marketSentiment} />
        </div>

        {/* ROW 2 */}
        {/* Portfolio Performance Chart */}
        <div className="lg:col-span-2">
          <PortfolioPerformanceChart data={insightsData.portfolioPerformance} />
        </div>

        {/* Sector Allocation & Mini Metrics Stack */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Sector List */}
          <div className="flex-1 min-h-[250px]">
            <SectorAllocationCard sectors={insightsData.portfolioPerformance.sectors} />
          </div>
          
          {/* Mini Metrics Row */}
          <div className="grid grid-cols-2 gap-4 h-32">
            <TopPerformerCard data={insightsData.portfolioPerformance.topPerformer} />
            <RiskLevelCard data={insightsData.portfolioPerformance.risk} />
          </div>
        </div>

        {/* ROW 3 */}
        {/* Allocation Metrics */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {insightsData.allocationMetrics.map((metric) => (
            <div key={metric.id} className="flex-1">
              <AllocationMetricCard data={metric} />
            </div>
          ))}
        </div>

        {/* Cash Flow Intelligence Footer */}
        <div className="lg:col-span-2">
          <CashFlowIntelligenceCard data={insightsData.cashFlowIntelligence} />
        </div>

      </div>
    </div>
  )
}
