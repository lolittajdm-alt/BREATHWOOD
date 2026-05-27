"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { DoodleIcon } from "@/components/ui/DoodleIcon";

type HorizontalScrollStripProps = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
};

export function HorizontalScrollStrip({
  children,
  ariaLabel,
  className = "",
}: HorizontalScrollStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollByStep = useCallback((direction: -1 | 1) => {
    const strip = stripRef.current;
    if (!strip) return;
    const firstItem = strip.querySelector<HTMLElement>("[data-strip-item]");
    const gap = parseFloat(getComputedStyle(strip).columnGap || getComputedStyle(strip).gap) || 12;
    const step = (firstItem?.offsetWidth ?? strip.clientWidth / 3) + gap;
    strip.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <div className={className}>
      <div className="mb-4 flex justify-end gap-2 sm:mb-5">
        <button
          type="button"
          onClick={() => scrollByStep(-1)}
          aria-label={`${ariaLabel}: попередні`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-white transition-colors active:bg-accent sm:h-10 sm:w-10 sm:hover:border-ink/30 sm:hover:bg-accent"
        >
          <DoodleIcon type="arrow" className="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scrollByStep(1)}
          aria-label={`${ariaLabel}: наступні`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-white transition-colors active:bg-accent sm:h-10 sm:w-10 sm:hover:border-ink/30 sm:hover:bg-accent"
        >
          <DoodleIcon type="arrow" className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={stripRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="card-strip -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 touch-pan-x sm:-mx-6 sm:gap-4 sm:px-6 md:mx-0 md:px-0"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByStep(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByStep(1);
          }
        }}
      >
        {children}
      </div>

      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-muted sm:text-xs">
        Гортайте вліво або вправо
      </p>
    </div>
  );
}

export function StripItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-strip-item className={`card-strip-item h-full shrink-0 snap-start ${className}`}>
      {children}
    </div>
  );
}
