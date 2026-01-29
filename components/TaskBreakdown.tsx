interface Task {
  name: string
  timePercent: number
  automationRisk: number
  reason: string
}

interface TaskBreakdownProps {
  tasks: Task[]
  overallScore: number
}

export default function TaskBreakdown({ tasks, overallScore }: TaskBreakdownProps) {
  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'bg-green-500'
    if (risk < 50) return 'bg-yellow-500'
    if (risk < 70) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getRiskBgColor = (risk: number) => {
    if (risk < 30) return 'bg-green-50 border-green-200'
    if (risk < 50) return 'bg-yellow-50 border-yellow-200'
    if (risk < 70) return 'bg-orange-50 border-orange-200'
    return 'bg-red-50 border-red-200'
  }

  const getRiskLabel = (risk: number) => {
    if (risk < 30) return 'Low Risk'
    if (risk < 50) return 'Medium'
    if (risk < 70) return 'High'
    return 'Very High'
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">
          Task-by-Task Breakdown
        </h3>
        <div className="text-sm text-slate-600">
          Overall Score: <span className="font-semibold">{Math.round(overallScore)}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${getRiskBgColor(task.automationRisk)}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-slate-800">{task.name}</span>
                  <span className="text-xs text-slate-500">({task.timePercent}% of time)</span>
                </div>
                <p className="text-sm text-slate-600">{task.reason}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getRiskColor(task.automationRisk)} transition-all`}
                      style={{ width: `${task.automationRisk}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700 w-10 text-right">
                    {task.automationRisk}%
                  </span>
                </div>
                <span className={`text-xs ${
                  task.automationRisk < 30 ? 'text-green-600' :
                  task.automationRisk < 50 ? 'text-yellow-600' :
                  task.automationRisk < 70 ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {getRiskLabel(task.automationRisk)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-slate-100 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Weighted Average (Overall Automation Risk)</span>
          <span className="font-semibold text-slate-800">{Math.round(overallScore)}%</span>
        </div>
        <div className="mt-2 w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getRiskColor(overallScore)} transition-all`}
            style={{ width: `${overallScore}%` }}
          />
        </div>
      </div>
    </div>
  )
}
