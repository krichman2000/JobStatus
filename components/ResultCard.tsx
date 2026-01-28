interface ResultCardProps {
  years: number
  percentage: number
}

export default function ResultCard({ years, percentage }: ResultCardProps) {
  // Color coding based on percentage
  const getColorClasses = () => {
    if (percentage < 30) {
      return {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-700',
        bar: 'bg-emerald-500',
      }
    } else if (percentage < 60) {
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-700',
        bar: 'bg-amber-500',
      }
    } else {
      return {
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        text: 'text-rose-700',
        bar: 'bg-rose-500',
      }
    }
  }

  const colors = getColorClasses()

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-xl p-6 text-center`}>
      <div className="text-sm font-medium text-slate-600 mb-2">
        In {years} years
      </div>
      <div className={`text-4xl font-bold ${colors.text} mb-4`}>
        {percentage}%
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className={`${colors.bar} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-slate-500 mt-2">
        of tasks could be automated
      </div>
    </div>
  )
}
