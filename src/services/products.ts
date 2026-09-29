import type { CorProduto, Produto } from "@/data/produtos";

export type ProdutoApi = Produto;

type ProductsApiResponse = {
  success: boolean;
  total: number;
  produtos: unknown[];
};

function textoObrigatorio(valor: unknown): string | undefined {
  return typeof valor === "string" && valor.trim() ? valor.trim() : undefined;
}

function textoOpcional(valor: unknown): string | undefined {
  return textoObrigatorio(valor);
}

function normalizarId(valor: unknown): number | undefined {
  const id = typeof valor === "number" ? valor : Number(valor);
  return Number.isInteger(id) && id > 0 ? id : undefined;
}

function normalizarPreco(valor: unknown): number | undefined {
  if (typeof valor === "number") {
    return Number.isFinite(valor) && valor >= 0 ? valor : undefined;
  }
  if (typeof valor !== "string" || !valor.trim()) return undefined;

  let texto = valor.trim().replace(/R\$|\s/g, "");
  if (texto.includes(",")) {
    texto = texto.replace(/\./g, "").replace(",", ".");
  } else if (/^\d{1,3}(\.\d{3})+$/.test(texto)) {
    texto = texto.replace(/\./g, "");
  }

  const numero = Number(texto);
  return Number.isFinite(numero) && numero >= 0 ? numero : undefined;
}

export function normalizarBooleano(valor: unknown): boolean | undefined {
  if (typeof valor === "boolean") return valor;
  if (typeof valor === "number") {
    return valor === 1 ? true : valor === 0 ? false : undefined;
  }
  if (typeof valor !== "string") return undefined;

  const texto = valor.trim().toLocaleLowerCase("pt-BR");
  if (["true", "1", "sim", "s"].includes(texto)) return true;
  if (["false", "0", "não", "nao", "n"].includes(texto)) return false;
  return undefined;
}

function normalizarCores(valor: unknown): CorProduto[] | undefined {
  const itens =
    typeof valor === "string"
      ? valor.split(/[,;|]/)
      : Array.isArray(valor)
        ? valor
        : [];

  const cores = itens.flatMap((item) => {
    if (typeof item === "string" && item.trim()) {
      return [{ nome: item.trim() }];
    }
    if (typeof item !== "object" || item === null) return [];
    const cor = item as Record<string, unknown>;
    const nome = textoObrigatorio(cor.nome);
    if (!nome) return [];
    return [{ nome, hex: textoOpcional(cor.hex) }];
  });

  return cores.length ? cores : undefined;
}

function normalizarProduto(valor: unknown): ProdutoApi | null {
  if (typeof valor !== "object" || valor === null) return null;
  const produto = valor as Record<string, unknown>;

  const ativo = normalizarBooleano(produto.ativo);
  if (ativo !== true) return null;

  const id = normalizarId(produto.id);
  const nome = textoObrigatorio(produto.nome);
  const categoria = textoObrigatorio(produto.categoria);
  if (!id || !nome || !categoria) return null;

  const slug = textoOpcional(produto.slug);
  const marca = textoOpcional(produto.marca);
  const modelo = textoOpcional(produto.modelo);
  const armazenamento = textoOpcional(produto.armazenamento);
  const cores = normalizarCores(produto.cores);
  const precoOriginal = normalizarPreco(produto.preco_original);
  const precoPromocional = normalizarPreco(produto.preco_promocional);
  const temPromocao = normalizarBooleano(produto.tem_promocao) ?? false;
  const ofertaTerminaEm = textoOpcional(produto.oferta_termina_em);
  const destaque = normalizarBooleano(produto.destaque) ?? false;

  return {
    id,
    slug,
    nome,
    marca,
    modelo,
    categoria,
    armazenamento,
    dosagem: armazenamento ?? modelo ?? "",
    exigeReceita: false,
    descricao: textoOpcional(produto.descricao),
    precoOriginal,
    precoPromocional: precoPromocional ?? null,
    temPromocao,
    ofertaTerminaEm: ofertaTerminaEm ?? null,
    destaque,
    ativo,
    imagem: textoOpcional(produto.imagem),
    variacoes:
      armazenamento || cores
        ? {
            armazenamento: armazenamento ? [armazenamento] : undefined,
            cores,
          }
        : undefined,
  };
}

function validarResposta(valor: unknown): ProductsApiResponse {
  if (typeof valor !== "object" || valor === null) {
    throw new Error("A API retornou uma resposta inválida");
  }

  const resposta = valor as Record<string, unknown>;
  if (
    normalizarBooleano(resposta.success) !== true ||
    !Array.isArray(resposta.produtos)
  ) {
    throw new Error("A API não retornou um catálogo válido");
  }

  return {
    success: true,
    total:
      typeof resposta.total === "number" && Number.isFinite(resposta.total)
        ? resposta.total
        : resposta.produtos.length,
    produtos: resposta.produtos,
  };
}

function getProductsApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_PRODUCTS_API_URL?.trim();
  if (!url) {
    throw new Error("NEXT_PUBLIC_PRODUCTS_API_URL não configurada");
  }
  return url;
}

export async function getProducts(signal?: AbortSignal): Promise<ProdutoApi[]> {
  const url = getProductsApiUrl();

  if (process.env.NODE_ENV === "development") {
    console.info("[RODE Celulares] Consultando catálogo", { url });
  }

  const resposta = await fetch(url, { signal, cache: "no-store" });
  if (!resposta.ok) {
    throw new Error(`Falha ao carregar o catálogo (HTTP ${resposta.status})`);
  }
  if (!resposta.headers.get("content-type")?.includes("application/json")) {
    throw new Error("A API de produtos não retornou JSON");
  }

  const dados = validarResposta(await resposta.json());
  const produtos = dados.produtos
    .map(normalizarProduto)
    .filter((produto): produto is ProdutoApi => produto !== null);

  if (process.env.NODE_ENV === "development") {
    console.info("[RODE Celulares] Catálogo carregado", {
      recebidos: dados.total,
      ativos: produtos.length,
    });
  }

  return produtos;
}
