"use client";

import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { HorizontalScrollStrip, StripItem } from "@/components/ui/HorizontalScrollStrip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { fruitFlavors } from "@/data/content";

export function FruitFlavors() {
  return (
    <section
      id="flavors"
      className="section-shell relative -mt-4 w-full overflow-x-clip overflow-y-visible pb-16 pt-8 md:-mt-10 md:pb-32 md:pt-12"
    >
      <span className="section-number absolute bottom-4 right-1 sm:bottom-8 sm:right-4 md:right-12">
        05
      </span>

      <p
        className="bg-watermark pointer-events-none absolute top-1/2 left-1/2 max-w-[100vw] -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden font-display font-black uppercase leading-none text-ink/[0.03]"
        aria-hidden="true"
      >
        СМАКИ
      </p>

      <div className="section-container">
        <Reveal>
          <SectionHeading line1="ФРУКТОВІ" line2="СМАКИ" />
        </Reveal>

        <HorizontalScrollStrip ariaLabel="Фруктові смаки" className="mt-10 lg:mt-16">
          {fruitFlavors.map((flavor, i) => (
            <StripItem key={flavor.id} columns={3}>
              <Reveal delay={i * 0.05} className="h-full w-full">
                <TiltCard className="h-full">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.35 }}
                    className={`flavor-card group flex aspect-square h-full flex-col bg-gradient-to-br ${flavor.tint} ring-1 ring-ink/10 shadow-[0_12px_36px_rgba(0,0,0,0.1)]`}
                  >
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/60 text-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:text-3xl">
                        {flavor.emoji}
                      </div>
                      <h3 className="mt-3 font-display text-sm font-bold leading-tight sm:text-base">
                        {flavor.name}
                      </h3>
                      <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-ink/50 sm:text-xs">
                        {flavor.abbr}
                      </p>
                    </div>
                    <div className="flex justify-center pt-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-surface transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9">
                        <DoodleIcon type="arrow" className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </Reveal>
            </StripItem>
          ))}
        </HorizontalScrollStrip>
      </div>
    </section>
  );
}
