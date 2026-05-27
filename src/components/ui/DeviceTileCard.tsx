"use client";

import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { IconTileCard } from "@/components/ui/IconTileCard";
import { TileActionButton } from "@/components/ui/TileActionButton";

const iconMap = {
  design: "design" as const,
  camera: "camera" as const,
  video: "video" as const,
  edit: "idea" as const,
};

type DeviceTileCardProps = {
  title: string;
  icon: string;
};

export function DeviceTileCard({ title, icon }: DeviceTileCardProps) {
  return (
    <IconTileCard
      ariaLabel={title}
      footer={<TileActionButton href="#flavors">Купити</TileActionButton>}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink/10 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20 sm:rounded-2xl">
        <DoodleIcon
          type={iconMap[icon as keyof typeof iconMap]}
          className="h-8 w-8 text-ink sm:h-11 sm:w-11"
        />
      </div>
    </IconTileCard>
  );
}
