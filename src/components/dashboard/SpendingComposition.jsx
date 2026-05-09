import { cn } from '../../utils/cn'
import Card from '../ui/Card'
import SectionHeader from '../ui/SectionHeader'
import Button from '../ui/Button'
import { fetchSpendingData } from '../../services/mockApi'
import { useFetch } from '../../hooks/useFetch'
import { AlertCircle } from 'lucide-react'

/**
 * SpendingComposition — visualizes budget categories with an AI insight note.
 */

export default function SpendingComposition() {
  const { data: spendingData, loading, error, refetch } = useFetch(fetchSpendingData)

  const composition = spendingData?.composition || []
  const insight = spendingData?.insight || null

  // Calculate total to determine percentages dynamically
  const totalSpending = composition.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card
      variant="elevated"
      header={
        <SectionHeader
          title="Spending Composition"
          actions={<Button variant="ghost" size="sm" className="text-primary-blue font-semibold px-2">View All</Button>}
        />
      }
    >
      <div className="flex flex-col gap-6">
        {loading && (
          <div className="flex flex-col gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 animate-pulse rounded bg-surface-high" />
                  <div className="h-4 w-8 animate-pulse rounded bg-surface-high" />
                </div>
                <div className="h-2 w-full animate-pulse rounded-full bg-surface-high" />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="flex h-32 flex-col items-center justify-center gap-3">
            <AlertCircle size={24} className="text-text-muted" />
            <p className="text-body text-text-secondary">Unable to load spending data.</p>
            <Button variant="secondary" size="sm" onClick={refetch}>Try Again</Button>
          </div>
        )}

        {!loading && !error && composition.length > 0 && (
          <>
            {/* Progress Bars */}
            <div className="flex flex-col gap-5">
          {composition.map((item) => {
            const percentage = Math.round((item.amount / totalSpending) * 100)
            
            return (
              <div key={item.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-body font-medium text-text-secondary">{item.label}</span>
                  <span className="text-body font-semibold text-text-primary">{percentage}%</span>
                </div>
                {/* Track */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-low">
                  {/* Fill */}
                  <div
                    className={cn('h-full rounded-full transition-all duration-1000', item.color)}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        </>
        )}

        {!loading && !error && insight && (
          <div className="mt-2 rounded-[var(--radius-element)] bg-surface-low p-5">
            <h4 className="mb-2 text-[var(--font-size-label)] font-medium tracking-[var(--letter-spacing-wide)] text-text-muted uppercase">
              Editor's Note
            </h4>
            <p className="text-[var(--font-size-body)] leading-relaxed text-text-secondary italic">
              "Your discretionary spending on '{insight.category}' is down {Math.abs(insight.changePercentage)}% this month. 
              This surplus has been automatically moved to your '{insight.redirectionTarget}' bucket."
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
