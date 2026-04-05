import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  LogOut,
  Copy,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import campaignService from '@/services/campaignService'
import withdrawalService from '@/services/withdrawalService'

function formatCurrency(value) {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0 VND'
  return `${num.toLocaleString('vi-VN')} VND`
}

function getTokenSymbol(campaign) {
  return campaign?.token_symbol || campaign?.symbol || campaign?.token?.symbol || 'TOKEN'
}

function formatTokenAmount(value, campaign) {
  const num = typeof value === 'string' ? parseFloat(value) : value
  const symbol = getTokenSymbol(campaign)
  if (isNaN(num)) return `0 ${symbol}`
  return `${num.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${symbol}`
}

function statusClass(status) {
  const s = status?.toLowerCase()
  if (s === 'active') return 'bg-green-100 text-green-700 ring-1 ring-green-200'
  if (s === 'completed') return 'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
  if (s === 'pending_review') return 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200'
  if (s === 'draft') return 'bg-gray-100 text-gray-600 ring-1 ring-gray-200'
  return 'bg-slate-200 text-slate-600 ring-1 ring-slate-300'
}

function withdrawalStatusClass(status) {
  const s = status?.toLowerCase()
  if (s === 'approved') return 'bg-green-100 text-green-700'
  if (s === 'voting') return 'bg-orange-100 text-orange-600'
  return 'bg-red-100 text-red-600'
}

function withdrawalStatusLabel(status) {
  const s = status?.toLowerCase()
  if (s === 'approved') return 'Approved'
  if (s === 'voting') return 'Voting'
  if (s === 'rejected') return 'Rejected'
  return status || 'Unknown'
}

function withdrawalStatusNote(status) {
  const s = status?.toLowerCase()
  if (s === 'approved') return 'Approved for disbursement.'
  if (s === 'voting') return 'In voting. Will transition to Approved or Rejected.'
  if (s === 'rejected') return 'Rejected by voters. Submit a new request after updates.'
  return 'Status update pending.'
}

