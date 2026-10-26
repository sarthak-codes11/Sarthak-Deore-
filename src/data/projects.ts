export interface Project {
  id: string;
  title: string;
  category: "AI & Agents" | "Full-Stack" | "Machine Learning" | "Systems & Architecture";
  subtitle: string;
  description: string;
  image: string;
  aspectRatio?: "square" | "landscape" | "standard";
  year: string;
  role: string;
  status: "Completed" | "Active" | "Research";
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  metrics?: { label: string; value: string }[];
  architecture?: string[];
  keyHighlights: string[];
  color: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "dvr-forensics",
    title: "TraceX — Multi-Vendor DVR/NVR Forensics Platform",
    category: "Systems & Architecture",
    subtitle: "Automated video stream carving, forensic integrity hashing & multi-vendor CCTV recovery",
    description:
      "A production-grade digital video forensics platform developed to carve and recover surveillance footage from corrupted or proprietary DVR/NVR hard drives across leading manufacturers (Hikvision, Dahua, CP Plus). Features HIKBTREE filesystem parsing, unallocated-space carving, and an AI detector for collision and sudden-deceleration heuristics.",
    image: "/projects/dvrforensics.png",
    aspectRatio: "standard",
    year: "2024",
    role: "Team Lead — ByteForce",
    status: "Completed",
    githubUrl: "https://github.com/byteforce101-ops/multi-vendor-dvr-forensics",
    liveUrl: "https://trace-x-six.vercel.app/",
    technologies: ["Python 3.12", "FastAPI", "React", "TypeScript", "SQLAlchemy", "FFmpeg", "YOLOv8"],
    metrics: [
      { label: "Supported Vendors", value: "Hikvision, Dahua, CP Plus" },
      { label: "Integrity", value: "SHA-256 Chain of Custody" },
      { label: "Release", value: "v1.0.1 Live" },
      { label: "Live Deployment", value: "trace-x-six.vercel.app" }
    ],
    architecture: [
      "Raw disk binary stream carver identifying proprietary frame headers (HIKBTREE / MPEG-PS)",
      "Automated video container restitching pipeline with zero-recompression FFmpeg normalization",
      "FastAPI & SQLAlchemy backend managing forensic case files and chain-of-custody ledgers",
      "AI video analytics engine combining YOLO and sudden deceleration heuristics"
    ],
    keyHighlights: [
      "Live interactive web dashboard deployed on Vercel with case file management",
      "Recovers fragmented and deleted surveillance video clips without metadata indices",
      "Generates cryptographically signed forensic audit logs admissible in investigations",
      "High-throughput multi-threaded parsing for large multi-terabyte CCTV storage images"
    ],
    color: "#0284C7",
    gradient: "from-cyan-600 to-blue-950"
  },
  {
    id: "f1podiumpredictor",
    title: "F1 Race Prediction & Visualization System",
    category: "Machine Learning",
    subtitle: "End-to-end ML prediction engine & telemetry replay simulation for Formula 1 races",
    description:
      "A full-stack sports analytics platform that ingests official FastF1 timing and telemetry data to predict race winners and podium finishers using Random Forest classifiers, coupled with an interactive race replay simulation and autonomous virtual driver.",
    image: "/projects/f1podiumpredictor.png",
    year: "2024",
    role: "Machine Learning Engineer",
    status: "Completed",
    githubUrl: "https://github.com/sarthak-codes11/f1podiumpredictor",
    liveUrl: "https://huggingface.co/sarthakasap11/f1podiumpredictor",
    technologies: ["Python", "Scikit-Learn", "FastF1", "Pandas", "Streamlit", "Hugging Face Spaces"],
    metrics: [
      { label: "Model Architecture", value: "Random Forest" },
      { label: "Podium Accuracy", value: "94% Accuracy (0.93 AUC)" },
      { label: "Winner Accuracy", value: "87% Top-1 Accuracy" },
      { label: "Deployment", value: "Hugging Face Spaces" }
    ],
    architecture: [
      "High-throughput FastF1 telemetry ingestion pipeline extracting sector deltas and tire degradation curves",
      "Classification pipeline outputting calibrated podium probabilities for 20 drivers",
      "Interactive track coordinate mapping with dynamic sector splits and cornering apex speeds",
      "Live race replay loop simulating dynamic weather changes and pit-stop strategies"
    ],
    keyHighlights: [
      "Live model hosted and interactive on Hugging Face Spaces",
      "Calibrated probability distributions for 1st, 2nd, and 3rd place finishes across 3+ seasons",
      "Deep feature importance analysis on qualifying lap delta vs tire compound choice",
      "Streamlit dashboard featuring track maps and telemetry head-to-head overlays"
    ],
    color: "#DC2626",
    gradient: "from-red-600 to-zinc-950"
  },
  {
    id: "graamgyaan",
    title: "GraamGyaan — Offline-First Rural EdTech",
    category: "Full-Stack",
    subtitle: "Smart rural educational platform engineered for low-bandwidth and offline environments",
    description:
      "An educational web application tailored to bridge learning disparities in underserved rural schools. Built with offline-first client persistence, lightweight asset delivery, and interactive vernacular lessons designed to run smoothly on low-end hardware.",
    image: "/projects/graamgyaan.png",
    year: "2024",
    role: "Full-Stack Architect",
    status: "Active",
    githubUrl: "https://github.com/sarthak-codes11/GraamGyaan",
    liveUrl: "https://graam-gyaan.vercel.app/",
    technologies: ["TypeScript", "React", "Node.js", "Supabase", "Gemini API", "IndexedDB", "Tailwind CSS"],
    metrics: [
      { label: "Target Bandwidth", value: "2G / Offline-Ready" },
      { label: "Performance", value: "30% Faster Load" },
      { label: "Learning Modules", value: "50+ STEM Modules" },
      { label: "Live Deployment", value: "graam-gyaan.vercel.app" }
    ],
    architecture: [
      "Service-worker cached client runtime enabling complete offline interactive lesson progress",
      "Background sync queue merging quiz results and student analytics upon connectivity recovery",
      "Supabase backend synchronization with Google Gemini API educational assistance",
      "Minimalist DOM rendering architecture optimized for ultra-budget Android devices"
    ],
    keyHighlights: [
      "Production deployment running live on Vercel with 50+ interactive modules",
      "Zero-latency local offline lesson completion with automated peer-to-peer sync",
      "Interactive visual micro-quizzes with audio read-aloud support",
      "Designed specifically for community schools with intermittent power and internet"
    ],
    color: "#D97706",
    gradient: "from-amber-600 to-orange-950"
  },
  {
    id: "tick-it",
    title: "Tick-It — Smart Helpdesk System",
    category: "Full-Stack",
    subtitle: "High-velocity issue tracking and enterprise ticketing system with SLA workflows",
    description:
      "A high-velocity ticketing and customer resolution system developed from Figma design specifications into production-grade React and TypeScript code, featuring triage automations and SLA countdown monitors.",
    image: "/projects/tickit.png",
    aspectRatio: "square",
    year: "2024",
    role: "Frontend Engineer",
    status: "Completed",
    githubUrl: "https://github.com/sarthak-codes11/tick-it",
    liveUrl: "https://tick-it-flame.vercel.app/",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Figma Tokens", "Zustand", "Vercel"],
    metrics: [
      { label: "Design Fidelity", value: "1:1 Figma Match" },
      { label: "State Management", value: "Zustand Atomic Store" },
      { label: "Triage Latency", value: "< 50ms" },
      { label: "Live Deployment", value: "tick-it-flame.vercel.app" }
    ],
    architecture: [
      "Strict Figma token design system matching enterprise typography and component tokens",
      "Optimistic UI updates for instant ticket status changes and assignment",
      "Real-time filterable ticket matrix by priority, assignee, status, and SLA deadline"
    ],
    keyHighlights: [
      "Live interactive web app deployed on Vercel",
      "Custom Kanban and table views with drag-and-drop ticket state transitions",
      "Automated priority escalations based on resolution timer milestones",
      "Crisp keyboard shortcuts for power-user triage operations"
    ],
    color: "#0284C7",
    gradient: "from-sky-600 to-cyan-950"
  },
  {
    id: "travelplanner",
    title: "TripMind — Agentic AI Travel Planner",
    category: "AI & Agents",
    subtitle: "Autonomous multi-step trip planning assistant powered by LangGraph ReAct and LLaMA 3.3 70B",
    description:
      "An intelligent agentic travel planning system that autonomously formulates day-wise trip itineraries across Indian destinations. Utilizes LangChain and a cyclic LangGraph ReAct architecture with tool-calling capabilities across flights, hotels, attractions, live weather, and budgeting.",
    image: "/projects/tripmind.png",
    aspectRatio: "square",
    year: "2024",
    role: "AI / LLM Systems Engineer",
    status: "Completed",
    githubUrl: "https://github.com/sarthak-codes11/travelplanner",
    technologies: ["Python", "LangChain", "LangGraph", "Groq LLaMA 3.3 70B", "Streamlit", "Open-Meteo API"],
    metrics: [
      { label: "Model Backbone", value: "LLaMA 3.3 70B" },
      { label: "Reasoning Loop", value: "ReAct Agent" },
      { label: "Integrated Tools", value: "5 Custom Tools" },
      { label: "Decision Justification", value: "100% Explainable" }
    ],
    architecture: [
      "Cyclic StateGraph orchestration engine with autonomous tool-execution nodes",
      "Deterministic data loaders ranking flights, hotels, and attractions",
      "Live weather integration via Open-Meteo coordinate resolution",
      "Structured budget calculation engine with cost-saving heuristics"
    ],
    keyHighlights: [
      "Full multi-turn reasoning with step-by-step decision justifications",
      "Real-time weather contingency planning for outdoor itineraries",
      "Custom Streamlit interface with interactive JSON state inspectors"
    ],
    color: "#059669",
    gradient: "from-emerald-600 to-teal-900"
  },
  {
    id: "cipher-lens",
    title: "Cipher Lens — IPsec VPN Protocol Analyzer",
    category: "Systems & Architecture",
    subtitle: "AI-driven IPsec packet capture analyzer, handshake inspector & security assessment suite",
    description:
      "A comprehensive security analysis suite built with Next.js 16 and Python to inspect IPsec VPN communications. Analyzes IKEv1/IKEv2 handshakes, flags deprecated cryptographic algorithms (DES, 3DES, MD5, SHA-1), and outputs structured vulnerability remediation reports.",
    image: "/projects/cipherlens.png",
    aspectRatio: "standard",
    year: "2024",
    role: "Team Lead — ByteForce",
    status: "Active",
    githubUrl: "https://github.com/byteforce101-ops/IPsec-VPN-protocol-analyzer",
    technologies: ["Python", "Next.js 16", "Scapy", "FastAPI", "Tailwind CSS", "Cryptography"],
    metrics: [
      { label: "Protocols", value: "IKEv1 / IKEv2 / ESP" },
      { label: "Weakness Detection", value: "Diffie-Hellman & Ciphers" },
      { label: "UI Framework", value: "Next.js 16 App Router" }
    ],
    architecture: [
      "Packet dissection pipeline parsing raw PCAP captures for IKE security associations",
      "Cryptographic policy compliance checker cross-referencing NIST guidelines",
      "Interactive Next.js security dashboard with live protocol handshake timeline visualization"
    ],
    keyHighlights: [
      "Automated detection of aggressive-mode IKE handshakes and PSK exposures",
      "Cryptographic cipher suite scoring with actionable remediation guidance",
      "Interactive packet flow visualizer mapping initiator-to-responder transitions"
    ],
    color: "#4F46E5",
    gradient: "from-indigo-600 to-violet-950"
  },
  {
    id: "citi-remittance",
    title: "Cross-Border Remittances Platform",
    category: "Full-Stack",
    subtitle: "High-throughput international payment routing & FX liquidity settlement platform",
    description:
      "Engineered for the Drunix × Citi Hackathon ('Build the Future of Payments in India'). Built to optimize cross-border remittance corridors into India through dynamic multi-bank routing, automated FX conversion heuristics, and compliance ledgers.",
    image: "/projects/citiremittance.png",
    aspectRatio: "square",
    year: "2024",
    role: "Team Lead — ByteForce",
    status: "Completed",
    githubUrl: "https://github.com/byteforce101-ops/cross-border-remittances",
    technologies: ["JavaScript", "Node.js", "React", "Express", "Fintech API", "Tailwind CSS"],
    metrics: [
      { label: "Hackathon", value: "Drunix × Citi Hackathon" },
      { label: "Settlement", value: "Real-time FX Heuristics" },
      { label: "Target Domain", value: "Inward Remittances India" }
    ],
    architecture: [
      "Real-time FX liquidity scoring engine comparing spreads across correspondent banks",
      "Automated KYC and AML compliance validation checkpoints",
      "High-concurrency settlement processor with idempotent transaction guarantees"
    ],
    keyHighlights: [
      "Sub-second route evaluation optimizing exchange margins and transfer fees",
      "Transparent fee breakdown and real-time corridor tracking dashboard",
      "Engineered under hackathon deadlines by the ByteForce engineering team"
    ],
    color: "#0891B2",
    gradient: "from-teal-600 to-slate-950"
  },
  {
    id: "ascend",
    title: "Ascend — AI Career & Prep Platform",
    category: "AI & Agents",
    subtitle: "Intelligent career accelerator for automated resume intelligence & interview simulation",
    description:
      "A comprehensive platform engineered for modern software engineers. Combines vector semantic resume analysis with AI-driven mock interview simulations, automated ATS scoring, and dynamic technical interview coaching.",
    image: "/projects/ascend.png",
    aspectRatio: "square",
    year: "2024",
    role: "Full-Stack Developer",
    status: "Active",
    githubUrl: "https://github.com/sarthak-codes11/ascend",
    technologies: ["TypeScript", "Next.js 14", "React", "Tailwind CSS", "Gemini API", "PostgreSQL", "Prisma"],
    metrics: [
      { label: "Resume Parsing", value: "Real-time ATS Score" },
      { label: "Mock Interviews", value: "Voice & Code Feedback" },
      { label: "Database", value: "PostgreSQL + Prisma" }
    ],
    architecture: [
      "Next.js App Router with server actions and streaming LLM responses",
      "Semantic resume scanner comparing bullet points to real job descriptions",
      "Interactive code challenge evaluator with automated test case execution"
    ],
    keyHighlights: [
      "Instant ATS-tailored resume critiques and bullet-point rewrite suggestions",
      "Dynamic mock interview agent that poses contextual technical follow-up questions",
      "Curated hackathon and tech career opportunities aggregator"
    ],
    color: "#7C3AED",
    gradient: "from-purple-600 to-violet-950"
  },
  {
    id: "smart-pothole-detection",
    title: "Smart Road Health & GIS Analytics",
    category: "Systems & Architecture",
    subtitle: "Real-time multi-sensor telemetry fusion, pothole detection & road health scoring engine",
    description:
      "A telemetry and road health scoring software platform built for precision infrastructure analysis. Implements a weighted sensor fusion algorithm combining ultrasonic depth drops, vertical acceleration spikes, and vibration metrics to eliminate false alarms and output sector-level Road Health Indices (0–100).",
    image: "/projects/smartpothole.png",
    aspectRatio: "square",
    year: "2024",
    role: "Lead Systems & Software Engineer",
    status: "Completed",
    githubUrl: "https://github.com/sarthak-codes11/smart-pothole-detection",
    technologies: ["TypeScript", "React", "Leaflet GIS", "Web Audio API", "Sensor Fusion", "Tailwind CSS"],
    metrics: [
      { label: "Confidence Threshold", value: "≥ 70%" },
      { label: "Sensor Weighting", value: "40% Dist / 40% Accel / 20% Vib" },
      { label: "Telemetry Stream", value: "350-450ms" },
      { label: "Road Index Score", value: "0–100 HVI" }
    ],
    architecture: [
      "Software Abstraction Layer (ISensorService) supporting zero-friction hot-swapping between simulated and real telemetry streams",
      "PotholeDetectionEngine calculating weighted sensor fusion confidence vectors",
      "Geospatial GIS Engine (Leaflet + OpenStreetMap) with telemetry popups and severity-coded waypoints",
      "8-phase event progression visualizer and Web Audio synthesized warning buzzer"
    ],
    keyHighlights: [
      "Dynamic road condition monitoring with automatic severity classification (LOW, MEDIUM, HIGH)",
      "Sector-level road health scoring with severity penalties and repair restoration credits",
      "Searchable and filterable detection history audit log with CSV export capabilities"
    ],
    color: "#2563EB",
    gradient: "from-blue-600 to-indigo-900"
  },
  {
    id: "phonepe-insights",
    title: "PhonePe Pulse Financial Analytics",
    category: "Machine Learning",
    subtitle: "Macroeconomic transaction analysis and regression modeling across Indian digital payments",
    description:
      "An exploratory data analysis and geospatial payment intelligence project crunching 25,000+ data points from the PhonePe Pulse repository spanning 2018–2024 to map district-level UPI adoption and growth trends.",
    image: "/projects/phonepe.png",
    aspectRatio: "square",
    year: "2024",
    role: "Data & ML Engineer",
    status: "Completed",
    githubUrl: "https://github.com/sarthak-codes11/-phonepe-transaction-insights",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn", "Jupyter"],
    metrics: [
      { label: "Analyzed Records", value: "25,000+ Data Points" },
      { label: "Timeline", value: "2018 – 2024" },
      { label: "Districts Mapped", value: "700+ Districts" }
    ],
    architecture: [
      "Automated JSON parser transforming nested PhonePe Pulse directories into normalized DataFrames",
      "Regression modeling predicting transaction volume trajectories per quarter",
      "Choropleth spatial visualization rendering payment density across all Indian states"
    ],
    keyHighlights: [
      "Identified regional inflection points in merchant QR payment adoption",
      "Comparative regression analysis between tier-1 and tier-3 district transaction frequency",
      "Comprehensive visualizations published in interactive Jupyter notebooks"
    ],
    color: "#6366F1",
    gradient: "from-indigo-600 to-slate-950"
  },
  {
    id: "teslastockpredictor",
    title: "Tesla Stock Forecasting Engine",
    category: "Machine Learning",
    subtitle: "Time-series machine learning model predicting equity volatility and trend vectors",
    description:
      "A predictive financial forecasting pipeline trained on historical TSLA equity data, combining moving-average technical indicators, RSI momentum signals, and supervised regression models.",
    image: "/projects/teslastock.png",
    aspectRatio: "standard",
    year: "2024",
    role: "ML Engineer",
    status: "Completed",
    githubUrl: "https://github.com/sarthak-codes11/teslastockpredictor",
    technologies: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Yahoo Finance API"],
    metrics: [
      { label: "Evaluation", value: "RMSE / MAE / R²" },
      { label: "Indicators", value: "RSI, MACD, 50/200 DMA" }
    ],
    architecture: [
      "Automated market data pipeline fetching split-adjusted equity bars",
      "Feature engineering generator rolling technical momentum and volatility indicators",
      "Backtesting evaluation engine comparing predicted vs realized price bounds"
    ],
    keyHighlights: [
      "Comprehensive evaluation of technical indicator correlations with intraday swings",
      "Visualized prediction intervals and actual price trajectories",
      "Clean modular Python codebase with notebook documentation"
    ],
    color: "#E11D48",
    gradient: "from-rose-600 to-stone-950"
  }
];
