'use client'

import { useState } from 'react'
import Link from 'next/link'
import JobInput from '@/components/JobInput'
import MetricCard from '@/components/MetricCard'
import TimelineCard from '@/components/TimelineCard'
import TipsList from '@/components/TipsList'
import TaskBreakdown from '@/components/TaskBreakdown'

interface MetricData {
  score: number
  description: string
}

interface Task {
  name: string
  timePercent: number
  automationRisk: number
  reason: string
}

interface AnalysisResult {
  tasks?: Task[]
  overallScore?: number
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

  const handleAnalyze = async (jobTitle: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze job. Please try again.')
      }

      const data = await response.json()
      setResult({ ...data, jobTitle })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
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

      {/* Loading State */}
      {isLoading && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 text-slate-600">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing your job...</span>
            </div>
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
        </div>
      </footer>
    </main>
  )
}
