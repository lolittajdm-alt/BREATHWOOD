"use client";

import { useEffect, useState } from "react";

export function useDesktopLayout() {
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);

  useEffect(() => {
    const read = () => {
      setIsDesktopLayout(document.documentElement.dataset.desktopLayout === "true");
    };
    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-desktop-layout"],
    });

    window.addEventListener("resize", read);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", read);
    };
  }, []);

  return isDesktopLayout;
}
