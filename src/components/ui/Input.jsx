import { cn } from '../../utils/cn'

/**
 * Input — reusable form input for Wealth Curator.
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.helperText]
 * @param {import('react').ReactNode} [props.icon] — leading icon element
 * @param {string} [props.className]
 * @param {string} [props.id]
 */

export default function Input({
  label,
  error,
  helperText,
  icon,
  className,
  id,
  ...rest
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-label text-text-secondary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={cn(
            'h-9 w-full rounded-[var(--radius-button)] bg-surface-mid px-3',
            'text-body text-text-primary placeholder:text-text-muted',
            'border transition-fast',
            'focus:outline-none',
            icon && 'pl-9',
            error
              ? 'border-error-red focus:border-error-red-hover'
              : 'border-transparent hover:bg-surface-high focus:border-border-active'
          )}
          {...rest}
        />
      </div>
      {error && (
        <span id={`${inputId}-error`} className="text-[var(--font-size-label)] text-error-red" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={`${inputId}-helper`} className="text-[var(--font-size-label)] text-text-muted">
          {helperText}
        </span>
      )}
    </div>
  )
}
