import { Link } from 'react-router-dom'
import ROUTES from '@/constants/routes'

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Register Page</h1>
        <p className="text-gray-600 mb-6">Coming soon...</p>
        <Link
          to={ROUTES.LOGIN}
          className="text-secondary font-semibold hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}
