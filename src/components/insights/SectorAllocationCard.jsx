import { cn } from '../../utils/cn'
import Card from '../ui/Card'

export default function SectorAllocationCard({ sectors }) {
  return (
    <Card variant="elevated" className="h-full flex flex-col p-6">
      <h2 className="text-[var(--font-size-label)] font-semibold uppercase tracking-[var(--letter-spacing-caps)] text-text-muted mb-6">
        Sector Allocation
      </h2>
      
      <div className="flex flex-col gap-4 flex-1 justify-center">
        {sectors.map((sector) => (
          <div key={sector.id} className="flex items-center justify-between text-body">
            <div className="flex items-center gap-3">
              <span className={cn('h-2.5 w-2.5 rounded-full', sector.color)} />
              <span className="text-text-primary font-medium">{sector.label}</span>
            </div>
            <span className="text-text-primary font-bold">{sector.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
