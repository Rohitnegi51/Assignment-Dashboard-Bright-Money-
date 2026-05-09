import { PiggyBank, PlaySquare, Zap, ArrowRight } from 'lucide-react'
import { cn } from '../../utils/cn'
import Card from '../ui/Card'
import { useAnalytics } from '../../hooks/useAnalytics'

const ICON_MAP = {
  'piggy-bank': PiggyBank,
  'play-square': PlaySquare,
  'zap': Zap,
}

const THEME_MAP = {
  'blue': 'bg-[rgba(0,88,190,0.08)] text-primary-blue',
  'orange': 'bg-[rgba(184,117,3,0.08)] text-gold-standard',
  'gray': 'bg-surface-high text-text-secondary',
}

export default function CashFlowIntelligenceCard({ data }) {
  const { trackEvent } = useAnalytics()

  const handleViewReport = () => {
    trackEvent('view_report_clicked', { report_type: 'cash_flow_monthly' })
  }

  const handleInsightClick = (id) => {
    trackEvent('insight_interacted', { insight_id: id })
  }

  return (
    <Card variant="elevated" className="flex flex-col p-6 sm:p-8">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 border-b border-border-subtle pb-6">
        <div>
          <h2 className="text-[var(--font-size-label)] font-semibold uppercase tracking-[var(--letter-spacing-caps)] text-text-muted mb-2">
            Cash Flow Intelligence
          </h2>
          <p className="text-body text-text-secondary">
            Automated suggestions based on your recent spending patterns.
          </p>
        </div>
        <button 
          onClick={handleViewReport}
          className="group flex items-center gap-1.5 text-body font-semibold text-primary-blue transition-fast hover:text-primary-blue-hover cursor-pointer"
        >
          View Monthly Report
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 flex-1">
        {data.map((insight) => {
          const Icon = ICON_MAP[insight.iconType] || Zap
          const themeClass = THEME_MAP[insight.theme] || THEME_MAP['gray']

          return (
            <div 
              key={insight.id} 
              className="flex items-start gap-4 cursor-pointer group"
              onClick={() => handleInsightClick(insight.id)}
            >
              <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-element)] transition-transform group-hover:scale-105', themeClass)}>
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-body font-bold text-text-primary mb-1 group-hover:text-primary-blue transition-colors">
                  {insight.title}
                </span>
                <p className="text-[var(--font-size-label)] text-text-muted leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
