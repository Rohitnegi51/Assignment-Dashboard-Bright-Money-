import { useCallback } from 'react'

/**
 * useAnalytics — Centralized event tracking abstraction.
 * Currently uses mock logging to the console, preparing the architecture 
 * for future integrations like GA4, Segment, or Mixpanel.
 */
export function useAnalytics() {
  const trackEvent = useCallback((eventName, metadata = {}) => {
    // In a production environment, this is where you'd call your analytics provider.
    // e.g., window.gtag('event', eventName, metadata)
    
    const timestamp = new Date().toISOString()
    const payload = {
      event: eventName,
      timestamp,
      ...metadata
    }

    // Mock logging for development
    console.group(`[Analytics Event]: ${eventName}`)
    console.log(payload)
    console.groupEnd()
  }, [])

  return { trackEvent }
}
