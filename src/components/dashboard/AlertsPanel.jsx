import AlertCard from './AlertCard'

/**
 * AlertsPanel — container for the stacked Active Alerts section.
 */

function Skeleton() {
  return (
    <div className="surface-low flex h-full flex-col rounded-[var(--radius-card)] p-6">
      <div className="mb-4 h-4 w-24 rounded bg-surface-high" />
      <div className="space-y-3">
        <div className="h-24 w-full rounded-[var(--radius-element)] bg-surface-high animate-pulse" />
        <div className="h-20 w-full rounded-[var(--radius-element)] bg-surface-high animate-pulse" />
        <div className="h-20 w-full rounded-[var(--radius-element)] bg-surface-high animate-pulse" />
      </div>
    </div>
  )
}

export default function AlertsPanel({ alerts, isLoading }) {
  if (isLoading) return <Skeleton />

  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] bg-surface-low p-5">
      <h3 className="mb-4 text-[var(--font-size-label)] font-medium tracking-[var(--letter-spacing-wide)] text-text-muted uppercase">
        Active Alerts
      </h3>
      
      <div className="flex flex-col gap-3">
        {alerts.length > 0 ? (
          alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
        ) : (
          <div className="py-8 text-center text-body text-text-muted">
            No active alerts at this time.
          </div>
        )}
      </div>
    </div>
  )
}
