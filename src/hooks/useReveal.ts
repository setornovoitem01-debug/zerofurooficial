import { useEffect, useLayoutEffect, useRef, useState } from "react";

// useLayoutEffect on client, useEffect on server — prevents SSR warnings while
// still running BEFORE paint on the client (kills the visible→hidden→visible flash).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  // Start visible so SSR HTML matches and hydration is stable.
  const [visible, setVisible] = useState(true);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Measure synchronously before paint.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    // Above the fold: keep visible, no observer, no wasted render.
    if (inView) return;

    // Below the fold: hide before the browser paints, then observe.
    setVisible(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}
