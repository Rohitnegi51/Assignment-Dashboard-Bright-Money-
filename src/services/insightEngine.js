import { portfolioData } from '../data/portfolioData'
import { subscriptionAnalysis } from '../data/subscriptionsData'
import { spendingData } from '../data/spendingData'

/**
 * insightEngine — dynamic generation of AI insights based on mock financial data.
 *
 * In a real app, this logic might live on the backend or run client-side
 * analyzing a normalized Redux/Zustand/React Query store.
 */

function generatePortfolioInsight() {
  const { targetAllocation, currentAllocation, driftThreshold } = portfolioData
  
  // Simple drift calculation
  const techDrift = currentAllocation.technology - targetAllocation.technology
  const realEstateDrift = currentAllocation.realEstate - targetAllocation.realEstate

  if (techDrift > driftThreshold && realEstateDrift < -driftThreshold) {
    return {
      id: 'insight_portfolio_drift',
      badge: 'Active Signal: Rebalance Priority',
      title: `Your technology exposure has increased by ${techDrift.toFixed(1)}% since last quarter.`,
      description: `Our algorithms suggest shifting ${Math.abs(realEstateDrift)}% of gains into emerging market debt and high-yield real estate to maintain your risk-adjusted profile.`,
      confidence: 92,
      impact: 'Risk Optimization',
      severity: 'premium',
      actions: [
        { label: 'Review Strategy', variant: 'primary' },
        { label: 'Dismiss', variant: 'ghost' }
      ]
    }
  }
  return null
}

function generateSubscriptionInsight() {
  if (subscriptionAnalysis.duplicateCandidates.length > 0) {
    const candidate = subscriptionAnalysis.duplicateCandidates[0]
    return {
      id: 'insight_sub_duplicate',
      badge: 'Optimization',
      title: `Potential overlap detected in Software subscriptions.`,
      description: `You have active subscriptions for both ${candidate.primary} and ${candidate.secondary}. Consolidating could save you $${candidate.savings} annually.`,
      impact: '+$179.88/yr',
      severity: 'info',
      actions: [{ label: 'Review Subscriptions', variant: 'secondary' }]
    }
  }
  return null
}

function generateCashInsight() {
  const { target, current, surplus } = spendingData.emergencyFund
  if (current > target + 5000) {
    return {
      id: 'insight_cash_drag',
      badge: 'Cash Optimization',
      title: 'Your emergency fund exceeds its target.',
      description: `You hold $${surplus.toLocaleString()} in surplus cash. Deploying this into your main portfolio could yield an estimated $840 annually based on target returns.`,
      impact: 'Yield Opportunity',
      severity: 'info',
      actions: [{ label: 'Deploy Capital', variant: 'primary' }]
    }
  }
  return null
}

/**
 * Evaluates all data and returns the single highest priority insight to feature.
 */
export function getPrimaryInsight() {
  // In reality, this would have a priority scoring system.
  // For now, we prioritize the portfolio drift (premium insight).
  const insights = [
    generatePortfolioInsight(),
    generateCashInsight(),
    generateSubscriptionInsight(),
  ].filter(Boolean)

  return insights[0] || {
    id: 'insight_default',
    badge: 'AI Wealth Signal',
    title: 'Your portfolio is perfectly aligned with your goals.',
    description: 'No immediate actions required. Your asset allocation remains within the 2% drift threshold, and cash reserves are optimal.',
    impact: 'On Track',
    severity: 'premium',
    actions: [{ label: 'View Analytics', variant: 'secondary' }]
  }
}
