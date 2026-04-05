import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import ROUTES from '@/constants/routes'
import authService from '@/services/authService'

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      const res = await authService.register(
        formData.email,
        formData.password,
        formData.full_name
      )
      if (res.success) {
        navigate(ROUTES.LOGIN, {
          state: { message: 'Registration successful! Please log in.' },
        })
      } else {
        setError(res.message || 'Registration failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Register as a voter to participate in campaigns
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              required
              minLength={8}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              required
              minLength={8}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full !bg-success hover:!bg-green-600 mt-2"
            size="md"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-secondary font-semibold hover:underline">
            Log in
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">
          Want to register as an organization?{' '}
          <Link to={ROUTES.REGISTER_ORGANIZATION} className="text-secondary font-semibold hover:underline">
            Register Organization
          </Link>
        </p>
      </div>
    </div>
  )
}
