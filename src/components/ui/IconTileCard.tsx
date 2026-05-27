"use client";

import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import type { ReactNode } from "react";

type IconTileCardProps = {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
};

export function IconTileCard({ ariaLabel, children, className = "" }: IconTileCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.35 }}
      aria-label={ariaLabel}
      className={`device-card group flex flex-col items-center justify-between border border-border/40 bg-accent shadow-card ${className}`}
    >
      <div className="flex flex-1 items-center justify-center">{children}</div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-surface transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
        <DoodleIcon type="arrow" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </div>
    </motion.div>
  );
}
