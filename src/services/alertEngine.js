import { rawAlertEvents } from '../data/alertsData'

/**
 * alertEngine — converts raw events into structured UI alert objects.
 */

export function generateAlerts() {
  return rawAlertEvents.map(event => {
    switch (event.type) {
      case 'TRANSACTION_UNUSUAL':
        return {
          id: event.id,
          title: 'Unusual Activity Detected',
          description: `A transaction of $${event.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} at '${event.merchant}' requires your immediate verification.`,
          severity: 'danger',
          icon: 'alert-triangle', // We'll map this to a Lucide icon in the UI
          timestamp: event.timestamp,
        }
      case 'DIVIDEND_RECEIVED':
        return {
          id: event.id,
          title: 'Uninvested Cash',
          description: `You received $${event.amount} in dividends from ${event.asset}. Reinvest to compound growth.`,
          severity: 'info',
          icon: 'info',
          timestamp: event.timestamp,
        }
      case 'MARKET_VOLATILITY':
        return {
          id: event.id,
          title: `${event.sector} Sector Volatility`,
          description: `The ${event.sector} sector is down ${Math.abs(event.change)}% today. Your exposure is currently 39%.`,
          severity: 'warning',
          icon: 'trending-down',
          timestamp: event.timestamp,
        }
      default:
        return {
          id: event.id,
          title: 'System Notification',
          description: 'A new event requires your attention.',
          severity: 'info',
          icon: 'bell',
          timestamp: event.timestamp,
        }
    }
  })
}
