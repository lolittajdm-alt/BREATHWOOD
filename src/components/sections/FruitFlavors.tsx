"use client";

import { FlavorTileCard } from "@/components/ui/FlavorTileCard";
import { HorizontalScrollStrip, StripItem } from "@/components/ui/HorizontalScrollStrip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { fruitFlavors } from "@/data/content";

export function FruitFlavors() {
  return (
    <section
      id="flavors"
      className="section-shell relative -mt-4 w-full overflow-x-clip overflow-y-visible pb-16 pt-8 md:-mt-10 md:pb-32 md:pt-12"
    >
      <span className="section-number absolute bottom-4 right-1 sm:bottom-8 sm:right-4 md:right-12">
        05
      </span>

      <p className="bg-watermark pointer-events-none absolute top-1/2 left-1/2 max-w-[100vw] -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden font-display font-black uppercase leading-none" aria-hidden="true">
        СМАКИ
      </p>

      <div className="section-container">
        <Reveal>
          <SectionHeading line1="ФРУКТОВІ" line2="СМАКИ" />
        </Reveal>

        <HorizontalScrollStrip ariaLabel="Фруктові смаки" className="mt-10 lg:hidden">
          {fruitFlavors.map((flavor) => (
            <StripItem key={flavor.id} columns={2}>
              <FlavorTileCard
                name={flavor.name}
                emoji={flavor.emoji}
                tint={flavor.tint}
                darkTint={flavor.darkTint}
              />
            </StripItem>
          ))}
        </HorizontalScrollStrip>

        <div className="mt-10 hidden grid-cols-3 gap-6 lg:mt-16 lg:grid">
          {fruitFlavors.map((flavor, i) => (
            <Reveal key={flavor.id} delay={i * 0.05}>
              <TiltCard className="h-full">
                <FlavorTileCard
                  name={flavor.name}
                  emoji={flavor.emoji}
                  tint={flavor.tint}
                  darkTint={flavor.darkTint}
                />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
