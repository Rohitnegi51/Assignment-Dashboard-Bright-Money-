/**
 * Budget mock data — single source of truth for the Budgets page.
 *
 * All monetary values are in dollars (number).
 * Components format them for display.
 */

export const budgetData = {
  summary: {
    totalBudget: 4500,
    spentSoFar: 3120,
    periodStart: '2025-10-01',
    periodLabel: 'Oct 1',
  },

  categories: [
    {
      id: 'housing',
      label: 'Housing',
      icon: 'home',
      budget: 1800,
      spent: 1580,
    },
    {
      id: 'food-dining',
      label: 'Food & Dining',
      icon: 'utensils',
      budget: 800,
      spent: 450,
    },
    {
      id: 'transportation',
      label: 'Transportation',
      icon: 'car',
      budget: 400,
      spent: 250,
    },
    {
      id: 'utilities',
      label: 'Utilities',
      icon: 'zap',
      budget: 300,
      spent: 250,
    },
    {
      id: 'entertainment',
      label: 'Entertainment',
      icon: 'film',
      budget: 1200,
      spent: 590,
    },
  ],

  history: [
    { month: 'May', budget: 4500, actual: 3800 },
    { month: 'Jun', budget: 4500, actual: 4100 },
    { month: 'Jul', budget: 4500, actual: 3600 },
    { month: 'Aug', budget: 4500, actual: 4300 },
    { month: 'Sep', budget: 4500, actual: 3900 },
    { month: 'Oct', budget: 4500, actual: 3120 },
  ],

  curatorNote: {
    highlightCategory: 'Food & Dining',
    improvementPercent: 12,
    projectedSavings: 400,
  },
}
