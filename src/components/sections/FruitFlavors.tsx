"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { FlavorTileCard } from "@/components/ui/FlavorTileCard";
import { HorizontalScrollStrip, StripItem } from "@/components/ui/HorizontalScrollStrip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fruitFlavors } from "@/data/content";

export function FruitFlavors() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const toggleFlavor = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const renderFlavorCard = (flavor: (typeof fruitFlavors)[number]) => (
    <FlavorTileCard
      name={flavor.name}
      emoji={flavor.emoji}
      tint={flavor.tint}
      darkTint={flavor.darkTint}
      selected={selectedIds.has(flavor.id)}
      onToggle={() => toggleFlavor(flavor.id)}
    />
  );

  const selectedCount = selectedIds.size;

  return (
    <section
      id="flavors"
      className="section-shell relative -mt-4 w-full overflow-x-clip overflow-y-visible pb-16 pt-8 md:-mt-10 md:pb-32 md:pt-12"
    >
      <span className="section-number absolute bottom-4 right-1 sm:bottom-8 sm:right-4 md:right-12">
        05
      </span>

      <p
        className="bg-watermark pointer-events-none absolute top-1/2 left-1/2 max-w-[100vw] -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden font-display font-black uppercase leading-none"
        aria-hidden="true"
      >
        СМАКИ
      </p>

      <div className="section-container">
        <Reveal>
          <SectionHeading line1="ФРУКТОВІ" line2="СМАКИ" />
        </Reveal>

        <p className="mt-4 text-sm text-muted sm:mt-6">Можна обрати кілька смаків</p>

        <HorizontalScrollStrip
          ariaLabel="Фруктові смаки"
          className="mt-8 lg:mt-12"
          showHint={selectedCount === 0}
        >
          {fruitFlavors.map((flavor) => (
            <StripItem key={flavor.id} columns={3}>
              {renderFlavorCard(flavor)}
            </StripItem>
          ))}
        </HorizontalScrollStrip>

        <AnimatePresence>
          {selectedCount > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex justify-center sm:mt-10"
            >
              <a
                href="#contact"
                className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-wider text-surface shadow-card transition-transform active:scale-[0.98] sm:w-auto sm:px-12 sm:py-5 sm:text-base"
              >
                Далі
                <span className="ml-2 rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-ink">
                  {selectedCount}
                </span>
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
