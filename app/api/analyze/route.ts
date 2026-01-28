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

    const prompt = `Analyze the job title "${jobTitle}" and estimate what percentage of the tasks in this role could be automated by AI. This is NOT about job loss - it's about which tasks might be assisted or handled by AI tools.

Provide your analysis in the following JSON format only, with no additional text:

{
  "percentages": {
    "threeYear": <number 0-100>,
    "fiveYear": <number 0-100>,
    "sevenYear": <number 0-100>
  },
  "explanation": "<2-3 sentences explaining which specific tasks in this role are most likely to be automated vs. which will remain human-centered>",
  "tips": [
    "<specific, actionable tip 1>",
    "<specific, actionable tip 2>",
    "<specific, actionable tip 3>",
    "<specific, actionable tip 4>"
  ]
}

Guidelines:
- The percentages represent the portion of daily tasks that could be automated, NOT the chance of losing the job.
- Be honest and direct. AI writing tools already produce marketing copy, code, articles, and more. Factor in current capabilities, not just future ones.
- For knowledge work involving text, data, or routine decisions, estimates should reflect that AI can already do much of this today.
- Consider: repetitive vs. creative tasks, physical presence needs, emotional intelligence, complex judgment calls.
- Tips should help this person focus on the human-centered parts of their work.
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
