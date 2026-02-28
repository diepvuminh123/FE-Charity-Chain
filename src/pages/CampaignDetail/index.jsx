import { useState } from 'react'
import { MapPin, ChevronRight } from 'lucide-react'
import heroImage from '../../assets/images/Image 5.jpg'

export default function CampaignDetail() {
  const [donationType, setDonationType] = useState('once')
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')

  const raised = 119680000
  const goal = 150000000
  const percentage = (raised / goal) * 100
  const donations = 1234
  const toGo = goal - raised

  const donationOptions = [
    { amount: 20000, description: 'Bread for 15 families per day' },
    { amount: 20000, description: 'Bread for 15 families per day' },
    { amount: 20000, description: 'Bread for 15 families per day' },
    { amount: 20000, description: 'Bread for 15 families per day' },
    { amount: 20000, description: 'Bread for 15 families per day' },
    { amount: 20000, description: 'Bread for 15 families per day' },
    { amount: 20000, description: 'Bread for 15 families per day' },
  ]

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            HCMUT Giving Education Fund
          </h1>
          <p className="text-sm text-gray-600">
            by <span className="text-blue-500 font-medium">Ho Chi Minh University of Technology</span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
              <img
                src={heroImage}
                alt="HCMUT Giving Education Fund"
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square rounded overflow-hidden cursor-pointer hover:opacity-80 transition">
                  <img
                    src={heroImage}
                    alt={`Thumbnail ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Donation Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Fundraising Stats */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <span className="text-3xl font-bold text-green-500">
                    {formatNumber(raised)}
                  </span>
                  <span className="text-gray-600 ml-2">
                    raised of {formatNumber(goal)} goal
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatNumber(donations)} donations</span>
                <span>{formatNumber(toGo)} to go</span>
              </div>
            </div>

            {/* Donate Now Button */}
            <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg mb-4 transition">
              DONATE NOW
            </button>

            {/* Donation Type Toggle */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setDonationType('once')}
                className={`py-2 px-4 rounded-lg border-2 transition ${
                  donationType === 'once'
                    ? 'border-orange-400 bg-orange-50 text-orange-600 font-medium'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                Donate Once
              </button>
              <button
                onClick={() => setDonationType('monthly')}
                className={`py-2 px-4 rounded-lg border-2 transition ${
                  donationType === 'monthly'
                    ? 'border-orange-400 bg-orange-50 text-orange-600 font-medium'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                Donate Monthly
              </button>
            </div>

            {/* Donation Options */}
            <div className="space-y-3 mb-4">
              {donationOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAmount(option.amount)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition ${
                    selectedAmount === option.amount
                      ? 'border-orange-400 bg-orange-50'
                      : 'border-gray-200 bg-gray-50 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <div className="font-bold text-orange-500">
                        {formatNumber(option.amount)}
                      </div>
                      <div className="text-xs text-gray-500">VND</div>
                    </div>
                    <div className="text-sm text-gray-700">
                      {option.description}
                    </div>
                  </div>
                  <ChevronRight className="text-orange-400" size={20} />
                </button>
              ))}

              {/* Custom Amount */}
              <div className="flex items-center gap-2 p-4 rounded-lg border border-gray-200 bg-gray-50">
                <input
                  type="text"
                  placeholder="Other amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-700"
                />
                <button className="bg-orange-400 hover:bg-orange-500 text-white p-2 rounded-lg transition">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
