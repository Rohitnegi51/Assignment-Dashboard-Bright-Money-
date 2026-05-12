import { cn } from '../../utils/cn'

/**
 * SectionHeader — reusable dashboard section header.
 *
 * Supports an optional eyebrow label for editorial hierarchy,
 * configurable heading level for semantic flexibility,
 * and optional action elements aligned to the right.
 *
 * @param {object} props
 * @param {string} [props.eyebrow] — small uppercase label above the title
 * @param {string} [props.eyebrowClassName] — override eyebrow color/style
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {'h1'|'h2'|'h3'} [props.as='h2'] — heading element
 * @param {string} [props.headingClassName] — override heading typography
 * @param {import('react').ReactNode} [props.actions] — right-aligned action elements
 * @param {string} [props.className]
 */

export default function SectionHeader({
  eyebrow,
  eyebrowClassName,
  title,
  subtitle,
  as: Heading = 'h2',
  headingClassName,
  actions,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div>
        {eyebrow && (
          <span
            className={cn(
              'mb-1.5 block text-[var(--font-size-label)] font-semibold uppercase',
              'tracking-[var(--letter-spacing-caps)]',
              eyebrowClassName || 'text-gold-standard'
            )}
          >
            {eyebrow}
          </span>
        )}
        <Heading
          className={cn(
            'text-title text-text-primary',
            headingClassName
          )}
        >
          {title}
        </Heading>
        {subtitle && (
          <p className="mt-1 text-body text-text-muted">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}
