import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import CampaignCard from './CampaignCard'
import { CAMPAIGNS } from '@/constants/campaigns'

export default function CampaignsSection({
  withHeading = false,
  showControls = true,
  showPagination = true,
}) {
  return (
    <section className={withHeading ? 'py-14 bg-gray-100' : 'py-10 bg-gray-100'}>
      <div className="container-custom">
        {withHeading && (
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Charity Campaigns</h1>
            <p className="mt-4 text-gray-500 text-lg">
              Browse active charity campaigns and track funding progress transparently.
            </p>
          </div>
        )}

        <div className={withHeading ? 'mx-auto max-w-6xl' : 'mx-auto max-w-6xl'}>
          {showControls && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-3 mb-8">
              <label className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-sky-400"
                />
              </label>

              <button
                type="button"
                className="h-11 inline-flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-700"
              >
                <span>All Status</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPAIGNS.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>

          {showPagination && (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-gray-500"
              >
                <ChevronLeft size={14} />
                Previous
              </button>
              <button type="button" className="h-8 w-8 rounded-md bg-sky-500 text-white font-semibold">1</button>
              <button type="button" className="h-8 w-8 rounded-md border border-gray-200 bg-white text-gray-700 font-semibold">2</button>
              <button type="button" className="h-8 w-8 rounded-md border border-gray-200 bg-white text-gray-700 font-semibold">3</button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-gray-700"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
