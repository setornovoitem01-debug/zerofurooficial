import { useEffect } from "react";

/**
 * Pré-carrega uma lista de URLs de imagem no cache do browser.
 * Usado no carrossel para que trocar de imagem seja instantâneo,
 * sem esperar download no clique da seta.
 */
export function useImagePreload(urls: string[]) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Dispara os downloads em paralelo; o browser cacheia por URL.
    // Não guardamos referências — o cache HTTP faz o trabalho.
    for (const url of urls) {
      const img = new Image();
      img.decoding = "async";
      img.src = url;
    }
  }, [urls]);
}
