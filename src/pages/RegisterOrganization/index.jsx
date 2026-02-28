import { useState } from 'react'
import StepProgress from '../../components/ui/StepProgress'

// Step 1: Organization Information
function OrganizationInfoStep({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization Name
          </label>
          <input
            type="text"
            value={formData.organizationName || ''}
            onChange={(e) => onChange('organizationName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization Type
          </label>
          <input
            type="text"
            value={formData.organizationType || ''}
            onChange={(e) => onChange('organizationType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Number
            </label>
            <input
              type="text"
              value={formData.registrationNumber || ''}
              onChange={(e) => onChange('registrationNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Founded Year
            </label>
            <input
              type="text"
              value={formData.foundedYear || ''}
              onChange={(e) => onChange('foundedYear', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operating Area
          </label>
          <input
            type="text"
            value={formData.operatingArea || ''}
            onChange={(e) => onChange('operatingArea', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mission Statement
          </label>
          <input
            type="text"
            value={formData.missionStatement || ''}
            onChange={(e) => onChange('missionStatement', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website / Facebook Page
          </label>
          <input
            type="text"
            value={formData.website || ''}
            onChange={(e) => onChange('website', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}

// Step 2: Contact Person
function ContactPersonStep({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full name
        </label>
        <input
          type="text"
          value={formData.contactName || ''}
          onChange={(e) => onChange('contactName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Role / Position
        </label>
        <input
          type="text"
          value={formData.contactRole || ''}
          onChange={(e) => onChange('contactRole', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.contactPhone || ''}
          onChange={(e) => onChange('contactPhone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={formData.contactEmail || ''}
          onChange={(e) => onChange('contactEmail', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <p className="text-xs text-gray-600 mt-4">
        All approval and financial notifications will be sent to this email. Please use an official and active email address.
      </p>
    </div>
  )
}

// Step 3: Verification Documents
function VerificationDocumentsStep({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Organization Certificate
        </label>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
            Choose file
          </button>
          <span className="text-gray-500 text-sm self-center">
            {formData.orgCertificate || 'No file choosen'}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ID of Contact Person
        </label>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
            Choose file
          </button>
          <span className="text-gray-500 text-sm self-center">
            {formData.contactId || 'No file choosen'}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Previous Activity Proof
        </label>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
            Choose file
          </button>
          <span className="text-gray-500 text-sm self-center">
            {formData.activityProof || 'No file choosen'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Step 4: Wallet Address
function WalletAddressStep({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <p className="text-gray-500">Wallet connection interface will be implemented here</p>
      </div>
    </div>
  )
}

// Step 5: Transparency Agreement
function TransparencyAgreementStep() {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-700 space-y-3">
        <p className="font-semibold">
          By registering on HCMUT Giving, our organization agrees to the following commitments:
        </p>
        
        <div className="space-y-2">
          <p><span className="font-semibold">1. Proper Use of Funds</span></p>
          <p className="pl-4 text-gray-600">
            All donations received will be used solely for the purposes stated in the published project or campaign.
          </p>

          <p><span className="font-semibold">2. Accurate Reporting</span></p>
          <p className="pl-4 text-gray-600">
            We commit to filing clear and truthful spending reports, including detailed breakdowns of how funds are used.
          </p>

          <p><span className="font-semibold">3. On-Chain Transparency</span></p>
          <p className="pl-4 text-gray-600">
            All financial transfers will be processed through the registered wallet address and remain publicly traceable on the blockchain.
          </p>

          <p><span className="font-semibold">4. No Misuse of Funds</span></p>
          <p className="pl-4 text-gray-600">
            We will not redirect, misappropriate, or use donated funds for personal or unrelated purposes.
          </p>

          <p><span className="font-semibold">5. Timely Updates</span></p>
          <p className="pl-4 text-gray-600">
            We commit to providing timely updates to donors regarding project progress and financial usage.
          </p>

          <p><span className="font-semibold">6. Audit Cooperation</span></p>
          <p className="pl-4 text-gray-600">
            We agree to cooperate with platform administrators in case of review, verification, or audit requests.
          </p>
        </div>

        <p className="font-semibold text-red-600 mt-4">
          Failure to comply with these commitments may result in account suspension or permanent removal from the platform.
        </p>
        <p className="font-semibold">
          By checking this box, we confirm that we understand and accept these terms.
        </p>
      </div>
    </div>
  )
}

export default function RegisterOrganization() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

  const steps = [
    { label: 'Organization Information' },
    { label: 'Contact Person' },
    { label: 'Verification Documents' },
    { label: 'Wallet Address' },
    { label: 'Transparency Agreement' },
  ]

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Register Your Organization
          </h2>
          <p className="text-gray-600">
            Create an account to receive donations, request budgets,
            <br />
            and submit transparent spending reports.
          </p>
        </div>

        {/* Progress Steps */}
        <StepProgress steps={steps} currentStep={currentStep} />

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 min-h-[400px]">
          {currentStep === 1 && (
            <OrganizationInfoStep formData={formData} onChange={handleChange} />
          )}
          {currentStep === 2 && (
            <ContactPersonStep formData={formData} onChange={handleChange} />
          )}
          {currentStep === 3 && (
            <VerificationDocumentsStep formData={formData} onChange={handleChange} />
          )}
          {currentStep === 4 && (
            <WalletAddressStep formData={formData} onChange={handleChange} />
          )}
          {currentStep === 5 && <TransparencyAgreementStep />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 pb-8">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Back
            </button>
          )}
          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
