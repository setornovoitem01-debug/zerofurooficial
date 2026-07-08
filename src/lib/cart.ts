import { useSyncExternalStore } from "react";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
};

const KEY = "zerofuro:cart";

const listeners = new Set<() => void>();

// Cache do snapshot para manter identidade de referência estável entre renders.
// Sem isso, useSyncExternalStore vê um objeto novo a cada leitura (JSON.parse)
// e entra em loop infinito de re-render.
let cachedRaw: string | null = null;
let cachedItem: CartItem | null = null;
let cacheInitialized = false;

function read(): CartItem | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.sessionStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (cacheInitialized && raw === cachedRaw) return cachedItem;
  cachedRaw = raw;
  cacheInitialized = true;
  try {
    cachedItem = raw ? (JSON.parse(raw) as CartItem) : null;
  } catch {
    cachedItem = null;
  }
  return cachedItem;
}

function write(item: CartItem | null) {
  if (typeof window === "undefined") return;
  try {
    if (item) window.sessionStorage.setItem(KEY, JSON.stringify(item));
    else window.sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  // Invalida o cache para a próxima leitura reflitir o valor gravado.
  cacheInitialized = false;
  listeners.forEach((l) => l());
}

export function setCartItem(item: CartItem) {
  write(item);
}

export function clearCart() {
  write(null);
}

const getServerSnapshot = () => null;

export function useCart(): CartItem | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
    read,
    getServerSnapshot,
  );
}
