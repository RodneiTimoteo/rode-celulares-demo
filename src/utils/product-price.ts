import type { Produto } from "@/data/produtos";

export type ProductPriceData = {
  precoOriginal?: number | null;
  precoPromocional?: number | null;
  temPromocao?: boolean;
  ofertaTerminaEm?: string | null;
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

function timestampRecife({
  ano,
  mes,
  dia,
  hora,
  minuto,
  segundo,
}: {
  ano: number;
  mes: number;
  dia: number;
  hora: number;
  minuto: number;
  segundo: number;
}): number | null {
  if (
    ano < 1000 ||
    mes < 1 ||
    mes > 12 ||
    dia < 1 ||
    dia > new Date(Date.UTC(ano, mes, 0)).getUTCDate() ||
    hora < 0 ||
    hora > 23 ||
    minuto < 0 ||
    minuto > 59 ||
    segundo < 0 ||
    segundo > 59
  ) {
    return null;
  }

  const doisDigitos = (valor: number) => String(valor).padStart(2, "0");
  // America/Recife usa UTC-03:00, sem horário de verão nas datas do catálogo.
  const iso = `${ano}-${doisDigitos(mes)}-${doisDigitos(dia)}T${doisDigitos(hora)}:${doisDigitos(minuto)}:${doisDigitos(segundo)}-03:00`;
  const timestamp = Date.parse(iso);
  return Number.isFinite(timestamp) ? timestamp : null;
}

export function ofertaTerminaEmTimestamp(valor?: string | null): number | null {
  if (typeof valor !== "string" || !valor.trim()) return null;
  const data = valor.trim();

  const brasileira = data.match(
    /^(\d{2})\/(\d{2})\/(\d{4})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/,
  );
  if (brasileira) {
    return timestampRecife({
      dia: Number(brasileira[1]),
      mes: Number(brasileira[2]),
      ano: Number(brasileira[3]),
      hora: Number(brasileira[4]),
      minuto: Number(brasileira[5]),
      segundo: Number(brasileira[6] ?? 0),
    });
  }

  const isoSemFuso = data.match(
    /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/,
  );
  if (isoSemFuso) {
    return timestampRecife({
      ano: Number(isoSemFuso[1]),
      mes: Number(isoSemFuso[2]),
      dia: Number(isoSemFuso[3]),
      hora: Number(isoSemFuso[4]),
      minuto: Number(isoSemFuso[5]),
      segundo: Number(isoSemFuso[6] ?? 0),
    });
  }

  const timestamp = Date.parse(data);
  return Number.isFinite(timestamp) ? timestamp : null;
}

export function temPromocaoValida(
  produto: ProductPriceData,
  agora = Date.now(),
): boolean {
  if (produto.temPromocao !== true || !precoValido(produto.precoPromocional)) {
    return false;
  }

  const terminaEm = ofertaTerminaEmTimestamp(produto.ofertaTerminaEm);
  return terminaEm === null || agora < terminaEm;
}

export function precoAtual(
  produto: ProductPriceData,
  agora = Date.now(),
): number | undefined {
  if (temPromocaoValida(produto, agora)) {
    return produto.precoPromocional ?? undefined;
  }
  return precoOriginalDoProduto(produto);
}

export function dadosDePreco(produto: Produto): ProductPriceData {
  return {
    precoOriginal: produto.precoOriginal,
    precoPromocional: produto.precoPromocional,
    temPromocao: produto.temPromocao,
    ofertaTerminaEm: produto.ofertaTerminaEm,
    preco: produto.preco,
  };
}
