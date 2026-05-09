import { fetchDashboardData } from '../services/mockApi'
import { useFetch } from './useFetch'

/**
 * useInsights — orchestrates data retrieval and engine execution.
 * Prepares the architecture for a future TanStack Query transition.
 */
export function useInsights() {
  const { data, loading, error } = useFetch(fetchDashboardData)

  return {
    insight: data?.insight || null,
    alerts: data?.alerts || [],
    isLoading: loading,
    error
  }
}
