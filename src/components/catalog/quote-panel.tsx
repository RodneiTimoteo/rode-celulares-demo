"use client";
import { Button } from "@/components/ui";
import { FORMAS_PAGAMENTO, type FormaPagamento } from "@/utils/quote-message";
import { chaveProduto, linhasVariacao } from "@/utils/product-variants";
import { formatarMoeda, precoAtual } from "@/utils/product-price";
import { useOfferClock } from "@/hooks/use-offer-clock";
import { useCatalog } from "./catalog-provider";
export function QuotePanel({ className = "" }: { className?: string }) {
  const agora = useOfferClock();
  const {
    carrinho,
    quantidadeTotal,
    mostrarConfirmacao,
    setMostrarConfirmacao,
    enderecoOrcamento,
    setEnderecoOrcamento,
    formaPagamento,
    setFormaPagamento,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    solicitarOrcamento,
    limparCarrinho,
  } = useCatalog();
  return (
    <aside
      id="orcamento"
      aria-label="Meu orçamento"
      className={`ui-card h-fit ${className}`}
    >
      <h2 className="text-xl font-bold text-foreground">Meu orçamento</h2>

      <p className="mt-1 text-sm text-muted">
        {quantidadeTotal} item(ns) selecionado(s)
      </p>

      {carrinho.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-muted">Nenhum produto adicionado.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {carrinho.map((item) => (
            <div
              key={chaveProduto(item)}
              className="border-b border-border pb-4"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground">{item.nome}</h3>
                  {linhasVariacao(item).length ? (
                    <ul className="mt-1 space-y-0.5 text-sm text-muted">
                      {linhasVariacao(item).map((linha) => (
                        <li key={linha}>{linha}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted">{item.dosagem}</p>
                  )}
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {formatarMoeda(precoAtual(item, agora))}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removerProduto(item)}
                  className="text-xs font-medium text-danger hover:text-danger"
                >
                  Remover
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  aria-label={`Diminuir quantidade de ${item.nome}`}
                  onClick={() => diminuirQuantidade(item)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border font-bold text-foreground"
                >
                  −
                </button>

                <span className="min-w-6 text-center font-semibold text-foreground">
                  {item.quantidade}
                </span>

                <button
                  type="button"
                  aria-label={`Aumentar quantidade de ${item.nome}`}
                  onClick={() => aumentarQuantidade(item)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border font-bold text-foreground"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {carrinho.length > 0 && (
        <>
          <section
            className="mt-6 rounded-2xl border border-border bg-background p-4"
            aria-labelledby="informacoes-orcamento"
          >
            <h3
              id="informacoes-orcamento"
              className="font-semibold text-foreground"
            >
              Informações para o orçamento
            </h3>
            <p id="informacoes-opcionais" className="mt-1 text-xs text-muted">
              Essas informações são opcionais.
            </p>

            <div className="mt-4">
              <label
                htmlFor="endereco-orcamento"
                className="text-sm font-semibold text-foreground"
              >
                Endereço (opcional)
              </label>
              <textarea
                id="endereco-orcamento"
                className="ui-input mt-2 min-h-24 resize-y text-sm"
                rows={3}
                autoComplete="street-address"
                placeholder="Rua, número, bairro ou referência"
                aria-describedby="informacoes-opcionais"
                value={enderecoOrcamento}
                onChange={(event) => setEnderecoOrcamento(event.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="pagamento-orcamento"
                className="text-sm font-semibold text-foreground"
              >
                Forma de pagamento (opcional)
              </label>
              <select
                id="pagamento-orcamento"
                className="ui-input mt-2 text-sm"
                aria-describedby="informacoes-opcionais"
                value={formaPagamento}
                onChange={(event) =>
                  setFormaPagamento(event.target.value as FormaPagamento)
                }
              >
                {FORMAS_PAGAMENTO.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <Button
            type="button"
            onClick={solicitarOrcamento}
            variant="whatsapp"
            className="mt-6 w-full"
          >
            Solicitar orçamento pelo WhatsApp
          </Button>
        </>
      )}

      {mostrarConfirmacao && (
        <section
          aria-labelledby="confirmacao-orcamento"
          aria-live="polite"
          className="mt-6 rounded-2xl border border-brand-soft bg-brand-soft p-4"
        >
          <h3
            id="confirmacao-orcamento"
            className="font-semibold text-foreground"
          >
            Já enviou sua solicitação?
          </h3>

          <p className="mt-2 text-sm text-muted">
            Se o orçamento já foi enviado pelo WhatsApp, você pode limpar o
            carrinho.
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <Button
              type="button"
              onClick={limparCarrinho}
              variant="primary"
              className="w-full"
            >
              Sim, limpar carrinho
            </Button>

            <Button
              type="button"
              onClick={() => setMostrarConfirmacao(false)}
              variant="secondary"
              className="w-full"
            >
              Continuar comprando
            </Button>
          </div>
        </section>
      )}
    </aside>
  );
}
