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

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const prompt = `Analyze the job title "${jobTitle}" and provide a comprehensive AI impact assessment across 5 key metrics.

Provide your analysis in the following JSON format only, with no additional text:

{
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

Guidelines:
- Be brutally honest. AI is advancing rapidly:
  - Software engineers: AI writes 30-50% of code at many companies today
  - Writers/marketers: AI generates drafts, emails, ad copy routinely
  - Analysts: AI summarizes data, writes reports, spots patterns
  - Customer service: Chatbots handle majority of tier-1 inquiries
- routineAutomation: % of repetitive, predictable tasks AI could handle
- complexAutomation: % of judgment-based work AI could meaningfully assist with
- positionDemand: Expected % change in job openings (negative = fewer jobs, positive = more jobs)
- wagePressure: How much AI will push down compensation (0 = none, 100 = severe pressure)
- reskillUrgency: How quickly someone must adapt (0 = years to prepare, 100 = urgent now)
- Don't lowball to be reassuring. Give honest, useful estimates.
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

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze job' },
      { status: 500 }
    )
  }
}
