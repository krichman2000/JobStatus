export interface JobAnalysis {
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
}

export const jobs: JobAnalysis[] = [
  {
    slug: "software-engineer",
    title: "Software Engineer",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 65 },
    metrics: {
      routineAutomation: { score: 55, description: "Boilerplate code, unit tests, and standard CRUD operations are increasingly AI-generated." },
      complexAutomation: { score: 40, description: "Architecture decisions and complex debugging still require human judgment, but AI assists significantly." },
      positionDemand: { score: 10, description: "Demand remains strong but growth is slowing as AI increases individual productivity." },
      wagePressure: { score: 35, description: "Entry-level roles face pressure as AI handles junior tasks; senior roles remain valued." },
      reskillUrgency: { score: 70, description: "Engineers must learn AI tools and prompt engineering to stay competitive now." }
    },
    summary: "Software engineering is being transformed rather than replaced. AI coding assistants like Copilot are already writing 30-50% of code at many companies. Engineers who embrace AI tools will be significantly more productive, while those who don't risk falling behind.",
    tips: ["Master AI coding assistants like GitHub Copilot and Claude", "Focus on system design and architecture skills", "Learn prompt engineering and AI integration", "Develop expertise in AI/ML if possible"]
  },
  {
    slug: "accountant",
    title: "Accountant",
    timeline: { threeYear: 40, fiveYear: 55, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 70, description: "Data entry, reconciliation, and standard bookkeeping are highly automatable." },
      complexAutomation: { score: 45, description: "Tax strategy and complex financial analysis still need human expertise but AI assists heavily." },
      positionDemand: { score: -15, description: "Routine accounting positions are declining as automation handles more tasks." },
      wagePressure: { score: 45, description: "Commoditization of basic services is pushing down rates for standard work." },
      reskillUrgency: { score: 60, description: "Accountants should be learning AI tools and advisory skills within the next 1-2 years." }
    },
    summary: "Routine accounting work is rapidly being automated. The profession is shifting toward advisory services, strategic planning, and complex problem-solving. Accountants who only do compliance and bookkeeping face significant displacement risk.",
    tips: ["Transition toward advisory and consulting services", "Learn data analytics and visualization tools", "Specialize in complex areas like international tax or M&A", "Develop client relationship and communication skills"]
  },
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 30, description: "Documentation and scheduling can be automated; direct patient care cannot." },
      complexAutomation: { score: 20, description: "Clinical judgment and patient interaction remain fundamentally human." },
      positionDemand: { score: 25, description: "Strong growth expected due to aging population and healthcare expansion." },
      wagePressure: { score: 15, description: "Nursing shortage maintains wage stability; specialized roles command premiums." },
      reskillUrgency: { score: 35, description: "Learning health informatics and AI diagnostic tools is valuable but not urgent." }
    },
    summary: "Nursing is relatively protected from AI displacement due to the hands-on, empathetic nature of patient care. AI will assist with diagnostics and documentation, but the core nursing role remains human-centric. Demand continues to grow.",
    tips: ["Learn to work with AI diagnostic and monitoring tools", "Specialize in high-demand areas like ICU or oncology", "Develop leadership and care coordination skills", "Consider advanced practice nursing certifications"]
  },
  {
    slug: "truck-driver",
    title: "Truck Driver",
    timeline: { threeYear: 10, fiveYear: 25, sevenYear: 45 },
    metrics: {
      routineAutomation: { score: 35, description: "Highway driving is automatable; urban delivery and loading remain manual." },
      complexAutomation: { score: 25, description: "Route optimization uses AI, but unpredictable situations need human judgment." },
      positionDemand: { score: -20, description: "Autonomous trucks will gradually reduce demand, especially for long-haul routes." },
      wagePressure: { score: 40, description: "Competition from autonomous vehicles will pressure wages over time." },
      reskillUrgency: { score: 50, description: "Drivers have 5-7 years to prepare for significant changes in the industry." }
    },
    summary: "Autonomous trucking is progressing but faces regulatory and technical hurdles. Long-haul highway routes will be automated first; local delivery and specialized transport will persist longer. The transition will be gradual but significant.",
    tips: ["Consider specializing in hazmat, oversized, or specialized cargo", "Learn fleet management and logistics coordination", "Develop skills for last-mile delivery which is harder to automate", "Explore related fields like warehouse management"]
  },
  {
    slug: "lawyer",
    title: "Lawyer",
    timeline: { threeYear: 30, fiveYear: 45, sevenYear: 55 },
    metrics: {
      routineAutomation: { score: 60, description: "Document review, contract analysis, and legal research are highly automatable." },
      complexAutomation: { score: 35, description: "Courtroom advocacy and complex negotiations remain human-driven." },
      positionDemand: { score: -10, description: "Reduced need for junior associates as AI handles research and document work." },
      wagePressure: { score: 40, description: "Billable hour model faces pressure as AI completes tasks faster." },
      reskillUrgency: { score: 55, description: "Lawyers should be integrating AI tools into practice now to remain competitive." }
    },
    summary: "Legal work is being transformed by AI, particularly document review, research, and contract analysis. Junior associate positions are at risk as AI handles work that traditionally trained new lawyers. Courtroom skills and client relationships remain valuable.",
    tips: ["Learn legal AI tools like Harvey, CoCounsel, and contract analysis platforms", "Develop courtroom and negotiation skills that AI can't replicate", "Specialize in complex litigation or emerging tech law", "Focus on client development and relationship management"]
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 65, description: "Basic layouts, social media graphics, and template-based designs are AI-generated." },
      complexAutomation: { score: 50, description: "Brand strategy and creative direction still need humans, but AI generates options." },
      positionDemand: { score: -25, description: "Significant reduction in demand for production-level design work." },
      wagePressure: { score: 55, description: "Clients expect faster, cheaper work as AI tools become standard." },
      reskillUrgency: { score: 75, description: "Designers must master AI tools immediately to remain relevant." }
    },
    summary: "Graphic design is experiencing major disruption from AI image generation. Tools like Midjourney and DALL-E can produce professional-quality visuals in seconds. Designers must evolve into creative directors who guide AI output and develop brand strategy.",
    tips: ["Master AI image generation tools like Midjourney, DALL-E, and Stable Diffusion", "Shift focus to brand strategy and creative direction", "Develop motion graphics and video skills", "Learn UX/UI design which requires more human judgment"]
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    timeline: { threeYear: 40, fiveYear: 55, sevenYear: 65 },
    metrics: {
      routineAutomation: { score: 60, description: "Report generation, basic queries, and data cleaning are easily automated." },
      complexAutomation: { score: 45, description: "Strategic insights and stakeholder communication still require human judgment." },
      positionDemand: { score: 5, description: "Flat demand as AI increases productivity per analyst." },
      wagePressure: { score: 40, description: "Entry-level analyst roles face commoditization." },
      reskillUrgency: { score: 65, description: "Analysts must learn AI/ML tools and move toward data science skills now." }
    },
    summary: "Data analysis is being transformed by AI that can write SQL, create visualizations, and summarize findings automatically. The role is shifting from report generation to strategic interpretation and stakeholder communication. Basic analyst skills are insufficient.",
    tips: ["Learn machine learning and advanced statistical methods", "Develop business acumen and strategic thinking", "Master AI-powered analytics tools", "Focus on communication and data storytelling skills"]
  },
  {
    slug: "customer-service-representative",
    title: "Customer Service Representative",
    timeline: { threeYear: 55, fiveYear: 70, sevenYear: 80 },
    metrics: {
      routineAutomation: { score: 80, description: "Standard inquiries, FAQs, and basic troubleshooting are handled by AI chatbots." },
      complexAutomation: { score: 45, description: "Escalated issues and emotional situations still need human agents." },
      positionDemand: { score: -35, description: "Major reduction in positions as chatbots handle most interactions." },
      wagePressure: { score: 50, description: "Remaining roles are increasingly specialized but face wage stagnation." },
      reskillUrgency: { score: 80, description: "Urgent need to develop specialized skills or transition to new roles." }
    },
    summary: "Customer service is one of the most impacted fields. AI chatbots now handle 60-80% of routine inquiries at many companies. Remaining human roles focus on complex escalations, high-value customers, and situations requiring empathy.",
    tips: ["Develop skills in handling complex escalations and complaints", "Learn to work alongside AI systems as an AI supervisor", "Consider transitioning to customer success or account management", "Build expertise in specific industries or technical products"]
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Content creation, A/B testing, and campaign optimization are AI-assisted." },
      complexAutomation: { score: 40, description: "Brand strategy and creative campaigns still need human vision." },
      positionDemand: { score: 0, description: "Stable demand but roles are evolving toward AI orchestration." },
      wagePressure: { score: 30, description: "Strategic roles maintain value; execution roles face pressure." },
      reskillUrgency: { score: 60, description: "Marketers should be fluent in AI tools within the next year." }
    },
    summary: "Marketing is being reshaped by AI that can generate copy, images, and optimize campaigns automatically. The role is shifting from execution to strategy and AI orchestration. Marketers who can leverage AI effectively will be far more productive.",
    tips: ["Master AI content generation and image creation tools", "Focus on brand strategy and positioning", "Learn marketing analytics and attribution modeling", "Develop skills in AI prompt engineering for marketing"]
  },
  {
    slug: "teacher",
    title: "Teacher",
    timeline: { threeYear: 20, fiveYear: 30, sevenYear: 40 },
    metrics: {
      routineAutomation: { score: 40, description: "Grading, lesson planning, and administrative tasks can be automated." },
      complexAutomation: { score: 25, description: "Student mentorship and classroom management remain fundamentally human." },
      positionDemand: { score: 10, description: "Steady demand driven by population and class size requirements." },
      wagePressure: { score: 20, description: "Public sector wages are relatively protected from market forces." },
      reskillUrgency: { score: 45, description: "Teachers should learn to integrate AI tools into curriculum over the next few years." }
    },
    summary: "Teaching is partially protected by the human relationship and mentorship aspects of the role. However, AI tutoring systems will change how content is delivered. Teachers will evolve toward facilitators and mentors rather than primary content deliverers.",
    tips: ["Learn to use AI tutoring and assessment tools effectively", "Focus on social-emotional learning and student mentorship", "Develop skills in personalized learning approaches", "Consider specializing in special education or gifted programs"]
  },
  {
    slug: "electrician",
    title: "Electrician",
    timeline: { threeYear: 10, fiveYear: 15, sevenYear: 25 },
    metrics: {
      routineAutomation: { score: 15, description: "Physical installation and repair work cannot be automated with current technology." },
      complexAutomation: { score: 20, description: "Diagnostic tools are AI-enhanced but hands-on work remains manual." },
      positionDemand: { score: 20, description: "Strong growth from EV infrastructure, solar, and smart home expansion." },
      wagePressure: { score: 10, description: "Skilled trade shortage maintains strong wage growth." },
      reskillUrgency: { score: 30, description: "Learning new technologies like EV charging and solar is valuable but not AI-driven." }
    },
    summary: "Skilled trades like electrical work are well-protected from AI automation because they require physical presence and manual dexterity. Growing demand for EV infrastructure and renewable energy creates strong job prospects. This is one of the more AI-resistant careers.",
    tips: ["Get certified in EV charging station installation", "Learn solar panel and battery storage systems", "Develop smart home and automation expertise", "Consider starting your own business"]
  },
  {
    slug: "financial-analyst",
    title: "Financial Analyst",
    timeline: { threeYear: 40, fiveYear: 55, sevenYear: 65 },
    metrics: {
      routineAutomation: { score: 65, description: "Financial modeling, data gathering, and report generation are highly automatable." },
      complexAutomation: { score: 45, description: "Strategic recommendations and stakeholder communication need human judgment." },
      positionDemand: { score: -10, description: "Reduced headcount as AI increases analyst productivity." },
      wagePressure: { score: 40, description: "Competition for remaining roles intensifies; top performers still earn well." },
      reskillUrgency: { score: 65, description: "Analysts must learn AI tools and develop strategic skills immediately." }
    },
    summary: "Financial analysis is being transformed by AI that can build models, analyze data, and draft reports automatically. The role is shifting toward strategic interpretation and client communication. Purely technical analysts face significant displacement risk.",
    tips: ["Develop strategic advisory and communication skills", "Learn AI-powered financial analysis tools", "Build expertise in complex areas like M&A or restructuring", "Focus on client relationships and business development"]
  },
  {
    slug: "physician",
    title: "Physician",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 25, description: "Documentation and initial triage can be automated; diagnosis is AI-assisted." },
      complexAutomation: { score: 30, description: "AI aids diagnosis but treatment decisions and patient care remain human." },
      positionDemand: { score: 15, description: "Growing demand from aging population outpaces productivity gains." },
      wagePressure: { score: 15, description: "Physician shortage maintains strong compensation." },
      reskillUrgency: { score: 40, description: "Learning AI diagnostic tools is important but timeline is moderate." }
    },
    summary: "Medicine is being augmented rather than replaced by AI. Diagnostic AI can match or exceed human accuracy for specific conditions, but the holistic patient relationship and treatment decisions remain human. Documentation and administrative burden will decrease.",
    tips: ["Learn to use AI diagnostic and clinical decision support tools", "Focus on patient relationships and communication", "Specialize in procedural areas that require physical skills", "Consider leadership and healthcare administration"]
  },
  {
    slug: "real-estate-agent",
    title: "Real Estate Agent",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Property matching, market analysis, and paperwork are automatable." },
      complexAutomation: { score: 35, description: "Negotiation and high-touch client service remain valuable." },
      positionDemand: { score: -20, description: "Technology platforms reduce need for transactional agents." },
      wagePressure: { score: 45, description: "Commission pressure from discount brokerages and direct platforms." },
      reskillUrgency: { score: 55, description: "Agents must differentiate with technology and service within 2-3 years." }
    },
    summary: "Real estate is being disrupted by platforms that automate property search and reduce agent involvement. Transactional agents who primarily unlock doors face significant risk. Top agents who provide genuine expertise and service will continue to thrive.",
    tips: ["Develop deep market expertise and analytical skills", "Focus on luxury or commercial segments with complex transactions", "Build a strong personal brand and referral network", "Embrace technology to provide better client service"]
  },
  {
    slug: "pharmacist",
    title: "Pharmacist",
    timeline: { threeYear: 30, fiveYear: 45, sevenYear: 55 },
    metrics: {
      routineAutomation: { score: 60, description: "Dispensing and prescription verification are being automated." },
      complexAutomation: { score: 35, description: "Clinical consultation and complex drug interactions need human expertise." },
      positionDemand: { score: -15, description: "Retail pharmacy positions declining; clinical roles stable." },
      wagePressure: { score: 40, description: "Oversupply and automation are pressuring wages." },
      reskillUrgency: { score: 55, description: "Transition toward clinical roles should begin within 1-2 years." }
    },
    summary: "Retail pharmacy is being disrupted by automation and mail-order services. The profession is shifting toward clinical pharmacy roles in hospitals and specialty care. Pharmacists should focus on clinical expertise rather than dispensing.",
    tips: ["Pursue clinical pharmacy specializations", "Develop expertise in specialty medications and complex therapies", "Consider hospital, oncology, or MTM roles", "Build patient consultation and counseling skills"]
  },
  {
    slug: "human-resources-manager",
    title: "Human Resources Manager",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Recruiting screening, benefits administration, and compliance tracking are automatable." },
      complexAutomation: { score: 35, description: "Employee relations and strategic workforce planning need human judgment." },
      positionDemand: { score: -5, description: "Slight decline as AI handles transactional HR tasks." },
      wagePressure: { score: 30, description: "Strategic HR roles maintain value; administrative roles face pressure." },
      reskillUrgency: { score: 50, description: "HR professionals should learn AI tools and shift to strategic work within 2 years." }
    },
    summary: "HR is evolving from transactional administration to strategic workforce management. AI handles recruiting, benefits questions, and compliance monitoring. HR professionals who focus on culture, employee development, and organizational strategy will remain valuable.",
    tips: ["Develop strategic workforce planning skills", "Learn people analytics and data-driven HR", "Focus on change management and organizational development", "Build expertise in AI ethics and workplace AI policy"]
  },
  {
    slug: "journalist",
    title: "Journalist",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 70, description: "News summaries, sports recaps, and data-driven articles are AI-generated." },
      complexAutomation: { score: 40, description: "Investigative journalism and in-depth analysis still need humans." },
      positionDemand: { score: -30, description: "Significant reduction in newsroom positions as AI generates routine content." },
      wagePressure: { score: 55, description: "Budget pressures and AI content generation reduce compensation." },
      reskillUrgency: { score: 70, description: "Journalists must develop unique value propositions immediately." }
    },
    summary: "Routine journalism is being automated at scale. AI can write news summaries, earnings reports, and sports recaps faster and cheaper than humans. Investigative journalism, analysis, and human-interest stories that require original reporting remain valuable.",
    tips: ["Focus on investigative and enterprise journalism", "Build a personal brand and direct audience relationship", "Develop multimedia and video journalism skills", "Consider specializing in complex beats like tech or finance"]
  },
  {
    slug: "chef",
    title: "Chef",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 25, description: "Recipe suggestions and inventory management are AI-assisted." },
      complexAutomation: { score: 20, description: "Creative menu development and kitchen leadership remain human." },
      positionDemand: { score: 10, description: "Restaurant industry continues to grow; experienced chefs are valued." },
      wagePressure: { score: 20, description: "Skilled chefs command premiums; fast food faces more automation." },
      reskillUrgency: { score: 25, description: "AI impacts are minimal; focus on culinary skills and leadership." }
    },
    summary: "Culinary work is protected by its physical, creative, and sensory nature. While recipe AI exists, the execution, creativity, and leadership of a chef cannot be automated. Fast food may see robotic preparation, but restaurant kitchens remain human-driven.",
    tips: ["Develop signature styles and creative menu concepts", "Build restaurant management and business skills", "Consider private chef or catering for higher margins", "Learn about sustainable and health-focused cuisine trends"]
  },
  {
    slug: "mechanical-engineer",
    title: "Mechanical Engineer",
    timeline: { threeYear: 30, fiveYear: 45, sevenYear: 55 },
    metrics: {
      routineAutomation: { score: 45, description: "CAD drafting, simulation setup, and documentation are automatable." },
      complexAutomation: { score: 35, description: "Design innovation and cross-disciplinary problem-solving need human creativity." },
      positionDemand: { score: 5, description: "Stable demand with growth in robotics and renewable energy." },
      wagePressure: { score: 25, description: "Experienced engineers maintain value; entry-level faces more competition." },
      reskillUrgency: { score: 50, description: "Engineers should learn AI-powered design tools within 2-3 years." }
    },
    summary: "Mechanical engineering is being enhanced by AI-powered design tools and simulation. Generative design can create optimized structures automatically. Engineers will shift toward defining requirements, validating results, and handling novel problems.",
    tips: ["Learn generative design and AI-powered CAD tools", "Develop expertise in robotics and automation systems", "Focus on interdisciplinary skills bridging software and hardware", "Build project management and leadership capabilities"]
  },
  {
    slug: "social-worker",
    title: "Social Worker",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 30, description: "Case documentation and resource matching can be automated." },
      complexAutomation: { score: 20, description: "Crisis intervention and therapeutic relationships are fundamentally human." },
      positionDemand: { score: 15, description: "Growing need driven by mental health awareness and aging population." },
      wagePressure: { score: 15, description: "Public sector wages stable; private practice opportunities growing." },
      reskillUrgency: { score: 30, description: "AI impacts are limited; focus on clinical skills and specialization." }
    },
    summary: "Social work is well-protected from AI automation due to its relational and empathetic nature. AI may assist with documentation and resource identification, but the core work of human connection and crisis intervention remains irreplaceable.",
    tips: ["Pursue clinical licensure for greater autonomy", "Specialize in high-demand areas like trauma or substance abuse", "Develop private practice or consulting capabilities", "Learn to use AI tools for case management efficiency"]
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 50, description: "Feature engineering, model selection, and hyperparameter tuning are increasingly automated." },
      complexAutomation: { score: 40, description: "Problem framing and business translation still need human insight." },
      positionDemand: { score: 10, description: "Growing demand but AutoML reduces need for routine modeling work." },
      wagePressure: { score: 30, description: "Top data scientists command premiums; commoditized skills face pressure." },
      reskillUrgency: { score: 60, description: "Must stay current with rapidly evolving AI/ML landscape." }
    },
    summary: "Data science is being transformed by AutoML and AI-powered tools that automate much of the modeling pipeline. The role is shifting toward problem definition, business strategy, and productionizing AI systems. Pure modeling skills are being commoditized.",
    tips: ["Develop strong MLOps and production deployment skills", "Focus on business acumen and problem translation", "Build expertise in GenAI and LLM applications", "Learn to communicate results to non-technical stakeholders"]
  },
  {
    slug: "paralegal",
    title: "Paralegal",
    timeline: { threeYear: 50, fiveYear: 65, sevenYear: 75 },
    metrics: {
      routineAutomation: { score: 75, description: "Document review, research, and filing are highly automatable." },
      complexAutomation: { score: 45, description: "Complex case analysis still benefits from human review." },
      positionDemand: { score: -25, description: "Significant reduction as AI handles document-heavy work." },
      wagePressure: { score: 50, description: "Fewer positions and commoditized skills pressure compensation." },
      reskillUrgency: { score: 75, description: "Paralegals should be developing new skills immediately." }
    },
    summary: "Paralegal work is highly exposed to AI automation. Document review, legal research, and contract analysis are core paralegal tasks that AI handles increasingly well. The profession will shrink significantly, with remaining roles focused on complex litigation support.",
    tips: ["Develop expertise in legal technology and e-discovery", "Consider law school or alternative legal careers", "Focus on complex litigation or specialized practice areas", "Learn to manage and supervise AI legal tools"]
  },
  {
    slug: "physical-therapist",
    title: "Physical Therapist",
    timeline: { threeYear: 15, fiveYear: 20, sevenYear: 30 },
    metrics: {
      routineAutomation: { score: 25, description: "Exercise tracking and progress monitoring can be app-based." },
      complexAutomation: { score: 15, description: "Manual therapy and treatment planning require hands-on assessment." },
      positionDemand: { score: 25, description: "Strong growth from aging population and sports medicine." },
      wagePressure: { score: 15, description: "Shortage of PTs maintains strong wages." },
      reskillUrgency: { score: 25, description: "Technology is supplementary; clinical skills remain paramount." }
    },
    summary: "Physical therapy is well-protected from AI due to its hands-on nature. While apps can guide exercises, the manual assessment, treatment, and adjustment require physical presence. Growing demand from aging population ensures strong job prospects.",
    tips: ["Specialize in high-demand areas like sports, neuro, or geriatrics", "Consider opening a private practice", "Learn to integrate technology for remote monitoring", "Develop expertise in cutting-edge treatment approaches"]
  },
  {
    slug: "copywriter",
    title: "Copywriter",
    timeline: { threeYear: 55, fiveYear: 70, sevenYear: 80 },
    metrics: {
      routineAutomation: { score: 80, description: "Product descriptions, emails, and standard marketing copy are AI-generated." },
      complexAutomation: { score: 50, description: "Brand voice development and creative campaigns still need human creativity." },
      positionDemand: { score: -35, description: "Major reduction in copywriting positions as AI handles volume work." },
      wagePressure: { score: 60, description: "Rates for standard copywriting are collapsing due to AI competition." },
      reskillUrgency: { score: 85, description: "Copywriters must pivot immediately to survive." }
    },
    summary: "Copywriting is one of the most disrupted professions. AI can generate marketing copy, product descriptions, and email sequences that match or exceed average human quality. Only strategic brand work and highly creative campaigns offer protection.",
    tips: ["Pivot to brand strategy and creative direction", "Develop expertise in AI prompt engineering for marketing", "Focus on video scripts and multimedia content", "Build consulting skills to guide AI content strategy"]
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    timeline: { threeYear: 30, fiveYear: 45, sevenYear: 55 },
    metrics: {
      routineAutomation: { score: 45, description: "Scheduling, status tracking, and resource allocation are automatable." },
      complexAutomation: { score: 35, description: "Stakeholder management and risk mitigation need human judgment." },
      positionDemand: { score: 5, description: "Stable demand but role is evolving toward leadership." },
      wagePressure: { score: 25, description: "Tactical PMs face pressure; strategic PMs remain valued." },
      reskillUrgency: { score: 50, description: "PMs should develop AI-augmented approaches within 2 years." }
    },
    summary: "Project management tools are becoming AI-powered, automating scheduling, risk identification, and status reporting. The PM role is shifting toward stakeholder management, strategic decision-making, and leading through ambiguity.",
    tips: ["Focus on stakeholder management and communication", "Develop expertise in agile and adaptive methodologies", "Learn AI-powered project management tools", "Build change management and organizational skills"]
  },
  {
    slug: "dental-hygienist",
    title: "Dental Hygienist",
    timeline: { threeYear: 15, fiveYear: 20, sevenYear: 30 },
    metrics: {
      routineAutomation: { score: 20, description: "Scheduling and records can be automated; cleaning cannot." },
      complexAutomation: { score: 15, description: "Physical procedures require manual dexterity." },
      positionDemand: { score: 15, description: "Steady growth driven by population and dental care awareness." },
      wagePressure: { score: 10, description: "Consistent demand maintains stable wages." },
      reskillUrgency: { score: 20, description: "AI impacts are minimal; focus on clinical excellence." }
    },
    summary: "Dental hygiene is well-protected from AI automation due to its hands-on nature. The work requires physical presence, manual dexterity, and patient interaction that cannot be automated. Job prospects remain strong and stable.",
    tips: ["Stay current with new dental technologies and techniques", "Consider specializing in periodontics or pediatrics", "Develop patient education and communication skills", "Explore expanded practice opportunities in underserved areas"]
  },
  {
    slug: "web-developer",
    title: "Web Developer",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 65, description: "Basic websites, landing pages, and standard components are AI-generated." },
      complexAutomation: { score: 45, description: "Complex web applications still need human architecture decisions." },
      positionDemand: { score: -15, description: "Reduced demand for basic web development; full-stack remains needed." },
      wagePressure: { score: 45, description: "Simple website work is commoditized; complex applications pay well." },
      reskillUrgency: { score: 70, description: "Web developers must level up to full-stack or specialized roles now." }
    },
    summary: "Basic web development is being heavily automated. AI can generate complete websites, components, and standard functionality. Web developers must move toward complex applications, system architecture, or specialized areas to remain valuable.",
    tips: ["Master full-stack development with modern frameworks", "Learn cloud infrastructure and DevOps", "Specialize in performance, security, or accessibility", "Develop product thinking and UX sensibility"]
  },
  {
    slug: "insurance-agent",
    title: "Insurance Agent",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 70, description: "Quoting, policy comparison, and simple claims are automated." },
      complexAutomation: { score: 40, description: "Complex commercial and life insurance planning need human expertise." },
      positionDemand: { score: -30, description: "Direct-to-consumer and comparison sites reduce agent need." },
      wagePressure: { score: 50, description: "Commission compression as simple policies move online." },
      reskillUrgency: { score: 65, description: "Agents must specialize in complex products within 2 years." }
    },
    summary: "Simple insurance products are moving to direct-to-consumer online channels. AI handles quoting, comparison, and policy issuance. Agents who focus on complex commercial, life, or specialty insurance maintain value; personal lines face significant disruption.",
    tips: ["Specialize in commercial or complex life insurance", "Develop expertise in emerging risks like cyber insurance", "Build advisory relationships with business clients", "Focus on high-net-worth individuals with complex needs"]
  },
  {
    slug: "construction-manager",
    title: "Construction Manager",
    timeline: { threeYear: 20, fiveYear: 30, sevenYear: 40 },
    metrics: {
      routineAutomation: { score: 35, description: "Scheduling, material ordering, and documentation are automatable." },
      complexAutomation: { score: 25, description: "On-site problem-solving and crew management need human presence." },
      positionDemand: { score: 15, description: "Infrastructure investment drives strong demand." },
      wagePressure: { score: 15, description: "Experienced managers are in short supply." },
      reskillUrgency: { score: 35, description: "Learning new technologies is valuable but not AI-driven." }
    },
    summary: "Construction management combines office planning with on-site leadership that requires physical presence. AI assists with scheduling, BIM, and resource optimization, but the coordination of crews, problem-solving, and site management remain human.",
    tips: ["Learn BIM and AI-powered construction management tools", "Develop expertise in sustainable and green building", "Build strong safety and compliance knowledge", "Consider specializing in infrastructure or commercial projects"]
  },
  {
    slug: "bank-teller",
    title: "Bank Teller",
    timeline: { threeYear: 55, fiveYear: 70, sevenYear: 80 },
    metrics: {
      routineAutomation: { score: 85, description: "Deposits, withdrawals, and balance inquiries are fully automated." },
      complexAutomation: { score: 40, description: "Complex transactions and customer service escalations need humans." },
      positionDemand: { score: -45, description: "Dramatic reduction as branches close and ATMs expand." },
      wagePressure: { score: 50, description: "Remaining positions have limited wage growth." },
      reskillUrgency: { score: 85, description: "Tellers should be actively transitioning to new roles now." }
    },
    summary: "Bank teller positions are disappearing rapidly due to ATMs, mobile banking, and branch closures. This trend predates AI but is accelerating. Tellers should actively pursue transitions to relationship banking, loan processing, or other careers.",
    tips: ["Pursue training in personal banking or wealth management", "Develop sales and relationship management skills", "Consider roles in loan processing or mortgage", "Explore customer service roles in other industries"]
  },
  {
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    timeline: { threeYear: 30, fiveYear: 40, sevenYear: 50 },
    metrics: {
      routineAutomation: { score: 45, description: "Log analysis, alert triage, and basic monitoring are AI-automated." },
      complexAutomation: { score: 35, description: "Incident response and threat hunting still need human judgment." },
      positionDemand: { score: 25, description: "Strong growth driven by increasing cyber threats." },
      wagePressure: { score: 15, description: "Talent shortage maintains premium compensation." },
      reskillUrgency: { score: 50, description: "Must stay current with evolving threats and AI tools." }
    },
    summary: "Cybersecurity benefits from AI for threat detection and response automation, but the adversarial nature of the field means human judgment remains essential. The shortage of security professionals and growing threat landscape ensure strong demand.",
    tips: ["Develop expertise in AI-powered security tools", "Focus on incident response and threat hunting", "Build skills in cloud security and DevSecOps", "Pursue advanced certifications like CISSP or OSCP"]
  },
  {
    slug: "flight-attendant",
    title: "Flight Attendant",
    timeline: { threeYear: 10, fiveYear: 15, sevenYear: 25 },
    metrics: {
      routineAutomation: { score: 20, description: "Booking and check-in are automated; in-flight service is manual." },
      complexAutomation: { score: 15, description: "Safety procedures and passenger management require human presence." },
      positionDemand: { score: 10, description: "Growing with air travel recovery and expansion." },
      wagePressure: { score: 20, description: "Union protection and travel demand maintain stability." },
      reskillUrgency: { score: 20, description: "AI impacts are minimal in this role." }
    },
    summary: "Flight attendant work is protected by safety requirements and the physical nature of in-flight service. Regulations require human cabin crew for safety, and the hospitality aspects of the role resist automation. AI has limited impact on this profession.",
    tips: ["Pursue international routes and language skills", "Develop leadership skills for purser positions", "Consider transitions to corporate aviation", "Build customer service skills for premium cabins"]
  },
  {
    slug: "architect",
    title: "Architect",
    timeline: { threeYear: 30, fiveYear: 45, sevenYear: 55 },
    metrics: {
      routineAutomation: { score: 45, description: "Drafting, rendering, and code compliance checks are automatable." },
      complexAutomation: { score: 35, description: "Design creativity and client collaboration remain human." },
      positionDemand: { score: 5, description: "Stable demand tied to construction activity." },
      wagePressure: { score: 30, description: "Production work faces pressure; design principals maintain value." },
      reskillUrgency: { score: 50, description: "Architects should learn AI design tools within 2-3 years." }
    },
    summary: "Architecture is being transformed by AI-powered design tools that can generate building layouts, optimize structures, and create renderings. The creative vision and client relationship aspects remain human, but production work is increasingly automated.",
    tips: ["Master AI-powered design and generative tools", "Focus on sustainable and innovative design", "Develop strong client relationship skills", "Consider specializing in complex project types"]
  },
  {
    slug: "veterinarian",
    title: "Veterinarian",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 25, description: "Medical records and scheduling can be automated." },
      complexAutomation: { score: 20, description: "Diagnosis and surgery require hands-on skills." },
      positionDemand: { score: 20, description: "Strong growth driven by pet ownership trends." },
      wagePressure: { score: 10, description: "Vet shortage maintains premium compensation." },
      reskillUrgency: { score: 25, description: "AI diagnostic tools are supplementary, not threatening." }
    },
    summary: "Veterinary medicine is well-protected from AI automation due to its hands-on nature. AI may assist with diagnostics and treatment recommendations, but the physical examination, surgery, and animal handling remain irreplaceable. Pet industry growth drives demand.",
    tips: ["Consider specializing in high-demand areas", "Explore mobile or emergency veterinary services", "Develop business skills for practice ownership", "Stay current with AI-assisted diagnostic tools"]
  },
  {
    slug: "administrative-assistant",
    title: "Administrative Assistant",
    timeline: { threeYear: 50, fiveYear: 65, sevenYear: 75 },
    metrics: {
      routineAutomation: { score: 75, description: "Scheduling, email management, and document handling are highly automatable." },
      complexAutomation: { score: 40, description: "Executive support and complex coordination still need humans." },
      positionDemand: { score: -30, description: "Significant reduction as AI handles administrative tasks." },
      wagePressure: { score: 45, description: "Commoditization of basic skills pressures wages." },
      reskillUrgency: { score: 70, description: "Admins should be developing specialized skills now." }
    },
    summary: "Administrative work is highly exposed to AI automation. Scheduling, email drafting, document preparation, and basic research are AI capabilities. Remaining roles will focus on high-level executive support and complex coordination.",
    tips: ["Develop executive assistant and chief of staff skills", "Learn project management and event coordination", "Build expertise in specific industries or functions", "Consider transitions to operations or office management"]
  },
  {
    slug: "psychologist",
    title: "Psychologist",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 25, description: "Assessments and progress tracking can be AI-assisted." },
      complexAutomation: { score: 20, description: "Therapeutic relationships and clinical judgment remain human." },
      positionDemand: { score: 20, description: "Growing demand driven by mental health awareness." },
      wagePressure: { score: 15, description: "Therapist shortage maintains strong compensation." },
      reskillUrgency: { score: 30, description: "AI is supplementary; clinical skills remain paramount." }
    },
    summary: "Psychology and therapy are protected by the fundamentally human nature of therapeutic relationships. AI chatbots can provide basic support, but meaningful therapy requires human connection, empathy, and clinical judgment. Demand is growing significantly.",
    tips: ["Specialize in high-demand areas like trauma or addiction", "Consider private practice for greater autonomy", "Learn to integrate AI tools for between-session support", "Develop expertise in underserved populations"]
  },
  {
    slug: "plumber",
    title: "Plumber",
    timeline: { threeYear: 10, fiveYear: 15, sevenYear: 25 },
    metrics: {
      routineAutomation: { score: 15, description: "Diagnostic tools may be AI-enhanced but work is manual." },
      complexAutomation: { score: 15, description: "Physical repairs and installations cannot be automated." },
      positionDemand: { score: 20, description: "Strong demand due to trade shortage and housing needs." },
      wagePressure: { score: 10, description: "Skilled trade shortage drives wage growth." },
      reskillUrgency: { score: 20, description: "Technology impacts are minimal in this trade." }
    },
    summary: "Plumbing is one of the most AI-resistant professions due to its hands-on, variable nature. Every job site is different, requiring physical problem-solving and manual skills that robots cannot replicate. Skilled trade shortages ensure strong demand.",
    tips: ["Get licensed and certified for more opportunities", "Learn about smart home plumbing systems", "Consider specializing in commercial or new construction", "Build toward starting your own business"]
  },
  {
    slug: "sales-representative",
    title: "Sales Representative",
    timeline: { threeYear: 40, fiveYear: 55, sevenYear: 65 },
    metrics: {
      routineAutomation: { score: 55, description: "Lead generation, outreach, and CRM updates are automatable." },
      complexAutomation: { score: 35, description: "Relationship building and complex negotiations need humans." },
      positionDemand: { score: -10, description: "Reduced need for transactional sales roles." },
      wagePressure: { score: 40, description: "Inside sales and SDR roles face significant pressure." },
      reskillUrgency: { score: 55, description: "Sales reps must develop consultative skills within 2 years." }
    },
    summary: "Transactional sales are being automated through e-commerce and AI-powered outreach. Inside sales and lead qualification roles face significant disruption. Complex B2B and enterprise sales requiring relationship building remain human-driven.",
    tips: ["Develop consultative and solution selling skills", "Focus on complex, high-value enterprise sales", "Build deep industry and product expertise", "Learn to leverage AI tools for prospecting and research"]
  },
  {
    slug: "radiologist",
    title: "Radiologist",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Routine scan interpretation is highly automatable by AI." },
      complexAutomation: { score: 40, description: "Complex cases and interventional procedures need human expertise." },
      positionDemand: { score: -10, description: "AI augmentation reduces need for additional radiologists." },
      wagePressure: { score: 35, description: "Volume-based compensation faces pressure from AI efficiency." },
      reskillUrgency: { score: 55, description: "Radiologists should develop AI collaboration skills within 2 years." }
    },
    summary: "Radiology is a frequently-cited example of AI impact in medicine. AI can match human accuracy on many routine interpretations. However, radiologists are evolving into AI supervisors, handling complex cases, and performing interventional procedures.",
    tips: ["Develop expertise in interventional radiology", "Learn to work with and supervise AI diagnostic systems", "Focus on complex subspecialty interpretations", "Build skills in clinical consultation and communication"]
  },
  {
    slug: "personal-trainer",
    title: "Personal Trainer",
    timeline: { threeYear: 20, fiveYear: 30, sevenYear: 40 },
    metrics: {
      routineAutomation: { score: 35, description: "Workout programming and tracking can be app-based." },
      complexAutomation: { score: 20, description: "Motivation, form correction, and customization need human presence." },
      positionDemand: { score: 10, description: "Fitness industry growth supports trainer demand." },
      wagePressure: { score: 30, description: "Budget options from apps create some pressure." },
      reskillUrgency: { score: 35, description: "Trainers should differentiate from apps within 2-3 years." }
    },
    summary: "Personal training faces competition from AI-powered fitness apps, but the in-person motivation, form correction, and accountability that trainers provide remain valuable. Premium training focused on results and relationships is protected; budget training faces app competition.",
    tips: ["Specialize in specific populations or goals", "Develop nutrition and lifestyle coaching skills", "Build a strong personal brand and client relationships", "Consider hybrid in-person/online training models"]
  },
  {
    slug: "executive-assistant",
    title: "Executive Assistant",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Calendar management and travel booking are increasingly automated." },
      complexAutomation: { score: 30, description: "Executive partnership and judgment calls remain human." },
      positionDemand: { score: -15, description: "Reduced need as executives use AI directly." },
      wagePressure: { score: 30, description: "Top EA roles maintain value; support roles face pressure." },
      reskillUrgency: { score: 55, description: "EAs should be developing chief of staff skills now." }
    },
    summary: "Executive assistant roles are evolving as AI handles more scheduling and administrative tasks. The most valuable EAs become true partners and chiefs of staff, handling strategic projects and representing executives. Pure administrative support is declining.",
    tips: ["Develop strategic project management skills", "Build toward chief of staff responsibilities", "Learn to manage and coordinate AI tools for executives", "Focus on judgment-heavy tasks and representation"]
  },
  {
    slug: "content-writer",
    title: "Content Writer",
    timeline: { threeYear: 55, fiveYear: 70, sevenYear: 80 },
    metrics: {
      routineAutomation: { score: 80, description: "Blog posts, articles, and SEO content are AI-generated at scale." },
      complexAutomation: { score: 45, description: "Thought leadership and unique perspectives still need humans." },
      positionDemand: { score: -40, description: "Major reduction in content writing positions." },
      wagePressure: { score: 60, description: "Rates for standard content have collapsed." },
      reskillUrgency: { score: 85, description: "Writers must pivot immediately to survive." }
    },
    summary: "Content writing is among the most disrupted professions. AI generates blog posts, SEO content, and articles at a fraction of the cost and time. Writers must pivot to strategy, editing AI output, or developing unique voices and expertise.",
    tips: ["Pivot to content strategy and editorial direction", "Develop expertise in AI content editing and refinement", "Build a unique voice and thought leadership platform", "Consider video scripting and multimedia content"]
  },
  {
    slug: "supply-chain-manager",
    title: "Supply Chain Manager",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Inventory optimization, demand forecasting, and order management are automatable." },
      complexAutomation: { score: 35, description: "Supplier relationships and crisis management need human judgment." },
      positionDemand: { score: 5, description: "Stable demand with evolution toward strategic roles." },
      wagePressure: { score: 30, description: "Tactical roles face pressure; strategic roles grow in value." },
      reskillUrgency: { score: 50, description: "Must learn AI-powered supply chain tools within 2 years." }
    },
    summary: "Supply chain management is being transformed by AI that optimizes inventory, predicts demand, and manages logistics. The role is shifting from execution to strategy, risk management, and supplier relationship development.",
    tips: ["Learn AI-powered supply chain optimization tools", "Develop strategic supplier management skills", "Build expertise in risk management and resilience", "Focus on sustainability and ethical sourcing"]
  },
  {
    slug: "dental-assistant",
    title: "Dental Assistant",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 30, description: "Scheduling and records can be automated; chairside work cannot." },
      complexAutomation: { score: 15, description: "Hands-on assistance during procedures is irreplaceable." },
      positionDemand: { score: 15, description: "Steady growth with dental care demand." },
      wagePressure: { score: 15, description: "Consistent demand maintains stable wages." },
      reskillUrgency: { score: 20, description: "AI impacts are minimal; focus on clinical skills." }
    },
    summary: "Dental assisting is well-protected from AI due to its hands-on nature. The work requires physical presence, manual dexterity, and patient interaction. Administrative tasks may be automated, but chairside assistance remains human.",
    tips: ["Pursue expanded functions certifications", "Consider specializing in oral surgery or orthodontics", "Develop patient communication and education skills", "Explore career paths to dental hygiene or practice management"]
  },
  {
    slug: "operations-manager",
    title: "Operations Manager",
    timeline: { threeYear: 30, fiveYear: 45, sevenYear: 55 },
    metrics: {
      routineAutomation: { score: 45, description: "Scheduling, reporting, and workflow optimization are automatable." },
      complexAutomation: { score: 30, description: "Crisis management and team leadership need human skills." },
      positionDemand: { score: 5, description: "Stable demand but role is evolving." },
      wagePressure: { score: 25, description: "Strategic operations roles maintain value." },
      reskillUrgency: { score: 45, description: "Should learn AI-powered operations tools within 2-3 years." }
    },
    summary: "Operations management is being enhanced by AI that optimizes workflows, predicts issues, and automates reporting. The role is shifting toward strategic improvement, change management, and leadership rather than day-to-day oversight.",
    tips: ["Develop change management and transformation skills", "Learn AI-powered operations and analytics tools", "Focus on strategic initiatives and continuous improvement", "Build strong people leadership capabilities"]
  },
  {
    slug: "medical-assistant",
    title: "Medical Assistant",
    timeline: { threeYear: 25, fiveYear: 35, sevenYear: 45 },
    metrics: {
      routineAutomation: { score: 40, description: "Scheduling and records are automatable; clinical work is not." },
      complexAutomation: { score: 20, description: "Patient care and clinical tasks require human presence." },
      positionDemand: { score: 20, description: "Strong growth from healthcare expansion." },
      wagePressure: { score: 20, description: "Demand outpaces supply in most markets." },
      reskillUrgency: { score: 30, description: "AI impacts are limited; clinical skills remain key." }
    },
    summary: "Medical assistants benefit from the hands-on nature of clinical work. While administrative tasks face automation, the clinical aspects of patient care, vital signs, and provider assistance remain human. Healthcare demand ensures job security.",
    tips: ["Pursue additional certifications and specializations", "Develop strong clinical and patient care skills", "Consider pathways to nursing or other clinical roles", "Learn to work with EHR and health technology systems"]
  },
  {
    slug: "ux-designer",
    title: "UX Designer",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 50, description: "Wireframes, prototypes, and basic UI components are AI-generated." },
      complexAutomation: { score: 35, description: "User research and strategic design thinking need human insight." },
      positionDemand: { score: 5, description: "Stable but roles are becoming more senior-focused." },
      wagePressure: { score: 35, description: "Junior UX roles face pressure; senior strategists maintain value." },
      reskillUrgency: { score: 55, description: "UX designers must master AI tools within 1-2 years." }
    },
    summary: "UX design is being transformed by AI that generates wireframes, prototypes, and even complete interfaces. Designers must evolve toward user research, strategic thinking, and orchestrating AI tools rather than production work.",
    tips: ["Deepen user research and psychology expertise", "Master AI-powered design tools like Figma AI", "Develop product strategy and business skills", "Focus on complex interaction design and systems thinking"]
  },
  {
    slug: "event-planner",
    title: "Event Planner",
    timeline: { threeYear: 30, fiveYear: 40, sevenYear: 50 },
    metrics: {
      routineAutomation: { score: 45, description: "Vendor research, budgeting, and scheduling are automatable." },
      complexAutomation: { score: 25, description: "Creative vision and on-site coordination need human touch." },
      positionDemand: { score: 10, description: "Events industry growing post-pandemic." },
      wagePressure: { score: 25, description: "Corporate events maintain value; social events face pressure." },
      reskillUrgency: { score: 40, description: "Planners should learn AI tools within 2-3 years." }
    },
    summary: "Event planning combines creative vision with logistics that benefit from AI assistance. While AI can help with vendor selection and scheduling, the on-site problem-solving and client relationship aspects remain human. Corporate events offer more stability.",
    tips: ["Specialize in corporate events or luxury weddings", "Develop expertise in hybrid and virtual events", "Build strong vendor networks and relationships", "Learn to use AI for planning efficiency"]
  },
  {
    slug: "quality-assurance-engineer",
    title: "Quality Assurance Engineer",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 65, description: "Test case generation and execution are highly automatable." },
      complexAutomation: { score: 40, description: "Test strategy and exploratory testing need human judgment." },
      positionDemand: { score: -20, description: "Reduced need as AI handles more testing automatically." },
      wagePressure: { score: 45, description: "Manual QA roles face significant pressure." },
      reskillUrgency: { score: 70, description: "QA must shift to automation and strategy immediately." }
    },
    summary: "QA is being transformed by AI that generates and executes test cases automatically. Manual testing is declining rapidly. QA professionals must shift toward test strategy, automation architecture, and quality advocacy to remain relevant.",
    tips: ["Master test automation frameworks and tools", "Learn AI-powered testing and code analysis", "Develop quality strategy and process improvement skills", "Consider transitioning to software engineering in test"]
  },
  {
    slug: "receptionist",
    title: "Receptionist",
    timeline: { threeYear: 50, fiveYear: 65, sevenYear: 75 },
    metrics: {
      routineAutomation: { score: 75, description: "Phone answering, scheduling, and basic inquiries are automated." },
      complexAutomation: { score: 35, description: "High-touch reception and VIP handling still need humans." },
      positionDemand: { score: -35, description: "Significant reduction as AI and self-service expand." },
      wagePressure: { score: 45, description: "Declining demand limits wage growth." },
      reskillUrgency: { score: 75, description: "Receptionists should actively develop new skills now." }
    },
    summary: "Traditional receptionist roles are being automated through AI phone systems, chatbots, and self-service kiosks. High-end corporate reception and executive support remain, but basic front desk positions are declining significantly.",
    tips: ["Develop skills in executive assistance or office management", "Pursue training in administrative specializations", "Consider transitions to customer success or operations", "Build technology skills for front office systems"]
  },
  {
    slug: "pharmacist-technician",
    title: "Pharmacy Technician",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 70, description: "Counting, filling, and basic dispensing are robotically automated." },
      complexAutomation: { score: 30, description: "Compounding and customer service still need humans." },
      positionDemand: { score: -25, description: "Retail pharmacy automation reduces positions." },
      wagePressure: { score: 40, description: "Automation and reduced demand pressure wages." },
      reskillUrgency: { score: 65, description: "Techs should pursue specialization within 2 years." }
    },
    summary: "Pharmacy technician work is being automated through robotic dispensing and mail-order pharmacy expansion. Hospital and specialty pharmacy positions remain, but retail pharmacy is seeing significant job reduction.",
    tips: ["Pursue hospital or specialty pharmacy positions", "Get certified in sterile compounding or chemotherapy", "Consider transition to pharmaceutical sales or industry", "Develop patient counseling and clinical skills"]
  },
  {
    slug: "financial-advisor",
    title: "Financial Advisor",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Portfolio allocation and basic planning are robo-advisor territory." },
      complexAutomation: { score: 35, description: "Complex planning and behavioral coaching need humans." },
      positionDemand: { score: -10, description: "Robo-advisors reduce need for mass-market advisors." },
      wagePressure: { score: 40, description: "Fee compression from low-cost alternatives." },
      reskillUrgency: { score: 55, description: "Advisors must differentiate from robo services within 2 years." }
    },
    summary: "Basic investment management is being automated through robo-advisors. Financial advisors must provide value beyond portfolio allocation through comprehensive planning, behavioral coaching, and complex situations like business sales or estate planning.",
    tips: ["Develop comprehensive financial planning expertise", "Focus on complex situations like business owners", "Build behavioral coaching and client psychology skills", "Consider specializing in tax planning or estate planning"]
  },
  {
    slug: "video-editor",
    title: "Video Editor",
    timeline: { threeYear: 40, fiveYear: 55, sevenYear: 65 },
    metrics: {
      routineAutomation: { score: 55, description: "Basic cuts, color correction, and simple edits are AI-automated." },
      complexAutomation: { score: 35, description: "Creative storytelling and complex projects need human vision." },
      positionDemand: { score: 5, description: "Video content demand grows but AI increases productivity." },
      wagePressure: { score: 40, description: "Simple editing work is commoditized." },
      reskillUrgency: { score: 60, description: "Editors must master AI tools within 1-2 years." }
    },
    summary: "Video editing is being transformed by AI that can cut footage, add effects, and even generate video content. Simple editing is being automated, but creative storytelling, complex narratives, and high-end production remain human-driven.",
    tips: ["Master AI-powered editing tools and workflows", "Develop storytelling and creative direction skills", "Focus on high-end production or specialized content", "Build motion graphics and visual effects expertise"]
  },
  {
    slug: "recruiter",
    title: "Recruiter",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 65, description: "Resume screening, sourcing, and initial outreach are automated." },
      complexAutomation: { score: 35, description: "Candidate assessment and negotiation still need humans." },
      positionDemand: { score: -20, description: "AI handles more of the recruiting process." },
      wagePressure: { score: 45, description: "Transactional recruiting faces commoditization." },
      reskillUrgency: { score: 60, description: "Recruiters must become talent advisors within 2 years." }
    },
    summary: "Recruiting is being automated at the top of the funnel. AI handles sourcing, screening, and initial outreach. Recruiters must evolve into talent advisors who assess fit, sell opportunities, and manage complex hiring processes.",
    tips: ["Develop deep assessment and evaluation skills", "Focus on executive search or specialized technical recruiting", "Build employer branding and talent marketing expertise", "Learn to leverage AI tools for efficiency"]
  },
  {
    slug: "maintenance-technician",
    title: "Maintenance Technician",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 25, description: "Predictive maintenance and diagnostics are AI-enhanced." },
      complexAutomation: { score: 15, description: "Physical repairs and troubleshooting require human skills." },
      positionDemand: { score: 15, description: "Growing need for skilled maintenance across industries." },
      wagePressure: { score: 15, description: "Trade shortage supports wage growth." },
      reskillUrgency: { score: 30, description: "Learning new technologies is valuable but timeline is moderate." }
    },
    summary: "Maintenance technician work is well-protected from AI due to its hands-on nature. AI enhances diagnostics and predictive maintenance, but the physical repair work requires human presence and problem-solving. Skilled technicians remain in high demand.",
    tips: ["Learn PLC programming and industrial automation", "Get certified in specialized equipment systems", "Develop expertise in predictive maintenance technology", "Consider specializing in high-demand industries"]
  },
  {
    slug: "photographer",
    title: "Photographer",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 50, description: "Basic photo editing and product photography are AI-generated." },
      complexAutomation: { score: 30, description: "Creative vision and human subjects require human photographers." },
      positionDemand: { score: -15, description: "AI-generated images reduce need for stock photography." },
      wagePressure: { score: 45, description: "Stock and commercial photography face significant pressure." },
      reskillUrgency: { score: 55, description: "Photographers must differentiate from AI within 2 years." }
    },
    summary: "Photography is being disrupted by AI-generated images that can create product photos, stock images, and even portraits. Event photography, photojournalism, and high-end creative work remain human domains, but commercial photography faces pressure.",
    tips: ["Focus on events, portraits, and irreplaceable moments", "Develop a distinctive creative style", "Learn to integrate AI into your workflow for efficiency", "Build videography and multimedia skills"]
  },
  {
    slug: "speech-language-pathologist",
    title: "Speech-Language Pathologist",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 25, description: "Practice exercises can be app-based; assessment is human." },
      complexAutomation: { score: 15, description: "Diagnosis and treatment planning require clinical expertise." },
      positionDemand: { score: 20, description: "Growing demand in schools and healthcare." },
      wagePressure: { score: 10, description: "Shortage maintains strong compensation." },
      reskillUrgency: { score: 25, description: "AI is supplementary; clinical skills remain paramount." }
    },
    summary: "Speech-language pathology is well-protected from AI due to its clinical, hands-on nature. AI apps may supplement therapy practice, but diagnosis, treatment planning, and therapeutic relationships require human expertise. Demand continues to grow.",
    tips: ["Specialize in high-demand areas like dysphagia or autism", "Consider private practice for greater autonomy", "Develop telepractice skills for expanded reach", "Stay current with assistive technology advances"]
  },
  {
    slug: "bartender",
    title: "Bartender",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 25, description: "Automated drink dispensers exist but lack the social element." },
      complexAutomation: { score: 15, description: "Hospitality, creativity, and ambiance are fundamentally human." },
      positionDemand: { score: 10, description: "Hospitality industry growth supports demand." },
      wagePressure: { score: 20, description: "Tips maintain income; base wages vary." },
      reskillUrgency: { score: 20, description: "AI impacts are minimal in hospitality." }
    },
    summary: "Bartending is protected by its social and experiential nature. People go to bars for the atmosphere, conversation, and human connection. While drink-making robots exist, they cannot replicate the hospitality that defines quality bartending.",
    tips: ["Develop expertise in craft cocktails and mixology", "Build genuine customer service and conversation skills", "Consider moving into bar management", "Learn about wine and spirits for upscale venues"]
  },
  {
    slug: "civil-engineer",
    title: "Civil Engineer",
    timeline: { threeYear: 25, fiveYear: 40, sevenYear: 50 },
    metrics: {
      routineAutomation: { score: 40, description: "Calculations, drafting, and standard designs are automatable." },
      complexAutomation: { score: 30, description: "Novel projects and site-specific challenges need human judgment." },
      positionDemand: { score: 15, description: "Infrastructure investment drives strong demand." },
      wagePressure: { score: 20, description: "Experienced engineers maintain premium compensation." },
      reskillUrgency: { score: 40, description: "Learning AI design tools is valuable within 3 years." }
    },
    summary: "Civil engineering is being enhanced by AI-powered design and analysis tools. Standard structures can be designed automatically, but complex projects, site conditions, and regulatory navigation require human expertise. Infrastructure spending drives demand.",
    tips: ["Learn AI-powered civil engineering design tools", "Develop project management and leadership skills", "Specialize in sustainable infrastructure", "Build expertise in emerging areas like resilience engineering"]
  },
  {
    slug: "warehouse-worker",
    title: "Warehouse Worker",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 65 },
    metrics: {
      routineAutomation: { score: 60, description: "Picking, packing, and sorting are increasingly robotic." },
      complexAutomation: { score: 30, description: "Problem-solving and exception handling still need humans." },
      positionDemand: { score: -25, description: "Automation is reducing warehouse labor needs." },
      wagePressure: { score: 40, description: "Competition from automation limits wage growth." },
      reskillUrgency: { score: 60, description: "Workers should develop technical skills within 2-3 years." }
    },
    summary: "Warehouse work is being transformed by robotics and automation. Amazon and others are deploying robots for picking, packing, and moving goods. Remaining human roles focus on robot supervision, problem-solving, and tasks requiring dexterity.",
    tips: ["Learn to operate and maintain warehouse robotics", "Develop inventory management and logistics skills", "Consider training for forklift certification and specialized equipment", "Explore transitions to logistics coordination or supervision"]
  },
  {
    slug: "interior-designer",
    title: "Interior Designer",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 50, description: "Room layouts and basic designs are AI-generated." },
      complexAutomation: { score: 30, description: "High-end custom design and client relationships need humans." },
      positionDemand: { score: 0, description: "Stable demand with shift toward premium services." },
      wagePressure: { score: 40, description: "Budget design work faces AI and DIY competition." },
      reskillUrgency: { score: 50, description: "Designers should integrate AI tools within 2 years." }
    },
    summary: "Interior design is being disrupted by AI that can generate room layouts, suggest furniture, and visualize spaces. Budget design work is being automated through apps. High-end custom work and complex commercial projects remain human domains.",
    tips: ["Focus on luxury residential or complex commercial projects", "Develop strong client relationship skills", "Master AI visualization and rendering tools", "Build expertise in sustainable and wellness-focused design"]
  },
  {
    slug: "occupational-therapist",
    title: "Occupational Therapist",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 25, description: "Documentation and progress tracking can be automated." },
      complexAutomation: { score: 15, description: "Hands-on therapy and assessment require human skills." },
      positionDemand: { score: 20, description: "Strong growth from aging population and rehab needs." },
      wagePressure: { score: 15, description: "Shortage maintains premium compensation." },
      reskillUrgency: { score: 25, description: "AI impacts are limited; focus on clinical expertise." }
    },
    summary: "Occupational therapy is well-protected from AI due to its hands-on, individualized nature. AI may assist with documentation and exercises, but the assessment, treatment planning, and therapeutic relationship remain fundamentally human.",
    tips: ["Specialize in high-demand areas like hands or pediatrics", "Develop expertise in assistive technology", "Consider private practice or consulting", "Stay current with evidence-based treatment approaches"]
  },
  {
    slug: "loan-officer",
    title: "Loan Officer",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 70, description: "Application processing and basic underwriting are automated." },
      complexAutomation: { score: 35, description: "Complex situations and relationship lending need humans." },
      positionDemand: { score: -25, description: "Automation and fintech reduce loan officer positions." },
      wagePressure: { score: 45, description: "Volume-based compensation faces pressure from efficiency gains." },
      reskillUrgency: { score: 65, description: "Loan officers must differentiate or transition within 2 years." }
    },
    summary: "Mortgage and loan origination is being automated through fintech platforms and AI underwriting. Simple loans are processed without human involvement. Loan officers remain valuable for complex situations, commercial lending, and relationship banking.",
    tips: ["Focus on complex commercial or jumbo lending", "Develop deep expertise in challenging loan scenarios", "Build strong referral relationships with realtors", "Consider specializing in construction or investment property loans"]
  },
  {
    slug: "market-research-analyst",
    title: "Market Research Analyst",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 65, description: "Survey analysis, data compilation, and reports are automatable." },
      complexAutomation: { score: 40, description: "Strategic insights and qualitative research still need humans." },
      positionDemand: { score: -15, description: "AI handles more research tasks automatically." },
      wagePressure: { score: 45, description: "Commoditization of standard research methods." },
      reskillUrgency: { score: 60, description: "Researchers must evolve toward strategy within 2 years." }
    },
    summary: "Market research is being transformed by AI that analyzes surveys, scrapes competitive intelligence, and generates reports automatically. Researchers must evolve toward strategic consulting, qualitative insights, and guiding AI research tools.",
    tips: ["Develop strategic consulting and advisory skills", "Focus on qualitative and ethnographic research", "Learn to orchestrate AI research tools effectively", "Build expertise in specific industries or methodologies"]
  },
  {
    slug: "locksmith",
    title: "Locksmith",
    timeline: { threeYear: 20, fiveYear: 30, sevenYear: 40 },
    metrics: {
      routineAutomation: { score: 25, description: "Electronic access systems change the field but require human installation." },
      complexAutomation: { score: 20, description: "Emergency services and complex installations need human skills." },
      positionDemand: { score: 5, description: "Shift from traditional locks to electronic systems." },
      wagePressure: { score: 20, description: "Specialized skills maintain good compensation." },
      reskillUrgency: { score: 35, description: "Must learn electronic and smart lock systems." }
    },
    summary: "Locksmithing is evolving rather than disappearing. While traditional locks decline, electronic access systems, smart locks, and security integration create new opportunities. The hands-on service nature protects against full automation.",
    tips: ["Learn electronic access control systems", "Develop expertise in smart home security", "Build relationships with property managers and businesses", "Consider automotive locksmith specialization"]
  },
  {
    slug: "translator",
    title: "Translator",
    timeline: { threeYear: 50, fiveYear: 65, sevenYear: 75 },
    metrics: {
      routineAutomation: { score: 75, description: "Standard document translation is highly automatable." },
      complexAutomation: { score: 45, description: "Literary, legal, and nuanced translation still need humans." },
      positionDemand: { score: -35, description: "AI translation dramatically reduces need for human translators." },
      wagePressure: { score: 55, description: "Rates for standard translation have fallen significantly." },
      reskillUrgency: { score: 70, description: "Translators must specialize immediately." }
    },
    summary: "Translation is one of the most AI-impacted professions. Neural machine translation handles most routine translation adequately. Human translators are still needed for literary work, legal precision, marketing localization, and sensitive content.",
    tips: ["Specialize in legal, medical, or literary translation", "Develop expertise in transcreation and marketing localization", "Focus on interpretation which requires human presence", "Build post-editing and MT quality assurance skills"]
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    timeline: { threeYear: 25, fiveYear: 40, sevenYear: 50 },
    metrics: {
      routineAutomation: { score: 35, description: "Analytics, competitive research, and documentation are AI-assisted." },
      complexAutomation: { score: 25, description: "Vision setting and stakeholder management remain human." },
      positionDemand: { score: 10, description: "Growing demand in tech; AI augments rather than replaces." },
      wagePressure: { score: 20, description: "Strong demand maintains premium compensation." },
      reskillUrgency: { score: 45, description: "PMs should leverage AI tools within 1-2 years." }
    },
    summary: "Product management benefits from AI assistance in research, analytics, and documentation, but the core skills of vision, prioritization, and stakeholder management remain human. AI actually increases the leverage and productivity of good PMs.",
    tips: ["Develop deep expertise in AI/ML product development", "Focus on strategic skills and cross-functional leadership", "Learn to leverage AI for faster research and documentation", "Build customer empathy and qualitative research skills"]
  },
  {
    slug: "actuary",
    title: "Actuary",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Standard pricing models and reserves calculations are automatable." },
      complexAutomation: { score: 40, description: "Novel risk assessment and model development still need humans." },
      positionDemand: { score: 0, description: "Stable demand with shift toward data science integration." },
      wagePressure: { score: 30, description: "Credentialed actuaries maintain value; routine work pressured." },
      reskillUrgency: { score: 55, description: "Must integrate data science and ML skills within 2-3 years." }
    },
    summary: "Actuarial work is being enhanced by machine learning that can price risks and build models more quickly. The profession is evolving toward data science, requiring actuaries to integrate ML techniques while maintaining their specialized insurance expertise.",
    tips: ["Learn machine learning and predictive modeling", "Develop programming skills in Python and R", "Focus on emerging risks like cyber and climate", "Build business leadership and communication skills"]
  },
  {
    slug: "audiologist",
    title: "Audiologist",
    timeline: { threeYear: 20, fiveYear: 30, sevenYear: 40 },
    metrics: {
      routineAutomation: { score: 30, description: "Hearing tests can be app-based; fitting requires expertise." },
      complexAutomation: { score: 20, description: "Clinical assessment and counseling remain human." },
      positionDemand: { score: 15, description: "Aging population drives steady growth." },
      wagePressure: { score: 20, description: "Over-the-counter hearing aids create some pressure." },
      reskillUrgency: { score: 35, description: "Must adapt to changing hearing aid market within 3 years." }
    },
    summary: "Audiology faces some disruption from over-the-counter hearing aids and app-based hearing tests, but complex cases and professional fitting remain valuable. The aging population ensures continued demand for hearing healthcare.",
    tips: ["Develop expertise in complex hearing disorders", "Focus on cochlear implants and advanced technology", "Build tinnitus and balance disorder expertise", "Consider combining with other ENT services"]
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 65, description: "Content generation, scheduling, and basic engagement are automatable." },
      complexAutomation: { score: 35, description: "Brand strategy and crisis management need human judgment." },
      positionDemand: { score: -15, description: "AI handles more content creation and posting." },
      wagePressure: { score: 45, description: "Execution roles face pressure; strategic roles maintain value." },
      reskillUrgency: { score: 65, description: "Must evolve beyond posting to strategy within 1-2 years." }
    },
    summary: "Social media management is being automated by AI that generates posts, responds to comments, and analyzes engagement. The role must evolve toward brand strategy, community building, and crisis management to remain valuable.",
    tips: ["Develop brand strategy and community building skills", "Focus on influencer relations and partnerships", "Learn paid social and advertising optimization", "Build expertise in social listening and reputation management"]
  },
  {
    slug: "hvac-technician",
    title: "HVAC Technician",
    timeline: { threeYear: 15, fiveYear: 20, sevenYear: 30 },
    metrics: {
      routineAutomation: { score: 20, description: "Diagnostics are AI-enhanced but repairs are manual." },
      complexAutomation: { score: 15, description: "Installation and troubleshooting require hands-on skills." },
      positionDemand: { score: 20, description: "Strong demand from construction and maintenance needs." },
      wagePressure: { score: 10, description: "Trade shortage drives wage growth." },
      reskillUrgency: { score: 30, description: "Learning smart systems is valuable but not AI-driven." }
    },
    summary: "HVAC work is well-protected from AI due to its hands-on nature. AI helps with diagnostics and system optimization, but installation, repair, and troubleshooting require physical presence and manual skills. Trade shortages ensure strong demand.",
    tips: ["Get certified in newer refrigerants and heat pump systems", "Learn smart HVAC and building automation systems", "Develop expertise in commercial systems for higher wages", "Consider starting your own business"]
  },
  {
    slug: "biomedical-engineer",
    title: "Biomedical Engineer",
    timeline: { threeYear: 25, fiveYear: 40, sevenYear: 50 },
    metrics: {
      routineAutomation: { score: 35, description: "Simulation and testing protocols are increasingly automated." },
      complexAutomation: { score: 30, description: "Device innovation and clinical collaboration remain human." },
      positionDemand: { score: 20, description: "Growing demand from medical device and biotech expansion." },
      wagePressure: { score: 15, description: "Specialized expertise maintains premium compensation." },
      reskillUrgency: { score: 40, description: "Learning AI/ML for medical applications is valuable." }
    },
    summary: "Biomedical engineering benefits from AI in design, simulation, and data analysis while maintaining human oversight due to regulatory and safety requirements. The field is growing with medical device innovation and personalized medicine.",
    tips: ["Develop expertise in AI/ML for medical applications", "Learn regulatory affairs and quality systems", "Focus on emerging areas like implantables or diagnostics", "Build clinical collaboration and communication skills"]
  },
  {
    slug: "air-traffic-controller",
    title: "Air Traffic Controller",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 40 },
    metrics: {
      routineAutomation: { score: 30, description: "Decision support systems assist but humans remain in control." },
      complexAutomation: { score: 25, description: "Safety-critical decisions require human oversight." },
      positionDemand: { score: 10, description: "Stable demand with retirements creating openings." },
      wagePressure: { score: 10, description: "Federal employment maintains strong compensation." },
      reskillUrgency: { score: 35, description: "Technology evolution requires ongoing training." }
    },
    summary: "Air traffic control is being enhanced by AI decision support, but the safety-critical nature of the work ensures human oversight remains. Regulatory requirements and public safety concerns will slow any automation. The profession remains stable.",
    tips: ["Stay current with NextGen and modernization initiatives", "Develop expertise in new technologies and procedures", "Consider supervisory or training positions", "Build knowledge of unmanned aircraft integration"]
  },
  {
    slug: "chiropractor",
    title: "Chiropractor",
    timeline: { threeYear: 15, fiveYear: 20, sevenYear: 30 },
    metrics: {
      routineAutomation: { score: 20, description: "Documentation and scheduling can be automated." },
      complexAutomation: { score: 15, description: "Physical adjustments and patient care are irreplaceable." },
      positionDemand: { score: 15, description: "Growing acceptance and aging population support demand." },
      wagePressure: { score: 15, description: "Practice ownership maintains income potential." },
      reskillUrgency: { score: 20, description: "AI impacts are minimal; focus on clinical excellence." }
    },
    summary: "Chiropractic care is protected from AI by its hands-on nature. The physical assessment and adjustment require human skills that cannot be automated. Growing acceptance of chiropractic care and aging population support continued demand.",
    tips: ["Develop expertise in sports medicine or rehabilitation", "Build a strong referral network with physicians", "Consider multi-disciplinary practice models", "Focus on patient education and preventive care"]
  },
  {
    slug: "investment-banker",
    title: "Investment Banker",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Financial modeling, research, and pitch decks are automatable." },
      complexAutomation: { score: 35, description: "Deal execution and client relationships need human judgment." },
      positionDemand: { score: -15, description: "Reduced analyst and associate needs as AI handles grunt work." },
      wagePressure: { score: 30, description: "Junior roles face pressure; senior bankers maintain earnings." },
      reskillUrgency: { score: 55, description: "Must leverage AI tools and develop advisory skills now." }
    },
    summary: "Investment banking is being transformed by AI that handles financial modeling, research, and analysis. Junior banker roles face significant reduction. Senior bankers who manage relationships and close deals remain essential, but the path there is narrowing.",
    tips: ["Develop strong relationship and client skills early", "Learn to leverage AI for faster analysis", "Focus on deal execution and negotiation skills", "Build expertise in specific sectors or products"]
  },
  {
    slug: "dietitian-nutritionist",
    title: "Dietitian/Nutritionist",
    timeline: { threeYear: 25, fiveYear: 35, sevenYear: 45 },
    metrics: {
      routineAutomation: { score: 40, description: "Meal planning and basic nutrition advice are app-based." },
      complexAutomation: { score: 25, description: "Medical nutrition therapy and counseling need human expertise." },
      positionDemand: { score: 15, description: "Growing focus on preventive health and chronic disease." },
      wagePressure: { score: 25, description: "Apps compete for basic services; clinical roles stable." },
      reskillUrgency: { score: 40, description: "Must differentiate from apps within 2-3 years." }
    },
    summary: "Basic nutrition advice faces competition from AI-powered apps. Clinical dietitians working with complex medical conditions and eating disorders maintain value. The profession is shifting toward medical nutrition therapy and behavior change coaching.",
    tips: ["Focus on medical nutrition therapy and clinical specialties", "Develop expertise in eating disorders or diabetes", "Build behavior change and motivational interviewing skills", "Consider private practice or corporate wellness"]
  },
  {
    slug: "automotive-mechanic",
    title: "Automotive Mechanic",
    timeline: { threeYear: 20, fiveYear: 30, sevenYear: 40 },
    metrics: {
      routineAutomation: { score: 30, description: "Diagnostics are computerized but repairs remain manual." },
      complexAutomation: { score: 20, description: "Hands-on repair work cannot be automated." },
      positionDemand: { score: 10, description: "Shift to EVs changes skills needed but mechanics remain essential." },
      wagePressure: { score: 20, description: "Skilled technicians command premium wages." },
      reskillUrgency: { score: 45, description: "EV and advanced systems training needed within 3-5 years." }
    },
    summary: "Automotive repair remains hands-on work protected from AI automation. The shift to electric vehicles changes the skills needed but doesn't eliminate the profession. Technicians must adapt to EV systems and advanced electronics.",
    tips: ["Get trained and certified in EV systems", "Learn advanced driver assistance system (ADAS) calibration", "Develop expertise in diagnostics and electronics", "Consider specializing in luxury or performance vehicles"]
  },
  {
    slug: "technical-writer",
    title: "Technical Writer",
    timeline: { threeYear: 50, fiveYear: 65, sevenYear: 75 },
    metrics: {
      routineAutomation: { score: 70, description: "Standard documentation and API docs are AI-generated." },
      complexAutomation: { score: 40, description: "Complex explanations and user research still benefit from humans." },
      positionDemand: { score: -25, description: "Significant reduction as AI generates documentation." },
      wagePressure: { score: 50, description: "Standard documentation work is commoditized." },
      reskillUrgency: { score: 70, description: "Technical writers must pivot toward strategy immediately." }
    },
    summary: "Technical writing is being heavily automated. AI can generate documentation, API references, and help content from code and specifications. Technical writers must evolve toward information architecture, user research, and content strategy.",
    tips: ["Develop information architecture and content strategy skills", "Focus on user research and experience writing", "Learn to edit and curate AI-generated documentation", "Build expertise in developer experience and education"]
  },
  {
    slug: "optometrist",
    title: "Optometrist",
    timeline: { threeYear: 20, fiveYear: 30, sevenYear: 40 },
    metrics: {
      routineAutomation: { score: 35, description: "Basic vision tests can be automated; diagnosis requires expertise." },
      complexAutomation: { score: 20, description: "Eye health assessment and treatment need human skills." },
      positionDemand: { score: 15, description: "Aging population and screen time increase demand." },
      wagePressure: { score: 25, description: "Online retailers pressure optical sales margins." },
      reskillUrgency: { score: 30, description: "Technology is supplementary; clinical skills remain paramount." }
    },
    summary: "Optometry faces some pressure from online vision tests and eyewear retailers, but comprehensive eye health examination requires clinical expertise. The medical aspects of optometry are protected, though retail optical faces disruption.",
    tips: ["Focus on medical eye care and disease management", "Develop expertise in specialty contact lenses", "Build referral relationships with ophthalmologists", "Consider dry eye and myopia management services"]
  },
  {
    slug: "fashion-designer",
    title: "Fashion Designer",
    timeline: { threeYear: 40, fiveYear: 55, sevenYear: 65 },
    metrics: {
      routineAutomation: { score: 50, description: "Pattern generation and basic designs are AI-assisted." },
      complexAutomation: { score: 35, description: "Creative vision and trend-setting remain human." },
      positionDemand: { score: -10, description: "Fast fashion automates more design; luxury persists." },
      wagePressure: { score: 40, description: "Mass market design faces pressure; haute couture maintains value." },
      reskillUrgency: { score: 50, description: "Designers should integrate AI tools within 2 years." }
    },
    summary: "Fashion design is being transformed by AI that can generate designs, predict trends, and create variations at scale. Mass market fashion design faces significant automation. Creative direction, brand building, and luxury design remain human domains.",
    tips: ["Develop a distinctive creative vision and brand", "Focus on sustainable and ethical fashion", "Learn to use AI as a design acceleration tool", "Build skills in technical design and production"]
  },
  {
    slug: "compliance-officer",
    title: "Compliance Officer",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Monitoring, reporting, and standard checks are automatable." },
      complexAutomation: { score: 35, description: "Regulatory interpretation and judgment calls need humans." },
      positionDemand: { score: 5, description: "Regulatory complexity maintains demand despite automation." },
      wagePressure: { score: 25, description: "Strategic compliance roles maintain value." },
      reskillUrgency: { score: 50, description: "Must learn compliance technology within 2 years." }
    },
    summary: "Compliance is being transformed by RegTech that automates monitoring, reporting, and standard compliance checks. Compliance officers must evolve toward regulatory strategy, AI governance, and managing compliance technology platforms.",
    tips: ["Develop expertise in RegTech and compliance automation", "Focus on AI governance and ethics compliance", "Build regulatory strategy and advisory skills", "Learn about emerging regulations in privacy and AI"]
  },
  {
    slug: "clinical-laboratory-technician",
    title: "Clinical Laboratory Technician",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 60, description: "Automated analyzers handle most routine testing." },
      complexAutomation: { score: 30, description: "Quality control and complex analysis need human oversight." },
      positionDemand: { score: -10, description: "Automation reduces need for manual testing." },
      wagePressure: { score: 30, description: "Automation limits wage growth in routine roles." },
      reskillUrgency: { score: 50, description: "Should develop specialized skills within 2-3 years." }
    },
    summary: "Laboratory automation handles most routine testing, reducing the need for technicians. Remaining roles focus on quality control, troubleshooting, and specialized testing. Molecular diagnostics and point-of-care testing create new opportunities.",
    tips: ["Specialize in molecular diagnostics or microbiology", "Learn laboratory information systems and automation", "Pursue certification in specialized testing areas", "Consider pathways to medical laboratory scientist roles"]
  },
  {
    slug: "electrical-engineer",
    title: "Electrical Engineer",
    timeline: { threeYear: 30, fiveYear: 45, sevenYear: 55 },
    metrics: {
      routineAutomation: { score: 45, description: "Circuit simulation and standard designs are automatable." },
      complexAutomation: { score: 30, description: "Novel design and system integration need human expertise." },
      positionDemand: { score: 15, description: "Growing demand from electrification and renewable energy." },
      wagePressure: { score: 20, description: "Specialized expertise maintains strong compensation." },
      reskillUrgency: { score: 45, description: "Learning AI design tools is valuable within 2-3 years." }
    },
    summary: "Electrical engineering is being enhanced by AI-powered design tools that automate circuit design and simulation. Engineers are shifting toward system-level thinking and novel applications. Growth in EVs, renewables, and electronics drives demand.",
    tips: ["Develop expertise in power electronics and renewable energy", "Learn AI-powered design and simulation tools", "Focus on systems integration and cross-disciplinary skills", "Build knowledge of embedded systems and IoT"]
  },
  {
    slug: "taxi-driver",
    title: "Taxi/Rideshare Driver",
    timeline: { threeYear: 15, fiveYear: 30, sevenYear: 50 },
    metrics: {
      routineAutomation: { score: 40, description: "Autonomous vehicles are being developed but not yet widespread." },
      complexAutomation: { score: 25, description: "Complex traffic and passenger assistance need human judgment." },
      positionDemand: { score: -15, description: "Gradual reduction as autonomous vehicles deploy." },
      wagePressure: { score: 45, description: "Competition and future automation limit earnings." },
      reskillUrgency: { score: 50, description: "Drivers should develop backup plans within 5-7 years." }
    },
    summary: "Rideshare driving faces long-term disruption from autonomous vehicles, though the timeline is slower than initially predicted. Regulatory, technical, and safety hurdles remain. Drivers have time to prepare but should not plan on this as a permanent career.",
    tips: ["Develop other income sources and skills", "Consider transitioning to delivery services for now", "Learn commercial driving for longer-term stability", "Explore related fields like fleet management"]
  },
  {
    slug: "mortgage-underwriter",
    title: "Mortgage Underwriter",
    timeline: { threeYear: 50, fiveYear: 65, sevenYear: 75 },
    metrics: {
      routineAutomation: { score: 75, description: "Standard mortgage decisions are AI-automated." },
      complexAutomation: { score: 40, description: "Exception handling and complex files still need humans." },
      positionDemand: { score: -30, description: "Significant reduction as AI handles standard underwriting." },
      wagePressure: { score: 45, description: "Volume-based compensation declines with automation." },
      reskillUrgency: { score: 70, description: "Must specialize in complex files or transition now." }
    },
    summary: "Mortgage underwriting is being automated rapidly. AI systems can approve standard loans without human intervention. Remaining underwriter roles focus on complex files, exceptions, and portfolio risk management.",
    tips: ["Specialize in complex commercial or jumbo loans", "Develop risk management and portfolio analysis skills", "Consider transitions to credit risk or loan review", "Learn the AI systems to supervise their decisions"]
  },
  {
    slug: "music-producer",
    title: "Music Producer",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 45, description: "Beat making, mixing, and mastering are AI-assisted." },
      complexAutomation: { score: 30, description: "Creative vision and artist development remain human." },
      positionDemand: { score: 0, description: "More music being made but AI handles production basics." },
      wagePressure: { score: 40, description: "Entry-level production work is commoditized." },
      reskillUrgency: { score: 50, description: "Producers should master AI tools within 1-2 years." }
    },
    summary: "Music production is being transformed by AI that generates beats, assists with mixing, and even creates entire tracks. Human producers remain valuable for creative vision, artist development, and achieving distinctive sounds.",
    tips: ["Develop a distinctive sonic signature and creative vision", "Focus on artist development and A&R skills", "Master AI music tools to increase productivity", "Build relationships with artists and labels"]
  },
  {
    slug: "claims-adjuster",
    title: "Insurance Claims Adjuster",
    timeline: { threeYear: 45, fiveYear: 60, sevenYear: 70 },
    metrics: {
      routineAutomation: { score: 65, description: "Simple claims are auto-adjudicated by AI." },
      complexAutomation: { score: 35, description: "Complex claims and investigations still need humans." },
      positionDemand: { score: -25, description: "Straight-through processing reduces adjuster need." },
      wagePressure: { score: 40, description: "Volume reduction limits wage growth." },
      reskillUrgency: { score: 60, description: "Must specialize in complex claims within 2 years." }
    },
    summary: "Claims adjustment is being automated through straight-through processing. AI handles simple claims from photo submission to payment. Remaining roles focus on complex claims, fraud investigation, and catastrophe response.",
    tips: ["Specialize in complex commercial or liability claims", "Develop fraud investigation and SIU skills", "Build expertise in catastrophe and large loss", "Learn claims analytics and technology systems"]
  },
  {
    slug: "economist",
    title: "Economist",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "Data analysis and forecasting models are AI-enhanced." },
      complexAutomation: { score: 35, description: "Economic interpretation and policy advice need human judgment." },
      positionDemand: { score: 0, description: "Stable demand with role evolution toward strategy." },
      wagePressure: { score: 25, description: "Senior economists maintain value; research roles face pressure." },
      reskillUrgency: { score: 50, description: "Must integrate AI/ML tools within 2-3 years." }
    },
    summary: "Economic analysis is being enhanced by AI that processes data and generates forecasts more quickly. Economists must evolve toward interpretation, policy implications, and strategic advice rather than pure number-crunching.",
    tips: ["Develop expertise in AI/ML economic modeling", "Focus on policy interpretation and strategic advice", "Build communication skills for complex topics", "Specialize in emerging areas like climate economics or digital markets"]
  },
  {
    slug: "logistics-coordinator",
    title: "Logistics Coordinator",
    timeline: { threeYear: 40, fiveYear: 55, sevenYear: 65 },
    metrics: {
      routineAutomation: { score: 60, description: "Route optimization, tracking, and scheduling are automated." },
      complexAutomation: { score: 30, description: "Exception handling and relationship management need humans." },
      positionDemand: { score: -15, description: "Automation reduces need for routine coordination." },
      wagePressure: { score: 35, description: "Transactional roles face pressure; strategic roles stable." },
      reskillUrgency: { score: 55, description: "Must develop strategic skills within 2-3 years." }
    },
    summary: "Logistics coordination is being automated by AI systems that optimize routes, track shipments, and manage scheduling. Coordinators must evolve toward exception management, carrier relationships, and strategic logistics planning.",
    tips: ["Develop carrier relationship and negotiation skills", "Learn logistics technology platforms and analytics", "Focus on international logistics and customs", "Build expertise in supply chain risk management"]
  },
  {
    slug: "dental-lab-technician",
    title: "Dental Lab Technician",
    timeline: { threeYear: 35, fiveYear: 50, sevenYear: 60 },
    metrics: {
      routineAutomation: { score: 55, description: "CAD/CAM and 3D printing automate much fabrication." },
      complexAutomation: { score: 30, description: "Custom artistry and complex cases need human skills." },
      positionDemand: { score: -15, description: "Digital dentistry reduces traditional lab work." },
      wagePressure: { score: 40, description: "Automation and offshore labs pressure wages." },
      reskillUrgency: { score: 55, description: "Must master digital dentistry within 2-3 years." }
    },
    summary: "Dental laboratory work is being transformed by CAD/CAM and 3D printing. Standard crowns and restorations are increasingly fabricated digitally. Technicians must develop digital skills and focus on complex, custom work.",
    tips: ["Master CAD/CAM and digital dentistry systems", "Focus on complex implant cases and full-mouth reconstructions", "Develop expertise in esthetic restorations", "Consider transitioning to in-office milling positions"]
  },
  {
    slug: "security-guard",
    title: "Security Guard",
    timeline: { threeYear: 30, fiveYear: 45, sevenYear: 55 },
    metrics: {
      routineAutomation: { score: 45, description: "Surveillance monitoring and access control are automatable." },
      complexAutomation: { score: 25, description: "Physical response and judgment calls need human presence." },
      positionDemand: { score: -15, description: "Technology reduces need for static guard posts." },
      wagePressure: { score: 35, description: "Entry-level positions face wage stagnation." },
      reskillUrgency: { score: 50, description: "Should develop specialized skills within 3 years." }
    },
    summary: "Security work is being transformed by cameras, AI surveillance, and access control systems. Basic monitoring is being automated. Remaining roles focus on physical response, high-security environments, and executive protection.",
    tips: ["Develop skills in security technology and monitoring systems", "Pursue certifications for specialized security work", "Consider executive protection or corporate security", "Learn cybersecurity fundamentals for integrated roles"]
  },
  {
    slug: "wind-turbine-technician",
    title: "Wind Turbine Technician",
    timeline: { threeYear: 15, fiveYear: 25, sevenYear: 35 },
    metrics: {
      routineAutomation: { score: 25, description: "Monitoring is remote but maintenance requires human presence." },
      complexAutomation: { score: 15, description: "Climbing and repairs cannot be automated." },
      positionDemand: { score: 35, description: "Fastest-growing occupation as renewable energy expands." },
      wagePressure: { score: 10, description: "High demand maintains strong wages." },
      reskillUrgency: { score: 20, description: "Field is growing; skills are in demand." }
    },
    summary: "Wind turbine technology is one of the fastest-growing professions. The work is inherently hands-on, requiring climbing and physical maintenance that cannot be automated. Renewable energy expansion ensures strong long-term demand.",
    tips: ["Get certified through wind energy training programs", "Develop expertise in specific turbine manufacturers", "Consider offshore wind for higher pay opportunities", "Build skills in predictive maintenance technology"]
  }
]

export function getJobBySlug(slug: string): JobAnalysis | undefined {
  return jobs.find(job => job.slug === slug)
}

export function getAllJobSlugs(): string[] {
  return jobs.map(job => job.slug)
}

export function getRelatedJobs(slug: string, count: number = 4): JobAnalysis[] {
  const currentJob = getJobBySlug(slug)
  if (!currentJob) return []

  // Find jobs with similar 5-year automation risk but lower risk (safer alternatives)
  const currentRisk = currentJob.timeline.fiveYear

  return jobs
    .filter(job => job.slug !== slug)
    .map(job => ({
      job,
      // Prefer jobs with lower risk, but also consider similarity
      score: Math.abs(job.timeline.fiveYear - currentRisk) + (job.timeline.fiveYear < currentRisk ? -20 : 10)
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map(item => item.job)
}
