import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CampaignDetail from './index'
import campaignService from '@/services/campaignService'
import withdrawalService from '@/services/withdrawalService'
import useWallet from '@/hooks/useWallet'

vi.mock('@/services/campaignService', () => ({
  default: {
    getCampaignById: vi.fn(),
  },
}))

vi.mock('@/services/withdrawalService', () => ({
  default: {
    getVotes: vi.fn(),
    castVote: vi.fn(),
  },
}))

vi.mock('@/hooks/useWallet', () => ({
  default: vi.fn(),
}))

const mockedCampaignService = vi.mocked(campaignService)
const mockedWithdrawalService = vi.mocked(withdrawalService)
const mockedUseWallet = vi.mocked(useWallet)

function makeCampaign() {
  return {
    id: 1,
    title: 'Test Campaign',
    short_description: 'Campaign description',
    goal_amount: 1000,
    current_amount: 500,
    token_symbol: 'USDT',
    withdrawals: [
      {
        id: 11,
        amount: 100,
        status: 'voting',
        yes_votes: 0,
        no_votes: 0,
        voting_deadline: '2099-12-31T23:59:59.000Z',
      },
    ],
  }
}

function renderCampaignDetail() {
  render(
    <MemoryRouter initialEntries={['/campaigns/1']}>
      <Routes>
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('CampaignDetail voting flow states', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedCampaignService.getCampaignById.mockResolvedValue({
      status_code: true,
      data: makeCampaign(),
    })
    mockedWithdrawalService.castVote.mockResolvedValue({ status_code: true })
  })

  it('shows connect wallet CTA and hides vote buttons for guests', async () => {
    mockedUseWallet.mockReturnValue({
      address: '',
      connectWallet: vi.fn(),
      error: '',
    })

    renderCampaignDetail()

    expect(await screen.findByText('Withdrawal Requests')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Connect wallet to vote' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Vote Yes' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Vote No' })).not.toBeInTheDocument()
  })

  it('enables voting buttons when wallet connected and no previous vote', async () => {
    mockedUseWallet.mockReturnValue({
      address: '0xabc',
      connectWallet: vi.fn(),
      error: '',
    })
    mockedWithdrawalService.getVotes.mockResolvedValue({ data: [{ wallet_address: '0xdef', is_approved: true }] })

    renderCampaignDetail()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Vote Yes' })).toBeEnabled()
      expect(screen.getByRole('button', { name: 'Vote No' })).toBeEnabled()
    })
  })

  it('disables vote buttons and shows already-voted message when user has voted', async () => {
    mockedUseWallet.mockReturnValue({
      address: '0xabc',
      connectWallet: vi.fn(),
      error: '',
    })
    mockedWithdrawalService.getVotes.mockResolvedValue({
      data: [{ wallet_address: '0xabc', is_approved: false }],
    })

    renderCampaignDetail()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Vote Yes' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Vote No' })).toBeDisabled()
    })

    expect(await screen.findByText(/You already voted/i)).toBeInTheDocument()
  })

  it('shows submitting and success states after a vote', async () => {
    mockedUseWallet.mockReturnValue({
      address: '0xabc',
      connectWallet: vi.fn(),
      error: '',
    })
    mockedWithdrawalService.getVotes.mockResolvedValue({ data: [] })

    renderCampaignDetail()

    const user = userEvent.setup()
    const voteYesButton = await screen.findByRole('button', { name: 'Vote Yes' })
    await user.click(voteYesButton)

    expect(await screen.findByText('Vote submitted: Yes')).toBeInTheDocument()
    expect(mockedWithdrawalService.castVote).toHaveBeenCalledWith(11, true)
  })
})
