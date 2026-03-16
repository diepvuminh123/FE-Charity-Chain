import ROUTES from './routes'

export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Campaigns', path: ROUTES.CAMPAIGNS },
  { label: 'Organizations', path: ROUTES.ORGANIZATIONS },
  { label: 'How It Works', path: ROUTES.HOW_IT_WORKS },
  { label: 'About', path: ROUTES.ABOUT },
]

export const HOW_IT_WORKS_STEPS = [
  {
    id: 'donors',
    role: 'DONORS',
    color: 'text-primary',
    borderColor: 'border-primary',
    description:
      'Your kindness becomes real change. Donate to causes you believe in and follow every step of how your money creates impact.',
  },
  {
    id: 'organizations',
    role: 'ORGANIZATIONS',
    color: 'text-success',
    borderColor: 'border-success',
    description:
      'Turn your mission into action. Receive donated funds and request spending with clear purpose and real evidence.',
  },
  {
    id: 'hcmut',
    role: 'HCMUT Giving',
    color: 'text-secondary',
    borderColor: 'border-secondary',
    description:
      'Protect trust in the system. Carefully review each request and vote to ensure funds are used responsibly.',
  },
  {
    id: 'transparency',
    role: 'TRANSPARENCY',
    color: 'text-primary',
    borderColor: 'border-primary',
    description:
      'Nothing hidden. Nothing lost. Every donation, vote, and transaction is permanently visible on the blockchain.',
  },
]
