import { Project, RoleExperience, SkillDomain } from "@/lib/types";

export const PROFILE = {
  name: "Sagar Mahajan",
  title: "AI Engineer | Agentic AI, Voice Agents & LLM Guardrails | Full-Stack: Next.js, TypeScript, Python/FastAPI",
  roles: [
    "AI Engineer",
    "Agentic Systems Architect",
    "Voice AI Engineer",
    "Full-Stack Developer"
  ],
  location: "Greater Hyderabad Area, India",
  email: "sagar@sagarmahajan.cloud",
  linkedin: "https://www.linkedin.com/in/sagar-mahajanofficial",
  github: "https://github.com/fncreator22",
  x: "https://x.com/sr2mahajan",
  xHandle: "@sr2mahajan",
  domain: "https://sagarmahajan.cloud",
  resumeUrl: "/resume.pdf",
  summary:
    "AI engineer who builds agents that make decisions, with around two years across freelance client delivery and internships. Ships agentic systems end to end: a three-stage LLM guardrail agent packaged as an MCP plugin and adopted inside Claude Desktop, Cursor and Codex, multilingual voice agents, and full-stack AI products for 10+ clients. Comfortable owning a feature from prompt and tool design through deployment and evaluation. Looking for an early-stage team where I can build AI-native product.",
  education: {
    degree: "Bachelor of Technology, Computer Science & Engineering",
    school: "Assam Down Town University, Guwahati, India",
    period: "Sep 2021 - Jul 2025"
  },
  certifications: [
    "Project Planning: Putting It All Together",
    "JavaScript",
    "Python",
    "Programming for Everybody (Getting Started with Python)",
    "Prompt Engineering for ChatGPT"
  ]
};

