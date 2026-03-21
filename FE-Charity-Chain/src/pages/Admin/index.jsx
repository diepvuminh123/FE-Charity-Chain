import { TrendingUp, FolderKanban, Users, ArrowRight, UsersRound, Bell } from 'lucide-react'

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
    name: 'Clean Water Initiative',
    description: 'Providing clean water access to rural communities',
    raised: 150000000,
    goal: 250000000,
    donors: 234,
    status: 'Active',
  },
  {
    name: 'Education for All',
    description: 'Building schools and providing educational materials',
    raised: 85000000,
    goal: 150000000,
    donors: 156,
    status: 'Active',
  },
  {
    name: 'Medical Relief Fund',
    description: 'Emergency medical supplies for disaster-affected areas',
    raised: 220000000,
    goal: 200000000,
    donors: 412,
    status: 'Completed',
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

export default function Admin() {
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
                <article key={campaign.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
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

                  <button type="button" className="mt-4 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                    View Details
                    <ArrowRight size={16} />
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </section>
  )
}
