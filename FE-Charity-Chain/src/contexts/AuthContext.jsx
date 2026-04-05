import { createContext, useContext, useState, useEffect } from 'react'
import authService from '@/services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      authService
        .getProfile()
        .then((res) => {
          if (res.success) {
            setUser(res.data)
          }
        })
        .catch(() => {
          localStorage.removeItem('access_token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  // Lắng nghe token hết hạn (401) → xoá user state
  // ProtectedRoute sẽ redirect các trang cần auth, trang public (vote) vẫn hoạt động
  useEffect(() => {
    const handleExpired = () => setUser(null)
    window.addEventListener('auth:expired', handleExpired)
    return () => window.removeEventListener('auth:expired', handleExpired)
  }, [])

  const login = async (email, password) => {
    const res = await authService.login(email, password)
    if (res.success && res.data?.access_token) {
      const profileRes = await authService.getProfile()
      if (profileRes.success) {
        setUser(profileRes.data)
      }
    }
    return res
  }

  const register = async (email, password, fullName) => {
    const res = await authService.register(email, password, fullName)
    return res
  }

  const updateWallet = async (walletAddress) => {
    const res = await authService.updateWallet(walletAddress)
    if (res.success) {
      setUser(res.data)
    }
    return res
  }

  const logout = () => {
    setUser(null)
    authService.logout()
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateWallet,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
