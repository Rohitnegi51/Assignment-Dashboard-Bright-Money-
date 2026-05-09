import { TrendingUp } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function TopPerformerCard({ data }) {
  return (
    <div className="flex h-full flex-col justify-center rounded-[var(--radius-card)] bg-primary-blue p-5 text-white shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <TrendingUp size={16} className="text-white/80" />
        <span className="text-[10px] font-bold uppercase tracking-[var(--letter-spacing-caps)] text-white/80">
          Top Performer
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-tight">{data.ticker}</span>
        <span className="text-[var(--font-size-label)] font-medium text-white/90">
          {data.change}
        </span>
      </div>
    </div>
  )
}
