export const rawAlertEvents = [
  {
    id: 'evt_001',
    type: 'TRANSACTION_UNUSUAL',
    amount: 1250.00,
    merchant: 'Unknown Merchant',
    location: 'International Web',
    timestamp: new Date().toISOString(),
    status: 'pending_verification'
  },
  {
    id: 'evt_002',
    type: 'DIVIDEND_RECEIVED',
    asset: 'MSFT',
    amount: 340.00,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: 'uninvested'
  },
  {
    id: 'evt_003',
    type: 'MARKET_VOLATILITY',
    sector: 'Technology',
    change: -4.2,
    timestamp: new Date().toISOString(),
    status: 'active'
  }
]
