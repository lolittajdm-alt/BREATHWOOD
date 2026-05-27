"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const repoBasePath = pathname?.startsWith("/BREATHWOOD") ? "/BREATHWOOD" : "";
  const imageSrc = image.startsWith(repoBasePath) ? image : `${repoBasePath}${image}`;

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
      <div className="h-14 w-14 overflow-hidden rounded-xl bg-card/70 shadow-soft transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
        <Image
          src={imageSrc}
          alt={name}
          width={120}
          height={120}
          className="h-full w-full object-cover"
        />
      </div>
    </IconTileCard>
  );
}
