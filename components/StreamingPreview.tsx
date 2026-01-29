'use client'

interface Task {
  name: string
  timePercent?: number
  automationRisk?: {
    low: number
    mid: number
    high: number
  }
  reason?: string
}

interface StreamingPreviewProps {
  text: string
}

export default function StreamingPreview({ text }: StreamingPreviewProps) {
  // Try to extract summary
  const summaryMatch = text.match(/"summary"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/)
  const summary = summaryMatch ? summaryMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n') : null

  // Try to extract completed tasks
  const tasks: Task[] = []
  const tasksMatch = text.match(/"tasks"\s*:\s*\[([\s\S]*?)(?:\]|$)/)
  if (tasksMatch) {
    // Match individual task objects that are complete (have closing brace)
    const taskRegex = /\{\s*"name"\s*:\s*"([^"]+)"[^}]*?"timePercent"\s*:\s*(\d+)[^}]*?"automationRisk"\s*:\s*\{[^}]*?"mid"\s*:\s*(\d+)[^}]*?\}[^}]*?"reason"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/g
    let match
    while ((match = taskRegex.exec(tasksMatch[1])) !== null) {
      tasks.push({
        name: match[1],
        timePercent: parseInt(match[2]),
        automationRisk: { low: 0, mid: parseInt(match[3]), high: 0 },
        reason: match[4].replace(/\\"/g, '"'),
      })
    }
  }

  // Try to extract overall score
  const overallMatch = text.match(/"overallScore"\s*:\s*\{[^}]*?"mid"\s*:\s*(\d+)/)
  const overallScore = overallMatch ? parseInt(overallMatch[1]) : null

  // Try to extract tips
  const tips: string[] = []
  const tipsMatch = text.match(/"tips"\s*:\s*\[([\s\S]*?)(?:\]|$)/)
  if (tipsMatch) {
    const tipRegex = /"([^"]+)"/g
    let match
    while ((match = tipRegex.exec(tipsMatch[1])) !== null) {
      tips.push(match[1].replace(/\\"/g, '"'))
    }
  }

  const hasContent = summary || tasks.length > 0 || overallScore !== null || tips.length > 0

  if (!hasContent) {
    return (
      <div className="bg-slate-100 rounded-xl p-6 text-center text-slate-500">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200" />
        </div>
        <p className="mt-3 text-sm">Starting analysis...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Overall Score */}
      {overallScore !== null && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white text-center">
          <p className="text-sm uppercase tracking-wide opacity-80 mb-1">AI Automation Risk</p>
          <p className="text-5xl font-bold">{overallScore}%</p>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div className="bg-slate-800 text-white rounded-xl p-6">
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">
            Overall Assessment
          </h3>
          <p className="text-lg leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Tasks */}
      {tasks.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
            Task Breakdown ({tasks.length} found)
          </h3>
          <div className="space-y-3">
            {tasks.map((task, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{task.name}</p>
                  {task.reason && (
                    <p className="text-sm text-slate-500 mt-0.5">{task.reason}</p>
                  )}
                </div>
                <div className="flex items-center gap-4 ml-4">
                  {task.timePercent && (
                    <span className="text-sm text-slate-500">{task.timePercent}% of time</span>
                  )}
                  {task.automationRisk?.mid && (
                    <span className={`text-sm font-semibold px-2 py-1 rounded ${
                      task.automationRisk.mid >= 70 ? 'bg-red-100 text-red-700' :
                      task.automationRisk.mid >= 40 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.automationRisk.mid}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 text-slate-400 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Analyzing more tasks...</span>
          </div>
        </div>
      )}

      {/* Tips */}
      {tips.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
            Recommendations
          </h3>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-slate-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
