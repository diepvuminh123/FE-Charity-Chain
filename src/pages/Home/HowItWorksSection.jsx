import { HOW_IT_WORKS_STEPS } from '@/constants'
import StepCard from '@/components/ui/StepCard'

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="section-title text-primary">How It Works</h2>
          <p className="mt-2 text-gray-500 text-sm max-w-xl mx-auto">
            A transparent and controlled process for managing charity funds.
          </p>
        </div>

        {/* 4-column cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <StepCard key={step.id} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}
