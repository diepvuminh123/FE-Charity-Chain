import api from './api'

const transactionService = {
  async getByCampaign(campaignId, page = 1, limit = 20) {
    const { data } = await api.get(`/campaigns/${campaignId}/transactions`, {
      params: { page, limit },
    })
    return data
  },
}

export default transactionService
