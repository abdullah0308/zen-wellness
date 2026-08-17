"use client";

import { useEffect, useRef, useState } from "react";

export type SpineSection = {
  /** Element id on the page, without the leading #. */
  id: string;
  /** Short label shown next to the dot. */
  label: string;
};

/**
 * The page's signature element.
 *
 * The logo's six dots read as vertebrae. This takes that idea to page scale: a
 * spine down the left edge, one vertebra per section, filling as you descend.
 * It earns its place by carrying real information (where you are, how much is
 * left, and a way to jump) rather than decorating the margin.
 *
 * Only shown from 1600px up. The content column is 1400px wide, so below that
 * there is no gutter to sit in and the rail lands on top of the headline. The
 * nav already covers wayfinding at narrower sizes.
 *
 * Position comes from IntersectionObserver, never a scroll listener.
 */
export function SpineRail({ sections }: { sections: SpineSection[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Tracks visibility ratio per section so the most-visible one wins, which
  // avoids the dot flickering between two sections at a boundary.
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) {
          const next = sections.findIndex((s) => s.id === bestId);
          if (next !== -1) setActiveIndex(next);
        }
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9] }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [sections]);

  const progress = sections.length > 1 ? activeIndex / (sections.length - 1) : 0;

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 [@media(min-width:1600px)]:block"
    >
      <ol className="relative flex flex-col gap-7">
        {/* the spine itself: a track, and a fill that grows as you descend */}
        <span
          aria-hidden="true"
          className="absolute left-[3px] top-1 bottom-1 w-px bg-bone/12"
        />
        <span
          aria-hidden="true"
          className="spine-fill absolute left-[3px] top-1 bottom-1 w-px bg-teal/70"
          style={{ transform: `scaleY(${progress})` }}
        />

        {sections.map((section, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={section.id} className="pointer-events-auto relative">
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-3"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  aria-hidden="true"
                  data-active={isActive}
                  className={`spine-dot block h-[7px] w-[7px] rounded-full ${
                    i <= activeIndex ? "bg-teal/70" : "bg-bone/25"
                  }`}
                />
                <span
                  className={`whitespace-nowrap text-[11px] tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-bone opacity-100"
                      : "text-mist opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
