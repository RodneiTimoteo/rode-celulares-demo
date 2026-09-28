import type { ProdutoSelecionado } from "@/data/produtos";
import { linhasVariacao } from "@/utils/product-variants";
import { formatarMoeda, precoAtual } from "@/utils/product-price";

export const FORMAS_PAGAMENTO = [
  "Não informar",
  "Pix",
  "Cartão de Débito",
  "Cartão de Crédito",
  "Dinheiro",
] as const;

export type FormaPagamento = (typeof FORMAS_PAGAMENTO)[number];

type ItemOrcamento = ProdutoSelecionado & { quantidade: number };

export function isFormaPagamento(value: string): value is FormaPagamento {
  return FORMAS_PAGAMENTO.some((option) => option === value);
}

export function criarMensagemOrcamento({
  itens,
  endereco,
  formaPagamento,
}: {
  itens: ItemOrcamento[];
  endereco: string;
  formaPagamento: FormaPagamento;
}) {
  const produtos = itens
    .map((item) => {
      const complemento = item.selecao?.armazenamento ? "" : ` ${item.dosagem}`;
      const valorAtual = precoAtual(item);
      return [
        `${item.quantidade}x ${item.nome}${complemento}`,
        ...linhasVariacao(item),
        ...(valorAtual === undefined
          ? []
          : [`Preço: ${formatarMoeda(valorAtual)}`]),
      ].join("\n");
    })
    .join("\n");

  const detalhes: string[] = [];
  const enderecoNormalizado = endereco.trim();

  if (enderecoNormalizado) {
    detalhes.push(`Endereço:\n${enderecoNormalizado}`);
  }

  if (formaPagamento !== "Não informar") {
    detalhes.push(`Forma de pagamento:\n${formaPagamento}`);
  }

  return [
    "Olá! Gostaria de consultar estes produtos:",
    produtos,
    ...detalhes,
    "Gostaria de saber disponibilidade e condições de pagamento.",
  ].join("\n\n");
}
