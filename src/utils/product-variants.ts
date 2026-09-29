import type {
  Produto,
  ProdutoSelecionado,
  SelecaoProduto,
} from "@/data/produtos";

export function selecaoInicial(produto: Produto): SelecaoProduto {
  return {
    armazenamento: produto.variacoes?.armazenamento?.[0],
    cor: produto.variacoes?.cores?.[0]?.nome,
    modeloCompativel: produto.variacoes?.modelosCompativeis?.[0],
  };
}

export function comSelecao(
  produto: Produto,
  selecao: SelecaoProduto,
): ProdutoSelecionado {
  const valores = Object.values(selecao).filter(Boolean);
  return valores.length ? { ...produto, selecao } : produto;
}

export function chaveProduto(produto: ProdutoSelecionado): string {
  return JSON.stringify([
    produto.id,
    produto.nome,
    produto.dosagem,
    produto.selecao?.armazenamento ?? "",
    produto.selecao?.cor ?? "",
    produto.selecao?.modeloCompativel ?? "",
  ]);
}

export function mesmoProduto(
  a: ProdutoSelecionado,
  b: ProdutoSelecionado,
): boolean {
  return chaveProduto(a) === chaveProduto(b);
}

export function armazenamentoPrincipal(produto: Produto): string | undefined {
  return produto.variacoes?.armazenamento?.[0];
}

export function temVariacoesParaSelecionar(produto: Produto): boolean {
  return [
    produto.variacoes?.armazenamento,
    produto.variacoes?.cores,
    produto.variacoes?.modelosCompativeis,
  ].some((opcoes) => (opcoes?.length ?? 0) > 1);
}

export function linhasVariacao(produto: ProdutoSelecionado): string[] {
  const linhas: string[] = [];
  if (produto.selecao?.armazenamento) {
    linhas.push(`Armazenamento: ${produto.selecao.armazenamento}`);
  }
  if (produto.selecao?.cor) linhas.push(`Cor: ${produto.selecao.cor}`);
  if (produto.selecao?.modeloCompativel) {
    linhas.push(`Modelo compatível: ${produto.selecao.modeloCompativel}`);
  }
  return linhas;
}
