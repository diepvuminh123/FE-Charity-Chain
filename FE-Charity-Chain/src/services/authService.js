import api from './api'

const authService = {
  async login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    if (data.status_code && data.data?.access_token) {
      localStorage.setItem('access_token', data.data.access_token)
    }
    return data
  },

  async register(email, password, fullName) {
    const { data } = await api.post('/auth/register', {
      email,
      password,
      full_name: fullName,
    })
    return data
  },

  async registerOrg(orgData) {
    const { data } = await api.post('/auth/register-org', orgData)
    return data
  },

  async getProfile() {
    const { data } = await api.get('/profile')
    return data
  },

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  },

  getToken() {
    return localStorage.getItem('access_token')
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token')
  },
}

export default authService
