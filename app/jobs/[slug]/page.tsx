import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getJobBySlug, getAllJobSlugs, getRelatedJobs } from '@/data/jobs'
import MetricCard from '@/components/MetricCard'
import TimelineCard from '@/components/TimelineCard'
import TipsList from '@/components/TipsList'
import ShareButtons from '@/components/ShareButtons'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllJobSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const job = getJobBySlug(slug)

  if (!job) {
    return { title: 'Job Not Found' }
  }

  return {
    title: `Will My ${job.title} Job Last? - AI Impact Analysis`,
    description: `Discover how AI will impact ${job.title} careers. Get an honest assessment of automation risk, job market outlook, and actionable steps to stay ahead.`,
  }
}

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params
  const job = getJobBySlug(slug)

  if (!job) {
    notFound()
  }

  const relatedJobs = getRelatedJobs(slug, 4)
  const shareUrl = `https://willmyjoblast.com/jobs/${slug}`

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
            Analyze another job
          </Link>
        </div>
      </header>

      {/* Results Section */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Job Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Will My {job.title} Job Last?
            </h1>
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
              {job.title}
            </span>
          </div>

          {/* Summary */}
          <div className="bg-slate-800 text-white rounded-xl p-6 mb-8">
            <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">
              Overall Assessment
            </h2>
            <p className="text-lg leading-relaxed">
              {job.summary}
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
              Task Automation Timeline
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <TimelineCard years={3} percentage={job.timeline.threeYear} />
              <TimelineCard years={5} percentage={job.timeline.fiveYear} />
              <TimelineCard years={7} percentage={job.timeline.sevenYear} />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            <MetricCard
              title="Routine Task Automation"
              score={job.metrics.routineAutomation.score}
              description={job.metrics.routineAutomation.description}
              type="percentage"
              icon="routine"
            />
            <MetricCard
              title="Complex Task Automation"
              score={job.metrics.complexAutomation.score}
              description={job.metrics.complexAutomation.description}
              type="percentage"
              icon="complex"
            />
            <MetricCard
              title="Job Market Outlook"
              score={job.metrics.positionDemand.score}
              description={job.metrics.positionDemand.description}
              type="demand"
              icon="market"
            />
            <MetricCard
              title="Wage Pressure"
              score={job.metrics.wagePressure.score}
              description={job.metrics.wagePressure.description}
              type="percentage"
              icon="wage"
            />
            <MetricCard
              title="Reskill Urgency"
              score={job.metrics.reskillUrgency.score}
              description={job.metrics.reskillUrgency.description}
              type="percentage"
              icon="reskill"
            />
          </div>

          {/* Tips */}
          <TipsList tips={job.tips} />

          {/* Share */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <ShareButtons
              jobTitle={job.title}
              fiveYearRisk={job.timeline.fiveYear}
              url={shareUrl}
            />
          </div>

          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Related Careers to Explore
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedJobs.map((relatedJob) => (
                  <Link
                    key={relatedJob.slug}
                    href={`/jobs/${relatedJob.slug}`}
                    className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-slate-800">{relatedJob.title}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        relatedJob.timeline.fiveYear < 40
                          ? 'bg-green-100 text-green-700'
                          : relatedJob.timeline.fiveYear < 60
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}>
                        {relatedJob.timeline.fiveYear}% risk
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/jobs"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Browse all jobs &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* Compare Jobs Link */}
          <div className="mt-8 text-center">
            <Link
              href={`/compare?job1=${slug}`}
              className="text-slate-600 hover:text-slate-800 text-sm"
            >
              Compare {job.title} with another job &rarr;
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">
              Want to analyze a different job or get a personalized assessment?
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
