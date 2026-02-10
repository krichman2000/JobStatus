import { Metadata } from 'next'
import Link from 'next/link'
import { getLeastSecureJobs, getJobCount } from '@/data/jobs'

export const metadata: Metadata = {
  title: 'Jobs Most at Risk from AI - Will My Job Last',
  description: 'Discover the top 25 careers most vulnerable to AI automation. Understand the risks and find actionable steps to future-proof your career.',
  alternates: {
    canonical: '/least-secure',
  },
}

export default function LeastSecurePage() {
  const jobs = getLeastSecureJobs(25)
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
              Jobs Most at Risk from AI
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              These jobs face the highest automation risk based on our analysis of {totalJobs} careers.
              If you&apos;re in one of these roles, it&apos;s important to start planning your next move now.
            </p>
          </div>

          {/* Red indicator box */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-800 font-medium">High Automation Risk</span>
              <span className="text-red-600 text-sm ml-auto">5-year risk over 60%</span>
            </div>
          </div>

          {/* Ranked list */}
          <div className="space-y-3">
            {jobs.map((job, index) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-4 hover:border-red-300 hover:shadow-md transition-all group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h2 className="font-semibold text-slate-800 group-hover:text-red-700 transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-sm text-slate-500 line-clamp-1">
                    {job.summary.split('.')[0]}.
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    {job.timeline.fiveYear}%
                  </span>
                  <p className="text-xs text-slate-400 mt-1">5-year risk</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Action box */}
          <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-semibold text-amber-800 mb-2">What Should You Do?</h3>
            <ul className="text-amber-700 text-sm space-y-2">
              <li>• Click on any job above to see specific tips for adapting</li>
              <li>• Look for adjacent roles that leverage your skills but have lower risk</li>
              <li>• Start learning AI tools now to stay ahead of the curve</li>
              <li>• Consider upskilling into roles that require human judgment and creativity</li>
            </ul>
          </div>

          {/* Bottom links */}
          <div className="mt-10 text-center space-y-4">
            <Link
              href="/most-secure"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              View Most Secure Jobs &rarr;
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
