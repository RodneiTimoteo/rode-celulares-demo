import Link from "next/link";
import { productSlug } from "@/utils/slug";
import { Card, buttonStyles } from "@/components/ui";
import { ProductImage } from "@/components/product/product-image";
import { ProductPrice } from "@/components/product/product-price";
import type { Produto } from "@/data/produtos";
import { armazenamentoPrincipal } from "@/utils/product-variants";

export function ProductCard({ produto }: { produto: Produto }) {
  const href = `/produtos/${productSlug(produto)}`;
  const armazenamento = armazenamentoPrincipal(produto);

  return (
    <Card className="product-card flex h-full flex-col">
      <Link href={href} aria-label={`Ver detalhes de ${produto.nome}`}>
        <ProductImage produto={produto} compact />
      </Link>
      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-health">
        {produto.marca ?? "RODE Celulares"}
      </p>
      <h3 className="mt-2 text-xl font-bold text-brand">
        <Link
          href={href}
          className="rounded-sm transition-colors hover:text-health"
        >
          {produto.nome}
        </Link>
      </h3>
      {armazenamento && (
        <p className="mt-2 text-sm text-muted">{armazenamento}</p>
      )}
      <ProductPrice
        className="mb-6 mt-4"
        precoOriginal={produto.precoOriginal ?? produto.preco}
        precoPromocional={produto.precoPromocional}
        temPromocao={produto.temPromocao}
      />
      <Link href={href} className={buttonStyles("secondary", "mt-auto w-full")}>
        Ver detalhes
      </Link>
    </Card>
  );
}
