import { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Copy, FileText, ExternalLink, Clock3 } from 'lucide-react'
import ROUTES from '@/constants/routes'
import campaignService from '@/services/campaignService'

export default function CampaignDetail() {
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchCampaign = async () => {
      setLoading(true)
      try {
        const res = await campaignService.getCampaignById(id)
        if (res.status_code && res.data) {
          setCampaign(res.data)
        } else {
          setError('Campaign not found')
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load campaign')
      } finally {
        setLoading(false)
      }
    }
    fetchCampaign()
  }, [id])

  if (loading) {
    return (
      <section className="bg-gray-100 py-6 md:py-8">
        <div className="container-custom flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
        </div>
      </section>
    )
  }

  if (error || !campaign) {
    return (
      <section className="bg-gray-100 py-6 md:py-8">
        <div className="container-custom text-center py-20">
          <p className="text-red-500 mb-4">{error || 'Campaign not found'}</p>
          <Link to={ROUTES.CAMPAIGNS} className="text-sky-500 hover:underline">
            Back to Campaigns
          </Link>
        </div>
      </section>
    )
  }

  const goal = parseFloat(campaign.goal_amount || 0)
  const current = parseFloat(campaign.current_amount || 0)
  const progress = goal > 0 ? Number(((current / goal) * 100).toFixed(1)) : 0
  const withdrawals = campaign.withdrawals || []

  const formatCurrency = (value) => {
    const num = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(num)) return '0 VND'
    return `${num.toLocaleString('vi-VN')} VND`
  }

  const getStatusClass = (status) => {
    if (status === 'voting') return 'bg-orange-100 text-orange-600'
    if (status === 'approved') return 'bg-green-100 text-green-600'
    return 'bg-red-100 text-red-600'
  }

  const handleCopy = () => {
    const addr = campaign.token_address || campaign.contract_address || ''
    if (addr) {
      navigator.clipboard.writeText(addr)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getVotePercent = (wr) => {
    const total = (wr.yes_votes || 0) + (wr.no_votes || 0)
    return total > 0 ? Math.round((wr.yes_votes / total) * 100) : 0
  }

  const isVotingActive = (wr) => {
    return wr.status === 'voting' && new Date(wr.voting_deadline) > new Date()
  }

  return (
    <section className="bg-gray-100 py-6 md:py-8">
      <div className="container-custom space-y-5">
        <Link
          to={ROUTES.CAMPAIGNS}
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft size={16} />
          Back to Campaigns
        </Link>

        {/* Campaign info */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h1 className="text-4xl/none font-bold text-gray-900">{campaign.title}</h1>
          <p className="mt-3 text-gray-500">{campaign.short_description || campaign.problem_statement || ''}</p>

          {(campaign.token_address || campaign.contract_address) && (
            <div className="mt-5 flex items-center justify-between rounded-lg bg-gray-50 p-3 text-sm">
              <div>
                <p className="text-gray-500">Token Address</p>
                <p className="font-semibold text-gray-700 font-mono text-xs">
                  {campaign.token_address || campaign.contract_address}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1.5 text-gray-600"
              >
                <Copy size={14} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-100 p-4">
              <p className="text-sm text-gray-500">Funding Goal</p>
              <p className="mt-1 text-4xl/none font-bold text-gray-900">{formatCurrency(goal)}</p>
            </div>
            <div className="rounded-lg bg-cyan-50 p-4">
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="mt-1 text-4xl/none font-bold text-sky-600">{formatCurrency(current)}</p>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-sm font-medium">
              <p className="text-gray-700">Funding Progress</p>
              <p className="text-gray-500">{progress}%</p>
            </div>
            <div className="h-3 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-slate-900"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Withdrawal Requests */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-3xl/none font-bold text-gray-900">Withdrawal Requests</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Request ID</th>
                  <th className="px-4 py-3 font-semibold">Amount (VND)</th>
                  <th className="px-4 py-3 font-semibold">Evidence</th>
                  <th className="px-4 py-3 font-semibold">Vote Result</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                      No withdrawal requests yet
                    </td>
                  </tr>
                ) : (
                  withdrawals.map((wr) => {
                    const voteYes = getVotePercent(wr)
                    return (
                      <Fragment key={wr.id}>
                        <tr className="border-t border-gray-100 text-gray-700">
                          <td className="px-4 py-3 font-semibold">Request #{wr.id}</td>
                          <td className="px-4 py-3 font-semibold">{formatCurrency(wr.amount)}</td>
                          <td className="px-4 py-3">
                            {wr.proof_url ? (
                              <a
                                href={wr.proof_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                              >
                                <FileText size={14} />
                                View Evidence
                              </a>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 font-semibold">{voteYes}% Yes</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${getStatusClass(wr.status)}`}>
                              {wr.status}
                            </span>
                          </td>
                        </tr>

                        {isVotingActive(wr) && (
                          <tr className="border-t border-gray-100 bg-gray-50/50">
                            <td colSpan={5} className="px-4 py-4">
                              <div className="space-y-2 text-sm">
                                <p className="inline-flex items-center gap-1 font-semibold text-orange-500">
                                  <Clock3 size={14} />
                                  Voting Ends: {new Date(wr.voting_deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                                <div>
                                  <p className="mb-1 font-semibold text-green-600">Yes ({wr.yes_votes || 0})</p>
                                  <div className="h-2 rounded-full bg-gray-200">
                                    <div className="h-full rounded-full bg-green-500" style={{ width: `${voteYes}%` }} />
                                  </div>
                                </div>
                                <div>
                                  <p className="mb-1 font-semibold text-red-500">No ({wr.no_votes || 0})</p>
                                  <div className="h-2 rounded-full bg-gray-200">
                                    <div className="h-full rounded-full bg-red-500" style={{ width: `${100 - voteYes}%` }} />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disbursement History — shows approved withdrawals with tx_hash */}
        {withdrawals.some((wr) => wr.status === 'approved' && wr.tx_hash) && (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-3xl/none font-bold text-gray-900">Disbursement History</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Request ID</th>
                    <th className="px-4 py-3 font-semibold">Amount (VND)</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Transaction Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals
                    .filter((wr) => wr.status === 'approved' && wr.tx_hash)
                    .map((wr) => (
                      <tr key={wr.id} className="border-t border-gray-100 text-gray-700">
                        <td className="px-4 py-3 font-semibold">#{wr.id}</td>
                        <td className="px-4 py-3 font-semibold">{formatCurrency(wr.amount)}</td>
                        <td className="px-4 py-3">{new Date(wr.updated_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td className="px-4 py-3">
                          <a
                            href={`https://sepolia.etherscan.io/tx/${wr.tx_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-sky-500 font-mono text-xs"
                          >
                            {wr.tx_hash.slice(0, 10)}...{wr.tx_hash.slice(-8)}
                            <ExternalLink size={14} />
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
