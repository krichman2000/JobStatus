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

    const prompt = `Analyze the job "${cleanedTitle}" for AI automation impact using TASK-BASED ANALYSIS.

STEP 1 - VALIDATE
Is this a legitimate, legal job? If NOT (gibberish, illegal activity, inappropriate), return:
{"error": "not_a_job", "message": "Please enter a valid job title like 'Software Engineer', 'Nurse', or 'Accountant'."}

STEP 2 - IDENTIFY CORE TASKS
List 5-6 specific tasks this job involves daily/weekly. Be concrete.

STEP 3 - SCORE EACH TASK
For each task, determine AI automation potential (0-100%):
- Physical tasks requiring human presence/dexterity: 5-20%
- Tasks requiring emotional intelligence/human judgment in person: 10-30%
- Routine information processing/data work: 60-90%
- Creative knowledge work: 40-70%
- Communication/writing tasks: 50-80%

STEP 4 - CALCULATE WEIGHTED AVERAGE
Weight tasks by time spent. This gives the overall automation score.

STEP 5 - Return this JSON structure:

{
  "tasks": [
    {
      "name": "<specific task name>",
      "timePercent": <% of job time spent on this, all tasks should sum to 100>,
      "automationRisk": <0-100>,
      "reason": "<why this score - 1 sentence>"
    }
  ],
  "overallScore": <weighted average of task scores>,
  "timeline": {
    "threeYear": <overallScore * 0.6>,
    "fiveYear": <overallScore>,
    "sevenYear": <min(overallScore * 1.3, 95)>
  },
  "metrics": {
    "routineAutomation": {
      "score": <0-100>,
      "description": "<1 sentence>"
    },
    "complexAutomation": {
      "score": <0-100>,
      "description": "<1 sentence>"
    },
    "positionDemand": {
      "score": <-50 to +50>,
      "description": "<1 sentence on job market - negative=decline>"
    },
    "wagePressure": {
      "score": <0-100>,
      "description": "<1 sentence>"
    },
    "reskillUrgency": {
      "score": <0-100>,
      "description": "<1 sentence>"
    }
  },
  "summary": "<2-3 sentences explaining the analysis>",
  "tips": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>", "<actionable tip 4>"]
}

CRITICAL RULES FOR SCORING TASKS:

PHYSICAL WORK (score 5-25%):
- Hands-on patient/animal care
- Manual repairs, installation, construction
- Physical cleaning, grooming, cooking
- Driving, moving, lifting
- In-person childcare, eldercare

HYBRID WORK (score 25-50%):
- In-person teaching, training
- Physical examinations + diagnosis
- Client meetings + relationship building
- Supervising physical workers
- Emergency response

KNOWLEDGE WORK (score 50-85%):
- Writing reports, emails, content
- Data analysis and spreadsheets
- Research and information gathering
- Scheduling and coordination
- Basic customer service chat/email
- Code writing, debugging
- Design and creative work

EXAMPLE - Accountant:
- Data entry & bookkeeping (25% time) → 85% automation
- Financial analysis (25% time) → 60% automation
- Client meetings (15% time) → 15% automation
- Tax preparation (20% time) → 70% automation
- Compliance review (15% time) → 50% automation
Overall: ~58%

EXAMPLE - Dog Groomer:
- Bathing & drying dogs (30% time) → 10% automation
- Haircuts & styling (35% time) → 5% automation
- Nail trimming & ear cleaning (15% time) → 10% automation
- Handling anxious animals (10% time) → 5% automation
- Scheduling & payments (10% time) → 80% automation
Overall: ~16%

Return ONLY valid JSON, no markdown.`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
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
