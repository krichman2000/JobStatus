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

STEP 1 - VALIDATE: Is this a legitimate, legal job? If NOT (gibberish, illegal activity, not a profession), return:
{"error": "not_a_job", "message": "Please enter a valid job title like 'Software Engineer', 'Nurse', or 'Accountant'."}

STEP 2 - CATEGORIZE THE JOB TYPE (this determines your scores):

CATEGORY A - PHYSICAL/HANDS-ON WORK (Timeline scores: 10-30%)
Jobs where you physically DO things to objects, animals, or people in person.
Examples: Plumber, Electrician, Carpenter, Mechanic, Chef, Dog Groomer, Hair Stylist, Massage Therapist, Nurse, Surgeon, Dentist, Physical Therapist, Landscaper, Construction Worker, HVAC Tech, Janitor, Nanny, House Cleaner, Personal Trainer, Mover
WHY LOW: Robots can't navigate varied environments, handle unpredictable situations, or manipulate diverse objects. Requires physical presence.

CATEGORY B - HYBRID WORK (Timeline scores: 30-50%)
Jobs mixing physical presence with significant desk/computer work.
Examples: Doctor (diagnosis + procedures), Veterinarian, Teacher (in-person), Real Estate Agent, Police Officer, Firefighter, Retail Manager, Restaurant Manager, Event Planner
WHY MEDIUM: Some tasks are automatable (paperwork, scheduling, research) but core work requires presence.

CATEGORY C - KNOWLEDGE/OFFICE WORK (Timeline scores: 45-75%)
Jobs done primarily on computers - writing, analyzing, coding, communicating.
Examples: Software Engineer, Data Analyst, Accountant, Marketing Manager, Writer, Paralegal, Financial Analyst, Customer Service Rep, Recruiter, Graphic Designer, Copywriter
WHY HIGH: AI already does much of this: writes code, analyzes data, generates content, answers questions.

STEP 3 - Return JSON based on category:

{
  "timeline": {
    "threeYear": <based on category above>,
    "fiveYear": <based on category above>,
    "sevenYear": <based on category above>
  },
  "metrics": {
    "routineAutomation": {
      "score": <0-100>,
      "description": "<which routine tasks AI could handle>"
    },
    "complexAutomation": {
      "score": <0-100>,
      "description": "<which complex tasks AI could assist with>"
    },
    "positionDemand": {
      "score": <-50 to +50>,
      "description": "<job market outlook - negative=decline, positive=growth>"
    },
    "wagePressure": {
      "score": <0-100>,
      "description": "<pressure on compensation - higher=more pressure>"
    },
    "reskillUrgency": {
      "score": <0-100>,
      "description": "<how quickly skills must evolve>"
    }
  },
  "summary": "<2-3 sentences on this role's AI exposure - be accurate to the job category>",
  "tips": ["<tip 1>", "<tip 2>", "<tip 3>", "<tip 4>"]
}

IMPORTANT CALIBRATION:
- Dog Groomer: ~15% (physical work with animals)
- Plumber: ~15% (physical skilled trade)
- Nurse: ~25% (physical patient care)
- Teacher: ~35% (in-person but some admin automation)
- Accountant: ~55% (mostly computer work)
- Software Engineer: ~50% (AI writes lots of code now)
- Copywriter: ~70% (AI generates marketing content)
- Data Entry Clerk: ~85% (pure computer task)

Return ONLY valid JSON.`

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
