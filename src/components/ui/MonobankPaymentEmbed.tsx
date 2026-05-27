"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MonobankPaymentEmbedProps = {
  pageUrl: string;
  amountUah: number;
  onClose: () => void;
};

export function MonobankPaymentEmbed({
  pageUrl,
  amountUah,
  onClose,
}: MonobankPaymentEmbedProps) {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.data !== "string" && typeof event.data !== "object") return;

      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data?.message === "close-button") {
          onClose();
        }
      } catch {
        // Ignore non-JSON postMessage payloads from other scripts.
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        id="monobank-payment"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-surface"
      >
        <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-4 py-3 sm:px-5">
          <div>
            <p className="font-display text-base font-bold sm:text-lg">Оплата monobank</p>
            <p className="mt-0.5 text-sm text-muted">
              До сплати: {amountUah.toLocaleString("uk-UA")} ₴
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-ink/5 hover:text-ink"
          >
            Назад
          </button>
        </div>

        <div className="relative w-full bg-white">
          <iframe
            id="payFrame"
            title="monopay"
            src={pageUrl}
            allow="payment *"
            className="mx-auto block min-h-[560px] w-full max-w-[600px] border-0 sm:min-h-[600px]"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
