"use client";

import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { HorizontalScrollStrip, StripItem } from "@/components/ui/HorizontalScrollStrip";
import { IconTileCard } from "@/components/ui/IconTileCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { tocCards } from "@/data/content";

const iconMap = {
  design: "design" as const,
  camera: "camera" as const,
  video: "video" as const,
  edit: "idea" as const,
};

function DeviceCard({ card }: { card: (typeof tocCards)[number] }) {
  return (
    <IconTileCard ariaLabel={card.title}>
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink/10 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20 sm:rounded-2xl">
        <DoodleIcon
          type={iconMap[card.icon as keyof typeof iconMap]}
          className="h-8 w-8 text-ink sm:h-11 sm:w-11"
        />
      </div>
    </IconTileCard>
  );
}

export function TableOfContent() {
  return (
    <section
      id="toc"
      className="section-shell relative w-full overflow-x-clip py-16 md:py-32"
    >
      <span className="section-number absolute bottom-4 right-1 sm:bottom-8 sm:right-4 md:right-12">
        04
      </span>

      <p className="bg-watermark pointer-events-none absolute top-1/2 left-1/2 max-w-[100vw] -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden font-display font-black uppercase leading-none" aria-hidden="true">
        ПРИСТРОЇ
      </p>

      <div className="section-container">
        <Reveal>
          <SectionHeading line1="НАШІ" line2="ПРИСТРОЇ" />
        </Reveal>

        <HorizontalScrollStrip ariaLabel="Пристрої" className="mt-10 lg:hidden">
          {tocCards.map((card) => (
            <StripItem key={card.id} columns={2}>
              <DeviceCard card={card} />
            </StripItem>
          ))}
        </HorizontalScrollStrip>

        <div className="mt-10 hidden grid-cols-4 gap-6 lg:mt-16 lg:grid">
          {tocCards.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.1}>
              <TiltCard className="h-full">
                <DeviceCard card={card} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
