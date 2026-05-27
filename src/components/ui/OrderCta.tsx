"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { useOrderFlow } from "@/context/OrderFlowContext";

export function OrderCta() {
  const { openOrderFlow } = useOrderFlow();

  return (
    <section className="section-shell relative pb-4 pt-2 md:pb-8">
      <div className="section-container">
        <Reveal>
          <motion.button
            type="button"
            onClick={() => openOrderFlow("services")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="section-heading-lg text-left transition-opacity hover:opacity-90"
          >
            <span className="playful-tilt">ЗАМОВИТИ</span>
            <span className="text-accent">.</span>
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
