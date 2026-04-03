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
    const isFormData = typeof FormData !== 'undefined' && withdrawalData instanceof FormData
    const config = isFormData
      ? {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      : undefined

    const { data } = await api.post(
      `/org/campaigns/${campaignId}/withdrawal-requests`,
      withdrawalData,
      config
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
