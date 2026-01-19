"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Normal expo out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initial scroll offset for anchor links if they are in the URL
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash) as HTMLElement;
      if (el) {
        lenis.scrollTo(el);
      }
    }

    // Intercept all internal anchor clicks to use Lenis scrollTo
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (
        anchor &&
        anchor.hash &&
        anchor.origin === window.location.origin &&
        anchor.pathname === window.location.pathname
      ) {
        // Special case for '#' (top)
        if (anchor.hash === "#") {
          e.preventDefault();
          lenis.scrollTo(0);
          window.history.pushState(null, "", window.location.pathname);
          return;
        }

        const targetElement = document.querySelector(
          anchor.hash
        ) as HTMLElement;
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            offset: -80, // Match the 5rem padding
            duration: 2, // 2 seconds for a calmer feel
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
          });
          // Update URL hash without jumping
          window.history.pushState(null, "", anchor.hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, true); // Use capture phase

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, []);

  return <>{children}</>;
}
