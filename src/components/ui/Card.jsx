import { cn } from '../../utils/cn'

/**
 * Card — tonal surface container for Wealth Curator.
 *
 * Variants: surface | elevated | premium
 *
 * @param {object} props
 * @param {'surface'|'elevated'|'premium'} [props.variant='surface']
 * @param {import('react').ReactNode} [props.header]
 * @param {import('react').ReactNode} [props.footer]
 * @param {boolean} [props.hoverable]
 * @param {string} [props.className]
 * @param {import('react').ReactNode} props.children
 */

const variantStyles = {
  surface: 'surface-mid',
  elevated: 'surface-mid elevated',
  premium: 'surface-mid elevated border border-gold-standard-muted',
}

export default function Card({
  variant = 'surface',
  header,
  footer,
  hoverable = false,
  className,
  children,
  ...rest
}) {
  return (
    <div
      className={cn(
        variantStyles[variant],
        'p-5',
        hoverable && 'transition-fast hover:bg-surface-high',
        className
      )}
      {...rest}
    >
      {header && (
        <div className="mb-4">{header}</div>
      )}
      {children}
      {footer && (
        <div className="mt-4 border-t border-border-subtle pt-4">{footer}</div>
      )}
    </div>
  )
}
