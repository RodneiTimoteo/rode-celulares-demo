import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductCatalog } from "@/services/product-catalog";
import { productSlug } from "@/utils/slug";
import { absoluteUrl } from "@/utils/site";
import { JsonLd } from "@/components/seo/json-ld";
import {
  ProductDetail,
  ProductLoadError,
} from "@/components/product/product-detail";

type Props = { params: Promise<{ slug: string }> };

function productDisplayName(nome: string, armazenamento: string) {
  const nomeNormalizado = nome.toLocaleLowerCase("pt-BR");
  const armazenamentoNormalizado = armazenamento.toLocaleLowerCase("pt-BR");

  return armazenamentoNormalizado && !nomeNormalizado.includes(armazenamentoNormalizado)
    ? `${nome} ${armazenamento}`
    : nome;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { products, error } = await getProductCatalog();
  const produto = products.find((p) => productSlug(p) === slug);
  if (!produto)
    return {
      title: error ? "Produto indisponível" : "Produto não encontrado",
      robots: { index: false, follow: true },
    };
  const nomeExibicao = productDisplayName(produto.nome, produto.dosagem);

  return {
    title: nomeExibicao,
    description: `${nomeExibicao}, da categoria ${produto.categoria}, no catálogo demonstrativo da RODE Celulares.`,
    alternates: {
      canonical: `/produtos/${productSlug(produto)}`,
    },
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const { products, error } = await getProductCatalog();
  if (error) return <ProductLoadError />;
  const produto = products.find((p) => productSlug(p) === slug);
  if (!produto) notFound();
  const related = products
    .filter(
      (p) =>
        p.categoria.trim() === produto.categoria.trim() && p.id !== produto.id,
    )
    .slice(0, 4);
  const productPath = `/produtos/${productSlug(produto)}`;
  const nomeExibicao = productDisplayName(produto.nome, produto.dosagem);
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produtos",
        item: absoluteUrl("/produtos"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: produto.categoria,
        item: absoluteUrl(
          `/produtos?categoria=${encodeURIComponent(produto.categoria)}`,
        ),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: nomeExibicao,
        item: absoluteUrl(productPath),
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <ProductDetail produto={produto} related={related} />
    </>
  );
}
