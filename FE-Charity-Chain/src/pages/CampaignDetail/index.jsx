import { Fragment, useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Copy, FileText, ExternalLink, Clock3 } from 'lucide-react'
import ROUTES from '@/constants/routes'
import campaignService from '@/services/campaignService'
import withdrawalService from '@/services/withdrawalService'
import transactionService from '@/services/transactionService'
import useWallet from '@/hooks/useWallet'

export default function CampaignDetail() {
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copiedTokenAddress, setCopiedTokenAddress] = useState(false)
  const [copiedTxId, setCopiedTxId] = useState(null)
  const [voteSubmittingId, setVoteSubmittingId] = useState(null)
  const [voteFeedback, setVoteFeedback] = useState({})
  const [voteStatusByRequest, setVoteStatusByRequest] = useState({})
  const [voteStatusErrorByRequest, setVoteStatusErrorByRequest] = useState({})
  const [nowMs, setNowMs] = useState(Date.now())
  const [transactions, setTransactions] = useState([])
  const [transactionsLoading, setTransactionsLoading] = useState(false)
  const [transactionsError, setTransactionsError] = useState('')
  const { address, connectWallet, error: walletError } = useWallet()

  const normalizeAddress = (value) => (value || '').toString().trim().toLowerCase()

  const extractVoteList = (voteResponse) => {
    const payload = voteResponse?.data ?? voteResponse
    if (Array.isArray(payload)) return payload
    if (Array.isArray(payload?.items)) return payload.items
    if (Array.isArray(payload?.votes)) return payload.votes
    return []
  }

  function isVotingActive(wr) {
    return wr?.status === 'voting' && new Date(wr.voting_deadline) > new Date()
  }

  const fetchCampaign = useCallback(async () => {
    setLoading(true)
    try {
      const res = await campaignService.getCampaignById(id)
      if (res.success && res.data) {
        setCampaign(res.data)
        setError('')
      } else {
        setError('Campaign not found')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load campaign')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchCampaign()
  }, [fetchCampaign])

  const fetchTransactions = useCallback(async () => {
    if (!id) return
    setTransactionsLoading(true)
    try {
      const res = await transactionService.getByCampaign(id, 1, 50)
      const items = res?.data?.items || []
      setTransactions(Array.isArray(items) ? items : [])
      setTransactionsError('')
    } catch (err) {
      setTransactions([])
      setTransactionsError(err.response?.data?.message || 'Failed to load transactions')
    } finally {
      setTransactionsLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNowMs(Date.now())
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [])

  const handleCopy = () => {
    const addr = campaign.token_address || campaign.contract_address || ''
    if (addr) {
      navigator.clipboard.writeText(addr)
      setCopiedTokenAddress(true)
      setTimeout(() => setCopiedTokenAddress(false), 2000)
    }
  }

  const handleCopyTxHash = (txHash, requestId) => {
    if (!txHash) return
    navigator.clipboard.writeText(txHash)
    setCopiedTxId(requestId)
    setTimeout(() => setCopiedTxId(null), 2000)
  }

  const getVotePercent = (wr) => {
    const total = (wr.yes_votes || 0) + (wr.no_votes || 0)
    return total > 0 ? Math.round((wr.yes_votes / total) * 100) : 0
  }

  const formatCountdown = (deadline) => {
    const diffMs = new Date(deadline).getTime() - nowMs
    if (diffMs <= 0) return '00:00:00'

    const totalSeconds = Math.floor(diffMs / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':')
  }

  useEffect(() => {
    const hydrateVoteStatus = async () => {
      if (!campaign || !address) {
        setVoteStatusByRequest({})
        return
      }

      const activeRequests = (campaign.withdrawals || []).filter((wr) => isVotingActive(wr))
      if (!activeRequests.length) {
        setVoteStatusByRequest({})
        return
      }

      setVoteStatusByRequest((prev) => {
        const next = { ...prev }
        activeRequests.forEach((wr) => {
          next[wr.id] = {
            known: false,
            hasVoted: false,
            voteChoice: '',
          }
        })
        return next
      })

      const entries = await Promise.all(
        activeRequests.map(async (wr) => {
          try {
            const voteRes = await withdrawalService.getVotes(wr.id)
            const votes = extractVoteList(voteRes)
            const myVote = votes.find((voteItem) => {
              const wallet =
                voteItem.wallet_address ||
                voteItem.voter_wallet ||
                voteItem.wallet ||
                voteItem.address
              return normalizeAddress(wallet) === normalizeAddress(address)
            })

            const isApprovedVote =
              myVote?.is_approved === true ||
              myVote?.vote === 'yes' ||
              myVote?.choice === 'yes' ||
              myVote?.decision === 'yes'

            return [
              wr.id,
              {
                known: true,
                hasVoted: !!myVote,
                voteChoice: myVote ? (isApprovedVote ? 'Yes' : 'No') : '',
                sourceError: '',
              },
            ]
          } catch {
            return [
              wr.id,
              {
                known: true,
                hasVoted: false,
                voteChoice: '',
                sourceError: 'Unable to verify your previous vote right now.',
              },
            ]
          }
        })
      )

      const mapped = Object.fromEntries(entries)
      setVoteStatusByRequest(mapped)

      const nextErrors = {}
      Object.entries(mapped).forEach(([requestId, status]) => {
        if (status?.sourceError) {
          nextErrors[requestId] = status.sourceError
        }
      })
      setVoteStatusErrorByRequest(nextErrors)
    }

    hydrateVoteStatus()
  }, [campaign, address])

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
  const tokenSymbol =
    campaign.token_symbol ||
    campaign.symbol ||
    campaign.token?.symbol ||
    'TOKEN'

  const formatTokenAmount = (value) => {
    const num = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(num)) return `0 ${tokenSymbol}`
    return `${num.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${tokenSymbol}`
  }

  const getStatusMeta = (status) => {
    const normalizedStatus = (status || '').toLowerCase()
    if (normalizedStatus === 'voting') {
      return {
        label: 'Voting',
        badgeClass: 'bg-orange-100 text-orange-700',
        note: 'In voting. Will transition to Approved or Rejected when timer ends.',
      }
    }

    if (normalizedStatus === 'approved') {
      return {
        label: 'Approved',
        badgeClass: 'bg-green-100 text-green-700',
        note: 'Approved for disbursement.',
      }
    }

    if (normalizedStatus === 'rejected') {
      return {
        label: 'Rejected',
        badgeClass: 'bg-red-100 text-red-700',
        note: 'Rejected by voters. Charity can submit a new request.',
      }
    }

    return {
      label: status || 'Unknown',
      badgeClass: 'bg-slate-200 text-slate-700',
      note: 'Status update pending.',
    }
  }

  const friendlyVoteError = (raw) => {
    if (!raw) return 'Unable to submit vote'
    const lower = raw.toLowerCase()
    if (lower.includes('already voted')) return 'You have already voted on this request.'
    if (lower.includes('only donors')) return 'Only wallets that have donated to this campaign can vote.'
    if (lower.includes('deadline')) return 'Voting deadline has passed for this request.'
    if (lower.includes('closed')) return 'Voting is closed for this request.'
    if (lower.includes('invalid wallet')) return 'Wallet address is invalid. Please reconnect and try again.'
    if (lower.includes('not found')) return 'Withdrawal request no longer exists.'
    return raw
  }

  const handleVote = async (requestId, isApproved) => {
    if (!address || voteSubmittingId) return

    setVoteSubmittingId(requestId)
    setVoteFeedback((prev) => ({
      ...prev,
      [requestId]: {
        type: 'loading',
        message: 'Submitting your vote...',
      },
    }))

    try {
      await withdrawalService.castVote(requestId, address, isApproved)
      setVoteFeedback((prev) => ({
        ...prev,
        [requestId]: {
          type: 'success',
          message: isApproved ? 'Vote submitted: Yes' : 'Vote submitted: No',
        },
      }))
      setVoteStatusByRequest((prev) => ({
        ...prev,
        [requestId]: {
          known: true,
          hasVoted: true,
          voteChoice: isApproved ? 'Yes' : 'No',
        },
      }))
      await fetchCampaign()
      window.setTimeout(() => {
        setVoteFeedback((prev) => {
          const next = { ...prev }
          delete next[requestId]
          return next
        })
      }, 4000)
    } catch (err) {
      setVoteFeedback((prev) => ({
        ...prev,
        [requestId]: {
          type: 'error',
          message: friendlyVoteError(err.response?.data?.message),
        },
      }))
    } finally {
      setVoteSubmittingId(null)
    }
  }

  const hasAnyVotingRequest = withdrawals.some((wr) => wr.status === 'voting')

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
                {copiedTokenAddress ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-100 p-4">
              <p className="text-sm text-gray-500">Funding Goal</p>
              <p className="mt-1 text-4xl/none font-bold text-gray-900">{formatTokenAmount(goal)}</p>
            </div>
            <div className="rounded-lg bg-cyan-50 p-4">
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="mt-1 text-4xl/none font-bold text-sky-600">{formatTokenAmount(current)}</p>
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
            {!hasAnyVotingRequest && (
              <p className="mt-1 text-sm text-gray-500">No active voting right now. New requests will appear here once voting starts.</p>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Request ID</th>
                  <th className="px-4 py-3 font-semibold">Amount ({tokenSymbol})</th>
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
                    const statusMeta = getStatusMeta(wr.status)
                    const voteStatus = voteStatusByRequest[wr.id]
                    const voteKnown = !!voteStatus?.known
                    const hasVoted = !!voteStatus?.hasVoted
                    const voteState = voteFeedback[wr.id]
                    const disableVoteButtons =
                      voteSubmittingId === wr.id || (address && (!voteKnown || hasVoted))

                    return (
                      <Fragment key={wr.id}>
                        <tr className="border-t border-gray-100 text-gray-700">
                          <td className="px-4 py-3 font-semibold">Request #{wr.id}</td>
                          <td className="px-4 py-3 font-semibold">{formatTokenAmount(wr.amount)}</td>
                          <td className="px-4 py-3">
                            {(() => {
                              if (!wr.proof_url) return <span className="text-gray-300">-</span>;
                              const lowerUrl = wr.proof_url.toLowerCase();
                              const isPdf = /\.pdf$/.test(lowerUrl) || lowerUrl.includes('.pdf');
                              const isImage = !isPdf && (/\.(jpeg|jpg|gif|png|webp|svg)$/.test(lowerUrl) || lowerUrl.includes('/image/upload/'));

                              if (isPdf) {
                                return (
                                  <a
                                    href={wr.proof_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                                  >
                                    <FileText size={16} />
                                    Xem PDF
                                  </a>
                                );
                              }
                              
                              if (isImage) {
                                return (
                                  <a
                                    href={wr.proof_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block max-w-[80px] overflow-hidden rounded border border-gray-200 hover:opacity-80 transition"
                                  >
                                    <img src={wr.proof_url} alt="Proof" className="w-full h-auto object-cover" />
                                  </a>
                                );
                              }
                              return (
                                <a
                                  href={wr.proof_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                                >
                                  <ExternalLink size={16} />
                                  Link
                                </a>
                              );
                            })()}
                          </td>
                          <td className="px-4 py-3 font-semibold">{voteYes}% Yes</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusMeta.badgeClass}`}>
                              {statusMeta.label}
                            </span>
                            <p className="mt-1 text-xs text-gray-500">{statusMeta.note}</p>
                          </td>
                        </tr>

                        {isVotingActive(wr) && (
                          <tr className="border-t border-gray-100 bg-gray-50/50">
                            <td colSpan={5} className="px-4 py-4">
                              <div className="space-y-2 text-sm">
                                <p className="inline-flex items-center gap-1 font-semibold text-orange-500">
                                  <Clock3 size={14} />
                                  Time Left: {formatCountdown(wr.voting_deadline)}
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

                                <div className="pt-1">
                                  {!address ? (
                                    <button
                                      type="button"
                                      onClick={connectWallet}
                                      className="rounded-md border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100"
                                    >
                                      Connect wallet to vote
                                    </button>
                                  ) : (
                                    <div className="flex flex-wrap items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleVote(wr.id, true)}
                                        disabled={disableVoteButtons}
                                        className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                                      >
                                        {voteSubmittingId === wr.id ? 'Submitting...' : 'Vote Yes'}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleVote(wr.id, false)}
                                        disabled={disableVoteButtons}
                                        className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                                      >
                                        {voteSubmittingId === wr.id ? 'Submitting...' : 'Vote No'}
                                      </button>
                                    </div>
                                  )}

                                  {address && !voteKnown && (
                                    <p className="mt-1 text-xs text-gray-500">Checking your vote status...</p>
                                  )}

                                  {address && voteStatusErrorByRequest[wr.id] && (
                                    <p className="mt-1 text-xs text-amber-600">
                                      {voteStatusErrorByRequest[wr.id]} You can still vote, backend will enforce one-vote rule.
                                    </p>
                                  )}

                                  {address && voteKnown && hasVoted && (
                                    <p className="mt-1 text-xs text-amber-600">
                                      You already voted{voteStatus.voteChoice ? `: ${voteStatus.voteChoice}` : ''}
                                    </p>
                                  )}

                                  {walletError && !address && (
                                    <p className="mt-1 text-xs text-red-500">{walletError}</p>
                                  )}

                                  {voteState?.message && (
                                    <p
                                      className={`mt-1 text-xs ${
                                        voteState.type === 'error'
                                          ? 'text-red-500'
                                          : voteState.type === 'success'
                                            ? 'text-green-600'
                                            : 'text-gray-500'
                                      }`}
                                    >
                                      {voteState.message}
                                    </p>
                                  )}
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

        {/* On-chain Transaction History (DB-03) */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-3xl/none font-bold text-gray-900">On-chain Transaction History</h2>
            <p className="mt-1 text-sm text-gray-500">
              Mọi giao dịch quyên góp (Donation) và giải ngân (Disbursement) ghi nhận on-chain cho chiến dịch này.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Amount ({tokenSymbol})</th>
                  <th className="px-4 py-3 font-semibold">From → To</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Tx Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactionsLoading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                      Loading transactions...
                    </td>
                  </tr>
                ) : transactionsError ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-red-500">
                      {transactionsError}
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                      Chưa có giao dịch on-chain nào cho chiến dịch này.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => {
                    const isDonation = (tx.type || '').toLowerCase() === 'donation'
                    const shortAddr = (a) => (a ? `${a.slice(0, 6)}...${a.slice(-4)}` : '-')
                    return (
                      <tr key={tx.id} className="border-t border-gray-100 text-gray-700">
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                              isDonation
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-sky-100 text-sky-700'
                            }`}
                          >
                            {isDonation ? 'Donation' : 'Disbursement'}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold">{formatTokenAmount(tx.amount)}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">
                          {shortAddr(tx.from_address)} → {shortAddr(tx.to_address)}
                        </td>
                        <td className="px-4 py-3">
                          {new Date(tx.created_at).toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3">
                          {tx.tx_hash ? (
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://sepolia.etherscan.io/tx/${tx.tx_hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-semibold text-sky-500 font-mono text-xs"
                                title={tx.tx_hash}
                              >
                                {tx.tx_hash.slice(0, 10)}...{tx.tx_hash.slice(-8)}
                                <ExternalLink size={14} />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopyTxHash(tx.tx_hash, `tx-${tx.id}`)}
                                className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600"
                              >
                                <Copy size={12} />
                                {copiedTxId === `tx-${tx.id}` ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
