import { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Copy, FileText, ExternalLink, Clock3 } from 'lucide-react'
import ROUTES from '@/constants/routes'
import { CAMPAIGNS, WITHDRAWAL_REQUESTS, DISBURSEMENTS } from '@/constants/campaigns'

export default function CampaignDetail() {
  const { id } = useParams()
  const campaign = CAMPAIGNS.find((item) => String(item.id) === id) || CAMPAIGNS[0]
  const progress = Number(((campaign.currentBalance / campaign.goal) * 100).toFixed(1))

  const formatCurrency = (value) => `${value.toLocaleString('vi-VN')} VND`

  const getStatusClass = (status) => {
    if (status === 'Voting') return 'bg-orange-100 text-orange-600'
    if (status === 'Approved') return 'bg-green-100 text-green-600'
    return 'bg-red-100 text-red-600'
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

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h1 className="text-4xl/none font-bold text-gray-900">{campaign.title}</h1>
          <p className="mt-3 text-gray-500">{campaign.detailDescription}</p>

          <div className="mt-5 flex items-center justify-between rounded-lg bg-gray-50 p-3 text-sm">
            <div>
              <p className="text-gray-500">Token Address</p>
              <p className="font-semibold text-gray-700">{campaign.tokenAddress}</p>
            </div>
            <button type="button" className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1.5 text-gray-600">
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-100 p-4">
              <p className="text-sm text-gray-500">Funding Goal</p>
              <p className="mt-1 text-4xl/none font-bold text-gray-900">{formatCurrency(campaign.goal)}</p>
            </div>

            <div className="rounded-lg bg-cyan-50 p-4">
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="mt-1 text-4xl/none font-bold text-sky-600">{formatCurrency(campaign.currentBalance)}</p>
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
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {WITHDRAWAL_REQUESTS.map((request) => (
                  <Fragment key={request.id}>
                    <tr className="border-t border-gray-100 text-gray-700">
                      <td className="px-4 py-3 font-semibold">{request.requestId}</td>
                      <td className="px-4 py-3 font-semibold">{formatCurrency(request.amount)}</td>
                      <td className="px-4 py-3">
                        <button type="button" className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-600">
                          <FileText size={14} />
                          {request.evidenceLabel}
                        </button>
                      </td>
                      <td className="px-4 py-3 font-semibold">{request.voteYes}% Yes</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusClass(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {request.action ? (
                          <button type="button" className="rounded-md bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white">{request.action}</button>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    </tr>

                    {request.hasLiveVote && (
                      <tr className="border-t border-gray-100 bg-gray-50/50">
                        <td colSpan={6} className="px-4 py-4">
                          <div className="space-y-2 text-sm">
                            <p className="inline-flex items-center gap-1 font-semibold text-orange-500">
                              <Clock3 size={14} />
                              Voting Ends In: 2 Days 12 Hours
                            </p>

                            <div>
                              <p className="mb-1 font-semibold text-green-600">Yes</p>
                              <div className="h-2 rounded-full bg-gray-200">
                                <div className="h-full rounded-full bg-green-500" style={{ width: `${request.voteYes}%` }} />
                              </div>
                            </div>

                            <div>
                              <p className="mb-1 font-semibold text-red-500">No</p>
                              <div className="h-2 rounded-full bg-gray-200">
                                <div className="h-full rounded-full bg-red-500" style={{ width: `${100 - request.voteYes}%` }} />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-3xl/none font-bold text-gray-900">Disbursement History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Disbursement ID</th>
                  <th className="px-4 py-3 font-semibold">Amount (VND)</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Transaction Hash</th>
                </tr>
              </thead>

              <tbody>
                {DISBURSEMENTS.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100 text-gray-700">
                    <td className="px-4 py-3 font-semibold">#{item.id}</td>
                    <td className="px-4 py-3 font-semibold">{formatCurrency(item.amount)}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">
                      <a href="#" className="inline-flex items-center gap-1 font-semibold text-sky-500">
                        {item.txHash}
                        <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
