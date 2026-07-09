// Cliente: dispara eventos para Utmify Pixel, Facebook Pixel e dataLayer (GTM).
type PixelPayload = {
  value?: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];
  order_id?: string;
  [key: string]: unknown;
};

type PixelWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  utmify?: unknown;
  utmifyPixel?: unknown;
  dataLayer?: unknown[];
};

const MAX_WAIT_MS = 8000;
const RETRY_MS = 150;

function tryCall(fn: unknown, args: unknown[]): boolean {
  if (typeof fn === "function") {
    try {
      (fn as (...a: unknown[]) => void)(...args);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export function firePixelEvent(eventName: string, payload: PixelPayload = {}) {
  if (typeof window === "undefined") return;
  const w = window as PixelWindow;

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: eventName, ...payload });

  tryCall(w.fbq, ["track", eventName, payload]);

  const start = Date.now();
  const tryUtmify = () => {
    const utmifyFn = (w.utmify ?? w.utmifyPixel) as unknown;
    if (tryCall(utmifyFn, ["track", eventName, payload])) return;
    if (
      utmifyFn &&
      typeof utmifyFn === "object" &&
      typeof (utmifyFn as { track?: unknown }).track === "function"
    ) {
      try {
        (utmifyFn as { track: (...a: unknown[]) => void }).track(eventName, payload);
        return;
      } catch {
        /* retry */
      }
    }
    if (Date.now() - start < MAX_WAIT_MS) setTimeout(tryUtmify, RETRY_MS);
  };
  tryUtmify();
}
