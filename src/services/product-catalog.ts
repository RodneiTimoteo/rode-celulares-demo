import { cache } from "react";
import { getProducts } from "./products";
// Compartilha a leitura entre a página e generateMetadata durante a requisição.
export const getProductCatalog = cache(async () => {
  try {
    return {
      products: await getProducts(AbortSignal.timeout(15000)),
      error: false as const,
    };
  } catch {
    return { products: [], error: true as const };
  }
});
