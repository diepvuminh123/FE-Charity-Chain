/**
 * Reusable Card component for step/feature cards
 */
export default function StepCard({ role, description, color, borderColor }) {
  return (
    <div className={`flex flex-col justify-between p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[180px]`}>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      <span className={`mt-4 text-xs font-bold tracking-widest uppercase ${color}`}>
        {role}
      </span>
    </div>
  )
}
