import Link from "next/link";
import { StickerTrail } from "@/components/StickerTrail";

export default function HomePage() {
  return (
    <main className="page about-page">
      {/* 4-Column Asymmetric About Content */}
      <div className="about-content">
        {/* Column 1: Bio & Current Endeavors */}
        <div className="ab-content">
          <h2 className="about-title">Sarthak Dilip Deore</h2>
          <p className="about-description">
            A software engineer focused on building autonomous agentic AI systems, scalable
            full-stack web platforms, and predictive machine learning architectures.
            <br />
            Lead at{" "}
            <a
              className="inline-link"
              href="https://github.com/byteforce101-ops"
              target="_blank"
              rel="noopener noreferrer"
            >
              ByteForce
            </a>{" "}
            (competitive hackathon engineering team). Engineering{" "}
            <a
              className="inline-link"
              href="https://github.com/sarthak-codes11/travelplanner"
              target="_blank"
              rel="noopener noreferrer"
            >
              TripMind
            </a>{" "}
            (LangGraph ReAct multi-agent travel orchestrator) and{" "}
            <a
              className="inline-link"
              href="https://github.com/sarthak-codes11/ascend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ascend
            </a>{" "}
            (AI career acceleration platform).
          </p>

          <div className="mt-4">
            <a
              href="/Sarthak_Deore_Resume.pdf"
              download="Sarthak_Deore_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-mono hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>

        {/* Column 2: Key Projects (Flipped right-aligned) */}
        <div className="ab-content flipped">
          <h2 className="about-title">Key Projects</h2>
          <p className="about-description">
            <Link href="/projects#tripmind" className="inline-link">
              TripMind (ReAct Agent)
            </Link>
            <br />
            <Link href="/projects#cipher-lens" className="inline-link">
              Cipher Lens (IPsec Analyzer)
            </Link>
            <br />
            <Link href="/projects#dvr-forensics" className="inline-link">
              DVR Digital Forensics
            </Link>
            <br />
            <Link href="/projects#ascend" className="inline-link">
              Ascend AI Career Hub
            </Link>
            <br />
            <Link href="/projects#citi-remittance" className="inline-link">
              Citi Remittance Hub
            </Link>
            <br />
            <Link href="/projects" className="inline-link">
              See all projects..
            </Link>
          </p>
        </div>

        {/* Column 3: Engineering Stack & Capabilities */}
        <div className="ab-content">
          <h2 className="about-title">Engineering Stack</h2>
          <p className="about-description">
            Languages: TypeScript, Python, SQL, C++, HTML/CSS
            <br />
            Agentic AI &amp; ML: LangGraph, LangChain, Groq LLaMA 3.3, Scikit-learn, XGBoost, YOLOv8
            <br />
            Full-Stack &amp; Cloud: Next.js 16, React, FastAPI, Node.js, PostgreSQL, Prisma, Supabase, Tailwind CSS
          </p>
        </div>

        {/* Column 4: Profiles & Repositories (Flipped right-aligned) */}
        <div className="ab-content flipped">
          <h2 className="about-title">Profiles &amp; Repositories</h2>
          <p className="about-description">
            <a
              className="inline-link font-medium text-black"
              href="/Sarthak_Deore_Resume.pdf"
              download="Sarthak_Deore_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume (PDF) ↓
            </a>
            <br />
            <a
              className="inline-link"
              href="https://github.com/sarthak-codes11"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub (@sarthak-codes11)
            </a>
            <br />
            <a
              className="inline-link"
              href="https://github.com/byteforce101-ops"
              target="_blank"
              rel="noopener noreferrer"
            >
              ByteForce (@byteforce101-ops)
            </a>
            <br />
            <a
              className="inline-link"
              href="https://www.linkedin.com/in/sarthak-deore-dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <br />
            <a
              className="inline-link"
              href="https://leetcode.com/u/asapcoder11/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LeetCode
            </a>
            <br />
            <a className="inline-link" href="mailto:sarthak.dilip.deore@gmail.com">
              sarthak.dilip.deore@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Interactive Illustration Trail & Monogram Footer */}
      <StickerTrail />
    </main>
  );
}
