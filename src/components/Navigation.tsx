"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect, useState, useCallback } from "react";
import { useSoundEffect } from "@/hooks/useSoundEffect";

interface NavItem {
  href: string;
  label: string;
}

const defaultNavItems: NavItem[] = [
  { label: "About", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Articles", href: "/articles" }
];

function getActiveIndexFromPath(pathname: string, items: NavItem[]): number {
  const normalized = /^\/projects(?:\/|$)/.test(pathname)
    ? "/projects"
    : /^\/articles(?:\/|$)/.test(pathname)
    ? "/articles"
    : "/";
  const idx = items.findIndex((item) => item.href === normalized);
  return idx === -1 ? 0 : idx;
}

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { playTick } = useSoundEffect();

  const [activeIndex, setActiveIndex] = useState(() =>
    getActiveIndexFromPath(pathname, defaultNavItems)
  );
  const [ready, setReady] = useState(false);
  const [shouldEase, setShouldEase] = useState(false);
  const [layout, setLayout] = useState<{
    labelWidths: Record<string, number>;
    padLeft: number;
    padRight: number;
  }>({
    labelWidths: {},
    padLeft: 0,
    padRight: 0
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const isProgrammaticScroll = useRef(false);
  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startScroll: number;
    moved: boolean;
  } | null>(null);

  // Measure and align layout with symmetric center padding
  const updateLayout = useCallback(() => {
    const scroller = scrollerRef.current;
    const items = itemRefs.current;
    if (!scroller || items.length === 0) return;
    const firstItem = items[0];
    const lastItem = items[defaultNavItems.length - 1];
    if (!firstItem || !lastItem) return;

    const labelWidths: Record<string, number> = {};
    defaultNavItems.forEach((item, i) => {
      const el = items[i];
      if (el) {
        labelWidths[item.href] = el.getBoundingClientRect().width;
      }
    });

    const halfViewport = scroller.clientWidth / 2;
    const padLeft = Math.max(0, halfViewport - firstItem.offsetWidth / 2);
    const padRight = Math.max(0, halfViewport - lastItem.offsetWidth / 2);

    setLayout({
      labelWidths,
      padLeft,
      padRight
    });
    setReady(true);
  }, []);

  // Compute offset to center a given item under the needle (50% mark)
  const scrollToIndex = useCallback(
    (index: number, behavior: "instant" | "smooth" = "smooth") => {
      const scroller = scrollerRef.current;
      const targetItem = itemRefs.current[index];
      if (!scroller || !targetItem) return;

      const scrollerRect = scroller.getBoundingClientRect();
      const itemRect = targetItem.getBoundingClientRect();
      const delta =
        itemRect.left + itemRect.width / 2 - (scrollerRect.left + scrollerRect.width / 2);

      if (Math.abs(delta) < 0.5) return;

      isProgrammaticScroll.current = true;
      if (behavior === "instant") {
        scroller.style.scrollSnapType = "none";
        const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
        scroller.scrollLeft = Math.min(maxScroll, Math.max(0, scroller.scrollLeft + delta));
        scroller.style.scrollSnapType = "";
        isProgrammaticScroll.current = false;
      } else {
        scroller.scrollBy({ left: delta, behavior: "smooth" });
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 350);
      }
    },
    []
  );

  // Find item closest to the center needle
  const getClosestItemIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return null;
    const centerPoint = scroller.getBoundingClientRect().left + scroller.clientWidth / 2;
    let closest = 0;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(itemCenter - centerPoint);
      if (dist < minDistance) {
        minDistance = dist;
        closest = i;
      }
    });

    return closest;
  }, []);

  // Update layout on mount and window resize
  useEffect(() => {
    updateLayout();
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller || !content) return;

    const ro = new ResizeObserver(() => {
      updateLayout();
      scrollToIndex(activeIndexRef.current, "instant");
    });
    ro.observe(scroller);
    ro.observe(content);

    return () => ro.disconnect();
  }, [updateLayout, scrollToIndex]);

  // Sync active index with pathname changes
  useEffect(() => {
    const newIdx = getActiveIndexFromPath(pathname, defaultNavItems);
    if (newIdx !== activeIndexRef.current) {
      setActiveIndex(newIdx);
      setShouldEase(true);
      scrollToIndex(newIdx, ready ? "smooth" : "instant");
    } else if (ready) {
      scrollToIndex(newIdx, "instant");
    }
  }, [pathname, ready, scrollToIndex]);

  // Pointer drag gestures (mouse/pen pointer capture matching Nav-BGLgzeL4.js)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const scroller = scrollerRef.current;
    if (!wrapper || !scroller) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || e.pointerType === "touch") return;
      dragState.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startScroll: scroller.scrollLeft,
        moved: false
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const state = dragState.current;
      if (!state || e.pointerId !== state.pointerId) return;

      const delta = e.clientX - state.startX;
      if (!state.moved) {
        if (Math.abs(delta) < 4) return;
        state.moved = true;
        wrapper.setPointerCapture(state.pointerId);
        scroller.style.scrollSnapType = "none";
        wrapper.dataset.dragging = "true";
      }

      scroller.scrollLeft = state.startScroll - delta;

      // Real-time audio tick when crossing item boundary during drag
      const closest = getClosestItemIndex();
      if (closest !== null && closest !== activeIndexRef.current) {
        playTick(1.0, 0.2);
        setActiveIndex(closest);
      }

      e.preventDefault();
    };

    const onPointerEnd = (e: PointerEvent) => {
      const state = dragState.current;
      if (!state || e.pointerId !== state.pointerId) return;

      if (state.moved) {
        scroller.style.scrollSnapType = "";
        delete wrapper.dataset.dragging;
        if (wrapper.hasPointerCapture(state.pointerId)) {
          wrapper.releasePointerCapture(state.pointerId);
        }

        const closest = getClosestItemIndex();
        if (closest !== null) {
          setShouldEase(true);
          setActiveIndex(closest);
          scrollToIndex(closest, "smooth");
          const target = defaultNavItems[closest];
          if (target && target.href !== pathname) {
            router.push(target.href);
          }
        }
      }

      dragState.current = null;
    };

    wrapper.addEventListener("pointerdown", onPointerDown);
    wrapper.addEventListener("pointermove", onPointerMove);
    wrapper.addEventListener("pointerup", onPointerEnd);
    wrapper.addEventListener("pointercancel", onPointerEnd);
    wrapper.addEventListener("lostpointercapture", onPointerEnd);

    return () => {
      wrapper.removeEventListener("pointerdown", onPointerDown);
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerup", onPointerEnd);
      wrapper.removeEventListener("pointercancel", onPointerEnd);
      wrapper.removeEventListener("lostpointercapture", onPointerEnd);
    };
  }, [getClosestItemIndex, playTick, scrollToIndex, pathname, router]);

  // Scroll listener for tactile tick playback on mobile touch or wheel
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const onScroll = () => {
      if (isProgrammaticScroll.current) return;

      const closest = getClosestItemIndex();
      if (closest !== null && closest !== activeIndexRef.current) {
        playTick(1.0, 0.18);
        setActiveIndex(closest);
      }

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const settled = getClosestItemIndex();
        if (settled !== null && settled !== activeIndexRef.current) {
          setActiveIndex(settled);
          const target = defaultNavItems[settled];
          if (target && target.href !== pathname) {
            router.push(target.href);
          }
        }
      }, 150);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [getClosestItemIndex, playTick, pathname, router]);

  // Click on a nav brand link
  const handleItemClick = (e: React.MouseEvent, index: number, href: string) => {
    if (dragState.current?.moved) {
      e.preventDefault();
      return;
    }
    if (index !== activeIndex) {
      playTick(1.0, 0.25);
      setShouldEase(true);
      setActiveIndex(index);
      scrollToIndex(index, "smooth");
    }
  };

  const activeItem = defaultNavItems[activeIndex] ?? defaultNavItems[0];
  const activeWidth = ready ? (layout.labelWidths[activeItem.href] ?? 0) + 20 : 0;

  return (
    <header className="nav select-none">
      <div className="nav-wrapper" ref={wrapperRef}>
        {/* Drafting Ruler Hairlines with Center Needle */}
        <div className="ruler-lines" aria-hidden="true" />

        {/* Viewport with Center-Locked Needle & Sliding Scroller */}
        <div
          className="nav-viewport"
          data-ready={ready ? "true" : "false"}
          data-ease={shouldEase ? "true" : "false"}
        >
          {/* Authentic Center-Locked Active Pill Container */}
          <div
            className="active-container"
            aria-hidden="true"
            style={
              ready
                ? {
                    width: `${activeWidth}px`
                  }
                : undefined
            }
          />

          {/* Horizontal Scroller */}
          <div className="nav-scroller" ref={scrollerRef}>
            <nav
              className="nav-content"
              aria-label="Primary navigation"
              ref={contentRef}
              style={
                ready
                  ? {
                      paddingLeft: `${layout.padLeft}px`,
                      paddingRight: `${layout.padRight}px`
                    }
                  : undefined
              }
            >
              {defaultNavItems.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={item.href}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className={`nav-brand-item ${isActive ? "nav-brand-item--active" : ""}`}
                  >
                    <Link
                      href={item.href}
                      data-label={item.label}
                      onClick={(e) => handleItemClick(e, index, item.href)}
                      onDragStart={(e) => e.preventDefault()}
                      className={`nav-brand ${isActive ? "nav-brand--active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
