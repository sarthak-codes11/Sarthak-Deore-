"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { projects, Project } from "@/data/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { ProjectCarouselCard } from "@/components/ProjectCarouselCard";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import { Shuffle } from "lucide-react";

interface CategoryOption {
  label: string;
  badge: string;
}

const CATEGORIES: CategoryOption[] = [
  { label: "All", badge: "A" },
  { label: "AI & Agents", badge: "AI" },
  { label: "Systems & Architecture", badge: "SA" },
  { label: "Full-Stack", badge: "FS" },
  { label: "Machine Learning", badge: "ML" }
];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { playTick, playScrub } = useSoundEffect();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isShuffled, setIsShuffled] = useState(false);

  // Check if a project is selected via query param or local state
  const selectedProjectId = searchParams.get("id");
  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || null;
  }, [selectedProjectId]);

  // Filter and order projects
  const filteredProjects = useMemo(() => {
    let list = projects.filter(
      (p) => activeCategory === "All" || p.category === activeCategory
    );

    if (isShuffled) {
      list = [...list].sort(() => 0.5 - Math.random());
    }

    return list;
  }, [activeCategory, isShuffled]);

  const handleOpenModal = (p: Project) => {
    playTick(1.2, 0.25);
    router.push(`/projects?id=${p.id}`, { scroll: false });
  };

  const handleCloseModal = () => {
    playTick(0.9, 0.2);
    router.push("/projects", { scroll: false });
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    playTick(1.1, 0.2);
    router.push(`/projects?id=${filteredProjects[nextIndex].id}`, { scroll: false });
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    playTick(1.0, 0.2);
    router.push(`/projects?id=${filteredProjects[prevIndex].id}`, { scroll: false });
  };

  return (
    <main className="page works-page flex-1 flex flex-col py-4 w-full">
      {/* Top Drafting Ruler Lines */}
      <div
        className="w-full h-4 mb-3 flex items-end justify-between px-2 overflow-hidden opacity-30 select-none pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 70 }).map((_, i) => (
          <div
            key={i}
            className={`bg-neutral-800 ${
              i % 10 === 0
                ? "h-3.5 w-[1px] opacity-100"
                : i % 5 === 0
                ? "h-2 w-[1px] opacity-70"
                : "h-1 w-[0.5px] opacity-40"
            }`}
          />
        ))}
      </div>

      {/* Category Filter Bar (Matching Deji's Pinterest header layout) */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-neutral-200/90 gap-4">
        {/* Category Pill Filters with Letter Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => {
                  playTick(isActive ? 0.95 : 1.15, 0.15);
                  setActiveCategory(cat.label);
                }}
                className={`group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                  isActive
                    ? "bg-black text-white border-black shadow-xs font-medium"
                    : "bg-neutral-100/80 text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-black"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                    isActive
                      ? "bg-neutral-800 text-white"
                      : "bg-white text-neutral-500 border border-neutral-300 group-hover:border-neutral-500"
                  }`}
                >
                  {cat.badge}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Shuffle / Random Order Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playScrub(0.8);
              setIsShuffled((prev) => !prev);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
              isShuffled
                ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>{isShuffled ? "SHUFFLED" : "ORDER: NORMAL"}</span>
          </button>
        </div>
      </div>

      {/* Pinterest Masonry Grid with Horizontal Scrollable Carousels inside each card */}
      <div className="w-full columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 pt-6 pb-16">
        {filteredProjects.map((project) => (
          <div key={project.id} className="break-inside-avoid mb-5">
            <ProjectCarouselCard
              project={project}
              onOpenModal={() => handleOpenModal(project)}
            />
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseModal}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center font-mono text-xs">
          Loading projects...
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
