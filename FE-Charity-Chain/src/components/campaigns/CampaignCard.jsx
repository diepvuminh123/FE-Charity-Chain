import { Link } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import defaultImg from '@/assets/images/CampaignCard.png'

function formatCurrency(value) {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0 VND'
  return `${num.toLocaleString('vi-VN')} VND`
}

export default function CampaignCard({ campaign }) {
  const goal = parseFloat(campaign.goal_amount || campaign.goal || 0)
  const current = parseFloat(campaign.current_amount || campaign.currentBalance || 0)
  const progress = goal > 0 ? Math.round((current / goal) * 100) : 0
  const title = campaign.title || ''
  const description = campaign.short_description || campaign.description || ''
  const status = campaign.status || 'Active'
  const image = campaign.image_url || campaign.image || defaultImg

  const statusColor = {
    active: 'bg-green-500/90',
    completed: 'bg-blue-500/90',
    cancelled: 'bg-red-500/90',
    draft: 'bg-gray-500/90',
    pending_review: 'bg-yellow-500/90',
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-48 shrink-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          onError={(e) => { e.target.src = defaultImg }}
        />
        <span className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-xs font-semibold text-white capitalize ${statusColor[status.toLowerCase()] || 'bg-green-500/90'}`}>
          {status.replace('_', ' ')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-3 text-3xl/none font-bold text-gray-900">
          {title}
        </h3>
        <p className="mb-4 min-h-[44px] text-sm leading-relaxed text-gray-500 line-clamp-2">
          {description}
        </p>

        <div className="mt-auto">
          <div className="space-y-2 text-sm">
            <p className="font-medium text-gray-500">
              Funding Goal: <span className="font-bold text-gray-800">{formatCurrency(goal)}</span>
            </p>
            <p className="font-medium text-gray-500">
              Current Balance: <span className="font-bold text-sky-500">{formatCurrency(current)}</span>
            </p>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gray-900"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <p className="mt-2 text-right text-sm font-semibold text-gray-600">{progress}%</p>

          <Link
            to={ROUTES.CAMPAIGN_DETAIL.replace(':id', String(campaign.id))}
            className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
          >
            View Campaign
          </Link>
        </div>
      </div>
    </article>
  )
}
