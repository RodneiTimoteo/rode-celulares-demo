"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import type { Produto, SelecaoProduto } from "@/data/produtos";
import { Button, Container, SectionTitle, buttonStyles } from "@/components/ui";
import { useCatalog } from "@/components/catalog/catalog-provider";
import { QuotePanel } from "@/components/catalog/quote-panel";
import { ProductCard } from "@/components/home/product-card";
import { ProductImage } from "@/components/product/product-image";
import { OfferCountdown } from "@/components/product/offer-countdown";
import { ProductPrice } from "@/components/product/product-price";
import { useOfferClock } from "@/hooks/use-offer-clock";
import { whatsappUrl } from "@/utils/whatsapp";
import { criarMensagemOrcamento } from "@/utils/quote-message";
import {
  formatarMoeda,
  precoAtual,
  temPromocaoValida,
} from "@/utils/product-price";
import {
  comSelecao,
  mesmoProduto,
  selecaoInicial,
} from "@/utils/product-variants";

export function ProductLoadError() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <main id="catalogo" className="flex-1">
      <Container className="py-16">
        <section role="alert" className="ui-card text-center">
          <SectionTitle as="h1" className="text-3xl">
            Não foi possível carregar o produto.
          </SectionTitle>
          <p className="mt-4 text-muted">
            Tente novamente em alguns instantes.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              disabled={pending}
              onClick={() => startTransition(() => router.refresh())}
            >
              {pending ? "Tentando novamente…" : "Tentar novamente"}
            </Button>
            <Link href="/produtos" className={buttonStyles("secondary")}>
              Ver catálogo
            </Link>
          </div>
        </section>
        <div className="mx-auto mt-10 max-w-3xl">
          <QuotePanel />
        </div>
      </Container>
    </main>
  );
}

