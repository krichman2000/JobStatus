import { getAllJobSlugs, getJobBySlug, getJobCount } from '@/data/jobs'

export async function GET() {
  const jobCount = getJobCount()
  const slugs = getAllJobSlugs()

  // Get a sample of jobs for the file list
  const sampleJobs = slugs.slice(0, 20).map(slug => {
    const job = getJobBySlug(slug)
    return job ? `- [${job.title} AI Impact Analysis](https://willmyjoblast.com/jobs/${slug}): ${job.timeline.fiveYear}% automation risk in 5 years` : null
  }).filter(Boolean).join('\n')

  const content = `# Will My Job Last

> Free AI career impact analyzer providing honest assessments of automation risk for ${jobCount}+ jobs. Get job-specific automation timelines, market outlook, and actionable tips to future-proof your career.

Will My Job Last analyzes how artificial intelligence and automation will impact specific careers over 3, 5, and 7 year timeframes. Each job assessment includes:

- **Automation Risk Timeline**: Percentage of tasks automatable in 3, 5, and 7 years
- **Routine Task Automation**: Risk level for repetitive, rule-based tasks
- **Complex Task Automation**: Risk level for judgment-based, creative tasks
- **Job Market Outlook**: Whether demand will grow, shrink, or stay stable
- **Wage Pressure**: Expected impact on salaries due to AI
- **Reskill Urgency**: How quickly workers should adapt
- **Actionable Tips**: Specific steps to stay relevant

## Key Statistics

As of 2026, our analysis of ${jobCount} careers shows:
- Jobs with highest automation risk: Data Entry Clerk (85%), Telemarketer (82%), Bookkeeper (78%)
- Jobs with lowest automation risk: Registered Nurse (25%), Electrician (22%), Plumber (20%)
- Average 5-year automation risk across all jobs: ~45%

## Job Analysis Pages

${sampleJobs}
- [View all ${jobCount} job analyses](https://willmyjoblast.com/jobs)

## Quick Links

- [Most AI-Resistant Jobs](https://willmyjoblast.com/most-secure): Top 25 careers with lowest automation risk
- [Jobs Most at Risk from AI](https://willmyjoblast.com/least-secure): Top 25 careers with highest automation risk
- [Compare Two Jobs](https://willmyjoblast.com/compare): Side-by-side automation risk comparison
- [Browse All Jobs](https://willmyjoblast.com/jobs): Complete list of ${jobCount}+ career analyses

## About

Will My Job Last provides data-driven insights to help workers understand AI's impact on their careers and take proactive steps to adapt. Our assessments consider current AI capabilities, research trends, and industry adoption patterns.
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
