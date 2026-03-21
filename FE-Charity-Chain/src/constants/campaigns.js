import campaignCard from '@/assets/images/CampaignCard.png'
import campaignCard1 from '@/assets/images/CampaignCard 1.png'
import campaignCard2 from '@/assets/images/CampaignCard 2.png'

export const CAMPAIGNS = [
  {
    id: 1,
    title: 'Build Schools in Rural Areas',
    description: 'Support construction and upgrade of educational facilities in mountainous regions,',
    detailDescription: 'Support construction and upgrade of educational facilities in central provinces.',
    goal: 250000000,
    currentBalance: 162500000,
    status: 'Active',
    tokenAddress: '0x7fa3...f4a7',
    image: campaignCard,
  },
  {
    id: 2,
    title: 'Free Healthcare Support',
    description: 'Provide free medical examinations and medications for underprivileged patients in',
    detailDescription: 'Provide free medical examinations and medications for underprivileged patients in central provinces.',
    goal: 375000000,
    currentBalance: 318750000,
    status: 'Active',
    tokenAddress: '0x7bc3...c7b6',
    image: campaignCard1,
  },
  {
    id: 3,
    title: 'Meals for the Homeless',
    description: 'Provide daily free meals for homeless people and those in poverty in major cities.',
    detailDescription: 'Provide daily free meals for homeless people and those in poverty in major cities.',
    goal: 200000000,
    currentBalance: 130000000,
    status: 'Active',
    tokenAddress: '0x9ab2...e2b4',
    image: campaignCard2,
  },
]

export const WITHDRAWAL_REQUESTS = [
  {
    id: 1,
    requestId: 'Request #1',
    amount: 100000000,
    evidenceLabel: 'View Evidence',
    voteYes: 70,
    status: 'Voting',
    action: 'Vote',
    hasLiveVote: true,
  },
  {
    id: 2,
    requestId: 'Request #2',
    amount: 50000000,
    evidenceLabel: 'View Evidence',
    voteYes: 85,
    status: 'Approved',
  },
  {
    id: 3,
    requestId: 'Request #3',
    amount: 75000000,
    evidenceLabel: 'View Evidence',
    voteYes: 35,
    status: 'Rejected',
  },
]

export const DISBURSEMENTS = [
  {
    id: 'DIS-01',
    amount: 100000000,
    date: '12 Mar 2026',
    txHash: '0x7fa3...f4a7',
  },
  {
    id: 'DIS-02',
    amount: 50000000,
    date: '08 Mar 2026',
    txHash: '0x9ab2...e2b4',
  },
]
