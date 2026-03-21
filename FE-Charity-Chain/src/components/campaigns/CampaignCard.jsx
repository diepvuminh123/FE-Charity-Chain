import { Link } from 'react-router-dom'
import ROUTES from '@/constants/routes'

function formatCurrency(value) {
  return `${value.toLocaleString('vi-VN')} VND`
}

export default function CampaignCard({ campaign }) {
  const progress = Math.round((campaign.currentBalance / campaign.goal) * 100)

  return (
    <article className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="relative h-48">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute right-3 top-3 rounded-full bg-green-500/90 px-2 py-0.5 text-xs font-semibold text-white">
          {campaign.status}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-3xl/none font-bold text-gray-900 mb-3">
          {campaign.title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-500 min-h-[44px] mb-4">
          {campaign.description}
        </p>

        <div className="space-y-2 text-sm">
          <p className="text-gray-500 font-medium">
            Funding Goal: <span className="font-bold text-gray-800">{formatCurrency(campaign.goal)}</span>
          </p>
          <p className="text-gray-500 font-medium">
            Current Balance: <span className="font-bold text-sky-500">{formatCurrency(campaign.currentBalance)}</span>
          </p>
        </div>

        <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-gray-900"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <p className="mt-2 text-right text-sm font-semibold text-gray-600">{progress}%</p>

        <Link
          to={campaign.link || ROUTES.CAMPAIGN_DETAIL.replace(':id', String(campaign.id))}
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          View Campaign
        </Link>
      </div>
    </article>
  )
}
