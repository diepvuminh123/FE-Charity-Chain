import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Button from '@/components/ui/Button'
import ROUTES from '@/constants/routes'
import loginImg from '@/assets/images/Login- img1.png'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/admin'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await login(formData.email, formData.password)
      if (res.status_code) {
        navigate(from, { replace: true })
      } else {
        setError(res.message || 'Login failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-5xl bg-white border-4 rounded-2xl shadow-xl overflow-hidden" style={{ borderColor: '#8E8E93' }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Illustration */}
          <div className="relative bg-gradient-to-br from-sky-50 to-white p-8 md:p-12 flex flex-col justify-center items-center">
            {/* Brand Header */}
            <div className="absolute top-8 left-8">
              <h1 className="text-2xl font-extrabold text-secondary tracking-tight mb-1">
                HCMUT Giving
              </h1>
              <p className="text-sm text-gray-900 font-normal">
                Transparency for Every Heart
              </p>
            </div>

            {/* Illustration */}
            <div className="mt-16 md:mt-0">
              <img
                src={loginImg}
                alt="Donation Illustration"
                className="w-full max-w-sm mx-auto drop-shadow-lg"
              />
            </div>

            {/* Decorative dots pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
              <div className="absolute top-12 left-12 grid grid-cols-8 gap-3">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-secondary rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Organization Login
              </h2>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all duration-200"
                    placeholder=""
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all duration-200"
                    placeholder=""
                    required
                  />
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full !bg-success hover:!bg-green-600 mt-6"
                  size="md"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log in'}
                </Button>
              </form>

              {/* Register Link */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{' '}
                <Link
                  to={ROUTES.REGISTER_ORGANIZATION}
                  className="text-secondary font-semibold hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
