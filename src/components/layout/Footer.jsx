import { Link } from 'react-router-dom'
import { Heart, Github, Twitter, Facebook } from 'lucide-react'
import { NAV_LINKS } from '@/constants'

const SOCIAL_LINKS = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="text-secondary fill-secondary" size={20} />
              <span className="text-white text-lg font-extrabold tracking-tight">HCMUT Giving</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A transparent blockchain-powered platform for managing charity funds with integrity.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-full bg-gray-800 hover:bg-primary transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-gray-400 hover:text-primary transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Ho Chi Minh University of Technology</li>
              <li>268 Ly Thuong Kiet, District 10</li>
              <li>Ho Chi Minh City, Vietnam</li>
              <li className="mt-2">
                <a href="mailto:support@hcmutgiving.edu.vn" className="hover:text-primary transition-colors">
                  support@hcmutgiving.edu.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} HCMUT Giving. All rights reserved. Powered by Blockchain.
        </div>
      </div>
    </footer>
  )
}
