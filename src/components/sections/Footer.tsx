"use client";

import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { MagneticButton } from "@/components/ui/MagneticButton";

const links = [
  { label: "Про мене", href: "#about" },
  { label: "Смаки", href: "#flavors" },
  { label: "Замовити", href: "#services" },
  { label: "Контакти", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="section-shell relative border-t border-ink/10 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:py-16">
      <div className="section-container">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h2
              className="font-display text-[clamp(1.375rem,6.5vw,4rem)] font-extrabold leading-none"
              whileHover={{ scale: 1.02 }}
            >
              BREATH
              <br />
              <span className="playful-tilt text-accent">WOOD</span>
              <span className="text-ink/30">.</span>
            </motion.h2>
            <p className="mt-4 text-xs text-muted sm:text-sm">
              © 2026 BREATH WOOD. Усі права захищено.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="animated-underline py-1 text-xs font-medium uppercase tracking-wider sm:text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <MagneticButton
            href="#hero"
            className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full border border-ink/20 bg-white transition-colors active:bg-accent sm:h-14 sm:w-14 sm:self-auto sm:hover:bg-accent"
          >
            <DoodleIcon type="arrow" className="h-5 w-5 -rotate-90" />
          </MagneticButton>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 sm:mt-16 sm:gap-4">
          <div className="h-px flex-1 bg-ink/10" />
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-muted sm:text-xs sm:tracking-[0.3em]">
            Створено з любов’ю у 2026
          </p>
          <div className="h-px flex-1 bg-ink/10" />
        </div>
      </div>
    </footer>
  );
}
