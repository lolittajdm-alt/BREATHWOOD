"use client";

import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { tocCards } from "@/data/content";

const iconMap = {
  design: "design" as const,
  camera: "camera" as const,
  video: "video" as const,
  edit: "idea" as const,
};

export function TableOfContent() {
  return (
    <section
      id="toc"
      className="section-shell relative w-full overflow-hidden py-6 md:py-32"
    >
      <span className="section-number absolute bottom-4 right-1 sm:bottom-8 sm:right-4 md:right-12">
        05
      </span>

      <p
        className="bg-watermark pointer-events-none absolute top-1/2 left-1/2 max-w-[100vw] -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden font-display font-black uppercase leading-none text-ink/[0.03]"
        aria-hidden="true"
      >
        ЗМІСТ
      </p>

      <div className="section-container">
        <Reveal>
          <h2 className="section-heading-lg">
            ЗМІСТ
            <br />
            <span className="playful-tilt">НАВИЧОК</span>
            <span className="text-accent">.</span>
          </h2>
        </Reveal>

        <div className="mt-4 grid items-stretch gap-2 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {tocCards.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.1}>
              <TiltCard className="h-full">
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}
                  transition={{ duration: 0.4 }}
                  className="feature-card group flex h-full flex-col bg-accent shadow-card sm:min-h-[260px] sm:cursor-grab sm:rounded-[2rem] sm:p-8 sm:active:cursor-grabbing md:min-h-[280px]"
                >
                  <div className="mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/10 transition-transform duration-300 group-hover:scale-110 sm:mb-8 sm:h-16 sm:w-16 sm:rounded-2xl">
                    <DoodleIcon
                      type={iconMap[card.icon as keyof typeof iconMap]}
                      className="h-5 w-5 text-ink sm:h-10 sm:w-10"
                    />
                  </div>
                  <h3 className="font-display text-sm font-bold leading-snug sm:text-xl md:text-2xl">
                    {card.title}
                  </h3>
                  <div className="mt-auto pt-3 sm:pt-8">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-surface transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                    <DoodleIcon type="arrow" className="h-3 w-3 sm:h-4 sm:w-4" />
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
