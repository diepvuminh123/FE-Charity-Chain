import api from './api'

const campaignService = {
  async getCampaigns(page = 1, limit = 10) {
    const { data } = await api.get('/campaigns', {
      params: { page, limit },
    })
    return data
  },

  async getCampaignById(id) {
    const { data } = await api.get(`/campaigns/${id}`)
    return data
  },

  async createCampaign(campaignData) {
    const { data } = await api.post('/org/campaigns', campaignData)
    return data
  },
}

export default campaignService
