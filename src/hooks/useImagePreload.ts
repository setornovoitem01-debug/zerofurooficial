import { useEffect } from "react";

/**
 * Pré-carrega uma lista de URLs de imagem no cache do browser.
 * Usado no carrossel para que trocar de imagem seja instantâneo,
 * sem esperar download no clique da seta.
 */
export function useImagePreload(urls: string[]) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const imgs = urls.map((url) => {
      const img = new Image();
      img.decoding = "async";
      img.src = url;
      return img;
    });
    return () => {
      // Solta as referências para o GC.
      imgs.length = 0;
    };
  }, [urls]);
}
