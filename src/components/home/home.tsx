"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCatalog } from "@/components/catalog/catalog-provider";
import { filterProducts } from "@/components/catalog/filter-products";
import { HeroCarousel } from "@/components/home/hero-carousel";
import {
  AdvantagesSection,
  BrandsSection,
  CategorySection,
  FeaturedProducts,
  FinalCta,
  HomeSearch,
  LocationsSection,
} from "@/components/home/sections";

export default function Home() {
  const [busca, setBusca] = useState("");
  const router = useRouter();
  const { produtos, carregandoProdutos, erroProdutos } = useCatalog();

  const sugestoes = useMemo(
    () =>
      busca.trim() ? filterProducts(produtos, busca, "Todos").slice(0, 5) : [],
    [produtos, busca],
  );

  const destaques = useMemo(() => {
    return produtos.filter((produto) => produto.destaque).slice(0, 6);
  }, [produtos]);

  function abrirBusca(termo: string) {
    const buscaNormalizada = termo.trim();
    router.push(
      buscaNormalizada
        ? `/produtos?busca=${encodeURIComponent(buscaNormalizada)}`
        : "/produtos",
    );
  }

  function abrirCategoria(categoria: string) {
    router.push(`/produtos?categoria=${encodeURIComponent(categoria)}`);
  }

  return (
    <main id="catalogo" tabIndex={-1} className="flex-1 bg-background">
      <HeroCarousel />
      <HomeSearch
        busca={busca}
        onSearch={setBusca}
        onSubmit={abrirBusca}
        sugestoes={sugestoes}
        carregando={carregandoProdutos}
        erro={erroProdutos}
      />
      <CategorySection
        produtos={produtos}
        carregando={carregandoProdutos}
        erro={erroProdutos}
        onSelect={abrirCategoria}
      />
      <FeaturedProducts
        produtos={destaques}
        carregando={carregandoProdutos}
        erro={erroProdutos}
      />
      <AdvantagesSection />
      <BrandsSection />
      <LocationsSection />
      <FinalCta />
    </main>
  );
}
