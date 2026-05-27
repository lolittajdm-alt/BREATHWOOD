"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const DESIGN_WIDTH = 1280;
const MOBILE_MAX = 639;

export function MobileDesktopScale({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const root = document.documentElement;

    const updateScale = () => {
      const mobile = window.innerWidth <= MOBILE_MAX;
      const nextScale = mobile ? window.innerWidth / DESIGN_WIDTH : 1;
      setScale(nextScale);
      root.dataset.desktopLayout = mobile ? "true" : "false";
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
      delete root.dataset.desktopLayout;
    };
  }, []);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setContentHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (scale >= 1) {
    return <>{children}</>;
  }

  const scaledHeight = contentHeight * scale;

  return (
    <div className="w-full overflow-x-hidden" style={{ height: scaledHeight || undefined }}>
      <div
        ref={innerRef}
        className="origin-top-left"
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
