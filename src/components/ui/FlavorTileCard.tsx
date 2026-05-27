"use client";

import { IconTileCard } from "@/components/ui/IconTileCard";
import { TileActionButton } from "@/components/ui/TileActionButton";

type FlavorTileCardProps = {
  name: string;
  emoji: string;
  tint: string;
  darkTint: string;
  selected: boolean;
  onToggle: () => void;
};

export function FlavorTileCard({
  name,
  emoji,
  tint,
  darkTint,
  selected,
  onToggle,
}: FlavorTileCardProps) {
  return (
    <IconTileCard
      ariaLabel={name}
      selected={selected}
      className={`bg-gradient-to-br ${tint} ${darkTint}`}
      footer={
        <TileActionButton selected={selected} ariaPressed={selected} onClick={onToggle}>
          {selected ? "Обрано" : "Обрати"}
        </TileActionButton>
      }
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-card/70 text-3xl shadow-soft transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20 sm:text-4xl">
        {emoji}
      </div>
    </IconTileCard>
  );
}
