interface JobFAQProps {
  jobTitle: string
  fiveYearRisk: number
  threeYearRisk: number
  sevenYearRisk: number
  routineAutomation: number
  complexAutomation: number
  reskillUrgency: number
}

export default function JobFAQ({
  jobTitle,
  fiveYearRisk,
  threeYearRisk,
  sevenYearRisk,
  routineAutomation,
  complexAutomation,
  reskillUrgency,
}: JobFAQProps) {
  const riskLevel = fiveYearRisk < 40 ? 'low' : fiveYearRisk < 60 ? 'moderate' : 'high'
  const riskDescription = fiveYearRisk < 40
    ? 'relatively safe from AI automation'
    : fiveYearRisk < 60
      ? 'at moderate risk from AI automation'
      : 'at high risk from AI automation'

  const faqs = [
    {
      question: `Will AI replace ${jobTitle}s?`,
      answer: `Based on current AI trends, ${jobTitle}s face a ${fiveYearRisk}% automation risk over the next 5 years. This means the role is ${riskDescription}. While AI will automate ${routineAutomation}% of routine tasks, ${100 - complexAutomation}% of complex tasks still require human judgment.`,
    },
    {
      question: `What is the job outlook for ${jobTitle}s in 2026 and beyond?`,
      answer: `Our analysis shows ${jobTitle}s have a ${threeYearRisk}% task automation rate in 3 years, ${fiveYearRisk}% in 5 years, and ${sevenYearRisk}% in 7 years. ${riskLevel === 'low' ? 'This career has strong long-term prospects.' : riskLevel === 'moderate' ? 'Workers should begin adapting their skills now.' : 'Significant career adaptation is recommended.'}`,
    },
    {
      question: `Should I become a ${jobTitle} in 2026?`,
      answer: `With a ${fiveYearRisk}% 5-year automation risk, becoming a ${jobTitle} ${riskLevel === 'low' ? 'remains a solid career choice' : riskLevel === 'moderate' ? 'can still be viable if you focus on AI-resistant skills' : 'requires careful consideration of alternative career paths'}. Focus on skills that complement AI rather than compete with it.`,
    },
    {
      question: `How can ${jobTitle}s prepare for AI changes?`,
      answer: `${jobTitle}s should: 1) Learn to use AI tools in their workflow, 2) Develop skills AI cannot replicate like complex problem-solving and relationship building, 3) Stay updated on industry AI trends. The reskill urgency for this role is ${reskillUrgency}%.`,
    },
  ]

  // Generate FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="mt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="bg-white border border-slate-200 rounded-lg group"
          >
            <summary className="px-4 py-3 cursor-pointer font-medium text-slate-800 hover:text-blue-600 list-none flex justify-between items-center">
              {faq.question}
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="px-4 pb-4 text-slate-600">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
