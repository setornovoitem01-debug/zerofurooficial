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

function read(): CartItem | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem) : null;
  } catch {
    return null;
  }
}

function write(item: CartItem | null) {
  if (typeof window === "undefined") return;
  try {
    if (item) window.sessionStorage.setItem(KEY, JSON.stringify(item));
    else window.sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function setCartItem(item: CartItem) {
  write(item);
}

export function clearCart() {
  write(null);
}

export function useCart(): CartItem | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    read,
    () => null,
  );
}
