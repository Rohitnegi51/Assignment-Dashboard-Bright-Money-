import { cn } from '../../utils/cn'
import Card from '../ui/Card'
import SectionHeader from '../ui/SectionHeader'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { fetchTransactions } from '../../services/mockApi'
import { useFetch } from '../../hooks/useFetch'
import { useAnalytics } from '../../hooks/useAnalytics'
import { ShoppingBag, Utensils, Zap, DollarSign, AlertCircle } from 'lucide-react'

/**
 * RecentActivityTable — displays a formatted list of transactions.
 * Designed to feel like a premium table without heavy borders.
 */

// Helper to map category to specific badge variants and icons
function getCategoryStyle(category) {
  switch (category.toLowerCase()) {
    case 'technology': return { variant: 'premium', Icon: ShoppingBag }
    case 'lifestyle': return { variant: 'warning', Icon: Utensils }
    case 'utilities': return { variant: 'neutral', Icon: Zap }
    case 'income': return { variant: 'success', Icon: DollarSign }
    default: return { variant: 'neutral', Icon: ShoppingBag }
  }
}

export default function RecentActivityTable() {
  const { trackEvent } = useAnalytics()
  const { data: transactions, loading, error, refetch } = useFetch(fetchTransactions)

  const handleExport = () => {
    trackEvent('export_csv_clicked')
  }

  return (
    <Card
      variant="elevated"
      header={
        <SectionHeader
          title="Recent Activity"
          actions={
            <>
              <Button variant="secondary" size="sm" onClick={handleExport}>Export CSV</Button>
              <Button variant="secondary" size="sm">Filter</Button>
            </>
          }
        />
      }
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-border-subtle text-[var(--font-size-label)] font-medium tracking-[var(--letter-spacing-wide)] text-text-muted uppercase">
              <th className="pb-3 pr-4 font-medium">Merchant</th>
              <th className="pb-3 px-4 font-medium">Category</th>
              <th className="pb-3 px-4 font-medium">Status</th>
              <th className="pb-3 pl-4 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {loading && (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td className="py-4 pr-4"><div className="h-10 w-full animate-pulse rounded bg-surface-high" /></td>
                  <td className="py-4 px-4"><div className="h-6 w-20 animate-pulse rounded bg-surface-high" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-16 animate-pulse rounded bg-surface-high" /></td>
                  <td className="py-4 pl-4"><div className="h-6 w-24 animate-pulse rounded bg-surface-high ml-auto" /></td>
                </tr>
              ))
            )}

            {error && !loading && (
              <tr>
                <td colSpan={4} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <AlertCircle size={24} className="text-text-muted" />
                    <p className="text-body text-text-secondary">Unable to retrieve portfolio activity at this time.</p>
                    <Button variant="secondary" size="sm" onClick={refetch}>Try Again</Button>
                  </div>
                </td>
              </tr>
            )}

            {!loading && !error && (!transactions || transactions.length === 0) && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-body text-text-muted">
                  No recent activity found.
                </td>
              </tr>
            )}

            {!loading && !error && transactions && transactions.map((tx) => {
              const { variant: badgeVariant, Icon } = getCategoryStyle(tx.category)
              const isIncome = tx.amount > 0
              const isPending = tx.status === 'pending'
              
              // Format amount with sign and commas
              const formattedAmount = `${isIncome ? '+' : '-'}$${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`

              return (
                <tr key={tx.id} className="group transition-fast hover:bg-surface-high/50">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-element)] bg-surface-low text-text-muted transition-fast group-hover:bg-surface-mid">
                        <Icon size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-body font-semibold text-text-primary">{tx.merchant}</span>
                        <span className="mt-0.5 text-[var(--font-size-label)] text-text-muted">{tx.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <Badge variant={badgeVariant}>{tx.category}</Badge>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-1.5 text-label font-bold uppercase tracking-wider">
                      <span className={cn('h-1.5 w-1.5 rounded-full', isPending ? 'bg-primary-blue' : 'bg-success-green')} />
                      <span className={isPending ? 'text-primary-blue' : 'text-success-green'}>
                        {tx.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pl-4 text-right align-middle">
                    <span className={cn(
                      'text-[1.125rem] font-bold tracking-tight',
                      isIncome ? 'text-success-green' : 'text-text-primary'
                    )}>
                      {formattedAmount}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
