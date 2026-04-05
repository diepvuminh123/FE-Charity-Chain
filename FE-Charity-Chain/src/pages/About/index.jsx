import { Link } from 'react-router-dom'
import { Heart, Shield, Globe, Code2, ArrowRight, Mail, MapPin } from 'lucide-react'
import ROUTES from '@/constants/routes'

const values = [
  {
    icon: Shield,
    title: 'Accountability',
    description:
      'Every dollar (or token) must be justified. Withdrawal requests require evidence, community approval, and are permanently recorded on-chain.',
  },
  {
    icon: Globe,
    title: 'Transparency',
    description:
      'All data — campaign balances, votes, transaction hashes — is publicly accessible. Anyone can verify the state of any campaign at any time.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description:
      'The community governs disbursements, not a central authority. Donors and the public decide whether spending is legitimate through on-chain voting.',
  },
  {
    icon: Code2,
    title: 'Open Technology',
    description:
      'Built on Ethereum smart contracts, open-source tooling, and a transparent codebase. The rules of the system are visible to everyone.',
  },
]

const tech = [
  { label: 'Frontend', value: 'React + Vite + Tailwind CSS' },
  { label: 'Backend', value: 'Go (Gin) + PostgreSQL' },
  { label: 'Blockchain', value: 'Solidity Smart Contracts on Ethereum Sepolia Testnet' },
  { label: 'File Storage', value: 'Cloudinary (evidence documents)' },
  { label: 'Token Standard', value: 'ERC-20 compatible (USDT / custom tokens)' },
  { label: 'Explorer', value: 'Etherscan Sepolia' },
]

const team = [
  { role: 'Scrum Master', name: 'Nguyễn Minh Hiếu' },
  { role: 'Frontend Developer', name: 'Khang' },
  { role: 'Backend Developer', name: 'Bảo' },
  { role: 'Blockchain Developer', name: 'Văn Hiếu' },
  { role: 'QC', name: 'Lộc' },
]

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <Heart className="text-secondary fill-secondary" size={28} />
            <span className="text-2xl font-extrabold text-secondary tracking-tight">HCMUT Giving</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Transparency for Every Heart
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            HCMUT Giving is a blockchain-powered charity management platform developed by students at
            Ho Chi Minh University of Technology. Our mission is to eliminate opacity in charitable
            fund management — ensuring every token raised reaches its intended purpose, verified by
            the community.
          </p>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-14">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-red-100 bg-red-50 p-7">
              <h2 className="text-lg font-bold text-red-700 mb-3">The Problem</h2>
              <p className="text-sm text-red-900/70 leading-relaxed">
                Traditional charity organizations operate with limited accountability. Donors have
                no reliable way to verify how their contributions are spent. Funds can be misused
                without consequence, eroding public trust in charitable giving.
              </p>
            </div>
            <div className="rounded-xl border border-green-100 bg-green-50 p-7">
              <h2 className="text-lg font-bold text-success mb-3">Our Solution</h2>
              <p className="text-sm text-green-900/70 leading-relaxed">
                By recording every campaign, withdrawal request, vote, and transaction on the
                Ethereum blockchain, we make it mathematically impossible to hide misuse. The
                community — not any single authority — approves every spending decision through
                on-chain governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Icon size={20} className="text-secondary" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-14">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Technology Stack</h2>
            <p className="mt-2 text-gray-500 text-sm">Built with modern, open-source tools.</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {tech.map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex items-start justify-between px-6 py-4 text-sm ${
                  i !== tech.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="font-semibold text-gray-700 w-36 shrink-0">{label}</span>
                <span className="text-gray-500 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">The Team</h2>
            <p className="mt-2 text-gray-500 text-sm">The Poca's Seven — HCMUT Sprint Team</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
            {team.map(({ role, name }, i) => (
              <div
                key={name}
                className={`flex items-center justify-between px-6 py-4 text-sm ${
                  i !== team.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-gray-500">{role}</span>
                <span className="font-semibold text-gray-800">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14">
        <div className="container-custom max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <MapPin size={15} className="text-gray-400" />
              <span>268 Lý Thường Kiệt, District 10, Ho Chi Minh City, Vietnam</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail size={15} className="text-gray-400" />
              <span>support@hcmutgiving.edu.vn</span>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={ROUTES.CAMPAIGNS}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-bold text-white hover:bg-primary-dark transition-colors"
            >
              Browse Campaigns
              <ArrowRight size={15} />
            </Link>
            <Link
              to={ROUTES.HOW_IT_WORKS}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-7 py-3 text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
