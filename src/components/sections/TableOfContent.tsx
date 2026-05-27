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
      className="section-shell relative w-full overflow-hidden py-16 md:py-32"
    >
      <span className="section-number absolute bottom-4 right-1 sm:bottom-8 sm:right-4 md:right-12">
        04
      </span>

      <p
        className="bg-watermark pointer-events-none absolute top-1/2 left-1/2 max-w-[100vw] -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden font-display font-black uppercase leading-none text-ink/[0.03]"
        aria-hidden="true"
      >
        ПРИСТРОЇ
      </p>

      <div className="section-container">
        <Reveal>
          <h2 className="section-heading-lg">
            <span className="playful-tilt">ПРИСТРОЇ</span>
            <span className="text-accent">.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {tocCards.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.1}>
              <TiltCard className="h-full">
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}
                  transition={{ duration: 0.4 }}
                  aria-label={card.title}
                  className="device-card group flex flex-col items-center justify-between bg-accent shadow-card sm:cursor-grab sm:active:cursor-grabbing"
                >
                  <div className="flex flex-1 items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink/10 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20 sm:rounded-2xl">
                      <DoodleIcon
                        type={iconMap[card.icon as keyof typeof iconMap]}
                        className="h-8 w-8 text-ink sm:h-11 sm:w-11"
                      />
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-surface transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                    <DoodleIcon type="arrow" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
