import { cn } from '../../utils/cn'

/**
 * Badge — compact tonal label for Wealth Curator.
 *
 * Variants: success | warning | danger | premium | neutral
 *
 * @param {object} props
 * @param {'success'|'warning'|'danger'|'premium'|'neutral'} [props.variant='neutral']
 * @param {string} [props.className]
 * @param {import('react').ReactNode} props.children
 */

const variantStyles = {
  success: 'bg-success-green-muted text-success-green',
  warning: 'bg-gold-standard-muted text-gold-standard',
  danger: 'bg-error-red-muted text-error-red',
  premium: 'bg-primary-blue-muted text-primary-blue',
  neutral: 'bg-surface-mid text-text-secondary',
}

export default function Badge({
  variant = 'neutral',
  className,
  children,
  ...rest
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5',
        'text-[var(--font-size-label)] font-medium leading-[var(--line-height-label)]',
        'tracking-[var(--letter-spacing-wide)]',
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
