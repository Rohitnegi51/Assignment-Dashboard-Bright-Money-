import { useState, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '../../utils/cn'
import Card from '../ui/Card'
import { useAnalytics } from '../../hooks/useAnalytics'

const TIMEFRAMES = ['1M', '3M', '1Y', 'ALL']

// Custom Tooltip matched to design
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-[var(--radius-element)] bg-surface-high p-3 shadow-md border border-border-subtle">
        <p className="text-[var(--font-size-label)] text-text-muted mb-1">{label}</p>
        <p className="text-body font-bold text-text-primary">
          ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    )
  }
  return null
}

export default function PortfolioPerformanceChart({ data }) {
  const [timeframe, setTimeframe] = useState('1Y')
  const { trackEvent } = useAnalytics()

  // Filter data based on timeframe (mock logic)
  const chartData = useMemo(() => {
    // In a real app, you would fetch or slice the actual dataset.
    // For this mock, we just slice the end of the array to simulate timeframes.
    let sliceLength = data.history.length
    if (timeframe === '1M') sliceLength = 2
    else if (timeframe === '3M') sliceLength = 4
    else if (timeframe === '1Y') sliceLength = 12 // Using 12 for 1Y
    
    return data.history.slice(-sliceLength)
  }, [data.history, timeframe])

  const handleTimeframeChange = (tf) => {
    setTimeframe(tf)
    trackEvent('chart_timeframe_changed', { timeframe: tf, chart: 'portfolio_performance' })
  }

  return (
    <Card variant="elevated" className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-[var(--font-size-label)] font-semibold uppercase tracking-[var(--letter-spacing-caps)] text-text-muted mb-1">
            Portfolio Performance
          </h2>
          <div className="flex items-baseline gap-3">
            <span className="text-[2rem] font-bold text-text-primary tracking-tight">
              ${data.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-body font-bold text-success-green">
              +{data.percentageChange}%
            </span>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1 rounded-[var(--radius-button)] bg-surface-low p-1 border border-border-subtle">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={cn(
                'rounded-[var(--radius-element)] px-3 py-1 text-[var(--font-size-label)] font-semibold transition-fast cursor-pointer',
                timeframe === tf
                  ? 'bg-surface-high text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--theme-primary-blue)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--theme-primary-blue)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--theme-border-subtle)" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--theme-text-muted)', fontSize: 12 }}
              dy={10}
            />
            {/* Hide YAxis visually but keep it for scaling */}
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--theme-primary-blue)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            {/* Main Portfolio Line */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--theme-primary-blue)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 6, fill: 'var(--theme-primary-blue)', stroke: 'var(--theme-surface-high)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
