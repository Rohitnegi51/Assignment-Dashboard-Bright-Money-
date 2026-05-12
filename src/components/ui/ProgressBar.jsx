import { cn } from '../../utils/cn'

/**
 * ProgressBar — reusable accessible progress primitive for Wealth Curator.
 *
 * Extracts the track/fill pattern used across SpendingComposition and
 * AllocationMetricCard into a proper, accessible component.
 *
 * @param {object} props
 * @param {number} props.value — current progress percentage (0–100)
 * @param {'sm'|'md'|'lg'} [props.size='md'] — bar height
 * @param {string} [props.fillClassName] — custom fill color class
 * @param {string} [props.trackClassName] — custom track color class
 * @param {string} [props.label] — accessible label for screen readers
 * @param {string} [props.className]
 */

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
}

export default function ProgressBar({
  value = 0,
  size = 'md',
  fillClassName,
  trackClassName,
  label = 'Progress',
  className,
}) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn(
        'w-full overflow-hidden rounded-full',
        trackClassName || 'bg-surface-low',
        sizeStyles[size],
        className
      )}
    >
      <div
        className={cn(
          'h-full rounded-full transition-all duration-1000 ease-out',
          fillClassName || 'bg-primary-blue'
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
