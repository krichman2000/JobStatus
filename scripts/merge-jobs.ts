/**
 * Merge generated jobs into the main jobs.ts file
 *
 * Usage: npx ts-node scripts/merge-jobs.ts
 *
 * This script reads generated-jobs.json and outputs the data
 * in the format needed for data/jobs.ts
 */

import * as fs from 'fs'
import * as path from 'path'

interface JobAnalysis {
  slug: string
  title: string
  timeline: {
    threeYear: number
    fiveYear: number
    sevenYear: number
  }
  metrics: {
    routineAutomation: { score: number; description: string }
    complexAutomation: { score: number; description: string }
    positionDemand: { score: number; description: string }
    wagePressure: { score: number; description: string }
    reskillUrgency: { score: number; description: string }
  }
  summary: string
  tips: string[]
  saferAlternatives?: {
    title: string
    slug: string | null
    reason: string
  }[]
}

function formatJob(job: JobAnalysis): string {
  const saferAltStr = job.saferAlternatives && job.saferAlternatives.length > 0
    ? `,
    saferAlternatives: ${JSON.stringify(job.saferAlternatives, null, 6).split('\n').map((line, i) => i === 0 ? line : '    ' + line).join('\n')}`
    : ''

  return `  {
    slug: "${job.slug}",
    title: "${job.title}",
    timeline: { threeYear: ${job.timeline.threeYear}, fiveYear: ${job.timeline.fiveYear}, sevenYear: ${job.timeline.sevenYear} },
    metrics: {
      routineAutomation: { score: ${job.metrics.routineAutomation.score}, description: "${escapeString(job.metrics.routineAutomation.description)}" },
      complexAutomation: { score: ${job.metrics.complexAutomation.score}, description: "${escapeString(job.metrics.complexAutomation.description)}" },
      positionDemand: { score: ${job.metrics.positionDemand.score}, description: "${escapeString(job.metrics.positionDemand.description)}" },
      wagePressure: { score: ${job.metrics.wagePressure.score}, description: "${escapeString(job.metrics.wagePressure.description)}" },
      reskillUrgency: { score: ${job.metrics.reskillUrgency.score}, description: "${escapeString(job.metrics.reskillUrgency.description)}" }
    },
    summary: "${escapeString(job.summary)}",
    tips: [${job.tips.map(t => `"${escapeString(t)}"`).join(', ')}]${saferAltStr}
  }`
}

function escapeString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
}

async function main() {
  const inputPath = path.join(__dirname, 'generated-jobs.json')

  if (!fs.existsSync(inputPath)) {
    console.error('Error: generated-jobs.json not found')
    console.log('Run `npx ts-node scripts/generate-jobs.ts` first')
    process.exit(1)
  }

  const content = fs.readFileSync(inputPath, 'utf-8')
  const jobs: JobAnalysis[] = JSON.parse(content)

  console.log(`Loaded ${jobs.length} jobs from generated-jobs.json`)
  console.log('')

  // Sort by slug for consistency
  jobs.sort((a, b) => a.slug.localeCompare(b.slug))

  // Output formatted jobs
  const outputPath = path.join(__dirname, 'jobs-formatted.txt')
  const formatted = jobs.map(formatJob).join(',\n')

  fs.writeFileSync(outputPath, formatted)

  console.log(`Output written to: scripts/jobs-formatted.txt`)
  console.log('')
  console.log('Next steps:')
  console.log('1. Review the formatted output')
  console.log('2. Copy the contents and append to the jobs array in data/jobs.ts')
  console.log('3. Update the categories object in app/jobs/page.tsx to include new job slugs')
  console.log('')

  // Also output a summary
  const riskBuckets = {
    low: jobs.filter(j => j.timeline.fiveYear < 40).length,
    medium: jobs.filter(j => j.timeline.fiveYear >= 40 && j.timeline.fiveYear < 60).length,
    high: jobs.filter(j => j.timeline.fiveYear >= 60).length,
  }

  console.log('Risk Distribution:')
  console.log(`  Low (<40%): ${riskBuckets.low} jobs`)
  console.log(`  Medium (40-60%): ${riskBuckets.medium} jobs`)
  console.log(`  High (>60%): ${riskBuckets.high} jobs`)
}

main().catch(console.error)
