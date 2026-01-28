interface TimelineCardProps {
  years: number
  percentage: number
}

export default function TimelineCard({ years, percentage }: TimelineCardProps) {
  const getColors = () => {
    if (percentage < 35) {
      return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', bar: 'bg-emerald-500' }
    } else if (percentage < 65) {
      return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', bar: 'bg-amber-500' }
    } else {
      return { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', bar: 'bg-rose-500' }
    }
  }

  const colors = getColors()

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-xl p-4 text-center`}>
      <div className="text-sm font-medium text-slate-600 mb-1">
        {years} Years
      </div>
      <div className={`text-3xl font-bold ${colors.text} mb-2`}>
        {percentage}%
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5">
        <div
          className={`${colors.bar} h-1.5 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-slate-500 mt-2">
        tasks automated
      </div>
    </div>
  )
}
