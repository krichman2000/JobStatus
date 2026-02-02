import Link from 'next/link'

interface SaferAlternative {
  title: string
  slug: string | null
  reason: string
}

interface SaferAlternativesProps {
  alternatives: SaferAlternative[]
  currentJobTitle: string
}

export default function SaferAlternatives({ alternatives, currentJobTitle }: SaferAlternativesProps) {
  if (!alternatives || alternatives.length === 0) {
    return null
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-green-800 mb-2">
        Safer Career Alternatives
      </h3>
      <p className="text-green-700 text-sm mb-4">
        If you&apos;re a {currentJobTitle} looking to reduce your automation risk, consider these related careers:
      </p>
      <div className="space-y-3">
        {alternatives.map((alt, index) => (
          <div key={index} className="flex items-start gap-3 bg-white/60 rounded-lg p-3">
            <div className="flex-shrink-0 w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
            <div className="flex-grow">
              {alt.slug ? (
                <Link
                  href={`/jobs/${alt.slug}`}
                  className="font-medium text-green-800 hover:text-green-600 hover:underline"
                >
                  {alt.title}
                </Link>
              ) : (
                <span className="font-medium text-green-800">{alt.title}</span>
              )}
              <p className="text-green-600 text-sm mt-0.5">{alt.reason}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-green-600 text-xs mt-4">
        These suggestions are based on skill overlap and lower automation risk profiles.
      </p>
    </div>
  )
}
