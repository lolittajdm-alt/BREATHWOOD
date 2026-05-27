"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-shell relative py-12 md:py-32">
      <span className="section-number absolute top-6 right-2 sm:top-10 sm:right-4 md:right-12">
        07
      </span>

      <div className="section-container">
        <Reveal>
          <SectionHeading line1="ДАВАЙ ПОЗНАЙОМИМОСЬ" line2="БЛИЖЧЕ" />
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="glass mt-6 w-full rounded-xl p-5 sm:mt-8 sm:rounded-[2rem] sm:p-8 md:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                  <DoodleIcon type="star" className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold">Повідомлення надіслано!</h3>
                <p className="mt-2 text-muted">Відповім протягом 24 годин.</p>
              </motion.div>
            ) : (
              <>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Ім’я
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="mt-2 w-full border-b border-ink/15 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink max-sm:text-base"
                      placeholder="Ваше ім’я"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="mt-2 w-full border-b border-ink/15 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink max-sm:text-base"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Повідомлення
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      className="mt-2 w-full resize-none border-b border-ink/15 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink"
                      placeholder="Розкажіть про ваш проєкт..."
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <MagneticButton
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 text-sm font-semibold uppercase tracking-wider text-surface sm:w-auto sm:px-10"
                  >
                    Надіслати
                    <DoodleIcon type="arrow" className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="contact-footer mt-20 grid gap-6 border-t border-border pt-16 sm:grid-cols-[1fr_auto]">
            <div className="glass rounded-3xl p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold md:text-3xl">Контакти</h3>
              <ul className="mt-6 space-y-3 text-sm md:text-base">
                <li>
                  <a
                    href="mailto:hello@breathwood.com"
                    className="animated-underline hover:text-ink"
                  >
                    hello@breathwood.com
                  </a>
                </li>
                <li>
                  <a href="tel:+380441234567" className="animated-underline hover:text-ink">
                    +38 (044) 123-45-67
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animated-underline hover:text-ink"
                  >
                    @breathwood.ua
                  </a>
                </li>
                <li>
                  <a href="#hero" className="animated-underline hover:text-ink">
                    breathwood.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="mx-auto flex aspect-square w-full max-w-[10rem] items-center justify-center rounded-3xl bg-accent p-6 sm:mx-0 sm:w-40 sm:max-w-none">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${[0, 1, 2, 4, 5, 6, 10, 12, 14, 18, 20, 22, 24].includes(i) ? "bg-ink" : "bg-transparent"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
