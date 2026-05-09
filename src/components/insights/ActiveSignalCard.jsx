import { cn } from '../../utils/cn'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { Sparkles } from 'lucide-react'
import { useAnalytics } from '../../hooks/useAnalytics'

export default function ActiveSignalCard({ data }) {
  const { trackEvent } = useAnalytics()

  const handleReview = () => {
    trackEvent('execute_strategy_clicked', { source: 'active_signal_card', signalId: data.id })
    // Business logic to open strategy review
  }

  const handleDismiss = () => {
    trackEvent('strategy_dismissed', { source: 'active_signal_card', signalId: data.id })
    // Business logic to dismiss
  }

  return (
    <Card variant="elevated" className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        
        {/* Left Content */}
        <div className="flex-1 max-w-lg">
          {/* Eyebrow */}
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold-standard" />
            <span className="text-[var(--font-size-label)] font-bold uppercase tracking-[var(--letter-spacing-caps)] text-gold-standard">
              {data.badge}
            </span>
          </div>

          {/* Typography Hierarchy */}
          <h2 className="mb-4 text-headline text-text-primary tracking-tight">
            {data.title}
          </h2>
          <p className="text-body leading-relaxed text-text-secondary">
            {data.description}
          </p>
        </div>

        {/* Right Graphic area - Signal Confidence */}
        <div className="shrink-0 sm:w-[180px] rounded-[var(--radius-element)] bg-surface-low p-4 border border-border-subtle flex flex-col items-center justify-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-blue-muted text-primary-blue">
            <Sparkles size={24} />
          </div>
          <div className="w-full">
            <div className="mb-1.5 flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-[var(--letter-spacing-caps)] text-text-muted">
                Signal Confidence
              </span>
              <span className="text-label font-bold text-primary-blue">{data.confidence || 85}%</span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full bg-surface-high overflow-hidden">
              <div 
                className="h-full bg-primary-blue rounded-full transition-all duration-1000"
                style={{ width: `${data.confidence || 85}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center gap-3">
        <Button onClick={handleReview} variant={data.actions?.[0]?.variant || 'primary'}>
          {data.actions?.[0]?.label || 'Review Strategy'}
        </Button>
        <Button onClick={handleDismiss} variant={data.actions?.[1]?.variant || 'ghost'} className={data.actions?.[1]?.variant === 'ghost' ? 'text-primary-blue' : ''}>
          {data.actions?.[1]?.label || 'Dismiss'}
        </Button>
      </div>
    </Card>
  )
}
