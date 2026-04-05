import { Link } from 'react-router-dom'
import { ShieldCheck, FileText, Users, ArrowRight, CheckCircle2, Building2 } from 'lucide-react'
import ROUTES from '@/constants/routes'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Blockchain-Verified Funds',
    description:
      'Every token in your campaign is tracked on-chain. Donors and the public can verify balances at any time — no black box.',
  },
  {
    icon: Users,
    title: 'Community Governance',
    description:
      'Withdrawal requests go through a community vote. Only approved requests unlock disbursement, keeping your org accountable.',
  },
  {
    icon: FileText,
    title: 'Evidence-Based Spending',
    description:
      'Upload proof files (images, PDFs) for every withdrawal. Donors see exactly what the money was used for.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Register Your Organization',
    description:
      'Complete the 5-step registration: org details, contact person, verification documents, wallet address, and transparency agreement.',
  },
  {
    step: '02',
    title: 'Create a Campaign',
    description:
      'Set up a fundraising campaign with a goal amount, timeline, and description. Campaign funds are pre-loaded via smart contract.',
  },
  {
    step: '03',
    title: 'Submit Withdrawal Requests',
    description:
      'When you need funds, submit a withdrawal request with the amount, reason, and proof documents.',
  },
  {
    step: '04',
    title: 'Community Votes & Funds Released',
    description:
      'The community votes on your request. If approved, the smart contract automatically transfers tokens to your wallet.',
  },
]

const requirements = [
  'Valid organization registration number',
  'Designated contact person with verifiable identity',
  'Ethereum-compatible wallet address (MetaMask recommended)',
  'Signed transparency agreement',
  'Supporting documents (certificates, activity proof)',
]

export default function Organizations() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-secondary py-16">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white mb-5">
            <Building2 size={15} />
            For Charity Organizations
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Manage Your Charity Funds<br />with Full Transparency
          </h1>
          <p className="text-sky-100 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            HCMUT Giving gives charity organizations a blockchain-powered platform to raise funds,
            prove spending, and earn lasting trust from donors and the public.
          </p>
          <Link
            to={ROUTES.REGISTER_ORGANIZATION}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-secondary hover:bg-sky-50 transition-colors shadow"
          >
            Register Your Organization
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Why Join HCMUT Giving?</h2>
            <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
              Build trust with your donors through radical transparency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50">
                  <Icon size={22} className="text-secondary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for orgs */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">How It Works for Organizations</h2>
            <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
              From registration to receiving funds — a clear, step-by-step process.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="relative rounded-xl border border-gray-200 bg-gray-50 p-6">
                <span className="text-4xl font-extrabold text-gray-100 absolute top-4 right-4 leading-none select-none">
                  {step}
                </span>
                <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">{step}</p>
                <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-14">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Registration Requirements</h2>
            <p className="text-sm text-gray-500 mb-6">
              Ensure you have these ready before starting the registration process.
            </p>
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={17} className="text-success shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <Link
                to={ROUTES.REGISTER_ORGANIZATION}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-colors"
              >
                Start Registration
                <ArrowRight size={15} />
              </Link>
              <Link
                to={ROUTES.CAMPAIGNS}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Browse Campaigns
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
