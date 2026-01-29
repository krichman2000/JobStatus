interface AutomationRisk {
  low: number
  mid: number
  high: number
}

interface Task {
  name: string
  timePercent: number
  automationRisk: AutomationRisk | number
  aiTools?: string[]
  reason: string
}

interface OverallScore {
  low: number
  mid: number
  high: number
}

interface TaskBreakdownProps {
  tasks: Task[]
  overallScore: OverallScore | number
}

export default function TaskBreakdown({ tasks, overallScore }: TaskBreakdownProps) {
  // Helper to get mid value whether it's a range object or single number
  const getMidValue = (risk: AutomationRisk | number): number => {
    if (typeof risk === 'number') return risk
    return risk.mid
  }

  const getOverallMid = (): number => {
    if (typeof overallScore === 'number') return overallScore
    return overallScore.mid
  }

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

  const overallMid = getOverallMid()

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">
          Task-by-Task Breakdown
        </h3>
        <div className="text-sm text-slate-600">
          Overall: <span className="font-semibold">
            {typeof overallScore === 'number'
              ? `${Math.round(overallScore)}%`
              : `${Math.round(overallScore.low)}-${Math.round(overallScore.high)}%`
            }
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => {
          const midRisk = getMidValue(task.automationRisk)
          const hasRange = typeof task.automationRisk !== 'number'
          const risk = task.automationRisk as AutomationRisk

          return (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getRiskBgColor(midRisk)}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-slate-800">{task.name}</span>
                    <span className="text-xs text-slate-500">({task.timePercent}% of time)</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{task.reason}</p>

                  {/* AI Tools */}
                  {task.aiTools && task.aiTools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {task.aiTools.map((tool, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-200 text-slate-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 min-w-[120px]">
                  {/* Risk Range or Single Value */}
                  {hasRange ? (
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-700">
                        {risk.low}-{risk.high}%
                      </div>
                      <div className="text-xs text-slate-500">
                        likely: {risk.mid}%
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-slate-700">
                      {midRisk}%
                    </span>
                  )}

                  {/* Progress bar */}
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden relative">
                    {hasRange ? (
                      <>
                        {/* Range indicator */}
                        <div
                          className="absolute h-full bg-slate-300"
                          style={{
                            left: `${risk.low}%`,
                            width: `${risk.high - risk.low}%`
                          }}
                        />
                        {/* Mid point indicator */}
                        <div
                          className={`absolute h-full w-1 ${getRiskColor(risk.mid)}`}
                          style={{ left: `${risk.mid}%` }}
                        />
                      </>
                    ) : (
                      <div
                        className={`h-full ${getRiskColor(midRisk)} transition-all`}
                        style={{ width: `${midRisk}%` }}
                      />
                    )}
                  </div>

                  <span className={`text-xs ${
                    midRisk < 30 ? 'text-green-600' :
                    midRisk < 50 ? 'text-yellow-600' :
                    midRisk < 70 ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {getRiskLabel(midRisk)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Overall Summary */}
      <div className="mt-4 p-3 bg-slate-100 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Weighted Average (Overall Automation Risk)</span>
          <span className="font-semibold text-slate-800">
            {typeof overallScore === 'number'
              ? `${Math.round(overallScore)}%`
              : `${Math.round(overallScore.mid)}% (range: ${Math.round(overallScore.low)}-${Math.round(overallScore.high)}%)`
            }
          </span>
        </div>
        <div className="mt-2 w-full h-3 bg-slate-200 rounded-full overflow-hidden relative">
          {typeof overallScore !== 'number' ? (
            <>
              {/* Range indicator */}
              <div
                className="absolute h-full bg-slate-300"
                style={{
                  left: `${overallScore.low}%`,
                  width: `${overallScore.high - overallScore.low}%`
                }}
              />
              {/* Mid point */}
              <div
                className={`absolute h-full w-2 ${getRiskColor(overallScore.mid)} rounded`}
                style={{ left: `${overallScore.mid - 1}%` }}
              />
            </>
          ) : (
            <div
              className={`h-full ${getRiskColor(overallMid)} transition-all`}
              style={{ width: `${overallMid}%` }}
            />
          )}
        </div>
        {typeof overallScore !== 'number' && (
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Conservative: {Math.round(overallScore.low)}%</span>
            <span>Likely: {Math.round(overallScore.mid)}%</span>
            <span>Aggressive: {Math.round(overallScore.high)}%</span>
          </div>
        )}
      </div>
    </div>
  )
}
