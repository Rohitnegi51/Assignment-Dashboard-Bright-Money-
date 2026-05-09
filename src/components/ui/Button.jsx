import { cn } from '../../utils/cn'

/**
 * Button — reusable button primitive for Wealth Curator.
 *
 * Variants: primary | secondary | ghost | premium
 * Sizes: sm | md | lg
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'ghost'|'premium'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.loading]
 * @param {boolean} [props.disabled]
 * @param {import('react').ReactNode} [props.icon] — optional leading icon element
 * @param {string} [props.className]
 * @param {import('react').ReactNode} props.children
 */

const variantStyles = {
  primary: cn(
    'bg-primary-blue text-white',
    'hover:bg-primary-blue-hover',
    'focus-visible:outline-primary-blue'
  ),
  secondary: cn(
    'bg-surface-mid text-text-primary',
    'hover:bg-surface-high',
    'border border-border-subtle',
    'focus-visible:outline-primary-blue'
  ),
  ghost: cn(
    'bg-transparent text-text-secondary',
    'hover:bg-surface-mid hover:text-text-primary',
    'focus-visible:outline-primary-blue'
  ),
  premium: cn(
    'bg-gold-standard text-white',
    'hover:bg-gold-standard-hover',
    'focus-visible:outline-gold-standard'
  ),
}

const sizeStyles = {
  sm: 'h-8 px-3 text-[var(--font-size-label)] gap-1.5',
  md: 'h-9 px-4 text-[var(--font-size-body)] gap-2',
  lg: 'h-11 px-5 text-[var(--font-size-body)] gap-2.5',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  className,
  children,
  ...rest
}) {
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'rounded-[var(--radius-button)] transition-fast cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-label="Loading"
        />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children && <span>{children}</span>}
    </button>
  )
}
