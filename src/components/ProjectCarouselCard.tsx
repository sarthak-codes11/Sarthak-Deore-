"use client";

import { useState, useRef } from "react";
import { Project } from "@/data/projects";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Binary,
  Layers,
  Sparkles,
  Terminal,
  Globe
} from "lucide-react";

interface Props {
  project: Project;
  onOpenModal: () => void;
}

export function ProjectCarouselCard({ project, onOpenModal }: Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { playTick } = useSoundEffect();

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slideIndex = Math.round(el.scrollLeft / el.clientWidth);
    if (slideIndex !== activeSlide && slideIndex >= 0 && slideIndex <= 3) {
      setActiveSlide(slideIndex);
      playTick(1.05 + slideIndex * 0.1, 0.08);
    }
  };

  const scrollToSlide = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({
      left: index * el.clientWidth,
      behavior: "smooth"
    });
    setActiveSlide(index);
    playTick(1.1, 0.12);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeSlide > 0) scrollToSlide(activeSlide - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeSlide < 3) scrollToSlide(activeSlide + 1);
  };

  // Marker tag abbreviation in bottom-left matching Deji's design
  const marker =
    project.id === "cipher-lens" ||
    project.id === "dvr-forensics" ||
    project.id === "citi-remittance"
      ? "BF"
      : project.category === "AI & Agents"
      ? "AI"
      : project.category === "Machine Learning"
      ? "ML"
      : project.category === "Full-Stack"
      ? "FS"
      : "SYS";

  const aspectClass =
    project.aspectRatio === "square"
      ? "aspect-square"
      : project.aspectRatio === "standard"
      ? "aspect-[4/3]"
      : "aspect-[16/10]";

  return (
    <article
      onClick={onOpenModal}
      className="group relative flex flex-col justify-between rounded-[22px] border border-neutral-200/90 bg-white hover:border-black/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden select-none cursor-pointer"
      style={{
        cornerShape: "superellipse(1.2)"
      } as React.CSSProperties}
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2 text-xs font-mono text-neutral-500 border-b border-neutral-100 bg-neutral-50/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neutral-400 group-hover:bg-black transition-colors" />
          <span className="uppercase tracking-wider text-[11px] font-medium text-neutral-700">
            {project.category}
          </span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-[10px] font-mono font-medium transition-colors"
              title={`Open live app: ${project.liveUrl}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </a>
          )}
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scrollToSlide(idx);
              }}
              title={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                activeSlide === idx
                  ? "w-4 bg-black"
                  : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
          <span className="text-[10px] text-neutral-400 pl-1 font-mono">
            {activeSlide + 1}/4
          </span>
        </div>
      </div>

      {/* Horizontal Carousel Viewport */}
      <div className="relative w-full overflow-hidden bg-neutral-100/60">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing"
        >
          {/* SLIDE 1: Screenshot Image */}
          <div className="w-full flex-shrink-0 snap-center p-3.5">
            <SlideScreenshot project={project} aspectClass={aspectClass} />
          </div>

          {/* SLIDE 2: Interactive UI Widget */}
          <div className="w-full flex-shrink-0 snap-center p-3.5">
            <SlideAppUi project={project} aspectClass={aspectClass} />
          </div>

          {/* SLIDE 3: System Architecture / Pipeline Blueprint */}
          <div className="w-full flex-shrink-0 snap-center p-3.5">
            <SlideArchitecture project={project} aspectClass={aspectClass} />
          </div>

          {/* SLIDE 4: Live Telemetry / Terminal Execution Logs */}
          <div className="w-full flex-shrink-0 snap-center p-3.5">
            <SlideTerminal project={project} aspectClass={aspectClass} />
          </div>
        </div>

        {/* Hover Carousel Arrow Steppers */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeSlide === 0}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/95 backdrop-blur-md border border-neutral-300/80 shadow-md flex items-center justify-center text-neutral-800 hover:text-black opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity z-10 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={activeSlide === 3}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/95 backdrop-blur-md border border-neutral-300/80 shadow-md flex items-center justify-center text-neutral-800 hover:text-black opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity z-10 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Card Bottom Meta & Actions */}
      <div className="p-4 pt-3 flex flex-col justify-between border-t border-neutral-100 bg-white">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-neutral-900 group-hover:text-black transition-colors leading-snug">
              {project.title}
            </h3>
            <span className="text-[11px] font-mono text-neutral-400 flex-shrink-0">
              {project.year}
            </span>
          </div>

          <p className="text-xs text-neutral-500 font-sans line-clamp-2 mt-1 leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Bottom Badges Row */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-neutral-100/70">
          <div className="flex items-center gap-1.5">
            {/* Deji's Authentic Translucent Marker Badge */}
            <div
              className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-100 text-neutral-700 border border-neutral-200/80"
              title={`Domain: ${project.category}`}
            >
              {marker}
            </div>

            {project.technologies.slice(0, 2).map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-50 text-neutral-600 border border-neutral-200/60"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-mono font-medium text-emerald-700 hover:text-emerald-950 inline-flex items-center gap-0.5 hover:underline"
                title="Launch Live App"
              >
                <span>Live App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <span className="text-xs font-mono text-neutral-600 group-hover:text-black inline-flex items-center gap-0.5 group-hover:underline">
              <span>Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ==========================================
// SLIDE 1: Project Screenshot Image
// ==========================================
function SlideScreenshot({ project, aspectClass }: { project: Project; aspectClass: string }) {
  return (
    <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden bg-neutral-950 border border-neutral-200/70 shadow-xs group/img flex items-center justify-center`}>
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5 pointer-events-none">
        <span className="text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
          Swipe for architecture →
        </span>
        <span className="text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/20">
          {project.year}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// SLIDE 2: Interactive App UI Component
// ==========================================
function SlideAppUi({ project, aspectClass }: { project: Project; aspectClass: string }) {
  if (project.id === "travelplanner") {
    return (
      <div className={`w-full ${aspectClass} rounded-xl p-3 bg-emerald-950 text-white font-sans flex flex-col justify-between shadow-inner`}>
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-300 border-b border-emerald-800 pb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>TripMind ReAct Planner</span>
            </span>
            <span className="px-1.5 rounded bg-emerald-800 text-[9px]">LLaMA 3.3</span>
          </div>
          <div className="mt-2 text-xs font-mono text-emerald-100">
            Destination: <span className="text-white font-bold">Jaipur, RJ</span> (3 Days)
          </div>
          <div className="text-[11px] text-emerald-300 font-mono">
            Budget Target: <span className="text-white font-medium">₹15,000 INR</span>
          </div>
        </div>
        <div className="p-2 rounded bg-emerald-900 border border-emerald-700/60 text-[10px] font-mono text-emerald-200">
          ✓ Found 4 Flights · 12 Hotels Ranked · 28°C Weather Clear
        </div>
      </div>
    );
  }

  if (project.id === "cipher-lens") {
    return (
      <div className={`w-full ${aspectClass} rounded-xl p-3 bg-slate-950 text-white font-sans flex flex-col justify-between shadow-inner`}>
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-indigo-300 border-b border-slate-800 pb-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              <span>Cipher Lens IPsec Inspector</span>
            </span>
            <span className="px-1.5 rounded bg-indigo-900 text-[9px]">ByteForce</span>
          </div>
          <div className="mt-2 text-xs font-mono text-slate-200">
            Tunnel: <span className="text-white font-bold">192.168.1.100 ⇄ 10.0.0.1</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            Status: NIST Compliant (AES-GCM-256)
          </div>
        </div>
        <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 flex justify-between">
          <span>IKEv2 SA Established</span>
          <span className="text-emerald-400">0 Weak Ciphers</span>
        </div>
      </div>
    );
  }

  if (project.id === "dvr-forensics") {
    return (
      <div className={`w-full ${aspectClass} rounded-xl p-3 bg-zinc-950 text-white font-sans flex flex-col justify-between shadow-inner`}>
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300 border-b border-zinc-800 pb-1">
            <span className="flex items-center gap-1">
              <Binary className="w-3 h-3 text-cyan-400" />
              <span>DVR Forensics Stream Carver</span>
            </span>
            <span className="px-1.5 rounded bg-cyan-950 border border-cyan-800 text-[9px]">v1.0.1</span>
          </div>
          <div className="mt-2 text-xs font-mono text-zinc-200">
            Feed: <span className="text-white font-bold">CAM_04 East Perimeter</span>
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">
            Format: Hikvision H.264 Raw Bitstream
          </div>
        </div>
        <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-cyan-300">
          Offset: 0x004A8F20 · SHA-256 Verified Admissible
        </div>
      </div>
    );
  }

  if (project.id === "citi-remittance") {
    return (
      <div className={`w-full ${aspectClass} rounded-xl p-3 bg-teal-950 text-white font-sans flex flex-col justify-between shadow-inner`}>
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-teal-300 border-b border-teal-800 pb-1">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-teal-400" />
              <span>Citi Cross-Border Corridor</span>
            </span>
            <span className="px-1.5 rounded bg-teal-900 text-[9px]">Citi Hackathon</span>
          </div>
          <div className="mt-2 text-xs font-mono text-teal-100">
            Transfer: <span className="text-white font-bold">$2,500 USD</span> ➔ <span className="text-emerald-400 font-bold">₹2,08,125 INR</span>
          </div>
          <div className="text-[11px] text-teal-300 font-mono">
            Spread Fee: $0.00 (Zero Margin IMPS Route)
          </div>
        </div>
        <div className="p-2 rounded bg-teal-900/80 border border-teal-700/60 text-[10px] font-mono text-teal-200">
          ✓ Real-time AML Check Passed · Sub-second Liquidity
        </div>
      </div>
    );
  }

  // Fallback UI card
  return (
    <div className={`w-full ${aspectClass} rounded-xl p-3 bg-neutral-900 text-white font-sans flex flex-col justify-between shadow-inner`}>
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 border-b border-neutral-800 pb-1">
          <span>{project.title.split("—")[0]}</span>
          <span className="text-neutral-300">{project.year}</span>
        </div>
        <div className="mt-2 text-xs font-mono text-neutral-200 font-semibold line-clamp-2">
          {project.subtitle}
        </div>
      </div>
      <div className="p-2 rounded bg-neutral-800 border border-neutral-700 text-[10px] font-mono text-neutral-300 line-clamp-1">
        {project.keyHighlights[0] || "Production software system"}
      </div>
    </div>
  );
}

// ==========================================
// SLIDE 3: Architecture & Flow Blueprint
// ==========================================
function SlideArchitecture({ project, aspectClass }: { project: Project; aspectClass: string }) {
  const steps = project.architecture || [
    "Modular system design with decoupled interfaces",
    "High-throughput transactional data pipeline",
    "Deterministic state validation & audit logs"
  ];

  return (
    <div className={`w-full ${aspectClass} rounded-xl p-3 bg-white border border-neutral-200 text-neutral-900 font-mono text-xs flex flex-col justify-between`}>
      <div>
        <div className="flex items-center gap-1.5 text-neutral-500 pb-1.5 border-b border-neutral-100 text-[10px] uppercase tracking-wider font-semibold">
          <Layers className="w-3.5 h-3.5 text-neutral-700" />
          <span>Architecture Blueprint</span>
        </div>
        <div className="flex flex-col gap-1.5 mt-2">
          {steps.slice(0, 3).map((step, i) => (
            <div key={i} className="text-[11px] text-neutral-700 leading-snug flex items-start gap-1.5">
              <span className="text-neutral-400 font-bold">{i + 1}.</span>
              <span className="line-clamp-2">{step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-100">
        Swipe for execution logs →
      </div>
    </div>
  );
}

// ==========================================
// SLIDE 4: Live Telemetry & Terminal Logs
// ==========================================
function SlideTerminal({ project, aspectClass }: { project: Project; aspectClass: string }) {
  return (
    <div className={`w-full ${aspectClass} rounded-xl p-3 bg-neutral-950 text-neutral-200 font-mono text-xs flex flex-col justify-between shadow-inner`}>
      <div>
        <div className="flex items-center justify-between pb-1 border-b border-neutral-800 text-[10px] text-neutral-400">
          <span className="flex items-center gap-1">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span>telemetry.log</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="flex flex-col gap-1 mt-1.5 text-[10px] text-neutral-300">
          <div><span className="text-neutral-500">$</span> ingest --stream --live</div>
          <div className="text-emerald-400">✓ Connected: {project.technologies[0]}</div>
          <div className="text-neutral-400">status: 200 OK · latency: 18ms</div>
          <div className="text-amber-400/90 truncate">hash: 8f2a4e91...verified</div>
        </div>
      </div>
      <div className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-900">
        Click card for case study modal
      </div>
    </div>
  );
}
