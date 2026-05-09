import { cn } from '../../utils/cn'
import { Sparkles, AlertCircle } from 'lucide-react'
import Button from '../ui/Button'
import { useAnalytics } from '../../hooks/useAnalytics'
import { fetchPrimaryInsight } from '../../services/mockApi'
import { useFetch } from '../../hooks/useFetch'

/**
 * AIInsightPanel — The large, premium feature card displaying the primary AI insight.
 */

function Skeleton() {
  return (
    <div className="surface-mid h-full w-full animate-pulse rounded-[var(--radius-card)] p-8">
      <div className="mb-6 h-6 w-32 rounded bg-surface-high" />
      <div className="mb-4 h-10 w-3/4 rounded bg-surface-high" />
      <div className="mb-2 h-4 w-full rounded bg-surface-high" />
      <div className="mb-8 h-4 w-5/6 rounded bg-surface-high" />
      <div className="h-10 w-40 rounded bg-surface-high" />
    </div>
  )
}

export default function AIInsightPanel() {
  const { trackEvent } = useAnalytics()
  const { data: insight, loading: isLoading, error, refetch } = useFetch(fetchPrimaryInsight)

  if (isLoading) return <Skeleton />
  if (error) {
    return (
      <div className="surface-mid flex h-full min-h-[300px] flex-col items-center justify-center gap-4 rounded-[var(--radius-card)] p-8">
        <AlertCircle size={32} className="text-text-muted" />
        <p className="text-body text-text-secondary">Unable to load AI insights at this time.</p>
        <Button variant="ghost" onClick={refetch}>Try Again</Button>
      </div>
    )
  }
  if (!insight) return null

  // The premium styling uses the primary blue color palette
  const isPremium = insight.severity === 'premium'

  const handleActionClick = (action) => {
    if (action.label.toLowerCase().includes('strategy') || action.variant === 'primary') {
      trackEvent('execute_strategy_clicked', { source: 'ai_insight_panel' })
    }
  }

  return (
    <div
      className={cn(
        'relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-8',
        isPremium
          ? 'bg-primary-blue text-white shadow-glow-blue'
          : 'surface-mid elevated text-text-primary'
      )}
    >
      {/* Decorative background element for premium variant */}
      {isPremium && (
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      )}

      <div className="relative z-10">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-2">
          {isPremium && <Sparkles size={18} className="text-white" />}
          <span className="text-label tracking-[var(--letter-spacing-caps)] opacity-90">
            {insight.badge}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-[2rem] font-semibold leading-[1.2] tracking-tight md:text-[2.5rem] lg:pr-12">
          {insight.title}
        </h2>

        {/* Description */}
        <p
          className={cn(
            'mt-4 max-w-2xl text-body leading-relaxed md:text-[1rem]',
            isPremium ? 'text-white/80' : 'text-text-muted'
          )}
        >
          {insight.description}
        </p>
      </div>

      {/* Actions */}
      <div className="relative z-10 mt-10 flex items-center gap-4">
        {insight.actions.map((action, i) => (
          <Button
            key={i}
            onClick={() => handleActionClick(action)}
            variant={isPremium ? (action.variant === 'primary' ? 'secondary' : 'ghost') : action.variant}
            className={cn(
              isPremium && action.variant === 'primary' && 'border-none bg-white text-primary-blue hover:bg-white/90',
              isPremium && action.variant === 'secondary' && 'border-white/20 text-white hover:bg-white/10'
            )}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
