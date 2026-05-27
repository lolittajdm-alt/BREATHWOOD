"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { Reveal } from "@/components/ui/Reveal";
import { useItemsPerPage } from "@/hooks/useItemsPerPage";
import { testimonials } from "@/data/content";

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="flex h-full min-h-[240px] flex-col rounded-xl border border-ink/10 bg-white/80 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] backdrop-blur-sm sm:min-h-[300px] sm:rounded-[2rem] sm:p-8"
    >
      <div className="mb-4 flex shrink-0 gap-0.5 sm:mb-6 sm:gap-1" aria-label="5 зірок">
        {Array.from({ length: 5 }).map((_, star) => (
          <DoodleIcon key={star} type="star" className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
        ))}
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed sm:text-base md:text-lg">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="mt-6 shrink-0 border-t border-ink/10 pt-4 sm:mt-8 sm:pt-6">
        <p className="font-display text-base font-bold sm:text-lg">{item.author}</p>
        <p className="mt-1 text-xs text-muted sm:text-sm">{item.role}</p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const itemsPerPage = useItemsPerPage({ sm: 1, md: 2, lg: 3 });
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(totalPages - 1, 0)));
  }, [itemsPerPage, totalPages]);

  const currentItems = useMemo(() => {
    const start = page * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  }, [page, itemsPerPage]);

  const goTo = useCallback(
    (next: number) => {
      if (next === page) return;
      const isForward = next > page || (next === 0 && page === totalPages - 1);
      setDirection(isForward ? 1 : -1);
      setPage(next);
    },
    [page, totalPages]
  );

  const goPrev = useCallback(() => {
    goTo(page === 0 ? totalPages - 1 : page - 1);
  }, [goTo, page, totalPages]);

  const goNext = useCallback(() => {
    goTo(page === totalPages - 1 ? 0 : page + 1);
  }, [goTo, page, totalPages]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  return (
    <section
      id="testimonials"
      className="section-shell relative -mt-4 pb-12 pt-6 md:-mt-10 md:pb-16 md:pt-12"
    >
      <span className="section-number absolute top-6 right-2 sm:top-12 sm:right-4 md:right-12">
        02
      </span>

      <div className="section-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="section-heading">
              Відгуки
              <span className="text-accent">.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Попередні відгуки"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white transition-colors active:bg-accent sm:h-12 sm:w-12 sm:hover:border-ink/30 sm:hover:bg-accent"
              >
                <DoodleIcon type="arrow" className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Наступні відгуки"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white transition-colors active:bg-accent sm:h-12 sm:w-12 sm:hover:border-ink/30 sm:hover:bg-accent"
              >
                <DoodleIcon type="arrow" className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-8 overflow-x-hidden overflow-y-visible px-1 py-4 sm:mt-12 sm:py-5">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${page}-${itemsPerPage}`}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 48 : -48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -48 : 48 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
            >
              {currentItems.map((item) => (
                <div key={item.id} className="p-1 sm:p-2">
                  <TestimonialCard item={item} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Сторінка відгуків ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === page ? "w-8 bg-ink" : "w-2.5 bg-ink/20 active:bg-ink/40 sm:hover:bg-ink/40"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-muted sm:mt-4 sm:tracking-[0.25em]">
          {page + 1} / {totalPages}
        </p>
      </div>
    </section>
  );
}
