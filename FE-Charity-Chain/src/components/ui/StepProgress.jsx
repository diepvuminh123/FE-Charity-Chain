export default function StepProgress({ steps, currentStep }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-8">
      {/* Steps container */}
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          const isLast = index === steps.length - 1

          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-colors ${
                    isCompleted || isActive
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                <span
                  className={`mt-2 text-xs text-center whitespace-nowrap max-w-[120px] ${
                    isActive ? 'font-semibold text-gray-800' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`w-16 md:w-24 h-1 transition-colors ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
