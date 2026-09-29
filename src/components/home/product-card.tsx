"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { productSlug } from "@/utils/slug";
import { Badge, Card, buttonStyles } from "@/components/ui";
import { useCatalog } from "@/components/catalog/catalog-provider";
import { ProductImage } from "@/components/product/product-image";
import { OfferCountdown } from "@/components/product/offer-countdown";
import { ProductPrice } from "@/components/product/product-price";
import type { Produto } from "@/data/produtos";
import { useOfferClock } from "@/hooks/use-offer-clock";
import {
  armazenamentoPrincipal,
  comSelecao,
  selecaoInicial,
  temVariacoesParaSelecionar,
} from "@/utils/product-variants";
import {
  ofertaTerminaEmTimestamp,
  temPromocaoValida,
} from "@/utils/product-price";

export function ProductCard({ produto }: { produto: Produto }) {
  const router = useRouter();
  const { adicionarAoCarrinho } = useCatalog();
  const [adicionado, setAdicionado] = useState(false);
  const agora = useOfferClock();
  const href = `/produtos/${productSlug(produto)}`;
  const armazenamento = armazenamentoPrincipal(produto);
  const emPromocao = temPromocaoValida(produto, agora);
  const possuiContagem =
    emPromocao &&
    agora > 0 &&
    ofertaTerminaEmTimestamp(produto.ofertaTerminaEm) !== null;
  const exigeSelecao = temVariacoesParaSelecionar(produto);

  useEffect(() => {
    if (!adicionado) return;
    const timer = window.setTimeout(() => setAdicionado(false), 2200);
    return () => window.clearTimeout(timer);
  }, [adicionado]);

  function adicionar() {
    if (exigeSelecao) {
      router.push(href);
      return;
    }

    adicionarAoCarrinho(comSelecao(produto, selecaoInicial(produto)), 1);
    setAdicionado(true);
  }

  return (
    <Card className="product-card flex h-full flex-col">
      <Link
        href={href}
        className="product-card__media"
        aria-label={`Ver detalhes de ${produto.nome}`}
      >
        <ProductImage produto={produto} compact />
        {emPromocao && (
          <Badge variant="offer" className="product-card__offer">
            Oferta
          </Badge>
        )}
      </Link>
      {possuiContagem && (
        <OfferCountdown
          ofertaTerminaEm={produto.ofertaTerminaEm}
          agora={agora}
          className="mt-3"
        />
      )}
      <p
        className={`product-card__brand ${possuiContagem ? "mt-3" : "mt-5"} text-xs font-semibold uppercase tracking-wider text-health`}
      >
        {produto.marca ?? "RODE Celulares"}
      </p>
      <h3 className="product-card__title mt-2 text-xl font-bold text-brand">
        <Link
          href={href}
          className="rounded-sm transition-colors hover:text-health"
        >
          {produto.nome}
        </Link>
      </h3>
      <div className="product-card__storage-slot mt-2">
        {armazenamento && (
          <p className="product-card__storage text-sm text-muted">
            {armazenamento}
          </p>
        )}
      </div>
      <ProductPrice
        className="product-card__price mb-6 mt-4"
        precoOriginal={produto.precoOriginal ?? produto.preco}
        precoPromocional={produto.precoPromocional}
        temPromocao={produto.temPromocao}
        ofertaTerminaEm={produto.ofertaTerminaEm}
        agora={agora}
      />
      <button
        type="button"
        className={buttonStyles("secondary", "mt-auto w-full")}
        onClick={adicionar}
        aria-live="polite"
      >
        {adicionado ? "Adicionado ✓" : "Adicionar ao carrinho"}
      </button>
    </Card>
  );
}
