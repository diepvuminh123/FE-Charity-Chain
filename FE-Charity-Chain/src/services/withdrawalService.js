import api from './api'

const withdrawalService = {
  async getWithdrawals(campaignId) {
    const { data } = await api.get(`/campaigns/${campaignId}/withdrawal-requests`)
    return data
  },

  async getWithdrawalById(id) {
    const { data } = await api.get(`/withdrawal-requests/${id}`)
    return data
  },

  async createWithdrawal(campaignId, withdrawalData) {
    const { data } = await api.post(
      `/org/campaigns/${campaignId}/withdrawal-requests`,
      withdrawalData
    )
    return data
  },

  async getVotes(requestId) {
    const { data } = await api.get(`/withdrawal-requests/${requestId}/votes`)
    return data
  },

  async castVote(requestId, isApproved) {
    const { data } = await api.post(`/withdrawal-requests/${requestId}/votes`, {
      is_approved: isApproved,
    })
    return data
  },
}

export default withdrawalService
