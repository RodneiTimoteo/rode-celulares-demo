"use client";

import { useCatalog } from "@/components/catalog/catalog-provider";
import { CatalogLoading } from "@/components/catalog/catalog-controls";
import { ProductCard } from "@/components/home/product-card";
import { Button } from "@/components/ui";
import { temPromocaoValida } from "@/utils/product-price";

export function OfferSelections() {
  const { produtos, carregandoProdutos, erroProdutos, tentarNovamente } =
    useCatalog();

  if (carregandoProdutos) return <CatalogLoading />;

  if (erroProdutos) {
    return (
      <div role="alert" className="ui-card text-center">
        <p className="text-muted">
          Não foi possível carregar os produtos em destaque agora.
        </p>
        <Button className="mt-5" onClick={tentarNovamente}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  const destaques = [...produtos]
    .sort((a, b) => Number(temPromocaoValida(b)) - Number(temPromocaoValida(a)))
    .slice(0, 6);

  if (destaques.length === 0) {
    return (
      <p className="rounded-xl border border-border p-5 text-sm text-muted">
        Nenhum produto disponível nesta seleção no momento.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {destaques.map((produto) => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}
