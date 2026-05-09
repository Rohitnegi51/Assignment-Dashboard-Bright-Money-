import { transactionsData } from '../data/transactionsData'
import { getPrimaryInsight } from './insightEngine'
import { spendingData } from '../data/spendingData'
import { generateAlerts } from './alertEngine'

/**
 * mockApi — A realistic mock API service that wraps static data
 * in Promises to simulate network latency for useFetch integration.
 */

const DELAY_MS = 600

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchTransactions() {
  await delay(DELAY_MS)
  // Simulate occasional realistic failures if needed, but keeping it stable for now
  return transactionsData
}

export async function fetchPrimaryInsight() {
  await delay(DELAY_MS)
  return getPrimaryInsight()
}

export async function fetchSpendingData() {
  await delay(DELAY_MS)
  return spendingData
}

export async function fetchDashboardData() {
  await delay(DELAY_MS)
  return {
    insight: getPrimaryInsight(),
    alerts: generateAlerts()
  }
}
