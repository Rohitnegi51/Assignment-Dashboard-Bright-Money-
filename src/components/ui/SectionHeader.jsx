import { cn } from '../../utils/cn'

/**
 * SectionHeader — reusable dashboard section header.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {import('react').ReactNode} [props.actions] — right-aligned action elements
 * @param {string} [props.className]
 */

export default function SectionHeader({
  title,
  subtitle,
  actions,
  className,
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div>
        <h2 className="text-title text-text-primary">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 text-body text-text-muted">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}
