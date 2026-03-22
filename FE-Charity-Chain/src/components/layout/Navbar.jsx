import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Heart, LogOut, User } from 'lucide-react'
import { NAV_LINKS } from '@/constants'
import { useAuth } from '@/contexts/AuthContext'
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
  const { user, isAuthenticated, logout } = useAuth()
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
          {/* Wallet connect */}
          {address && (
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              {connectedAddress}
            </div>
          )}
          {!address && (
            <Button size="sm" onClick={connectWallet}>Connect Wallet</Button>
          )}

          {/* Auth */}
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                <User size={16} />
                <span>{user?.full_name || user?.email}</span>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut size={14} />
                <span className="ml-1">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </>
          )}
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
              {/* Wallet connect mobile */}
              {address && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 text-center">
                  {connectedAddress}
                </div>
              )}
              {!address && (
                <Button size="sm" className="w-full" onClick={connectWallet}>
                  Connect Wallet
                </Button>
              )}

              {/* Auth mobile */}
              {isAuthenticated ? (
                <>
                  <Link to="/admin" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      <User size={14} className="mr-1" />
                      {user?.full_name || 'Dashboard'}
                    </Button>
                  </Link>
                  <Button size="sm" onClick={logout}>
                    <LogOut size={14} className="mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                  </Link>
                </>
              )}

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
