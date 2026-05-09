export const subscriptionsData = [
  { id: 'sub_1', name: 'Netflix Premium', amount: 22.99, category: 'Entertainment' },
  { id: 'sub_2', name: 'Spotify Duo', amount: 14.99, category: 'Entertainment' },
  { id: 'sub_3', name: 'Adobe Creative Cloud', amount: 54.99, category: 'Software' },
  { id: 'sub_4', name: 'AWS Cloud Services', amount: 124.50, category: 'Infrastructure' },
  { id: 'sub_5', name: 'Canva Pro', amount: 14.99, category: 'Software', tags: ['potential_duplicate_functionality'] },
]

export const subscriptionAnalysis = {
  totalMonthly: 232.46,
  duplicateCandidates: [
    { primary: 'Adobe Creative Cloud', secondary: 'Canva Pro', savings: 179.88 /* annual */ },
  ]
}