function VariationOptions({
  produto,
  selecao,
  onChange,
}: {
  produto: Produto;
  selecao: SelecaoProduto;
  onChange: (selecao: SelecaoProduto) => void;
}) {
  return (
    <div className="mt-7 space-y-6">
      {produto.variacoes?.armazenamento?.length ? (
        <fieldset>
          <legend className="text-sm font-semibold text-foreground">
            Armazenamento
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {produto.variacoes.armazenamento.map((valor) => (
              <button
                key={valor}
                type="button"
                className={`product-option ${selecao.armazenamento === valor ? "is-selected" : ""}`}
                aria-pressed={selecao.armazenamento === valor}
                onClick={() => onChange({ ...selecao, armazenamento: valor })}
              >
                {valor}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {produto.variacoes?.cores?.length ? (
        <fieldset>
          <legend className="text-sm font-semibold text-foreground">Cor</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {produto.variacoes.cores.map((cor) => (
              <button
                key={cor.nome}
                type="button"
                className={`product-option product-option--color ${selecao.cor === cor.nome ? "is-selected" : ""}`}
                aria-pressed={selecao.cor === cor.nome}
                onClick={() => onChange({ ...selecao, cor: cor.nome })}
              >
                <span
                  className="product-color-swatch"
                  style={{ backgroundColor: cor.hex ?? "#dedfe3" }}
                  aria-hidden="true"
                />
                {cor.nome}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {produto.variacoes?.modelosCompativeis?.length ? (
        <fieldset>
          <legend className="text-sm font-semibold text-foreground">
            Modelo compatível
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {produto.variacoes.modelosCompativeis.map((modelo) => (
              <button
                key={modelo}
                type="button"
                className={`product-option ${selecao.modeloCompativel === modelo ? "is-selected" : ""}`}
                aria-pressed={selecao.modeloCompativel === modelo}
                onClick={() =>
                  onChange({ ...selecao, modeloCompativel: modelo })
                }
              >
                {modelo}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}
    </div>
  );
}

export function ProductDetail({
  produto,
  related,
}: {
  produto: Produto;
  related: Produto[];
}) {
  const { carrinho, adicionarAoCarrinho } = useCatalog();
  const agora = useOfferClock();
  const [selecao, setSelecao] = useState<SelecaoProduto>(() =>
    selecaoInicial(produto),
  );
  const [quantidadeDesejada, setQuantidadeDesejada] = useState(1);
  const [feedback, setFeedback] = useState(false);
  const produtoSelecionado = useMemo(
    () => comSelecao(produto, selecao),
    [produto, selecao],
  );
  const promocaoAtiva = temPromocaoValida(produto, agora);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(false), 2800);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const quantidadeNoCarrinho =
    carrinho.find((item) => mesmoProduto(item, produtoSelecionado))
      ?.quantidade ?? 0;
  const categoryHref = `/produtos?categoria=${encodeURIComponent(produto.categoria)}`;
  const mensagemWhatsApp = criarMensagemOrcamento({
    itens: [{ ...produtoSelecionado, quantidade: quantidadeDesejada }],
    endereco: "",
    formaPagamento: "Não informar",
  });

  function adicionar() {
    adicionarAoCarrinho(produtoSelecionado, quantidadeDesejada);
    setFeedback(true);
  }

  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <Container className="py-8 md:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs leading-relaxed text-muted"
        >
          <Link href="/" className="hover:text-health">
            Início
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/produtos" className="hover:text-health">
            Produtos
          </Link>
          <span aria-hidden="true">›</span>
          <Link href={categoryHref} className="hover:text-health">
            {produto.categoria}
          </Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page" className="text-brand">
            {produto.nome}
          </span>
        </nav>

        <section
          className="product-detail-grid grid items-start gap-9 lg:grid-cols-2 lg:gap-16"
          aria-label="Detalhes do produto"
        >
          <ProductImage produto={produto} priority />

          <div className="min-w-0 lg:py-4">
            <p className="eyebrow">{produto.marca ?? "RODE Celulares"}</p>
            <SectionTitle as="h1" className="break-words text-3xl md:text-5xl">
              {produto.nome}
            </SectionTitle>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">
              {produto.descricao ??
                "Conheça este produto e consulte com nossa equipe as opções disponíveis."}
            </p>
            <ProductPrice
              className="mt-6"
              precoOriginal={produto.precoOriginal ?? produto.preco}
              precoPromocional={produto.precoPromocional}
              temPromocao={produto.temPromocao}
              ofertaTerminaEm={produto.ofertaTerminaEm}
              agora={agora}
              size="detail"
              showBadge
            />
            {promocaoAtiva && (
              <OfferCountdown
                ofertaTerminaEm={produto.ofertaTerminaEm}
                agora={agora}
                variant="detail"
                className="mt-5"
              />
            )}

            <VariationOptions
              produto={produto}
              selecao={selecao}
              onChange={setSelecao}
            />

            <div className="mt-7">
              <p className="text-sm font-semibold text-foreground">
                Quantidade
              </p>
              <div className="mt-3 flex w-fit items-center rounded-xl border border-border bg-surface p-1">
                <button
                  type="button"
                  className="product-quantity-button"
                  aria-label="Diminuir quantidade"
                  disabled={quantidadeDesejada === 1}
                  onClick={() =>
                    setQuantidadeDesejada((atual) => Math.max(1, atual - 1))
                  }
                >
                  −
                </button>
                <span
                  className="min-w-12 text-center font-semibold"
                  aria-live="polite"
                >
                  {quantidadeDesejada}
                </span>
                <button
                  type="button"
                  className="product-quantity-button"
                  aria-label="Aumentar quantidade"
                  onClick={() => setQuantidadeDesejada((atual) => atual + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button onClick={adicionar} className="w-full">
                Adicionar ao carrinho
              </Button>
              <a
                href={whatsappUrl(mensagemWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles("whatsapp", "w-full")}
              >
                Consultar pelo WhatsApp
              </a>
            </div>
            <p className="mt-4 min-h-5 text-sm text-health" aria-live="polite">
              {feedback
                ? `${quantidadeDesejada} ${quantidadeDesejada === 1 ? "item adicionado" : "itens adicionados"} ao carrinho.`
                : quantidadeNoCarrinho > 0
                  ? `${quantidadeNoCarrinho} desta opção no carrinho.`
                  : ""}
            </p>
          </div>
        </section>

        <section
          className="product-service-strip mt-12"
          aria-label="Informações de atendimento"
        >
          {[
            "Atendimento rápido pelo WhatsApp",
            "Consulte disponibilidade",
            "Consulte formas de pagamento",
            "Retirada em uma de nossas unidades",
          ].map((texto) => (
            <div key={texto} className="product-service-item">
              <span aria-hidden="true">✓</span>
              <p>{texto}</p>
            </div>
          ))}
        </section>

        <section className="ui-card mt-10" aria-labelledby="product-info">
          <SectionTitle id="product-info" className="text-2xl">
            Informações do produto
          </SectionTitle>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Produto", produto.nome],
              ["Marca", produto.marca ?? "Consulte nossa equipe"],
              ["Categoria", produto.categoria],
              ["Preço atual", formatarMoeda(precoAtual(produto, agora))],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="mt-2 font-medium text-brand">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="py-14">
            <div className="section-heading">
              <SectionTitle id="related-title" className="text-2xl">
                Produtos relacionados
              </SectionTitle>
              <Link
                href={categoryHref}
                className="text-sm font-semibold text-health"
              >
                Ver categoria ↗
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} produto={item} />
              ))}
            </div>
          </section>
        )}

        <div className="mx-auto my-12 max-w-3xl">
          <QuotePanel />
        </div>
        <Link href="/produtos" className="font-semibold text-health">
          ← Voltar para produtos
        </Link>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Catálogo demonstrativo. Produtos, preços e informações apresentados
          neste projeto são fictícios e não representam disponibilidade
          comercial.
        </p>
      </Container>
    </main>
  );
}
