'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { jobs } from '@/data/jobs'

// Group jobs by category for better organization
const categories: Record<string, string[]> = {
  'Technology': ['software-engineer', 'data-analyst', 'data-scientist', 'web-developer', 'ux-designer', 'cybersecurity-analyst', 'quality-assurance-engineer', 'technical-writer', 'product-manager'],
  'Healthcare': ['registered-nurse', 'physician', 'pharmacist', 'physical-therapist', 'psychologist', 'veterinarian', 'dental-hygienist', 'dental-assistant', 'medical-assistant', 'occupational-therapist', 'speech-language-pathologist', 'audiologist', 'optometrist', 'chiropractor', 'radiologist', 'clinical-laboratory-technician', 'pharmacy-technician'],
  'Finance & Business': ['accountant', 'financial-analyst', 'financial-advisor', 'investment-banker', 'loan-officer', 'mortgage-underwriter', 'actuary', 'economist', 'insurance-agent', 'claims-adjuster', 'bank-teller'],
  'Legal': ['lawyer', 'paralegal', 'compliance-officer'],
  'Creative & Media': ['graphic-designer', 'photographer', 'video-editor', 'copywriter', 'content-writer', 'journalist', 'music-producer', 'fashion-designer', 'interior-designer'],
  'Marketing & Sales': ['marketing-manager', 'social-media-manager', 'market-research-analyst', 'sales-representative', 'recruiter'],
  'Skilled Trades': ['electrician', 'plumber', 'hvac-technician', 'automotive-mechanic', 'maintenance-technician', 'locksmith', 'wind-turbine-technician'],
  'Construction & Engineering': ['architect', 'mechanical-engineer', 'civil-engineer', 'electrical-engineer', 'biomedical-engineer', 'construction-manager'],
  'Transportation & Logistics': ['truck-driver', 'taxi-driver', 'flight-attendant', 'air-traffic-controller', 'logistics-coordinator', 'warehouse-worker', 'supply-chain-manager'],
  'Administrative & Support': ['administrative-assistant', 'executive-assistant', 'receptionist', 'customer-service-representative', 'human-resources-manager', 'project-manager', 'operations-manager'],
  'Education & Social Services': ['teacher', 'social-worker'],
  'Food & Hospitality': ['chef', 'bartender', 'event-planner'],
  'Other': ['real-estate-agent', 'personal-trainer', 'translator', 'security-guard', 'dental-lab-technician', 'dietitian-nutritionist'],
}

type RiskFilter = 'all' | 'low' | 'medium' | 'high'

export default function JobsPage() {
  const [search, setSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all')

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search filter
      const matchesSearch = search === '' ||
        job.title.toLowerCase().includes(search.toLowerCase())

      // Risk filter
      let matchesRisk = true
      if (riskFilter === 'low') {
        matchesRisk = job.timeline.fiveYear < 40
      } else if (riskFilter === 'medium') {
        matchesRisk = job.timeline.fiveYear >= 40 && job.timeline.fiveYear < 60
      } else if (riskFilter === 'high') {
        matchesRisk = job.timeline.fiveYear >= 60
      }

      return matchesSearch && matchesRisk
    })
  }, [search, riskFilter])

  const filteredSlugs = new Set(filteredJobs.map(j => j.slug))

  const hasResults = filteredJobs.length > 0
  const isFiltering = search !== '' || riskFilter !== 'all'

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-slate-800 hover:text-slate-600">
            Will My Job Last
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/compare"
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              Compare jobs
            </Link>
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              Analyze your job
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Browse All Jobs
          </h1>
          <p className="text-lg text-slate-600 mb-8 text-center max-w-2xl mx-auto">
            Explore AI impact assessments for {jobs.length} careers. Click any job to see detailed analysis.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRiskFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  riskFilter === 'all'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setRiskFilter('low')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  riskFilter === 'low'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                Low Risk
              </button>
              <button
                onClick={() => setRiskFilter('medium')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  riskFilter === 'medium'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setRiskFilter('high')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  riskFilter === 'high'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                High Risk
              </button>
            </div>
          </div>

          {/* Results count */}
          {isFiltering && (
            <p className="text-sm text-slate-500 mb-6">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
          )}

          {/* No results */}
          {!hasResults && (
            <div className="text-center py-12">
              <p className="text-slate-500">No jobs match your search.</p>
              <button
                onClick={() => { setSearch(''); setRiskFilter('all') }}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Job listings by category */}
          {hasResults && Object.entries(categories).map(([category, slugs]) => {
            const categoryJobs = slugs.filter(slug => filteredSlugs.has(slug))
            if (categoryJobs.length === 0) return null

            return (
              <div key={category} className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">
                  {category}
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {categoryJobs.map((slug) => {
                    const job = jobs.find(j => j.slug === slug)
                    if (!job) return null
                    return (
                      <Link
                        key={slug}
                        href={`/jobs/${slug}`}
                        className="block bg-white border border-slate-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-md transition-all"
                      >
                        <span className="text-slate-800 font-medium">{job.title}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            job.timeline.fiveYear < 40
                              ? 'bg-green-100 text-green-700'
                              : job.timeline.fiveYear < 60
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                          }`}>
                            {job.timeline.fiveYear}% in 5 years
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
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
