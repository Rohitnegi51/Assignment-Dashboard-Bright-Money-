import { cn } from '../../utils/cn'
import { AlertTriangle, Info, TrendingDown, Bell } from 'lucide-react'

/**
 * AlertCard — displays an individual alert with severity-based styling.
 */

const severityConfig = {
  danger: {
    borderClass: 'border-l-error-red',
    bgClass: 'bg-error-red-muted/50 hover:bg-error-red-muted', 
    iconColor: 'text-error-red',
    titleColor: 'text-error-red', 
    Icon: AlertTriangle,
  },
  warning: {
    borderClass: 'border-l-gold-standard',
    bgClass: 'bg-gold-standard-muted/50 hover:bg-gold-standard-muted',
    iconColor: 'text-gold-standard',
    titleColor: 'text-text-primary',
    Icon: TrendingDown,
  },
  info: {
    borderClass: 'border-l-primary-blue',
    bgClass: 'bg-surface-mid hover:bg-surface-high',
    iconColor: 'text-primary-blue',
    titleColor: 'text-text-primary',
    Icon: Info,
  },
  default: {
    borderClass: 'border-l-border-subtle',
    bgClass: 'bg-surface-mid hover:bg-surface-high',
    iconColor: 'text-text-muted',
    titleColor: 'text-text-primary',
    Icon: Bell,
  },
}

export default function AlertCard({ alert }) {
  const config = severityConfig[alert.severity] || severityConfig.default
  const { Icon } = config

  return (
    <div
      className={cn(
        'group flex gap-3 rounded-[var(--radius-element)] border-l-[3px] p-4 transition-fast',
        config.bgClass,
        config.borderClass
      )}
    >
      <div className={cn('mt-0.5 shrink-0', config.iconColor)}>
        <Icon size={18} />
      </div>
      <div>
        <h4 className={cn('text-body font-semibold', config.titleColor)}>
          {alert.title}
        </h4>
        <p className="mt-1 text-[var(--font-size-body)] leading-relaxed text-text-secondary">
          {alert.description}
        </p>
      </div>
    </div>
  )
}
