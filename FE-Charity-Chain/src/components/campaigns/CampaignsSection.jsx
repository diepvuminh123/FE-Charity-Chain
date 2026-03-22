import { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import CampaignCard from './CampaignCard'
import campaignService from '@/services/campaignService'

export default function CampaignsSection({
  withHeading = false,
  showControls = true,
  showPagination = true,
  limit = 6,
}) {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchCampaigns()
  }, [page])

  const fetchCampaigns = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await campaignService.getCampaigns(page, limit)
      if (res.status_code && res.data) {
        setCampaigns(res.data.items || [])
        setTotalPages(res.data.pagination?.total_pages || 1)
      }
    } catch (err) {
      setError('Failed to load campaigns')
      setCampaigns([])
    } finally {
      setLoading(false)
    }
  }

  // Client-side filtering
  const filtered = campaigns.filter((c) => {
    const matchesSearch =
      !searchTerm ||
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.short_description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

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

        <div className="mx-auto max-w-6xl">
          {showControls && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-3 mb-8">
              <label className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-sky-400"
                />
              </label>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 outline-none"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="pending_review">Pending Review</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchCampaigns}
                className="text-sm text-sky-500 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">No campaigns found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}

          {showPagination && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-gray-500 disabled:opacity-50"
              >
                <ChevronLeft size={14} />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-md font-semibold ${
                    p === page
                      ? 'bg-sky-500 text-white'
                      : 'border border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-gray-700 disabled:opacity-50"
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
