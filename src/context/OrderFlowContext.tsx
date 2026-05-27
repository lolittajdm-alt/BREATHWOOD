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
  showCheckout: boolean;
  selectedFlavorIds: number[];
  openOrderFlow: (scrollToId?: string) => void;
  proceedToCheckout: (flavorIds: number[]) => void;
};

const OrderFlowContext = createContext<OrderFlowContextValue | null>(null);

export function OrderFlowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedFlavorIds, setSelectedFlavorIds] = useState<number[]>([]);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  const openOrderFlow = useCallback((scrollToId = "services") => {
    setIsOpen(true);
    setShowCheckout(false);
    setSelectedFlavorIds([]);
    setPendingScrollId(scrollToId);
  }, []);

  const proceedToCheckout = useCallback((flavorIds: number[]) => {
    if (flavorIds.length < 1) return;
    setSelectedFlavorIds(flavorIds);
    setShowCheckout(true);
    setPendingScrollId("contact");
  }, []);

  useEffect(() => {
    if (!isOpen || !pendingScrollId) return;

    const delay = pendingScrollId === "contact" ? 420 : 180;

    const timer = window.setTimeout(() => {
      document.getElementById(pendingScrollId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingScrollId(null);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isOpen, pendingScrollId, showCheckout]);

  return (
    <OrderFlowContext.Provider
      value={{
        isOpen,
        showCheckout,
        selectedFlavorIds,
        openOrderFlow,
        proceedToCheckout,
      }}
    >
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
