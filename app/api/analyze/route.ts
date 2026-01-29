import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// In-memory cache for analysis results
interface CacheEntry {
  data: unknown
  timestamp: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours
const MAX_CACHE_SIZE = 500

function normalizeJobTitle(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, ' ')
}

function getCacheKey(jobTitle: string): string {
  return `job:${normalizeJobTitle(jobTitle)}`
}

function getFromCache(key: string): unknown | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key)
    return null
  }
  return entry.data
}

function setInCache(key: string, data: unknown): void {
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldestKey = cache.keys().next().value
    if (oldestKey) cache.delete(oldestKey)
  }
  cache.set(key, { data, timestamp: Date.now() })
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
  "tasks": [
    {
      "name": "<specific task>",
      "timePercent": <% of job time, sum to 100>,
      "automationRisk": {
        "low": <conservative estimate>,
        "mid": <likely estimate>,
        "high": <aggressive estimate>
      },
      "aiTools": ["<specific tool 1>", "<specific tool 2>"],
      "reason": "<1 sentence why>"
    }
  ],
  "overallScore": {
    "low": <weighted avg of low estimates>,
    "mid": <weighted avg of mid estimates>,
    "high": <weighted avg of high estimates>
  },
  "alreadyHappening": [
    {
      "example": "<specific company or industry using AI for this>",
      "detail": "<1 sentence on what they're doing>"
    },
    {
      "example": "<another example>",
      "detail": "<detail>"
    }
  ],
  "timeline": {
    "threeYear": <overallScore.mid * 0.6>,
    "fiveYear": <overallScore.mid>,
    "sevenYear": <min(overallScore.mid * 1.3, 95)>
  },
  "metrics": {
    "routineAutomation": {"score": <0-100>, "description": "<1 sentence>"},
    "complexAutomation": {"score": <0-100>, "description": "<1 sentence>"},
    "positionDemand": {"score": <-50 to +50>, "description": "<1 sentence>"},
    "wagePressure": {"score": <0-100>, "description": "<1 sentence>"},
    "reskillUrgency": {"score": <0-100>, "description": "<1 sentence>"}
  },
  "summary": "<2-3 sentences>",
  "tips": ["<tip 1>", "<tip 2>", "<tip 3>", "<tip 4>"]
}

AI TOOLS TO REFERENCE (use specific names):
- Writing/Content: ChatGPT, Claude, Jasper, Copy.ai, Grammarly
- Coding: GitHub Copilot, Cursor, Replit AI, Amazon CodeWhisperer
- Data Analysis: ChatGPT Advanced Data Analysis, Tableau AI, Power BI Copilot
- Design: Midjourney, DALL-E, Adobe Firefly, Canva AI
- Customer Service: Intercom Fin, Zendesk AI, Drift
- Research: Perplexity, Elicit, Consensus
- Legal: Harvey AI, CoCounsel, Casetext
- Sales/CRM: Salesforce Einstein, Gong, Outreach AI
- HR/Recruiting: HireVue, Pymetrics, LinkedIn Recruiter AI
- Accounting: Vic.ai, Botkeeper, QuickBooks AI
- Medical: Epic AI, Nuance DAX, Viz.ai
- Scheduling: Calendly AI, x.ai, Clockwise

CONFIDENCE RANGES:
- Low estimate: Conservative, only counting tasks AI does reliably today
- Mid estimate: Likely scenario in 3-5 years with current trajectory
- High estimate: Aggressive, if AI advancement accelerates

ALREADY HAPPENING - cite real examples like:
- "JPMorgan uses COIN to review legal documents"
- "Klarna replaced 700 customer service agents with AI"
- "GitHub reports Copilot writes 46% of code for users"
- "Radiology AI detects cancers as accurately as doctors at hospitals like Mayo Clinic"

Return ONLY valid JSON, no markdown.`

export async function POST(request: Request) {
  try {
    const { jobTitle, stream: useStreaming } = await request.json()

    if (!jobTitle || typeof jobTitle !== 'string') {
      return NextResponse.json(
        { error: 'Job title is required' },
        { status: 400 }
      )
    }

    const cleanedTitle = jobTitle.trim()
    if (cleanedTitle.length < 2 || cleanedTitle.length > 100) {
      return NextResponse.json(
        { error: 'Please enter a valid job title (2-100 characters).' },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Check cache first
    const cacheKey = getCacheKey(cleanedTitle)
    const cachedResult = getFromCache(cacheKey)
    if (cachedResult) {
      // For streaming requests, send cached result as a single chunk
      if (useStreaming) {
        const encoder = new TextEncoder()
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done', data: cachedResult })}\n\n`))
            controller.close()
          }
        })
        return new Response(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-Cache': 'HIT'
          }
        })
      }
      return NextResponse.json(cachedResult, {
        headers: { 'X-Cache': 'HIT' }
      })
    }

    const prompt = PROMPT_TEMPLATE(cleanedTitle)

    // Streaming response
    if (useStreaming) {
      const encoder = new TextEncoder()
      let fullText = ''

      const stream = new ReadableStream({
        async start(controller) {
          try {
            const messageStream = anthropic.messages.stream({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 3000,
              messages: [{ role: 'user', content: prompt }],
            })

            messageStream.on('text', (text) => {
              fullText += text
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'chunk', text })}\n\n`))
            })

            await messageStream.finalMessage()

            // Parse and cache the complete response
            const cleanedText = cleanJsonResponse(fullText)
            try {
              const result = JSON.parse(cleanedText)

              if (result.error === 'not_a_job') {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: result.message || 'Please enter a valid job title.' })}\n\n`))
              } else {
                setInCache(cacheKey, result)
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done', data: result })}\n\n`))
              }
            } catch {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: 'Failed to parse response. Please try again.' })}\n\n`))
            }
          } catch (error) {
            const errorMessage = getErrorMessage(error)
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: errorMessage })}\n\n`))
          } finally {
            controller.close()
          }
        }
      })

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-Cache': 'MISS'
        }
      })
    }

    // Non-streaming response (fallback)
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response format')
    }

    const responseText = cleanJsonResponse(content.text)
    const result = JSON.parse(responseText)

    if (result.error === 'not_a_job') {
      return NextResponse.json(
        { error: result.message || 'Please enter a valid job title.' },
        { status: 400 }
      )
    }

    setInCache(cacheKey, result)
    return NextResponse.json(result, {
      headers: { 'X-Cache': 'MISS' }
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    )
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return 'Analysis timed out. Please try again.'
    }
    const msg = error.message.toLowerCase()
    if (msg.includes('rate limit') || msg.includes('429')) {
      return 'Too many requests. Please wait a moment and try again.'
    }
    if (msg.includes('overloaded') || msg.includes('529')) {
      return 'Service is busy. Please try again in a few seconds.'
    }
    if (error instanceof SyntaxError) {
      return 'Failed to parse response. Please try again.'
    }
  }
  return 'Failed to analyze job. Please try again.'
}
