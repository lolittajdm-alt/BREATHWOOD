"use client";

import { DeviceTileCard } from "@/components/ui/DeviceTileCard";
import { HorizontalScrollStrip, StripItem } from "@/components/ui/HorizontalScrollStrip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { tocCards } from "@/data/content";

export function TableOfContent() {
  return (
    <section
      id="toc"
      className="section-shell relative w-full overflow-x-clip py-16 md:py-32"
    >
      <span className="section-number absolute bottom-4 right-1 sm:bottom-8 sm:right-4 md:right-12">
        04
      </span>

      <p
        className="bg-watermark pointer-events-none absolute top-1/2 left-1/2 max-w-[100vw] -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden font-display font-black uppercase leading-none"
        aria-hidden="true"
      >
        ПРИСТРОЇ
      </p>

      <div className="section-container">
        <Reveal>
          <SectionHeading line1="НАШІ" line2="ПРИСТРОЇ" />
        </Reveal>

        <HorizontalScrollStrip ariaLabel="Пристрої" className="mt-10 lg:hidden">
          {tocCards.map((card) => (
            <StripItem key={card.id} columns={2}>
              <DeviceTileCard title={card.title} icon={card.icon} />
            </StripItem>
          ))}
        </HorizontalScrollStrip>

        <div className="mt-10 hidden grid-cols-4 gap-6 lg:mt-16 lg:grid">
          {tocCards.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.1}>
              <TiltCard className="h-full">
                <DeviceTileCard title={card.title} icon={card.icon} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
