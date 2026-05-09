import { Lock } from 'lucide-react'

export default function RiskLevelCard({ data }) {
  return (
    <div className="flex h-full flex-col justify-center rounded-[var(--radius-card)] bg-surface-low border border-border-subtle p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <Lock size={16} className="text-text-muted" />
        <span className="text-[10px] font-bold uppercase tracking-[var(--letter-spacing-caps)] text-text-muted">
          Risk Level
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-tight text-text-primary">{data.level}</span>
        <span className="text-[var(--font-size-label)] text-text-secondary">
          {data.description}
        </span>
      </div>
    </div>
  )
}
