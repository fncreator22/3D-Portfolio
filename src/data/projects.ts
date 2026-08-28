import { Project, RoleExperience, SkillDomain } from "@/lib/types";

export const PROJECTS: Project[] = [
  {
    idx: 1,
    slug: "lato-validation-framework",
    cat: "AI / Agentic Infrastructure",
    title: "LATO Validation Framework",
    tagline: "Local-first multi-agent task orchestrator with real-time WebSocket token streaming, permission gating, and empirical action verification.",
    desc: "Local-first multi-agent task orchestrator with real-time WebSocket token streaming, permission gating, and empirical action verification.",
    problem: "Agent frameworks that only log what happened after the fact make debugging a multi-agent pipeline slow, and give no way to stop a bad action before it runs.",
    approach: "Built a local-first orchestrator on FastAPI and Ollama, streaming every agent's reasoning and tool calls over WebSocket to a ReactFlow graph in real time, with a permission gate in front of every proposed action.",
    outcome: "The result is a pipeline that runs almost entirely offline, holds 99.4% uptime, and turned regression testing that used to take hours into a 3.5 minute run.",
    metrics: [
      "99.4% pipeline uptime",
      "Regression testing: hours → 3.5 mins",
      "500k+ daily tool calls"
    ],
    tech: ["FastAPI", "Ollama", "WebSocket", "ReactFlow", "Python", "TypeScript"],
    gh: "https://github.com/fncreator22/lato-validation",
    live: null,
    image: "/images/center.jpg",
    gallery: ["/images/center.jpg", "/images/top_right.jpg", "/images/left.jpg"],
    featured: true
  },
  {
    idx: 2,
    slug: "sentinel-model-context-protocol",
    cat: "Agentic AI / Protocol Engineering",
    title: "Sentinel Model Context Protocol",
    tagline: "Three-stage safety guardrail agent for LLM coding assistants (Claude Desktop, Cursor, CodeX), shipped as a plug-and-play MCP plugin.",
    desc: "Three-stage safety guardrail agent for LLM coding assistants (Claude Desktop, Cursor, CodeX), shipped as a plug-and-play MCP plugin.",
    problem: "LLM coding assistants can propose file edits, shell commands, and network calls directly — and most setups have nothing standing between the model's suggestion and its execution.",
    approach: "Designed Sentinel as a three-stage review gateway that sits in the Model Context Protocol path between an agent and its execution environment, scoring and gating every proposed action before Claude Code, Cursor, or CodeX are allowed to run it.",
    outcome: "Across 100k test payloads Sentinel logged zero unauthorized escapes, while holding gateway latency under 5ms across 40+ concurrent agent registries — safe without being slow enough to get disabled.",
    metrics: [
      "Zero unauthorized escapes / 100k payloads",
      "<5ms gateway latency",
      "40+ concurrent agent registries"
    ],
    tech: ["Python", "FastAPI", "scikit-learn", "Model Context Protocol"],
    gh: "https://github.com/fncreator22/sentinel-mcp",
    live: "https://sentinel-landing-azure.vercel.app/",
    image: "/images/center.jpg",
    gallery: ["/images/center.jpg", "/images/top_left.jpg"],
    featured: true
  },
  {
    idx: 3,
    slug: "sign-language-detection-yolov8",
    cat: "Computer Vision Suite",
    title: "Sign Language Detection YOLOv8",
    tagline: "Real-time sign language gesture detection built on YOLOv8, tuned for edge deployment.",
    desc: "Real-time sign language gesture detection built on YOLOv8, tuned for edge deployment.",
    problem: "Real-time sign language recognition needs both high accuracy and low latency — most academic models hit one at the cost of the other, which makes them unusable for live conversation.",
    approach: "Trained and tuned a YOLOv8 detector for hand-gesture classes, then exported through ONNX Runtime to get a model light enough to run on edge GPU hardware without a cloud round-trip.",
    outcome: "The final pipeline holds 97.8% mAP@50 at 60 FPS on an edge GPU, with 35ms end-to-end latency from frame capture to label.",
    metrics: [
      "97.8% mAP@50",
      "60 FPS on edge GPU",
      "35ms end-to-end latency"
    ],
    tech: ["Python", "YOLOv8", "OpenCV", "PyTorch", "ONNX Runtime"],
    gh: "https://github.com/fncreator22/Sign-language-detection-yolov8",
    live: null,
    image: "/images/center.jpg",
    featured: true
  },
  {
    idx: 4,
    slug: "high-speed-object-detection-yolov8",
    cat: "Computer Vision Suite",
    title: "High-Speed Object Detection YOLOv8",
    tagline: "General-purpose object detection pipeline with DeepSORT multi-target tracking for high-throughput video.",
    desc: "General-purpose object detection pipeline with DeepSORT multi-target tracking for high-throughput video.",
    problem: "Detecting objects frame-by-frame isn't enough for video analytics — without consistent tracking, the same object gets treated as a new one every time it's briefly occluded.",
    approach: "Paired a YOLOv8 detector with DeepSORT tracking on a CUDA-accelerated pipeline, exposed through FastAPI for batch video ingestion.",
    outcome: "The pipeline processes at 120 FPS in batch mode with a 94.2% Multi-Object Tracking Accuracy score and under 1% identity-switch rate.",
    metrics: [
      "94.2% MOTA",
      "120 FPS batch processing",
      "<1% ID switch rate"
    ],
    tech: ["Python", "YOLOv8", "DeepSORT", "CUDA", "FastAPI"],
    gh: "https://github.com/fncreator22/Object-detection-algorithm-YOLOv8",
    live: null,
    image: "/images/center.jpg"
  },
  {
    idx: 5,
    slug: "automated-thief-intrusion-detection-yolov11",
    cat: "Computer Vision Suite",
    title: "Automated Thief & Intrusion Detection YOLOv11",
    tagline: "Security and surveillance anomaly detection system built on YOLOv11 for real-time alerting.",
    desc: "Security and surveillance anomaly detection system built on YOLOv11 for real-time alerting.",
    problem: "Traditional motion-triggered surveillance alerts are noisy — false alarms from shadows, animals, or weather erode trust in the system until people stop responding to it.",
    approach: "Built an anomaly-detection layer on top of YOLOv11 that classifies intrusion-relevant behavior rather than raw motion, streaming verified alerts over WebSockets the moment a real event is confirmed.",
    outcome: "The system reaches a 98.9% true intrusion detection rate while cutting false alarms by 92%, with alerts firing in under a second.",
    metrics: [
      "98.9% true intrusion detection rate",
      "92% reduction in false alarms",
      "Sub-second alerting"
    ],
    tech: ["Python", "YOLOv11", "PyTorch", "OpenCV", "WebSockets"],
    gh: "https://github.com/fncreator22/Thief-detection-YOLOv11",
    live: null,
    image: "/images/center.jpg"
  },
  {
    idx: 6,
    slug: "ecg-signal-feature-extraction-classification",
    cat: "Computer Vision & Signal Processing",
    title: "ECG Signal Feature Extraction & Classification",
    tagline: "Signal-processing pipeline for extracting and classifying features from ECG data in real time.",
    desc: "Signal-processing pipeline for extracting and classifying features from ECG data in real time.",
    problem: "Raw ECG waveforms are noisy, and clinically useful features like R-peaks need to be extracted reliably enough to trust downstream classification.",
    approach: "Built a SciPy/NumPy signal-processing pipeline to isolate and extract R-peak and waveform features from 12-lead ECG data, with scikit-learn handling classification on top.",
    outcome: "The pipeline hits 99.1% R-peak detection accuracy on the MIT-BIH benchmark dataset while processing all 12 leads in real time at 1,000 samples/sec.",
    metrics: [
      "99.1% R-peak accuracy on MIT-BIH DB",
      "Real-time 12-lead processing",
      "1,000 samples/sec"
    ],
    tech: ["Python", "SciPy", "NumPy", "scikit-learn", "Matplotlib"],
    gh: "https://github.com/fncreator22/ECG-feature-extraction",
    live: null,
    image: "/images/center.jpg"
  },
  {
    idx: 7,
    slug: "career-os-platform",
    cat: "Full Stack / Productivity",
    title: "Career OS Platform",
    tagline: "Career management microservices suite — gateway, worker, credential vault, web client, and browser extension.",
    desc: "Career management microservices suite — gateway, worker, credential vault, web client, and browser extension.",
    problem: "Job searching means juggling resumes, applications, and credentials across a dozen disconnected tools with no single source of truth.",
    approach: "Architected a microservices suite — a gateway, background worker, credential vault, web client, and browser extension — so resume parsing, application tracking, and credentials all live behind one coherent system.",
    outcome: "Application tracking got 3.5x faster, the resume parser has run over 10,000 iterations in testing, and users rated the experience 4.8/5.",
    metrics: [
      "3.5x faster application tracking",
      "10,000+ resume parse iterations",
      "4.8/5 satisfaction score"
    ],
    tech: ["TypeScript", "Node.js", "Express", "React", "PostgreSQL"],
    gh: "https://github.com/fncreator22/career-os-web-client",
    live: null,
    image: "/images/center.jpg"
  },
  {
    idx: 8,
    slug: "examly-enterprise-assessment-system",
    cat: "Full Stack / EdTech",
    title: "Examly Enterprise Assessment System",
    tagline: "Enterprise LMS & assessment platform with SSR, RBAC, and isolated code evaluation for live exams.",
    desc: "Enterprise LMS & assessment platform with SSR, RBAC, and isolated code evaluation for live exams.",
    problem: "Live coding exams need to survive tens of thousands of concurrent submissions without leaking one candidate's code environment into another's, or crashing during finals week.",
    approach: "Built on TanStack Start for server-side rendering, with Supabase and PostgreSQL row-level security enforcing per-tenant RBAC, and isolated evaluation sandboxes handling code submissions on Cloudflare Workers.",
    outcome: "Examly now handles 25,000+ concurrent exam sessions with code submissions scoring in under 1.2 seconds and zero downtime at peak load.",
    metrics: [
      "25,000+ concurrent exam sessions",
      "<1.2s code submission speed",
      "Zero downtime at peak"
    ],
    tech: ["React 19", "TanStack Start", "Supabase", "PostgreSQL RLS", "Cloudflare Workers"],
    gh: "https://github.com/fncreator22/study-swift",
    live: "https://examy-hazel.vercel.app",
    image: "/images/center.jpg"
  },
  {
    idx: 9,
    slug: "nexware-enterprise-resource-planning",
    cat: "Enterprise Software",
    title: "Nexware Enterprise Resource Planning",
    tagline: "Modular SaaS ERP with a dynamic workflow builder, multi-tenant RBAC, and analytics dashboards.",
    desc: "Modular SaaS ERP with a dynamic workflow builder, multi-tenant RBAC, and analytics dashboards.",
    problem: "Off-the-shelf ERPs force every business into the same workflow shape; heavily customized ones become unmaintainable. Multi-branch operations need both flexibility and a single audit trail.",
    approach: "Built a modular ERP with a drag-configurable workflow builder, multi-tenant RBAC via PostgreSQL and Prisma, and analytics dashboards that roll up across entity branches.",
    outcome: "Audit discrepancies dropped 85%, monthly books close 4 days faster, and the system now runs across 50+ entity branches.",
    metrics: [
      "85% reduction in audit discrepancies",
      "Closed monthly books 4 days faster",
      "50+ entity branches"
    ],
    tech: ["React", "TypeScript", "Express", "PostgreSQL", "Prisma"],
    gh: "https://github.com/fncreator22/NexWare-ERP",
    live: "https://nex-ware-erp.vercel.app",
    image: "/images/center.jpg"
  },
  {
    idx: 10,
    slug: "split-money-financial-manager",
    cat: "Web & Mobile App",
    title: "Split Money Financial Manager",
    tagline: "Real-time group expense tracking and splitting with graph debt simplification.",
    desc: "Real-time group expense tracking and splitting with graph debt simplification.",
    problem: "Splitting group expenses honestly is easy; settling them efficiently is not — naive splitting produces far more repayments between people than actually necessary.",
    approach: "Modeled group debts as a graph and applied simplification to collapse chains of repayment into the minimum number of transactions, synced in real time across React and Firebase.",
    outcome: "Debt simplification cut the number of transactions per group by 60%, the app has processed over $500k in tracked expenses, and calculations resolve in under 100ms.",
    metrics: [
      "60% transaction reduction per group",
      "$500k+ expenses processed",
      "<100ms calculation"
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Node.js"],
    gh: "https://github.com/fncreator22/Split-Money-application",
    live: null,
    image: "/images/center.jpg"
  },
  {
    idx: 11,
    slug: "car-rental-fleet-booking-engine",
    cat: "Full Stack / E-Commerce",
    title: "Car Rental & Fleet Booking Engine",
    tagline: "Booking platform for vehicle rentals with Stripe payments and optimistic locking against double-booking.",
    desc: "Booking platform for vehicle rentals with Stripe payments and optimistic locking against double-booking.",
    problem: "Booking platforms that don't lock inventory correctly under concurrent requests end up double-booking the same vehicle to two customers at once.",
    approach: "Implemented optimistic locking around vehicle availability alongside Stripe for payments, with a search index built to stay fast across a large, fast-changing fleet.",
    outcome: "Double-booking was eliminated entirely, checkout conversion rose 30%, and search stays sub-second across 5,000+ vehicles.",
    metrics: [
      "100% double-booking elimination",
      "30% checkout conversion increase",
      "Sub-second search across 5,000+ vehicles"
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Stripe API"],
    gh: "https://github.com/fncreator22/Car-rental-and-tour-booking-website",
    live: null,
    image: "/images/center.jpg"
  },
  {
    idx: 12,
    slug: "legal-practice-consultation-portal",
    cat: "Web Design & Development",
    title: "Legal Practice & Consultation Portal",
    tagline: "Animated portfolio and consultation site built for a legal professional.",
    desc: "Animated portfolio and consultation site built for a legal professional.",
    problem: "A law practice's site is often its first impression, but heavy animation and legal-services sites don't usually mix well with accessibility or page speed.",
    approach: "Built an animated portfolio on React and Framer Motion with accessibility treated as a hard requirement from the start, not a pass at the end.",
    outcome: "Shipped at a 98/100 Lighthouse score and 100% WCAG AA compliance, and the client saw a 45% increase in consultation inquiries after launch.",
    metrics: [
      "98/100 Lighthouse score",
      "45% more consultation inquiries",
      "100% WCAG AA compliant"
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    gh: "https://github.com/fncreator22/Professional-Lawyer-Portfolio-Website",
    live: "https://professional-lawyer-portfolio-website.netlify.app/",
    image: "/images/center.jpg"
  },
  {
    idx: 13,
    slug: "multi-turn-conversational-ai-bot",
    cat: "AI / Agentic Systems",
    title: "Multi-Turn Conversational AI Bot",
    tagline: "GPT-4-powered customer service bot for Split Money app support with multi-turn state.",
    desc: "GPT-4-powered customer service bot for Split Money app support with multi-turn state.",
    problem: "Single-turn chatbots forget context the moment a conversation branches, which makes them useless for real support conversations that span several follow-up questions.",
    approach: "Built a GPT-4-powered support bot for the Split Money app that maintains conversational state across multiple turns, so follow-up questions stay grounded in what was already said.",
    outcome: "The bot handles multi-turn support conversations for Split Money users without losing context between messages.",
    metrics: [],
    tech: ["Python", "GPT-4", "OpenAI API"],
    gh: "https://github.com/fncreator22/Development-of-a-Multi-Turn-Conversational-AI-Bot",
    live: null,
    image: "/images/center.jpg"
  },
  {
    idx: 14,
    slug: "voice-notes-ai",
    cat: "AI / Agentic Systems",
    title: "Voice Notes AI",
    tagline: "AI-driven voice capture and processing pipeline built end-to-end in Python.",
    desc: "AI-driven voice capture and processing pipeline built end-to-end in Python.",
    problem: "Turning raw voice memos into structured, searchable notes usually means stitching together several disconnected tools.",
    approach: "Built a Python pipeline that captures and processes voice input end-to-end, from raw audio to structured notes, without a chain of external tools.",
    outcome: "A self-contained voice-to-notes pipeline that runs from capture to processed output in one system.",
    metrics: [],
    tech: ["Python"],
    gh: "https://github.com/fncreator22/voice-notes-ai",
    live: null,
    image: "/images/center.jpg"
  }
];

export const ROLES: RoleExperience[] = [
  {
    title: "Full Stack Engineer",
    company: "Fiverr — Freelance",
    meta: "Aug 2025 – Present · 1 yr 1 mo · Remote, Hyderabad",
    desc: "Built Sentinel, a three-stage guardrail agent for LLM-powered coding assistants. Sentinel sits between an LLM agent and its execution environment, reviewing every proposed action before it runs — integrating with Claude Code, Cursor, and CodeX.",
    skills: ["Program Creation", "MEAN Stack", "LLM Guardrails"]
  },
  {
    title: "Software Developer Intern",
    company: "Indian Oil Corporation Limited",
    meta: "Jun 2024 – Jul 2024 · 2 mos · On-site, Guwahati",
    desc: "Automated web-based operations for internal platforms using Python & Flask, and ran performance testing that improved efficiency and software stability at an enterprise scale.",
    skills: ["Web Development", "LLMOps", "Python", "Flask"]
  },
  {
    title: "App Developer Intern",
    company: "Down Town Venture Labs & Kareng Technologies",
    meta: "Jul 2023 – Aug 2023 · 2 mos · Hybrid, Guwahati",
    desc: "Developed cross-platform web and mobile applications using web technologies and Android frameworks, designing user-friendly, responsive interfaces in close collaboration with peers.",
    skills: ["Android Frameworks", "Cross-Platform Web", "UI/UX Design"]
  },
  {
    title: "Web Developer & SEO Manager",
    company: "Synar Technology — Part-time",
    meta: "May 2023 – Jul 2023 · 3 mos · Remote, Guwahati",
    desc: "Developed full-stack web applications using React.js & Flask, and implemented SEO strategies that increased web traffic by 15%.",
    skills: ["React.js", "Flask", "SEO Optimization"]
  }
];

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    idx: "01",
    name: "AI & Agentic Systems",
    items: [
      "Multi-Agent Orchestration",
      "LLM Orchestration",
      "FastAPI + Ollama",
      "OpenAI / Gemini APIs",
      "Model Context Protocol",
      "WebSocket Streaming"
    ]
  },
  {
    idx: "02",
    name: "Computer Vision & ML",
    items: [
      "YOLOv8 / YOLOv11",
      "OpenCV",
      "scikit-learn",
      "Object Detection",
      "Gesture Recognition",
      "Signal Processing"
    ]
  },
  {
    idx: "03",
    name: "Full Stack & Web",
    items: [
      "React 19",
      "Next.js",
      "TanStack Start",
      "TypeScript",
      "Node.js / Express",
      "Tailwind CSS",
      "shadcn/ui"
    ]
  },
  {
    idx: "04",
    name: "Architecture & DevOps",
    items: [
      "Microservices / Gateway",
      "RBAC + RLS",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Docker",
      "Cloudflare Workers"
    ]
  }
];
