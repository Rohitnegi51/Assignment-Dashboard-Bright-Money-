import { cn } from '../../utils/cn'

/**
 * ToggleGroup — segmented control for switching between options.
 *
 * Common fintech use: time-range selectors (1W / 1M / 3M / 1Y / All),
 * view mode switches, category filters.
 *
 * @param {object} props
 * @param {{ value: string, label: string }[]} props.options — selectable items
 * @param {string} props.value — currently selected value
 * @param {(value: string) => void} props.onChange
 * @param {'sm'|'md'} [props.size='md']
 * @param {string} [props.className]
 * @param {string} [props.ariaLabel] — accessible group label
 */

const sizeStyles = {
  sm: 'h-7 px-2.5 text-[var(--font-size-label)]',
  md: 'h-8 px-3.5 text-[var(--font-size-body)]',
}

export default function ToggleGroup({
  options,
  value,
  onChange,
  size = 'md',
  className,
  ariaLabel = 'Toggle options',
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-[var(--radius-button)] bg-surface-low p-0.5',
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-[var(--radius-tag)] font-medium transition-fast cursor-pointer',
              'focus-visible:outline-2 focus-visible:outline-primary-blue focus-visible:outline-offset-0',
              sizeStyles[size],
              isActive
                ? 'bg-primary-blue text-white shadow-surface'
                : 'text-text-muted hover:text-text-secondary'
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
