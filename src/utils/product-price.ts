import type { Produto } from "@/data/produtos";

export type ProductPriceData = {
  precoOriginal?: number | null;
  precoPromocional?: number | null;
  temPromocao?: boolean;
  /** Compatibilidade com carrinhos gravados antes da migração. */
  preco?: number | null;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function precoValido(valor: unknown): valor is number {
  return typeof valor === "number" && Number.isFinite(valor) && valor >= 0;
}

export function formatarMoeda(valor?: number | null): string {
  return precoValido(valor)
    ? currencyFormatter.format(valor)
    : "Consulte o valor";
}

export function precoOriginalDoProduto(
  produto: ProductPriceData,
): number | undefined {
  if (precoValido(produto.precoOriginal)) return produto.precoOriginal;
  return precoValido(produto.preco) ? produto.preco : undefined;
}

export function temPromocaoValida(produto: ProductPriceData): boolean {
  return produto.temPromocao === true && precoValido(produto.precoPromocional);
}

export function precoAtual(produto: ProductPriceData): number | undefined {
  if (temPromocaoValida(produto)) return produto.precoPromocional ?? undefined;
  return precoOriginalDoProduto(produto);
}

export function dadosDePreco(produto: Produto): ProductPriceData {
  return {
    precoOriginal: produto.precoOriginal,
    precoPromocional: produto.precoPromocional,
    temPromocao: produto.temPromocao,
    preco: produto.preco,
  };
}
