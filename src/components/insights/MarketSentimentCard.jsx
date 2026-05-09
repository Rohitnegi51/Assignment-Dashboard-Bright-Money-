import { useMemo } from 'react'
import { cn } from '../../utils/cn'
import Card from '../ui/Card'

export default function MarketSentimentCard({ data }) {
  // Memoize SVG calculations for performance
  const gaugeData = useMemo(() => {
    const radius = 40
    // Circumference of a half circle (Math.PI * r)
    const arcLength = Math.PI * radius
    // Offset based on score (0 to 100)
    const offset = arcLength - (data.score / 100) * arcLength
    
    return {
      radius,
      arcLength,
      offset
    }
  }, [data.score])

  // Helper for trend colors
  const getTrendColor = (trend) => {
    switch(trend) {
      case 'positive': return 'text-success-green'
      case 'negative': return 'text-error-red'
      case 'neutral': return 'text-gold-standard'
      default: return 'text-text-muted'
    }
  }

  return (
    <Card variant="elevated" className="h-full flex flex-col items-center">
      
      {/* Eyebrow */}
      <div className="w-full text-center sm:text-left mb-6">
        <span className="text-[var(--font-size-label)] font-semibold uppercase tracking-[var(--letter-spacing-caps)] text-text-muted">
          Market Sentiment
        </span>
      </div>

      {/* SVG Radial Gauge */}
      <div className="relative flex flex-col items-center justify-center w-[200px] mb-8">
        <svg 
          viewBox="0 0 100 50" 
          className="w-full overflow-visible"
          aria-label={`Market Sentiment Score: ${data.score} out of 100`}
        >
          {/* Background Track */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            className="text-surface-low"
          />
          {/* Active Fill */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            className="text-primary-blue transition-all duration-1000 ease-out"
            strokeDasharray={gaugeData.arcLength}
            strokeDashoffset={gaugeData.offset}
          />
        </svg>
        
        {/* Center Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center translate-y-2">
          <span className="text-[1.375rem] font-bold text-text-primary tracking-tight">
            {data.label}
          </span>
          <span className="text-[var(--font-size-label)] text-text-muted mt-0.5">
            Score: {data.score}/100
          </span>
        </div>
      </div>

      {/* Indicators List */}
      <div className="w-full flex flex-col gap-3 mt-auto">
        {data.indicators.map((indicator) => (
          <div key={indicator.id} className="flex justify-between items-center text-body">
            <span className="text-text-secondary">{indicator.label}</span>
            <span className={cn('font-bold', getTrendColor(indicator.trend))}>
              {indicator.status}
            </span>
          </div>
        ))}
      </div>

    </Card>
  )
}
