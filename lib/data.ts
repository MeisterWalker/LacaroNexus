export const siteData = {
  owner: "John Paul Lacaron",
  location: "Cebu City, Philippines",
  role: "Full-Stack Developer | AI Integration Specialist",
  stackFocus: [
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "AI/LLM integrations"
  ],
  model: "claude-sonnet-4-6",
};

export const aiIntegrations = [
  {
    name: "Anthropic",
    description: "Claude Sonnet — AI chat, reasoning, text generation",
    logo: "/images/logos/anthropic.svg",
  },
  {
    name: "OpenAI",
    description: "GPT-4 — language model integrations",
    logo: "/images/logos/openai.svg",
  },
  {
    name: "Google Gemini",
    description: "Dual-model LLM — WriteRight AI Copilot",
    logo: "/images/logos/gemini.svg",
  },
  {
    name: "Groq",
    description: "Groq Vision — AI receipt verification, Moneyfest",
    logo: "/images/logos/groq.svg",
  },
  {
    name: "Vercel",
    description: "Deployment, hosting, and edge functions",
    logo: "/images/logos/vercel.svg",
  },
  {
    name: "Supabase",
    description: "PostgreSQL database and authentication",
    logo: "/images/logos/supabase.svg",
  },
];

export const currentlyBuilding = {
  label: "Portfolio v2",
  description: "Three.js node mesh + AI chat assistant",
  startedAt: "Apr 2026",
};

export const chatSystemPrompt = `You are a portfolio assistant for [John Paul Lacaron], a Full-Stack Developer and AI Integration Specialist based in Cebu City, Philippines.
Answer questions about him professionally and concisely.
Stay in character as a terminal assistant — short, precise responses.
Never invent information not listed below.

PROJECTS:
- Moneyfest Lending Platform: Full-stack fintech app, automated loan lifecycle, AI receipt verification via Groq Vision, ledger reconciliation, real-time dashboards. Stack: Next.js, PostgreSQL, Supabase, GSAP, Groq Vision.
- WriteRight AI Copilot: BPO writing assistant, dual-model LLM (Gemini), sentiment analysis, ELI5 simplifier, rich-text clipboard output. Stack: React, Node.js, Gemini API, Framer Motion.

CERTIFICATIONS:
- freeCodeCamp Full-Stack Web Development (Jan 2025)
- Google UX Design Professional Certificate (Mar 2025)
- AWS Cloud Practitioner (Jun 2025)
- Google DeepMind Generative AI for Developers (Aug 2025)
- Udemy PostgreSQL Advanced Techniques (Oct 2025)
- Bruno Simon Three.js Creative Development (Dec 2025)

SKILLS: Next.js, React, Node.js, TypeScript, PostgreSQL, Supabase, GSAP, Framer Motion, Three.js, Groq Vision, Gemini API, AWS, Tailwind CSS

AVAILABILITY: Open to freelance and full-time remote opportunities.
LOCATION: Cebu City, Philippines

If asked something outside this scope, respond:
"> INFORMATION UNAVAILABLE. CONTACT OPERATOR DIRECTLY."`;

export const projects = [
  {
    id: "moneyfest",
    title: "Moneyfest Lending Platform",
    description:
      "Full-stack fintech app with automated loan lifecycle management, AI receipt verification, ledger reconciliation, and real-time borrower dashboards.",
    techStack: ["Next.js", "PostgreSQL", "Supabase", "GSAP", "Groq Vision"],
  },
  {
    id: "writeright",
    title: "WriteRight AI Copilot",
    description:
      "BPO-focused AI writing assistant supporting dual-model LLM selection (Gemini), sentiment analysis, ELI5 simplifier, and rich-text clipboard output.",
    techStack: ["React", "Node.js", "Gemini API", "Framer Motion"],
  },
];

export const certifications = [
  {
    id: "FCC-FSW-2025-001",
    issuer: "freeCodeCamp",
    course: "Full-Stack Web Development",
    date: "Jan 2025",
  },
  {
    id: "GUXD-C-2025",
    issuer: "Google / Coursera",
    course: "Google UX Design Professional Certificate",
    date: "Mar 2025",
  },
  {
    id: "AWS-CLF-C02-2025",
    issuer: "Amazon Web Services",
    course: "AWS Cloud Practitioner",
    date: "Jun 2025",
  },
  {
    id: "GDM-GAID-2025",
    issuer: "Google DeepMind",
    course: "Generative AI for Developers",
    date: "Aug 2025",
  },
  {
    id: "UDP-PG-ADV-2025",
    issuer: "Udemy",
    course: "PostgreSQL Advanced Techniques",
    date: "Oct 2025",
  },
  {
    id: "TJS-J-2025",
    issuer: "Bruno Simon",
    course: "Three.js Creative Development",
    date: "Dec 2025",
  },
];

export const skills = [
  "Next.js",
  "React",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "GSAP",
  "Framer Motion",
  "Three.js",
  "Groq Vision",
  "Gemini API",
  "AWS",
  "Tailwind CSS",
  "REST APIs",
  "Git",
];
