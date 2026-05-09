import { useState, useEffect } from 'react'

/**
 * useDebounce — Reusable debounce hook for delaying fast-changing values.
 * Useful for search inputs to prevent excessive API calls or rerenders.
 * 
 * @param {any} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds.
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel the timeout if value changes before the delay passes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
