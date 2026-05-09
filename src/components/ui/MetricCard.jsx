import { cn } from '../../utils/cn'
import { TrendingUp, TrendingDown, CheckCircle } from 'lucide-react'

/**
 * MetricCard — core fintech primitive for financial metrics.
 *
 * @param {object} props
 * @param {string} props.label — metric category (e.g. "Total Net Worth")
 * @param {string} props.value — formatted display value (e.g. "$1,248,390")
 * @param {string} [props.change] — change value (e.g. "+12.4%")
 * @param {string} [props.context] — descriptive context (e.g. "vs last month")
 * @param {'positive'|'negative'|'status'} [props.trend] — trend type
 * @param {import('react').ReactNode} [props.footer] — optional footer content
 * @param {boolean} [props.loading] — show skeleton state
 * @param {string} [props.className]
 */

function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[var(--radius-sm)] bg-surface-high',
        className
      )}
    />
  )
}

const trendConfig = {
  positive: {
    color: 'text-success-green',
    icon: TrendingUp,
  },
  negative: {
    color: 'text-error-red',
    icon: TrendingDown,
  },
  status: {
    color: 'text-success-green',
    icon: CheckCircle,
  },
}

export default function MetricCard({
  label,
  value,
  change,
  context,
  trend = 'positive',
  footer,
  loading = false,
  className,
}) {
  if (loading) {
    return (
      <div className={cn('surface-mid elevated p-6', className)}>
        <Skeleton className="h-3 w-24 mb-3" />
        <Skeleton className="h-7 w-32 mb-2" />
        <Skeleton className="h-3 w-40" />
      </div>
    )
  }

  const { color, icon: TrendIcon } = trendConfig[trend] || trendConfig.positive

  return (
    <div
      className={cn(
        'surface-mid elevated rounded-[var(--radius-card)] px-6 py-7 transition-fast hover:bg-surface-high',
        className
      )}
    >
      <span className="text-label text-text-muted">{label}</span>

      <p className="mt-4 text-[2.25rem] font-medium leading-none tracking-tight text-text-primary">
        {value}
      </p>

      {(change || context) && (
        <div className={cn('mt-4 flex items-center gap-1.5 text-body', color)}>
          <TrendIcon size={14} className="shrink-0" />
          <span className="font-medium">
            {change}
            {change && context && ' '}
            {context && (
              <span className="font-normal">{context}</span>
            )}
          </span>
        </div>
      )}

      {footer && (
        <div className="mt-4 border-t border-border-subtle pt-4 text-[var(--font-size-label)] text-text-muted">
          {footer}
        </div>
      )}
    </div>
  )
}
