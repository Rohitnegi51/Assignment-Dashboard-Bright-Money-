export const spendingData = {
  emergencyFund: {
    target: 50000,
    current: 62000, // Over-funded
    surplus: 12000,
  },
  budget: {
    monthlyTarget: 10000,
    currentSpent: 8400,
    projectedEnd: 9600,
    streakMonths: 4, // "Stayed within 90% of goal for 4 months"
  },
  composition: [
    { id: 'cat_1', label: 'Housing & Utilities', amount: 3528, color: 'bg-primary-blue' },
    { id: 'cat_2', label: 'Dining & Leisure', amount: 1512, color: 'bg-gold-standard' },
    { id: 'cat_3', label: 'Investments', amount: 2100, color: 'bg-success-green' },
    { id: 'cat_4', label: 'Transportation', amount: 1260, color: 'bg-primary-blue/50' }, // Lighter blue for variation
  ],
  insight: {
    category: 'Dining & Leisure',
    changePercentage: -12,
    redirectionTarget: 'S&P 500'
  }
}
