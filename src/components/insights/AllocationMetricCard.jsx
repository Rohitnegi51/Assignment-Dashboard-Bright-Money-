import { Cpu, Leaf, Building } from 'lucide-react'
import { cn } from '../../utils/cn'

const ICON_MAP = {
  'cpu': Cpu,
  'leaf': Leaf,
  'building': Building,
}

export default function AllocationMetricCard({ data }) {
  const Icon = ICON_MAP[data.iconType] || Cpu

  const getTrendColor = (type) => {
    switch(type) {
      case 'positive': return 'text-success-green'
      case 'negative': return 'text-error-red'
      case 'neutral': return 'text-text-muted'
      default: return 'text-text-muted'
    }
  }

  return (
    <div className="flex flex-col justify-between rounded-[var(--radius-card)] bg-surface-low border border-border-subtle p-5 shadow-sm transition-fast hover:border-primary-blue/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-mid text-text-secondary">
          <Icon size={20} />
        </div>
        <span className="text-[1.5rem] font-bold text-text-primary tracking-tight">
          {data.value}
        </span>
      </div>
      
      <div className="flex flex-col gap-2">
        <span className="text-body font-semibold text-text-primary">
          {data.title}
        </span>
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-surface-high overflow-hidden">
          <div 
            className="h-full bg-primary-blue rounded-full transition-all duration-1000"
            style={{ width: `${data.progress}%` }}
          />
        </div>
        
        <span className={cn('text-[var(--font-size-label)] font-medium mt-1', getTrendColor(data.trendType))}>
          {data.trend}
        </span>
      </div>
    </div>
  )
}
