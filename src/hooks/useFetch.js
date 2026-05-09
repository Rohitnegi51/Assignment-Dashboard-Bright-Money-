import { useState, useEffect, useCallback } from 'react'

/**
 * useFetch — A reusable hook for async data handling.
 * 
 * @param {Function} fetchFunction - An async function that returns a Promise.
 * @param {boolean} immediate - Whether to execute the fetch immediately on mount.
 */
export function useFetch(fetchFunction, immediate = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetchFunction(...args)
      setData(response)
      return response
    } catch (err) {
      setError(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [fetchFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { data, loading, error, refetch: execute }
}
