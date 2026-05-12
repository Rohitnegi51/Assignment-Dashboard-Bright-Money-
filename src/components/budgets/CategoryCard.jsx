import { useMemo } from 'react'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import { cn } from '../../utils/cn'
import {
  Home,
  UtensilsCrossed,
  Bus,
  Zap,
  Film,
  BarChart3,
} from 'lucide-react'

/**
 * CategoryCard — individual budget category card for the Spending Categories grid.
 *
 * Displays:
 * - Category icon + mini trend/chart icon
 * - Category name
 * - "$X left of $Y" remaining text
 * - Progress bar (utilization)
 * - "XX% Used" label
 *
 * @param {object} props
 * @param {object} props.category — category data object
 * @param {string} props.category.id
 * @param {string} props.category.label
 * @param {string} props.category.icon — icon key
 * @param {number} props.category.budget
 * @param {number} props.category.spent
 * @param {function} [props.onClick] — optional click handler
 * @param {string} [props.className]
 */

/** Map icon key strings to lucide-react components */
const ICON_MAP = {
  home: Home,
  utensils: UtensilsCrossed,
  car: Bus,
  zap: Zap,
  film: Film,
}

/** Format number as compact currency ($X,XXX) */
function formatCompact(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function CategoryCard({ category, onClick, className }) {
  const { label, icon, budget, spent } = category

  const derived = useMemo(() => {
    const remaining = budget - spent
    const percentUsed = Math.round((spent / budget) * 100)
    return { remaining, percentUsed }
  }, [budget, spent])

  const CategoryIcon = ICON_MAP[icon] || Home

  return (
    <Card
      variant="surface"
      hoverable
      className={cn(
        'flex flex-col justify-between p-5 min-h-[200px]',
        'border border-border-subtle cursor-pointer',
        'hover:border-border-hover',
        className
      )}
      onClick={onClick}
      role="article"
      aria-label={`${label} budget category`}
    >
      {/* Icon Row */}
      <div className="flex items-center gap-3 mb-auto">
        <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-tag)] bg-primary-blue-muted">
          <CategoryIcon size={18} strokeWidth={1.8} className="text-primary-blue" />
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-tag)] bg-surface-low">
          <BarChart3 size={16} strokeWidth={2} className="text-primary-blue" />
        </div>
      </div>

      {/* Text Content */}
      <div className="mt-5">
        <h3 className="text-body font-semibold text-text-primary mb-0.5">
          {label}
        </h3>
        <p className="text-[var(--font-size-label)] text-text-muted leading-snug">
          {formatCompact(derived.remaining)} left of {formatCompact(budget)}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-3">
        <ProgressBar
          value={derived.percentUsed}
          size="sm"
          label={`${label}: ${derived.percentUsed}% of budget used`}
        />
        <span className="mt-1.5 block text-right text-[var(--font-size-label)] text-text-muted">
          {derived.percentUsed}% Used
        </span>
      </div>
    </Card>
  )
}
