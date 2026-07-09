export const PRODUCTS = {
  "carro-13-15": { name: "Kit Selante Zero Furo — Aro 13 a 15", price: 95.0 },
  "carro-16-18": { name: "Kit Selante Zero Furo — Aro 16 a 18", price: 110.5 },
  "carro-19-23": { name: "Kit Selante Zero Furo — Aro 19 a 23", price: 129.79 },
  "compressor-3em1": {
    name: "Compressor de Ar Portátil 3 em 1 com Carregador Power Bank e Lanterna LED",
    price: 55.9,
  },
} as const;

export type ProductId = keyof typeof PRODUCTS;

export const COMPRESSOR_BUMP_ID = "compressor-3em1" satisfies ProductId;

export const SHIPPING_PRICES = {
  gratis: 0,
  sedex: 25.68,
  sedex12: 68.75,
} as const;

export type ShippingId = keyof typeof SHIPPING_PRICES;

export function isSealantKitId(id: string): id is Extract<ProductId, `carro-${string}`> {
  return id === "carro-13-15" || id === "carro-16-18" || id === "carro-19-23";
}