/**
 * Batch job analysis generation script
 *
 * Usage: npx ts-node scripts/generate-jobs.ts
 *
 * This script generates AI analysis for all job candidates and outputs
 * to scripts/generated-jobs.json for review before merging.
 */

import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'
import * as path from 'path'
import { jobCandidates, JobCandidate } from './job-candidates'

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim()
    }
  })
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

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

// Extended prompt that includes safer alternatives
const PROMPT_TEMPLATE = (jobTitle: string) => `Analyze the job "${jobTitle}" for AI automation impact.

STEP 1 - VALIDATE
If not a legitimate legal job (gibberish, illegal, inappropriate), return:
{"error": "not_a_job", "message": "Please enter a valid job title like 'Software Engineer', 'Nurse', or 'Accountant'."}

STEP 2 - REFERENCE RESEARCH BENCHMARKS
Use these Oxford/McKinsey automation probability benchmarks as anchors:
- Telemarketer: 99% | Data Entry Clerk: 98% | Bookkeeper: 98%
- Paralegal: 94% | Retail Salesperson: 92% | Fast Food Cook: 81%
- Truck Driver: 79% | Accountant: 94% | Financial Analyst: 54%
- Software Developer: 48% | Writer/Author: 45% | Graphic Designer: 43%
- Marketing Manager: 42% | Lawyer: 35% | Teacher: 27%
- Physician: 23% | Registered Nurse: 18% | Physical Therapist: 14%
- Dentist: 13% | Electrician: 11% | Plumber: 9%
- Surgeon: 4% | Mental Health Counselor: 3%
Adjust your estimates to align with these research-backed figures.

STEP 3 - IDENTIFY 5-6 CORE TASKS with specific AI tools that can do them

STEP 4 - Return this JSON:

{
  "timeline": {
    "threeYear": <conservative estimate for 3 years>,
    "fiveYear": <likely estimate for 5 years>,
    "sevenYear": <aggressive estimate for 7 years>
  },
  "metrics": {
    "routineAutomation": {"score": <0-100>, "description": "<1 sentence>"},
    "complexAutomation": {"score": <0-100>, "description": "<1 sentence>"},
    "positionDemand": {"score": <-50 to +50>, "description": "<1 sentence>"},
    "wagePressure": {"score": <0-100>, "description": "<1 sentence>"},
    "reskillUrgency": {"score": <0-100>, "description": "<1 sentence>"}
  },
  "summary": "<2-3 sentences providing an honest assessment>",
  "tips": ["<tip 1>", "<tip 2>", "<tip 3>", "<tip 4>"],
  "saferAlternatives": [
    {
      "title": "<related job title with lower automation risk>",
      "slug": "<slug-version-of-title or null if unknown>",
      "reason": "<1 sentence why this is a good transition>"
    }
  ]
}

SAFER ALTERNATIVES GUIDANCE:
- Suggest 3-4 related careers that someone in this role could realistically transition to
- These should have LOWER automation risk than the current job
- Focus on jobs that leverage existing skills
- Include the slug (lowercase, hyphenated) if it's a common job, or null if unsure

CONFIDENCE RANGES for timeline:
- threeYear: Conservative estimate, only counting what AI does reliably today
- fiveYear: Likely scenario with current trajectory
- sevenYear: More aggressive estimate if AI advancement accelerates

Return ONLY valid JSON, no markdown code blocks.`

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function cleanJsonResponse(text: string): string {
  let cleaned = text.trim()
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7)
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3)
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3)
  }
  return cleaned.trim()
}

async function generateJobAnalysis(candidate: JobCandidate): Promise<JobAnalysis | null> {
  const prompt = PROMPT_TEMPLATE(candidate.title)

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response format')
    }

    const responseText = cleanJsonResponse(content.text)
    const result = JSON.parse(responseText)

    if (result.error === 'not_a_job') {
      console.log(`  Skipped (not a job): ${candidate.title}`)
      return null
    }

    // Add slug and title to the result
    return {
      slug: candidate.slug,
      title: candidate.title,
      ...result,
    }
  } catch (error) {
    console.error(`  Error generating ${candidate.title}:`, error)
    return null
  }
}

function saveCheckpoint(results: JobAnalysis[], filename: string): void {
  const outputPath = path.join(__dirname, filename)
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))
  console.log(`Checkpoint saved: ${results.length} jobs to ${filename}`)
}

function loadCheckpoint(filename: string): JobAnalysis[] {
  const outputPath = path.join(__dirname, filename)
  if (fs.existsSync(outputPath)) {
    const content = fs.readFileSync(outputPath, 'utf-8')
    return JSON.parse(content)
  }
  return []
}

async function main() {
  console.log('='.repeat(60))
  console.log('Job Analysis Generation Script')
  console.log('='.repeat(60))
  console.log(`Total candidates: ${jobCandidates.length}`)
  console.log('')

  // Load any existing checkpoint
  const checkpointFile = 'generated-jobs.json'
  const results = loadCheckpoint(checkpointFile)
  const completedSlugs = new Set(results.map(r => r.slug))

  console.log(`Loaded ${results.length} existing results from checkpoint`)

  // Filter out already completed jobs
  const remaining = jobCandidates.filter(c => !completedSlugs.has(c.slug))
  console.log(`Remaining jobs to generate: ${remaining.length}`)
  console.log('')

  if (remaining.length === 0) {
    console.log('All jobs already generated!')
    return
  }

  const errors: string[] = []
  let processed = 0

  for (const candidate of remaining) {
    processed++
    console.log(`[${processed}/${remaining.length}] Generating: ${candidate.title}`)

    const analysis = await generateJobAnalysis(candidate)

    if (analysis) {
      results.push(analysis)
      console.log(`  ✓ Success (${analysis.timeline.fiveYear}% 5-year risk)`)
    } else {
      errors.push(candidate.title)
      console.log(`  ✗ Failed`)
    }

    // Save checkpoint every 10 jobs
    if (processed % 10 === 0) {
      saveCheckpoint(results, checkpointFile)
    }

    // Rate limiting: wait 1.5 seconds between requests
    if (processed < remaining.length) {
      await sleep(1500)
    }
  }

  // Final save
  saveCheckpoint(results, checkpointFile)

  console.log('')
  console.log('='.repeat(60))
  console.log('Generation Complete')
  console.log('='.repeat(60))
  console.log(`Total generated: ${results.length}`)
  console.log(`Errors: ${errors.length}`)
  if (errors.length > 0) {
    console.log('Failed jobs:', errors.join(', '))
  }
  console.log('')
  console.log(`Output file: scripts/${checkpointFile}`)
  console.log('')
  console.log('Next steps:')
  console.log('1. Review the generated JSON file')
  console.log('2. Run: npx ts-node scripts/merge-jobs.ts')
}

main().catch(console.error)
