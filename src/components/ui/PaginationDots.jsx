import { cn } from '../../utils/cn'

/**
 * PaginationDots — compact page/step indicator.
 *
 * Reusable across any carousel, stepper, or paginated section.
 * Supports both passive (display-only) and interactive (clickable) modes.
 *
 * @param {object} props
 * @param {number} props.total — total number of dots
 * @param {number} [props.active=0] — zero-indexed active dot
 * @param {function} [props.onClick] — optional (pageIndex) => void handler
 * @param {string} [props.className]
 */

export default function PaginationDots({
  total = 3,
  active = 0,
  onClick,
  className,
}) {
  const isInteractive = typeof onClick === 'function'

  return (
    <div
      className={cn('flex items-center gap-1.5', className)}
      role="tablist"
      aria-label="Page indicator"
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Page ${i + 1}`}
          tabIndex={isInteractive ? 0 : -1}
          onClick={isInteractive ? () => onClick(i) : undefined}
          className={cn(
            'block rounded-full transition-fast border-0 p-0',
            isInteractive && 'cursor-pointer hover:opacity-80',
            !isInteractive && 'pointer-events-none',
            i === active
              ? 'h-2 w-2 bg-primary-blue'
              : 'h-1.5 w-1.5 bg-text-muted/40'
          )}
        />
      ))}
    </div>
  )
}
