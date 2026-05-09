export const portfolioData = {
  totalValue: 1248390,
  targetAllocation: {
    technology: 25,
    healthcare: 15,
    finance: 20,
    realEstate: 10,
    consumer: 15,
    energy: 15,
  },
  currentAllocation: {
    technology: 39, // Drifted high
    healthcare: 14,
    finance: 21,
    realEstate: 4, // Drifted low
    consumer: 12,
    energy: 10,
  },
  driftThreshold: 5, // Percentage drift before alerting
}
