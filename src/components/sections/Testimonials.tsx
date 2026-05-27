"use client";

import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { HorizontalScrollStrip, StripItem } from "@/components/ui/HorizontalScrollStrip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/content";

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className="testimonial-card flex h-[260px] flex-col rounded-[1.5rem] border border-border bg-card p-5 shadow-soft backdrop-blur-sm sm:h-[300px] sm:rounded-[2rem] sm:p-6"
    >
      <div className="mb-3 flex h-5 shrink-0 items-center gap-0.5 sm:mb-4 sm:h-6 sm:gap-1" aria-label="5 зірок">
        {Array.from({ length: 5 }).map((_, star) => (
          <DoodleIcon key={star} type="star" className="h-3.5 w-3.5 text-accent sm:h-5 sm:w-5" />
        ))}
      </div>
      <blockquote className="line-clamp-6 flex-1 text-xs leading-relaxed sm:line-clamp-7 sm:text-base">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="mt-4 shrink-0 border-t border-border pt-3 sm:mt-5 sm:pt-4">
        <p className="truncate font-display text-sm font-bold sm:text-lg">{item.author}</p>
        <p className="mt-0.5 truncate text-[10px] text-muted sm:text-sm">{item.role}</p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-shell relative -mt-4 overflow-x-clip pb-12 pt-8 md:-mt-10 md:pb-16 md:pt-12"
    >
      <span className="section-number absolute top-6 right-2 sm:top-12 sm:right-4 md:right-12">
        02
      </span>

      <div className="section-container">
        <Reveal>
          <SectionHeading line1="ВІДГУКИ" line2="КЛІЄНТІВ" />
        </Reveal>

        <HorizontalScrollStrip ariaLabel="Відгуки клієнтів" className="mt-8 sm:mt-12">
          {testimonials.map((item) => (
            <StripItem key={item.id} columns={2}>
              <TestimonialCard item={item} />
            </StripItem>
          ))}
        </HorizontalScrollStrip>
      </div>
    </section>
  );
}
