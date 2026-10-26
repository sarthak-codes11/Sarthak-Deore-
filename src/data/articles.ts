export interface Article {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  category: string;
  summary: string;
  tags: string[];
  content: string[];
}

export const articles: Article[] = [
  {
    id: "multi-vendor-dvr-forensics",
    title: "Multi-Vendor DVR/NVR Digital Forensics: Stream Carving & Integrity Verification",
    subtitle:
      "Recovering fragmented surveillance streams and maintaining tamper-evident SHA-256 chains of custody across proprietary CCTV architectures.",
    date: "2024",
    readingTime: "6 min read",
    category: "Digital Forensics & Systems",
    summary:
      "How ByteForce engineered automated video frame carving, proprietary header identification, and timestamp reconstruction for corrupted CCTV storage images across Hikvision, Dahua, and CP Plus.",
    tags: ["Digital Forensics", "Python", "FastAPI", "ByteForce", "CCTV Security", "Binary Carving"],
    content: [
      "In modern criminal and incident investigations, CCTV video footage is critical evidence. However, surveillance DVRs and NVRs rarely use standard FAT32 or NTFS filesystems. Manufacturers like Hikvision, Dahua, and CP Plus employ proprietary, undocumented disk structures designed for continuous circular loop recording.",
      "When drives suffer filesystem corruption, unexpected power loss, or intentional deletion, traditional data recovery utilities fail completely because there are no allocation tables or standard container metadata headers to follow.",
      "To solve this problem at ByteForce, we engineered an automated multi-vendor stream carving engine. The system parses raw disk image bitstreams, searching for vendor-specific frame sync words and header signatures (e.g., Hikvision 0x484B0100 and Dahua DHFS block markers).",
      "Once valid frame clusters are detected, our pipeline performs zero-recompression container restitching. It reconstructs fragmented H.264 and H.265 video elementary streams, recalibrates corrupt Presentation Timestamps (PTS), and outputs continuous playable video files.",
      "Crucially for legal admissibility, every carved frame and reconstructed video artifact is hashed with SHA-256 at the block level. The platform automatically generates a cryptographically signed Chain of Custody ledger that documents every forensic extraction step without modifying a single bit of the original image."
    ]
  },
  {
    id: "f1-podium-predictor",
    title: "F1 Podium Predictor: Race Telemetry Modeling with FastF1 & Machine Learning",
    subtitle:
      "Feature engineering on high-frequency lap times, tire degradation curves, and sector apex speeds to forecast race podiums.",
    date: "2024",
    readingTime: "7 min read",
    category: "Machine Learning & Telemetry",
    summary:
      "Extracting predictive signals from millisecond-precision Formula 1 telemetry streams and modeling race podium probabilities with Random Forest classifiers.",
    tags: ["Machine Learning", "FastF1", "Sports Analytics", "Python", "Telemetry"],
    content: [
      "Formula 1 is a sport governed entirely by micro-telemetry. Modern F1 cars stream gigabytes of telemetry data per grand prix across hundreds of onboard channels: tire surface temperatures, vertical load sensors, cornering G-forces, and sub-millisecond sector timing.",
      "When training machine learning models to forecast race podium finishes, naive lap-time analysis fails. A driver running in dirty air behind a rival may clock slower lap times despite having superior tire preservation and theoretical race pace.",
      "In the F1 Race Prediction and Visualization System, we engineered dynamic composite features using FastF1's live timing API:",
      "1. Free Practice sector delta decay: tracking lap-time degradation across 10-to-15 lap stints to isolate compound wear rates.",
      "2. Cornering apex speed differentials: comparing high-speed vs low-speed chassis mechanical grip against track-specific profiles.",
      "3. Grid penalty and overtaking multipliers: calibrating driver starting positions against circuit-specific DRS overtaking difficulty indices.",
      "Using an ensemble of Random Forest classifiers and calibrated probability distributions, the platform delivers predictive podium confidence intervals for all 20 drivers that closely reflect race outcomes across varying weather and safety-car scenarios."
    ]
  },
  {
    id: "graamgyaan",
    title: "GraamGyaan: Offline-First Web Architecture for Rural EdTech",
    subtitle:
      "Designing resilient web applications for zero-bandwidth classrooms and 2G mobile environments.",
    date: "2024",
    readingTime: "5 min read",
    category: "Full-Stack & Systems",
    summary:
      "How Service Workers, IndexedDB conflict-resolution queues, and aggressive asset pruning enable uninterrupted interactive learning in remote regions.",
    tags: ["Web Architecture", "Offline-First", "PWA", "IndexedDB", "EdTech"],
    content: [
      "Most modern web applications are built on the convenient assumption of ubiquitous high-speed 5G or Wi-Fi connectivity. In rural and remote Indian classrooms, this assumption breaks down completely—power fluctuations and intermittent 2G coverage are standard.",
      "Developing GraamGyaan required a fundamental paradigm shift: making the application 'offline by default, connected by exception.' Rather than treating network loss as an error state, offline operation is the primary operational mode.",
      "We architected the client with three core principles:",
      "1. Sub-250KB Initial Bundle: Heavy raster imagery was replaced with vector SVG illustrations and CSS primitives, ensuring the entire application shell installs in under 3 seconds on constrained 2G networks.",
      "2. Local IndexedDB Persistence: Every student exercise, quiz response, and progress milestone writes immediately to a local IndexedDB transaction store with zero network latency.",
      "3. Background Sync Queues: A custom Service Worker synchronization daemon listens for intermittent connectivity bursts. The moment network is restored, queued transactions are compressed and reconciled with the backend without user intervention.",
      "This architecture guarantees that students in underserved communities experience smooth, uninterrupted education regardless of connectivity conditions."
    ]
  },
  {
    id: "agentic-ai-react-langgraph",
    title: "Autonomous ReAct Agents with LangGraph & LLaMA 3.3",
    subtitle:
      "Building deterministic multi-step planning loops with explainable tool reasoning.",
    date: "2024",
    readingTime: "5 min read",
    category: "AI & Agents",
    summary:
      "How to orchestrate cyclic tool loops, manage memory state transitions, and force deterministic decision justifications when building agentic assistants with LangGraph.",
    tags: ["LangGraph", "LangChain", "LLMs", "ReAct", "Agentic AI"],
    content: [
      "Traditional linear LLM chains struggle when a user query requires non-linear reasoning. If a flight is delayed or weather turns stormy, a static prompt pipeline fails to recalculate downstream hotel and itinerary plans.",
      "While building TripMind, we implemented a cyclic LangGraph StateGraph where the LLM functions as a ReAct (Reasoning + Acting) decision core. The agent inspects intermediate tool outputs (e.g. Open-Meteo precipitation forecasts), evaluates whether an outdoor excursion is viable, and either routes to a contingency tool or advances to itinerary synthesis.",
      "A key architectural decision was requiring every tool to return an explicit 'selection_reason' payload. By forcing the agent to log why a specific hotel or flight was selected over alternatives, we turned a black-box LLM recommendation into an auditable, transparent engineering system."
    ]
  }
];
