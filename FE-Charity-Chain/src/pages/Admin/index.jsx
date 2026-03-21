import { useState } from 'react'
import {
  TrendingUp,
  FolderKanban,
  Users,
  ArrowRight,
  UsersRound,
  Bell,
  ArrowLeft,
  FileText,
  ExternalLink,
  Clock3,
  Upload,
  X,
} from 'lucide-react'

const HIGHLIGHTS = [
  {
    title: 'Total Raised',
    value: '455.000.000',
    subtitle: 'VND',
    icon: TrendingUp,
    iconColor: 'text-blue-500',
  },
  {
    title: 'Active Campaigns',
    value: '2',
    subtitle: 'Currently running',
    icon: FolderKanban,
    iconColor: 'text-green-500',
  },
  {
    title: 'Total Donors',
    value: '802',
    subtitle: 'Unique contributors',
    icon: Users,
    iconColor: 'text-orange-500',
  },
]

const CAMPAIGNS = [
  {
    id: 1,
    name: 'Clean Water Initiative',
    description: 'Providing clean water access to rural communities in developing regions. This project aims to install water purification systems and build sustainable water sources.',
    raised: 150000000,
    goal: 250000000,
    donors: 234,
    status: 'Active',
    availableBalance: 150000000,
    governanceText: 'All withdrawal requests are subject to community voting to ensure transparency and proper fund usage.',
    withdrawals: [
      {
        amount: 50000000,
        status: 'Approved',
        description: 'Purchase of water purification equipment',
        date: '2026-03-10',
      },
      {
        amount: 30000000,
        status: 'Voting',
        description: 'Construction materials for well installation',
        date: '2026-03-15',
      },
    ],
  },
  {
    id: 2,
    name: 'Education for All',
    description: 'Building schools and providing educational materials',
    raised: 85000000,
    goal: 150000000,
    donors: 156,
    status: 'Active',
    availableBalance: 85000000,
    governanceText: 'All withdrawal requests are subject to community voting to ensure transparency and proper fund usage.',
    withdrawals: [
      {
        amount: 20000000,
        status: 'Voting',
        description: 'Purchase textbooks and school supplies',
        date: '2026-03-18',
      },
    ],
  },
  {
    id: 3,
    name: 'Medical Relief Fund',
    description: 'Emergency medical supplies for disaster-affected areas',
    raised: 220000000,
    goal: 200000000,
    donors: 412,
    status: 'Completed',
    availableBalance: 20000000,
    governanceText: 'All withdrawal requests are subject to community voting to ensure transparency and proper fund usage.',
    withdrawals: [
      {
        amount: 120000000,
        status: 'Approved',
        description: 'Emergency medicine procurement',
        date: '2026-03-01',
      },
    ],
  },
]

function formatCurrency(value) {
  return `${value.toLocaleString('vi-VN')} VND`
}

function statusClass(status) {
  return status === 'Active'
    ? 'bg-green-100 text-green-700 ring-1 ring-green-200'
    : 'bg-slate-200 text-slate-600 ring-1 ring-slate-300'
}

function withdrawalStatusClass(status) {
  if (status === 'Approved') return 'bg-green-100 text-green-700'
  if (status === 'Voting') return 'bg-orange-100 text-orange-600'
  return 'bg-slate-100 text-slate-600'
}

