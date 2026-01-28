'use client'

import { useState } from 'react'
import JobInput from '@/components/JobInput'
import ResultCard from '@/components/ResultCard'
import TipsList from '@/components/TipsList'

interface AnalysisResult {
  percentages: {
    threeYear: number
    fiveYear: number
    sevenYear: number
  }
  explanation: string
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-slate-800">Jobstatus</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How will AI impact your career?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Enter your job title to get personalized insights about AI&apos;s potential impact
            and actionable steps to stay ahead.
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

            {/* Percentage Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              <ResultCard
                years={3}
                percentage={result.percentages.threeYear}
              />
              <ResultCard
                years={5}
                percentage={result.percentages.fiveYear}
              />
              <ResultCard
                years={7}
                percentage={result.percentages.sevenYear}
              />
            </div>

            {/* Explanation */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Why these estimates?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {/* Tips */}
            <TipsList tips={result.tips} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center text-sm text-slate-500">
          <p>
            These estimates are AI-generated insights, not definitive predictions.
            Use them as a starting point for your career planning.
          </p>
        </div>
      </footer>
    </main>
  )
}