export default function Admin() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCampaignId, setSelectedCampaignId] = useState(null)
  const [withdrawals, setWithdrawals] = useState([])
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState('')
  const [withdrawalLoading, setWithdrawalLoading] = useState(false)
  const [withdrawalError, setWithdrawalError] = useState('')
  const [withdrawalSuccess, setWithdrawalSuccess] = useState('')
  const [copiedWithdrawalTxId, setCopiedWithdrawalTxId] = useState(null)
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: '',
    proofFile: null,
    reason: '',
  })
  const [createForm, setCreateForm] = useState({
    title: '',
    category: '',
    short_description: '',
    funding_goal: '',
    token_address: '',
    deadline: '',
    target_group: '',
    location: '',
    contact_email: '',
    problem_statement: '',
    project_solution: '',
    expected_impact: '',
    timeline: '',
  })

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    setLoading(true)
    try {
      const res = await campaignService.getMyCampaigns(1, 50)
      if (res.status_code && res.data) {
        setCampaigns(res.data.items || [])
      }
    } catch {
      setCampaigns([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedCampaignId) {
      loadWithdrawals(selectedCampaignId)
    } else {
      setWithdrawals([])
    }
  }, [selectedCampaignId])

  const loadWithdrawals = async (campaignId) => {
    try {
      const res = await withdrawalService.getWithdrawals(campaignId)
      if (res.status_code && res.data) {
        setWithdrawals(res.data)
      } else {
        setWithdrawals([])
      }
    } catch {
      setWithdrawals([])
    }
  }

  const selectedCampaign = campaigns.find((item) => item.id === selectedCampaignId)

  // Compute highlights from real data
  const totalRaised = campaigns.reduce((sum, c) => sum + parseFloat(c.current_amount || 0), 0)
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length

  const HIGHLIGHTS = [
    {
      title: 'Total Raised',
      value: totalRaised > 0 ? totalRaised.toLocaleString('vi-VN') : '0',
      subtitle: 'VND',
      icon: TrendingUp,
      iconColor: 'text-blue-500',
    },
    {
      title: 'Active Campaigns',
      value: String(activeCampaigns),
      subtitle: 'Currently running',
      icon: FolderKanban,
      iconColor: 'text-green-500',
    },
    {
      title: 'Total Campaigns',
      value: String(campaigns.length),
      subtitle: 'All campaigns',
      icon: Users,
      iconColor: 'text-orange-500',
    },
  ]

  const handleCreateCampaign = async (action) => {
    setCreateError('')
    setCreateLoading(true)
    try {
      const payload = {
        ...createForm,
        token_address: createForm.token_address?.trim() || '',
        funding_goal: parseFloat(createForm.funding_goal) || 0,
        deadline: createForm.deadline ? new Date(createForm.deadline).toISOString() : '',
        action,
      }
      const res = await campaignService.createCampaign(payload)
      if (res.status_code) {
        setShowCreateForm(false)
        setCreateForm({
          title: '', category: '', short_description: '', funding_goal: '',
          token_address: '',
          deadline: '', target_group: '', location: '', contact_email: '',
          problem_statement: '', project_solution: '', expected_impact: '', timeline: '',
        })
        fetchCampaigns()
      } else {
        setCreateError(res.message || 'Failed to create campaign')
      }
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create campaign')
    } finally {
      setCreateLoading(false)
    }
  }

  const resetWithdrawalModal = () => {
    setWithdrawalForm({ amount: '', proofFile: null, reason: '' })
    setWithdrawalError('')
    setWithdrawalSuccess('')
    setWithdrawalLoading(false)
    setShowWithdrawalForm(false)
  }

  const handleWithdrawalFileChange = (event) => {
    const file = event.target.files?.[0] || null
    setWithdrawalError('')
    setWithdrawalForm((prev) => ({ ...prev, proofFile: file }))
  }

  const handleCopyWithdrawalTx = (txHash, requestId) => {
    if (!txHash) return
    navigator.clipboard.writeText(txHash)
    setCopiedWithdrawalTxId(requestId)
    setTimeout(() => setCopiedWithdrawalTxId(null), 2000)
  }

  const validateWithdrawalForm = () => {
    const amountNum = parseFloat(withdrawalForm.amount)
    const availableAmount = parseFloat(selectedCampaign?.current_amount || 0)

    if (isNaN(amountNum) || amountNum <= 0) {
      return 'Amount must be greater than 0.'
    }

    if (amountNum > availableAmount) {
      return 'Amount cannot exceed available balance.'
    }

    if (!withdrawalForm.proofFile) {
      return 'Please upload one evidence file (PDF, JPG, PNG).'
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowedTypes.includes(withdrawalForm.proofFile.type)) {
      return 'Evidence file must be PDF, JPG, or PNG.'
    }

    const tenMb = 10 * 1024 * 1024
    if (withdrawalForm.proofFile.size > tenMb) {
      return 'Evidence file size must be 10MB or less.'
    }

    if (!withdrawalForm.reason.trim()) {
      return 'Description is required.'
    }

    return ''
  }

  const handleSubmitWithdrawal = async () => {
    if (!selectedCampaign) return

    setWithdrawalError('')
    setWithdrawalSuccess('')

    const validationMessage = validateWithdrawalForm()
    if (validationMessage) {
      setWithdrawalError(validationMessage)
      return
    }

    setWithdrawalLoading(true)

    try {
      let proof_url = ''
      
      // 1. Upload to Cloudinary first
      if (withdrawalForm.proofFile) {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        
        if (!cloudName || !uploadPreset) {
          throw new Error('Cloudinary configuration is missing. Please check your .env file.');
        }

        const uploadData = new FormData();
        uploadData.append('file', withdrawalForm.proofFile);
        uploadData.append('upload_preset', uploadPreset);

        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
          method: 'POST',
          body: uploadData,
        });

        const result = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(result.error?.message || 'Failed to upload proof to Cloudinary');
        }
        proof_url = result.secure_url;
      }

      // 2. Submit to Backend
      const payload = {
        amount: parseFloat(withdrawalForm.amount),
        reason: withdrawalForm.reason.trim(),
        proof_url: proof_url,
      }

      const res = await withdrawalService.createWithdrawal(selectedCampaign.id, payload)
      if (res.status_code) {
        setWithdrawalSuccess('Withdrawal request submitted successfully.')
        await loadWithdrawals(selectedCampaign.id)
        await fetchCampaigns()
        setTimeout(() => {
          resetWithdrawalModal()
        }, 900)
      } else {
        setWithdrawalError(res.message || 'Failed to submit withdrawal request.')
      }
    } catch (err) {
      setWithdrawalError(err.response?.data?.message || 'Failed to submit withdrawal request.')
    } finally {
      setWithdrawalLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <div>
              <p className="text-lg font-extrabold tracking-tight text-sky-600">HCMUT Giving</p>
              <p className="text-xs font-semibold text-slate-500">Organization Dashboard</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">{user?.full_name || user?.email}</span>
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-red-500"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
          </div>
        ) : !selectedCampaign ? (
          <>
            {/* Dashboard header */}
            <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Organization Dashboard</p>
              <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
                Welcome back, {user?.full_name || 'Organization'}!
              </h1>
              <p className="mt-2 text-slate-500">Track campaign performance, donors, and disbursements in one place.</p>
            </header>

            {/* Highlights */}
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

            {/* Campaigns list */}
            <section className="mt-7">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-4xl/none font-bold text-slate-900">Your Campaigns</h2>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  <UsersRound size={16} />
                  Create Project
                </button>
              </div>

              {campaigns.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                  <p className="text-slate-400">No campaigns yet. Create your first project!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {campaigns.map((campaign) => {
                    const goal = parseFloat(campaign.goal_amount || 0)
                    const raised = parseFloat(campaign.current_amount || 0)
                    const progress = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0

                    return (
                      <article key={campaign.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-3xl/none font-bold text-slate-900">{campaign.title}</h3>
                            <p className="mt-2 text-slate-500 line-clamp-2">{campaign.short_description || ''}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass(campaign.status)}`}>
                            {campaign.status?.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-600">
                          <p>{formatTokenAmount(raised, campaign)}</p>
                          <p>of {formatTokenAmount(goal, campaign)}</p>
                        </div>

                        <div className="mt-2 h-2 rounded-full bg-slate-200">
                          <div className="h-full rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
                        </div>

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
              )}
            </section>
          </>
        ) : (
          /* Campaign detail view */
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
                    <h3 className="text-3xl/none font-bold text-slate-900">{selectedCampaign.title}</h3>
                    <p className="mt-2 text-slate-500">{selectedCampaign.short_description || ''}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass(selectedCampaign.status)}`}>
                    {selectedCampaign.status?.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-700">Funding Progress</p>
                <div className="mt-4 flex items-center justify-between text-lg font-bold text-slate-800">
                  <p>{formatTokenAmount(selectedCampaign.current_amount, selectedCampaign)}</p>
                  <p className="text-slate-500">of {formatTokenAmount(selectedCampaign.goal_amount, selectedCampaign)}</p>
                </div>

                <div className="mt-3 h-2.5 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${Math.min(Math.round((parseFloat(selectedCampaign.current_amount || 0) / parseFloat(selectedCampaign.goal_amount || 1)) * 100), 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-500">Available Balance</p>
                  <p className="mt-2 text-5xl/none font-bold text-emerald-600">
                    {parseFloat(selectedCampaign.current_amount || 0).toLocaleString('en-US', { maximumFractionDigits: 4 })}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{getTokenSymbol(selectedCampaign)}</p>
                </article>

                <article className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <p className="text-xl font-bold text-blue-900">Community Governance</p>
                  <p className="mt-2 text-sm leading-relaxed text-blue-800">
                    All withdrawal requests are subject to community voting to ensure transparency and proper fund usage.
                  </p>
                </article>
              </div>
            </div>

            {/* Withdrawal Requests */}
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
                {withdrawals.length === 0 ? (
                  <p className="text-center py-6 text-slate-400">No withdrawal requests yet</p>
                ) : (
                  withdrawals.map((request) => (
                    <article key={request.id} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="inline-flex items-center gap-2 text-lg font-bold text-slate-800">
                            <FileText size={16} className="text-slate-500" />
                            {formatTokenAmount(request.amount, selectedCampaign)}
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${withdrawalStatusClass(request.status)}`}>
                              {withdrawalStatusLabel(request.status)}
                            </span>
                          </p>
                          <p className="mt-1 text-sm text-slate-500">{request.reason}</p>
                          <p className="mt-1 text-xs text-slate-500">{withdrawalStatusNote(request.status)}</p>
                          <div className="mt-1">
                            {request.tx_hash ? (
                              <div className="flex flex-wrap items-center gap-2">
                                <a
                                  href={`https://sepolia.etherscan.io/tx/${request.tx_hash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600"
                                  title={request.tx_hash}
                                >
                                  Tx: {request.tx_hash.slice(0, 12)}...{request.tx_hash.slice(-10)}
                                  <ExternalLink size={12} />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleCopyWithdrawalTx(request.tx_hash, request.id)}
                                  className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-600"
                                >
                                  <Copy size={12} />
                                  {copiedWithdrawalTxId === request.id ? 'Copied' : 'Copy'}
                                </button>
                              </div>
                            ) : request.status?.toLowerCase() === 'approved' ? (
                              <p className="text-xs font-semibold text-amber-600">Tx hash pending</p>
                            ) : (
                              <p className="text-xs text-slate-400">Tx hash will appear after approval and disbursement.</p>
                            )}
                          </div>
                          <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                            <Clock3 size={12} />
                            {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        {(() => {
                          if (!request.proof_url) return null;
                          const lowerUrl = request.proof_url.toLowerCase();
                          const isPdf = /\.pdf$/.test(lowerUrl) || lowerUrl.includes('.pdf');
                          const isImage = !isPdf && (/\.(jpeg|jpg|gif|png|webp|svg)$/.test(lowerUrl) || lowerUrl.includes('/image/upload/'));

                          if (isPdf) {
                            return (
                              <a
                                href={request.proof_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 hover:text-red-700 transition"
                              >
                                <FileText size={16} />
                                Xem PDF
                              </a>
                            );
                          }

                          if (isImage) {
                            return (
                              <a
                                href={request.proof_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block max-w-[64px] overflow-hidden rounded border border-gray-200 hover:opacity-80 transition"
                              >
                                <img src={request.proof_url} alt="Proof" className="w-full h-auto object-cover" />
                              </a>
                            );
                          }
                          return (
                            <a
                              href={request.proof_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition"
                              title="View Document"
                            >
                              <ExternalLink size={16} />
                              Mở Link
                            </a>
                          );
                        })()}
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-xl md:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-3xl/none font-bold text-slate-900">Create New Campaign</h3>
                <p className="mt-2 text-sm text-slate-500">Fill in the details for your new campaign.</p>
              </div>
              <button type="button" onClick={() => setShowCreateForm(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            {createError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">{createError}</div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">Title *</span>
                  <input type="text" value={createForm.title} onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" required />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">Category *</span>
                  <input type="text" value={createForm.category} onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })} placeholder="e.g. Education, Health" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" required />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">Short Description *</span>
                <textarea rows={2} value={createForm.short_description} onChange={(e) => setCreateForm({ ...createForm, short_description: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" required />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">Funding Goal (VND) *</span>
                  <input type="number" value={createForm.funding_goal} onChange={(e) => setCreateForm({ ...createForm, funding_goal: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" required />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">Token Address</span>
                  <input
                    type="text"
                    value={createForm.token_address}
                    onChange={(e) => setCreateForm({ ...createForm, token_address: e.target.value })}
                    placeholder="0x..."
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">Deadline *</span>
                  <input type="date" value={createForm.deadline} onChange={(e) => setCreateForm({ ...createForm, deadline: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" required />
                </label>
                <div />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">Target Group</span>
                  <input type="text" value={createForm.target_group} onChange={(e) => setCreateForm({ ...createForm, target_group: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">Location</span>
                  <input type="text" value={createForm.location} onChange={(e) => setCreateForm({ ...createForm, location: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">Problem Statement</span>
                <textarea rows={2} value={createForm.problem_statement} onChange={(e) => setCreateForm({ ...createForm, problem_statement: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">Project Solution</span>
                <textarea rows={2} value={createForm.project_solution} onChange={(e) => setCreateForm({ ...createForm, project_solution: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400" />
              </label>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button type="button" onClick={() => setShowCreateForm(false)} className="rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700" disabled={createLoading}>
                  Cancel
                </button>
                <button type="button" onClick={() => handleCreateCampaign('draft')} className="rounded-xl border border-slate-300 bg-slate-50 px-6 py-2.5 text-sm font-semibold text-slate-700" disabled={createLoading}>
                  {createLoading ? 'Saving...' : 'Save Draft'}
                </button>
                <button type="button" onClick={() => handleCreateCampaign('pending_review')} className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700" disabled={createLoading}>
                  {createLoading ? 'Submitting...' : 'Submit for Review'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Request Modal (kept for UI, will be wired when VT-01-BE is ready) */}
      {showWithdrawalForm && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl md:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-3xl/none font-bold text-slate-900">Create Withdrawal Request</h3>
                <p className="mt-2 text-sm text-slate-500">Submit a withdrawal request for your campaign funds. All requests will be reviewed by the community.</p>
              </div>
              <button type="button" onClick={resetWithdrawalModal} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            {withdrawalError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {withdrawalError}
              </div>
            )}

            {withdrawalSuccess && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                {withdrawalSuccess}
              </div>
            )}

            {withdrawalLoading && (
              <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
                Submitting withdrawal request. Please wait...
              </div>
            )}

            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">Amount ({getTokenSymbol(selectedCampaign)})</span>
                <input
                  type="number"
                  min="0"
                  value={withdrawalForm.amount}
                  onChange={(e) => {
                    setWithdrawalError('')
                    setWithdrawalForm((prev) => ({ ...prev, amount: e.target.value }))
                  }}
                  placeholder="Enter amount to withdraw"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400"
                />
                <p className="mt-1 text-sm text-slate-500">Available: {formatTokenAmount(selectedCampaign.current_amount, selectedCampaign)}</p>
              </label>

              <div>
                <p className="mb-1 text-sm font-semibold text-slate-700">Upload Evidence</p>
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                  <Upload size={34} className="mx-auto text-slate-400" />
                  <p className="mt-3 text-sm text-slate-600">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-slate-400">Accepts PDF, JPG, PNG (max 10MB)</p>
                  <label className="mt-4 inline-flex cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                    Browse Files
                    <input
                      type="file"
                      accept=".pdf,image/png,image/jpeg"
                      className="hidden"
                      onChange={handleWithdrawalFileChange}
                    />
                  </label>
                  {withdrawalForm.proofFile && (
                    <p className="mt-2 text-xs text-slate-600">Selected file: {withdrawalForm.proofFile.name}</p>
                  )}
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">Description</span>
                <textarea
                  rows={3}
                  value={withdrawalForm.reason}
                  onChange={(e) => {
                    setWithdrawalError('')
                    setWithdrawalForm((prev) => ({ ...prev, reason: e.target.value }))
                  }}
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
                  onClick={resetWithdrawalModal}
                  className="rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700"
                  disabled={withdrawalLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitWithdrawal}
                  disabled={withdrawalLoading}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {withdrawalLoading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
