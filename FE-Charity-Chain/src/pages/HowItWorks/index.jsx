import { Link } from 'react-router-dom'
import {
  Wallet,
  ClipboardList,
  Vote,
  Coins,
  Eye,
  Lock,
  Zap,
  ArrowRight,
} from 'lucide-react'
import ROUTES from '@/constants/routes'

const flow = [
  {
    icon: ClipboardList,
    color: 'bg-orange-50 text-primary',
    title: 'Charity Creates a Withdrawal Request',
    description:
      'A registered charity organization submits a withdrawal request with the token amount, reason, and proof documents (images or PDFs). The request is immediately set to "Voting" status.',
  },
  {
    icon: Wallet,
    color: 'bg-sky-50 text-secondary',
    title: 'Community Connects Wallet & Votes',
    description:
      'Any community member connects their MetaMask wallet and votes Yes or No. Each wallet address gets exactly one vote per request. No account needed — your wallet is your identity.',
  },
  {
    icon: Vote,
    color: 'bg-purple-50 text-purple-600',
    title: 'Votes Are Tallied in Real Time',
    description:
      'A live progress bar shows the Yes/No ratio. A countdown timer shows how much time is left for voting. Anyone — including guests — can observe the vote results.',
  },
  {
    icon: Coins,
    color: 'bg-green-50 text-success',
    title: 'Smart Contract Finalizes & Disburses',
    description:
      'When voting closes, the smart contract automatically tallies results. If Yes > No, the status changes to Approved and tokens transfer directly to the charity wallet. If rejected, the funds remain safe.',
  },
]

const principles = [
  {
    icon: Eye,
    title: 'Full Transparency',
    description:
      'Every vote, every transaction, every withdrawal request is publicly visible. Nothing is hidden — the blockchain is the source of truth.',
  },
  {
    icon: Lock,
    title: 'Tamper-Proof Results',
    description:
      'Vote results are enforced by smart contracts, not by any individual or organization. No admin can override a community decision.',
  },
  {
    icon: Zap,
    title: 'Zero Gas for Voting',
    description:
      'Voting is recorded off-chain in our database, so you pay no gas fees to cast your vote. Gas is only spent at the two highest-value moments: finalizing votes and transferring tokens.',
  },
]

const roles = [
  {
    label: 'GUEST',
    color: 'text-gray-500 border-gray-300',
    actions: ['View all campaigns', 'See withdrawal requests', 'View vote progress', 'Check evidence files', 'Click TxHash → Etherscan'],
  },
  {
    label: 'VOTER',
    color: 'text-secondary border-secondary',
    actions: ['Everything a Guest can do', 'Connect MetaMask wallet', 'Vote Yes or No', 'See your vote history'],
  },
  {
    label: 'CHARITY ORG',
    color: 'text-success border-success',
    actions: ['Everything a Voter can do', 'Create campaigns', 'Submit withdrawal requests', 'Upload spending evidence'],
  },
  {
    label: 'ADMIN',
    color: 'text-primary border-primary',
    actions: ['Everything above', 'Configure token address', 'Manage smart contracts', 'Trigger finalization'],
  },
]

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gray-900 py-16 text-center">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            How HCMUT Giving Works
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            A blockchain-powered platform where the community governs every disbursement.
            No black boxes. No single point of trust.
          </p>
        </div>
      </section>

      {/* Flow */}
      <section className="py-14">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">The Disbursement Flow</h2>
            <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
              Every withdrawal goes through this 4-step process — no exceptions.
            </p>
          </div>
          <div className="relative">
            {/* Connector line desktop */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gray-200 z-0 mx-32" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {flow.map(({ icon: Icon, color, title, description }, i) => (
                <div key={title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                    <Icon size={22} />
                  </div>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Step {i + 1}</p>
                  <h3 className="font-bold text-gray-900 text-sm mb-3 leading-snug">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Core Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center px-4">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <Icon size={24} className="text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-14">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Who Does What</h2>
            <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
              The platform has four roles, each with different capabilities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map(({ label, color, actions }) => (
              <div key={label} className={`rounded-xl border-2 bg-white p-6 shadow-sm ${color.split(' ')[1]}`}>
                <span className={`text-xs font-bold tracking-widest uppercase ${color.split(' ')[0]}`}>{label}</span>
                <ul className="mt-4 space-y-2">
                  {actions.map((a) => (
                    <li key={a} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-14 text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to get started?</h2>
          <p className="text-sky-100 text-sm max-w-md mx-auto mb-8">
            Explore active campaigns and participate in community governance — no account needed to view.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={ROUTES.CAMPAIGNS}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-secondary hover:bg-sky-50 transition-colors shadow"
            >
              Browse Campaigns
              <ArrowRight size={15} />
            </Link>
            <Link
              to={ROUTES.REGISTER_ORGANIZATION}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-7 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              Register Your Org
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