export default function Admin() {
  const [selectedCampaignId, setSelectedCampaignId] = useState(null)
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false)

  const selectedCampaign = CAMPAIGNS.find((item) => item.id === selectedCampaignId)

  return (
    <section className="min-h-screen bg-slate-100">
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <div>
              <p className="text-lg font-extrabold tracking-tight text-sky-600">HCMUT Giving</p>
              <p className="text-xs font-semibold text-slate-500">Organization Dashboard</p>
            </div>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-slate-700"
            >
              <Bell size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        {!selectedCampaign ? (
          <>
            <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Organization Dashboard</p>
              <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">Welcome back, Organization&apos;s name!</h1>
              <p className="mt-2 text-slate-500">Track campaign performance, donors, and disbursements in one place.</p>
            </header>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {HIGHLIGHTS.map((item) => {
                const Icon = item.icon
                return (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-semibold text-slate-500">{item.title}</p>
                      <Icon size={18} className={item.iconColor} />
                    </div>
                    <p className="mt-5 text-5xl/none font-bold text-slate-900">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.subtitle}</p>
                  </article>
                )
              })}
            </div>

            <section className="mt-7">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-4xl/none font-bold text-slate-900">Your Campaigns</h2>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600">
                  <UsersRound size={16} />
                  Create Project
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {CAMPAIGNS.map((campaign) => {
                  const progress = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100)

                  return (
                    <article key={campaign.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-3xl/none font-bold text-slate-900">{campaign.name}</h3>
                          <p className="mt-2 text-slate-500">{campaign.description}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-600">
                        <p>{formatCurrency(campaign.raised)}</p>
                        <p>of {campaign.goal.toLocaleString('vi-VN')}</p>
                      </div>

                      <div className="mt-2 h-2 rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
                      </div>

                      <p className="mt-3 text-sm text-slate-500">{campaign.donors} donors</p>

                      <button
                        type="button"
                        onClick={() => setSelectedCampaignId(campaign.id)}
                        className="mt-4 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        View Details
                        <ArrowRight size={16} />
                      </button>
                    </article>
                  )
                })}
              </div>
            </section>
          </>
        ) : (
          <section className="space-y-4">
            <button
              type="button"
              onClick={() => setSelectedCampaignId(null)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Back to Campaigns
            </button>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-3xl/none font-bold text-slate-900">{selectedCampaign.name}</h3>
                    <p className="mt-2 text-slate-500">{selectedCampaign.description}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(selectedCampaign.status)}`}>
                    {selectedCampaign.status}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-700">Funding Progress</p>
                <div className="mt-4 flex items-center justify-between text-lg font-bold text-slate-800">
                  <p>{formatCurrency(selectedCampaign.raised)}</p>
                  <p className="text-slate-500">of {selectedCampaign.goal.toLocaleString('vi-VN')}</p>
                </div>

                <div className="mt-3 h-2.5 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${Math.min(Math.round((selectedCampaign.raised / selectedCampaign.goal) * 100), 100)}%` }}
                  />
                </div>

                <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
                  <Users size={15} />
                  {selectedCampaign.donors} donors contributed
                </p>
              </div>

              <div className="space-y-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-500">Available Balance</p>
                  <p className="mt-2 text-5xl/none font-bold text-emerald-600">{selectedCampaign.availableBalance.toLocaleString('vi-VN')}</p>
                  <p className="mt-1 text-sm text-slate-500">VND</p>
                </article>

                <article className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <p className="text-xl font-bold text-blue-900">Community Governance</p>
                  <p className="mt-2 text-sm leading-relaxed text-blue-800">{selectedCampaign.governanceText}</p>
                </article>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="text-2xl font-bold text-slate-900">Withdrawal Requests</h4>
                <button
                  type="button"
                  onClick={() => setShowWithdrawalForm(true)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Create Withdrawal Request
                </button>
              </div>

              <div className="space-y-3">
                {selectedCampaign.withdrawals.map((request, index) => (
                  <article key={`${request.date}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="inline-flex items-center gap-2 text-lg font-bold text-slate-800">
                          <FileText size={16} className="text-slate-500" />
                          {formatCurrency(request.amount)}
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${withdrawalStatusClass(request.status)}`}>
                            {request.status}
                          </span>
                        </p>
                        <p className="mt-1 text-sm text-slate-500">{request.description}</p>
                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock3 size={12} />
                          {request.date}
                        </p>
                      </div>

                      <button type="button" className="rounded-md p-2 text-slate-400 hover:bg-white hover:text-slate-700">
                        <ExternalLink size={15} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {showWithdrawalForm && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl md:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-3xl/none font-bold text-slate-900">Create Withdrawal Request</h3>
                <p className="mt-2 text-sm text-slate-500">Submit a withdrawal request for your campaign funds. All requests will be reviewed by the community.</p>
              </div>

              <button
                type="button"
                onClick={() => setShowWithdrawalForm(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">Amount (VND)</span>
                <input
                  type="text"
                  placeholder="Enter amount to withdraw"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400"
                />
                <p className="mt-1 text-sm text-slate-500">Available: {formatCurrency(selectedCampaign.availableBalance)}</p>
              </label>

              <div>
                <p className="mb-1 text-sm font-semibold text-slate-700">Upload Evidence</p>
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                  <Upload size={34} className="mx-auto text-slate-400" />
                  <p className="mt-3 text-sm text-slate-600">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-slate-400">Accepts PDF, JPG, PNG (max 10MB)</p>
                  <button type="button" className="mt-4 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                    Browse Files
                  </button>
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">Description</span>
                <textarea
                  rows={3}
                  placeholder="Describe how the funds will be used..."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400"
                />
                <p className="mt-1 text-sm text-slate-500">Provide detailed information about how you plan to use the funds.</p>
              </label>

              <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-500">
                Your request will be reviewed through community voting.
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowWithdrawalForm(false)}
                  className="rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button type="button" className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
