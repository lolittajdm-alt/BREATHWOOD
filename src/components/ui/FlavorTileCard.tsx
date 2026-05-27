"use client";

import { IconTileCard } from "@/components/ui/IconTileCard";

type FlavorTileCardProps = {
  name: string;
  emoji: string;
  tint: string;
  darkTint: string;
};

export function FlavorTileCard({ name, emoji, tint, darkTint }: FlavorTileCardProps) {
  return (
    <IconTileCard
      ariaLabel={name}
      className={`bg-gradient-to-br ${tint} ${darkTint}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-card/70 text-3xl shadow-soft transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20 sm:text-4xl">
        {emoji}
      </div>
    </IconTileCard>
  );
}
