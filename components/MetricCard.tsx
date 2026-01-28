interface MetricCardProps {
  title: string
  score: number
  description: string
  type: 'percentage' | 'demand'
  icon: 'routine' | 'complex' | 'market' | 'wage' | 'reskill'
}

export default function MetricCard({ title, score, description, type, icon }: MetricCardProps) {
  // Color coding based on score and type
  const getColors = () => {
    if (type === 'demand') {
      // For demand: positive is good (green), negative is concerning (red)
      if (score > 10) {
        return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', bar: 'bg-emerald-500' }
      } else if (score > -10) {
        return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', bar: 'bg-amber-500' }
      } else {
        return { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', bar: 'bg-rose-500' }
      }
    } else {
      // For percentage metrics: lower is generally better (less automation/pressure/urgency)
      if (score < 35) {
        return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', bar: 'bg-emerald-500' }
      } else if (score < 65) {
        return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', bar: 'bg-amber-500' }
      } else {
        return { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', bar: 'bg-rose-500' }
      }
    }
  }

  const colors = getColors()

  const getIcon = () => {
    switch (icon) {
      case 'routine':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        )
      case 'complex':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      case 'market':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      case 'wage':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'reskill':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
    }
  }

  const formatScore = () => {
    if (type === 'demand') {
      return `${score > 0 ? '+' : ''}${score}%`
    }
    return `${score}%`
  }

  const getBarWidth = () => {
    if (type === 'demand') {
      // Map -50 to +50 onto 0 to 100
      return Math.max(0, Math.min(100, score + 50))
    }
    return score
  }

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-xl p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={colors.text}>{getIcon()}</span>
        <h4 className="font-medium text-slate-700 text-sm">{title}</h4>
      </div>

      <div className={`text-3xl font-bold ${colors.text} mb-2`}>
        {formatScore()}
      </div>

      <div className="w-full bg-slate-200 rounded-full h-1.5 mb-3">
        <div
          className={`${colors.bar} h-1.5 rounded-full transition-all duration-500`}
          style={{ width: `${getBarWidth()}%` }}
        />
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
