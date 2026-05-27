"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { portfolioItems } from "@/data/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const doodles = [
    { type: "camera" as const, top: "18%", left: "42%", delay: 0 },
    { type: "design" as const, top: "28%", left: "55%", delay: 0.2 },
    { type: "video" as const, top: "55%", left: "38%", delay: 0.4 },
    { type: "idea" as const, top: "65%", left: "52%", delay: 0.6 },
    { type: "star" as const, top: "35%", left: "30%", delay: 0.3 },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="section-shell relative overflow-x-hidden pb-10 pt-6 sm:pb-14 sm:pt-8 md:pb-16"
    >
      <span className="section-number">01</span>

      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[min(80vw,600px)] w-[min(80vw,600px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10" />

      <div className="section-container relative z-10 mt-4 sm:mt-8">
        <div className="relative max-w-4xl">
          <motion.h1
            className="hero-title sm:leading-[0.85]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative inline-block">
              <span className="hero-title-mark">B</span>
              <span className="hero-title-mark playful-tilt">R</span>
              <span className="hero-title-mark">E</span>
              <span className="hero-title-mark playful-tilt-alt">A</span>
              <span className="hero-title-mark">T</span>
              <span className="hero-title-mark">H</span>
              <span
                className="absolute -inset-x-2 bottom-2 top-1 -z-0 rounded-2xl bg-accent md:rounded-3xl"
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          <motion.h1
            className="hero-title sm:leading-[0.85]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative inline-block">
              <span className="hero-title-mark">W</span>
              <span className="hero-title-mark playful-tilt-alt">O</span>
              <span className="hero-title-mark">O</span>
              <span className="hero-title-mark playful-tilt">D</span>
              <span className="hero-title-dot">.</span>
              <span
                className="absolute -inset-x-2 bottom-2 top-1 -z-0 rounded-2xl bg-accent md:rounded-3xl"
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          <Reveal delay={0.4}>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:mt-6 md:text-base">
              Новий ритуал замість сигарет 2026
            </p>
          </Reveal>
        </div>

        {doodles.map((d, i) => (
          <motion.div
            key={i}
            className="hero-doodle absolute hidden text-ink/30 md:block"
            style={{ top: d.top, left: d.left }}
            animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: d.delay,
            }}
          >
            <DoodleIcon type={d.type} className="h-8 w-8" />
          </motion.div>
        ))}

        <motion.p
          className="hero-side-text vertical-text absolute right-0 top-1/3 hidden text-xs font-medium uppercase tracking-[0.4em] text-muted lg:block"
          style={{ y }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          BREATH WOOD × 2026
        </motion.p>
      </div>

      <div className="section-container mt-8 sm:mt-16 md:mt-20">
        <div className="masonry-grid">
          {portfolioItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <TiltCard className="masonry-item h-full">
                <motion.div
                  className="cell-glass group relative overflow-hidden rounded-[2rem]"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 ${item.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80 transition-opacity duration-400 sm:opacity-0 sm:group-hover:opacity-100" />
                  </div>

                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="absolute bottom-3 left-3 right-3 flex items-end justify-between opacity-100 sm:bottom-4 sm:left-4 sm:right-4 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100"
                  >
                    <div>
                      <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">
                        {item.category}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold text-white md:text-xl">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
