"use client";

import { useEffect } from "react";

import { Project } from "@/data/projects";

import { X, ExternalLink, Activity, Cpu, Layers } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

import { useSoundEffect } from "@/hooks/useSoundEffect";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function ProjectModal({ project, onClose, onNext, onPrev }: ProjectModalProps) {
  const { playTick } = useSoundEffect();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playTick(0.9, 0.1);
        onClose();
      } else if (e.key === "ArrowRight" && onNext) {
        playTick(1.2, 0.1);
        onNext();
      } else if (e.key === "ArrowLeft" && onPrev) {
        playTick(1.2, 0.1);
        onPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev, playTick]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header Bar with Industrial Ruler Marks */}
        <div className="relative w-full bg-neutral-900 text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {project.year} • {project.role}
              </span>
            </div>

            <button
              onClick={() => {
                playTick(0.8, 0.12);
                onClose();
              }}
              className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-mono">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-8 text-neutral-800">
          {/* Project Screenshot / Hero Preview */}
          {project.image && (
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-200/90 shadow-sm group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] font-mono text-white/90 border border-white/10">
                Production Capture / Blueprint
              </div>
            </div>
          )}

          {/* Key Metrics Grid */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200/80">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                    {m.label}
                  </span>
                  <span className="text-sm font-semibold text-neutral-900 font-mono mt-0.5">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Deep Architectural Narrative */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              <Activity className="w-4 h-4 text-neutral-700" />
              <span>System Overview & Architecture</span>
            </div>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              {project.description}
            </p>
          </div>

          {/* Architecture Pipeline Points */}
          {project.architecture && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                <Cpu className="w-4 h-4 text-neutral-700" />
                <span>Technical Specifications</span>
              </div>
              <ul className="space-y-2 text-sm text-neutral-700 list-disc list-inside">
                {project.architecture.map((arch, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="font-mono">{arch}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Highlights */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              <Layers className="w-4 h-4 text-neutral-700" />
              <span>Key Engineering Highlights</span>
            </div>
            <ul className="space-y-1.5 text-sm text-neutral-700">
              {project.keyHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-400 font-mono">✦</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Stack Pills */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Technologies & Frameworks
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-neutral-100 text-neutral-800 border border-neutral-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-xs text-neutral-500 font-mono hidden sm:block">
            Use <kbd className="px-1.5 py-0.5 rounded bg-white border border-neutral-300">←</kbd> and{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-neutral-300">→</kbd> to cycle projects
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-black text-white hover:bg-neutral-800 text-xs font-mono transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source on GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}
