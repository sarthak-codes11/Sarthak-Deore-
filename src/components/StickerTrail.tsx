"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSoundEffect } from "@/hooks/useSoundEffect";

const TRAIL_IMAGES = [
  { src: "/trail/BLUE.png", alt: "Blue sticker", colorTag: "blue-1" },
  { src: "/trail/BLUE 2.png", alt: "Blue 2 sticker", colorTag: "blue-2" },
  { src: "/trail/GREEN.png", alt: "Green sticker", colorTag: "green-1" },
  { src: "/trail/GRREN 2.png", alt: "Green 2 sticker", colorTag: "green-2" },
  { src: "/trail/PINK.png", alt: "Pink sticker", colorTag: "pink-1" },
  { src: "/trail/PINK 2.png", alt: "Pink 2 sticker", colorTag: "pink-2" },
  { src: "/trail/PURPLE.png", alt: "Purple sticker", colorTag: "purple-1" },
  { src: "/trail/YELLOW.png", alt: "Yellow sticker", colorTag: "yellow-1" },
  { src: "/trail/YEllOW 2.png", alt: "Yellow 2 sticker", colorTag: "yellow-2" }
];

const SOCIAL_LINKS = [
  { label: "Mail", href: "mailto:sarthakdeore11@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sarthak-deore-dev/" },
  { label: "GitHub", href: "https://github.com/sarthak-codes11" },
  { label: "ByteForce", href: "https://github.com/byteforce101-ops" },
  { label: "LeetCode", href: "https://leetcode.com/u/asapcoder11/" }
];

export function StickerTrail() {
  const containerRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const { playTick } = useSoundEffect();

  useEffect(() => {
    const container = containerRef.current;
    const layer = layerRef.current;
    if (!container || !layer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let lastX = 0;
    let lastY = 0;
    let lastColorTag: string | null = null;
    let poolIndex = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return;
      }

      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const distance = Math.hypot(dx, dy);

      // Exact 35px travel distance threshold from FaqIllustrationTrail-DqBQ1IuZ.js
      if (distance < 35) return;

      lastX = clientX;
      lastY = clientY;

      // Filter out immediate repeating color tag for palette diversity
      const availableImages = lastColorTag
        ? TRAIL_IMAGES.filter((img) => img.colorTag !== lastColorTag)
        : TRAIL_IMAGES;
      const selectedImg =
        availableImages[Math.floor(Math.random() * availableImages.length)] ||
        TRAIL_IMAGES[poolIndex % TRAIL_IMAGES.length];
      poolIndex++;
      lastColorTag = selectedImg.colorTag;

      // Calculate relative position within footer layer
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      // Rotation between -25deg and +25deg (50deg range)
      const rotation = (Math.random() - 0.5) * 50;

      // Create DOM sticker element with exact styling
      const img = document.createElement("img");
      img.className = "faqIllustrationTrail__item";
      img.src = selectedImg.src;
      img.alt = selectedImg.alt;
      img.setAttribute("aria-hidden", "true");
      img.draggable = false;
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
      img.style.transition = "transform 750ms cubic-bezier(.07,.5,.5,1)";

      layer.appendChild(img);

      // Trigger entrance ease
      requestAnimationFrame(() => {
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
      });

      // Play subtle tactile feedback on spawn
      playTick(1.2 + Math.random() * 0.4, 0.05);

      // Trigger exit ease after 750ms lifespan
      setTimeout(() => {
        if (!img.parentElement) return;
        img.style.transition =
          "transform 1000ms cubic-bezier(.87,0,.13,1), opacity 1000ms cubic-bezier(.87,0,.13,1)";
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
        img.style.opacity = "0";

        // Remove element from DOM after exit animation finishes
        setTimeout(() => {
          if (img.parentElement) {
            img.remove();
          }
        }, 1000);
      }, 750);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [playTick]);

  return (
    <footer
      ref={containerRef}
      className="faqIllustrationTrail about-footer select-none"
      style={
        {
          "--faq-illustration-trail-size": "min(4.45vw, 64px)"
        } as React.CSSProperties
      }
    >
      {/* Particle trail DOM container */}
      <div
        ref={layerRef}
        className="faqIllustrationTrail__layer about-footer-trail pointer-events-none"
        aria-hidden="true"
      />

      {/* Footer Content */}
      <div className="faqIllustrationTrail__content about-footer-content">
        {/* Social Badges Pill List */}
        <div className="social-links">
          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Massive Architectural Custom SVG Wordmark spanning full width */}
        <div className="big-logo" aria-hidden="true">
          <svg
            width="100%"
            viewBox="0 0 1416 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto text-black fill-current select-none pointer-events-none"
          >
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-bold text-[120px] sm:text-[144px] md:text-[160px] tracking-tighter"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                letterSpacing: "-0.06em",
                fontWeight: 800
              }}
            >
              SARTHAK DEORE
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
