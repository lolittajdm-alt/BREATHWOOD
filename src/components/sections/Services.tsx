"use client";

import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { orderSteps } from "@/data/content";

export function Services() {
  return (
    <section id="services" className="section-shell relative py-12 md:py-32">
      <span className="section-number absolute bottom-4 left-1 sm:bottom-12 sm:left-4 md:left-12">
        06
      </span>

      <div className="section-container">
        <div className="services-layout grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <Reveal>
              <SectionHeading line1="ЯК" line2="ЗАМОВИТИ" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
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
            {orderSteps.map((step, i) => {
              const stepClassName =
                "group flex items-center gap-3 rounded-xl border border-border bg-card/80 p-3.5 backdrop-blur-sm transition-shadow duration-300 active:shadow-soft sm:gap-6 sm:rounded-[1.75rem] sm:p-6 sm:hover:shadow-soft";

              const stepContent = (
                <>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent font-display text-xl font-extrabold text-ink sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
                    {step.id}
                  </div>
                  <h3 className="font-display text-base font-bold leading-snug sm:text-xl md:text-2xl">
                    {step.title}
                  </h3>
                  <div
                    className={`ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card transition-opacity sm:h-10 sm:w-10 ${
                      "href" in step && step.href
                        ? "opacity-100 sm:opacity-70 sm:group-hover:opacity-100"
                        : "hidden opacity-0 md:flex md:opacity-0 md:group-hover:opacity-100"
                    }`}
                  >
                    <DoodleIcon type="arrow" className="h-4 w-4" />
                  </div>
                </>
              );

              return (
                <Reveal key={step.id} delay={i * 0.1}>
                  {"href" in step && step.href ? (
                    <motion.a
                      href={step.href}
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                      className={`${stepClassName} cursor-pointer`}
                    >
                      {stepContent}
                    </motion.a>
                  ) : (
                    <motion.div
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                      className={stepClassName}
                    >
                      {stepContent}
                    </motion.div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
