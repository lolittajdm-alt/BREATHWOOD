"use client";

import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { fruitFlavors } from "@/data/content";

export function FruitFlavors() {
  return (
    <section
      id="flavors"
      className="section-shell relative -mt-4 w-full overflow-hidden pb-12 pt-6 md:-mt-10 md:pb-32 md:pt-12"
    >
      <span className="section-number absolute bottom-4 right-1 sm:bottom-8 sm:right-4 md:right-12">
        04
      </span>

      <p
        className="bg-watermark pointer-events-none absolute top-1/2 left-1/2 max-w-[100vw] -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden font-display font-black uppercase leading-none text-ink/[0.03]"
        aria-hidden="true"
      >
        СМАКИ
      </p>

      <div className="section-container">
        <Reveal>
          <h2 className="section-heading-lg">
            ФРУКТОВІ
            <br />
            <span className="playful-tilt">СМАКИ</span>
            <span className="text-accent">.</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid items-stretch gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {fruitFlavors.map((flavor, i) => (
            <Reveal key={flavor.id} delay={i * 0.1}>
              <TiltCard className="h-full">
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}
                  transition={{ duration: 0.4 }}
                  className={`feature-card group flex h-full flex-col bg-gradient-to-br ${flavor.tint} shadow-card sm:min-h-[260px] sm:cursor-grab sm:rounded-[2rem] sm:p-8 sm:active:cursor-grabbing md:min-h-[280px]`}
                >
                  <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/50 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 sm:mb-8 sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl md:text-4xl">
                    {flavor.emoji}
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug sm:text-xl md:text-2xl">
                    {flavor.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-ink/50">
                    {flavor.abbr} · натуральний аромат
                  </p>
                  <div className="mt-auto pt-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-surface transition-transform duration-300 group-hover:scale-110">
                      <DoodleIcon type="arrow" className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
