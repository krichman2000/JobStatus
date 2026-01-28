'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { jobs, getJobBySlug, JobAnalysis } from '@/data/jobs'

function CompareMetric({
  label,
  value1,
  value2,
  type = 'percentage',
  lowerIsBetter = false
}: {
  label: string
  value1: number
  value2: number
  type?: 'percentage' | 'demand'
  lowerIsBetter?: boolean
}) {
  const getBetterClass = (v1: number, v2: number) => {
    if (v1 === v2) return ['', '']
    if (lowerIsBetter) {
      return v1 < v2 ? ['text-green-600 font-semibold', ''] : ['', 'text-green-600 font-semibold']
    }
    return v1 > v2 ? ['text-green-600 font-semibold', ''] : ['', 'text-green-600 font-semibold']
  }

  const [class1, class2] = getBetterClass(value1, value2)

  const formatValue = (v: number) => {
    if (type === 'demand') {
      return v > 0 ? `+${v}%` : `${v}%`
    }
    return `${v}%`
  }

  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-slate-100">
      <div className={`text-right ${class1}`}>{formatValue(value1)}</div>
      <div className="text-center text-sm text-slate-600">{label}</div>
      <div className={`text-left ${class2}`}>{formatValue(value2)}</div>
    </div>
  )
}

function JobSelector({
  value,
  onChange,
  excludeSlug
}: {
  value: string
  onChange: (slug: string) => void
  excludeSlug?: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-slate-300 rounded-lg text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select a job...</option>
      {jobs
        .filter(job => job.slug !== excludeSlug)
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(job => (
          <option key={job.slug} value={job.slug}>
            {job.title}
          </option>
        ))}
    </select>
  )
}

function CompareContent() {
  const searchParams = useSearchParams()
  const [job1Slug, setJob1Slug] = useState(searchParams.get('job1') || '')
  const [job2Slug, setJob2Slug] = useState(searchParams.get('job2') || '')

  const job1 = job1Slug ? getJobBySlug(job1Slug) : null
  const job2 = job2Slug ? getJobBySlug(job2Slug) : null

  // Update URL when jobs change
  useEffect(() => {
    const params = new URLSearchParams()
    if (job1Slug) params.set('job1', job1Slug)
    if (job2Slug) params.set('job2', job2Slug)
    const newUrl = params.toString() ? `?${params.toString()}` : '/compare'
    window.history.replaceState({}, '', newUrl)
  }, [job1Slug, job2Slug])

  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">
        Compare Jobs
      </h1>
      <p className="text-slate-600 text-center mb-8">
        See how AI impacts different careers side by side.
      </p>

      {/* Job Selectors */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            First Job
          </label>
          <JobSelector
            value={job1Slug}
            onChange={setJob1Slug}
            excludeSlug={job2Slug}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Second Job
          </label>
          <JobSelector
            value={job2Slug}
            onChange={setJob2Slug}
            excludeSlug={job1Slug}
          />
        </div>
      </div>

      {/* Comparison Results */}
      {job1 && job2 && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 border-b border-slate-200">
            <div className="text-right">
              <h2 className="font-semibold text-slate-800">{job1.title}</h2>
            </div>
            <div className="text-center text-sm text-slate-500">vs</div>
            <div className="text-left">
              <h2 className="font-semibold text-slate-800">{job2.title}</h2>
            </div>
          </div>

          {/* Metrics */}
          <div className="p-4">
            <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              Automation Timeline
            </h3>
            <CompareMetric
              label="3-Year Risk"
              value1={job1.timeline.threeYear}
              value2={job2.timeline.threeYear}
              lowerIsBetter
            />
            <CompareMetric
              label="5-Year Risk"
              value1={job1.timeline.fiveYear}
              value2={job2.timeline.fiveYear}
              lowerIsBetter
            />
            <CompareMetric
              label="7-Year Risk"
              value1={job1.timeline.sevenYear}
              value2={job2.timeline.sevenYear}
              lowerIsBetter
            />

            <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-6 mb-2">
              Detailed Metrics
            </h3>
            <CompareMetric
              label="Routine Automation"
              value1={job1.metrics.routineAutomation.score}
              value2={job2.metrics.routineAutomation.score}
              lowerIsBetter
            />
            <CompareMetric
              label="Complex Automation"
              value1={job1.metrics.complexAutomation.score}
              value2={job2.metrics.complexAutomation.score}
              lowerIsBetter
            />
            <CompareMetric
              label="Job Market Outlook"
              value1={job1.metrics.positionDemand.score}
              value2={job2.metrics.positionDemand.score}
              type="demand"
            />
            <CompareMetric
              label="Wage Pressure"
              value1={job1.metrics.wagePressure.score}
              value2={job2.metrics.wagePressure.score}
              lowerIsBetter
            />
            <CompareMetric
              label="Reskill Urgency"
              value1={job1.metrics.reskillUrgency.score}
              value2={job2.metrics.reskillUrgency.score}
              lowerIsBetter
            />
          </div>

          {/* Summaries */}
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-slate-50 border-t border-slate-200">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">{job1.title} Summary</h3>
              <p className="text-sm text-slate-600">{job1.summary}</p>
              <Link
                href={`/jobs/${job1.slug}`}
                className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800"
              >
                View full analysis &rarr;
              </Link>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">{job2.title} Summary</h3>
              <p className="text-sm text-slate-600">{job2.summary}</p>
              <Link
                href={`/jobs/${job2.slug}`}
                className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800"
              >
                View full analysis &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!job1 || !job2) && (
        <div className="text-center py-12 text-slate-500">
          <p>Select two jobs above to compare their AI impact assessments.</p>
        </div>
      )}
    </>
  )
}

export default function ComparePage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-slate-800 hover:text-slate-600">
            Will My Job Last
          </Link>
          <Link
            href="/jobs"
            className="text-sm text-slate-600 hover:text-slate-800"
          >
            Browse all jobs
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 text-slate-600">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span>Loading...</span>
              </div>
            </div>
          }>
            <CompareContent />
          </Suspense>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center text-sm text-slate-500">
          <p>
            These estimates are based on current AI trends and research.
            Use them as a starting point for your career planning.
          </p>
        </div>
      </footer>
    </main>
  )
}
