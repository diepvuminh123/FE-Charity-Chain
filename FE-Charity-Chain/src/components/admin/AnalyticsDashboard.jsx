import { useEffect, useMemo, useState } from 'react'
import {
  TrendingUp,
  Wallet,
  Users,
  FolderKanban,
  ShieldCheck,
  Hourglass,
  ArrowDownToLine,
  ArrowUpFromLine,
} from 'lucide-react'
import analyticsService from '@/services/analyticsService'

function formatNumber(value) {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0'
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toLocaleString('en-US', { maximumFractionDigits: 4 })
}

const STATUS_COLORS = {
  active: '#10b981',
  pending_review: '#f59e0b',
  draft: '#94a3b8',
  completed: '#3b82f6',
  cancelled: '#ef4444',
  voting: '#f97316',
  approved: '#10b981',
  rejected: '#ef4444',
}

function statusLabel(status) {
  if (!status) return 'Unknown'
  return status
    .toString()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function BarChart({ data, title, emptyText }) {
  const max = Math.max(1, ...data.map((d) => Number(d.count) || 0))
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      {data.length === 0 ? (
        <p className="mt-6 text-sm text-slate-400">{emptyText}</p>
      ) : (
        <div className="mt-5 space-y-3">
          {data.map((row) => {
            const count = Number(row.count) || 0
            const widthPct = (count / max) * 100
            const color = STATUS_COLORS[row.status?.toLowerCase()] || '#64748b'
            return (
              <div key={row.status}>
                <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>{statusLabel(row.status)}</span>
                  <span className="text-slate-500">{count}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${widthPct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </article>
  )
}

function LineChart({ points, emptyText }) {
  const width = 640
  const height = 200
  const padding = { top: 20, right: 16, bottom: 32, left: 48 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  const series = useMemo(() => {
    return (points || []).map((p) => ({
      day: p.day,
      amount: Number(p.amount) || 0,
      count: Number(p.count) || 0,
    }))
  }, [points])

  const max = Math.max(1, ...series.map((p) => p.amount))
  const stepX = series.length > 1 ? innerW / (series.length - 1) : 0

  const path = series
    .map((p, i) => {
      const x = padding.left + i * stepX
      const y = padding.top + innerH - (p.amount / max) * innerH
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')

  const areaPath =
    series.length > 0
      ? `${path} L ${(padding.left + (series.length - 1) * stepX).toFixed(1)} ${(padding.top + innerH).toFixed(1)} L ${padding.left} ${(padding.top + innerH).toFixed(1)} Z`
      : ''

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Donations Timeline (last 30 days)</h3>
        <span className="text-xs font-semibold text-slate-500">Daily total amount</span>
      </div>

      {series.length === 0 ? (
        <p className="mt-10 text-center text-sm text-slate-400">{emptyText}</p>
      ) : (
        <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 w-full" role="img">
          {[0, 0.25, 0.5, 0.75, 1].map((p) => {
            const y = padding.top + innerH - p * innerH
            return (
              <g key={p}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="3 3"
                />
                <text x={padding.left - 6} y={y + 3} fontSize="9" textAnchor="end" fill="#94a3b8">
                  {formatNumber(max * p)}
                </text>
              </g>
            )
          })}

          <path d={areaPath} fill="rgba(56, 189, 248, 0.18)" />
          <path d={path} fill="none" stroke="#0ea5e9" strokeWidth="2" />

          {series.map((p, i) => {
            const x = padding.left + i * stepX
            const y = padding.top + innerH - (p.amount / max) * innerH
            const dateStr = new Date(p.day).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
            return (
              <g key={`${p.day}-${i}`}>
                <circle cx={x} cy={y} r="3" fill="#0ea5e9">
                  <title>{`${dateStr}: ${formatNumber(p.amount)}`}</title>
                </circle>
                {(i === 0 || i === series.length - 1 || i % Math.ceil(series.length / 6) === 0) && (
                  <text x={x} y={height - 10} fontSize="9" textAnchor="middle" fill="#94a3b8">
                    {dateStr}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      )}
    </article>
  )
}

function MetricCard({ title, value, subtitle, icon: Icon, accent }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <Icon size={18} className={accent} />
      </div>
      <p className="mt-4 text-4xl/none font-bold text-slate-900">{value}</p>
      {subtitle && <p className="mt-2 text-xs text-slate-500">{subtitle}</p>}
    </article>
  )
}

export default function AnalyticsDashboard() {
  const [overview, setOverview] = useState(null)
  const [campaignsBreakdown, setCampaignsBreakdown] = useState([])
  const [withdrawalsBreakdown, setWithdrawalsBreakdown] = useState([])
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const [ov, ch, wh, tl] = await Promise.all([
          analyticsService.getOverview(),
          analyticsService.getCampaignsBreakdown(),
          analyticsService.getWithdrawalsBreakdown(),
          analyticsService.getDonationsTimeline(30),
        ])
        if (cancelled) return
        setOverview(ov?.data || null)
        setCampaignsBreakdown(ch?.data || [])
        setWithdrawalsBreakdown(wh?.data || [])
        setTimeline(tl?.data || [])
      } catch (err) {
        if (cancelled) return
        setError(err.response?.data?.message || 'Failed to load analytics')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-sky-500" />
        <p className="mt-3 text-sm text-slate-500">Loading analytics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm font-semibold text-red-600">{error}</p>
      </div>
    )
  }

  const metrics = overview || {}

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Donations"
          value={formatNumber(metrics.total_donations)}
          subtitle="On-chain inflow"
          icon={ArrowDownToLine}
          accent="text-emerald-500"
        />
        <MetricCard
          title="Total Disbursements"
          value={formatNumber(metrics.total_disbursements)}
          subtitle="Released to charities"
          icon={ArrowUpFromLine}
          accent="text-sky-500"
        />
        <MetricCard
          title="Active Campaigns"
          value={formatNumber(metrics.active_campaigns)}
          subtitle={`of ${formatNumber(metrics.total_campaigns)} total`}
          icon={FolderKanban}
          accent="text-blue-500"
        />
        <MetricCard
          title="Pending Withdrawals"
          value={formatNumber(metrics.pending_withdrawal_requests)}
          subtitle={`of ${formatNumber(metrics.total_withdrawal_requests)} requests`}
          icon={Hourglass}
          accent="text-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Charity Orgs"
          value={formatNumber(metrics.total_charity_orgs)}
          subtitle="Verified organizations"
          icon={ShieldCheck}
          accent="text-emerald-500"
        />
        <MetricCard
          title="Voters"
          value={formatNumber(metrics.total_voters)}
          subtitle="Wallets that have voted"
          icon={Users}
          accent="text-violet-500"
        />
        <MetricCard
          title="All Campaigns"
          value={formatNumber(metrics.total_campaigns)}
          subtitle="Including drafts"
          icon={Wallet}
          accent="text-slate-500"
        />
        <MetricCard
          title="Withdrawal Reqs"
          value={formatNumber(metrics.total_withdrawal_requests)}
          subtitle="All-time submissions"
          icon={TrendingUp}
          accent="text-pink-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <BarChart
          title="Campaigns by Status"
          data={campaignsBreakdown}
          emptyText="No campaign data yet."
        />
        <BarChart
          title="Withdrawal Requests by Status"
          data={withdrawalsBreakdown}
          emptyText="No withdrawal data yet."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <LineChart points={timeline} emptyText="No donations recorded in the last 30 days." />
      </div>
    </div>
  )
}
