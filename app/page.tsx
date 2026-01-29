'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import JobInput from '@/components/JobInput'
import MetricCard from '@/components/MetricCard'
import TimelineCard from '@/components/TimelineCard'
import TipsList from '@/components/TipsList'
import TaskBreakdown from '@/components/TaskBreakdown'
import AlreadyHappening from '@/components/AlreadyHappening'
import StreamingPreview from '@/components/StreamingPreview'

interface MetricData {
  score: number
  description: string
}

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

interface AlreadyHappeningExample {
  example: string
  detail: string
}

interface AnalysisResult {
  tasks?: Task[]
  overallScore?: OverallScore | number
  alreadyHappening?: AlreadyHappeningExample[]
  timeline: {
    threeYear: number
    fiveYear: number
    sevenYear: number
  }
  metrics: {
    routineAutomation: MetricData
    complexAutomation: MetricData
    positionDemand: MetricData
    wagePressure: MetricData
    reskillUrgency: MetricData
  }
  summary: string
  tips: string[]
  jobTitle: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [streamingText, setStreamingText] = useState('')
  const abortControllerRef = useRef<AbortController | null>(null)

  const handleAnalyze = async (jobTitle: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    setStreamingText('')

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController()
    const timeoutId = setTimeout(() => abortControllerRef.current?.abort(), 60000) // 60s timeout for streaming

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, stream: true }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to analyze job. Please try again.')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Streaming not supported')
      }

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // Process complete SSE messages
        const lines = buffer.split('\n\n')
        buffer = lines.pop() || '' // Keep incomplete message in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6)
            try {
              const event = JSON.parse(jsonStr)

              if (event.type === 'chunk') {
                setStreamingText(prev => prev + event.text)
              } else if (event.type === 'done') {
                setResult({ ...event.data, jobTitle })
                setStreamingText('')
              } else if (event.type === 'error') {
                throw new Error(event.error)
              }
            } catch (e) {
              if (e instanceof SyntaxError) continue // Skip malformed JSON
              throw e
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      }
      setStreamingText('')
    } finally {
      clearTimeout(timeoutId)
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-semibold text-slate-800">Will My Job Last</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How will AI impact your career?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Get an honest, comprehensive assessment of AI&apos;s impact on your role
            across 5 key dimensions.
          </p>

          <JobInput onSubmit={handleAnalyze} isLoading={isLoading} />
        </div>
      </section>

      {/* Error State */}
      {error && (
        <section className="py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          </div>
        </section>
      )}

      {/* Loading State with Streaming Preview */}
      {isLoading && (
        <section className="py-8 px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <StreamingPreview text={streamingText} />
          </div>
        </section>
      )}

      {/* Results Section */}
      {result && !isLoading && (
        <section className="py-8 px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Job Title */}
            <div className="text-center mb-8">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
                {result.jobTitle}
              </span>
            </div>

            {/* Summary */}
            <div className="bg-slate-800 text-white rounded-xl p-6 mb-8">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">
                Overall Assessment
              </h3>
              <p className="text-lg leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Task Breakdown */}
            {result.tasks && result.overallScore !== undefined && (
              <TaskBreakdown tasks={result.tasks} overallScore={result.overallScore} />
            )}

            {/* Already Happening */}
            {result.alreadyHappening && result.alreadyHappening.length > 0 && (
              <AlreadyHappening examples={result.alreadyHappening} />
            )}

            {/* Timeline */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
                Task Automation Timeline
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <TimelineCard years={3} percentage={result.timeline.threeYear} />
                <TimelineCard years={5} percentage={result.timeline.fiveYear} />
                <TimelineCard years={7} percentage={result.timeline.sevenYear} />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              <MetricCard
                title="Routine Task Automation"
                score={result.metrics.routineAutomation.score}
                description={result.metrics.routineAutomation.description}
                type="percentage"
                icon="routine"
              />
              <MetricCard
                title="Complex Task Automation"
                score={result.metrics.complexAutomation.score}
                description={result.metrics.complexAutomation.description}
                type="percentage"
                icon="complex"
              />
              <MetricCard
                title="Job Market Outlook"
                score={result.metrics.positionDemand.score}
                description={result.metrics.positionDemand.description}
                type="demand"
                icon="market"
              />
              <MetricCard
                title="Wage Pressure"
                score={result.metrics.wagePressure.score}
                description={result.metrics.wagePressure.description}
                type="percentage"
                icon="wage"
              />
              <MetricCard
                title="Reskill Urgency"
                score={result.metrics.reskillUrgency.score}
                description={result.metrics.reskillUrgency.description}
                type="percentage"
                icon="reskill"
              />
            </div>

            {/* Tips */}
            <TipsList tips={result.tips} />
          </div>
        </section>
      )}

      {/* Popular Jobs Section */}
      {!result && !isLoading && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-800 mb-2 text-center">
              Popular Jobs
            </h3>
            <p className="text-slate-600 text-center mb-8">
              Quick access to AI impact assessments for common careers.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { slug: 'software-engineer', title: 'Software Engineer' },
                { slug: 'accountant', title: 'Accountant' },
                { slug: 'registered-nurse', title: 'Registered Nurse' },
                { slug: 'teacher', title: 'Teacher' },
                { slug: 'lawyer', title: 'Lawyer' },
                { slug: 'graphic-designer', title: 'Graphic Designer' },
                { slug: 'data-analyst', title: 'Data Analyst' },
                { slug: 'electrician', title: 'Electrician' },
              ].map((job) => (
                <Link
                  key={job.slug}
                  href={`/jobs/${job.slug}`}
                  className="block bg-white border border-slate-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-md transition-all text-center"
                >
                  <span className="text-slate-800 font-medium">{job.title}</span>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/jobs"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Browse all 100 jobs &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center text-sm text-slate-500">
          <p>
            These estimates are AI-generated insights based on current trends.
            Use them as a starting point for your career planning.
          </p>
          <p className="mt-4">
            If you like stuff like this, check out my{' '}
            <a
              href="https://www.youtube.com/@AppliedIntelligencePod"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              podcast
            </a>
            {' '}and{' '}
            <a
              href="https://www.tiktok.com/@appliedintelligen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              TikTok
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
