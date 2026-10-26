"use client";

import { useState, useEffect } from "react";
import { articles } from "@/data/articles";
import { ChevronLeft, ChevronRight, Clock, Tag } from "lucide-react";
import { useSoundEffect } from "@/hooks/useSoundEffect";

export default function ArticlesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playTick } = useSoundEffect();

  const handleNext = () => {
    if (currentIndex < articles.length - 1) {
      playTick(1.2, 0.12);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playTick(0.9, 0.12);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSelect = (idx: number) => {
    if (idx !== currentIndex) {
      playTick(1.05, 0.15);
      setCurrentIndex(idx);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const article = articles[currentIndex];

  return (
    <main className="page articles-page w-full flex-1 flex flex-col py-8">
      {/* Carousel Navigation Controller */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-4">
        {/* Quick Article Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {articles.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all text-left ${
                  isActive
                    ? "bg-black text-white font-medium shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200"
                }`}
              >
                <span>{idx + 1}. </span>
                <span className="hidden md:inline">
                  {item.title.split(":")[0]}
                </span>
                <span className="md:hidden">
                  {item.category.split("&")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel Stepper Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous essay"
              className="p-1.5 rounded-md border border-neutral-200 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-800" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === articles.length - 1}
              aria-label="Next essay"
              className="p-1.5 rounded-md border border-neutral-200 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-neutral-800" />
            </button>
          </div>

          <span className="text-xs font-mono text-neutral-500 min-w-[50px] text-right">
            {currentIndex + 1} / {articles.length}
          </span>
        </div>
      </div>

      {/* Featured Article Card */}
      <article className="w-full max-w-3xl mx-auto py-10 sm:py-14 flex flex-col gap-8 animate-in fade-in duration-300">
        {/* Article Meta */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
            <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 uppercase tracking-wider font-semibold">
              {article.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTime}</span>
            </span>
            <span>•</span>
            <span>{article.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3.5xl font-bold tracking-tight text-black mt-2 leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 font-mono leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-200" />

        {/* Article Essay Body */}
        <div className="flex flex-col gap-6 text-[16px] sm:text-[17px] leading-[1.8] text-neutral-800">
          {article.content.map((paragraph, i) => (
            <p key={i} className="text-neutral-700">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-8 border-t border-neutral-200 flex flex-wrap items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-neutral-400" />
          {article.tags.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200"
            >
              #{t}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}
