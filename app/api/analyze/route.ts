import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { jobTitle } = await request.json()

    if (!jobTitle || typeof jobTitle !== 'string') {
      return NextResponse.json(
        { error: 'Job title is required' },
        { status: 400 }
      )
    }

    // Basic input validation
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

    const prompt = `Analyze the job "${cleanedTitle}" for AI automation impact.

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

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response format')
    }

    // Clean up response - remove markdown code blocks if present
    let responseText = content.text.trim()
    if (responseText.startsWith('```json')) {
      responseText = responseText.slice(7)
    } else if (responseText.startsWith('```')) {
      responseText = responseText.slice(3)
    }
    if (responseText.endsWith('```')) {
      responseText = responseText.slice(0, -3)
    }
    responseText = responseText.trim()

    const result = JSON.parse(responseText)

    // Check if the AI returned an error for invalid job
    if (result.error === 'not_a_job') {
      return NextResponse.json(
        { error: result.message || 'Please enter a valid job title.' },
        { status: 400 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze job' },
      { status: 500 }
    )
  }
}
