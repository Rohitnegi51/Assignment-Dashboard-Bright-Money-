export const insightsData = {
  activeSignal: {
    id: 'sig-tech-rebalance',
    eyebrow: 'Active Signal: Rebalance Priority',
    title: 'Your technology exposure has increased by 14.2% since last quarter.',
    description: 'Our algorithms suggest shifting 4% of gains into emerging market debt and high-yield real estate to maintain your risk-adjusted profile.',
    confidence: 92,
    actionPrimary: 'Review Strategy',
    actionSecondary: 'Dismiss',
  },
  marketSentiment: {
    score: 74,
    label: 'Optimistic',
    indicators: [
      { id: 'ind-eq', label: 'Global Equities', status: 'Bullish', trend: 'positive' },
      { id: 'ind-fi', label: 'Fixed Income', status: 'Neutral', trend: 'neutral' },
      { id: 'ind-vi', label: 'Volatility Index', status: 'Low', trend: 'positive' },
    ]
  },
  portfolioPerformance: {
    currentValue: 1424902.18,
    percentageChange: 12.4,
    history: [
      { date: 'Jan', value: 1200000, benchmark: 1150000 },
      { date: 'Feb', value: 1220000, benchmark: 1165000 },
      { date: 'Mar', value: 1210000, benchmark: 1160000 },
      { date: 'Apr', value: 1240000, benchmark: 1180000 },
      { date: 'May', value: 1280000, benchmark: 1195000 },
      { date: 'Jun', value: 1320000, benchmark: 1210000 },
      { date: 'Jul', value: 1360000, benchmark: 1230000 },
      { date: 'Aug', value: 1350000, benchmark: 1225000 },
      { date: 'Sep', value: 1330000, benchmark: 1215000 },
      { date: 'Oct', value: 1388400, benchmark: 1240000 },
      { date: 'Nov', value: 1410000, benchmark: 1260000 },
      { date: 'Dec', value: 1424902, benchmark: 1275000 },
    ],
    sectors: [
      { id: 'tech', label: 'Technology', value: 42, color: 'bg-primary-blue' },
      { id: 'fin', label: 'Financials', value: 18, color: 'bg-gold-standard' },
      { id: 'health', label: 'Healthcare', value: 15, color: 'bg-text-secondary' },
      { id: 'other', label: 'Other', value: 25, color: 'bg-border-subtle' },
    ],
    topPerformer: {
      ticker: 'NVDA',
      change: '+8.4%'
    },
    risk: {
      level: 'Moderate',
      description: 'Balanced'
    }
  },
  allocationMetrics: [
    {
      id: 'alloc-tech',
      title: 'Technology',
      value: '42.5%',
      progress: 42.5,
      trend: '+14.2% YoY',
      trendType: 'positive',
      iconType: 'cpu'
    },
    {
      id: 'alloc-esg',
      title: 'ESG / Green',
      value: '18.0%',
      progress: 18.0,
      trend: 'On Target',
      trendType: 'neutral',
      iconType: 'leaf'
    },
    {
      id: 'alloc-re',
      title: 'Real Estate',
      value: '12.4%',
      progress: 12.4,
      trend: '-2.1% YoY',
      trendType: 'negative',
      iconType: 'building'
    }
  ],
  cashFlowIntelligence: [
    {
      id: 'cf-surplus',
      title: 'Surplus Opportunity',
      description: "You spent 12% less on dining this month. Transfer $450 to your 'Growth' bucket to stay ahead of your 2024 goal.",
      iconType: 'piggy-bank',
      theme: 'blue'
    },
    {
      id: 'cf-audit',
      title: 'Recurring Audit',
      description: "We detected two overlapping streaming subscriptions. Canceling 'Media+' would save you $180 annually.",
      iconType: 'play-square',
      theme: 'orange'
    },
    {
      id: 'cf-tax',
      title: 'Tax-Loss Harvesting',
      description: '3 assets in your legacy portfolio are eligible for tax-loss harvesting. Potential benefit: $2,100.',
      iconType: 'zap',
      theme: 'gray'
    }
  ]
}
