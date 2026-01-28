import { Metadata } from 'next'
import Link from 'next/link'
import { jobs } from '@/data/jobs'

export const metadata: Metadata = {
  title: 'Browse All Jobs - WillMyJobLast',
  description: 'Explore AI impact assessments for 100 common jobs. See how automation will affect different careers and what you can do to stay ahead.',
}

// Group jobs by category for better organization
const categories = {
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

export default function JobsPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-slate-800 hover:text-slate-600">
            WillMyJobLast
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-800"
          >
            Analyze your job
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Browse All Jobs
          </h1>
          <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
            Explore AI impact assessments for 100 common careers. Click any job to see detailed analysis.
          </p>

          {Object.entries(categories).map(([category, slugs]) => (
            <div key={category} className="mb-10">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {slugs.map((slug) => {
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
                        <span className="text-xs text-slate-500">
                          {job.timeline.fiveYear}% automated in 5 years
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
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
