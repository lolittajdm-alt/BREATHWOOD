"use client";

import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { orderSteps } from "@/data/content";

export function Services() {
  return (
    <section id="services" className="section-shell relative py-16 md:py-32">
      <span className="section-number absolute bottom-4 left-1 sm:bottom-12 sm:left-4 md:left-12">
        06
      </span>

      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <h2 className="section-heading">
                Як замовити
                <span className="playful-tilt text-accent">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Чотири прості кроки — і BREATH WOOD буде у вас. Оформлення займає лише кілька
                хвилин.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <MagneticButton
                href="#contact"
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-wider text-surface sm:mt-10 sm:w-auto"
              >
                Замовити
                <DoodleIcon type="arrow" className="h-4 w-4" />
              </MagneticButton>
            </Reveal>
          </div>

          <div className="space-y-4">
            {orderSteps.map((step, i) => (
              <Reveal key={step.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="group flex items-center gap-4 rounded-[1.25rem] border border-ink/8 bg-white/60 p-4 backdrop-blur-sm transition-shadow duration-300 active:shadow-[0_4px_16px_rgba(0,0,0,0.04)] sm:gap-6 sm:rounded-[1.75rem] sm:p-6 sm:hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent font-display text-xl font-extrabold text-ink sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
                    {step.id}
                  </div>
                  <h3 className="font-display text-base font-bold leading-snug sm:text-xl md:text-2xl">
                    {step.title}
                  </h3>
                  <div className="ml-auto hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 opacity-0 transition-opacity group-hover:opacity-100 md:flex">
                    <DoodleIcon type="arrow" className="h-4 w-4" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
