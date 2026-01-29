interface Example {
  example: string
  detail: string
}

interface AlreadyHappeningProps {
  examples: Example[]
}

export default function AlreadyHappening({ examples }: AlreadyHappeningProps) {
  if (!examples || examples.length === 0) return null

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
        Already Happening in the Real World
      </h3>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="space-y-3">
          {examples.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-slate-800">{item.example}</span>
                <p className="text-sm text-slate-600 mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
