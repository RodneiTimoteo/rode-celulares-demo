"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Button,
  Container,
  SearchField,
  SectionTitle,
  buttonStyles,
} from "@/components/ui";
import { ProductCard } from "@/components/home/product-card";
import { useCatalog } from "./catalog-provider";
import { QuotePanel } from "./quote-panel";
import { filterProducts } from "./filter-products";
import {
  CatalogEmptyState,
  CatalogLoading,
  ProductFilters,
} from "./catalog-controls";

export function CatalogPage() {
  const params = useSearchParams();
  const busca = params.get("busca") ?? "";
  const categoria = params.get("categoria")?.trim() || "Todos";
  return (
    <CatalogView
      key={JSON.stringify([busca, categoria])}
      initialSearch={busca}
      initialCategory={categoria}
    />
  );
}
function CatalogView({
  initialSearch,
  initialCategory,
}: {
  initialSearch: string;
  initialCategory: string;
}) {
  const {
    produtos,
    carregandoProdutos,
    erroProdutos,
    tentarNovamente,
    quantidadeTotal,
  } = useCatalog();
  const [busca, setBusca] = useState(initialSearch);
  const [categoria, setCategoria] = useState(initialCategory);
  const [ordem, setOrdem] = useState("az");
  const [limite, setLimite] = useState(24);
  const categories = useMemo(() => {
    const names = [
      "Todos",
      ...new Set(
        produtos
          .map((produto) => produto.categoria.trim())
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b, "pt-BR")),
      ),
    ];
    return names.map((name) => ({
      name,
      count:
        name === "Todos"
          ? produtos.length
          : produtos.filter((p) => p.categoria.trim() === name).length,
    }));
  }, [produtos]);
  const filtrados = useMemo(
    () =>
      filterProducts(produtos, busca, categoria).sort((a, b) => {
        if (ordem === "categoria")
          return (
            a.categoria.localeCompare(b.categoria, "pt-BR") ||
            a.nome.localeCompare(b.nome, "pt-BR")
          );
        return (
          a.nome.localeCompare(b.nome, "pt-BR") * (ordem === "za" ? -1 : 1)
        );
      }),
    [produtos, busca, categoria, ordem],
  );
  function selectCategory(value: string) {
    setCategoria(value);
    setLimite(24);
  }
  function search(value: string) {
    setBusca(value);
    setLimite(24);
  }
  function reset() {
    search("");
    selectCategory("Todos");
  }
  const resultText = busca.trim()
    ? `${filtrados.length} resultados para “${busca.trim()}”${categoria !== "Todos" ? ` em ${categoria}` : ""}`
    : categoria === "Todos"
      ? `${filtrados.length} produtos encontrados`
      : `${filtrados.length} produtos em ${categoria}`;
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1 bg-background">
      <section className="border-b border-border bg-health-soft/50">
        <Container className="py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-7 text-xs text-muted">
            <Link href="/" className="hover:text-health">
              Início
            </Link>
            <span className="mx-3" aria-hidden="true">
              /
            </span>
            <span aria-current="page">Produtos</span>
          </nav>
          <p className="eyebrow">Catálogo RODE Celulares</p>
          <SectionTitle as="h1" className="text-3xl md:text-5xl">
            Encontre o que você precisa.
          </SectionTitle>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            Pesquise smartphones, acessórios, tecnologia e produtos para sua
            rotina.
          </p>
          <p className="mt-4 text-sm font-medium text-health">
            Monte sua lista e solicite o orçamento diretamente pelo WhatsApp.
          </p>
        </Container>
      </section>
      <Container className="py-8 md:py-12">
        <div className="search-panel ui-card mb-8">
          <label
            htmlFor="catalog-search"
            className="mb-3 block font-heading font-semibold text-brand"
          >
            O que você está procurando?
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchField
              id="catalog-search"
              placeholder="Busque por nome, marca, modelo ou armazenamento..."
              value={busca}
              onChange={(event) => search(event.target.value)}
            />
            {busca && (
              <Button
                variant="secondary"
                className="shrink-0"
                onClick={() => search("")}
              >
                Limpar busca
              </Button>
            )}
          </div>
        </div>
        <div className="catalog-layout">
          <ProductFilters
            categories={categories}
            selected={categoria}
            onSelect={selectCategory}
            loading={carregandoProdutos || Boolean(erroProdutos)}
          />
          <section aria-label="Resultados do catálogo" className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p
                role="status"
                aria-live="polite"
                className="min-w-0 break-words text-sm font-medium text-brand"
              >
                {carregandoProdutos
                  ? "Preparando o catálogo…"
                  : erroProdutos
                    ? "Catálogo indisponível"
                    : resultText}
              </p>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="catalog-sort"
                  className="shrink-0 text-xs text-muted"
                >
                  Ordenar por
                </label>
                <select
                  id="catalog-sort"
                  value={ordem}
                  onChange={(event) => {
                    setOrdem(event.target.value);
                    setLimite(24);
                  }}
                  className="rounded-xl border border-border bg-surface p-3 text-sm text-brand"
                >
                  <option value="az">Nome A-Z</option>
                  <option value="za">Nome Z-A</option>
                  <option value="categoria">Categoria</option>
                </select>
              </div>
            </div>
            {categoria !== "Todos" && (
              <div className="mb-5 flex items-center gap-3 text-sm text-health">
                <span>{categoria}</span>
                <button
                  className="rounded-lg border border-border px-3 py-2"
                  onClick={() => selectCategory("Todos")}
                  aria-label="Remover filtro de categoria"
                >
                  Remover filtro ×
                </button>
              </div>
            )}
            {carregandoProdutos ? (
              <CatalogLoading />
            ) : erroProdutos ? (
              <div role="alert" className="ui-card py-12 text-center">
                <SectionTitle className="text-xl">
                  Não foi possível carregar o catálogo.
                </SectionTitle>
                <p className="mt-3 text-muted">
                  Tente novamente em alguns instantes.
                </p>
                <Button onClick={tentarNovamente} className="mt-6">
                  Tentar novamente
                </Button>
              </div>
            ) : filtrados.length === 0 ? (
              <CatalogEmptyState
                emptyCategory={
                  categoria !== "Todos" &&
                  categories.find((c) => c.name === categoria)?.count === 0
                }
                onReset={reset}
              />
            ) : (
              <>
                <div className="catalog-product-grid">
                  {filtrados.slice(0, limite).map((produto) => (
                    <ProductCard key={produto.id} produto={produto} />
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="mb-4 text-xs text-muted">
                    Mostrando {Math.min(limite, filtrados.length)} de{" "}
                    {filtrados.length} produtos
                  </p>
                  {limite < filtrados.length && (
                    <Button
                      variant="secondary"
                      onClick={() => setLimite((value) => value + 24)}
                    >
                      Carregar mais produtos
                    </Button>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
        <section
          className="mt-14 border-t border-border pt-10"
          aria-label="Sua lista de orçamento"
        >
          <div className="mx-auto max-w-3xl">
            <QuotePanel />
          </div>
        </section>
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-muted">
          Catálogo demonstrativo. Produtos e informações apresentados neste
          projeto são fictícios e não representam disponibilidade comercial.
        </p>
      </Container>
      <a
        href="#orcamento"
        className={buttonStyles("primary", "catalog-quote-shortcut shadow-lg")}
        aria-label={`Ver meu orçamento: ${quantidadeTotal} itens`}
      >
        Meu orçamento{" "}
        <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-brand">
          {quantidadeTotal}
        </span>
      </a>
    </main>
  );
}
