"use client";

import { AnimatePresence, motion } from "framer-motion";

type MonobankPaymentModalProps = {
  open: boolean;
  pageUrl: string;
  amountUah: number;
  onClose: () => void;
};

export function MonobankPaymentModal({
  open,
  pageUrl,
  amountUah,
  onClose,
}: MonobankPaymentModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="monobank-payment-title"
        >
          <motion.div
            className="flex w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-card shadow-card"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <div>
                <p id="monobank-payment-title" className="font-display text-lg font-bold">
                  Оплата monobank
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  До сплати: {amountUah.toLocaleString("uk-UA")} ₴
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-3 py-1 text-sm text-muted transition-colors hover:bg-ink/5 hover:text-ink"
                aria-label="Закрити"
              >
                Закрити
              </button>
            </div>

            <div className="relative h-[min(70vh,520px)] w-full bg-surface">
              <iframe
                src={pageUrl}
                title="Оплата monobank"
                className="h-full w-full border-0"
                allow="payment"
              />
            </div>

            <div className="border-t border-ink/10 px-5 py-3">
              <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink underline-offset-2 hover:underline"
              >
                Відкрити оплату в новій вкладці
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
