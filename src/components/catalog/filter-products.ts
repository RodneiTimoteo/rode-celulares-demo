import type { Produto } from "@/data/produtos";
export function filterProducts<T extends Produto>(
  produtos: T[],
  busca: string,
  categoria: string,
): T[] {
  const termo = busca.toLowerCase().trim();
  return produtos.filter((produto) => {
    const termosProduto = [
      produto.nome,
      produto.marca,
      produto.modelo,
      produto.categoria,
      produto.armazenamento,
      produto.dosagem,
      ...(produto.variacoes?.armazenamento ?? []),
      ...(produto.variacoes?.cores?.map((cor) => cor.nome) ?? []),
      ...(produto.variacoes?.modelosCompativeis ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      (categoria === "Todos" ||
        produto.categoria.trim() === categoria.trim()) &&
      (!termo || termosProduto.includes(termo))
    );
  });
}
