import api from './api'

const analyticsService = {
  async getOverview() {
    const { data } = await api.get('/admin/analytics/overview')
    return data
  },

  async getCampaignsBreakdown() {
    const { data } = await api.get('/admin/analytics/campaigns')
    return data
  },

  async getWithdrawalsBreakdown() {
    const { data } = await api.get('/admin/analytics/withdrawals')
    return data
  },

  async getDonationsTimeline(days = 30) {
    const { data } = await api.get('/admin/analytics/donations/timeline', {
      params: { days },
    })
    return data
  },
}

export default analyticsService