export const PROJECTS: Project[] = [
  {
    idx: 1,
    slug: "sentinel-mcp-guardrail",
    cat: "AI, LLM & Agentic Systems",
    title: "Sentinel: MCP Guardrail Agent",
    tagline: "A safety layer that reviews every AI agent action before it runs.",
    desc: "Sentinel sits between an LLM coding agent (Claude Code, Cursor, CodeX) and its execution environment, reviewing every proposed action before it runs. It uses a three-stage pipeline: a rules engine, a self-trained TF-IDF + Logistic Regression classifier (76.3% cross-validation accuracy on 828 hand-labeled examples), and a final LLM review pass to block destructive commands, flag scope creep, and keep a full audit trail. Ships as an MCP plugin with both stdio and SSE transport support, integrating directly into engineers' daily workflow across Claude Desktop, Cursor, and CodeX.",
    problem: "LLM coding assistants can propose file edits, shell commands, and network calls directly, and most setups have nothing standing between the model's suggestion and its execution, exposing developer environments to destructive actions.",
    approach: "Engineered a 3-stage validation pipeline: deterministic rules filter, self-trained TF-IDF + Logistic Regression statistical classifier, and an asynchronous LLM contextual review pass in the MCP protocol layer.",
    outcome: "Logged zero unauthorized escapes across 100k test payloads with under 5ms gateway check latency, and verified 76.3% 5-fold cross-validation accuracy across 828 hand-labeled edge cases.",
    metrics: [
      "76.3% CV classifier accuracy (828 hand-labeled examples)",
      "Zero unauthorized escapes / 100k test payloads",
      "<5ms gateway check latency",
      "Dual stdio & SSE transport support"
    ],
    tech: ["Python", "FastAPI", "scikit-learn", "Ollama", "Model Context Protocol", "Docker", "SQLite"],
    gh: "https://github.com/fncreator22/sentinel-mcp",
    live: "https://sentinel-landing-azure.vercel.app/",
    image: "/images/projects/sentinel-live-reviews.png",
    gallery: ["/images/projects/sentinel-live-reviews.png", "/images/projects/lato-agent-pipeline.png"],
    featured: true
  },
  {
    idx: 2,
    slug: "vaniflow-multilingual-voice-ai",
    cat: "AI Automation & Voice AI",
    title: "VaniFlow: Autonomous Multilingual Voice Workforce",
    tagline: "Autonomous voice workforce calling clients in English, Hindi, and Telugu with native barge-in over Gemini 3.8 Live.",
    desc: "VaniFlow provisions autonomous AI voice employees capable of conducting real-time phone calls with zero walkie-talkie delay. Callers can speak in Telugu, Hindi, English, or code-switch naturally mid-sentence. Built on an AudioWorklet 16kHz PCM streaming pipeline through a Go WebSocket bridge into Gemini 3.8 Live with 24kHz audio return. Features true native barge-in where user interruptions immediately purge audio buffers, plus post-call automated CRM lead qualification, sentiment analysis, and calendar booking.",
    problem: "Traditional IVR systems and conversational voice bots suffer from high latency, rigid single-language prompts, unnatural turn-taking, and lack of real-time interruption handling.",
    approach: "Architected a low-latency pipeline with 16kHz browser AudioWorklet streaming, a Go WebSocket bridge to Gemini 3.8 Live, native barge-in packet cancellation, and automated post-call classification using Gemini 3.8 Flash.",
    outcome: "Achieved sub-200ms bidirectional voice latency with natural human-like turn taking, seamless Indic code-switching, and automated CRM record synchronization.",
    metrics: [
      "Sub-200ms bidirectional voice latency via Gemini 3.8 Live",
      "Multilingual code-switching (English, Hindi, Telugu)",
      "True native barge-in with instantaneous buffer drop",
      "Automated post-call CRM lead qualification"
    ],
    tech: ["Gemini 3.8 Live", "Gemini 3.8 Flash", "Go", "WebSockets", "AudioWorklet", "SQLite", "Tailwind CSS"],
    gh: "https://github.com/fncreator22/vaniflow-ai",
    live: null,
    image: "/images/projects/vaniflow-voice-ai.png",
    gallery: ["/images/projects/vaniflow-voice-ai.png", "/images/projects/agentic-sales-call.png"],
    featured: true
  },
  {
    idx: 3,
    slug: "browserpilot-autonomous-web-agent",
    cat: "AI, LLM & Agentic Systems",
    title: "BrowserPilot: Autonomous Web Agent",
    tagline: "An enterprise-grade autonomous web agent that clicks, fills, and verifies.",
    desc: "BrowserPilot is an autonomous browser-automation platform powered by Gemini 2.5 Flash reasoning and real Playwright browser sandboxes. It plans a task, validates the plan against a security policy (domain whitelist, no arbitrary code injection), executes it through 8 canonical browser tools, and verifies the result with bounded retry recovery. Originally built as a multi-source job-discovery engine scraping LinkedIn, Y Combinator, and Indeed with 100% verified application URLs and 0% hallucinated listings, now generalized into a full autonomous web-agent platform with multi-tenancy, rate limiting, and Docker Compose one-command deployment.",
    problem: "Most AI browser tools hallucinate URLs or break when interacting with dynamic single-page applications and complex DOM states.",
    approach: "Paired Gemini 2.5 Flash reasoning with real Playwright headless browser sandboxes, bounded retry loops, BullMQ task queues, and strict security policy gating.",
    outcome: "Delivered 100% verified URLs with 0% hallucination rate, cutting manual web search and workflow execution time by over 95%.",
    metrics: [
      "100% verified URLs (0% hallucinated listings)",
      "95%+ reduction in manual research time",
      "8 canonical browser execution tools",
      "Gemini 2.5 Flash + Playwright headless sandbox"
    ],
    tech: ["TypeScript", "Next.js 16", "Playwright", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Gemini API", "Docker"],
    gh: "https://github.com/fncreator22/browserpilot",
    live: "https://browserpilot-iota.vercel.app",
    image: "/images/projects/browserpilot-live-execution.png",
    gallery: ["/images/projects/browserpilot-live-execution.png", "/images/projects/careerflow-pipeline.png"],
    featured: true
  },
  {
    idx: 4,
    slug: "daybook-offline-productivity-os",
    cat: "Mobile & On-Device Intelligence",
    title: "Daybook: Offline-First Personal Productivity OS",
    tagline: "100% offline-first Android productivity workspace with on-device NLP, OCR, and CadenceEngine.",
    desc: "Daybook is an offline-first Android personal operating system engineered with Jetpack Compose, Material 3, and SQLCipher hardware-backed database encryption. Designed with a strict zero-cloud architectural invariant: all tasks, work journals, digital passes, and notes stay entirely on-device. Features CadenceEngine for deterministic recurring task scheduling, on-device OCR for document parsing, an in-app morning briefing audio synthesizer, and WhatsApp notification triage.",
    problem: "Modern productivity apps leak sensitive notes to cloud servers, require continuous internet connections, and consume excessive battery with background telemetry.",
    approach: "Engineered a private Android architecture with SQLCipher encrypted storage, Room ORM, CadenceEngine reboot-resilient alarm dispatching, on-device ML Kit OCR, and Jetpack Compose liquid glass UI.",
    outcome: "Passed 197 automated test suites with 0 network permissions required, zero battery drain on idle, and instant local search across encrypted logs.",
    metrics: [
      "100% offline zero-cloud invariant with SQLCipher encryption",
      "197 passed automated unit and integration tests",
      "CadenceEngine scheduling with Android reboot resilience",
      "On-device OCR parsing and NLP conversational logger"
    ],
    tech: ["Kotlin", "Jetpack Compose", "Material 3", "SQLCipher", "Android SDK 36", "Room ORM", "On-Device OCR"],
    gh: "https://github.com/fncreator22/Daybook-app",
    live: null,
    image: "/images/projects/daybook-productivity-os.jpg",
    gallery: ["/images/projects/daybook-productivity-os.jpg"],
    featured: true
  },
  {
    idx: 5,
    slug: "campaigncraft-ai-platform",
    cat: "Multimodal AI & Media Systems",
    title: "CampaignCraft: Multimodal AI Creative Campaign Studio",
    tagline: "Multimodal campaign generation and post-production studio powered by Gemini 3.8 Flash, Lyria 3.5, and FFmpeg.",
    desc: "CampaignCraft automates commercial advertising production from text prompt to finished video. It orchestrates Gemini 3.8 Flash for creative concepting and narrative arcs, Nano Banana 2 Lite for multi-scene storyboard generation, Gemini Omni 1.1 Flash for video rendering, and Lyria 3.5 for synchronized background scores. An asynchronous FFmpeg post-production media engine runs server-side to composite video tracks, apply audio ducking, and burn subtitles.",
    problem: "Creating high-impact advertising video campaigns requires disparate creative directors, storyboard artists, video editors, and audio mixers, leading to weeks of turnaround time and high production overhead.",
    approach: "Constructed an automated production state machine uniting Google Gemini multimodal models with a Go/Node FFmpeg media compositing engine, real-time render queue, and interactive timeline editor.",
    outcome: "Reduced commercial video campaign creation time from 2 weeks to under 60 seconds, outputting production-ready 16:9 and 9:16 advertising packages.",
    metrics: [
      "End-to-end automated narrative script to video compositing",
      "Gemini Omni 1.1 Flash video + Lyria 3.5 music synthesis",
      "Server-side FFmpeg timeline mixing and audio ducking",
      "Sub-60s multi-scene campaign package rendering"
    ],
    tech: ["Gemini 3.8 Flash", "Gemini Omni 1.1", "Lyria 3.5", "FFmpeg", "Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
    gh: "https://github.com/fncreator22/campaigncraft-ai-platform",
    live: null,
    image: "/images/projects/campaigncraft-ai-platform.png",
    gallery: ["/images/projects/campaigncraft-ai-platform.png"],
    featured: true
  },
  {
    idx: 6,
    slug: "kindred-agentic-dating",
    cat: "AI, LLM & Agentic Systems",
    title: "Kindred: Autonomous Multi-Agent Social Simulation Network",
    tagline: "Multi-agent network simulating structured eight-beat dates and calculating symmetric mutual compatibility rankings.",
    desc: "Kindred replaces superficial swiping apps with autonomous AI agents that date on people's behalf. Each agent is synthesized strictly from two verifiable public sources (LinkedIn for professional craft and Instagram for sensory taste) with verbatim provenance citations. Agents simulate structured eight-beat dates covering icebreakers, values probes, friction tests, and playful banter. Following the date, both agents enter private evaluation chambers to record quantitative scores and qualitative reasoning, feeding a symmetric mutual consensus ranking engine.",
    problem: "Traditional dating services suffer from high user fatigue, mismatched intentions, superficial judgment, and conversational burnout.",
    approach: "Built with Next.js 16 and Turbopack, featuring a Profile Analyst Agent with strict two-source constraints, an eight-beat dialogue simulation harness, and a mathematical mutual compatibility model.",
    outcome: "Eliminated manual swiping fatigue, providing users with transparent compatibility dossiers backed by simulated conversation transcripts and mutual consensus scores.",
    metrics: [
      "Two-source verified agent synthesis with provenance citations",
      "Structured eight-beat autonomous date simulation harness",
      "Dual private evaluation chambers with quantitative scoring",
      "Symmetric mutual consensus compatibility ranking algorithm"
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Turbopack", "LLM Agent Orchestration"],
    gh: "https://github.com/fncreator22/agentic-datingp-site",
    live: null,
    image: "/images/projects/kindred-agentic-dating.png",
    gallery: ["/images/projects/kindred-agentic-dating.png"],
    featured: true
  },
  {
    idx: 7,
    slug: "examly-enterprise",
    cat: "Full-Stack & EdTech Platforms",
    title: "Examly Enterprise: LMS & Assessment Engine",
    tagline: "A commercial-grade LMS and exam engine built for scale.",
    desc: "A high-performance Learning Management and Assessment platform for schools and corporate training. Features a rules-based grading engine (cut grading time 75% for 200+ users), a token-wallet monetization system (1 token = ₹10, tiered Free/Paid/Premium content access), live leaderboards powered by a materialized PostgreSQL view, and Supabase Auth + Row-Level Security for zero-trust access control. Deployed with Server-Side Rendering for instant page loads and edge deployment via Cloudflare Workers.",
    problem: "Traditional LMS portals suffer from slow server-side page loads, high grading latency for instructors, and brittle authorization models that leak premium content.",
    approach: "Built with React 19 and TanStack Start (SSR) on Cloudflare Workers, paired with a deterministic auto-grading engine, token wallet monetization, and Supabase PostgreSQL Row-Level Security.",
    outcome: "Cut assessment grading time by 75% for over 200 concurrent users, achieved sub-50ms SSR edge delivery, and enforced zero-trust content gating.",
    metrics: [
      "Grading time cut by 75% for 200+ concurrent users",
      "Token-wallet monetization (1 token = ₹10)",
      "Sub-50ms SSR edge delivery via Cloudflare Workers",
      "Zero-trust PostgreSQL Row-Level Security (RLS)"
    ],
    tech: ["React 19", "TypeScript", "TanStack Start", "Supabase", "PostgreSQL", "Tailwind CSS", "Cloudflare Workers"],
    gh: "https://github.com/fncreator22/study-swift",
    live: "https://examy-hazel.vercel.app",
    image: "/images/projects/examly-lms-dashboard.png",
    gallery: ["/images/projects/examly-lms-dashboard.png"],
    featured: true
  },
  {
    idx: 8,
    slug: "nexware-erp",
    cat: "Full-Stack & SaaS Platforms",
    title: "NexWare ERP: Multi-Tenant Business OS",
    tagline: "A multi-tenant SaaS ERP unifying workspace, inventory, and billing.",
    desc: "NexWare ERP centralizes business operations including inventory, warehouse management, billing and invoicing, workforce management, and analytics into one platform. Built with a four-tier role hierarchy (Super Admin to Admin to Manager to Employee) and a permission-driven access engine, plus an integrated tax-calculation and invoicing system designed to replace multiple disconnected business tools with one unified system.",
    problem: "Growing businesses struggle with fragmented tooling across separate inventory, workforce, and invoicing apps, leading to data synchronization failures and manual bookkeeping delays.",
    approach: "Designed a centralized multi-tenant architecture with a granular 4-tier RBAC authorization model, real-time MongoDB aggregations, and an automated tax computation engine with Chart.js analytics.",
    outcome: "Unified 5 separate operational departments into one system, eliminating manual invoicing delays and giving managers instant real-time financial telemetry.",
    metrics: [
      "4-tier role hierarchy (Super Admin, Admin, Manager, Employee)",
      "Unified inventory, billing, and workforce management",
      "Real-time automated tax and invoicing engine",
      "Interactive Chart.js executive telemetry"
    ],
    tech: ["Python", "FastAPI", "JavaScript", "MongoDB", "Chart.js", "Tailwind CSS"],
    gh: "https://github.com/fncreator22/NexWare-ERP",
    live: "https://nex-ware-erp.vercel.app",
    image: "/images/projects/nexware-erp-dashboard.png",
    gallery: ["/images/projects/nexware-erp-dashboard.png"],
    featured: false
  },
  {
    idx: 9,
    slug: "lato-validation-framework",
    cat: "AI, LLM & Agentic Systems",
    title: "Local-First Multi-Agent Task Orchestrator",
    tagline: "A local-first system where multiple AI agents coordinate work in real time.",
    desc: "An industrial-grade, local-first multi-agent orchestrator with real-time WebSocket token streaming, permission gating between agents, and empirical action verification so agents do not just claim success, the system checks. Built for scenarios where sensitive workflows need to run entirely offline without cloud dependency.",
    problem: "Cloud-dependent agent frameworks compromise data privacy and lack empirical verification to ensure that multi-agent subtasks actually succeed.",
    approach: "Constructed a local-first FastAPI and Ollama runtime streaming tokens over WebSockets to a dynamic ReactFlow graph, enforcing permission gates before any tool call executes.",
    outcome: "Achieved 100% offline multi-agent execution with 99.4% pipeline uptime, turning regression testing from hours into a 3.5 minute automated run.",
    metrics: [
      "100% local/offline execution via Ollama",
      "Real-time WebSocket token streaming",
      "Interactive ReactFlow agent graph visualizer",
      "Empirical action and permission gating"
    ],
    tech: ["Python", "FastAPI", "Ollama", "ReactFlow", "TypeScript", "WebSocket"],
    gh: "https://github.com/fncreator22/lato-validation",
    live: null,
    image: "/images/projects/lato-agent-pipeline.png",
    gallery: ["/images/projects/lato-agent-pipeline.png"],
    featured: false
  },
  {
    idx: 10,
    slug: "eldersphere-care-network",
    cat: "Full-Stack & HealthTech",
    title: "ElderSphere: Care Coordination Network",
    tagline: "A secure care-coordination network for elderly residents.",
    desc: "A care management platform with three role-based portals (family, caregiver, and admin) plus Razorpay-powered donation processing with real-time payment tracking for contributors funding resident care.",
    problem: "Senior living homes struggle to keep family members updated on resident health while securely tracking donation funding and caregiver shift logs.",
    approach: "Engineered three decoupled role portals (Family, Caregiver, Admin) with end-to-end Razorpay payment webhook reconciliation and MongoDB audit logging.",
    outcome: "Streamlined resident care coordination, increased transparent family engagement, and automated donation receipts with zero bookkeeping errors.",
    metrics: [
      "3 role-based portals (Family, Caregiver, Admin)",
      "Automated Razorpay donation processing",
      "Real-time payment tracking and audit logs",
      "Responsive mobile-first care dashboard"
    ],
    tech: ["Next.js", "React", "Node.js", "Express.js", "MongoDB", "Razorpay API", "Tailwind CSS"],
    gh: "https://github.com/fncreator22",
    live: null,
    image: "/images/projects/eldersphere-dashboard.png",
    gallery: ["/images/projects/eldersphere-dashboard.png"],
    featured: false
  },
  {
    idx: 11,
    slug: "agentic-sales-call-center",
    cat: "AI Automation & Voice AI",
    title: "Agentic Sales Call Center",
    tagline: "A voice-AI agent that qualifies leads over the phone, end to end.",
    desc: "A voice-AI lead-qualification system that pulls numbers from a Google Sheet, places outbound calls, and holds a human-like conversation. On genuine interest or a callback request, it fires WhatsApp confirmations to company and client, books a calendar slot, and logs every attempt to a tracking sheet.",
    problem: "Manual outbound lead qualification is labor-intensive, has high latency, and often fails to log call notes or schedule immediate callbacks.",
    approach: "Integrated Vapi Voice AI with n8n workflow automation, Google Sheets API for contact queues, Twilio WhatsApp API for instant messaging, and Google Calendar API for automated booking.",
    outcome: "Automated end-to-end outbound calling with sub-second voice latency, instant calendar booking, and 100% automated CRM record synchronization.",
    metrics: [
      "Autonomous outbound calling via Vapi Voice AI",
      "Instant WhatsApp confirmations via Twilio",
      "Automated Google Calendar appointment booking",
      "Real-time Google Sheets lead synchronization"
    ],
    tech: ["Vapi Voice AI", "n8n", "Google Calendar API", "Google Sheets API", "Twilio WhatsApp API"],
    gh: "https://github.com/fncreator22",
    live: null,
    image: "/images/projects/agentic-sales-call.png",
    gallery: ["/images/projects/agentic-sales-call.png"],
    featured: false
  },
  {
    idx: 12,
    slug: "multi-agent-portfolio-orchestration",
    cat: "AI & Financial Systems",
    title: "Multi-Agent Portfolio Orchestration",
    tagline: "An enterprise-grade hybrid portfolio platform with autonomous RAG-driven decisions.",
    desc: "A multi-agent hybrid portfolio management platform featuring an autonomous 3-stage RAG (Retrieval-Augmented Generation) pipeline, a confidence gate that decides when to escalate to an LLM, a dual-mode shell, direct broker API integration, and a full admin portal.",
    problem: "Financial decision systems often rely on static heuristics or hallucination-prone LLMs without deterministic verification or risk confidence gating.",
    approach: "Designed a 3-stage RAG retrieval engine with dynamic vector embeddings, confidence scoring thresholds for LLM escalation, and real-time broker execution APIs.",
    outcome: "Delivered deterministic, audited portfolio rebalancing recommendations with transparent provenance for every suggested asset allocation.",
    metrics: [
      "3-stage autonomous RAG pipeline",
      "Confidence-gated LLM escalation logic",
      "Direct broker API execution layer",
      "Dual-mode interactive terminal shell"
    ],
    tech: ["TypeScript", "Python", "RAG & Embeddings", "LLM Orchestration", "Broker APIs", "FastAPI"],
    gh: "https://github.com/fncreator22/Multi-Agent-Portfolio-Orchestration",
    live: null,
    image: "/images/projects/fintech-portfolio-rag.png",
    gallery: ["/images/projects/fintech-portfolio-rag.png"],
    featured: false
  },
  {
    idx: 13,
    slug: "applied-computer-vision-suite",
    cat: "Computer Vision & Signal Processing",
    title: "Applied Computer Vision Suite (YOLOv8 / YOLOv11)",
    tagline: "Real-time detection systems: from gesture control to surveillance anomaly detection.",
    desc: "A set of applied computer-vision pipelines: real-time gesture and object detection (YOLOv8), a security and surveillance anomaly-detection system (YOLOv11), and an ECG signal-processing pipeline extracting diagnostic features from waveform data.",
    problem: "Real-time edge vision requires high frame rates and low compute footprint, while medical waveform processing demands high feature fidelity.",
    approach: "Trained custom YOLOv8 and YOLOv11 models optimized via ONNX/TensorRT for 60 FPS edge inference, paired with SciPy/OpenCV signal processing algorithms for ECG waveform analysis.",
    outcome: "Achieved 60 FPS real-time detection with sub-35ms frame-to-prediction latency and automated diagnostic waveform feature extraction.",
    metrics: [
      "60 FPS real-time edge inference",
      "Sub-35ms frame-to-prediction latency",
      "YOLOv8 gesture & YOLOv11 anomaly detection",
      "Automated ECG waveform feature extraction"
    ],
    tech: ["OpenCV", "YOLOv8", "YOLOv11", "Python", "Signal Feature Extraction", "PyTorch"],
    gh: "https://github.com/fncreator22",
    live: null,
    image: "/images/projects/yolo-vision-suite.png",
    gallery: ["/images/projects/yolo-vision-suite.png"],
    featured: false
  },
  {
    idx: 14,
    slug: "split-money-conversational-ai",
    cat: "AI, LLM & Agentic Systems",
    title: "Multi-turn Conversational AI Bot (Split Money)",
    tagline: "A GPT-4-powered support bot handling real multi-turn conversations in production.",
    desc: "A GPT-4-powered customer service bot handling multi-turn conversation state, deployed in live production for the Split Money fintech app.",
    problem: "Customer support for split expenses and payment disputes suffers from high support ticket volumes and repetitive FAQ triage.",
    approach: "Engineered a stateful conversational engine on FastAPI and Redis with GPT-4 function calling, intent classification, and automated transaction ledger queries.",
    outcome: "Successfully resolved over 65% of user payment inquiries automatically without human operator intervention in live production.",
    metrics: [
      "Deployed in live fintech production",
      "Stateful multi-turn conversational memory",
      "Sub-second contextual response latency",
      "Automated intent routing and dispute triage"
    ],
    tech: ["Python", "GPT-4 API", "FastAPI", "Redis", "Prompt Engineering"],
    gh: "https://github.com/fncreator22",
    live: null,
    image: "/images/projects/split-money-chat.png",
    gallery: ["/images/projects/split-money-chat.png"],
    featured: false
  },
  {
    idx: 15,
    slug: "voice-notes-ai",
    cat: "AI & Audio Processing",
    title: "Voice Notes AI",
    tagline: "A Whisper-powered speech-to-text app for fast, searchable voice transcription.",
    desc: "A speech-to-text application powered by OpenAI's Whisper model, converting voice recordings into searchable, timestamped transcripts with export options.",
    problem: "Voice memos are quick to record but tedious to search, organize, and reference later without manual listening.",
    approach: "Integrated Whisper AI with client-side audio normalization, streaming chunk processing, automated punctuation, and fast vector keyword indexing.",
    outcome: "Delivered near-instant, high-accuracy timestamped transcripts with 1-click export to Markdown, JSON, and PDF.",
    metrics: [
      "Timestamped speech-to-text transcription",
      "OpenAI Whisper model integration",
      "Instant search and multi-format export (JSON/PDF/TXT)",
      "Noise-resilient audio pre-processing"
    ],
    tech: ["Python", "Whisper AI", "NLP", "FastAPI", "React", "TypeScript"],
    gh: "https://github.com/fncreator22/voice-notes-ai",
    live: null,
    image: "/images/projects/voice-notes-whisper.png",
    gallery: ["/images/projects/voice-notes-whisper.png"],
    featured: false
  },
  {
    idx: 16,
    slug: "career-os-auto-apply-engine",
    cat: "AI & Distributed Systems",
    title: "Auto-Apply Job Engine / Career OS",
    tagline: "An autonomous job-discovery and application pipeline.",
    desc: "An earlier system built around automated job discovery and application verification. Part of the broader Career OS microservices suite spanning 9 dedicated services (agent, browser extension, core API, web client, SDK, worker service, vault service, gateway service) designed as an end-to-end distributed system.",
    problem: "Applying to hundreds of job listings manually is repetitive, time-consuming, and prone to application tracking chaos.",
    approach: "Designed a 9-microservice architecture with a browser extension client, PostgreSQL state store, worker task queues, and automated form verification.",
    outcome: "Demonstrated full end-to-end automated job discovery, credential injection, and application status logging across multiple major job portals.",
    metrics: [
      "9-microservice distributed architecture",
      "Autonomous multi-source job verification",
      "Custom browser extension and worker services",
      "Secure credential vault and token gateway"
    ],
    tech: ["Python", "TypeScript", "PostgreSQL", "PLpgSQL", "Microservices", "Docker", "Redis"],
    gh: "https://github.com/fncreator22/browserpilot",
    live: null,
    image: "/images/projects/careerflow-pipeline.png",
    gallery: ["/images/projects/careerflow-pipeline.png"],
    featured: false
  }
];

export const ROLES: RoleExperience[] = [
  {
    title: "AI Native Software Engineer",
    company: "Independent Consultant",
    meta: "May 2025 - Present (1 yr 6 mos) · Greater Hyderabad Area · Remote",
    desc: "Owned scoping through launch on full-stack and AI-integrated builds for 10+ clients across React/Next.js and Python/FastAPI/Flask stacks. Built an agent that raised client productivity by 60% and cut costs by 20%. Architected Sentinel, a three-stage LLM safety-guardrail agent (rules engine, self-trained classifier at 76% cross-validation accuracy, final review pass) shipped as an MCP plugin used in Claude Desktop, Cursor, and CodeX. Built an Agentic Sales Call Center on Vapi, n8n, Twilio, and Google Calendar/Sheets that reads caller intent mid-conversation and fires bookings, WhatsApp alerts, and logging.",
    skills: ["Next.js", "React 19", "Python", "FastAPI", "Gemini Live", "Go", "Ollama", "Model Context Protocol", "Supabase", "Docker"]
  },
  {
    title: "Software Engineer Intern",
    company: "Indian Oil Corporation Limited (IOCL)",
    meta: "Jun 2024 - Jul 2024 (2 mos) · Guwahati · On-site",
    desc: "Trained and shipped a linear regression forecasting model (scikit-learn, pandas) as lead contributor, sharpening forecast accuracy on live equity market data through iterative feature engineering. Constructed an end-to-end data pipeline covering ingestion, cleaning, and feature preparation that fed the model into a live Flask dashboard used for daily decision-making. Automated manual back-office workflows with custom Python and Flask scripts, shrinking processing time by 40% across a multi-person operations team. Presented technical trade-offs and solution design directly to internal stakeholders, backing recommendations with clear, data-driven reporting.",
    skills: ["Python", "scikit-learn", "pandas", "Flask", "Linear Regression", "Data Pipelines", "Automation"]
  },
  {
    title: "Web Developer, promoted to Associate Software Engineer",
    company: "Synar Technology",
    meta: "May 2023 - Nov 2023 (7 mos) · Guwahati · Remote",
    desc: "Joined as a web developer and was promoted to associate software engineer on the same engagement. Built full-stack web applications with a React.js frontend and Flask backend from requirements to deployment. Lifted organic traffic 15% and trimmed front-end render time 20%.",
    skills: ["React.js", "Flask", "JavaScript", "Technical SEO", "Performance Tuning", "REST APIs"]
  },
  {
    title: "App & Web Developer Intern",
    company: "Kareng Technologies",
    meta: "Jul 2023 - Aug 2023 (2 mos) · Guwahati · Hybrid",
    desc: "One-month internship running alongside my Synar work: designed two cross-platform web and mobile applications with a mobile-first approach across HTML5, CSS3, and JavaScript. Integrated RESTful API functionality and resolved bugs continuously to keep UX reliable and stable.",
    skills: ["HTML5", "CSS3", "JavaScript", "Mobile-First Design", "RESTful APIs", "Cross-Platform UI"]
  }
];

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    idx: "01",
    name: "Languages & Frontend",
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Go",
      "Kotlin",
      "SQL",
      "React (18/19)",
      "Next.js (incl. Next.js 16)",
      "Jetpack Compose",
      "Tailwind CSS",
      "shadcn/ui",
      "Chart.js",
      "Vite"
    ]
  },
  {
    idx: "02",
    name: "Backend & Data",
    items: [
      "Node.js",
      "FastAPI",
      "Express.js",
      "Flask",
      "REST APIs",
      "PostgreSQL (Row-Level Security)",
      "Tenant Isolation",
      "MongoDB",
      "Supabase (Auth + RLS)",
      "Cloudflare Workers",
      "TanStack Start (SSR)",
      "Prisma",
      "SQLCipher",
      "Room ORM"
    ]
  },
  {
    idx: "03",
    name: "AI, LLM & Agentic Systems",
    items: [
      "Gemini 3.8 Live & Flash",
      "GPT-4 API",
      "Ollama (Local LLM)",
      "Model Context Protocol (MCP)",
      "Autonomous Multi-Agent Orchestration",
      "Voice AI (English, Hindi, Telugu)",
      "Native Barge-In Audio Streaming",
      "Coding Agents (Claude Code, Cursor, CodeX)",
      "Prompt Engineering",
      "LLM Guardrails & Evals",
      "Retrieval-Augmented Generation (RAG)",
      "WebSocket Streaming",
      "Vapi Voice AI",
      "n8n"
    ]
  },
  {
    idx: "04",
    name: "Applied Machine Learning",
    items: [
      "scikit-learn",
      "TF-IDF",
      "Logistic Regression",
      "Linear Regression",
      "Model Training & Cross-Validation",
      "pandas",
      "NLP Fundamentals",
      "On-Device OCR & ML Kit"
    ]
  },
  {
    idx: "05",
    name: "Computer Vision & Multimodal Media",
    items: [
      "OpenCV",
      "YOLOv8",
      "YOLOv11",
      "Real-Time Object/Gesture Detection",
      "FFmpeg Audio/Video Post-Production",
      "Lyria 3.5 Audio Synthesis",
      "Signal Feature Extraction (ECG)"
    ]
  },
  {
    idx: "06",
    name: "Infrastructure & Tools",
    items: [
      "Docker",
      "Git",
      "CI/CD",
      "Payments (Razorpay & Stripe)",
      "Twilio WhatsApp & Telephony APIs",
      "Google Calendar & Sheets APIs",
      "Playwright",
      "BullMQ",
      "Redis"
    ]
  }
];

export const CATEGORIES = [
  "All",
  "AI, LLM & Agentic Systems",
  "AI Automation & Voice AI",
  "Mobile & On-Device Intelligence",
  "Multimodal AI & Media Systems",
  "Full-Stack & SaaS Platforms",
  "Full-Stack & EdTech Platforms",
  "Full-Stack & HealthTech",
  "AI & Financial Systems",
  "Computer Vision & Signal Processing",
  "AI & Audio Processing",
  "AI & Distributed Systems"
];
