import { Metadata } from 'next'
import Link from 'next/link'
import { getMostSecureJobs, getJobCount } from '@/data/jobs'

export const metadata: Metadata = {
  title: 'Most AI-Resistant Jobs - Will My Job Last',
  description: 'Discover the top 25 careers most resistant to AI automation. These jobs have the lowest automation risk based on comprehensive AI analysis.',
}

export default function MostSecurePage() {
  const jobs = getMostSecureJobs(25)
  const totalJobs = getJobCount()

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-slate-800 hover:text-slate-600">
            Will My Job Last
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-800"
          >
            Analyze a job
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Most AI-Resistant Careers
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              These jobs have the lowest automation risk based on our analysis of {totalJobs} careers.
              They typically involve physical presence, human connection, or complex judgment that AI struggles to replicate.
            </p>
          </div>

          {/* Green indicator box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-800 font-medium">Low Automation Risk</span>
              <span className="text-green-600 text-sm ml-auto">5-year risk under 40%</span>
            </div>
          </div>

          {/* Ranked list */}
          <div className="space-y-3">
            {jobs.map((job, index) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h2 className="font-semibold text-slate-800 group-hover:text-green-700 transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-sm text-slate-500 line-clamp-1">
                    {job.summary.split('.')[0]}.
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {job.timeline.fiveYear}%
                  </span>
                  <p className="text-xs text-slate-400 mt-1">5-year risk</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom links */}
          <div className="mt-10 text-center space-y-4">
            <Link
              href="/least-secure"
              className="text-red-600 hover:text-red-800 font-medium"
            >
              View Least Secure Jobs &rarr;
            </Link>
            <div>
              <Link
                href="/jobs"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Browse all {totalJobs} jobs &rarr;
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-slate-600 mb-4">
              Want to analyze a specific job?
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Analyze Your Job
            </Link>
          </div>
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
