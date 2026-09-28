import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogPage } from "@/components/catalog/catalog-page";
import { CatalogLoading } from "@/components/catalog/catalog-controls";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Explore o catálogo demonstrativo da RODE Celulares. Pesquise smartphones, acessórios, tecnologia e outros produtos.",
  alternates: { canonical: "/produtos" },
};
export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main id="catalogo" className="flex-1">
          <Container className="py-16">
            <CatalogLoading />
          </Container>
        </main>
      }
    >
      <CatalogPage />
    </Suspense>
  );
}
