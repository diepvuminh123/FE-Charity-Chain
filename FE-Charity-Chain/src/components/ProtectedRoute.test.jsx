import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

const mockedUseAuth = vi.mocked(useAuth)

function renderProtectedRoute(authValue) {
  mockedUseAuth.mockReturnValue(authValue)

  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute allowedRoles={[0, 2]}>
              <div>Admin Page</div>
            </ProtectedRoute>
          )}
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects unauthenticated users to login', () => {
    renderProtectedRoute({
      user: null,
      loading: false,
      isAuthenticated: false,
    })

    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  it('redirects authenticated users without allowed role to home', () => {
    renderProtectedRoute({
      user: { role: 1 },
      loading: false,
      isAuthenticated: true,
    })

    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })

  it('renders children for authenticated users with allowed role', () => {
    renderProtectedRoute({
      user: { role: 2 },
      loading: false,
      isAuthenticated: true,
    })

    expect(screen.getByText('Admin Page')).toBeInTheDocument()
  })

  it('shows loading state while auth is loading', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      loading: true,
      isAuthenticated: false,
    })

    const { container } = render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route
            path="/admin"
            element={(
              <ProtectedRoute allowedRoles={[0, 2]}>
                <div>Admin Page</div>
              </ProtectedRoute>
            )}
          />
        </Routes>
      </MemoryRouter>
    )

    expect(container.querySelector('.animate-spin')).toBeTruthy()
  })
})
