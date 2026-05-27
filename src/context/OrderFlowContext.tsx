"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type OrderFlowContextValue = {
  isOpen: boolean;
  openOrderFlow: (scrollToId?: string) => void;
};

const OrderFlowContext = createContext<OrderFlowContextValue | null>(null);

const ORDER_SECTION_IDS = new Set(["services", "toc", "flavors", "contact"]);

export function OrderFlowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (ORDER_SECTION_IDS.has(hash)) {
      setIsOpen(true);
      setPendingScrollId(hash);
    }
  }, []);

  const openOrderFlow = useCallback((scrollToId = "services") => {
    setIsOpen(true);
    setPendingScrollId(scrollToId);
  }, []);

  useEffect(() => {
    if (!isOpen || !pendingScrollId) return;

    const timer = window.setTimeout(() => {
      document.getElementById(pendingScrollId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingScrollId(null);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [isOpen, pendingScrollId]);

  return (
    <OrderFlowContext.Provider value={{ isOpen, openOrderFlow }}>
      {children}
    </OrderFlowContext.Provider>
  );
}

export function useOrderFlow() {
  const ctx = useContext(OrderFlowContext);
  if (!ctx) {
    throw new Error("useOrderFlow must be used within OrderFlowProvider");
  }
  return ctx;
}
