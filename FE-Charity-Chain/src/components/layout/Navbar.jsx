import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Heart } from 'lucide-react'
import { NAV_LINKS } from '@/constants'
import Button from '@/components/ui/Button'
import useWallet from '@/hooks/useWallet'

function shortenAddress(address) {
  if (!address) {
    return ''
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { address, error, connectWallet } = useWallet()

  const connectedAddress = shortenAddress(address)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <Heart className="text-secondary fill-secondary" size={22} />
          <div className="leading-tight">
            <span className="block text-xl font-extrabold text-secondary tracking-tight">
              HCMUT Giving
            </span>
            <span className="block text-[10px] text-gray-500 font-medium tracking-wide -mt-0.5">
              Transparency for Every Heart
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-150 ${
                  isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {address && (
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              {connectedAddress}
            </div>
          )}
          <Button size="sm" onClick={connectWallet}>Connect Test Wallet</Button>
          <Link to="/login">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          <nav className="flex flex-col gap-3 pt-3">
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium py-1 ${
                    isActive ? 'text-primary' : 'text-gray-600'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-2 mt-2">
              {address && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 text-center">
                  {connectedAddress}
                </div>
              )}
              <Button size="sm" className="w-full" onClick={connectWallet}>
                Connect Test Wallet
              </Button>
              <Link to="/login">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
              </Link>
              {error && (
                <p className="text-xs text-red-600 text-center px-2">{error}</p>
              )}
            </div>
          </nav>
        </div>
      )}

      {!mobileOpen && error && (
        <div className="border-t border-red-100 bg-red-50 px-4 py-2 text-center text-xs text-red-600">
          {error}
        </div>
      )}
    </header>
  )
}
