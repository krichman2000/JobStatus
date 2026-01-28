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

    const prompt = `Analyze the job title "${cleanedTitle}" and provide a comprehensive AI impact assessment.

FIRST: Determine if this is a legitimate, legal occupation. If the input is:
- Not a real job (e.g., "asdfgh", random words)
- An illegal activity (e.g., "drug dealer", "hitman")
- Inappropriate or not a profession

Then return this exact JSON:
{
  "error": "not_a_job",
  "message": "Please enter a valid job title like 'Software Engineer', 'Nurse', or 'Accountant'."
}

For legitimate jobs, provide your analysis in this JSON format:

{
  "timeline": {
    "threeYear": <number 0-100>,
    "fiveYear": <number 0-100>,
    "sevenYear": <number 0-100>
  },
  "metrics": {
    "routineAutomation": {
      "score": <number 0-100>,
      "description": "<1 sentence on which routine/repetitive tasks are most affected>"
    },
    "complexAutomation": {
      "score": <number 0-100>,
      "description": "<1 sentence on which judgment-based or complex tasks could be automated>"
    },
    "positionDemand": {
      "score": <number -50 to +50>,
      "description": "<1 sentence on expected job market changes - negative means decline, positive means growth>"
    },
    "wagePressure": {
      "score": <number 0-100>,
      "description": "<1 sentence on expected impact on compensation - higher means more downward pressure>"
    },
    "reskillUrgency": {
      "score": <number 0-100>,
      "description": "<1 sentence on how quickly skills need to evolve>"
    }
  },
  "summary": "<2-3 sentences giving an honest overall assessment of this role's AI exposure>",
  "tips": [
    "<specific, actionable tip 1>",
    "<specific, actionable tip 2>",
    "<specific, actionable tip 3>",
    "<specific, actionable tip 4>"
  ]
}

CRITICAL - Understand what AI CAN and CANNOT automate:

AI CAN automate (high scores):
- Information processing, research, data analysis
- Text/content generation (writing, emails, reports)
- Image/video creation and editing
- Code generation and debugging
- Pattern recognition in data
- Customer service chat/email
- Scheduling, bookkeeping, data entry

AI CANNOT automate (low scores, typically under 30%):
- Physical labor requiring human presence (plumbing, electrical, construction)
- Hands-on healthcare (nursing, surgery, physical therapy, dental work)
- In-person human services (haircuts, massage, childcare, elderly care)
- Physical repair and maintenance work
- Work in unpredictable physical environments
- Jobs requiring physical dexterity with varied objects
- Emotional support and human connection roles

Guidelines:
- Be realistic about physical vs. knowledge work distinction
- Skilled trades (electrician, plumber, HVAC) are highly protected - typically under 25% automation
- Healthcare roles requiring physical patient care are protected - typically under 35%
- Knowledge work and office jobs face much higher automation risk
- Be brutally honest about knowledge work:
  - Software engineers: AI writes 30-50% of code at many companies today
  - Writers/marketers: AI generates drafts, emails, ad copy routinely
  - Analysts: AI summarizes data, writes reports, spots patterns
  - Customer service: Chatbots handle majority of tier-1 inquiries
- Don't lowball physical jobs OR inflate knowledge job safety
- Return ONLY valid JSON, no markdown or explanation.`

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
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

    const result = JSON.parse(content.text)

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
