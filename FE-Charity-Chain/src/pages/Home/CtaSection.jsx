import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function CtaSection() {
  return (
    <section className="bg-secondary py-16">
      <div className="container-custom text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Start Your Charity Project with Transparency
        </h2>
        <p className="text-sky-100 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Turn your idea into a trusted charity project using blockchain-powered budgets, voting, and public tracking.
        </p>
        <Button variant="primary" size="lg">
          Get started
          <ArrowRight size={18} />
        </Button>
      </div>
    </section>
  )
}
