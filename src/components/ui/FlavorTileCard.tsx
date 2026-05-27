"use client";

import Image from "next/image";
import { IconTileCard } from "@/components/ui/IconTileCard";
import { TileActionButton } from "@/components/ui/TileActionButton";

type FlavorTileCardProps = {
  name: string;
  image: string;
  tint: string;
  darkTint: string;
  selected: boolean;
  onToggle: () => void;
};

export function FlavorTileCard({
  name,
  image,
  tint,
  darkTint,
  selected,
  onToggle,
}: FlavorTileCardProps) {
  return (
    <IconTileCard
      ariaLabel={name}
      selected={selected}
      className={`relative overflow-hidden p-0 ${tint} ${darkTint}`}
      footer={
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center sm:bottom-4">
          <div className="pointer-events-auto">
            <TileActionButton selected={selected} ariaPressed={selected} onClick={onToggle}>
              {selected ? "Обрано" : "Обрати"}
            </TileActionButton>
          </div>
        </div>
      }
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </IconTileCard>
  );
}
