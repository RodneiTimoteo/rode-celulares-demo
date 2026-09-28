export type CorProduto = {
  nome: string;
  hex?: string;
};

export type VariacoesProduto = {
  armazenamento?: string[];
  cores?: CorProduto[];
  modelosCompativeis?: string[];
};

export type SelecaoProduto = {
  armazenamento?: string;
  cor?: string;
  modeloCompativel?: string;
};

export type Produto = {
  id: number;
  slug?: string;
  nome: string;
  marca?: string;
  modelo?: string;
  categoria: string;
  armazenamento?: string;
  dosagem: string;
  exigeReceita: boolean;
  descricao?: string;
  precoOriginal?: number;
  precoPromocional?: number | null;
  temPromocao: boolean;
  destaque: boolean;
  ativo: boolean;
  /** Compatibilidade com itens persistidos antes da estrutura promocional. */
  preco?: number;
  imagem?: string;
  variacoes?: VariacoesProduto;
};

export type ProdutoSelecionado = Produto & {
  selecao?: SelecaoProduto;
};
