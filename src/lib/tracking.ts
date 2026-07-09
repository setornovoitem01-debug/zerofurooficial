// Captura utm_* / src / sck da URL na primeira visita e persiste em localStorage,
// para que o checkout envie os mesmos parâmetros ao gateway + Utmify.
const KEYS = ["src", "sck", "utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term"] as const;

export type TrackingBag = Partial<Record<(typeof KEYS)[number], string | null>>;

export function captureTracking() {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const existing = JSON.parse(localStorage.getItem("__tracking") || "{}") as TrackingBag;
    const next: TrackingBag = { ...existing };
    let changed = false;
    for (const k of KEYS) {
      const v = url.searchParams.get(k);
      if (v && next[k] !== v) {
        next[k] = v;
        changed = true;
      }
    }
    if (changed) localStorage.setItem("__tracking", JSON.stringify(next));
  } catch {
    /* noop */
  }
}

export function getTracking(): TrackingBag {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("__tracking") || "{}") as TrackingBag;
  } catch {
    return {};
  }
}
